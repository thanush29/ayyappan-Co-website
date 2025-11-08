import { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Dashboard } from './Dashboard';
import { ServicesManager } from './ServicesManager';
import { ProjectsManager } from './ProjectsManager';
import { ClientsManager } from './ClientsManager';
import { SubmissionsViewer } from './SubmissionsViewer';

export function AdminPortal() {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'services':
        return <ServicesManager />;
      case 'projects':
        return <ProjectsManager />;
      case 'clients':
        return <ClientsManager />;
      case 'submissions':
        return <SubmissionsViewer />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AdminLayout currentView={currentView} onViewChange={setCurrentView}>
      {renderView()}
    </AdminLayout>
  );
}
