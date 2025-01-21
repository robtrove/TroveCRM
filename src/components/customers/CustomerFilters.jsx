import React from 'react';
import { Dialog } from '@headlessui/react';
import { format } from 'date-fns';
import { timezones } from '../../utils/constants';

export function CustomerFilters({ isOpen, onClose, filters, onChange }) {
  const handleChange = (key, value) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-y-0 right-0 z-50"
    >
      <div className="fixed inset-0 bg-black/20 dark:bg-black/40" aria-hidden="true" />
      
      <Dialog.Panel className="fixed inset-y-0 right-0 w-96 bg-white dark:bg-dark-card shadow-xl">
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
            <Dialog.Title className="text-lg font-semibold">
              Filters
            </Dialog.Title>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-6">
              {/* Created Date Range */}
              <div>
                <label className="block text-sm font-medium mb-2">Created Date</label>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">From</label>
                    <input
                      type="date"
                      value={filters.createdFrom || ''}
                      onChange={(e) => handleChange('createdFrom', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">To</label>
                    <input
                      type="date"
                      value={filters.createdTo || ''}
                      onChange={(e) => handleChange('createdTo', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
                    />
                  </div>
                </div>
              </div>

              {/* Timezone */}
              <div>
                <label className="block text-sm font-medium mb-2">Timezone</label>
                <select
                  value={filters.timezone || ''}
                  onChange={(e) => handleChange('timezone', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
                >
                  <option value="">All Timezones</option>
                  {Object.entries(timezones).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <div className="space-y-2">
                  {['enterprise', 'startup', 'mid-market', 'tech', 'finance', 'healthcare', 'retail'].map(tag => (
                    <label key={tag} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={filters.tags?.includes(tag) || false}
                        onChange={(e) => {
                          const newTags = e.target.checked
                            ? [...(filters.tags || []), tag]
                            : (filters.tags || []).filter(t => t !== tag);
                          handleChange('tags', newTags);
                        }}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="text-sm">{tag}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Company Size */}
              <div>
                <label className="block text-sm font-medium mb-2">Company Size</label>
                <select
                  value={filters.companySize || ''}
                  onChange={(e) => handleChange('companySize', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
                >
                  <option value="">All Sizes</option>
                  <option value="1-10">1-10</option>
                  <option value="10-50">10-50</option>
                  <option value="50-100">50-100</option>
                  <option value="100-500">100-500</option>
                  <option value="500-1000">500-1000</option>
                  <option value="1000+">1000+</option>
                </select>
              </div>

              {/* Industry */}
              <div>
                <label className="block text-sm font-medium mb-2">Industry</label>
                <select
                  value={filters.industry || ''}
                  onChange={(e) => handleChange('industry', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
                >
                  <option value="">All Industries</option>
                  <option value="Technology">Technology</option>
                  <option value="Financial Services">Financial Services</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Retail">Retail</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Education">Education</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={() => onChange({})}
              className="w-full px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-lg transition-colors"
            >
              Clear all filters
            </button>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}