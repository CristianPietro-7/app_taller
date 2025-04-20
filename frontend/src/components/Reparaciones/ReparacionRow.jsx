import { useState } from "react";
import {
  TableRow,
  TableCell,
  Button,
  Stack,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

function ReparacionRow({ reparacion, onEditar, onEliminar }) {
  const [vehiculoExpandido, setVehiculoExpandido] = useState(false);
  const [mecanicoExpandido, setMecanicoExpandido] = useState(false);

  return (
    <TableRow hover>
      <TableCell>{reparacion.idReparacion}</TableCell>
      <TableCell>{reparacion.estado}</TableCell>
      <TableCell>{reparacion.descripcion}</TableCell>

      <TableCell>
        <Box display="flex" alignItems="center">
          <Typography variant="body2" sx={{ mr: 1 }}>
            {vehiculoExpandido
              ? `${reparacion.vehiculo?.patente} - ${reparacion.vehiculo?.marca} ${reparacion.vehiculo?.modelo}`
              : reparacion.vehiculo?.patente}
          </Typography>
          <IconButton
            size="small"
            onClick={() => setVehiculoExpandido((prev) => !prev)}
          >
            {vehiculoExpandido ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>
      </TableCell>

      <TableCell>
        <Box display="flex" alignItems="center">
          <Typography variant="body2" sx={{ mr: 1 }}>
            {mecanicoExpandido
              ? `${reparacion.mecanico?.nombre} ${reparacion.mecanico?.apellido}`
              : reparacion.mecanico?.nombre}
          </Typography>
          <IconButton
            size="small"
            onClick={() => setMecanicoExpandido((prev) => !prev)}
          >
            {mecanicoExpandido ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>
      </TableCell>

      <TableCell>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => onEditar(reparacion.idReparacion)}
          >
            Editar
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => onEliminar(reparacion.idReparacion)}
          >
            Eliminar
          </Button>
        </Stack>
      </TableCell>
    </TableRow>
  );
}

export default ReparacionRow;
