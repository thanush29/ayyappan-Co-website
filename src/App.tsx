import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChatbotButton from "./components/chatbot/ChatbotButton";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminLogin from "./pages/admin/Login";
import { AdminLayout } from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import { ServicesManager } from "./pages/admin/ServicesManager";
import { ProjectsManager } from "./pages/admin/ProjectsManager";
import { ClientsManager } from "./pages/admin/ClientsManager";
import { SubmissionsViewer } from "./pages/admin/SubmissionsViewer";

// ScrollToTop Component (added here)
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Scroll to top on every route change */}
      <ScrollToTop />

      {!isAdminRoute && <Header />}

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
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="services" element={<ServicesManager />} />
          <Route path="projects" element={<ProjectsManager />} />
          <Route path="clients" element={<ClientsManager />} />
          <Route path="submissions" element={<SubmissionsViewer />} />
        </Route>

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ChatbotButton />

      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
