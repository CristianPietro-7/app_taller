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
  
  function CrearCategoria() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
      name: "",
      descripcion: ""
    });
  
    
  
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await fetch("http://localhost:5000/api/categoria", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
  
        if (res.ok) {
          navigate("/categoria");
        } else {
          console.error("Error al crear categoria");
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
              <TextField name="name" label="Nombre" value={form.name} onChange={handleChange} required />
              <TextField name="descripcion" label="Descripción" value={form.descripcion} onChange={handleChange} required />
              
            
              <Stack direction="row" spacing={2}>
                <Button variant="contained" type="submit" color="success">
                  Guardar
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => navigate("/categoria")}>
                  Cancelar
                </Button>
              </Stack>
            </Stack>
          </form>
        </Paper>
      </Box>
    );
  }
  
  export default CrearCategoria;