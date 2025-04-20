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
import ReparacionRow from "./ReparacionRow";

function ReparacionesList() {
  const [reparaciones, setReparaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/reparaciones")
      .then((res) => res.json())
      .then((data) => {
        setReparaciones(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener reparaciones:", error);
        setLoading(false);
      });
  }, []);

  const handleEditar = (id) => {
    console.log("Editar reparación con ID:", id);
    // navigate(`/editar-reparacion/${id}`);
  };

  const handleEliminar = (id) => {
    console.log("Eliminar reparación con ID:", id);
    // lógica para eliminar
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Lista de Reparaciones
      </Typography>

      <Stack direction="row" spacing={2} mb={2}>
        <Button variant="contained" color="primary" onClick={() => navigate("/dashboard")}>
          Volver
        </Button>
        <Button variant="contained" color="success" onClick={() => navigate("/crear-reparaciones")}>
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
                <TableCell>Estado</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Vehículo</TableCell>
                <TableCell>Mecánico</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reparaciones.map((reparacion) => (
                <ReparacionRow
                  key={reparacion.idReparacion}
                  reparacion={reparacion}
                  onEditar={handleEditar}
                  onEliminar={handleEliminar}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default ReparacionesList;
