import React from "react";
import { Route, Routes } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from './pages/Dashboard';
import RouteGuard from './RouteGuard';
import SensorData from "./pages/SensorData";

// Dashboard Pages
import Alerts from "./pages/Dashboard/Alerts";
import Analysis from "./pages/Dashboard/Analysis";
import Groups from "./pages/Dashboard/Groups";
import Overview from "./pages/Dashboard/Overview";
import Reports from "./pages/Dashboard/Reports";
import GroupSensors from "./pages/Dashboard/GroupSensors";
import Settings from "./pages/Dashboard/Settings";
import Sensors from "./pages/Dashboard/Sensors";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<RouteGuard element={<Dashboard />} />}>
        <Route path="overview" element={<Overview />} />
        <Route path="groups" element={<Groups />} />
        <Route path="groups/:groupId" element={<GroupSensors />} />
        <Route path="sensors/:sensorId" element={<Sensors />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="analysis" element={<Analysis />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="/sensors" element={<SensorData />} />
    </Routes>
  );
}

export default AppRoutes;
