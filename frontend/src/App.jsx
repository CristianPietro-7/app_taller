import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import VehiculosPage from "./components/Vehiculos/VehiculoPage";
import CrearVehiculo from "./components/Vehiculos/CreateVehiculo";
import EditarVehiculo from "./components/Vehiculos/EditarVehiculo";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/vehiculos" element={<VehiculosPage />} />
        <Route path="/crear-vehiculo" element={<CrearVehiculo />} />
        <Route path="/editar-vehiculo/:id" element={<EditarVehiculo />} />
      </Routes>
    </Router>
  );
}
