// src/pages/EditarVehiculo.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  Paper,
  CircularProgress,
} from "@mui/material";

function EditarVehiculo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/vehiculo/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar datos del vehículo:", error);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/vehiculo/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        navigate("/vehiculos");
      } else {
        console.error("Error al actualizar vehículo");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3} maxWidth={600} mx="auto">
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Editar Vehículo
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
              <Button variant="contained" type="submit" color="primary">
                Guardar Cambios
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

export default EditarVehiculo;
