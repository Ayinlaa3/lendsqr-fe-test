import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Dashboard.tsx
import { useEffect, useState } from 'react';
import { Users, UserRoundCheck, CreditCard, PiggyBank } from 'lucide-react';
import { getDashboardStats } from '../utils/mockApi';
import './Dashboard.scss';
const StatCard = ({ icon: Icon, title, value, iconClass }) => (_jsxs("div", { className: "stat-card", children: [_jsx("div", { className: `stat-icon ${iconClass}`, children: _jsx(Icon, { size: 20 }) }), _jsxs("div", { className: "stat-content", children: [_jsx("h3", { children: title }), _jsx("p", { children: value.toLocaleString() })] })] }));
export const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const loadStats = async () => {
            try {
                const data = await getDashboardStats();
                setStats(data);
            }
            catch (error) {
                console.error('Failed to load dashboard stats:', error);
            }
            finally {
                setLoading(false);
            }
        };
        loadStats();
    }, []);
    if (loading) {
        return (_jsx("div", { className: "dashboard-container", children: _jsxs("div", { className: "dashboard-loading", children: [_jsx("div", { className: "loading-spinner" }), _jsx("p", { children: "Loading dashboard..." })] }) }));
    }
    return (_jsxs("div", { className: "dashboard-container", children: [_jsxs("div", { className: "dashboard-header", children: [_jsx("h1", { children: "Dashboard" }), _jsx("p", { children: "Welcome to your Lendsqr Admin Console" })] }), stats && (_jsxs("div", { className: "stats-grid", children: [_jsx(StatCard, { icon: Users, title: "Users", value: stats.totalUsers, iconClass: "users" }), _jsx(StatCard, { icon: UserRoundCheck, title: "Active Users", value: stats.activeUsers, iconClass: "active" }), _jsx(StatCard, { icon: CreditCard, title: "Users with Loans", value: stats.usersWithLoans, iconClass: "loans" }), _jsx(StatCard, { icon: PiggyBank, title: "Users with Savings", value: stats.usersWithSavings, iconClass: "savings" })] })), _jsx("div", { className: "dashboard-content", children: _jsxs("div", { className: "dashboard-section", children: [_jsx("h2", { children: "Recent Activity" }), _jsx("div", { className: "activity-card", children: _jsx("p", { children: "System running smoothly. All services operational." }) })] }) })] }));
};
