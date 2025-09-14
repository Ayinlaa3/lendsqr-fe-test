// src/components/layout/DashboardLayout.tsx

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import './DashboardLayout.scss';

export const DashboardLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <div className="dashboard-layout">
      <Header onMobileMenuToggle={toggleMobileMenu} />

      <div className={`dashboard-layout__sidebar ${isMobileMenuOpen ? 'dashboard-layout__sidebar--open' : ''}`}>
        <Sidebar />
      </div>

      <main className="dashboard-layout__main">
        <Outlet />
      </main>

      {isMobileMenuOpen && (
        <div
          className="dashboard-layout__overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};
