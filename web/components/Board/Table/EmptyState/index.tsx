import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { CreateBoardForm } from '@/components/Board/Form';

export const TableEmptyState = () => {
  const handleRefresh = () => window.location.reload();

  return (
    <div>
      <h2>There&apos;s no data 😢</h2>
      <h2 className='mb-4 mt-1'>Add responses to the table or try the query again.</h2>
      <CreateBoardForm>
        <Button variant='outline' className='mr-2'>
          <Icons.plus />
          Add response
        </Button>
      </CreateBoardForm>
      <Button onClick={handleRefresh}>Can we try again?</Button>
    </div>
  );
};
