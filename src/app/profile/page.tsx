"use client";

import React from "react";
import Navbar from "../components/Navbar";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Profile = () => {
  const { data: session } = useSession();

  let user;

  console.log(session);

  if (session?.user) {
    user = session.user;
  }

  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-[90%] bg-gray-900 px-4 sm:px-6 lg:px-8">
        <div className="w-full sm:w-3/4 md:w-2/4 p-8 space-y-8 bg-gray-800 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center text-white">Profile</h1>
          <div className="mt-8 space-y-6 flex flex-col md:flex-row">
            <div className="flex justify-center md:justify-start">
              <Image
                src={`${user?.image ? user?.image : "/profile.png"}`}
                width={200}
                height={200}
                alt="photo"
                className="rounded-full"
              />
            </div>
            <div className="rounded-md shadow-sm flex-1 mt-6 md:mt-0 md:ml-12">
              <div className="px-3 py-2">
                <label className="block text-sm font-medium text-gray-300">
                  Username
                </label>
                <div className="mt-1 text-lg text-white">
                  {user?.username ? user?.username : "Not logged in"}
                </div>
              </div>
              <div className="px-3 py-2">
                <label className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <div className="mt-1 text-lg text-white">
                  {user?.email ? user?.email : "Not logged in"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
