// src/pages/Users.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../types';
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
import { FilterOptions } from '../types';
import { getUsers } from '../utils/mockApi';
import { useToast } from '../hooks/use-toast';
import './Users.scss';

interface FilterPanelProps {
  isOpen: boolean;
  anchorRef: React.RefObject<HTMLTableCellElement> | null;
  onClose: () => void;
  onFilter: (filters: FilterOptions) => void;
  onReset: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ isOpen, anchorRef, onClose, onFilter, onReset }) => {
  const [filters, setFilters] = useState<FilterOptions>({});
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Position panel below clicked header
  useEffect(() => {
    if (!isOpen) return;
    const position = () => {
      const panel = panelRef.current;
      const anchor = anchorRef?.current;
      if (!panel || !anchor) return;
      const rect = anchor.getBoundingClientRect();
      panel.style.position = 'absolute';
      panel.style.top = `${rect.bottom + window.scrollY + 4}px`;
      panel.style.left = `${rect.left + window.scrollX}px`;
      panel.style.minWidth = `${Math.max(260, rect.width)}px`;
      panel.style.zIndex = '1200';
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
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const panel = panelRef.current;
      const anchor = anchorRef?.current;
      const target = e.target as Node;
      if (panel && !panel.contains(target) && anchor && !anchor.contains(target)) {
        onClose();
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, anchorRef, onClose]);

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
    <div className="filter-wrapper">
      <div className="filter-panel" ref={panelRef}>
        <form onSubmit={handleSubmit} className="filter-form">
          {/* Organization */}
          <div className="filter-field">
            <label htmlFor="organization">Organization</label>
            <select
              id="organization"
              value={filters.organization || ''}
              onChange={(e) => setFilters({ ...filters, organization: e.target.value })}
            >
              <option value="">Select</option>
              <option value="Lendsqr">Lendsqr</option>
              <option value="Irorun">Irorun</option>
              <option value="Lendstar">Lendstar</option>
            </select>
          </div>

          {/* Username */}
          <div className="filter-field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="User"
              value={filters.username || ''}
              onChange={(e) => setFilters({ ...filters, username: e.target.value })}
            />
          </div>

          {/* Email */}
          <div className="filter-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={filters.email || ''}
              onChange={(e) => setFilters({ ...filters, email: e.target.value })}
            />
          </div>

          {/* Date */}
          <div className="filter-field">
            <label htmlFor="date">Date</label>
            <div className="date-input-wrapper">
              <input
                id="date"
                type="date"
                value={filters.date || ''}
                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
              />
              <Calendar size={16} className="date-icon" />
            </div>
          </div>

          {/* Phone Number */}
          <div className="filter-field">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              id="phoneNumber"
              type="tel"
              placeholder="Phone Number"
              value={filters.phoneNumber || ''}
              onChange={(e) => setFilters({ ...filters, phoneNumber: e.target.value })}
            />
          </div>

          {/* Status */}
          <div className="filter-field">
            <label htmlFor="status">Status</label>
            <select
              id="status"
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

          {/* Actions */}
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
  onStatusChange: (id: string, status: string) => void;
  onFilterToggle: (ref: React.RefObject<HTMLTableCellElement>) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onStatusChange, onFilterToggle }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const getStatusBadgeClass = (status: User['status']) => {
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

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  // Column refs
  const orgRef = useRef<HTMLTableCellElement>(null!);
  const userRef = useRef<HTMLTableCellElement>(null!);
  const emailRef = useRef<HTMLTableCellElement>(null!);
  const phoneRef = useRef<HTMLTableCellElement>(null!);
  const dateRef = useRef<HTMLTableCellElement>(null!);
  const statusRef = useRef<HTMLTableCellElement>(null!);

  return (
    <div className="table-container">
      <table className="users-table">
        <thead>
          <tr>
            <th ref={orgRef} onClick={() => onFilterToggle(orgRef)}>
                <div className="header-content">
                <span className="header-text">ORGANIZATION</span>
                <Filter size={16} className="header-filter-icon" />
              </div>
            </th>
            <th ref={userRef} onClick={() => onFilterToggle(userRef)}>
              <div className="header-content">
                <span className="header-text">USERNAME</span>
                <Filter size={16} className="header-filter-icon" />
              </div>
            </th>
            <th ref={emailRef} onClick={() => onFilterToggle(emailRef)}>
              <div className="header-content">
                <span className="header-text">EMAIL</span>
                <Filter size={16} className="header-filter-icon" />
              </div>
            </th>
            <th ref={phoneRef} onClick={() => onFilterToggle(phoneRef)}>
              <div className="header-content">
                <span className="header-text">PHONE NUMBER</span>
                <Filter size={16} className="header-filter-icon" />
              </div>
            </th>
            <th ref={dateRef} onClick={() => onFilterToggle(dateRef)}>
              <div className="header-content">
                <span className="header-text">DATE JOINED</span>
                <Filter size={16} className="header-filter-icon" />
              </div>
            </th>
            <th ref={statusRef} onClick={() => onFilterToggle(statusRef)}>
              <div className="header-content">
                <span className="header-text">STATUS</span>
                <Filter size={16} className="header-filter-icon" />
              </div>
            </th>
            <th />
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
                    onClick={() => setActiveDropdown(activeDropdown === user.id ? null : user.id)}
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

// StatCard (unchanged)
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
  const [activeFilterRef, setActiveFilterRef] = useState<React.RefObject<HTMLTableCellElement> | null>(null);
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

  const handleStatusChange = (userId: string, newStatus: User["status"]) => {
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

  const handleFilterToggle = (ref: React.RefObject<HTMLTableCellElement>) => {
    setActiveFilterRef((prev) => (prev === ref ? null : ref));
  };

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
          <div className="loading-spinner" />
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

        {/* Pagination */}
        <div className="pagination">
          <div className="pagination-info">
            Showing{' '}
            <select className="entries-select" defaultValue="100">
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
        isOpen={!!activeFilterRef}
        anchorRef={activeFilterRef}
        onClose={() => setActiveFilterRef(null)}
        onFilter={handleFilter}
        onReset={handleResetFilter}
      />
    </div>
  );
};
