import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-screen-lg p-8">
      <Link href="/users" className="text-xl underline">
        View Users
      </Link>
    </main>
  );
}
