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
    <div className='flex justify-center p-20'>
      <div className='row-start-2 flex flex-col items-center gap-8 rounded-lg border-2 border-zinc-900 bg-zinc-900 p-4 sm:items-start'>
        <div className='mb-4 flex w-full items-center justify-between'>
          <h3>All vacancy responses</h3>
          <div className='flex'>
            <BoardSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <CreateBoardForm>
              <Button variant='outline' size='icon'>
                <Icons.plus />
              </Button>
            </CreateBoardForm>
          </div>
        </div>
        <BoardTable vacancies={foundVacancies} />
      </div>
    </div>
  );
}
