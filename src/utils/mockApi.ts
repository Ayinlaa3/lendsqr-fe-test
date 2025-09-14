// src/utils/mockApi.ts

// Mock API for Lendsqr assessment - 500 user records as required

import { User, DashboardStats } from '@/types';

const organizations = [
  'Lendsqr', 'Irorun', 'Lendstar', 'Kredi Money', 'Blockacash', 'FICO'
];

const banks = [
  'GTBank', 'Access Bank', 'First Bank', 'Zenith Bank', 'UBA', 'Ecobank'
];

const statuses: User['status'][] = ['Active', 'Inactive', 'Blacklisted', 'Pending'];

const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'James', 'Anna', 'Robert', 'Lisa'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];

// Generated mock users
export const generateMockUsers = (count: number = 500): User[] => {
  const users: User[] = [];
  
  for (let i = 1; i <= count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}${i}`;
    
    users.push({
      id: `user_${i.toString().padStart(3, '0')}`,
      orgName: organizations[Math.floor(Math.random() * organizations.length)],
      userName: username,
      email: `${username}@email.com`,
      phoneNumber: `+234${Math.floor(Math.random() * 10000000000).toString().padStart(10, '0')}`,
      dateJoined: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString(),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      accountBalance: `₦${(Math.floor(Math.random() * 1000000)).toLocaleString()}`,
      accountNumber: Math.floor(Math.random() * 10000000000).toString().padStart(10, '0'),
      bank: banks[Math.floor(Math.random() * banks.length)],
      fullName: `${firstName} ${lastName}`,
      bvn: Math.floor(Math.random() * 100000000000).toString().padStart(11, '0'),
      gender: Math.random() > 0.5 ? 'Male' : 'Female',
      maritalStatus: ['Single', 'Married', 'Divorced'][Math.floor(Math.random() * 3)] as any,
      children: Math.floor(Math.random() * 5).toString(),
      typeOfResidence: ['Parent\'s Apartment', 'Rented Apartment', 'Own House'][Math.floor(Math.random() * 3)],
      levelOfEducation: ['B.Sc', 'M.Sc', 'Ph.D', 'HND'][Math.floor(Math.random() * 4)],
      employmentStatus: ['Employed', 'Unemployed', 'Self-employed'][Math.floor(Math.random() * 3)],
      sectorOfEmployment: ['Fintech', 'Health', 'Education', 'Technology', 'Government'][Math.floor(Math.random() * 5)],
      durationOfEmployment: `${Math.floor(Math.random() * 10) + 1} years`,
      officeEmail: `${username}@company.com`,
      monthlyIncome: [`₦${Math.floor(Math.random() * 200000).toLocaleString()}`, `₦${Math.floor(Math.random() * 400000).toLocaleString()}`],
      loanRepayment: `₦${Math.floor(Math.random() * 50000).toLocaleString()}`,
      twitter: `@${username}`,
      facebook: username,
      instagram: `@${username}`
    });
  }
  
  return users;
};

export const mockUsers = generateMockUsers();

// Mock API functions
export const getUsers = (page: number = 1, limit: number = 10): Promise<{ users: User[], total: number }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedUsers = mockUsers.slice(startIndex, endIndex);
      
      resolve({
        users: paginatedUsers,
        total: mockUsers.length
      });
    }, 500);
  });
};

export const getUserById = (id: string): Promise<User | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = mockUsers.find(u => u.id === id);
      resolve(user || null);
    }, 300);
  });
};

export const getDashboardStats = (): Promise<DashboardStats> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const activeUsers = mockUsers.filter(u => u.status === 'Active').length;
      const usersWithLoans = Math.floor(mockUsers.length * 0.7);
      const usersWithSavings = Math.floor(mockUsers.length * 0.8);
      
      resolve({
        totalUsers: mockUsers.length,
        activeUsers,
        usersWithLoans,
        usersWithSavings
      });
    }, 300);
  });
};

// Login function - accepts any email/password entry
export const loginUser = (email: string, password: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
    resolve(email.length > 0 && password.length > 0);
    }, 1000);
  });
};