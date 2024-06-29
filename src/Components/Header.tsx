"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const title = "Restaurant";

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("role");
    setIsLoggedIn(!!role);
  }, []);

  return (
    <header className="sticky top-0 flex justify-between items-center z-50 bg-gray-50 shadow-md p-4 w-full">
      <h1 className="text-gray-800 font-bold text-3xl ">{title}</h1>
      <nav className="nav-item">
        <ul className="flex space-x-6 text-xl text-gray-600">
          <li className="transition duration-300 ease-in-out transform hover:scale-105 hover:text-green-500">
            <Link href="/">Home</Link>
          </li>
          {isLoggedIn && (
            <li className="transition duration-300 ease-in-out transform hover:scale-105 hover:text-green-500">
              <Link href="/profile">Profile</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
