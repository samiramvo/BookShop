import React from "react";
const Navbar = () => {
  const username = localStorage.getItem('username');

  return (
    <nav className="w-full bg-white shadow right-0 justify-between px-8 py-4 mb-6">
      <div className="flex items-center gap-4">
        <span className="text-lg text-violettitle font-semibold">
           {username ? `Bienvenue, ${username}` : "Bienvenue"}
        </span>

      </div>
    </nav>
  );
};

export default Navbar;
