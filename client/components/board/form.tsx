/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Icons } from '../ui/icons';
import { Button } from '../ui/button';

import { STATUSES } from '@/lib/constants';
import { useCreate, useUpdate } from '@/lib/queries';

export const CreateVacancyResponseSchema = z.object({
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
    .enum(['Applied', 'Invitation', 'Rejected', 'Archived'], {
      required_error: 'Please select a status to display.'
    })
    .refine((value: string) => value !== undefined, {
      message: 'Please select a status.'
    }),
  note: z.string().trim().optional()
});

type FormData = z.infer<typeof CreateVacancyResponseSchema>;

export const Form = ({
  props,
  onSubmit,
  children
}: {
  props: any;
  onSubmit: (data: FormData) => Promise<void>;
  children: React.ReactNode;
}) => {
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>(props);

  return (
    <form className='grid gap-4 py-4' onSubmit={handleSubmit(onSubmit)}>
      <div className='grid items-center gap-2'>
        <Label htmlFor='company'>Company</Label>
        <Input id='company' className='col-span-3' {...register('company')} />
        {errors?.company && <p className='px-1 text-xs text-red-600'>{errors.company.message}</p>}
      </div>
      <div className='grid items-center gap-2'>
        <Label htmlFor='position'>Position</Label>
        <Input id='position' className='col-span-3' {...register('position')} />
        {errors?.position && <p className='px-1 text-xs text-red-600'>{errors.position.message}</p>}
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
        {errors?.status && <p className='px-1 text-xs text-red-600'>{errors.status.message}</p>}
      </div>
      <div className='grid items-center gap-2'>
        <Label htmlFor='note'>Note</Label>
        <Textarea id='note' className='col-span-3' {...register('note')} />
        {errors?.note && <p className='px-1 text-xs text-red-600'>{errors.note.message}</p>}
      </div>
      {children}
    </form>
  );
};

export const CreateBoardForm = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const { mutationCreate } = useCreate();

  const handleSubmit = async (formData: any) => {
    try {
      await mutationCreate.mutateAsync(formData);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new response</DialogTitle>
          <DialogDescription>
            Create to your vacancy here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form
          props={{
            resolver: zodResolver(CreateVacancyResponseSchema)
          }}
          onSubmit={handleSubmit}
        >
          <DialogFooter>
            <Button disabled={mutationCreate.isPending} type='submit'>
              {mutationCreate.isPending ? (
                <div className='flex items-center gap-2'>
                  <Icons.spinner className='size-4 animate-spin' />
                  <span>Loading...</span>
                </div>
              ) : (
                'Create'
              )}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export const EditBoardForm = ({
  id,
  vacancy,
  isOpen,
  onClose
}: {
  id: string;
  isOpen: boolean;
  vacancy: any;
  onClose: () => void;
}) => {
  const { mutationUpdate } = useUpdate(id);

  const handleSubmit = async (formData: any) => {
    try {
      await mutationUpdate.mutateAsync(formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit the response</DialogTitle>
          <DialogDescription>
            Edit to your vacancy here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form
          props={{
            resolver: zodResolver(CreateVacancyResponseSchema),
            defaultValues: {
              company: vacancy?.company,
              position: vacancy?.position,
              salaryFork: vacancy?.salaryFork,
              status: vacancy?.status,
              note: vacancy?.note || ''
            }
          }}
          onSubmit={handleSubmit}
        >
          <DialogFooter>
            <Button disabled={mutationUpdate.isPending} type='submit'>
              {mutationUpdate.isPending ? (
                <div className='flex items-center gap-2'>
                  <Icons.spinner className='size-4 animate-spin' />
                  <span>Loading...</span>
                </div>
              ) : (
                'Save'
              )}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
