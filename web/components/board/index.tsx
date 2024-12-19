'use client';

import { useState } from 'react';

import { Button } from '../ui/button';
import { Icons } from '../ui/icons';
import { CreateBoardForm } from './form';
import { BoardTable } from './table';
import { BoardSearch } from './search';
import { Spinner } from '../shared/spinner';

import { useVacancies } from '@/lib/queries';

import { Vacancy } from '@/types';
export function Board() {
  const { vacancies, isLoading } = useVacancies();

  const [searchQuery, setSearchQuery] = useState<string>('');

  if (isLoading) return <Spinner variant='screen' />;

  const foundVacancies = vacancies.filter((vacancy: Vacancy) =>
    vacancy.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='flex flex-col justify-center px-36 py-20 max-xl:p-10 max-lg:p-8 max-md:p-8 max-sm:p-2'>
      <div className='mb-4 flex items-center justify-between rounded-md bg-zinc-900 px-4 py-3 max-sm:flex-col max-sm:items-start'>
        <h3 className='max-sm:mb-3 max-sm:hidden'>JooBoard</h3>
        <div className='flex max-sm:w-full max-sm:justify-between'>
          <BoardSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <CreateBoardForm>
            <Button
              size='icon'
              variant='link'
              className='border-x border-y hover:border-yellow-700'
            >
              <Icons.plus />
            </Button>
          </CreateBoardForm>
        </div>
      </div>
      <div className='rounded-md bg-zinc-900 px-4 py-6'>
        <BoardTable vacancies={foundVacancies} />
      </div>
    </div>
  );
}
