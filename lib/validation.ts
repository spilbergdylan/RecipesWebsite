import { z } from 'zod';

export const TAG_OPTIONS = ['dessert', 'main', 'breakfast'] as const;

export const RecipeBaseSchema = z.object({
  familySlug: z.string().min(1, 'Family is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Short description is required'),
  tags: z.array(z.enum(TAG_OPTIONS)).optional().default([]),
  ingredients: z.array(z.string().min(1)).min(1, 'At least one ingredient'),
  instructions: z.string().min(1, 'Instructions are required')
});

export const RecipeCreateSchema = RecipeBaseSchema;

export const RecipeUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  tags: z.array(z.enum(TAG_OPTIONS)).optional(),
  ingredients: z.array(z.string().min(1)).optional(),
  instructions: z.string().min(1).optional(),
  imageUrl: z.string().url().or(z.literal('')).optional()
});

export const MemoryCreateSchema = z.object({
  recipeId: z.number().int().positive(),
  author: z.string().optional(),
  text: z.string().min(1)
});

export type RecipeCreateInput = z.infer<typeof RecipeCreateSchema>;
export type RecipeUpdateInput = z.infer<typeof RecipeUpdateSchema>;
export type MemoryCreateInput = z.infer<typeof MemoryCreateSchema>; 