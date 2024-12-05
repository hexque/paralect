import React from 'react';

import { Badge } from '../ui/badge';

import { STATUS_COLOR } from '@/lib/constants';
import { cn } from '@/lib/utils';

type TableCellStatusProps = {
  status: 'Applied' | 'Invitation' | 'Rejected' | 'Archived';
};

export const StatusBadge = ({ status }: TableCellStatusProps) => {
  const { circle, text } = STATUS_COLOR[status];

  return (
    <Badge variant='secondary' className='flex items-center rounded-lg py-2'>
      <div className={cn('mr-2 h-2 w-2 rounded-full', circle)} />
      <span className={text}>{status}</span>
    </Badge>
  );
};
