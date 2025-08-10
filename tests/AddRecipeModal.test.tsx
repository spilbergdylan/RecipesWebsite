import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddRecipeModal from '@/components/AddRecipeModal';

vi.stubGlobal('fetch', vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
  const url = String(input);
  if (url.endsWith('/api/recipes')) {
    return new Response(JSON.stringify({ recipe: { id: 1 } }), { status: 200 });
  }
  if (url.includes('/api/upload')) {
    return new Response(JSON.stringify({ url: '/uploads/test.jpg' }), { status: 200 });
  }
  if (url.includes('/api/recipes/')) {
    return new Response(JSON.stringify({ recipe: { id: 1 } }), { status: 200 });
  }
  return new Response('{}', { status: 200 });
}) as any);

vi.mock('next/navigation', async () => {
  return { useRouter: () => ({ refresh: vi.fn() }) };
});

describe('AddRecipeModal', () => {
  it('opens modal and shows validation error on empty submit', async () => {
    render(<AddRecipeModal familySlug="spilbergs" />);
    fireEvent.click(screen.getByText('+ Add a Recipe'));
    fireEvent.click(screen.getByText('Save'));
    await waitFor(() => {
      const msgs = screen.getAllByText(/Title is required|Short description is required|At least one ingredient|Instructions are required/);
      expect(msgs.length).toBeGreaterThan(0);
    });
  });
}); 