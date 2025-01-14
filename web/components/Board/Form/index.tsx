/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Icons } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { TextareaControl } from '@/components/shared/FormControl/Textarea';
import { TextInputControl } from '@/components/shared/FormControl/TextInput';
import { SelectControl } from '@/components/shared/FormControl/Select';

import { STATUSES } from '@/lib/constants';
import { useCreate, useUpdate } from '@/lib/queries';

import { validationSchema } from './schema';

import { FormData } from './types';

export const Form = ({
  props,
  onSubmit,
  children
}: {
  props: any;
  onSubmit: (data: FormData) => Promise<void>;
  children: React.ReactNode;
}) => {
  const form = useForm<FormData>({ ...props, mode: 'onChange' });

  const { control, handleSubmit } = form;

  return (
    <FormProvider {...form}>
      <form className='mt-5 grid gap-2' onSubmit={handleSubmit(onSubmit)}>
        <div className='grid items-center'>
          <TextInputControl control={control} label='Company' name='company' />
        </div>
        <div className='grid items-center'>
          <TextInputControl control={control} label='Position' name='position' />
        </div>
        <div className='grid items-center'>
          <TextInputControl
            control={control}
            label='Salary range'
            name='salary'
            classNames={{ input: 'peer pe-12 ps-6' }}
            startAddOn='$'
            endAddOn='USD'
            placeholder='100-200'
          />
        </div>
        <div className='grid items-center'>
          <SelectControl
            label='Status'
            control={control}
            name='status'
            options={STATUSES}
            placeholder='Select the response status'
          />
        </div>
        <div className='grid items-center'>
          <TextareaControl control={control} label='Note' name='note' />
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
      <DialogContent className='w-full max-w-[30rem]'>
        <DialogHeader>
          <DialogTitle>Create new response</DialogTitle>
          <DialogDescription>
            Use this form to log and track your response to any job opportunity
          </DialogDescription>
        </DialogHeader>
        <Form
          props={{
            resolver: zodResolver(validationSchema)
          }}
          onSubmit={handleSubmit}
        >
          <DialogFooter className='mt-5'>
            <Button variant='secondary' type='button' onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button disabled={mutationCreate.isPending} type='submit' className='max-sm:mb-3'>
              {mutationCreate.isPending ? (
                <div className='ml-2 flex items-center gap-2'>
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
      <DialogContent className='w-full max-w-[30rem]'>
        <DialogHeader>
          <DialogTitle>Edit response</DialogTitle>
          <DialogDescription>Make any necessary changes to your response</DialogDescription>
        </DialogHeader>
        <Form
          props={{
            resolver: zodResolver(validationSchema),
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
          <DialogFooter className='mt-5'>
            <Button variant='secondary' type='button' onClick={onClose}>
              Cancel
            </Button>
            <Button disabled={mutationUpdate.isPending} type='submit' className='max-sm:mb-3'>
              {mutationUpdate.isPending ? (
                <div className='flex items-center gap-2'>
                  <Icons.spinner className='size-4 animate-spin' />
                  <span>Loading...</span>
                </div>
              ) : (
                'Save changes'
              )}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
