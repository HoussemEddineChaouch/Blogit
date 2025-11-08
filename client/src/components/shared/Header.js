import React, { useState } from "react";
import blogitLogo from "../../assets/logoBlogit.png";
import { Link } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    {
      id: 1,
      to: "/",
      name: "Profile",
    },
    {
      id: 2,
      to: "/home",
      name: "Home",
    },
    {
      id: 3,
      to: "blogs/leaderboard",
      name: "Leaderboard",
    },
  ];

  return (
    <header
      className="h-[60px] w-[95vw] mx-auto my-2 rounded-2xl 
      bg-gradient-to-r from-headerColor to-fontBaseColor
      text-baseColor font-Cairo flex justify-between items-center px-4 md:px-10"
    >
      {/* <img src={blogitLogo} className="w-6 h-6" alt="Blogit logo" /> */}
      <h1>Blogit</h1>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-6">
        {links.map(({ id, to, name }) => (
          <Link key={id} to={to} className="hover:underline cursor-pointer">
            {name}
          </Link>
        ))}
      </ul>

      {/* Logout Button */}
      <h1 className="hidden md:block cursor-pointer">Logout</h1>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden focus:outline-none"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="absolute top-[70px] left-0 w-full bg-gradient-to-r from-headerColor to-fontBaseColor 
          flex flex-col items-center md:hidden py-4 space-y-3 rounded-b-2xl z-50"
        >
          {links.map((link) => (
            <li key={link} className="list-none cursor-pointer hover:underline">
              {link}
            </li>
          ))}
          <li className="list-none cursor-pointer hover:underline">Logout</li>
        </div>
      )}
    </header>
  );
}

export default Header;
