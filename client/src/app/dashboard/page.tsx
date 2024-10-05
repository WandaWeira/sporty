import React from 'react';
import Header from '@/app/components/Header';
import Sidebar from '@/app/components/Sidebar';
import Feed from '@/app/feed/page';
import RightSidebar from '@/app/components/RightSidebar';

const Dashboard: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8 flex">
        <Sidebar />
        <Feed />
        <RightSidebar />
      </main>
    </div>
  );
};

export default Dashboard;