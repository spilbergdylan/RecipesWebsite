import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { RecipeUpdateSchema } from '@/lib/validation';
import { revalidatePath } from 'next/cache';
import { parseStringArray } from '@/lib/utils';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const recipe = await prisma.recipe.findUnique({ where: { id } });
  if (!recipe) return new Response('Not found', { status: 404 });
  const result = {
    ...recipe,
    tags: parseStringArray(recipe.tags as any),
    ingredients: parseStringArray(recipe.ingredients as any)
  };
  return Response.json({ recipe: result });
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const data = await req.json();
  const parsed = RecipeUpdateSchema.safeParse(data);
  if (!parsed.success) return new Response(JSON.stringify(parsed.error.flatten()), { status: 400 });
  const input = parsed.data as any;
  const updateData: any = {};
  if (input.title !== undefined) updateData.title = input.title;
  if (input.description !== undefined) updateData.description = input.description;
  if (input.instructions !== undefined) updateData.instructions = input.instructions;
  if (input.imageUrl !== undefined) updateData.imageUrl = input.imageUrl || null;
  if (input.tags !== undefined) updateData.tags = JSON.stringify(input.tags);
  if (input.ingredients !== undefined) updateData.ingredients = JSON.stringify(input.ingredients);

  const recipe = await prisma.recipe.update({ where: { id }, data: updateData });
  const family = await prisma.family.findUnique({ where: { id: recipe.familyId } });
  if (family) revalidatePath(`/${family.slug}`);
  revalidatePath(`/recipes/${id}`);
  return Response.json({ recipe });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const recipe = await prisma.recipe.delete({ where: { id } });
  const family = await prisma.family.findUnique({ where: { id: recipe.familyId } });
  if (family) revalidatePath(`/${family.slug}`);
  return new Response(null, { status: 204 });
} 