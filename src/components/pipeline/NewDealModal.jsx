import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import toast from 'react-hot-toast';

export function NewDealModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    value: '',
    dueDate: '',
    assignedTo: {
      name: 'Alice Freeman',
      avatar: 'https://cdn.usegalileo.ai/stability/117a7a12-7704-4917-9139-4a3f76c42e78.png'
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.company || !formData.value) {
      toast.error('Please fill in all required fields');
      return;
    }

    onSubmit({
      ...formData,
      id: Date.now(),
      stage: 'qualified',
      progress: 0
    });
    
    onClose();
    toast.success('New deal created successfully');
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/20 dark:bg-black/40" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md">
          <Card>
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
              <Dialog.Title className="text-lg font-semibold">
                Create New Deal
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

            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Deal Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Deal Value *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={formData.value}
                      onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                      className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Assigned To
                  </label>
                  <select
                    value={formData.assignedTo.name}
                    onChange={(e) => {
                      const agents = {
                        'Alice Freeman': {
                          name: 'Alice Freeman',
                          avatar: 'https://cdn.usegalileo.ai/stability/117a7a12-7704-4917-9139-4a3f76c42e78.png'
                        },
                        'Bob Smith': {
                          name: 'Bob Smith',
                          avatar: 'https://cdn.usegalileo.ai/stability/d4e7d763-28f3-4af2-bc57-a26db12c522b.png'
                        }
                      };
                      setFormData({ ...formData, assignedTo: agents[e.target.value] });
                    }}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
                  >
                    <option value="Alice Freeman">Alice Freeman</option>
                    <option value="Bob Smith">Bob Smith</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100 dark:border-gray-800">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Create Deal
                </Button>
              </div>
            </form>
          </Card>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}