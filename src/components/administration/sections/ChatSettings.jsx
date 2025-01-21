import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../../ui/Card';
import { Button } from '../../ui/Button';
import toast from 'react-hot-toast';

export function ChatSettings() {
  const [settings, setSettings] = useState({
    enabled: true,
    initialMessage: 'Hi! How can I help you today?',
    theme: {
      primaryColor: '#0A0A0A',
      textColor: '#FFFFFF',
      backgroundColor: '#FFFFFF'
    },
    workflow: {
      useKnowledgeBase: true,
      maxResponseTime: 30,
      fallbackMessage: "I will connect you with a support agent who can help."
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Chat settings saved successfully');
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">Chat Widget Settings</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* General Settings */}
          <div>
            <h3 className="text-base font-medium mb-4">General Settings</h3>
            <div className="space-y-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={settings.enabled}
                  onChange={(e) => setSettings({ ...settings, enabled: e.target.checked })}
                  className="checkbox-custom"
                />
                <div>
                  <p className="font-medium">Enable Chat Widget</p>
                  <p className="text-sm text-gray-500">Show the chat widget to your customers</p>
                </div>
              </label>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Initial Message
                </label>
                <input
                  type="text"
                  value={settings.initialMessage}
                  onChange={(e) => setSettings({ ...settings, initialMessage: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
                />
              </div>
            </div>
          </div>

          {/* Theme Settings */}
          <div>
            <h3 className="text-base font-medium mb-4">Theme Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Primary Color
                </label>
                <input
                  type="color"
                  value={settings.theme.primaryColor}
                  onChange={(e) => setSettings({
                    ...settings,
                    theme: { ...settings.theme, primaryColor: e.target.value }
                  })}
                  className="w-full h-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Text Color
                </label>
                <input
                  type="color"
                  value={settings.theme.textColor}
                  onChange={(e) => setSettings({
                    ...settings,
                    theme: { ...settings.theme, textColor: e.target.value }
                  })}
                  className="w-full h-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Background Color
                </label>
                <input
                  type="color"
                  value={settings.theme.backgroundColor}
                  onChange={(e) => setSettings({
                    ...settings,
                    theme: { ...settings.theme, backgroundColor: e.target.value }
                  })}
                  className="w-full h-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
                />
              </div>
            </div>
          </div>

          {/* Workflow Settings */}
          <div>
            <h3 className="text-base font-medium mb-4">Workflow Settings</h3>
            <div className="space-y-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={settings.workflow.useKnowledgeBase}
                  onChange={(e) => setSettings({
                    ...settings,
                    workflow: { ...settings.workflow, useKnowledgeBase: e.target.checked }
                  })}
                  className="checkbox-custom"
                />
                <div>
                  <p className="font-medium">Use Knowledge Base</p>
                  <p className="text-sm text-gray-500">Search knowledge base for answers before using ChatGPT</p>
                </div>
              </label>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Max Response Time (seconds)
                </label>
                <input
                  type="number"
                  min="1"
                  value={settings.workflow.maxResponseTime}
                  onChange={(e) => setSettings({
                    ...settings,
                    workflow: { ...settings.workflow, maxResponseTime: parseInt(e.target.value) }
                  })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Fallback Message
                </label>
                <input
                  type="text"
                  value={settings.workflow.fallbackMessage}
                  onChange={(e) => setSettings({
                    ...settings,
                    workflow: { ...settings.workflow, fallbackMessage: e.target.value }
                  })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
                />
              </div>
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