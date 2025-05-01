import React from "react";

const Navbar = () => {
  const username = localStorage.getItem("username");
  return (
    <nav className="w-full bg-white shadow flex items-center justify-end px-8 py-4 mb-6">
      <span className="text-lg text-violettitle font-semibold">
        {username ? `Bienvenue, ${username}` : "Bienvenue"}
      </span>
    </nav>
  );
};

export default Navbar;
