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
      
      // Stockage des données de connexion
      setToken(data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user.username);
      
      toast.success("Connexion réussie !");
      navigate("/");
      return data; // Retourne les données pour AuthForm
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return <AuthForm type="login" onSubmit={handleLogin} loading={loading} error={error}/>;
};

export default Login;
