import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-xl transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-modal"
      >
        <div className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-start justify-center p-4 pt-16">
          <Dialog.Panel className="w-full max-w-2xl bg-white dark:bg-dark-card rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3 p-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-lg text-gray-900 dark:text-white placeholder-gray-400"
                autoFocus
              />
              <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs text-gray-400 bg-gray-100 dark:bg-dark-hover rounded-lg">
                ESC
              </kbd>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}