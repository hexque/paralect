'use client';

import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '../ui/table';
import { BoardMoreAction } from './more-action';
import { Spinner } from '../ui/spinner';

import { useVacancies } from '@/lib/queries';

import { Vacancy } from '@/types';

export const BoardTable = () => {
  const { vacancies, isLoading } = useVacancies();

  if (isLoading) {
    <Spinner variant='screen' />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[150px]'>Company</TableHead>
          <TableHead className='w-[300px]'>Vacancy</TableHead>
          <TableHead className='w-[150px]'>Salary fork</TableHead>
          <TableHead className='w-[150px]'>Status</TableHead>
          <TableHead className='w-[300px]'>Note</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vacancies?.data?.data.map((vacancy: Vacancy) => (
          <TableRow key={vacancy._id}>
            <TableCell className='font-medium'>{vacancy.company}</TableCell>
            <TableCell>{vacancy.position}</TableCell>
            <TableCell className='font-medium'>{vacancy.salaryFork}</TableCell>
            <TableCell>{vacancy.status}</TableCell>
            <TableCell>{vacancy.note}</TableCell>
            <BoardMoreAction />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
