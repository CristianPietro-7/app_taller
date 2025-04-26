import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import VehiculosPage from "./components/Vehiculos/VehiculoPage"
import CrearVehiculo from "./components/Vehiculos/CreateVehiculo";
import EditarVehiculo from "./components/Vehiculos/EditarVehiculo";
import MecanicosList from "./components/Mecanicos/MecanicosPage";
import CrearMecanico from "./components/Mecanicos/CreateMecanico";
import ReparacionesList from "./components/Reparaciones/ReparacionesPage";
import CrearReparacion from "./components/Reparaciones/CreateReparacion";
import CategoriasList from "./components/Categorias/CategoriasPage";
import CrearCategoria from "./components/Categorias/CreateCategiria";
import LoginForm from "./components/Login";
import Unauthorized from "./components/Unauthorized";
import RoleRoute from "./components/RoleRoute";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Acceso para usuarios logueados */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/vehiculos"
          element={
            <PrivateRoute>
              <VehiculosPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/crear-vehiculo"
          element={
            <PrivateRoute>
              <CrearVehiculo />
            </PrivateRoute>
          }
        />
        <Route
          path="/editar-vehiculo/:id"
          element={
            <PrivateRoute>
              <EditarVehiculo />
            </PrivateRoute>
          }
        />

        {/* Solo admin */}
        <Route
          path="/mecanicos"
          element={
            <RoleRoute allowedRoles={['admin']}>
              <MecanicosList />
            </RoleRoute>
          }
        />
        <Route
          path="/crear-mecanico"
          element={
            <RoleRoute allowedRoles={['admin']}>
              <CrearMecanico />
            </RoleRoute>
          }
        />

        {/* Admin y mecánico */}
        <Route
          path="/reparaciones"
          element={
            <RoleRoute allowedRoles={['admin', 'mecanico']}>
              <ReparacionesList />
            </RoleRoute>
          }
        />
        <Route
          path="/crear-reparacion"
          element={
            <RoleRoute allowedRoles={['admin', 'mecanico']}>
              <CrearReparacion />
            </RoleRoute>
          }
        />

        {/* Accesible si está logueado */}
        <Route
          path="/categorias"
          element={
            <PrivateRoute>
              <CategoriasList />
            </PrivateRoute>
          }
        />
        <Route
          path="/crear-categorias"
          element={
            <PrivateRoute>
              <CrearCategoria />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}
