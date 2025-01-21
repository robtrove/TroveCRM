import React from 'react';
import clsx from 'clsx';

export function Card({ className, children }) {
  return (
    <div className={clsx(
      'bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-gray-800',
      className
    )}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children }) {
  return (
    <div className={clsx(
      'flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800',
      className
    )}>
      {children}
    </div>
  );
}

export function CardContent({ className, children }) {
  return (
    <div className={clsx('p-6', className)}>
      {children}
    </div>
  );
}