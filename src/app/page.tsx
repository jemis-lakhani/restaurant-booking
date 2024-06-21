"use client"
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function HomePage() {
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter()
  useEffect(() => {
    const userRole = localStorage.getItem("role");
    if (userRole) {
      setRole(userRole);
    } else {
      console.error("Role not found in local storage");
    }
  }, []);

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  const logout = async ()=> {
      try {
       await axios.get("/api/users/logout")
       toast.success("logout successfully");
       localStorage.removeItem("role");
        router.push("/login");
      } catch (error:any) {
        console.log(error.message)
        toast.error(error.message)
      }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1>Home Page</h1>
      <button onClick={logout} 
      className="text-white rounded bg-green-700 mt-2 p-1"
      >Logout</button>
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
