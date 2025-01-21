import React from 'react';
import { House, UsersThree, ChatDots, Megaphone, ChartPie, Support, Ticket, Pipeline, Settings } from './Icons';
import { authService } from '../services/auth';
import clsx from 'clsx';

const getMenuItems = (isAdmin) => {
  const items = [
    { id: 'dashboard', text: 'Dashboard', icon: House },
    { id: 'customers', text: 'Customers', icon: UsersThree },
    { id: 'tickets', text: 'Tickets', icon: Ticket },
    { id: 'pipeline', text: 'Pipeline', icon: Pipeline },
    { id: 'conversations', text: 'Conversations', icon: ChatDots },
    { id: 'campaigns', text: 'Campaigns', icon: Megaphone },
    { id: 'reporting', text: 'Reporting', icon: ChartPie },
    { id: 'support', text: 'Support', icon: Support }
  ];

  if (isAdmin) {
    items.push({ id: 'administration', text: 'Administration', icon: Settings });
  }

  return items;
};

export default function Sidebar({ isOpen, onClose, currentPage, onMenuItemClick }) {
  const isAdmin = authService.isAdmin();
  const menuItems = getMenuItems(isAdmin);

  return (
    <aside className={clsx(
      'fixed inset-y-0 left-0 w-20 bg-white dark:bg-dark-card border-r border-gray-100 dark:border-gray-800 lg:static transform transition-all duration-300 ease-in-out z-sidebar',
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    )}>
      <div className="flex h-full flex-col">
        {/* Mobile header */}
        <div className="flex items-center justify-between p-4 lg:hidden">
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-xl transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {/* Navigation menu */}
          <nav className="flex flex-col gap-1 p-4">
            {menuItems.map((item) => (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => onMenuItemClick(item.id)}
                  className={clsx(
                    'w-full flex flex-col items-center gap-1 px-2 py-3 rounded-xl transition-all duration-200',
                    currentPage === item.id
                      ? 'bg-black text-white dark:bg-white dark:text-black'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-hover'
                  )}
                  title={item.text}
                >
                  <item.icon />
                  <span className="text-[10px] font-medium">{item.text}</span>
                </button>
                {/* Tooltip */}
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-tooltip">
                  {item.text}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}