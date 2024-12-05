import { Board } from '@/components/board';

export default function Home() {
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 sm:p-20'>
      <main className='row-start-2 flex flex-col items-center gap-8 rounded-lg border-2 border-zinc-900 bg-zinc-900 p-4 sm:items-start'>
        <Board />
      </main>
    </div>
  );
}
