/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';

import { TableCell } from '../ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { Icons } from '../ui/icons';
import { BoardAlertDialog } from './alert-dialog';
import { BoardDialog } from './dialog';

export const BoardMoreAction = () => {
  const [dialog, setDialog] = useState({ dialog: false, alertDialog: false });

  const actions = [
    { label: 'Update', onClick: () => handleDialogToggle('dialog') },
    { label: 'Delete', onClick: () => handleDialogToggle('alertDialog') }
  ];

  const handleDialogToggle = (dialogName: string) => {
    setDialog((prev) => ({ ...prev, [dialogName]: !prev[dialogName] }));
  };

  const handleCloseDialog = (dialogName: string) => {
    setDialog((prev) => ({ ...prev, [dialogName]: false }));
  };

  return (
    <TableCell className='text-center'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='link' size='icon'>
            <Icons.more />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-20' side='right'>
          <DropdownMenuGroup>
            {actions.map((action, index) => (
              <DropdownMenuItem key={index} onSelect={action.onClick}>
                {action.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Undo</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <BoardAlertDialog
        isOpen={dialog.alertDialog}
        onClose={() => handleCloseDialog('alertDialog')}
      />
      <BoardDialog isOpen={dialog.dialog} onClose={() => handleCloseDialog('dialog')} />
    </TableCell>
  );
};
