import React from 'react';
import { Card, CardHeader, CardContent } from '../../ui/Card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '9:00', active: 12, resolved: 8 },
  { time: '10:00', active: 18, resolved: 12 },
  { time: '11:00', active: 15, resolved: 15 },
  { time: '12:00', active: 20, resolved: 18 },
  { time: '13:00', active: 25, resolved: 20 },
  { time: '14:00', active: 22, resolved: 24 },
  { time: '15:00', active: 18, resolved: 28 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-dark-card p-3 border border-gray-100 dark:border-gray-800 rounded-lg shadow-lg">
        <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
        <div className="mt-1">
          <p className="text-sm">
            <span className="inline-block w-3 h-3 rounded-sm bg-primary mr-2"></span>
            Active: {payload[0].value}
          </p>
          <p className="text-sm">
            <span className="inline-block w-3 h-3 rounded-sm bg-emerald-500 mr-2"></span>
            Resolved: {payload[1].value}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export function ConversationMetrics() {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-gray-900 dark:text-white text-lg font-semibold">Conversations</h2>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="activeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="resolvedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                className="text-gray-600 dark:text-gray-400"
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                className="text-gray-600 dark:text-gray-400"
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="active"
                stroke="#4f46e5"
                fillOpacity={1}
                fill="url(#activeGradient)"
              />
              <Area
                type="monotone"
                dataKey="resolved"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#resolvedGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}