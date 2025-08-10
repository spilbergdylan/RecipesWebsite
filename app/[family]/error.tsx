'use client';

export default function FamilyError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="min-h-[40vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full rounded-2xl bg-base-100 shadow p-6 text-center space-y-3">
        <h2 className="text-xl font-semibold text-error">Couldn’t load this family</h2>
        {error?.message ? <p className="text-sm opacity-80 break-words">{error.message}</p> : null}
        <div className="flex gap-2 justify-center">
          <button className="btn btn-primary btn-3d" onClick={() => reset()}>Try again</button>
          <a href="/" className="btn btn-3d">Back Home</a>
        </div>
      </div>
    </div>
  );
} 