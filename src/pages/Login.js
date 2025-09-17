import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/mockApi";
import { useToast } from "../hooks/use-toast";
import "./Login.scss";
export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();
    const handleSubmit = async (e) => {
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
            }
            else {
                toast({
                    title: "Login failed",
                    description: "Invalid credentials. Please try again.",
                    variant: "destructive",
                });
            }
        }
        catch (error) {
            toast({
                title: "Login error",
                description: "An error occurred. Please try again.",
                variant: "destructive",
            });
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsxs("div", { className: "login__container", children: [_jsxs("div", { className: "login__left", children: [_jsx("div", { className: "login__logo", children: _jsx("img", { src: "/lendsqr-logo.svg", alt: "Lendsqr" }) }), _jsx("div", { className: "login__illustration", children: _jsx("img", { src: "/pablo-sign-in 1.png", alt: "Login illustration" }) })] }), _jsx("div", { className: "login__right", children: _jsxs("div", { className: "login__form-wrapper", children: [_jsxs("header", { className: "login__header", children: [_jsx("h1", { children: "Welcome!" }), _jsx("p", { children: "Enter details to login." })] }), _jsxs("form", { onSubmit: handleSubmit, className: "login__form", children: [_jsx("div", { className: "login__form-group", children: _jsx("input", { type: "email", placeholder: "Email", value: email, onChange: (e) => setEmail(e.target.value), required: true, className: "login__input" }) }), _jsx("div", { className: "login__form-group", children: _jsxs("div", { className: "login__password-wrapper", children: [_jsx("input", { type: showPassword ? "text" : "password", placeholder: "Password", value: password, onChange: (e) => setPassword(e.target.value), required: true, className: "login__input login__input--password" }), _jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "login__password-toggle", children: showPassword ? "HIDE" : "SHOW" })] }) }), _jsx("div", { className: "login__forgot", children: _jsx("a", { href: "#", className: "login__forgot-link", children: "Forgot PASSWORD?" }) }), _jsx("button", { type: "submit", disabled: isLoading, className: "login__submit-btn", children: isLoading ? "LOGGING IN..." : "LOG IN" })] })] }) })] }));
};
