// src/pages/Login.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/mockApi";
import { useToast } from "../hooks/use-toast";
import "./Login.scss";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        localStorage.setItem("isAuthenticated", "true");
        toast({
          title: "Login successful",
          description: "Welcome to Lendsqr Admin Panel",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Login failed",
          description: "Invalid credentials. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login__container">
      <div className="login__left">
        <div className="login__logo">
          <img src="/lendsqr-logo.svg" alt="Lendsqr" />
        </div>
        <div className="login__illustration">
          <img src="/pablo-sign-in 1.png" alt="Login illustration" />
        </div>
      </div>

      <div className="login__right">
        <div className="login__form-wrapper">
          <header className="login__header">
            <h1>Welcome!</h1>
            <p>Enter details to login.</p>
          </header>

          <form onSubmit={handleSubmit} className="login__form">
            <div className="login__form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="login__input"
              />
            </div>

            <div className="login__form-group">
  <div className="login__password-wrapper">
    <input
      type={showPassword ? "text" : "password"}
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      className="login__input login__input--password"
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="login__password-toggle"
    >
      {showPassword ? "HIDE" : "SHOW"}
    </button>
  </div>
</div>


            <div className="login__forgot">
              <a href="#" className="login__forgot-link">
                Forgot PASSWORD?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="login__submit-btn"
            >
              {isLoading ? "LOGGING IN..." : "LOG IN"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
