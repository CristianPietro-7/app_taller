import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Car, Wrench, Settings, Home, Users, Menu } from "lucide-react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Box,
  Button,
  Grid,
  Paper,
} from "@mui/material";

const navItems = [
  { label: "Vehículos", icon: <Car />, path: "/vehiculos" },
  { label: "Mecánicos", icon: <Wrench />, path: "/mecanicos" },
  { label: "Reparaciones", icon: <Settings />, path: "/reparaciones" },
  { label: "Categorías", icon: <Home />, path: "/categorias" },
  { label: "Usuarios", icon: <Users />, path: "/usuarios" },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar position="fixed">
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }} variant="h6">
            Dashboard
          </Typography>
          <IconButton
            color="inherit"
            edge="end"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="persistent"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box>
          <Typography variant="h5" gutterBottom sx={{ px: 2 }}>
            Taller Mecánico
          </Typography>
          <List>
            {navItems.map((item) => (
              <ListItem button component={Link} to={item.path} key={item.label}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - 240px)` },
          ml: { md: "240px" },
        }}
      >
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          Bienvenido al sistema
        </Typography>

        <Grid container spacing={2}>
          {navItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.label}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Box display="flex" alignItems="center" gap={2}>
                  {item.icon}
                  <Typography variant="h6">{item.label}</Typography>
                </Box>
                <Box mt={2}>
                  <Button variant="contained" component={Link} to={item.path}>
                    Ir
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}


