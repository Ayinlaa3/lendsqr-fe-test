// src/pages/NotFound.tsx
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "../components/ui/Button";
import "./NotFound.scss";

export const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="not-found">
      <div className="not-found__content">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__description">Oops! Page not found</p>
        <Link to="/" className="not-found__button">
          <Button variant="primary">Return to Home</Button>
        </Link>
      </div>
    </div>
  );
};

