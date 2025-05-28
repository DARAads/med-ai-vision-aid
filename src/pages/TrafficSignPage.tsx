
import React from 'react';
import TrafficSignDashboard from '@/components/TrafficSignDashboard';

const TrafficSignPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        <TrafficSignDashboard />
      </div>
    </div>
  );
};

export default TrafficSignPage;
