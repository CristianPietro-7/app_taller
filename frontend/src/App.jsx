import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import VehiculosPage from "./components/Vehiculos/VehiculoPage";
import CrearVehiculo from "./components/Vehiculos/CreateVehiculo";
import EditarVehiculo from "./components/Vehiculos/EditarVehiculo";
import MecanicosList from "./components/Mecanicos/MecanicosPage";
import CrearMecanico from "./components/Mecanicos/CreateMecanico";
import LoginForm from "./components/Login"; 
import ReparacionesList from "./components/Reparaciones/ReparacionesPage";
import CrearReparacion from "./components/Reparaciones/CreateReparacion";
import CategoriasList from "./components/Categorias/CategoriasPage";
import CrearCategoria from "./components/Categorias/CreateCategiria";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} /> 
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vehiculos" element={<VehiculosPage />} />
        <Route path="/crear-vehiculo" element={<CrearVehiculo />} />
        <Route path="/editar-vehiculo/:id" element={<EditarVehiculo />} />
        <Route path="/mecanicos" element={<MecanicosList />} />
        <Route path="/crear-mecanico" element={<CrearMecanico />} />
        <Route path="/reparaciones" element={<ReparacionesList />} />
        <Route path="/crear-reparacion" element={<CrearReparacion />} />
        <Route path="/categorias" element={<CategoriasList />} />
        <Route path="/crear-categoria" element={<CrearCategoria />} />

      </Routes>
    </Router>
  );
}
