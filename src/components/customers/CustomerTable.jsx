import React, { useState } from 'react';
import { format } from 'date-fns';
import { Menu } from '@headlessui/react';
import { Dialog } from '@headlessui/react';
import clsx from 'clsx';

export function CustomerTable({ customers, selectedCustomers, onSelectCustomers, onEdit, onDelete }) {
  const [deleteConfirmation, setDeleteConfirmation] = useState({ isOpen: false, customerId: null });

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      onSelectCustomers(customers.map(customer => customer.id));
    } else {
      onSelectCustomers([]);
    }
  };

  const handleSelectCustomer = (customerId) => {
    if (selectedCustomers.includes(customerId)) {
      onSelectCustomers(selectedCustomers.filter(id => id !== customerId));
    } else {
      onSelectCustomers([...selectedCustomers, customerId]);
    }
  };

  const handleDeleteClick = (customerId) => {
    setDeleteConfirmation({ isOpen: true, customerId });
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmation.customerId) {
      onDelete(deleteConfirmation.customerId);
      setDeleteConfirmation({ isOpen: false, customerId: null });
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <th className="text-left py-3 px-4">
                <input
                  type="checkbox"
                  checked={selectedCustomers.length === customers.length}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Customer</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Company</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Total Spent</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Last Order</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr 
                key={customer.id}
                className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors"
              >
                <td className="py-3 px-4">
                  <input
                    type="checkbox"
                    checked={selectedCustomers.includes(customer.id)}
                    onChange={() => handleSelectCustomer(customer.id)}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={customer.avatar}
                      alt={customer.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{customer.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{customer.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  {customer.company ? (
                    <div>
                      <p className="text-sm text-gray-900 dark:text-white">{customer.company}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{customer.industry}</p>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">--</span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <span className={clsx(
                    'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                    customer.status === 'active'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                  )}>
                    {customer.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <p className="text-sm text-gray-900 dark:text-white">${customer.spent.toLocaleString()}</p>
                </td>
                <td className="py-3 px-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {format(new Date(customer.lastOrder), 'MMM d, yyyy')}
                  </p>
                </td>
                <td className="py-3 px-4 text-right">
                  <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button className="p-2 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-lg transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M112,60a16,16,0,1,1,16,16A16,16,0,0,1,112,60Zm16,52a16,16,0,1,0,16,16A16,16,0,0,0,128,112Zm0,68a16,16,0,1,0,16,16A16,16,0,0,0,128,180Z" />
                      </svg>
                    </Menu.Button>

                    <Menu.Items className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-card rounded-lg shadow-lg border border-gray-100 dark:border-gray-800 focus:outline-none z-dropdown">
                      <div className="p-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => onEdit(customer)}
                              className={clsx(
                                'flex w-full items-center px-3 py-2 text-sm rounded-md',
                                active ? 'bg-gray-100 dark:bg-dark-hover' : ''
                              )}
                            >
                              Edit Customer
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => handleDeleteClick(customer.id)}
                              className={clsx(
                                'flex w-full items-center px-3 py-2 text-sm rounded-md text-red-600 dark:text-red-400',
                                active ? 'bg-gray-100 dark:bg-dark-hover' : ''
                              )}
                            >
                              Delete Customer
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmation.isOpen}
        onClose={() => setDeleteConfirmation({ isOpen: false, customerId: null })}
        className="relative z-modal"
      >
        <div className="fixed inset-0 bg-black/20 dark:bg-black/40" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm bg-white dark:bg-dark-card rounded-lg shadow-xl">
            <div className="p-6">
              <Dialog.Title className="text-lg font-semibold mb-4">
                Delete Customer
              </Dialog.Title>
              <p className="text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this customer? This action cannot be undone.
              </p>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setDeleteConfirmation({ isOpen: false, customerId: null })}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-dark-hover rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}