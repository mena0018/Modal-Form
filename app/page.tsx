import Link from 'next/link';
import { routes } from '@/lib/routes';

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-screen-lg p-8">
      <Link href={routes.users()} className="text-xl underline">
        View Users
      </Link>
    </main>
  );
}
