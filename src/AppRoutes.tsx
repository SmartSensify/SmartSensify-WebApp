import React from "react";
import { Route, Routes } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from './pages/Dashboard';
import RouteGuard from './RouteGuard';
import SensorData from "./pages/SensorData";
import Groups from "./pages/Dashboard/Groups";
import Sensors from "./pages/Dashboard/Sensors";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<RouteGuard element={<Dashboard />} />}>
        <Route path="groups" element={<Groups />} />
        <Route path="groups/:groupId" element={<Sensors />} />
      </Route>
      <Route path="/sensors" element={<SensorData />} />
    </Routes>
  );
}

export default AppRoutes;
