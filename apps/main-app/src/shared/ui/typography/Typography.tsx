'use client';

import React from 'react';
import { cn } from '@poizonmarket/utils';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption';
}

const variantClasses = {
  h1: 'text-4xl font-bold',
  h2: 'text-3xl font-bold',
  h3: 'text-2xl font-bold',
  h4: 'text-xl font-bold',
  h5: 'text-lg font-bold',
  h6: 'text-base font-bold',
  body1: 'text-base',
  body2: 'text-sm',
  caption: 'text-xs',
};

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body1',
  className,
  children,
  ...props
}) => {
  const Component = variant.startsWith('h') ? variant : 'p';
  
  return (
    <Component
      className={cn(variantClasses[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
}; 