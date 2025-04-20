import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function TablaVehiculos() {
  const [vehiculos, setVehiculos] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetch("http://localhost:5000/vehiculos") // Cambiá esto si tu API usa otra URL
      .then((res) => res.json())
      .then((data) => setVehiculos(data))
      .catch((err) => console.error("Error cargando vehículos:", err));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/vehiculos/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setVehiculos((prev) => prev.filter((v) => v.id !== id));
      })
      .catch((err) => console.error("Error al eliminar:", err));
  };

  const handleEdit = (id) => {
    console.log("Editar vehículo:", id);
    // Acá podrías redirigir o abrir un modal, etc.
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", mt: 2 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patente</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Modelo</TableCell>
              <TableCell>Chasis</TableCell>
              <TableCell>Motor</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehiculos
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((v) => (
                <TableRow key={v.id}>
                  <TableCell>{v.patente}</TableCell>
                  <TableCell>{v.marca}</TableCell>
                  <TableCell>{v.modelo}</TableCell>
                  <TableCell>{v.nro_chasis}</TableCell>
                  <TableCell>{v.nro_motor}</TableCell>
                  <TableCell>{v.categoria}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(v.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(v.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={vehiculos.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página"
      />
    </Paper>
  );
}

