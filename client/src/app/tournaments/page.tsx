import React from 'react';
import Link from 'next/link';

interface Tournament {
  id: number;
  name: string;
  sport: string;
  startDate: string;
  endDate: string;
  location: string;
}

const tournaments: Tournament[] = [
  {
    id: 1,
    name: 'Summer Soccer Cup',
    sport: 'Football',
    startDate: '2023-07-01',
    endDate: '2023-07-15',
    location: 'Multiple Venues',
  },
  {
    id: 2,
    name: 'Regional Basketball Championship',
    sport: 'Basketball',
    startDate: '2023-08-05',
    endDate: '2023-08-12',
    location: 'Sports Arena',
  },
  {
    id: 3,
    name: 'Tennis Open',
    sport: 'Tennis',
    startDate: '2023-09-01',
    endDate: '2023-09-14',
    location: 'Tennis Center',
  },
];

const TournamentsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Tournaments</h1>
      <div className="space-y-6">
        {tournaments.map((tournament) => (
          <Link href={`/tournaments/${tournament.id}`} key={tournament.id}>
            <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-semibold mb-2">{tournament.name}</h2>
              <p className="text-gray-600 mb-2">Sport: {tournament.sport}</p>
              <p className="text-gray-600 mb-2">
                Date: {tournament.startDate} to {tournament.endDate}
              </p>
              <p className="text-gray-600">Location: {tournament.location}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TournamentsPage;
