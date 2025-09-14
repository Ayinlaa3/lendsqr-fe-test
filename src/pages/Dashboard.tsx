import React, { useEffect, useState } from 'react';
import { Users, UserCheck, CreditCard, PiggyBank } from 'lucide-react';
import { DashboardStats } from '../types';
import { getDashboardStats } from '../utils/mockApi';
import './Dashboard.scss';

interface StatCardProps {
  icon: React.ComponentType<any>;
  title: string;
  value: number;
  iconColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, title, value, iconColor }) => (
  <div className="dashboard__stat-card">
    <div className="dashboard__stat-icon" style={{ color: iconColor }}>
      <Icon size={20} />
    </div>
    <div className="dashboard__stat-content">
      <h3 className="dashboard__stat-title">{title}</h3>
      <p className="dashboard__stat-value">{value.toLocaleString()}</p>
    </div>
  </div>
);

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to load dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard__loading">
          <div className="dashboard__loading-spinner"></div>
          <p className="dashboard__loading-text">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <h1 className="dashboard__title">Dashboard</h1>
        <p className="dashboard__subtitle">Welcome to your Lendsqr Admin Console</p>
      </header>

      {stats && (
        <div className="dashboard__stats-grid">
          <StatCard icon={Users} title="Users" value={stats.totalUsers} iconColor="#DF18FF" />
          <StatCard icon={UserCheck} title="Active Users" value={stats.activeUsers} iconColor="#5718FF" />
          <StatCard icon={CreditCard} title="Users with Loans" value={stats.usersWithLoans} iconColor="#F55F44" />
          <StatCard icon={PiggyBank} title="Users with Savings" value={stats.usersWithSavings} iconColor="#FF3366" />
        </div>
      )}

      <section className="dashboard__content">
        <div className="dashboard__section">
          <h2 className="dashboard__section-title">Recent Activity</h2>
          <div className="dashboard__activity-card">
            <p>System running smoothly. All services operational.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
