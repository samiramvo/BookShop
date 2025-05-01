import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Login = ({ setToken }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Erreur lors de la connexion");
        throw new Error(data.message || "Erreur lors de la connexion");
      }
      toast.success("Connexion réussie !");
      if (!res.ok) throw new Error(data.message || "Erreur lors de la connexion");
      setToken(data.token);
      localStorage.setItem("token", data.token);
      if (data.username) {
        localStorage.setItem("username", data.username);
      }
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return <AuthForm type="login" onSubmit={handleLogin} loading={loading} error={error}/>;
};

export default Login;
