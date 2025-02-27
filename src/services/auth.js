// Mock authentication service
const users = [
  {
    id: 1,
    username: 'admin',
    password: 'Admin1234!',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://cdn.usegalileo.ai/stability/117a7a12-7704-4917-9139-4a3f76c42e78.png'
  },
  {
    id: 2,
    username: 'support',
    password: 'Support1234!',
    name: 'Support Tech',
    email: 'support@example.com',
    role: 'support',
    avatar: 'https://cdn.usegalileo.ai/stability/d4e7d763-28f3-4af2-bc57-a26db12c522b.png'
  },
  {
    id: 3,
    username: 'sales',
    password: 'Sales1234!',
    name: 'Sales Agent',
    email: 'sales@example.com',
    role: 'sales',
    avatar: 'https://cdn.usegalileo.ai/stability/e9fdb59b-64bb-4239-8e52-f71e0cfb538e.png'
  }
];

export const authService = {
  login: (username, password) => {
    return new Promise((resolve, reject) => {
      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        const { password, ...userWithoutPassword } = user;
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        resolve(userWithoutPassword);
      } else {
        reject(new Error('Invalid username or password'));
      }
    });
  },

  logout: () => {
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAdmin: () => {
    const user = authService.getCurrentUser();
    return user?.role === 'admin';
  }
};