import { cn } from '@poizon-market/utils';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body1' | 'body2';
  children: React.ReactNode;
}

const variantStyles = {
  h1: 'text-4xl font-bold',
  h2: 'text-3xl font-bold',
  h3: 'text-2xl font-semibold',
  h4: 'text-xl font-medium',
  body1: 'text-base',
  body2: 'text-sm',
};

const variantElements = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  body1: 'p',
  body2: 'p',
} as const;

export const Typography = ({
  variant = 'body1',
  children,
  className,
  ...props
}: TypographyProps) => {
  const Component = variantElements[variant];

  return (
    <Component className={cn(variantStyles[variant], className)} {...props}>
      {children}
    </Component>
  );
};
