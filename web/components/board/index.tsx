'use client';

import { Button } from '../ui/button';
import { Icons } from '../ui/icons';
import { CreateBoardForm } from './form';
import { BoardTable } from './table';
import { Spinner } from '../shared/spinner';

import { useVacancies } from '@/lib/queries';

export function Board() {
  const { vacancies, isLoading } = useVacancies();

  if (isLoading) return <Spinner variant='screen' />;

  const allVacancies = vacancies?.data?.data;

  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 sm:p-20'>
      <div className='row-start-2 flex flex-col items-center gap-8 rounded-lg border-2 border-zinc-900 bg-zinc-900 p-4 sm:items-start'>
        <div className='mb-4 flex w-full items-center justify-between'>
          <h3>All vacancy responses</h3>
          <CreateBoardForm>
            <Button variant='outline' size='icon'>
              <Icons.plus />
            </Button>
          </CreateBoardForm>
        </div>
        <BoardTable vacancies={allVacancies} />
      </div>
    </div>
  );
}
