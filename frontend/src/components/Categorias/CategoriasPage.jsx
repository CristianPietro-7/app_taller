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

function CategoriasList() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/categorias")
      .then((res) => res.json())
      .then((data) => {
        setCategorias(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener categorias:", error);
        setLoading(false);
      });
  }, []);

  const handleEditar = (id) => {
    console.log("Editar categorias con ID:", id);
    // navigate(`/editar-categoria/${id}`); 
  };

  const handleEliminar = (id) => {
    console.log("Eliminar categorias con ID:", id);
    // lógica para eliminar
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Lista de Categorias
      </Typography>

      <Stack direction="row" spacing={2} mb={2}>
        <Button variant="contained" color="primary" onClick={() => navigate("/dashboard")}>
          Volver
        </Button>
        <Button variant="contained" color="success" onClick={() => navigate("/crear-categorias")}>
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
                <TableCell>Descripción</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categorias.map((categoria) => (
                <TableRow key={categoria.idCategoria} hover>
                  <TableCell>{categoria.name}</TableCell>
                  <TableCell>{categoria.descripcion}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => handleEditar(categoria.idCategoria)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleEliminar(categoria.idCategoria)}
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

export default CategoriasList;