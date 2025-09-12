import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Users from '@/pages/Users';
import UserDetails from '@/pages/UserDetails';
import Layout from '@/components/Layout';

const App: React.FC = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<Layout />}>
      <Route index element={<Navigate to="/dashboard" replace />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="users" element={<Users />} />
      <Route path="users/:id" element={<UserDetails />} />
    </Route>
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);

export default App;
