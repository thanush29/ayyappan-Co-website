import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Contact from "./pages/Contact";

// Admin Pages
import AdminLogin from "./pages/admin/Login";
import { AdminLayout } from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import {ServicesManager} from "./pages/admin/ServicesManager";
import {ProjectsManager} from "./pages/admin/ProjectsManager";
import {ClientsManager} from "./pages/admin/ClientsManager";
import {SubmissionsViewer} from "./pages/admin/SubmissionsViewer"; // <-- add this line


function App() {
  return (
    <>
      {/* Public Header */}
      <Header />

      <Routes>
  {/* Public Routes */}
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/services" element={<Services />} />
  <Route path="/services/:id" element={<ServiceDetail />} />
  <Route path="/projects" element={<Projects />} />
  <Route path="/projects/:id" element={<ProjectDetail />} />
  <Route path="/contact" element={<Contact />} />

  {/* Admin Login */}
  <Route path="/admin/login" element={<AdminLogin />} />

  {/* Admin Protected Routes */}
  <Route
    path="/admin"
    element={
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    }
  >
    <Route index element={<Dashboard />} /> {/* /admin -> dashboard */}
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="services" element={<ServicesManager />} />
    <Route path="projects" element={<ProjectsManager />} />
    <Route path="clients" element={<ClientsManager />} />
    <Route path="submissions" element={<SubmissionsViewer />} />
  </Route>
</Routes>


      {/* Public Footer */}
      <Footer />
    </>
  );
}

export default App;
