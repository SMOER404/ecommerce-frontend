import { Field, FieldProps } from 'formik';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DatePickerProps {
  name: string;
  label?: string;
  className?: string;
}

export const DatePicker = ({ name, label, className }: DatePickerProps) => {
  return (
    <Field name={name}>
      {({ field, form, meta }: FieldProps) => (
        <div className={cn('space-y-2', className)}>
          {label && (
            <label className="text-sm font-medium text-foreground/80">
              {label}
            </label>
          )}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full px-4 py-2.5 text-base font-normal',
                  'bg-background border border-input rounded-lg',
                  'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
                  'hover:bg-accent/5',
                  'transition-colors duration-200',
                  'justify-start text-left',
                  !field.value && 'text-muted-foreground/50',
                  meta.touched && meta.error && 'border-destructive focus:ring-destructive'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                {field.value ? (
                  format(new Date(field.value), 'PPP', { locale: ru })
                ) : (
                  <span>Выберите дату</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent 
              className="w-auto p-0 rounded-lg border border-input shadow-lg" 
              align="start"
            >
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(date) => form.setFieldValue(name, date)}
                initialFocus
                locale={ru}
                className="rounded-lg"
                classNames={{
                  months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                  month: "space-y-4",
                  caption: "flex justify-center pt-1 relative items-center",
                  caption_label: "text-sm font-medium",
                  nav: "space-x-1 flex items-center",
                  nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex",
                  head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                  row: "flex w-full mt-2",
                  cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent/5 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                  day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                  day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                  day_today: "bg-accent/5 text-accent-foreground",
                  day_outside: "text-muted-foreground opacity-50",
                  day_disabled: "text-muted-foreground opacity-50",
                  day_range_middle: "aria-selected:bg-accent/5 aria-selected:text-accent-foreground",
                  day_hidden: "invisible"
                }}
              />
            </PopoverContent>
          </Popover>
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