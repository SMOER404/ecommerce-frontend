'use client';

import React from 'react';
import { cn } from '@poizon-market/utils';

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

const variantElements = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body1: 'p',
  body2: 'p',
  caption: 'span',
} as const;

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ variant = 'body1', className, children, ...props }, ref) => {
    const element = variantElements[variant];
    return React.createElement(
      element,
      {
        ref,
        className: cn(variantClasses[variant], className),
        ...props,
      },
      children,
    );
  },
);

Typography.displayName = 'Typography';
