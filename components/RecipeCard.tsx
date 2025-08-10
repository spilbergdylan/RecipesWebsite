import React from 'react';
import Link from 'next/link';

export default function RecipeCard({ recipe }: { recipe: any }) {
  return (
    <Link href={`/recipes/${recipe.id}`} className="group block relative aspect-square">
      {/* Cast shadow under the plate for 3D depth */}
      <div className="plate-shadow absolute bottom-3 left-1/2 -translate-x-1/2 w-3/4 h-6 bg-black/20 rounded-full blur-md md:blur-lg z-0" aria-hidden="true" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/plate.png" alt="Plate" className="plate-img plate-shine absolute inset-0 h-full w-full object-contain z-10" aria-hidden="true" />
      <div className="absolute inset-0 p-3 md:p-4 flex items-center justify-center text-center z-20">
        <div className="max-w-[70%] md:max-w-[60%] mx-auto plate-text plate-text-shine">
          <div className="text-base md:text-lg font-semibold text-black" style={{ fontFamily: 'var(--font-caveat)' }}>{recipe.title}</div>
        </div>
      </div>
    </Link>
  );
} 