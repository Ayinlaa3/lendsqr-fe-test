import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/NotFound.tsx
import { Link } from "react-router-dom";
import "./NotFound.scss";
export const NotFound = () => {
    return (_jsxs("div", { className: "notfound-container", children: [_jsx("h1", { className: "notfound-title", children: "404" }), _jsx("p", { className: "notfound-subtitle", children: "Oops! The page you\u2019re looking for doesn\u2019t exist." }), _jsx(Link, { to: "/dashboard", className: "notfound-link", children: "Back to Dashboard" })] }));
};
;
