import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <section className='mx-auto flex h-screen max-w-screen-xl flex-col justify-center px-4 py-8 lg:px-6 lg:py-16'>
      <div className='mx-auto max-w-screen-sm text-center'>
        <h1 className='text-primary-600 mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl'>
          404
        </h1>
        <p className='mb-4 text-lg font-light text-gray-500'>
          Sorry, we can&apos;t find that page. You&apos;ll find lots to explore on the home page.{' '}
        </p>
        <Link href='/' passHref>
          <Button>Back to Home</Button>
        </Link>
      </div>
    </section>
  );
}
