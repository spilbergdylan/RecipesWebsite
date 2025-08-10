import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { RecipeCreateSchema } from '@/lib/validation';
import { revalidatePath } from 'next/cache';
import { parseStringArray } from '@/lib/utils';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const family = searchParams.get('family') || undefined;
  const q = (searchParams.get('q') || '').toLowerCase();

  let familyWhere = {} as any;
  if (family) {
    const f = await prisma.family.findUnique({ where: { slug: family } });
    if (!f) return Response.json({ recipes: [] });
    familyWhere = { familyId: f.id };
  }
  const recipes = await prisma.recipe.findMany({ where: { ...familyWhere }, orderBy: { createdAt: 'desc' } });
  const filtered = recipes.filter((r) => {
    const ing = parseStringArray(r.ingredients as any);
    const matchesQ = q ? r.title.toLowerCase().includes(q) || ing.some((i) => i.toLowerCase().includes(q)) : true;
    return matchesQ;
  });
  return Response.json({ recipes: filtered });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const parsed = RecipeCreateSchema.safeParse(data);
  if (!parsed.success) return new Response(JSON.stringify(parsed.error.flatten()), { status: 400 });
  const input = parsed.data;
  const family = await prisma.family.findUnique({ where: { slug: input.familySlug } });
  if (!family) return new Response(JSON.stringify({ error: 'Family not found' }), { status: 404 });

  const recipe = await prisma.recipe.create({
    data: {
      familyId: family.id,
      title: input.title,
      description: input.description,
      imageUrl: null,
      tags: JSON.stringify(input.tags),
      ingredients: JSON.stringify(input.ingredients),
      instructions: input.instructions
    }
  });

  revalidatePath(`/${input.familySlug}`);
  return Response.json({ recipe });
} 