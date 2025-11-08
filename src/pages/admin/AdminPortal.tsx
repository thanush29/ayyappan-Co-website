import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { AdminLayout } from "../../components/admin/AdminLayout";

import Dashboard from "./Dashboard";
import { ServicesManager } from "./ServicesManager";
import { ProjectsManager } from "./ProjectsManager";
import { ClientsManager } from "./ClientsManager";
import { SubmissionsViewer } from "./SubmissionsViewer";

export function AdminPortal() {
  const navigate = useNavigate();
  const location = useLocation();

  // State to track current view (sidebar highlight)
  const [currentView, setCurrentView] = useState("dashboard");

  // Update currentView when the URL changes
  useEffect(() => {
    const view = location.pathname.split("/").pop() || "dashboard";
    setCurrentView(view);
  }, [location.pathname]);

  const handleViewChange = (view: string) => {
    setCurrentView(view);
    navigate(`/admin/${view}`);
  };

  return (
    <AdminLayout currentView={currentView} onViewChange={handleViewChange}>
      <Routes>
        <Route path="/" element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="services" element={<ServicesManager />} />
        <Route path="projects" element={<ProjectsManager />} />
        <Route path="clients" element={<ClientsManager />} />
        <Route path="submissions" element={<SubmissionsViewer />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
}
