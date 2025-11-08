import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { Dashboard } from "./Dashboard";
import { ServicesManager } from "./ServicesManager";
import { ProjectsManager } from "./ProjectsManager";
import { ClientsManager } from "./ClientsManager";
import { SubmissionsViewer } from "./SubmissionsViewer";

export function AdminPortal() {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract current view name from the URL path
  const currentView = location.pathname.split("/").pop() || "dashboard";

  return (
    <AdminLayout
      currentView={currentView}
      onViewChange={(view: string) => navigate(`/admin/${view}`)}
    >
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
