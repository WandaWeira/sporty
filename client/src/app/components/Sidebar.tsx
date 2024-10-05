import React from 'react';
import Link from 'next/link';
import { FaUser, FaUsers, FaCalendarAlt, FaTrophy, FaNewspaper } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white shadow-md rounded-lg p-4 mr-8">
      <nav>
        <ul className="space-y-2">
          <li>
            <Link href="/profile" className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline">
              <FaUser className="text-gray-600" />
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link href="/clubs" className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline">
              <FaUsers className="text-gray-600" />
              <span>Clubs</span>
            </Link>
          </li>
          <li>
            <Link href="/events" className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline">
              <FaCalendarAlt className="text-gray-600" />
              <span>Events</span>
            </Link>
          </li>
          <li>
            <Link href="/tournaments" className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline">
              <FaTrophy className="text-gray-600" />
              <span>Tournaments</span>
            </Link>
          </li>
          <li>
            <Link href="/news" className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline">
              <FaNewspaper className="text-gray-600" />
              <span>News</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
