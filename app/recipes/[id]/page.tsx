import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { formatDate, parseStringArray } from '@/lib/utils';
import IngredientsChecklist from '@/components/IngredientsChecklist';
import Memories from '@/components/Memories';
import Link from 'next/link';
import { ChangeImageButton, EditRecipeButton, DeleteRecipeButton } from '@/components/RecipeActions';

export const dynamic = 'force-dynamic';

export default async function RecipeDetail({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!Number.isFinite(id)) return notFound();

  const recipe = await prisma.recipe.findUnique({ where: { id }, include: { family: true, memories: { orderBy: { createdAt: 'desc' } } } });
  if (!recipe) return notFound();

  const ingredients = parseStringArray((recipe as any).ingredients);

  return (
    <div className="flex items-center justify-center py-4">
      <div className="w-full max-w-5xl">
        <div
          className="relative mx-auto m-2 rounded-[3rem] overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.35)] ring-1 ring-black/5 max-h-[calc(100vh-2rem)] overflow-auto before:content-[''] before:absolute before:inset-4 before:rounded-[2.5rem] before:ring-1 before:ring-white/70 before:shadow-inner before:pointer-events-none after:content-[''] after:absolute after:inset-8 after:rounded-[2rem] after:ring-1 after:ring-white/50 after:pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at center, rgba(255,255,255,0.98) 0%, rgba(247,247,247,0.98) 55%, rgba(236,236,236,0.98) 100%)'
          }}
        >
          <div className="relative z-10 p-5 md:p-8 space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-caveat)' }}>{recipe.title}</h1>
                <p className="text-neutral/70">Added on {formatDate(recipe.createdAt)} · <Link href={`/${recipe.family.slug}`} className="link">Back to {recipe.family.displayName}</Link></p>
              </div>
              <ChangeImageButton recipeId={recipe.id} />
            </div>

            <div className="w-full aspect-[16/9] relative rounded-2xl overflow-hidden shadow card-hover">
              <Image src={recipe.imageUrl || '/placeholder.svg'} alt={recipe.title} fill className="object-cover" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-base-200 p-4 rounded-2xl shadow-sm">
                <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
                <IngredientsChecklist items={ingredients} />
              </div>
              <div className="bg-base-200 p-4 rounded-2xl shadow-sm">
                <h2 className="text-xl font-semibold mb-2">Instructions</h2>
                <div className="prose max-w-none whitespace-pre-wrap">{recipe.instructions}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <EditRecipeButton id={recipe.id} />
              <DeleteRecipeButton id={recipe.id} familySlug={recipe.family.slug} />
            </div>

            <Memories recipeId={recipe.id} initialMemories={recipe.memories as any[]} />
          </div>
        </div>
      </div>
    </div>
  );
} 