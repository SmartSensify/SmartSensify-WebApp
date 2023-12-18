import React from "react";
import { Route, Routes } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from './pages/Dashboard';
import RouteGuard from './RouteGuard';
import SensorData from "./components/sensorData";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<RouteGuard element={<Dashboard />} />} />
      <Route path="/sensors" element={<SensorData />} />
    </Routes>
  );
}

export default AppRoutes;
