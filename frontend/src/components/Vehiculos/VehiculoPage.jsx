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
} from "@mui/material";

function VehiculoList() {
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/vehiculos") 
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

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Lista de Vehiculos
      </Typography>

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
              </TableRow>
            </TableHead>
            <TableBody>
              {vehiculos.map((vehiculo) => (
                <TableRow
                  key={vehiculo.idVehiculo}
                  hover
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{vehiculo.idVehiculo}</TableCell>
                  <TableCell>{vehiculo.patente}</TableCell>
                  <TableCell>{vehiculo.marca}</TableCell>
                  <TableCell>{vehiculo.modelo}</TableCell>
                  <TableCell>{vehiculo.year}</TableCell>
                  <TableCell>{vehiculo.nro_chasis}</TableCell>
                  <TableCell>{vehiculo.nro_motor}</TableCell>
                  <TableCell>{vehiculo.categoria}</TableCell>

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
