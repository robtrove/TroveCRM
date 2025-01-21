import React from 'react';
import { StatCard } from './dashboard/StatCard';
import { ActivityFeed } from './dashboard/ActivityFeed';
import { TaskList } from './dashboard/TaskList';
import { RevenueChart } from './dashboard/graphs/RevenueChart';
import { CustomerChart } from './dashboard/graphs/CustomerChart';
import { PipelineChart } from './dashboard/graphs/PipelineChart';
import { SupportMetrics } from './dashboard/graphs/SupportMetrics';
import { ConversationMetrics } from './dashboard/graphs/ConversationMetrics';
import { CustomerSatisfaction } from './dashboard/graphs/CustomerSatisfaction';

export default function Dashboard() {
  return (
    <main className="flex-1 min-w-0 overflow-auto">
      <div className="max-w-[1440px] mx-auto animate-fade-in">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <h1 className="text-gray-900 dark:text-white text-2xl md:text-3xl font-bold">Dashboard</h1>
        </div>
        
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 p-2 sm:p-4">
          <StatCard 
            title="Total Revenue" 
            value="$15,500" 
            change="+12.5%" 
            compact={true}
          />
          <StatCard 
            title="Active Customers" 
            value="245" 
            change="+8.2%" 
            compact={true}
          />
          <StatCard 
            title="Pipeline Value" 
            value="$85.2K" 
            change="+15.3%" 
            compact={true}
          />
          <StatCard 
            title="Open Tickets" 
            value="28" 
            change="-5.2%" 
            compact={true}
          />
          <StatCard 
            title="Response Time" 
            value="1.8h" 
            change="-12.3%" 
            compact={true}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
          {/* Main Charts - 2 columns */}
          <div className="lg:col-span-2 space-y-4">
            {/* Revenue Overview */}
            <RevenueChart />
            
            {/* Pipeline & Deals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <PipelineChart />
              <CustomerChart />
            </div>
            
            {/* Support & Conversations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SupportMetrics />
              <ConversationMetrics />
            </div>

            {/* Customer Satisfaction */}
            <CustomerSatisfaction />
          </div>
          
          {/* Sidebar - 1 column */}
          <div className="space-y-4">
            <TaskList />
            <ActivityFeed />
          </div>
        </div>
      </div>
    </main>
  );
}