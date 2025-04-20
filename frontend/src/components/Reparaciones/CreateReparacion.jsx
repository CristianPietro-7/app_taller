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
  
  function CrearReparacion() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
      estado: "",
      descripcion: "",
      idVehiculo: "",
      idMecanico: ""
    });
  
    
  
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await fetch("http://localhost:5000/api/reparacion", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
  
        if (res.ok) {
          navigate("/reparacion");
        } else {
          console.error("Error al crear reparación");
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
              <TextField name="estado" label="Estado" value={form.estado} onChange={handleChange} required />
              <TextField name="descripcion" label="Descripción" value={form.descripcion} onChange={handleChange} required />
              <TextField name="idVehiculo" label="Vehículo" value={form.idVehiculo} onChange={handleChange} required />
              <TextField name="idMecanico" label="Mecánico" value={form.idMecanico} onChange={handleChange} required />
              
            
              <Stack direction="row" spacing={2}>
                <Button variant="contained" type="submit" color="success">
                  Guardar
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => navigate("/reparacion")}>
                  Cancelar
                </Button>
              </Stack>
            </Stack>
          </form>
        </Paper>
      </Box>
    );
  }
  
  export default CrearReparacion;