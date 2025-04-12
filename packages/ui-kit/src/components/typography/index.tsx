import React from 'react';
import { cn } from '@poizon-market/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 text-3xl font-semibold tracking-tight',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      p: 'leading-7',
      blockquote: 'mt-6 border-l-2 pl-6 italic',
      list: 'my-6 ml-6 list-disc [&>li]:mt-2',
    },
  },
  defaultVariants: {
    variant: 'p',
  },
});

type VariantType = VariantProps<typeof typographyVariants>['variant'];

const variantElementMap: Record<NonNullable<VariantType>, keyof JSX.IntrinsicElements> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  p: 'p',
  blockquote: 'blockquote',
  list: 'ul',
};

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: VariantType;
  children: React.ReactNode;
}

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = 'p', children, ...props }, ref) => {
    const Component = variantElementMap[variant as NonNullable<VariantType>];

    return React.createElement(
      Component,
      {
        ref,
        className: cn(typographyVariants({ variant }), className),
        ...props,
      },
      children,
    );
  },
);

Typography.displayName = 'Typography';

// Отдельные компоненты для каждого варианта
export const H1 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <Typography ref={ref} variant="h1" className={className} {...props}>
      {children}
    </Typography>
  ),
);
H1.displayName = 'H1';

export const H2 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <Typography ref={ref} variant="h2" className={className} {...props}>
      {children}
    </Typography>
  ),
);
H2.displayName = 'H2';

export const H3 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <Typography ref={ref} variant="h3" className={className} {...props}>
      {children}
    </Typography>
  ),
);
H3.displayName = 'H3';

export const H4 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <Typography ref={ref} variant="h4" className={className} {...props}>
      {children}
    </Typography>
  ),
);
H4.displayName = 'H4';

export const P = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => (
    <Typography ref={ref} variant="p" className={className} {...props}>
      {children}
    </Typography>
  ),
);
P.displayName = 'P';

export const Blockquote = React.forwardRef<
  HTMLQuoteElement,
  React.HTMLAttributes<HTMLQuoteElement>
>(({ className, children, ...props }, ref) => (
  <Typography ref={ref} variant="blockquote" className={className} {...props}>
    {children}
  </Typography>
));
Blockquote.displayName = 'Blockquote';

export const List = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  ({ className, children, ...props }, ref) => (
    <Typography ref={ref} variant="list" className={className} {...props}>
      {children}
    </Typography>
  ),
);
List.displayName = 'List';
