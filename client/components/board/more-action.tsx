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

export const BoardMoreAction = () => (
  <TableCell className='text-center'>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <Icons.more />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-20' side='right'>
        <DropdownMenuGroup>
          <DropdownMenuItem>Update</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Undo</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </TableCell>
);
