import { prisma } from '@/lib/db';
import RecipeCard from '@/components/RecipeCard';
import AddRecipeModal from '@/components/AddRecipeModal';
import { slugToDisplay, parseStringArray } from '@/lib/utils';
import Link from 'next/link';
import ThemePicker from '@/components/ThemePicker';

export const dynamic = 'force-dynamic';

export default async function FamilyPage({ params, searchParams }: { params: { family: string }; searchParams: { q?: string } }) {
  const familySlug = params.family;
  const family = await prisma.family.findUnique({ where: { slug: familySlug } });
  if (!family) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold">Family not found</h2>
        <Link href="/" className="btn btn-link">Back home</Link>
      </div>
    );
  }

  const q = (searchParams.q ?? '').toString().toLowerCase();

  const recipes = await prisma.recipe.findMany({ where: { familyId: family.id }, orderBy: { createdAt: 'desc' } });
  const filtered = recipes.filter((r: (typeof recipes)[number]) => {
    const ingredients = parseStringArray(r.ingredients as any);
    const matchesQ = q ? r.title.toLowerCase().includes(q) || ingredients.some((i) => i.toLowerCase().includes(q)) : true;
    return matchesQ;
  });

  return (
    <div className="flex items-stretch md:items-center justify-center py-6 md:py-10 min-h-dvh">
      <div className="w-full max-w-6xl">
        <div
          className="relative mx-auto my-2 md:my-4 mx-6 md:mx-12 rounded-[3rem] overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.35)] ring-1 ring-black/5 h-[calc(100dvh-2rem)] md:h-auto md:max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-y-contain scroll-smooth [-webkit-overflow-scrolling:touch] before:content-[''] before:absolute before:inset-4 before:rounded-[2.5rem] before:ring-1 before:ring-white/70 before:shadow-inner before:pointer-events-none after:content-[''] after:absolute after:inset-8 after:rounded-[2rem] after:ring-1 after:ring-white/50 after:pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at center, rgba(255,255,255,0.98) 0%, rgba(247,247,247,0.98) 55%, rgba(236,236,236,0.98) 100%)'
          }}
        >
          <div className="absolute top-8 right-12 md:top-12 md:right-16 z-30"><ThemePicker size="sm" /></div>
          <div className="relative z-10 px-12 md:px-24 pt-8 md:pt-12 pb-8 md:pb-12">
            <div className="space-y-6 md:space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 md:gap-4">
                <div className="space-y-1">
                  <h2 className={`text-2xl md:text-3xl font-bold text-primary ${familySlug === 'spilbergs' ? 'glossy-text' : ''}`}>{slugToDisplay(familySlug)}</h2>
                  <p className="text-neutral/70 text-sm md:text-base">A collection of our family favorites.</p>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <Link href="/" className="btn btn-secondary btn-3d btn-sm md:btn-md" aria-label="Back to Home">← Back to Home</Link>
                  <AddRecipeModal familySlug={familySlug} />
                </div>
              </div>

              <form className="bg-base-100/80 backdrop-blur-sm ring-1 ring-black/5 p-3 md:p-4 rounded-2xl shadow-sm grid md:grid-cols-[1fr_auto] gap-3 md:gap-4 sticky top-2 md:top-4 z-20">
                <input
                  type="text"
                  name="q"
                  defaultValue={q}
                  placeholder="Search by title or ingredient..."
                  className="input input-bordered w-full input-sm md:input-md"
                  aria-label="Search recipes"
                />
                <button className="btn btn-primary btn-3d btn-sm md:btn-md" type="submit">Search</button>
              </form>

              {filtered.length === 0 ? (
                <div className="text-center py-16 md:py-20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="Empty" src="/placeholder.svg" className="mx-auto w-32 md:w-40 opacity-60" />
                  <p className="mt-4 text-neutral/70 text-sm md:text-base">No recipes yet—be the first to add one!</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 pb-6 md:pb-8">
                  {filtered.map((r: (typeof recipes)[number]) => (
                    <RecipeCard key={r.id} recipe={r as any} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 