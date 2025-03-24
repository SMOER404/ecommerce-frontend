import { cn } from '@poizonmarket/utils';

interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

export const Loading = ({ size = 'md', className, ...props }: LoadingProps) => {
  return (
    <div
      className={cn('flex items-center justify-center', className)}
      {...props}
    >
      <div
        className={cn(
          'animate-spin rounded-full border-4 border-primary border-t-transparent',
          sizeStyles[size]
        )}
      />
    </div>
  );
}; 