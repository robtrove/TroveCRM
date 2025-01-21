import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { GeneralSettings } from '../settings/sections/GeneralSettings';
import { SecuritySettings } from '../settings/sections/SecuritySettings';
import { ApiSettings } from '../settings/sections/ApiSettings';
import { ChatSettings } from '../settings/sections/ChatSettings';
import { IntegrationSettings } from '../settings/sections/IntegrationSettings';
import { UserManagement } from '../settings/sections/UserManagement';
import { EmailSettings } from '../settings/sections/EmailSettings';
import { ThemeSettings } from './sections/ThemeSettings';
import { authService } from '../../services/auth';
import { AdminNav } from './AdminNav';

export function AdministrationPage() {
  // Redirect non-admin users
  if (!authService.isAdmin()) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <main className="flex-1 min-w-0 overflow-auto">
      <div className="max-w-[1440px] mx-auto animate-fade-in">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <h1 className="text-2xl md:text-3xl font-bold">Administration</h1>
        </div>

        <div className="flex gap-6 p-4">
          <AdminNav />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Navigate to="general" replace />} />
              <Route path="general" element={<GeneralSettings />} />
              <Route path="security" element={<SecuritySettings />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="theme" element={<ThemeSettings />} />
              <Route path="email" element={<EmailSettings />} />
              <Route path="api" element={<ApiSettings />} />
              <Route path="chat" element={<ChatSettings />} />
              <Route path="integrations" element={<IntegrationSettings />} />
            </Routes>
          </div>
        </div>
      </div>
    </main>
  );
}