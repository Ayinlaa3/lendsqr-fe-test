import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // fake auth for prototype
    localStorage.setItem('auth', 'true');
    navigate('/dashboard');
  };

  return (
    <div className="page page-login">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Welcome</h1>
        <label>
          Email
          <input type="email" required />
        </label>
        <label>
          Password
          <input type="password" required />
        </label>
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
};

export default Login;
