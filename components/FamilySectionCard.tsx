'use client';
import Link from 'next/link';

export default function FamilySectionCard({ slug, title, imageSrc }: { slug: string; title: string; imageSrc?: string }) {
  const resolvedSrc = imageSrc ?? '/notebook.png';
  const useContain = slug === 'spilbergs' || slug === 'brookes' || slug === 'kahanes' || slug === 'nona-saba';
  const imgClass = useContain
    ? 'absolute inset-0 h-full w-full object-contain object-center transition-transform duration-500 ease-out group-hover:scale-[1.2] group-hover:brightness-110 group-hover:saturate-125'
    : 'absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.2] group-hover:brightness-110 group-hover:saturate-125 will-change-transform';

  return (
    <Link
      href={`/${slug}`}
      className={`group relative block h-72 md:h-80 xl:h-96`}
      aria-label={`${title} Recipe Book`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={resolvedSrc}
        alt=""
        aria-hidden="true"
        className={imgClass}
      />
    </Link>
  );
} 