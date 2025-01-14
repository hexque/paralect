'use client';

import { useRef } from 'react';

import { Input } from '@/components/ui/input';
import { Icons } from '@/components/ui/icons';

type SearchProps = {
  searchQuery: string;
  placeholder?: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

export const Search = ({ searchQuery, placeholder = 'Search', setSearchQuery }: SearchProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClearInput = () => {
    setSearchQuery('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  return (
    <div className='mr-3 space-y-2'>
      <div className='relative'>
        <Input
          className='peer pe-9 ps-9 max-md:text-xs'
          placeholder={placeholder}
          type='text'
          ref={inputRef}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50'>
          <Icons.search size={16} strokeWidth={2} />
        </div>
        {searchQuery && (
          <button
            className='absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
            aria-label='Clear input'
            onClick={handleClearInput}
          >
            <Icons.circleX size={16} strokeWidth={2} aria-hidden='true' />
          </button>
        )}
      </div>
    </div>
  );
};
