// src/pages/CrearVehiculo.jsx
import { Box, Button, TextField, Typography, Stack, Paper } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CrearVehiculo() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    patente: "",
    marca: "",
    modelo: "",
    year: "",
    nro_chasis: "",
    nro_motor: "",
    categoria: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/vehiculo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        navigate("/vehiculos"); // redirige a la lista
      } else {
        console.error("Error al crear vehículo");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <Box p={3} maxWidth={600} mx="auto">
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Crear Vehículo
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField name="patente" label="Patente" value={form.patente} onChange={handleChange} required />
            <TextField name="marca" label="Marca" value={form.marca} onChange={handleChange} required />
            <TextField name="modelo" label="Modelo" value={form.modelo} onChange={handleChange} required />
            <TextField name="year" label="Año" value={form.year} onChange={handleChange} required />
            <TextField name="nro_chasis" label="Nro Chasis" value={form.nro_chasis} onChange={handleChange} required />
            <TextField name="nro_motor" label="Nro Motor" value={form.nro_motor} onChange={handleChange} required />
            <TextField name="categoria" label="Categoría" value={form.categoria} onChange={handleChange} required />
            <Stack direction="row" spacing={2}>
              <Button variant="contained" type="submit" color="success">
                Guardar
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => navigate("/vehiculos")}>
                Cancelar
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}

export default CrearVehiculo;
