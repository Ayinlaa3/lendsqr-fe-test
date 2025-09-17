import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/layout/DashboardLayout.tsx
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import './DashboardLayout.scss';
export const DashboardLayout = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
    return (_jsxs("div", { className: "dashboard-layout", children: [_jsx(Header, { onMobileMenuToggle: toggleMobileMenu }), _jsx("div", { className: `dashboard-layout__sidebar ${isMobileMenuOpen ? 'dashboard-layout__sidebar--open' : ''}`, children: _jsx(Sidebar, {}) }), _jsx("main", { className: "dashboard-layout__main", children: _jsx(Outlet, {}) }), isMobileMenuOpen && (_jsx("div", { className: "dashboard-layout__overlay", onClick: () => setIsMobileMenuOpen(false) }))] }));
};
