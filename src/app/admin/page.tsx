"use client";
import React from 'react';
import Link from 'next/link';

const Admin = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1>Admin Dashboard</h1>
      <div className="mt-4">
        <Link href="/profile">Go to Profile</Link>
      </div>
    </div>
  );
};

export default Admin;
