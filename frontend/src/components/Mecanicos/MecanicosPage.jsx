import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Button,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function MecanicosList() {
  const [mecanicos, setMecanicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/mecanico")
      .then((res) => res.json())
      .then((data) => {
        setMecanicos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener mecanicos:", error);
        setLoading(false);
      });
  }, []);

  const handleEditar = (id) => {
    console.log("Editar mecanico con ID:", id);
    // navigate(`/editar-mecanico/${id}`); 
  };

  const handleEliminar = (id) => {
    console.log("Eliminar mecanico con ID:", id);
    // lógica para eliminar
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Lista de Mecanicos
      </Typography>

      <Stack direction="row" spacing={2} mb={2}>
        <Button variant="contained" color="primary" onClick={() => navigate("/dashboard")}>
          Volver
        </Button>
        <Button variant="contained" color="success" onClick={() => navigate("/crear-mecanico")}>
          Crear 
        </Button>
      </Stack>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellido</TableCell>
                <TableCell>Telefono</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Especialidad</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mecanicos.map((mecanico) => (
                <TableRow key={mecanico.idMecanico} hover>
                  <TableCell>{mecanico.idMecanico}</TableCell>
                  <TableCell>{mecanico.nombre}</TableCell>
                  <TableCell>{mecanico.apellido}</TableCell>
                  <TableCell>{mecanico.telefono}</TableCell>
                  <TableCell>{mecanico.email}</TableCell>
                  <TableCell>{mecanico.especialidad}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => handleEditar(mecanico.idMecanico)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleEliminar(mecanico.idMecanico)}
                      >
                        Eliminar
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default MecanicosList;