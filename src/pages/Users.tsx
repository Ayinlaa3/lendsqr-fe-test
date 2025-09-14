import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Eye,
  UserX,
  UserCheck,
  Filter,
  MoreVertical,
  Users as UsersIcon,
  CreditCard,
  PiggyBank,
  Calendar,
} from 'lucide-react';
import { User, FilterOptions } from '../types';
import { getUsers } from '../utils/mockApi';
import { useToast } from '../hooks/use-toast';
import './Users.scss';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onFilter: (filters: FilterOptions) => void;
  onReset: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ isOpen, onClose, onFilter, onReset }) => {
  const [filters, setFilters] = useState<FilterOptions>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({});
    onReset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="filter-overlay" onClick={onClose}>
      <div className="filter-panel" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="filter-field">
            <label>Organization</label>
            <select
              value={filters.organization || ''}
              onChange={(e) => setFilters({ ...filters, organization: e.target.value })}
            >
              <option value="">Select</option>
              <option value="Lendsqr">Lendsqr</option>
              <option value="Irorun">Irorun</option>
              <option value="Lendstar">Lendstar</option>
            </select>
          </div>

          <div className="filter-field">
            <label>Username</label>
            <input
              type="text"
              placeholder="User"
              value={filters.username || ''}
              onChange={(e) => setFilters({ ...filters, username: e.target.value })}
            />
          </div>

          <div className="filter-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              value={filters.email || ''}
              onChange={(e) => setFilters({ ...filters, email: e.target.value })}
            />
          </div>

          <div className="filter-field">
            <label>Date</label>
            <div className="date-input-wrapper">
              <input
                type="date"
                value={filters.date || ''}
                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
              />
              <Calendar size={16} className="date-icon" />
            </div>
          </div>

          <div className="filter-field">
            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="Phone Number"
              value={filters.phoneNumber || ''}
              onChange={(e) => setFilters({ ...filters, phoneNumber: e.target.value })}
            />
          </div>

          <div className="filter-field">
            <label>Status</label>
            <select
              value={filters.status || ''}
              onChange={(e) => setFilters({ ...filters, status: e.target.value as User['status'] })}
            >
              <option value="">Select</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
              <option value="Blacklisted">Blacklisted</option>
            </select>
          </div>

          <div className="filter-actions">
            <button type="button" onClick={handleReset} className="reset-btn">
              Reset
            </button>
            <button type="submit" className="filter-btn">
              Filter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface UserTableProps {
  users: User[];
  onStatusChange: (userId: string, status: User['status']) => void;
  onFilterToggle: (column: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onStatusChange, onFilterToggle }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const getStatusBadgeClass = (status: User['status']) => {
    switch (status) {
      case 'Active':
        return 'status-badge--active';
      case 'Inactive':
        return 'status-badge--inactive';
      case 'Pending':
        return 'status-badge--pending';
      case 'Blacklisted':
        return 'status-badge--blacklisted';
      default:
        return '';
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <div className="table-container">
      <table className="users-table">
        <thead>
          <tr>
            {['organization', 'username', 'email', 'phoneNumber', 'date', 'status'].map((col) => (
              <th key={col} onClick={() => onFilterToggle(col)}>
                <div className="header-content">
                  <span className="header-text">{col.toUpperCase()}</span>
                  <Filter size={16} className="header-filter-icon" />
                </div>
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.orgName}</td>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{formatDate(user.dateJoined)}</td>
              <td>
                <span className={`status-badge ${getStatusBadgeClass(user.status)}`}>
                  {user.status}
                </span>
              </td>
              <td>
                <div className="actions-dropdown">
                  <button
                    className="actions-btn"
                    onClick={() =>
                      setActiveDropdown(activeDropdown === user.id ? null : user.id)
                    }
                  >
                    <MoreVertical size={16} />
                  </button>
                  {activeDropdown === user.id && (
                    <div className="dropdown-menu">
                      <Link to={`/users/${user.id}`} className="dropdown-item">
                        <Eye size={14} /> View Details
                      </Link>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          onStatusChange(user.id, 'Blacklisted');
                          setActiveDropdown(null);
                        }}
                      >
                        <UserX size={14} /> Blacklist User
                      </button>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          onStatusChange(user.id, 'Active');
                          setActiveDropdown(null);
                        }}
                      >
                        <UserCheck size={14} /> Activate User
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

interface StatCardProps {
  icon: React.ComponentType<any>;
  title: string;
  value: number;
  iconClass: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, title, value, iconClass }) => (
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

export const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [showFilterPanel, setShowFilterPanel] = useState(false);
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
    } catch (error) {
      toast({
        title: 'Error loading users',
        description: 'Failed to load users. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (userId: string, newStatus: User['status']) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );

    const updatedUser = users.find((u) => u.id === userId);
    if (updatedUser) {
      const userDetails = { ...updatedUser, status: newStatus };
      localStorage.setItem(`user_${userId}`, JSON.stringify(userDetails));
    }

    toast({
      title: 'User status updated',
      description: `User has been ${newStatus.toLowerCase()}.`,
    });
  };

  const handleFilterToggle = () => setShowFilterPanel(true);
  const handleFilter = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    loadUsers();
  };

  const handleResetFilter = () => {
    setFilters({});
    loadUsers();
  };

  if (loading) {
    return (
      <div className="users-container">
        <div className="users-loading">
          <div className="loading-spinner"></div>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="users-container">
      <div className="users-header">
        <h1>Users</h1>
      </div>

      <div className="users-stats">
        <StatCard icon={UsersIcon} title="Users" value={2453} iconClass="users" />
        <StatCard icon={UserCheck} title="Active Users" value={2453} iconClass="active" />
        <StatCard icon={CreditCard} title="Users with Loans" value={12453} iconClass="loans" />
        <StatCard icon={PiggyBank} title="Users with Savings" value={102453} iconClass="savings" />
      </div>

      <div className="users-content">
        <UserTable
          users={users}
          onStatusChange={handleStatusChange}
          onFilterToggle={handleFilterToggle}
        />

         <div className="pagination">
          <div className="pagination-info">
            Showing{' '}
            <select className="entries-select">
              <option>100</option>
              <option>50</option>
              <option>25</option>
              <option>10</option>
            </select>{' '}
            out of {totalUsers}
          </div>
          <div className="pagination-controls">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              ←
            </button>
            <button onClick={() => setCurrentPage(1)} className="pagination-btn">
              1
            </button>
            <button onClick={() => setCurrentPage(2)} className="pagination-btn">
              2
            </button>
            <span>...</span>
            <button onClick={() => setCurrentPage(totalPages)} className="pagination-btn">
              {totalPages}
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="pagination-btn next-btn"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <FilterPanel
        isOpen={showFilterPanel}
        onClose={() => setShowFilterPanel(false)}
        onFilter={handleFilter}
        onReset={handleResetFilter}
      />
    </div>
  );
};
