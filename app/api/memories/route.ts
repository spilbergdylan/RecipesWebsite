import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { MemoryCreateSchema } from '@/lib/validation';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const parsed = MemoryCreateSchema.safeParse(data);
  if (!parsed.success) return new Response(JSON.stringify(parsed.error.flatten()), { status: 400 });
  const memory = await prisma.memory.create({ data: parsed.data });
  const recipe = await prisma.recipe.findUnique({ where: { id: memory.recipeId }, include: { family: true } });
  if (recipe) {
    revalidatePath(`/recipes/${recipe.id}`);
  }
  return Response.json({ memory });
} 