'use client';

import type { ReactNode } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

import { cn } from '@/lib/utils';

type FormSelectProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: ReactNode;
  isDisabled?: boolean;
  placeholder?: string;
  description?: ReactNode;
  options: string[];
  classNames?: {
    item?: string;
    label?: string;
    select?: string;
    description?: string;
    message?: string;
  };
};

export const SelectControl = <T extends FieldValues>({
  control,
  name,
  classNames,
  description,
  options,
  isDisabled,
  label,
  placeholder
}: FormSelectProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className={cn(classNames?.item)}>
        {label && <FormLabel className={cn(classNames?.label, 'text-current')}>{label}</FormLabel>}
        <FormControl>
          <Select
            {...field}
            disabled={isDisabled}
            value={field.value}
            onValueChange={field.onChange}
          >
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option: string) => (
                <SelectGroup key={option}>
                  <SelectItem id='status' value={option}>
                    {option}
                  </SelectItem>
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
        </FormControl>
        {description && <FormDescription className={cn(classNames?.description)} />}
        <FormMessage className={cn(classNames?.message)} />
      </FormItem>
    )}
  />
);
