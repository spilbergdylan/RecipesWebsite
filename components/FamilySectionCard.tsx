'use client';
import Link from 'next/link';

export default function FamilySectionCard({ slug, title, imageSrc }: { slug: string; title: string; imageSrc?: string }) {
  const resolvedSrc = imageSrc ?? '/notebook.png';
  const useContain = slug === 'spilbergs' || slug === 'brookes' || slug === 'kahanes' || slug === 'nona-saba';
  const baseFit = useContain ? 'object-contain' : 'object-cover';
  const imgClass = `absolute inset-0 h-full w-full ${baseFit} object-center transition-transform duration-500 ease-out will-change-transform md:group-hover:scale-[1.08] lg:group-hover:scale-[1.18] md:group-hover:brightness-110 md:group-hover:saturate-110`;

  return (
    <Link
      href={`/${slug}`}
      className={`group relative block h-36 xs:h-40 sm:h-48 md:h-72 xl:h-96`}
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