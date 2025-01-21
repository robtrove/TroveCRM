import React from 'react';

export function FeedbackButtons({ onFeedback }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500">Was this helpful?</span>
      <button
        onClick={() => onFeedback('positive')}
        className="p-1 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-lg transition-colors"
        title="Yes"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256" className="text-green-500">
          <path d="M178.39,158c-11,19.06-29.39,30-50.39,30s-39.36-10.93-50.39-30a8,8,0,0,1,13.78-8c7.8,13.51,20.83,22,36.61,22s28.81-8.49,36.61-22a8,8,0,0,1,13.78,8ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128ZM92,100a12,12,0,1,0-12-12A12,12,0,0,0,92,100Zm72-24a12,12,0,1,0,12,12A12,12,0,0,0,164,76Z" />
        </svg>
      </button>
      <button
        onClick={() => onFeedback('negative')}
        className="p-1 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-lg transition-colors"
        title="No"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256" className="text-red-500">
          <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM92,100a12,12,0,1,1,12-12A12,12,0,0,1,92,100Zm72-24a12,12,0,1,1-12,12A12,12,0,0,1,164,76Zm14.39,82c-7.8,13.51-20.83,22-36.61,22s-28.81-8.49-36.61-22a8,8,0,0,0-13.78,8c11,19.06,29.39,30,50.39,30s39.36-10.93,50.39-30a8,8,0,0,0-13.78-8Z" />
        </svg>
      </button>
    </div>
  );
}