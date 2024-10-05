"use client";
import React from 'react';
import Link from 'next/link';

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  description: string;
}

const events: Event[] = [
  {
    id: 1,
    name: 'Local Football Tournament',
    date: '2023-06-15',
    location: 'City Stadium',
    description: 'Annual football tournament for local teams.',
  },
  {
    id: 2,
    name: 'Basketball Clinic',
    date: '2023-06-20',
    location: 'Community Center',
    description: 'Free basketball clinic for youth players.',
  },
  {
    id: 3,
    name: 'Charity Run',
    date: '2023-06-25',
    location: 'Central Park',
    description: '5K run to raise funds for local charities.',
  },
];

const EventsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Events</h1>
      <div className="space-y-6">
        {events.map((event) => (
          <Link href={`/events/${event.id}`} key={event.id}>
            <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-semibold mb-2">{event.name}</h2>
              <p className="text-gray-600 mb-2">Date: {event.date}</p>
              <p className="text-gray-600 mb-2">Location: {event.location}</p>
              <p className="text-gray-700">{event.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
