import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { CustomerFilters } from './CustomerFilters';
import { CustomerTable } from './CustomerTable';
import { AddCustomerModal } from './AddCustomerModal';
import { customerService } from '../../services/supabase';
import toast from 'react-hot-toast';

export function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
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

  // Fetch customers on component mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const data = await customerService.getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
      toast.error('Failed to load customers');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCustomer = async (newCustomer) => {
    try {
      // Format tags as an array if it comes as a string
      if (typeof newCustomer.tags === 'string') {
        newCustomer.tags = newCustomer.tags.split(',').map(tag => tag.trim()).filter(Boolean);
      }

      // Create new customer in the database
      const savedCustomer = await customerService.createCustomer({
        name: newCustomer.name,
        email: newCustomer.email,
        status: newCustomer.status || 'active',
        avatar: newCustomer.avatar,
        company: newCustomer.company,
        company_size: newCustomer.companySize,
        industry: newCustomer.industry,
        website: newCustomer.website,
        timezone: newCustomer.timezone,
        tags: newCustomer.tags || [],
        notes: newCustomer.notes,
        spent: newCustomer.spent || 0,
        last_order: newCustomer.lastOrder
      });

      // Format the returned customer object to match the app's format
      const formattedCustomer = {
        ...savedCustomer,
        companySize: savedCustomer.company_size,
        lastOrder: savedCustomer.last_order
      };

      setCustomers([formattedCustomer, ...customers]);
      toast.success('Customer added successfully');
    } catch (error) {
      console.error('Error adding customer:', error);
      toast.error('Failed to add customer');
    }
  };

  const handleEditCustomer = async (customer) => {
    try {
      // Format tags as an array if it comes as a string
      if (typeof customer.tags === 'string') {
        customer.tags = customer.tags.split(',').map(tag => tag.trim()).filter(Boolean);
      }

      // Map the customer data to match the database schema
      const updates = {
        name: customer.name,
        email: customer.email,
        status: customer.status,
        avatar: customer.avatar,
        company: customer.company,
        company_size: customer.companySize,
        industry: customer.industry,
        website: customer.website,
        timezone: customer.timezone,
        tags: customer.tags,
        notes: customer.notes,
        spent: customer.spent,
        last_order: customer.lastOrder,
        updated_at: new Date().toISOString()
      };

      // Update customer in the database
      const updatedCustomer = await customerService.updateCustomer(customer.id, updates);
      
      // Format the returned customer object to match the app's format
      const formattedCustomer = {
        ...updatedCustomer,
        companySize: updatedCustomer.company_size,
        lastOrder: updatedCustomer.last_order
      };

      setCustomers(customers.map(c => c.id === customer.id ? formattedCustomer : c));
      toast.success('Customer updated successfully');
    } catch (error) {
      console.error('Error updating customer:', error);
      toast.error('Failed to update customer');
    }
  };

  const handleDeleteCustomer = async (customerId) => {
    try {
      await customerService.deleteCustomer(customerId);
      setCustomers(customers.filter(c => c.id !== customerId));
      toast.success('Customer deleted successfully');
    } catch (error) {
      console.error('Error deleting customer:', error);
      toast.error('Failed to delete customer');
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedCustomers.length === 0) return;

    try {
      // Delete all selected customers
      await Promise.all(selectedCustomers.map(id => customerService.deleteCustomer(id)));
      
      // Update state
      setCustomers(customers.filter(customer => !selectedCustomers.includes(customer.id)));
      setSelectedCustomers([]);
      toast.success(`${selectedCustomers.length} customers deleted`);
    } catch (error) {
      console.error('Error deleting customers:', error);
      toast.error('Failed to delete customers');
    }
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
        customer.last_order || customer.lastOrder || '',
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
        customer.name?.toLowerCase().includes(search) ||
        customer.email?.toLowerCase().includes(search) ||
        customer.company?.toLowerCase().includes(search)
      );
    }
    if (filters.timezone && customer.timezone !== filters.timezone) {
      return false;
    }
    if (filters.tags?.length > 0 && !filters.tags.some(tag => customer.tags?.includes(tag))) {
      return false;
    }
    if (filters.companySize && customer.companySize !== filters.companySize && customer.company_size !== filters.companySize) {
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
        const dateA = a.lastOrder || a.last_order;
        const dateB = b.lastOrder || b.last_order;
        return new Date(dateB || 0) - new Date(dateA || 0);
      default:
        return a.name?.localeCompare(b.name || '');
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
              {loading ? (
                <div className="flex justify-center p-8">
                  <p>Loading customers...</p>
                </div>
              ) : (
                <CustomerTable 
                  customers={filteredCustomers}
                  selectedCustomers={selectedCustomers}
                  onSelectCustomers={setSelectedCustomers}
                  onEdit={handleEditCustomer}
                  onDelete={handleDeleteCustomer}
                />
              )}
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