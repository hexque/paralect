import { Button } from '../ui/button';
import { Icons } from '../ui/icons';
import { CreateBoardForm } from './form';
import { BoardTable } from './table';

export function Board() {
  return (
    <div>
      <div>
        <h3>Welcome!</h3>
        <CreateBoardForm>
          <Button variant='outline'>
            <Icons.plus />
            Add feedback
          </Button>
        </CreateBoardForm>
      </div>
      <BoardTable />
    </div>
  );
}
