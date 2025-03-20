import { Field, FieldProps } from 'formik';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  className?: string;
}

export const FormField = ({
  name,
  label,
  type = 'text',
  placeholder,
  className
}: FormFieldProps) => {
  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <div className={cn('space-y-2', className)}>
          {label && (
            <Label 
              htmlFor={name} 
              className="text-sm font-medium text-foreground/80"
            >
              {label}
            </Label>
          )}
          <Input
            {...field}
            type={type}
            id={name}
            placeholder={placeholder}
            className={cn(
              'w-full px-4 py-2.5 text-base font-normal',
              'bg-background border border-input rounded-lg',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
              'placeholder:text-muted-foreground/50',
              'transition-colors duration-200',
              meta.touched && meta.error && 'border-destructive focus:ring-destructive'
            )}
          />
          {meta.touched && meta.error && (
            <p className="text-sm text-destructive font-medium">
              {meta.error}
            </p>
          )}
        </div>
      )}
    </Field>
  );
}; 