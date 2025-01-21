import React from 'react';
import { SearchBar } from './SearchBar';
import { NotificationsMenu } from './NotificationsMenu';
import { UserMenu } from './UserMenu';
import { ThemeToggle } from './ThemeToggle';
import { CurrencySelector } from './CurrencySelector';
import { Button } from './Button';

export function Header({ onMenuClick, onNavigate, onLogout, user }) {
  return (
    <header className="sticky top-0 z-header bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-[1440px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-xl transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <img src="/trove-logo.svg" alt="Trove" className="h-8 w-auto" />
            <span className="text-xl font-bold">Lyseon</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <SearchBar />
          <CurrencySelector />
          <NotificationsMenu />
          <ThemeToggle />
          <UserMenu onNavigate={onNavigate} onLogout={onLogout} user={user} />
        </div>
      </div>
    </header>
  );
}