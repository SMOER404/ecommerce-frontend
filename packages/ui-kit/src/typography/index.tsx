import React from 'react';
import { cn } from '@poizon-market/utils';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const H1: React.FC<TypographyProps> = ({ 
  children, 
  className, 
  ...props 
}) => (
  <h1
    className={cn(
      'text-4xl font-bold text-gray-900',
      className
    )}
    {...props}
  >
    {children}
  </h1>
);

export const H2: React.FC<TypographyProps> = ({ 
  children, 
  className, 
  ...props 
}) => (
  <h2
    className={cn(
      'text-3xl font-semibold text-gray-900',
      className
    )}
    {...props}
  >
    {children}
  </h2>
);

export const P: React.FC<TypographyProps> = ({ 
  children, 
  className, 
  ...props 
}) => (
  <p
    className={cn(
      'text-base text-gray-600',
      className
    )}
    {...props}
  >
    {children}
  </p>
); 