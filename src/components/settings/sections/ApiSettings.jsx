import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { chargebeeService } from '../../../services/chargebee';
import toast from 'react-hot-toast';
import { Disclosure } from '@headlessui/react';

const ApiProviders = {
  chargebee: {
    name: 'Chargebee',
    logo: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
      </svg>
    ),
    description: 'Subscription billing and revenue operations'
  },
  openai: {
    name: 'OpenAI',
    logo: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
      </svg>
    ),
    description: 'AI-powered chat and content generation'
  }
};

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
  const [isTestingConnection, setIsTestingConnection] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save settings to database
    toast.success('API settings saved successfully');
  };

  const handleTestChargebee = async () => {
    if (!settings.chargebee.apiKey) {
      toast.error('Please enter a Chargebee API key');
      return;
    }

    setIsTestingConnection(true);
    try {
      await chargebeeService.testConnection(settings.chargebee.apiKey);
      toast.success('Successfully connected to Chargebee!');
    } catch (error) {
      toast.error(error.message || 'Failed to connect to Chargebee');
    } finally {
      setIsTestingConnection(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">API Settings</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {Object.entries(ApiProviders).map(([provider, { name, logo, description }]) => (
            <Disclosure key={provider} defaultOpen={provider === 'chargebee'}>
              {({ open }) => (
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <Disclosure.Button className="w-full flex items-center gap-4 p-4 bg-gray-50 dark:bg-dark-hover hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <div className="text-primary dark:text-white">{logo}</div>
                    <div className="flex-1 text-left">
                      <h3 className="font-medium">{name}</h3>
                      <p className="text-sm text-gray-500">{description}</p>
                    </div>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="20" 
                      height="20" 
                      fill="currentColor" 
                      viewBox="0 0 256 256"
                      className={`transform transition-transform ${open ? 'rotate-180' : ''}`}
                    >
                      <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"/>
                    </svg>
                  </Disclosure.Button>

                  <Disclosure.Panel>
                    <div className="p-4 space-y-4">
                      {provider === 'chargebee' ? (
                        <>
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
                            <div className="flex gap-2">
                              <input
                                type="password"
                                value={settings.chargebee.apiKey}
                                onChange={(e) => setSettings({
                                  ...settings,
                                  chargebee: { ...settings.chargebee, apiKey: e.target.value }
                                })}
                                placeholder="Enter your Chargebee API key"
                                className="flex-1 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
                              />
                              <Button 
                                type="button"
                                variant="secondary"
                                onClick={handleTestChargebee}
                                disabled={isTestingConnection}
                              >
                                {isTestingConnection ? (
                                  <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Testing...
                                  </>
                                ) : 'Test Connection'}
                              </Button>
                            </div>
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
                        </>
                      ) : (
                        <>
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
                        </>
                      )}
                    </div>
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          ))}

          <div className="flex justify-end">
            <Button type="submit">Save Settings</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}