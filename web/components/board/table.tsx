'use client';

import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '../ui/table';
import { BoardMoreAction } from './more-action';
import { StatusBadge } from './status-badge';

import { useVacancies } from '@/lib/queries';

import { Vacancy } from '@/types';

export const BoardTable = () => {
  const { vacancies, isLoading } = useVacancies();

  if (isLoading) return 'Loading...';

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[150px]'>Company</TableHead>
          <TableHead className='w-[300px]'>Vacancy</TableHead>
          <TableHead className='w-[150px]'>Salary fork</TableHead>
          <TableHead className='w-[100px]'>Status</TableHead>
          <TableHead className='w-[300px]'>Note</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vacancies?.data?.data.map(
          ({ _id, company, position, salaryFork, status, note }: Vacancy) => (
            <TableRow key={_id}>
              <TableCell className='font-medium'>{company}</TableCell>
              <TableCell>{position}</TableCell>
              <TableCell className='font-medium'>{salaryFork}</TableCell>
              <TableCell>
                <StatusBadge status={status} />
              </TableCell>
              <TableCell>{note}</TableCell>
              <BoardMoreAction id={_id} />
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
};
