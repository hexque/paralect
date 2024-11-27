/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { STATUSES } from '@/lib/constants';

type BoardDialogProps = {
  vacancy?: any;
  isOpen?: boolean;
  onClose?: () => void;
  onClick?: () => void;
};

export const BoardDialog = ({ isOpen, onClose, vacancy }: BoardDialogProps) => {
  const form = useForm({
    mode: 'onChange',
    resolver: zodResolver(CreateVacancyResponseSchema),
    defaultValues: {
      company: vacancy?.company || '',
      position: vacancy?.position || '',
      salaryFork: vacancy?.salaryFork || '',
      status: vacancy?.status || '',
      note: vacancy?.note || ''
    }
  });

  const {
    register,
    setValue,
    reset,
    formState: { errors }
  } = form;

  const handleClose = () => {
    reset();
    onClose?.();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='sm:max-w-[450px]'>
        <DialogHeader>
          <DialogTitle>Create vacancy</DialogTitle>
          <DialogDescription>
            Create to your vacancy here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form className='grid gap-4 py-4'>
          <div className='grid items-center gap-2'>
            <Label htmlFor='company'>Company</Label>
            <Input id='company' className='col-span-3' {...register('company')} />
            {errors?.company && (
              <p className='px-1 text-xs text-red-600'>{errors.company.message}</p>
            )}
          </div>
          <div className='grid items-center gap-2'>
            <Label htmlFor='position'>Position</Label>
            <Input id='position' className='col-span-3' {...register('position')} />
            {errors?.position && (
              <p className='px-1 text-xs text-red-600'>{errors.position.message}</p>
            )}
          </div>
          <div className='grid items-center gap-2'>
            <Label htmlFor='salaryFork'>Salary fork</Label>
            <Input id='salaryFork' className='col-span-3' {...register('salaryFork')} />
            {errors?.salaryFork && (
              <p className='px-1 text-xs text-red-600'>{errors.salaryFork.message}</p>
            )}
          </div>
          <div className='grid items-center gap-2'>
            <Label htmlFor='status'>Status</Label>
            <Select {...register('status')} onValueChange={(value) => setValue('status', value)}>
              <SelectTrigger>
                <SelectValue placeholder='Select vacancy status' />
              </SelectTrigger>
              <SelectContent>
                {STATUSES.map((status: string) => (
                  <SelectGroup key={status}>
                    <SelectItem id='status' value={status}>
                      {status}
                    </SelectItem>
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
            {errors?.note && <p className='px-1 text-xs text-red-600'>{errors.note.message}</p>}
          </div>
          <div className='grid items-center gap-2'>
            <Label htmlFor='note'>Note</Label>
            <Textarea id='note' className='col-span-3' {...register('note')} />
            {errors?.note && <p className='px-1 text-xs text-red-600'>{errors.note.message}</p>}
          </div>
          <DialogFooter>
            <Button type='submit'>Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const CreateVacancyResponseSchema = z.object({
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
  salaryFork: z
    .string({
      required_error: 'Salary fork is required',
      invalid_type_error: 'Salary fork is required'
    })
    .trim()
    .min(1, {
      message: 'Salary fork is required'
    }),
  status: z
    .enum(['Pending', 'Invitation', 'Archived', 'Rejected'], {
      required_error: 'Please select a status to display.'
    })
    .refine((value) => value !== undefined, {
      message: 'Please select a status.'
    }),
  note: z.string().trim().optional()
});
