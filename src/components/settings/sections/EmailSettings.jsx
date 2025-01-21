import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../../ui/Card';
import { Button } from '../../ui/Button';
import toast from 'react-hot-toast';

export function EmailSettings() {
  const [settings, setSettings] = useState({
    smtpHost: 'smtp.smtptogo.com',
    smtpPort: '587',
    username: '',
    password: '',
    fromName: '',
    fromEmail: '',
    enableTLS: true,
    testEmail: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Email settings saved successfully');
  };

  const handleTestEmail = async () => {
    if (!settings.testEmail) {
      toast.error('Please enter a test email address');
      return;
    }

    toast.success('Test email sent successfully');
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">Email Settings</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">SMTP Host</label>
              <input
                type="text"
                value={settings.smtpHost}
                onChange={(e) => setSettings({ ...settings, smtpHost: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">SMTP Port</label>
              <input
                type="text"
                value={settings.smtpPort}
                onChange={(e) => setSettings({ ...settings, smtpPort: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input
                type="text"
                value={settings.username}
                onChange={(e) => setSettings({ ...settings, username: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={settings.password}
                onChange={(e) => setSettings({ ...settings, password: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">From Name</label>
              <input
                type="text"
                value={settings.fromName}
                onChange={(e) => setSettings({ ...settings, fromName: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">From Email</label>
              <input
                type="email"
                value={settings.fromEmail}
                onChange={(e) => setSettings({ ...settings, fromEmail: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.enableTLS}
                onChange={(e) => setSettings({ ...settings, enableTLS: e.target.checked })}
                className="checkbox-custom"
              />
              <span className="text-sm">Enable TLS</span>
            </label>
          </div>

          <div className="border-t border-gray-100 dark:border-gray-800 pt-6">
            <h3 className="text-base font-medium mb-4">Test Configuration</h3>
            <div className="flex gap-2">
              <input
                type="email"
                value={settings.testEmail}
                onChange={(e) => setSettings({ ...settings, testEmail: e.target.value })}
                placeholder="Enter test email address"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
              />
              <Button type="button" onClick={handleTestEmail}>
                Send Test Email
              </Button>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit">Save Settings</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}