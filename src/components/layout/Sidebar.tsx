// src/components/layout/Sidebar.tsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Users,
  UserCheck,
  PiggyBank,
  CreditCard,
  HandCoins,
  UserX,
  Settings,
  BarChart3,
  Receipt,
  ScrollText,
  SlidersHorizontal,
  BadgePercent,
  Coins,
  TrendingUp,
  UserPlus,
  Building2,
} from 'lucide-react';
import './Sidebar.scss';

interface SidebarItem {
  title: string;
  icon: React.ComponentType<any>;
  path?: string;
  isHeader?: boolean;
}

const sidebarItems: SidebarItem[] = [
  { title: 'Dashboard', icon: Home, path: '/dashboard' },
  { title: 'CUSTOMERS', icon: Users, isHeader: true },
  { title: 'Users', icon: Users, path: '/users' },
  { title: 'Guarantors', icon: UserCheck, path: '/guarantors' },
  { title: 'Loans', icon: HandCoins, path: '/loans' },
  { title: 'Decision Models', icon: UserX, path: '/decision-models' },
  { title: 'Savings', icon: PiggyBank, path: '/savings' },
  { title: 'Loan Requests', icon: Receipt, path: '/loan-requests' },
  { title: 'Whitelist', icon: UserCheck, path: '/whitelist' },
  { title: 'Karma', icon: UserX, path: '/karma' },
  { title: 'BUSINESSES', icon: Building2, isHeader: true },
  { title: 'Organization', icon: Building2, path: '/organization' },
  { title: 'Loan Products', icon: CreditCard, path: '/loan-products' },
  { title: 'Savings Products', icon: PiggyBank, path: '/savings-products' },
  { title: 'Fees and Charges', icon: Coins, path: '/fees-charges' },
  { title: 'Transactions', icon: TrendingUp, path: '/transactions' },
  { title: 'Services', icon: SlidersHorizontal, path: '/services' },
  { title: 'Service Account', icon: UserPlus, path: '/service-account' },
  { title: 'Settlements', icon: ScrollText, path: '/settlements' },
  { title: 'Reports', icon: BarChart3, path: '/reports' },
  { title: 'SETTINGS', icon: Settings, isHeader: true },
  { title: 'Preferences', icon: SlidersHorizontal, path: '/preferences' },
  { title: 'Fees and Pricing', icon: BadgePercent, path: '/fees-pricing' },
  { title: 'Audit Logs', icon: ScrollText, path: '/audit-logs' },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="dashboard-sidebar">
      <nav className="dashboard-sidebar__content">
        {sidebarItems.map((item, index) => {
          if (item.isHeader) {
            return (
              <div key={index} className="dashboard-sidebar__section-title">
                <span>{item.title}</span>
              </div>
            );
          }

          const IconComponent = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={index}
              to={item.path || '#'}
              className={`dashboard-sidebar__item ${isActive ? 'dashboard-sidebar__item--active' : ''}`}
            >
              <IconComponent className="dashboard-sidebar__icon" size={16} />
              <span className="dashboard-sidebar__label">{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
