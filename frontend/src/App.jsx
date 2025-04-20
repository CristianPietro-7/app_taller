import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import VehiculosPage from "./components/Vehiculos/VehiculoPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/vehiculos" element={<VehiculosPage />} />
      </Routes>
    </Router>
  );
}
