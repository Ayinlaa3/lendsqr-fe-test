// src/utils/mockApi.ts

import { User, DashboardStats } from '../types';

const organizations = ['Lendsqr', 'Irorun', 'Lendstar', 'Supercash', 'SnapCash', 'Paycient'];
const banks = ['GTBank', 'Access Bank', 'First Bank', 'Zenith Bank', 'UBA', 'Ecobank'];
const statuses: User['status'][] = ['Active', 'Inactive', 'Blacklisted', 'Pending'];

const firstNames = [
  'Adeola', 'Chinedu', 'Fatima', 'Ifeanyi', 'Ngozi', 'Aisha', 'Emeka', 'Funke', 'Kehinde', 'Yakubu',
  'Gbenga', 'Uche', 'Hauwa', 'Seyi', 'Blessing', 'Chisom', 'Tolu', 'Hassan', 'Fisayo', 'Efe'
];
const lastNames = [
  'Okafor', 'Balogun', 'Olawale', 'Abdullahi', 'Eze', 'Okon', 'Adebayo', 'Adamu', 'Ogunleye', 'Chukwuma',
  'Ojo', 'Mohammed', 'Osagie', 'Oyeniyi', 'Okwuosa', 'Adekunle', 'Okeke', 'Bello', 'Ogunbiyi', 'Suleiman'
];

const seededRandom = (seed: number, range: number) => (seed * 9301 + 49297) % 233280 % range;

const phonePrefixes = ['0701', '0703', '0705', '0803', '0806', '0807', '0810', '0813', '0814', '0901', '0902'];

export const generateMockUsers = (count: number = 500): User[] => {
  const users: User[] = [];

  for (let i = 1; i <= count; i++) {
    const orgIndex = seededRandom(i, organizations.length);
    const orgName = organizations[orgIndex];

    const firstName = firstNames[seededRandom(i, firstNames.length)];
    const lastName = lastNames[seededRandom(i + 13, lastNames.length)];
    const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}${i}`;

    const prefix = phonePrefixes[seededRandom(i, phonePrefixes.length)];
    const lineNumber = (100000 + i).toString().slice(-7);
    const phoneNumber = `0${prefix.slice(1)}${lineNumber}`;

    const accountNumber = (2000000000 + i).toString().padStart(10, '0');

    const joinedYear = 2020 + (i % 4);
    const joinedMonth = i % 12;
    const joinedDay = (i % 28) + 1;

    users.push({
      id: `user_${i.toString().padStart(3, '0')}`,
      orgName,
      userName: username,
      email: `${username}@gmail.com`,
      phoneNumber,
      dateJoined: new Date(joinedYear, joinedMonth, joinedDay).toISOString(),
      status: statuses[seededRandom(i * 3, statuses.length)],
      accountBalance: `₦${(50000 + i * 500).toLocaleString()}`,
      accountNumber,
      bank: banks[seededRandom(i + 5, banks.length)],
      fullName: `${firstName} ${lastName}`,
      bvn: (20000000000 + i).toString().padStart(11, '0'),
      gender: i % 2 === 0 ? 'Male' : 'Female',
      maritalStatus: ['Single', 'Married', 'Divorced'][seededRandom(i + 7, 3)] as any,
      children: (i % 4).toString(),
      typeOfResidence: ["Parent's Apartment", 'Rented Apartment', 'Own House'][seededRandom(i + 3, 3)],
      levelOfEducation: ['B.Sc', 'M.Sc', 'Ph.D', 'HND'][seededRandom(i + 9, 4)],
      employmentStatus: ['Employed', 'Unemployed', 'Self-employed'][seededRandom(i + 2, 3)],
      sectorOfEmployment: ['Fintech', 'Health', 'Education', 'Technology', 'Government'][seededRandom(i + 4, 5)],
      durationOfEmployment: `${(i % 10) + 1} years`,
      officeEmail: `${username}@${orgName.replace(/\s+/g, '').toLowerCase()}.com`,
      monthlyIncome: [
        `₦${(80000 + (i % 10) * 5000).toLocaleString()}`,
        `₦${(120000 + (i % 10) * 7000).toLocaleString()}`
      ],
      loanRepayment: `₦${(10000 + (i % 10) * 1000).toLocaleString()}`,
      twitter: `@${username}`,
      facebook: `${firstName} ${lastName}`,
      instagram: `@${username}`,
    });
  }

  return users;
};

export const mockUsers = generateMockUsers();

export const getUsers = (page: number = 1, limit: number = 10): Promise<{ users: User[]; total: number }> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      resolve({
        users: mockUsers.slice(startIndex, endIndex),
        total: mockUsers.length,
      });
    }, 300);
  });

export const getUserById = (id: string): Promise<User | null> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUsers.find((u) => u.id === id) || null);
    }, 200);
  });

export const getDashboardStats = (): Promise<DashboardStats> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const activeUsers = mockUsers.filter((u) => u.status === 'Active').length;
      resolve({
        totalUsers: mockUsers.length,
        activeUsers,
        usersWithLoans: Math.floor(mockUsers.length * 0.7),
        usersWithSavings: Math.floor(mockUsers.length * 0.8),
      });
    }, 200);
  });

export const loginUser = (email: string, password: string): Promise<boolean> =>
  new Promise((resolve) => setTimeout(() => resolve(Boolean(email && password)), 500));
