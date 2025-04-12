import React from 'react';
import { cn } from '@poizon-market/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div className={cn('bg-white rounded-lg shadow-md p-6', className)} {...props}>
      {children}
    </div>
  );
};
