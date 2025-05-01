import React, { useState } from "react";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = {
  length: /.{8,}/,
  upper: /[A-Z]/,
  lower: /[a-z]/,
  digit: /\d/,
  special: /[@$!%*?&]/,
};

const AuthForm = ({ type, onSubmit, loading, onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const [formError, setFormError] = useState("");
  const [captchaChecked, setCaptchaChecked] = useState(false);

  const validate = () => {
    if (type === "register" && username.trim().length < 3) {
      toast.error("Le nom d'utilisateur doit contenir au moins 3 caractères.");
      return false;
    }
    if (!emailRegex.test(email)) { 
      toast.error("Veuillez entrer un email valide.");
      return false;
    }
    if (!passwordRegex.length.test(password)) {
      toast.error("Le mot de passe doit contenir au moins 8 caractères.");
      return false;
    }
    if (!passwordRegex.upper.test(password)) {
      toast.error("Le mot de passe doit contenir au moins une majuscule.");
      return false;
    }
    if (!passwordRegex.lower.test(password)) {
      toast.error("Le mot de passe doit contenir au moins une minuscule.");
      return false;
    }
    if (!passwordRegex.digit.test(password)) {
      toast.error("Le mot de passe doit contenir au moins un chiffre.");
      return false;
    }
    if (!passwordRegex.special.test(password)) {
      toast.error("Le mot de passe doit contenir au moins un caractère spécial @$!%*?&.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaChecked) {
      toast.error("Veuillez valider le captcha.");
      return;
    }
    if (!validate()) return;
    if (type === "register") {
      onSubmit({ username, email, password });
    } else {
      try {
        const response = await onSubmit({ email, password });
        if (response?.user) {
          localStorage.setItem('username', response.user.username);
          if (onLoginSuccess) {
            onLoginSuccess();
          }
        }
      } catch (error) {
        console.error('Erreur lors de la connexion:', error);
      }
      onSubmit({ email, password });
    }
  };

  return (
    <div className="flex h-screen w-full font-sans ">
      
      <div className="md:w-[50%] rounded-bl-150% flex items-center justify-center">
        <div
          className="w-full h-full bg-cover bg-no-repeat rounded-customBlRadius"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80')` }}
          aria-hidden="true"
        />
      </div>
     
      <div className="md:w-[50%] flex flex-col justify-center -mt-40">
        <div className="max-w-xl mx-auto   p-8  w-full mt-8">
          <div className="flex items-center justify-center mb-4">
            <div >
              <img src="/book.png" alt="book" className="w-72 h-36 mt-3" />
            </div>
            
          </div>
         
          <form onSubmit={handleSubmit}>
            <h2 className="text-lg font-bold mb-8  text-violettitle ">
              {type === "login" ? "Entrez vos informations de connexion" : "Inscrivez vous"}
            </h2>
            {type === "register" && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Nom d'utilisateur</label>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                  minLength={3}
                  className="form-input2 bg-white border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                  autoComplete="username"
                  placeholder="Votre nom d'utilisateur"
                />
              </div>
            )}
            <div className="mb-8">
              <label className="block text-gray-700  text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="form-input2 bg-white  border border-gray-300  rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                autoComplete="email"
                placeholder="mail@simple.com"
              />
            </div>
            <div className="mb-8 relative">
              <label className="block text-gray-700  text-sm font-bold mb-2">Mot de passe</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="form-input2 bg-white border border-gray-300  rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                autoComplete={type === "login" ? "current-password" : "new-password"}
                placeholder="Min. 8 caractères"
              />
              <span
                className="absolute right-3 top-9 cursor-pointer"
                onClick={() => setShowPassword(v => !v)}
                tabIndex={0}
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              >
                {showPassword ? <FaEyeSlash size={22} color="#A3AED0" /> : <FaEye size={22} color="#A3AED0" />}
              </span>
            </div>
            {/* Placeholder Captcha */}
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="captcha"
                checked={captchaChecked}
                onChange={() => setCaptchaChecked(v => !v)}
                className="mr-2"
              />
              <label htmlFor="captcha" className="text-gray-700  text-sm">Je ne suis pas un robot</label>
            </div>
            {/* {(formError || error) && (
              <div className="text-red-500 text-xs italic mb-4">{formError || error}</div>
            )} */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center font-bold py-2 px-4  rounded-xl focus:outline-none focus:shadow-outline transition-all duration-200
                ${loading ? "bg-violetdesc cursor-not-allowed text-white" : "bg-violettitle hover:bg-violetdesc text-white"}`}
            >
              {loading ? (
                <svg className="animate-spin mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
              ) : null}
              {type === "login" ? "Se connecter" : "S'inscrire"}
            </button>
            <div className="mt-4 text-center">
              {type === "register" ? (
                <span className="text-sm">Déjà un compte ? <a href="/login" className="text-violetdesc hover:underline">Se connecter</a></span>
              ) : (
                <span className="text-sm">Pas encore de compte ? <a href="/register" className="text-violetdesc hover:underline">S'inscrire</a></span>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;


