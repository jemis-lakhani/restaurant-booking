"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

function HomePage() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    if (userRole) {
      setRole(userRole);
    } else {
      console.error("Role not found in local storage");
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1>Home Page</h1>
      {role === "restaurantOwner" && (
        <div className="mt-4">
          <h2>Welcome, Restaurant Owner!</h2>
          <p>Content for restaurant owners...</p>
          <Link className='text-purple-600' href="/dashboard">Go to Dashboard</Link>
        </div>
      )}
      {role === "admin" && (
        <div className="mt-4">
          <h2>Welcome, Admin!</h2>
          <p>Content for admins...</p>
          <Link href="/admin">Go to Admin Dashboard</Link>
        </div>
      )}
    </div>
  );
}

export default HomePage;
