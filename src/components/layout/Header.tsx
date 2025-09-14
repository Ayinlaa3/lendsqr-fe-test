// src/components/layout/Header.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, ChevronDown, Menu } from 'lucide-react';
import './Header.scss';

interface HeaderProps {
  onMobileMenuToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMobileMenuToggle }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="dashboard-header">
      <div className="dashboard-header__left">
        <button className="dashboard-header__menu-btn" onClick={onMobileMenuToggle}>
          <Menu size={24} />
        </button>
        <Link to="/dashboard" className="dashboard-header__logo">
          <img src="/logo.png" alt="Lendsqr Logo" className="dashboard-header__logo-img" />
        </Link>
      </div>

      <div className="dashboard-header__center">
        <div className="dashboard-header__search">
          <input
            type="text"
            placeholder="Search for anything"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="dashboard-header__search-input"
          />
          <button className="dashboard-header__search-btn">
            <Search size={14} />
          </button>
        </div>
      </div>

      <div className="dashboard-header__right">
        <Link to="#" className="dashboard-header__docs">Docs</Link>

        <button className="dashboard-header__notifications">
          <Bell size={20} />
        </button>

        <div className="dashboard-header__profile">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
            alt="User avatar"
            className="dashboard-header__avatar"
          />
          <span className="dashboard-header__username">Adedeji</span>
          <ChevronDown size={16} className="dashboard-header__dropdown-icon" />
        </div>
      </div>
    </header>
  );
};
