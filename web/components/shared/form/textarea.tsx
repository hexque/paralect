'use client';

import type { ReactNode } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';

import { Textarea } from '@/components/ui/textarea';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

import { cn } from '@/lib/utils';

interface TextareaProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: ReactNode;
  isDisabled?: boolean;
  placeholder?: string;
  description?: ReactNode;
  classNames?: {
    item?: string;
    label?: string;
    textarea?: string;
    description?: string;
    message?: string;
  };
}

export const TextareaControl = <T extends FieldValues>({
  control,
  name,
  classNames,
  description,
  isDisabled,
  label,
  placeholder
}: TextareaProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className={cn(classNames?.item)}>
        {label && <FormLabel className={cn(classNames?.label)}>{label}</FormLabel>}
        <FormControl>
          <Textarea
            disabled={isDisabled}
            placeholder={placeholder}
            className={cn(classNames?.textarea)}
            {...field}
          />
        </FormControl>
        {description && <FormDescription className={cn(classNames?.description)} />}
        <FormMessage className={cn(classNames?.message)} />
      </FormItem>
    )}
  />
);
