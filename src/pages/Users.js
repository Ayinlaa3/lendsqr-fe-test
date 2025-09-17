import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/Users.tsx
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, UserX, UserRoundCheck, ListFilter, MoreVertical, Users as UsersIcon, CreditCard, PiggyBank, Calendar, } from 'lucide-react';
import { getUsers } from '../utils/mockApi';
import { useToast } from '../hooks/use-toast';
import './Users.scss';
const FilterPanel = ({ isOpen, anchorRef, onClose, onFilter, onReset }) => {
    const [filters, setFilters] = useState({});
    const panelRef = useRef(null);
    const [position, setPosition] = useState({ top: 0, left: 0, width: 260 });
    // Position panel below clicked header
    useEffect(() => {
        if (!isOpen || !anchorRef?.current)
            return;
        const position = () => {
            const anchor = anchorRef.current;
            const rect = anchor.getBoundingClientRect();
            setPosition({
                top: rect.bottom + window.scrollY + 4,
                left: rect.left + window.scrollX,
                width: Math.max(260, rect.width), // at least 260px wide
            });
        };
        position();
        window.addEventListener('resize', position);
        window.addEventListener('scroll', position, true);
        return () => {
            window.removeEventListener('resize', position);
            window.removeEventListener('scroll', position, true);
        };
    }, [isOpen, anchorRef]);
    // Close panel on outside click or Esc
    useEffect(() => {
        if (!isOpen)
            return;
        const handleClickOutside = (e) => {
            const panel = panelRef.current;
            const anchor = anchorRef?.current;
            const target = e.target;
            if (panel && !panel.contains(target) && anchor && !anchor.contains(target)) {
                onClose();
            }
        };
        const handleEsc = (e) => {
            if (e.key === 'Escape')
                onClose();
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEsc);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, anchorRef, onClose]);
    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter(filters);
        onClose();
    };
    const handleReset = () => {
        setFilters({});
        onReset();
        onClose();
    };
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "filter-wrapper", ref: panelRef, style: {
            position: 'absolute',
            top: position.top,
            left: position.left,
            minWidth: position.width,
            zIndex: 1200,
        }, children: _jsx("div", { className: "filter-panel", ref: panelRef, children: _jsxs("form", { onSubmit: handleSubmit, className: "filter-form", children: [_jsxs("div", { className: "filter-field", children: [_jsx("label", { htmlFor: "organization", children: "Organization" }), _jsxs("select", { id: "organization", value: filters.organization || '', onChange: (e) => setFilters({ ...filters, organization: e.target.value }), children: [_jsx("option", { value: "", children: "Select" }), _jsx("option", { value: "Lendsqr", children: "Lendsqr" }), _jsx("option", { value: "Irorun", children: "Irorun" }), _jsx("option", { value: "Lendstar", children: "Lendstar" })] })] }), _jsxs("div", { className: "filter-field", children: [_jsx("label", { htmlFor: "username", children: "Username" }), _jsx("input", { id: "username", type: "text", placeholder: "User", value: filters.username || '', onChange: (e) => setFilters({ ...filters, username: e.target.value }) })] }), _jsxs("div", { className: "filter-field", children: [_jsx("label", { htmlFor: "email", children: "Email" }), _jsx("input", { id: "email", type: "email", placeholder: "Email", value: filters.email || '', onChange: (e) => setFilters({ ...filters, email: e.target.value }) })] }), _jsxs("div", { className: "filter-field", children: [_jsx("label", { htmlFor: "date", children: "Date" }), _jsxs("div", { className: "date-input-wrapper", children: [_jsx("input", { id: "date", type: "date", value: filters.date || '', onChange: (e) => setFilters({ ...filters, date: e.target.value }) }), _jsx(Calendar, { size: 16, className: "date-icon" })] })] }), _jsxs("div", { className: "filter-field", children: [_jsx("label", { htmlFor: "phoneNumber", children: "Phone Number" }), _jsx("input", { id: "phoneNumber", type: "tel", placeholder: "Phone Number", value: filters.phoneNumber || '', onChange: (e) => setFilters({ ...filters, phoneNumber: e.target.value }) })] }), _jsxs("div", { className: "filter-field", children: [_jsx("label", { htmlFor: "status", children: "Status" }), _jsxs("select", { id: "status", value: filters.status || '', onChange: (e) => setFilters({ ...filters, status: e.target.value }), children: [_jsx("option", { value: "", children: "Select" }), _jsx("option", { value: "Active", children: "Active" }), _jsx("option", { value: "Inactive", children: "Inactive" }), _jsx("option", { value: "Pending", children: "Pending" }), _jsx("option", { value: "Blacklisted", children: "Blacklisted" })] })] }), _jsxs("div", { className: "filter-actions", children: [_jsx("button", { type: "button", onClick: handleReset, className: "reset-btn", children: "Reset" }), _jsx("button", { type: "submit", className: "filter-btn", children: "Filter" })] })] }) }) }));
};
const UserTable = ({ users, onStatusChange, onFilterToggle }) => {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'Active':
                return 'status-active';
            case 'Inactive':
                return 'status-inactive';
            case 'Pending':
                return 'status-pending';
            case 'Blacklisted':
                return 'status-blacklisted';
            default:
                return '';
        }
    };
    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
    // Column refs
    const orgRef = useRef(null);
    const userRef = useRef(null);
    const emailRef = useRef(null);
    const phoneRef = useRef(null);
    const dateRef = useRef(null);
    const statusRef = useRef(null);
    return (_jsx("div", { className: "table-container", children: _jsxs("table", { className: "users-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { ref: orgRef, onClick: () => onFilterToggle(orgRef), children: _jsxs("div", { className: "header-content", children: [_jsx("span", { className: "header-text", children: "ORGANIZATION" }), _jsx(ListFilter, { size: 16, className: "header-filter-icon" })] }) }), _jsx("th", { ref: userRef, onClick: () => onFilterToggle(userRef), children: _jsxs("div", { className: "header-content", children: [_jsx("span", { className: "header-text", children: "USERNAME" }), _jsx(ListFilter, { size: 16, className: "header-filter-icon" })] }) }), _jsx("th", { ref: emailRef, onClick: () => onFilterToggle(emailRef), children: _jsxs("div", { className: "header-content", children: [_jsx("span", { className: "header-text", children: "EMAIL" }), _jsx(ListFilter, { size: 16, className: "header-filter-icon" })] }) }), _jsx("th", { ref: phoneRef, onClick: () => onFilterToggle(phoneRef), children: _jsxs("div", { className: "header-content", children: [_jsx("span", { className: "header-text", children: "PHONE NUMBER" }), _jsx(ListFilter, { size: 16, className: "header-filter-icon" })] }) }), _jsx("th", { ref: dateRef, onClick: () => onFilterToggle(dateRef), children: _jsxs("div", { className: "header-content", children: [_jsx("span", { className: "header-text", children: "DATE JOINED" }), _jsx(ListFilter, { size: 16, className: "header-filter-icon" })] }) }), _jsx("th", { ref: statusRef, onClick: () => onFilterToggle(statusRef), children: _jsxs("div", { className: "header-content", children: [_jsx("span", { className: "header-text", children: "STATUS" }), _jsx(ListFilter, { size: 16, className: "header-filter-icon" })] }) }), _jsx("th", {})] }) }), _jsx("tbody", { children: users.map((user) => (_jsxs("tr", { children: [_jsx("td", { children: user.orgName }), _jsx("td", { children: user.fullName }), _jsx("td", { children: user.officeEmail }), _jsx("td", { children: user.phoneNumber }), _jsx("td", { children: formatDate(user.dateJoined) }), _jsx("td", { children: _jsx("span", { className: `status-badge ${getStatusBadgeClass(user.status)}`, children: user.status }) }), _jsx("td", { children: _jsxs("div", { className: "actions-dropdown", children: [_jsx("button", { className: "actions-btn", onClick: () => setActiveDropdown(activeDropdown === user.id ? null : user.id), children: _jsx(MoreVertical, { size: 16 }) }), activeDropdown === user.id && (_jsxs("div", { className: "dropdown-menu", children: [_jsxs(Link, { to: `/users/${user.id}`, className: "dropdown-item", children: [_jsx(Eye, { size: 14 }), " View Details"] }), _jsxs("button", { className: "dropdown-item", onClick: () => {
                                                        onStatusChange(user.id, 'Blacklisted');
                                                        setActiveDropdown(null);
                                                    }, children: [_jsx(UserX, { size: 14 }), " Blacklist User"] }), _jsxs("button", { className: "dropdown-item", onClick: () => {
                                                        onStatusChange(user.id, 'Active');
                                                        setActiveDropdown(null);
                                                    }, children: [_jsx(UserRoundCheck, { size: 14 }), " Activate User"] })] }))] }) })] }, user.id))) })] }) }));
};
const StatCard = ({ icon: Icon, title, value, iconClass }) => (_jsxs("div", { className: "stat-card", children: [_jsx("div", { className: `stat-icon ${iconClass}`, children: _jsx(Icon, { size: 20 }) }), _jsxs("div", { className: "stat-content", children: [_jsx("h3", { children: title }), _jsx("p", { children: value.toLocaleString() })] })] }));
export const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);
    const [filters, setFilters] = useState({});
    const [activeFilterRef, setActiveFilterRef] = useState(null);
    const { toast } = useToast();
    const usersPerPage = 10;
    const totalPages = Math.ceil(totalUsers / usersPerPage);
    useEffect(() => {
        loadUsers();
    }, [currentPage]);
    const loadUsers = async () => {
        try {
            setLoading(true);
            const data = await getUsers(currentPage, usersPerPage);
            setUsers(data.users);
            setTotalUsers(data.total);
        }
        catch (error) {
            toast({
                title: 'Error loading users',
                description: 'Failed to load users. Please try again.',
                variant: 'destructive',
            });
        }
        finally {
            setLoading(false);
        }
    };
    const handleStatusChange = (userId, newStatus) => {
        setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u)));
        const updatedUser = users.find((u) => u.id === userId);
        if (updatedUser) {
            localStorage.setItem(`user_${userId}`, JSON.stringify({ ...updatedUser, status: newStatus }));
        }
        toast({
            title: 'User status updated',
            description: `User has been ${newStatus.toLowerCase()}.`,
        });
    };
    const handleFilterToggle = (ref) => {
        setActiveFilterRef((prev) => (prev === ref ? null : ref));
    };
    const handleFilter = (newFilters) => {
        setFilters(newFilters);
        loadUsers();
    };
    const handleResetFilter = () => {
        setFilters({});
        loadUsers();
    };
    if (loading) {
        return (_jsx("div", { className: "users-container", children: _jsxs("div", { className: "users-loading", children: [_jsx("div", { className: "loading-spinner" }), _jsx("p", { children: "Loading users..." })] }) }));
    }
    return (_jsxs("div", { className: "users-container", children: [_jsx("div", { className: "users-header", children: _jsx("h1", { children: "Users" }) }), _jsxs("div", { className: "users-stats", children: [_jsx(StatCard, { icon: UsersIcon, title: "Users", value: 500, iconClass: "users" }), _jsx(StatCard, { icon: UserRoundCheck, title: "Active Users", value: 125, iconClass: "active" }), _jsx(StatCard, { icon: CreditCard, title: "Users with Loans", value: 350, iconClass: "loans" }), _jsx(StatCard, { icon: PiggyBank, title: "Users with Savings", value: 400, iconClass: "savings" })] }), _jsxs("div", { className: "users-content", children: [_jsx(UserTable, { users: users, onStatusChange: handleStatusChange, onFilterToggle: handleFilterToggle }), _jsxs("div", { className: "pagination", children: [_jsxs("div", { className: "pagination-info", children: ["Showing", ' ', _jsxs("select", { className: "entries-select", defaultValue: "100", children: [_jsx("option", { children: "100" }), _jsx("option", { children: "50" }), _jsx("option", { children: "25" }), _jsx("option", { children: "10" })] }), ' ', "out of ", totalUsers] }), _jsxs("div", { className: "pagination-controls", children: [_jsx("button", { onClick: () => setCurrentPage((prev) => Math.max(1, prev - 1)), disabled: currentPage === 1, className: "pagination-btn", children: "\u2190" }), _jsx("button", { onClick: () => setCurrentPage(1), className: "pagination-btn", children: "1" }), _jsx("button", { onClick: () => setCurrentPage(2), className: "pagination-btn", children: "2" }), _jsx("span", { children: "..." }), _jsx("button", { onClick: () => setCurrentPage(totalPages), className: "pagination-btn", children: totalPages }), _jsx("button", { onClick: () => setCurrentPage((prev) => Math.min(totalPages, prev + 1)), disabled: currentPage === totalPages, className: "pagination-btn next-btn", children: "\u2192" })] })] })] }), _jsx(FilterPanel, { isOpen: !!activeFilterRef, anchorRef: activeFilterRef, onClose: () => setActiveFilterRef(null), onFilter: handleFilter, onReset: handleResetFilter })] }));
};
