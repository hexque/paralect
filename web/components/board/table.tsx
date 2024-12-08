'use client';

import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '../ui/table';
import { BoardMoreAction } from './more-action';
import { TableNotFound } from './not-found';
import { StatusBadge } from './status-badge';

import { Vacancy } from '@/types';

export const BoardTable = ({ vacancies }: { vacancies: Vacancy[] }) => (
  <Table className='w-[60rem] table-auto'>
    <TableHeader>
      <TableRow>
        <TableHead className='w-[8rem] py-1'>Company</TableHead>
        <TableHead className='w-[15rem] py-1'>Position</TableHead>
        <TableHead className='w-[8rem] py-1'>Salary fork</TableHead>
        <TableHead className='w-[4rem] py-1'>Status</TableHead>
        <TableHead className='w-[20rem] py-1'>Note</TableHead>
        <TableHead className='w-[4rem] py-1'>Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody className='min-h-96'>
      {!vacancies || vacancies?.length !== 0 ? (
        vacancies?.map(({ _id, company, position, salaryFork, status, note }: Vacancy) => (
          <TableRow key={_id}>
            <TableCell>{company}</TableCell>
            <TableCell>{position}</TableCell>
            <TableCell>{salaryFork}</TableCell>
            <TableCell>
              <StatusBadge status={status} />
            </TableCell>
            <TableCell>{note}</TableCell>
            <BoardMoreAction id={_id} />
          </TableRow>
        ))
      ) : (
        <TableCell colSpan={6} className='h-96 text-center'>
          <TableNotFound />
        </TableCell>
      )}
    </TableBody>
  </Table>
);
