'use client';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full rounded-2xl bg-base-100 shadow p-6 text-center space-y-3">
          <h2 className="text-xl font-semibold text-error">Something went wrong</h2>
          {error?.message ? <p className="text-sm opacity-80 break-words">{error.message}</p> : null}
          <button className="btn btn-primary btn-3d" onClick={() => reset()}>Try again</button>
        </div>
      </body>
    </html>
  );
} 