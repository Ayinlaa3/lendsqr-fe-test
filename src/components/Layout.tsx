import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Layout: React.FC = () => (
  <div className="app-layout">
    <aside className="sidebar">
      <h2 className="brand">lendsqr</h2>
      <nav>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/users">Users</Link></li>
        </ul>
      </nav>
    </aside>
    <main className="main">
      <header className="header">Header (top)</header>
      <section className="content"><Outlet /></section>
    </main>
  </div>
);

export default Layout;
