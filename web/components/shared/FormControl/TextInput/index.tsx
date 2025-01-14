'use client';

import type { ReactNode } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

import { cn } from '@/lib/utils';

type TextInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: ReactNode;
  isDisabled?: boolean;
  placeholder?: string;
  description?: ReactNode;
  classNames?: {
    item?: string;
    label?: string;
    input?: string;
    description?: string;
    message?: string;
  };
  startAddOn?: string;
  endAddOn?: string;
};

export const TextInputControl = <T extends FieldValues>({
  control,
  name,
  classNames,
  description,
  isDisabled,
  label,
  placeholder,
  startAddOn,
  endAddOn
}: TextInputProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className={cn(classNames?.item)}>
        {label && <FormLabel className={cn(classNames?.label, 'text-current')}>{label}</FormLabel>}
        <FormControl>
          <div className='relative'>
            <Input
              type='text'
              disabled={isDisabled}
              placeholder={placeholder}
              className={cn(classNames?.input)}
              {...field}
            />
            <span className='pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground peer-disabled:opacity-50'>
              {startAddOn}
            </span>
            <span className='pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm text-muted-foreground peer-disabled:opacity-50'>
              {endAddOn}
            </span>
          </div>
        </FormControl>
        {description && <FormDescription className={cn(classNames?.description)} />}
        <FormMessage className={cn(classNames?.message)} />
      </FormItem>
    )}
  />
);
