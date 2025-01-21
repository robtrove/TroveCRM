import React from 'react';
import { Menu } from '@headlessui/react';
import { useCurrency } from '../../hooks/useCurrency';

export function CurrencySelector() {
  const { currency, setCurrency, currencies } = useCurrency();

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-1.5 px-2 py-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-lg transition-colors">
        <span className="text-base">{currencies[currency].flag}</span>
        <span>{currencies[currency].symbol}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
          <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
        </svg>
      </Menu.Button>

      <Menu.Items className="absolute right-0 mt-1 w-48 bg-white dark:bg-dark-card rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 focus:outline-none z-dropdown">
        <div className="p-1">
          {Object.entries(currencies).map(([code, { symbol, flag, name }]) => (
            <Menu.Item key={code}>
              {({ active }) => (
                <button
                  onClick={() => setCurrency(code)}
                  className={`flex items-center gap-3 w-full px-3 py-2 text-sm rounded-lg ${
                    active ? 'bg-gray-50 dark:bg-dark-hover' : ''
                  } ${
                    currency === code ? 'text-primary font-medium' : 'text-gray-700 dark:text-gray-200'
                  }`}
                >
                  <span className="text-base">{flag}</span>
                  <span className="flex-1 text-left">{name}</span>
                  <span>{symbol}</span>
                </button>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  );
}