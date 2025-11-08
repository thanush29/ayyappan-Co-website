import { AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { ServiceDetail } from './pages/ServiceDetail';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import { Contact } from './pages/Contact';
import { ClientsCarousel } from './components/ClientsCarousel';
import { useStore } from './store/useStore';
import { useEffect } from 'react';

function App() {
  const { currentPage, selectedServiceId, selectedProjectId } = useStore();

  useEffect(() => {
    document.title = `${currentPage.charAt(0).toUpperCase() + currentPage.slice(1)} | Ayyappan & Co`;
  }, [currentPage]);

  const renderPage = () => {
    if (selectedServiceId) {
      return <ServiceDetail />;
    }
    if (selectedProjectId) {
      return <ProjectDetail />;
    }

    switch (currentPage) {
      case 'home':
        return (
          <>
            <Home />
            <ClientsCarousel />
          </>
        );
      case 'about':
        return <About />;
      case 'services':
        return <Services />;
      case 'projects':
        return <Projects />;
      case 'contact':
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <AnimatePresence mode="wait">
        <main key={currentPage + (selectedServiceId || '') + (selectedProjectId || '')}>
          {renderPage()}
        </main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;
