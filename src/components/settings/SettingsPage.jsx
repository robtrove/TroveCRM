import React from 'react';
import { Navigate } from 'react-router-dom';
import { GeneralSettings } from './sections/GeneralSettings';
import { SecuritySettings } from './sections/SecuritySettings';
import { IntegrationSettings } from './sections/IntegrationSettings';
import { ApiSettings } from './sections/ApiSettings';
import { ChatSettings } from './sections/ChatSettings';
import { UserManagement } from './sections/UserManagement';
import { EmailSettings } from './sections/EmailSettings';
import { authService } from '../../services/auth';

export function SettingsPage() {
  // Redirect non-admin users
  if (!authService.isAdmin()) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <main className="flex-1 min-w-0 overflow-auto">
      <div className="max-w-[1440px] mx-auto animate-fade-in">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>
        </div>

        <div className="p-4 space-y-6">
          <UserManagement />
          <EmailSettings />
          <GeneralSettings />
          <SecuritySettings />
          <ApiSettings />
          <ChatSettings />
          <IntegrationSettings />
        </div>
      </div>
    </main>
  );
}