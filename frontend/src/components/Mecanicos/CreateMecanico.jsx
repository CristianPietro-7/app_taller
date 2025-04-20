import {
    Box,
    Button,
    TextField,
    Typography,
    Stack,
    Paper,
  } from "@mui/material";
  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  
  function CrearMecanico() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
      nombre: "",
      apellido: "",
      telefono: "",
      email: "",
      especialidad: "",
      fecha_nac: ""
    });
  
    
  
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await fetch("http://localhost:5000/api/mecanico", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
  
        if (res.ok) {
          navigate("/vehiculos");
        } else {
          console.error("Error al crear mecanico");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };
  
    return (
      <Box p={3} maxWidth={600} mx="auto">
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Crear 
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField name="nombre" label="Nombre" value={form.nombre} onChange={handleChange} required />
              <TextField name="apellido" label="Apellido" value={form.apellido} onChange={handleChange} required />
              <TextField name="telefono" label="Telefono" value={form.telefono} onChange={handleChange} required />
              <TextField name="email" label="Email" value={form.email} onChange={handleChange} required />
              <TextField name="especialidad" label="Especialidad" value={form.especialidad} onChange={handleChange} required />
              <TextField name="fecha_nac" label="Fecha Nacimiento" value={form.especialidad} onChange={handleChange} required />
              
            
              <Stack direction="row" spacing={2}>
                <Button variant="contained" type="submit" color="success">
                  Guardar
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => navigate("/mecanicos")}>
                  Cancelar
                </Button>
              </Stack>
            </Stack>
          </form>
        </Paper>
      </Box>
    );
  }
  
  export default CrearMecanico;