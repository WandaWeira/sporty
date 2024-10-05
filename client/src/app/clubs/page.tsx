"use client";
import React from "react";
import Link from "next/link";

interface Club {
  id: number;
  name: string;
  sport: string;
  members: number;
}

const clubs: Club[] = [
  { id: 1, name: "FC Barcelona", sport: "Football", members: 1000 },
  { id: 2, name: "LA Lakers", sport: "Basketball", members: 500 },
  { id: 3, name: "New York Yankees", sport: "Baseball", members: 750 },
];

const ClubsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Clubs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map((club) => (
          <Link href={`/clubs/${club.id}`} key={club.id}>
            <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-semibold mb-2">{club.name}</h2>
              <p className="text-gray-600 mb-2">Sport: {club.sport}</p>
              <p className="text-gray-600">Members: {club.members}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ClubsPage;
