'use client';

import { useState } from 'react';

import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '../ui/table';
import { BoardMoreAction } from './more-action';
import { TableNotFound } from './not-found';
import { StatusBadge } from './status-badge';

import { Vacancy } from '@/types';

interface BoardTableProps {
  vacancies: Vacancy[];
}

export const BoardTable = ({ vacancies }: BoardTableProps) => {
  const [selectedId, setSelectedId] = useState<string>('');

  const handleRowClick = (id: string) => setSelectedId(id);

  return (
    <Table className='table-auto overflow-x-auto max-sm:text-xs'>
      <TableHeader>
        <TableRow>
          <TableHead className='min-w-[5rem] py-1'>Company</TableHead>
          <TableHead className='min-w-[10rem] py-1'>Position</TableHead>
          <TableHead className='min-w-[6rem] py-1'>Salary</TableHead>
          <TableHead className='min-w-[6rem] py-1'>Status</TableHead>
          <TableHead className='min-w-[20rem] py-1'>Note</TableHead>
          <TableHead className='min-w-[3rem] py-1'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className='min-h-96'>
        {!vacancies || vacancies?.length !== 0 ? (
          vacancies?.map(({ _id, company, position, salaryFork, status, note }: Vacancy) => (
            <TableRow key={_id} onClick={() => handleRowClick(_id)}>
              <TableCell>{company}</TableCell>
              <TableCell>{position}</TableCell>
              <TableCell>${salaryFork}</TableCell>
              <TableCell>
                <StatusBadge status={status} />
              </TableCell>
              <TableCell>{note}</TableCell>
              <BoardMoreAction id={selectedId} onRowSelect={handleRowClick} />
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className='h-96 text-center'>
              <TableNotFound />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
