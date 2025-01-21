import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../../ui/Card';
import { Button } from '../../ui/Button';
import toast from 'react-hot-toast';

export function ApiSettings() {
  const [settings, setSettings] = useState({
    chargebee: {
      site: '',
      apiKey: '',
      publishableKey: ''
    },
    openai: {
      apiKey: '',
      model: 'gpt-4',
      temperature: 0.7,
      maxTokens: 2000
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would save to your backend
    toast.success('API settings saved successfully');
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">API Settings</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Chargebee Settings */}
          <div>
            <h3 className="text-base font-medium mb-4">Chargebee Configuration</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Site Name
                </label>
                <input
                  type="text"
                  value={settings.chargebee.site}
                  onChange={(e) => setSettings({
                    ...settings,
                    chargebee: { ...settings.chargebee, site: e.target.value }
                  })}
                  placeholder="your-site"
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  API Key
                </label>
                <input
                  type="password"
                  value={settings.chargebee.apiKey}
                  onChange={(e) => setSettings({
                    ...settings,
                    chargebee: { ...settings.chargebee, apiKey: e.target.value }
                  })}
                  placeholder="Enter your Chargebee API key"
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Publishable Key
                </label>
                <input
                  type="password"
                  value={settings.chargebee.publishableKey}
                  onChange={(e) => setSettings({
                    ...settings,
                    chargebee: { ...settings.chargebee, publishableKey: e.target.value }
                  })}
                  placeholder="Enter your Chargebee publishable key"
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
                />
              </div>
            </div>
          </div>

          {/* OpenAI Settings */}
          <div>
            <h3 className="text-base font-medium mb-4">ChatGPT Configuration</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  API Key
                </label>
                <input
                  type="password"
                  value={settings.openai.apiKey}
                  onChange={(e) => setSettings({
                    ...settings,
                    openai: { ...settings.openai, apiKey: e.target.value }
                  })}
                  placeholder="Enter your OpenAI API key"
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Model
                  </label>
                  <select
                    value={settings.openai.model}
                    onChange={(e) => setSettings({
                      ...settings,
                      openai: { ...settings.openai, model: e.target.value }
                    })}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
                  >
                    <option value="gpt-4">GPT-4</option>
                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Temperature
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="1"
                    step="0.1"
                    value={settings.openai.temperature}
                    onChange={(e) => setSettings({
                      ...settings,
                      openai: { ...settings.openai, temperature: parseFloat(e.target.value) }
                    })}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Max Tokens
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="4000"
                    value={settings.openai.maxTokens}
                    onChange={(e) => setSettings({
                      ...settings,
                      openai: { ...settings.openai, maxTokens: parseInt(e.target.value) }
                    })}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
                  />
                </div>
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