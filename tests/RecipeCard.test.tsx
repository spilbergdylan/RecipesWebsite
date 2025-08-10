import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import RecipeCard from '@/components/RecipeCard';

const baseRecipe = {
  id: 1,
  familyId: 1,
  title: 'Test',
  description: 'Desc',
  imageUrl: null,
  tags: [],
  ingredients: [],
  instructions: '',
  createdAt: new Date(),
  updatedAt: new Date()
} as any;

vi.mock('next/image', () => ({
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={props.alt} src={props.src} />;
  }
}));

afterEach(() => cleanup());

describe('RecipeCard', () => {
  it('renders placeholder when no image', () => {
    render(<RecipeCard recipe={baseRecipe} />);
    expect(screen.getByAltText('Test')).toHaveAttribute('src', '/placeholder.svg');
  });
  it('renders image when imageUrl present', () => {
    render(<RecipeCard recipe={{ ...baseRecipe, imageUrl: '/uploads/x.jpg' }} />);
    const imgs = screen.getAllByAltText('Test');
    expect(imgs[0]).toHaveAttribute('src', '/uploads/x.jpg');
  });
}); 