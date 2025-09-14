// src/types/index.ts

// Type definitions

export interface User {
  id: string;
  orgName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: 'Inactive' | 'Active' | 'Blacklisted' | 'Pending';
  accountBalance: string;
  accountNumber: string;
  bank: string;
  fullName: string;
  bvn: string;
  gender: 'Male' | 'Female';
  maritalStatus: 'Single' | 'Married' | 'Divorced';
  children: string;
  typeOfResidence: string;
  levelOfEducation: string;
  employmentStatus: string;
  sectorOfEmployment: string;
  durationOfEmployment: string;
  officeEmail: string;
  monthlyIncome: [string, string];
  loanRepayment: string;
  twitter: string;
  facebook: string;
  instagram: string;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  usersWithLoans: number;
  usersWithSavings: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface FilterOptions {
  organization?: string;
  username?: string;
  email?: string;
  date?: string;
  phoneNumber?: string;
  status?: User['status'];
}