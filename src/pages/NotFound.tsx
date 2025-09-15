// src/pages/NotFound.tsx
import { Link } from "react-router-dom";
import "./NotFound.scss";

export const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <p className="notfound-subtitle">Oops! The page you’re looking for doesn’t exist.</p>
      <Link to="/dashboard" className="notfound-link">
        Back to Dashboard
      </Link>
    </div>
  );
};
;
