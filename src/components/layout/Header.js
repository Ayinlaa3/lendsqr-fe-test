import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/layout/Header.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, ChevronDown, Menu } from 'lucide-react';
import './Header.scss';
export const Header = ({ onMobileMenuToggle }) => {
    const [searchQuery, setSearchQuery] = useState('');
    return (_jsxs("header", { className: "dashboard-header", children: [_jsxs("div", { className: "dashboard-header__left", children: [_jsx("button", { className: "dashboard-header__menu-btn", onClick: onMobileMenuToggle, children: _jsx(Menu, { size: 24 }) }), _jsx(Link, { to: "/dashboard", className: "dashboard-header__logo", children: _jsx("img", { src: "/lendsqr-logo.svg", alt: "Lendsqr", className: "dashboard-header__logo-img" }) })] }), _jsx("div", { className: "dashboard-header__center", children: _jsxs("div", { className: "dashboard-header__search", children: [_jsx("input", { type: "text", placeholder: "Search for anything", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "dashboard-header__search-input" }), _jsx("button", { className: "dashboard-header__search-btn", children: _jsx(Search, { size: 14 }) })] }) }), _jsxs("div", { className: "dashboard-header__right", children: [_jsx(Link, { to: "#", className: "dashboard-header__docs", children: "Docs" }), _jsx("button", { className: "dashboard-header__notifications", children: _jsx(Bell, { size: 20 }) }), _jsxs("div", { className: "dashboard-header__profile", children: [_jsx("img", { src: "/user-avatar.png", alt: "User avatar", className: "dashboard-header__avatar" }), _jsx("span", { className: "dashboard-header__username", children: "Adedeji" }), _jsx(ChevronDown, { size: 16, className: "dashboard-header__dropdown-icon" })] })] })] }));
};
