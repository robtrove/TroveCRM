import React from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

const navItems = [
  { path: 'general', label: 'General' },
  { path: 'users', label: 'Users' },
  { path: 'security', label: 'Security' },
  { path: 'theme', label: 'Theme' },
  { path: 'email', label: 'Email' },
  { path: 'api', label: 'API' },
  { path: 'chat', label: 'Chat' },
  { path: 'integrations', label: 'Integrations' }
];

export function AdminNav() {
  return (
    <nav className="w-64 space-y-1">
      {navItems.map(item => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => clsx(
            'block px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            isActive
              ? 'bg-black text-white dark:bg-white dark:text-black'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-hover'
          )}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}