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

function VehiculoList() {
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/vehiculo")
      .then((res) => res.json())
      .then((data) => {
        setVehiculos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener vehiculos:", error);
        setLoading(false);
      });
  }, []);

  const handleEditar = (id) => {
    console.log("Editar vehículo con ID:", id);
    // navigate(`/editar-vehiculo/${id}`); // Opcional si tenés esa ruta
  };

  const handleEliminar = (id) => {
    console.log("Eliminar vehículo con ID:", id);
    // lógica para eliminar
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Lista de Vehículos
      </Typography>

      <Stack direction="row" spacing={2} mb={2}>
        <Button variant="contained" color="primary" onClick={() => navigate("/dashboard")}>
          Volver
        </Button>
        <Button variant="contained" color="success" onClick={() => navigate("/crear-vehiculo")}>
          Crear Vehículo
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
                <TableCell>Patente</TableCell>
                <TableCell>Marca</TableCell>
                <TableCell>Modelo</TableCell>
                <TableCell>Año</TableCell>
                <TableCell>Nro Chasis</TableCell>
                <TableCell>Nro Motor</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vehiculos.map((vehiculo) => (
                <TableRow key={vehiculo.idVehiculo} hover>
                  <TableCell>{vehiculo.idVehiculo}</TableCell>
                  <TableCell>{vehiculo.patente}</TableCell>
                  <TableCell>{vehiculo.marca}</TableCell>
                  <TableCell>{vehiculo.modelo}</TableCell>
                  <TableCell>{vehiculo.year}</TableCell>
                  <TableCell>{vehiculo.nro_chasis}</TableCell>
                  <TableCell>{vehiculo.nro_motor}</TableCell>
                  <TableCell>{vehiculo.categoria}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => handleEditar(vehiculo.idVehiculo)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleEliminar(vehiculo.idVehiculo)}
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

export default VehiculoList;

