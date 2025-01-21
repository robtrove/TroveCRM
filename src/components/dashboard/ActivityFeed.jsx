import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';

const Support = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
    <path d="M176,156a12,12,0,1,1-12-12A12,12,0,0,1,176,156ZM104,144a12,12,0,1,0,12,12A12,12,0,0,0,104,144Zm124-32A96,96,0,0,1,96,204.47V232a16,16,0,0,1-16,16H64a16,16,0,0,1-16-16V204.47a96,96,0,0,1,80-176A96.11,96.11,0,0,1,228,112Zm-16,0A80,80,0,1,0,128,192a79.23,79.23,0,0,0,32-6.7V208h16a8,8,0,0,1,0,16H128A8,8,0,0,1,120,216V192a8,8,0,0,1,10.66-7.54,64,64,0,1,1,0-120.92A8,8,0,0,1,120,72V48a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H136v22.71A79.23,79.23,0,0,0,212,112Z" />
  </svg>
);

const NotificationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
    <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z" />
  </svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
    <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z" />
  </svg>
);

const ShoppingCartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
    <path d="M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16h18L59.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,152,204a28,28,0,1,0,28-28H83.17a8,8,0,0,1-7.87-6.57L72.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,222.14,58.87ZM96,204a12,12,0,1,1-12-12A12,12,0,0,1,96,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,192,204Zm4-74.57A8,8,0,0,1,188.1,136H69.22L57.59,72H206.41Z" />
  </svg>
);

const ActivityItem = ({ icon: Icon, title, time }) => (
  <>
    <div className="flex flex-col items-center gap-1">
      <div className="activity-line h-2" />
      <div className="p-2 rounded-full bg-gray-50 dark:bg-dark-hover text-gray-700 dark:text-gray-300">
        <Icon />
      </div>
      <div className="activity-line grow" />
    </div>
    <div className="flex flex-1 flex-col py-3">
      <p className="text-gray-900 dark:text-white text-sm font-medium">{title}</p>
      <p className="text-gray-500 dark:text-gray-400 text-sm">{time}</p>
    </div>
  </>
);

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-gray-900 dark:text-white text-lg font-semibold">Recent activity</h2>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <div className="grid grid-cols-[40px_1fr] gap-x-2 min-w-[300px]">
          <ActivityItem icon={Support} title="David Jones created an account" time="5 minutes ago" />
          <ActivityItem icon={ShoppingCartIcon} title="Bob Smith purchased a $100 item" time="1 hour ago" />
          <ActivityItem icon={ShoppingCartIcon} title="Charlie Brown added an item to cart" time="2 hours ago" />
          <ActivityItem icon={NotificationIcon} title="Alice Freeman signed up for the newsletter" time="3 hours ago" />
          <ActivityItem icon={EyeIcon} title="David Jones viewed a product" time="4 hours ago" />
        </div>
      </CardContent>
    </Card>
  );
}