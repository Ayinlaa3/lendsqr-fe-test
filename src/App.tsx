import { Routes, Route, Navigate } from "react-router-dom";

// ✅ Changed from "@/..." to relative imports
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import UserDetails from "./pages/UserDetails";
import Layout from "./components/Layout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
      <Route path="/users" element={<Layout><Users /></Layout>} />
      <Route path="/users/:id" element={<Layout><UserDetails /></Layout>} />
    </Routes>
  );
};

export default App;
