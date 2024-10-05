import React from 'react';
import Link from 'next/link';
import { FaHome, FaUser, FaBell, FaEnvelope, FaSearch } from 'react-icons/fa';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/dashboard" className="text-2xl font-bold text-indigo-600">
          Sporty
        </Link>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-100 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <Link href="/dashboard" className="text-gray-600 hover:text-indigo-600">
            <FaHome size={24} />
          </Link>
          <Link href="/messages" className="text-gray-600 hover:text-indigo-600">
            <FaEnvelope size={24} />
          </Link>
          <Link href="/notifications" className="text-gray-600 hover:text-indigo-600">
            <FaBell size={24} />
          </Link>
          <Link href="/profile" className="text-gray-600 hover:text-indigo-600">
            <FaUser size={24} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
