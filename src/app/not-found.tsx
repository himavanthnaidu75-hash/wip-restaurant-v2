import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-28 text-center md:px-8">
      <div className="mx-auto max-w-xl">
        <p
          className="text-8xl font-semibold tracking-tighter md:text-9xl"
          style={{ color: '#c84b31' }}
        >
          404
        </p>
        <h1 className="mt-5 text-4xl font-semibold tracking-tighter md:text-5xl">
          Page Not Found
        </h1>
        <p
          className="mx-auto mt-5 max-w-md text-base leading-7"
          style={{ color: 'rgba(255,255,255,0.62)' }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-[#c84b31] px-8 py-4 text-sm font-semibold tracking-tight text-white transition-colors hover:bg-[#a63d27] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c84b31] focus-visible:ring-offset-2 focus-visible:ring-offset-[#5f452e]"
          aria-label="Return to the W.I.P Restaurant home page"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
