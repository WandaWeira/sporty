"use client";
import React from "react";
import { useSession } from "next-auth/react";

const ProfilePage: React.FC = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>Please sign in to view your profile.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center mb-6">
          <img
            src={`https://ui-avatars.com/api/?name=${session?.user?.name}&background=random`}
            alt={session?.user?.name || "User"}
            className="w-20 h-20 rounded-full mr-4"
          />
          <div>
            <h2 className="text-2xl font-semibold">{session?.user?.name}</h2>
            <p className="text-gray-600">{session?.user?.email}</p>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">About Me</h3>
          <p className="text-gray-700">
            This is where the user's bio would go. It's currently hardcoded, but
            in a real application, this would be fetched from the user's data.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
