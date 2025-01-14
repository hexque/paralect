import { z } from 'zod';

import { isValidRange } from '@/lib/utils';

export const validationSchema = z.object({
  company: z
    .string({
      required_error: 'Company is required',
      invalid_type_error: 'Company is required'
    })
    .trim()
    .min(1, {
      message: 'Company is required'
    })
    .max(50, {
      message: 'Company is too long'
    }),
  position: z
    .string({
      required_error: 'Position is required',
      invalid_type_error: 'Position is required'
    })
    .trim()
    .min(1, {
      message: 'Position is required'
    })
    .max(80, {
      message: 'Position is too long'
    }),
  salary: z
    .string({
      required_error: 'Salary fork is required',
      invalid_type_error: 'Salary fork is required'
    })
    .trim()
    .min(1, {
      message: 'Salary fork is required'
    })
    .refine((value) => /^(\d+|\d+-\d+)$/.test(value), {
      message: 'Invalid salary fork format. Should be a number or a range (e.g., 100-200).'
    })
    .refine((value) => isValidRange(value), {
      message: 'The range must be written in ascending order (e.g., 500-700).'
    }),
  status: z
    .enum(['Applied', 'Invitation', 'Rejected', 'Archived'], {
      required_error: 'Please choose one of the following statuses'
    })
    .refine((value: string) => value !== undefined, {
      message: 'Please choose one of the following statuses'
    }),
  note: z.string().trim().optional()
});
