import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function EditarVehiculoModal({ open, handleClose, vehiculo, onGuardar }) {
  const [formData, setFormData] = useState({
    patente: "",
    marca: "",
    modelo: "",
    nro_chasis: "",
    nro_motor: "",
    categoria: "",
  });

  useEffect(() => {
    if (vehiculo) {
      setFormData(vehiculo);
    }
  }, [vehiculo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onGuardar(formData); // enviar datos editados al padre
    handleClose(); // cerrar modal
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          Editar Vehículo
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Patente"
            name="patente"
            value={formData.patente}
            onChange={handleChange}
          />
          <TextField
            label="Marca"
            name="marca"
            value={formData.marca}
            onChange={handleChange}
          />
          <TextField
            label="Modelo"
            name="modelo"
            value={formData.modelo}
            onChange={handleChange}
          />
          <TextField
            label="Nro Chasis"
            name="nro_chasis"
            value={formData.nro_chasis}
            onChange={handleChange}
          />
          <TextField
            label="Nro Motor"
            name="nro_motor"
            value={formData.nro_motor}
            onChange={handleChange}
          />
          <TextField
            label="Categoría"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Guardar Cambios
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
