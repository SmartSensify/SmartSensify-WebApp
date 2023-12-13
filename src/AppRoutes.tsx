import React from "react";
import { Route, Routes, Outlet, Router } from "react-router-dom";
import RouteGuard from './RouteGuard';

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from './pages/Dashboard';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={<RouteGuard element={<Dashboard />} />}
      />
    </Routes>
  );
}

export default AppRoutes
