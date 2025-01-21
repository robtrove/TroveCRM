import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { themeService } from '../../../services/theme';
import { Disclosure } from '@headlessui/react';
import toast from 'react-hot-toast';

function Section({ title, children, defaultOpen = false }) {
  return (
    <Disclosure defaultOpen={defaultOpen}>
      {({ open }) => (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <Disclosure.Button className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-hover hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <h3 className="text-base font-medium">{title}</h3>
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
              {children}
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}

function FontPreview({ font, text = "The quick brown fox jumps over the lazy dog" }) {
  return (
    <div className="mt-2 p-3 bg-white dark:bg-dark-hover rounded-lg border border-gray-200 dark:border-gray-700">
      <p style={{ fontFamily: font }} className="text-lg">
        {text}
      </p>
    </div>
  );
}

function ButtonPreview({ settings }) {
  const buttonStyle = {
    backgroundColor: settings.colors.buttonBg,
    color: settings.colors.buttonText,
    borderRadius: settings.components.buttons.roundness === 'full' ? '9999px' : 
                 settings.components.buttons.roundness === 'none' ? '0' :
                 `var(--radius-${settings.components.buttons.roundness})`,
    padding: settings.components.buttons.padding.md,
    boxShadow: settings.components.buttons.shadow === 'none' ? 'none' :
               `var(--shadow-${settings.components.buttons.shadow})`
  };

  const buttonHoverStyle = {
    backgroundColor: settings.colors.buttonHoverBg,
    color: settings.colors.buttonHoverText
  };

  return (
    <div className="mt-4 p-4 bg-gray-50 dark:bg-dark-hover rounded-lg space-y-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Button Preview
      </label>
      <div className="flex gap-2">
        <button 
          style={buttonStyle}
          className="transition-colors hover:bg-opacity-90"
          onMouseOver={(e) => {
            Object.assign(e.target.style, buttonHoverStyle);
          }}
          onMouseOut={(e) => {
            Object.assign(e.target.style, buttonStyle);
          }}
        >
          Primary Button
        </button>
        <Button variant="secondary">Secondary Button</Button>
      </div>
    </div>
  );
}

export function ThemeSettings() {
  const [settings, setSettings] = useState(themeService.getSettings());
  const [isPreview, setIsPreview] = useState(false);
  const [previewSettings, setPreviewSettings] = useState(settings);

  useEffect(() => {
    if (isPreview) {
      themeService.applyTheme(previewSettings);
    } else {
      themeService.applyTheme(settings);
    }
  }, [isPreview, previewSettings, settings]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (themeService.saveSettings(settings)) {
      toast.success('Theme settings saved successfully');
      setIsPreview(false);
    } else {
      toast.error('Failed to save theme settings');
    }
  };

  const handleResetDefaults = () => {
    const defaultSettings = themeService.defaultSettings;
    setSettings(defaultSettings);
    themeService.applyTheme(defaultSettings);
    toast.success('Theme reset to defaults');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Theme Settings</h2>
          <div className="flex items-center gap-2">
            <Button 
              variant="secondary" 
              onClick={handleResetDefaults}
              title="Reset to default theme"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                <path d="M224.49,136.49l-72,72a12,12,0,0,1-17,0l-72-72a12,12,0,0,1,17-17L128,167V40a12,12,0,0,1,24,0V167l47.51-47.52a12,12,0,0,1,17,17Z"/>
              </svg>
            </Button>
            {!isPreview ? (
              <Button variant="secondary" onClick={() => setIsPreview(true)}>
                Preview
              </Button>
            ) : (
              <Button variant="secondary" onClick={() => setIsPreview(false)}>
                Exit Preview
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Typography */}
          <Section title="Typography" defaultOpen>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Primary Font
                </label>
                <select
                  value={settings.font.primary}
                  onChange={(e) => setSettings({
                    ...settings,
                    font: { ...settings.font, primary: e.target.value }
                  })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
                >
                  <option value="Inter">Inter</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Open Sans">Open Sans</option>
                  <option value="Poppins">Poppins</option>
                  <option value="Montserrat">Montserrat</option>
                  <option value="Lato">Lato</option>
                  <option value="Source Sans Pro">Source Sans Pro</option>
                  <option value="Nunito">Nunito</option>
                  <option value="Raleway">Raleway</option>
                  <option value="Ubuntu">Ubuntu</option>
                </select>
                <FontPreview font={settings.font.primary} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Headings Font
                </label>
                <select
                  value={settings.font.headings}
                  onChange={(e) => setSettings({
                    ...settings,
                    font: { ...settings.font, headings: e.target.value }
                  })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
                >
                  <option value="Inter">Inter</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Open Sans">Open Sans</option>
                  <option value="Poppins">Poppins</option>
                  <option value="Montserrat">Montserrat</option>
                  <option value="Lato">Lato</option>
                  <option value="Source Sans Pro">Source Sans Pro</option>
                  <option value="Nunito">Nunito</option>
                  <option value="Raleway">Raleway</option>
                  <option value="Ubuntu">Ubuntu</option>
                </select>
                <FontPreview font={settings.font.headings} text="The Quick Brown Fox" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Font Sizes
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['h1', 'h2', 'h3', 'h4', 'h5', 'body', 'small'].map((size) => (
                  <div key={size}>
                    <label className="block text-sm text-gray-500 mb-1">
                      {size.toUpperCase()}
                    </label>
                    <input
                      type="text"
                      value={settings.font.sizes[size]}
                      onChange={(e) => setSettings({
                        ...settings,
                        font: {
                          ...settings.font,
                          sizes: {
                            ...settings.font.sizes,
                            [size]: e.target.value
                          }
                        }
                      })}
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* Colors */}
          <Section title="Colors">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Brand Colors */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Primary Color
                </label>
                <input
                  type="color"
                  value={settings.colors.primary}
                  onChange={(e) => setSettings({
                    ...settings,
                    colors: { ...settings.colors, primary: e.target.value }
                  })}
                  className="w-full h-10 rounded-xl border border-gray-200 dark:border-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Secondary Color
                </label>
                <input
                  type="color"
                  value={settings.colors.secondary}
                  onChange={(e) => setSettings({
                    ...settings,
                    colors: { ...settings.colors, secondary: e.target.value }
                  })}
                  className="w-full h-10 rounded-xl border border-gray-200 dark:border-gray-700"
                />
              </div>
            </div>

            {/* Menu Colors */}
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Menu Colors</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Background
                  </label>
                  <input
                    type="color"
                    value={settings.colors.menuBg}
                    onChange={(e) => setSettings({
                      ...settings,
                      colors: { ...settings.colors, menuBg: e.target.value }
                    })}
                    className="w-full h-10 rounded-xl border border-gray-200 dark:border-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Text
                  </label>
                  <input
                    type="color"
                    value={settings.colors.menuText}
                    onChange={(e) => setSettings({
                      ...settings,
                      colors: { ...settings.colors, menuText: e.target.value }
                    })}
                    className="w-full h-10 rounded-xl border border-gray-200 dark:border-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Text Hover
                  </label>
                  <input
                    type="color"
                    value={settings.colors.menuTextHover}
                    onChange={(e) => setSettings({
                      ...settings,
                      colors: { ...settings.colors, menuTextHover: e.target.value }
                    })}
                    className="w-full h-10 rounded-xl border border-gray-200 dark:border-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Text Active
                  </label>
                  <input
                    type="color"
                    value={settings.colors.menuTextActive}
                    onChange={(e) => setSettings({
                      ...settings,
                      colors: { ...settings.colors, menuTextActive: e.target.value }
                    })}
                    className="w-full h-10 rounded-xl border border-gray-200 dark:border-gray-700"
                  />
                </div>
              </div>
            </div>

            {/* Button Colors */}
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Button Colors</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Background
                  </label>
                  <input
                    type="color"
                    value={settings.colors.buttonBg}
                    onChange={(e) => setSettings({
                      ...settings,
                      colors: { ...settings.colors, buttonBg: e.target.value }
                    })}
                    className="w-full h-10 rounded-xl border border-gray-200 dark:border-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Text
                  </label>
                  <input
                    type="color"
                    value={settings.colors.buttonText}
                    onChange={(e) => setSettings({
                      ...settings,
                      colors: { ...settings.colors, buttonText: e.target.value }
                    })}
                    className="w-full h-10 rounded-xl border border-gray-200 dark:border-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Hover Background
                  </label>
                  <input
                    type="color"
                    value={settings.colors.buttonHoverBg}
                    onChange={(e) => setSettings({
                      ...settings,
                      colors: { ...settings.colors, buttonHoverBg: e.target.value }
                    })}
                    className="w-full h-10 rounded-xl border border-gray-200 dark:border-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Hover Text
                  </label>
                  <input
                    type="color"
                    value={settings.colors.buttonHoverText}
                    onChange={(e) => setSettings({
                      ...settings,
                      colors: { ...settings.colors, buttonHoverText: e.target.value }
                    })}
                    className="w-full h-10 rounded-xl border border-gray-200 dark:border-gray-700"
                  />
                </div>
              </div>
            </div>
          </Section>

          {/* Layout */}
          <Section title="Layout">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Content Width
                </label>
                <input
                  type="text"
                  value={settings.layout.contentWidth}
                  onChange={(e) => setSettings({
                    ...settings,
                    layout: { ...settings.layout, contentWidth: e.target.value }
                  })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sidebar Width
                </label>
                <input
                  type="text"
                  value={settings.layout.sidebarWidth}
                  onChange={(e) => setSettings({
                    ...settings,
                    layout: { ...settings.layout, sidebarWidth: e.target.value }
                  })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
                />
              </div>
            </div>
          </Section>

          {/* Components */}
          <Section title="Components">
            <div className="space-y-6">
              {/* Buttons */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Buttons</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">
                      Roundness
                    </label>
                    <select
                      value={settings.components.buttons.roundness}
                      onChange={(e) => setSettings({
                        ...settings,
                        components: {
                          ...settings.components,
                          buttons: {
                            ...settings.components.buttons,
                            roundness: e.target.value
                          }
                        }
                      })}
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
                    >
                      <option value="none">None</option>
                      <option value="sm">Small</option>
                      <option value="md">Medium</option>
                      <option value="lg">Large</option>
                      <option value="xl">Extra Large</option>
                      <option value="full">Full</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-500 mb-1">
                      Padding
                    </label>
                    <select
                      value={settings.components.buttons.padding.md}
                      onChange={(e) => setSettings({
                        ...settings,
                        components: {
                          ...settings.components,
                          buttons: {
                            ...settings.components.buttons,
                            padding: {
                              ...settings.components.buttons.padding,
                              md: e.target.value
                            }
                          }
                        }
                      })}
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
                    >
                      <option value="0.5rem 1rem">Compact</option>
                      <option value="0.75rem 1.5rem">Normal</option>
                      <option value="1rem 2rem">Relaxed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-500 mb-1">
                      Shadow
                    </label>
                    <select
                      value={settings.components.buttons.shadow}
                      onChange={(e) => setSettings({
                        ...settings,
                        components: {
                          ...settings.components,
                          buttons: {
                            ...settings.components.buttons,
                            shadow: e.target.value
                          }
                        }
                      })}
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
                    >
                      <option value="none">None</option>
                      <option value="sm">Small</option>
                      <option value="md">Medium</option>
                      <option value="lg">Large</option>
                    </select>
                  </div>
                </div>

                <ButtonPreview settings={settings} />
              </div>
            </div>
          </Section>

          <div className="flex justify-end gap-2">
            {isPreview && (
              <Button type="button" variant="secondary" onClick={() => setIsPreview(false)}>
                Cancel Preview
              </Button>
            )}
            <Button type="submit">Save Settings</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}