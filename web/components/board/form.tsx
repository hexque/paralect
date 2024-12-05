/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
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
import { Icons } from '../ui/icons';
import { Button } from '../ui/button';
import { InputControl } from '../shared/form/input';
import { TextareaControl } from '../shared/form/textarea';
import { SelectControl } from '../shared/form/select';

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
      required_error: 'Please choose one of the following statuses'
    })
    .refine((value: string) => value !== undefined, {
      message: 'Please choose one of the following statuses'
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
  const form = useForm<FormData>(props);

  const { control, handleSubmit } = form;

  return (
    <FormProvider {...form}>
      <form className='grid gap-4 py-4' onSubmit={handleSubmit(onSubmit)}>
        <div className='grid items-center gap-3'>
          <InputControl control={control} name='company' />
        </div>
        <div className='grid items-center gap-3'>
          <InputControl control={control} name='position' />
        </div>
        <div className='grid items-center gap-3'>
          <InputControl control={control} name='salaryFork' />
        </div>
        <div className='grid items-center gap-3'>
          <SelectControl
            control={control}
            name='status'
            options={STATUSES}
            placeholder='Select the response status'
          />
        </div>
        <div className='grid items-center gap-3'>
          <TextareaControl control={control} name='note' />
        </div>
        {children}
      </form>
    </FormProvider>
  );
};

export const CreateBoardForm = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      onClose();
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
              note: vacancy?.note
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
