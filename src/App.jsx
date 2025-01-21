import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/ui/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import { CustomersPage } from './components/customers/CustomersPage';
import { ConversationsPage } from './components/conversations/ConversationsPage';
import { CampaignsPage } from './components/campaigns/CampaignsPage';
import { ReportingPage } from './components/reporting/ReportingPage';
import { ProfilePage } from './components/profile/ProfilePage';
import { AdministrationPage } from './components/administration/AdministrationPage';
import { SupportPage } from './components/support/SupportPage';
import { TicketsPage } from './components/tickets/TicketsPage';
import { ChatWidget } from './components/chat/ChatWidget';
import { LoginPage } from './components/auth/LoginPage';
import { authService } from './services/auth';
import { themeService } from './services/theme';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(authService.getCurrentUser());
  const navigate = useNavigate();

  // Apply theme settings when app loads
  useEffect(() => {
    const settings = themeService.getSettings();
    themeService.applyTheme(settings);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    navigate('/');
  };

  const handleNavigate = (path) => {
    navigate(`/${path}`);
    setIsSidebarOpen(false);
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-surface-light dark:bg-dark-bg dark:text-gray-100 transition-colors duration-200">
      <Header 
        onMenuClick={() => setIsSidebarOpen(true)} 
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        user={user}
      />
      <div className="max-w-[1440px] mx-auto">
        <div className="flex">
          <Sidebar 
            isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)}
            onMenuItemClick={handleNavigate}
            currentPage={window.location.pathname.substring(1) || 'dashboard'}
          />
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/conversations" element={<ConversationsPage />} />
            <Route path="/campaigns" element={<CampaignsPage />} />
            <Route path="/reporting" element={<ReportingPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/administration/*" element={<AdministrationPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/tickets" element={<TicketsPage />} />
          </Routes>
        </div>
      </div>
      <ChatWidget />
      <Toaster position="top-right" />
    </div>
  );
}