// Login.tsx (Humanized)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { loginUser } from '../utils/mockApi';
import { useToast } from '../use-toast';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await loginUser(email, password);
      if (success) {
        localStorage.setItem('isAuthenticated', 'true');
        toast({
          title: 'Login successful',
          description: 'Welcome back to Lendsqr Admin Console',
        });
        navigate('/dashboard');
      } else {
        toast({
          title: 'Login failed',
          description: 'Invalid email or password. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Unexpected error',
        description: 'Something went wrong. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="logo-container">
          <img src="/logo.png" alt="Lendsqr Logo" className="logo" />
        </div>
        <div className="login-image">
          <img src="/login-illustration.png" alt="Login illustration" />
        </div>
      </div>

      <div className="login-right fade-in">
        <div className="login-form-container">
          <div className="login-header">
            <h1>Welcome back</h1>
            <p>Please sign in to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="password-input-container">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-input password-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="forgot-password">
              <a href="#" className="forgot-link">Forgot your password?</a>
            </div>

            <button type="submit" disabled={isLoading} className="login-btn">
              {isLoading ? (
                <>
                  <Loader2 className="spinner" /> Logging in...
                </>
              ) : (
                'Log In'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;