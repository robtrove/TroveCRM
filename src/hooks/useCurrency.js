import { useState, useEffect } from 'react';

const currencies = {
  USD: { symbol: '$', rate: 1, flag: '🇺🇸', name: 'US Dollar' },
  EUR: { symbol: '€', rate: 0.91, flag: '🇪🇺', name: 'Euro' },
  GBP: { symbol: '£', rate: 0.79, flag: '🇬🇧', name: 'British Pound' },
  JPY: { symbol: '¥', rate: 143.62, flag: '🇯🇵', name: 'Japanese Yen' },
  AUD: { symbol: 'A$', rate: 1.51, flag: '🇦🇺', name: 'Australian Dollar' },
  CAD: { symbol: 'C$', rate: 1.34, flag: '🇨🇦', name: 'Canadian Dollar' }
};

export function useCurrency() {
  const [currency, setCurrency] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('currency');
      return saved || 'USD';
    }
    return 'USD';
  });

  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  const format = (amount) => {
    const { symbol, rate } = currencies[currency];
    const converted = amount * rate;
    return `${symbol}${converted.toLocaleString(undefined, { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    })}`;
  };

  return {
    currency,
    setCurrency,
    format,
    currencies
  };
}