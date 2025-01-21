import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { CustomerFilters } from './CustomerFilters';
import { CustomerTable } from './CustomerTable';
import { AddCustomerModal } from './AddCustomerModal';
import toast from 'react-hot-toast';

const initialCustomers = [
  {
    id: 1,
    name: 'Alice Freeman',
    email: 'alice@example.com',
    status: 'active',
    spent: 1200,
    lastOrder: '2023-12-20',
    avatar: 'https://cdn.usegalileo.ai/stability/117a7a12-7704-4917-9139-4a3f76c42e78.png',
    company: 'TechCorp Inc',
    companySize: '1000+',
    industry: 'Technology',
    website: 'https://techcorp.com',
    timezone: 'America/New_York',
    tags: ['enterprise', 'tech']
  }
];

export function CustomersPage() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    sortBy: 'name',
    createdFrom: '',
    createdTo: '',
    timezone: '',
    tags: [],
    companySize: '',
    industry: ''
  });

  const handleAddCustomer = (newCustomer) => {
    setCustomers([...customers, newCustomer]);
  };

  const handleEditCustomer = (customer) => {
    // TODO: Implement edit functionality
    console.log('Edit customer:', customer);
  };

  const handleDeleteCustomer = (customerId) => {
    setCustomers(customers.filter(c => c.id !== customerId));
    toast.success('Customer deleted successfully');
  };

  const handleDeleteSelected = () => {
    if (selectedCustomers.length === 0) return;

    const updatedCustomers = customers.filter(
      customer => !selectedCustomers.includes(customer.id)
    );
    setCustomers(updatedCustomers);
    setSelectedCustomers([]);
    toast.success(`${selectedCustomers.length} customers deleted`);
  };

  const handleExportCSV = () => {
    const headers = [
      'Name',
      'Email',
      'Status',
      'Company',
      'Industry',
      'Total Spent',
      'Last Order',
      'Created'
    ];

    const csvContent = [
      headers.join(','),
      ...customers.map(customer => [
        customer.name,
        customer.email,
        customer.status,
        customer.company || '',
        customer.industry || '',
        customer.spent,
        customer.lastOrder,
        customer.created_at
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'customers.csv';
    link.click();
  };

  const filteredCustomers = customers.filter(customer => {
    if (filters.status !== 'all' && customer.status !== filters.status) {
      return false;
    }
    if (filters.search) {
      const search = filters.search.toLowerCase();
      return (
        customer.name.toLowerCase().includes(search) ||
        customer.email.toLowerCase().includes(search) ||
        customer.company?.toLowerCase().includes(search)
      );
    }
    if (filters.timezone && customer.timezone !== filters.timezone) {
      return false;
    }
    if (filters.tags?.length > 0 && !filters.tags.some(tag => customer.tags?.includes(tag))) {
      return false;
    }
    if (filters.companySize && customer.companySize !== filters.companySize) {
      return false;
    }
    if (filters.industry && customer.industry !== filters.industry) {
      return false;
    }
    if (filters.createdFrom && new Date(customer.created_at) < new Date(filters.createdFrom)) {
      return false;
    }
    if (filters.createdTo && new Date(customer.created_at) > new Date(filters.createdTo)) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'spent':
        return b.spent - a.spent;
      case 'lastOrder':
        return new Date(b.lastOrder) - new Date(a.lastOrder);
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return (
    <main className="flex-1 min-w-0 overflow-auto">
      <div className="max-w-[1440px] mx-auto animate-fade-in">
        <div className="flex flex-wrap items-center justify-between gap-4 p-4">
          <h1 className="text-gray-900 dark:text-white text-2xl md:text-3xl font-bold">Customers</h1>
          <div className="flex items-center gap-2">
            <Button onClick={() => setIsFiltersOpen(true)} variant="secondary">
              Filters
            </Button>
            <Button onClick={() => setIsAddModalOpen(true)}>
              Add Customer
            </Button>
          </div>
        </div>

        <div className="p-4">
          <Card>
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex-1 min-w-[200px]">
                  <input
                    type="text"
                    placeholder="Search customers..."
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
                  />
                </div>
                <div className="flex items-center gap-2">
                  {selectedCustomers.length > 0 && (
                    <Button 
                      variant="secondary" 
                      onClick={handleDeleteSelected}
                    >
                      Delete Selected ({selectedCustomers.length})
                    </Button>
                  )}
                  <Button variant="secondary" onClick={handleExportCSV}>
                    Export CSV
                  </Button>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                    className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
                  >
                    <option value="name">Sort by Name</option>
                    <option value="spent">Sort by Spent</option>
                    <option value="lastOrder">Sort by Last Order</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CustomerTable 
                customers={filteredCustomers}
                selectedCustomers={selectedCustomers}
                onSelectCustomers={setSelectedCustomers}
                onEdit={handleEditCustomer}
                onDelete={handleDeleteCustomer}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <AddCustomerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddCustomer}
      />

      <CustomerFilters
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        filters={filters}
        onChange={setFilters}
      />
    </main>
  );
}