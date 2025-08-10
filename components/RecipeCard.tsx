import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function RecipeCard({ recipe }: { recipe: any }) {
  return (
    <Link href={`/recipes/${recipe.id}`} className="block rounded-2xl overflow-hidden shadow bg-base-200 card-hover">
      <div className="relative aspect-[4/3]">
        <Image src={recipe.imageUrl || '/placeholder.svg'} alt={recipe.title} fill className="object-cover" />
      </div>
      <div className="p-4">
        <div className="text-lg font-semibold" style={{ fontFamily: 'var(--font-caveat)' }}>{recipe.title}</div>
        <p className="text-sm text-neutral/70 line-clamp-2">{recipe.description}</p>
      </div>
    </Link>
  );
} 