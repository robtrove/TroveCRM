import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../../ui/Card';
import { Button } from '../../ui/Button';
import toast from 'react-hot-toast';

const initialUsers = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    status: 'active',
    avatar: 'https://cdn.usegalileo.ai/stability/117a7a12-7704-4917-9139-4a3f76c42e78.png'
  },
  {
    id: 2,
    name: 'Support Tech',
    email: 'support@example.com',
    role: 'support',
    status: 'active',
    avatar: 'https://cdn.usegalileo.ai/stability/d4e7d763-28f3-4af2-bc57-a26db12c522b.png'
  },
  {
    id: 3,
    name: 'Sales Agent',
    email: 'sales@example.com',
    role: 'sales',
    status: 'active',
    avatar: 'https://cdn.usegalileo.ai/stability/e9fdb59b-64bb-4239-8e52-f71e0cfb538e.png'
  }
];

export function UserManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'support',
    password: '',
    confirmPassword: ''
  });

  const handleAddUser = (e) => {
    e.preventDefault();
    
    if (newUser.password !== newUser.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const user = {
      id: Date.now(),
      ...newUser,
      status: 'active',
      avatar: 'https://cdn.usegalileo.ai/stability/117a7a12-7704-4917-9139-4a3f76c42e78.png'
    };

    setUsers([...users, user]);
    setIsAddingUser(false);
    setNewUser({
      name: '',
      email: '',
      role: 'support',
      password: '',
      confirmPassword: ''
    });
    toast.success('User added successfully');
  };

  const handleUpdateStatus = (userId, newStatus) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
    toast.success('User status updated');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">User Management</h2>
          <Button onClick={() => setIsAddingUser(true)}>Add User</Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* User List */}
        <div className="space-y-4">
          {users.map(user => (
            <div 
              key={user.id}
              className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-800"
            >
              <div className="flex items-center gap-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
                      {user.role}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      user.status === 'active'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {user.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={user.status}
                  onChange={(e) => handleUpdateStatus(user.id, e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover text-sm"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <Button variant="secondary">Edit</Button>
              </div>
            </div>
          ))}
        </div>

        {/* Add User Modal */}
        {isAddingUser && (
          <div className="fixed inset-0 bg-black/20 dark:bg-black/40 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-xl max-w-md w-full">
              <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                <h3 className="text-lg font-semibold">Add New User</h3>
              </div>
              
              <form onSubmit={handleAddUser} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Role</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
                  >
                    <option value="support">Support Technician</option>
                    <option value="sales">Sales Agent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Password</label>
                  <input
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Confirm Password</label>
                  <input
                    type="password"
                    value={newUser.confirmPassword}
                    onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <Button 
                    type="button" 
                    variant="secondary"
                    onClick={() => setIsAddingUser(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Add User</Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}