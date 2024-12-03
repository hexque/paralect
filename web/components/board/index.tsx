import { Button } from '../ui/button';
import { Icons } from '../ui/icons';
import { CreateBoardForm } from './form';
import { BoardTable } from './table';

export function Board() {
  return (
    <div>
      <div className='mb-4 flex items-center justify-between'>
        <h3>Welcome!</h3>
        <CreateBoardForm>
          <Button variant='outline'>
            <Icons.plus />
            Add response
          </Button>
        </CreateBoardForm>
      </div>
      <BoardTable />
    </div>
  );
}
