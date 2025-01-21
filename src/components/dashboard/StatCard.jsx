import React from 'react';
import { Card } from '../ui/Card';

export function StatCard({ title, value, change, compact = false }) {
  return (
    <Card className={`flex flex-col gap-1 sm:gap-2 ${compact ? 'p-3 sm:p-4' : 'p-6'} hover:shadow-md transition-shadow duration-200`}>
      <p className={`text-gray-600 dark:text-gray-300 ${compact ? 'text-xs sm:text-sm' : 'text-sm'} font-medium truncate`}>
        {title}
      </p>
      <p className={`text-gray-900 dark:text-white font-bold ${compact ? 'text-lg sm:text-xl' : 'text-2xl'}`}>
        {value}
      </p>
      <p className={`text-emerald-600 dark:text-emerald-400 ${compact ? 'text-xs sm:text-sm' : 'text-sm'} font-medium`}>
        {change}
      </p>
    </Card>
  );
}