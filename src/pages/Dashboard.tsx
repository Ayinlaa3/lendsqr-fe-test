// Dashboard.tsx
import React, { useEffect, useState } from "react";
import { Users, UserRoundCheck, CreditCard, PiggyBank } from "lucide-react";
import { DashboardStats } from "../types";
import { getDashboardStats } from "../utils/mockApi";
import "./Dashboard.scss";

interface StatCardProps {
  icon: React.ComponentType<any>;
  title: string;
  value: number;
  iconClass: string;
}

const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  title,
  value,
  iconClass,
}) => (
  <div className="stat-card">
    <div className={`stat-icon ${iconClass}`}>
      <Icon size={20} />
    </div>
    <div className="stat-content">
      <h3>{title}</h3>
      <p>{value.toLocaleString()}</p>
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
        console.error("Failed to load dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-loading">
          <div className="loading-spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to your Lendsqr Admin Console</p>
      </div>

      {stats && (
        <div className="stats-grid">
          <StatCard
            icon={Users}
            title="Users"
            value={stats.totalUsers}
            iconClass="users"
          />
          <StatCard
            icon={UserRoundCheck}
            title="Active Users"
            value={stats.activeUsers}
            iconClass="active"
          />
          <StatCard
            icon={CreditCard}
            title="Users with Loans"
            value={stats.usersWithLoans}
            iconClass="loans"
          />
          <StatCard
            icon={PiggyBank}
            title="Users with Savings"
            value={stats.usersWithSavings}
            iconClass="savings"
          />
        </div>
      )}

      <div className="dashboard-content">
        <div className="dashboard-section">
          <h2>Recent Activity</h2>
          <div className="activity-card">
            <p>System running smoothly. All services operational.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
