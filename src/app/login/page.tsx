"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import React from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard/marketing');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-6xl w-full flex bg-white shadow-md rounded-lg overflow-hidden">
        <div className="w-full md:w-1/2 p-10">
          <div className="mb-8">
          <Image
            src="/Logo.png"
            alt="Logo"
            width={150}
            height={50}
          />
            <h2 className="text-2xl font-semibold mt-6">Sign In</h2>
            <p className="text-gray-500 mt-1">
              Welcome back! Please log in to your account with registered email
              and password.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSignIn}>
            <div>
              <label
                htmlFor="nip"
                className="block text-sm font-medium text-gray-700"
              >
                NIP
              </label>
              <input
                id="nip"
                name="nip"
                type="text"
                placeholder="Enter your NIP"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative mt-1">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye }
                  ></FontAwesomeIcon>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox text-teal-600"
                />
                <span className="text-sm text-gray-600">Remember Me</span>
              </label>
              <Link href="#" className="text-sm text-teal-600 hover:underline">
                Forgot Password
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition"
            >
              Sign In
            </button>

            <div className="text-center text-gray-500 text-sm">or</div>

            <div className="text-center text-sm text-gray-700">
              Don’t have an account?{" "}
              <Link href="#" className="text-teal-600 hover:underline">
                Register Now
              </Link>
            </div>
          </form>
        </div>

        <div className="hidden md:flex md:w-1/2 bg-white-100 items-center justify-center">
          <Image
            src="/login.png"
            alt="Login Illustration"
            width={400}
            height={400}
          />
        </div>
      </div>
    </div>
  );
}
