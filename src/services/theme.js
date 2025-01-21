class ThemeService {
  constructor() {
    this.defaultSettings = {
      font: {
        primary: 'Inter',
        headings: 'Inter',
        customFontUrl: '',
        sizes: {
          h1: '2.5rem',
          h2: '2rem',
          h3: '1.75rem',
          h4: '1.5rem',
          h5: '1.25rem',
          body: '1rem',
          small: '0.875rem'
        }
      },
      colors: {
        primary: '#0A0A0A',
        secondary: '#2A2A2A',
        headerBg: '#FFFFFF',
        menuBg: '#FFFFFF',
        menuText: '#4B5563',
        menuTextHover: '#111827',
        menuTextActive: '#FFFFFF',
        buttonBg: '#0A0A0A',
        buttonText: '#FFFFFF',
        buttonHoverBg: '#2A2A2A',
        buttonHoverText: '#FFFFFF',
        inputBorder: '#E4E7ED',
        inputBorderFocus: '#0A0A0A',
        inputBg: '#FFFFFF',
        inputText: '#111827'
      },
      layout: {
        contentWidth: '1440px',
        sidebarWidth: '280px',
        headerHeight: '64px',
        borderRadius: {
          sm: '0.375rem',
          md: '0.5rem',
          lg: '0.75rem',
          xl: '1rem'
        },
        spacing: {
          xs: '0.5rem',
          sm: '1rem',
          md: '1.5rem',
          lg: '2rem',
          xl: '3rem'
        }
      },
      components: {
        buttons: {
          padding: {
            sm: '0.5rem 1rem',
            md: '0.75rem 1.5rem',
            lg: '1rem 2rem'
          },
          roundness: 'xl',
          shadow: 'none'
        },
        cards: {
          padding: '1.5rem',
          shadow: 'sm',
          roundness: 'xl'
        },
        inputs: {
          height: '2.5rem',
          padding: '0.5rem 1rem',
          roundness: 'lg'
        }
      },
      transitions: {
        duration: '200ms',
        timing: 'ease-in-out'
      }
    };
  }

  getSettings() {
    try {
      const savedSettings = localStorage.getItem('themeSettings');
      if (!savedSettings) return this.defaultSettings;

      const parsedSettings = JSON.parse(savedSettings);
      // Merge with default settings to ensure all properties exist
      return {
        ...this.defaultSettings,
        ...parsedSettings,
        font: {
          ...this.defaultSettings.font,
          ...parsedSettings.font,
          sizes: {
            ...this.defaultSettings.font.sizes,
            ...(parsedSettings.font?.sizes || {})
          }
        },
        colors: {
          ...this.defaultSettings.colors,
          ...(parsedSettings.colors || {})
        },
        layout: {
          ...this.defaultSettings.layout,
          ...(parsedSettings.layout || {}),
          borderRadius: {
            ...this.defaultSettings.layout.borderRadius,
            ...(parsedSettings.layout?.borderRadius || {})
          },
          spacing: {
            ...this.defaultSettings.layout.spacing,
            ...(parsedSettings.layout?.spacing || {})
          }
        },
        components: {
          ...this.defaultSettings.components,
          ...(parsedSettings.components || {}),
          buttons: {
            ...this.defaultSettings.components.buttons,
            ...(parsedSettings.components?.buttons || {}),
            padding: {
              ...this.defaultSettings.components.buttons.padding,
              ...(parsedSettings.components?.buttons?.padding || {})
            }
          },
          cards: {
            ...this.defaultSettings.components.cards,
            ...(parsedSettings.components?.cards || {})
          },
          inputs: {
            ...this.defaultSettings.components.inputs,
            ...(parsedSettings.components?.inputs || {})
          }
        },
        transitions: {
          ...this.defaultSettings.transitions,
          ...(parsedSettings.transitions || {})
        }
      };
    } catch (error) {
      console.error('Error loading theme settings:', error);
      return this.defaultSettings;
    }
  }

  saveSettings(settings) {
    try {
      // Ensure all required properties exist by merging with defaults
      const mergedSettings = {
        ...this.defaultSettings,
        ...settings,
        font: {
          ...this.defaultSettings.font,
          ...settings.font,
          sizes: {
            ...this.defaultSettings.font.sizes,
            ...(settings.font?.sizes || {})
          }
        },
        colors: {
          ...this.defaultSettings.colors,
          ...(settings.colors || {})
        }
      };

      localStorage.setItem('themeSettings', JSON.stringify(mergedSettings));
      this.applyTheme(mergedSettings);
      return true;
    } catch (error) {
      console.error('Error saving theme settings:', error);
      return false;
    }
  }

  applyTheme(settings = this.defaultSettings) {
    if (!settings || typeof window === 'undefined') return;

    const root = document.documentElement;

    // Safely apply settings with fallbacks
    const safeSettings = {
      ...this.defaultSettings,
      ...settings,
      font: {
        ...this.defaultSettings.font,
        ...settings.font,
        sizes: {
          ...this.defaultSettings.font.sizes,
          ...(settings.font?.sizes || {})
        }
      },
      colors: {
        ...this.defaultSettings.colors,
        ...(settings.colors || {})
      }
    };

    // Apply colors
    Object.entries(safeSettings.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    // Apply fonts
    root.style.setProperty('--font-primary', safeSettings.font.primary);
    root.style.setProperty('--font-headings', safeSettings.font.headings);

    // Apply font sizes
    Object.entries(safeSettings.font.sizes).forEach(([key, value]) => {
      root.style.setProperty(`--font-size-${key}`, value);
    });

    // Create dynamic styles
    const styles = `
      :root {
        /* Base Typography */
        font-family: var(--font-primary);
        font-size: var(--font-size-body);
        line-height: 1.5;
      }

      /* Headings */
      h1, .h1 { font-size: var(--font-size-h1); line-height: 1.2; }
      h2, .h2 { font-size: var(--font-size-h2); line-height: 1.25; }
      h3, .h3 { font-size: var(--font-size-h3); line-height: 1.3; }
      h4, .h4 { font-size: var(--font-size-h4); line-height: 1.35; }
      h5, .h5 { font-size: var(--font-size-h5); line-height: 1.4; }
      small, .small { font-size: var(--font-size-small); }

      /* Colors */
      .text-primary { color: var(--color-primary); }
      .bg-primary { background-color: var(--color-primary); }
      
      /* Buttons */
      .btn {
        background-color: var(--color-buttonBg);
        color: var(--color-buttonText);
      }
      .btn:hover {
        background-color: var(--color-buttonHoverBg);
        color: var(--color-buttonHoverText);
      }
    `;

    let styleEl = document.getElementById('theme-dynamic-styles');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'theme-dynamic-styles';
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = styles;

    // Load custom font if provided
    if (safeSettings.font?.customFontUrl) {
      this.loadCustomFont(safeSettings.font.customFontUrl);
    }
  }

  loadCustomFont(url) {
    if (!url || typeof window === 'undefined') return;

    const link = document.createElement('link');
    link.href = url;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
}

export const themeService = new ThemeService();