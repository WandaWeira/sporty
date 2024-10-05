import React from 'react';
import Link from 'next/link';

const RightSidebar: React.FC = () => {
  const upcomingEvents = [
    { id: 1, name: 'Local Football Tournament', date: '2023-05-15' },
    { id: 2, name: 'Basketball Clinic', date: '2023-05-20' },
    { id: 3, name: 'Charity Run', date: '2023-05-25' },
  ];

  const suggestedFriends = [
    { id: 1, name: 'Alice Johnson', mutualFriends: 5 },
    { id: 2, name: 'Bob Williams', mutualFriends: 3 },
    { id: 3, name: 'Charlie Brown', mutualFriends: 7 },
  ];

  return (
    <aside className="w-80 bg-white shadow-md rounded-lg p-4 ml-8">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>
        <ul className="space-y-3">
          {upcomingEvents.map((event) => (
            <li key={event.id} className="text-sm">
              <Link href={`/events/${event.id}`} className="text-indigo-600 hover:underline">
                {event.name}
              </Link>
              <p className="text-gray-500">{event.date}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-4">Suggested Friends</h2>
        <ul className="space-y-3">
          {suggestedFriends.map((friend) => (
            <li key={friend.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={`https://ui-avatars.com/api/?name=${friend.name}&background=random`}
                  alt={friend.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-medium">{friend.name}</p>
                  <p className="text-sm text-gray-500">{friend.mutualFriends} mutual friends</p>
                </div>
              </div>
              <button className="text-indigo-600 hover:underline">Add</button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default RightSidebar;
