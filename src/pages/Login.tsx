import React from 'react';
import { useNavigate } from 'react-router-dom';

import "./Login.scss";
import Button from "../components/ui/Button";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // mock authentication
    localStorage.setItem('auth', 'true');
    navigate('/dashboard');
  };

  return (
    <div className="page page-login">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Welcome to</h1>
        <h2>lendsqr</h2>
        <label>
          Email
          <input type="email" required />
        </label>
        <label>
          Password
          <input type="password" required />
        </label>
        <Button type="submit">Sign in</Button>
      </form>
    </div>
  );
};

export default Login;
