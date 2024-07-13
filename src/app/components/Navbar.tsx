"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const { data: session } = useSession();
  let userLoggedIn = false;

  console.log(session);

  if (session?.user) {
    userLoggedIn = true;
  }

  return (
    <>
      {userLoggedIn === true ? (
        <nav className="bg-gray-800 p-4 shadow-md">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0">
                  <h1 className="text-white text-2xl font-bold">Next Auth</h1>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-300">
                  Logged in as{" "}
                  <span className="text-white font-medium">
                    {session?.user?.name}
                  </span>
                </span>
                <Link href={"/profile"}>
                  <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Profile
                  </button>
                </Link>
                <button
                  className="px-3 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => signOut()}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
      ) : (
        <nav className="bg-gray-800 p-4 shadow-md">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0">
                  <h1 className="text-white text-2xl font-bold">Next Auth</h1>
                </div>
              </div>
              <div className="flex items-center space-x-4 ">
                <Link href={"/signin"}>
                  <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Login
                  </button>
                </Link>

                <button
                  type="button"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  onClick={() => signIn("google")}
                >
                  Sign in with Google
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
