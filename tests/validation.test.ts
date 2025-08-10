import { describe, it, expect } from 'vitest';
import { RecipeCreateSchema, MemoryCreateSchema } from '@/lib/validation';

describe('validation', () => {
  it('validates recipe create', () => {
    const res = RecipeCreateSchema.safeParse({
      familySlug: 'spilbergs',
      title: 'T',
      description: 'D',
      tags: ['dessert'],
      ingredients: ['A'],
      instructions: 'Mix.'
    });
    expect(res.success).toBe(true);
  });

  it('fails without title', () => {
    const res = RecipeCreateSchema.safeParse({
      familySlug: 'spilbergs',
      title: '',
      description: 'D',
      tags: [],
      ingredients: ['A'],
      instructions: 'Mix.'
    });
    expect(res.success).toBe(false);
  });

  it('validates memory', () => {
    const res = MemoryCreateSchema.safeParse({ recipeId: 1, text: 'Hello' });
    expect(res.success).toBe(true);
  });
}); 