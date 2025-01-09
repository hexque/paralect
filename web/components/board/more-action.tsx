'use client';

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
import { EditBoardForm } from './form';

import { useVacancy } from '@/lib/queries';

import { useModalManager } from '@/hooks/use-modal';

type BoardMoreActionProps = {
  id: string;
  onRowSelect: (id: string) => void;
};

export const BoardMoreAction = ({ id, onRowSelect }: BoardMoreActionProps) => {
  const { vacancy } = useVacancy(id);

  const { isOpenModals, hideModal, showModal } = useModalManager();

  const handleClose = (modalName: string) => hideModal(modalName);

  const actions = [
    { icons: <Icons.bolt />, label: 'Update', onClick: () => showModal('dialog') },
    { icons: <Icons.deleteX />, label: 'Delete', onClick: () => showModal('alertDialog') }
  ];

  return (
    <TableCell className='text-center'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='link' size='icon' onClick={() => onRowSelect(id)}>
            <Icons.more />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-20' side='right'>
          <DropdownMenuGroup>
            {actions.map(({ label, icons, onClick }) => (
              <DropdownMenuItem key={label} onSelect={onClick}>
                {icons}
                <span>{label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Icons.undo />
            Undo
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {vacancy && (
        <>
          <BoardAlertDialog
            id={id}
            isOpen={isOpenModals.includes('alertDialog')}
            onClose={() => handleClose('alertDialog')}
          />
          <EditBoardForm
            id={id}
            vacancy={vacancy}
            isOpen={isOpenModals.includes('dialog')}
            onClose={() => handleClose('dialog')}
          />
        </>
      )}
    </TableCell>
  );
};
