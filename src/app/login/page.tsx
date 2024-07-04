"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { loginSchema } from "@/helpers/validationSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

type FormValues = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(loginSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await axios.post("/api/users/login", data);
      toast.success("Login Success");
      localStorage.setItem("role", response.data.role);
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || "Login failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-2">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-sm font-medium">
              Email
            </label>
            <input
              type="text"
              id="email"
              {...register("email")}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
        <p className="text-gray-600 text-center mt-4">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-indigo-600 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
