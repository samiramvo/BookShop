import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BookOpenIcon, HomeIcon } from "@heroicons/react/24/outline";
import { IoLogOut } from "react-icons/io5";
const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload(); 
  };

  return (
    <aside className="h-full w-64 bg-violetdesc  text-white flex flex-col py-8 px-4 shadow-xl min-h-screen">
      <div className="flex items-center justify-center mb-4">
        <div>
          <img src="/book_blanc.png" alt="book" className="w-48 h-auto mt-3" />
        </div>
      </div>
      <nav className="flex flex-col gap-4 flex-1 mt-10">
        <Link
          to="/dashboard"
          className={`text-md px-4 py-2 rounded-xl transition-all duration-150 flex items-center gap-3 text-left ${location.pathname === "/dashboard" ? "bg-white text-violettitle font-bold shadow" : "hover:bg-violetdesc/40"}`}
        >
          <HomeIcon className="h-5 w-5" />
          Dashboard
        </Link>
        <Link
          to="/books"
          className={`text-md px-4 py-2 rounded-xl transition-all duration-150 flex items-center gap-3 text-left ${location.pathname === "/books" ? "bg-white text-violettitle font-bold shadow" : "hover:bg-violetdesc/40"}`}
        >
          <BookOpenIcon className="h-5 w-5" />
          Gestion des livres
        </Link>
      </nav>
      <button
        onClick={handleLogout}
        className="mt-auto text-md bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl shadow transition-all flex items-center gap-3"
      >
        <IoLogOut className="h-5 w-5" />
        Déconnexion
      </button>
    </aside>
  );
};

export default Sidebar;
