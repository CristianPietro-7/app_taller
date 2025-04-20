import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  CssBaseline,
  Button,
} from "@mui/material";
import TablaVehiculos from "./TablaVehiculos";


export default function VehiculosPage() {


  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Gestión de Vehículos
          </Typography>
          <Button color="inherit" href="/">
            Volver al Dashboard
          </Button>
        </Toolbar>
      </AppBar>

      

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, ml: { md: "240px" } }}
      >
        <Toolbar />

        {/* Tabla de vehículos */}
        <TablaVehiculos />
      </Box>
    </Box>
  );
}
