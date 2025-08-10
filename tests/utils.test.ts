import { describe, it, expect } from 'vitest';
import { formatDate, slugToDisplay } from '@/lib/utils';

describe('utils', () => {
  it('formats date', () => {
    const str = formatDate(new Date('2020-01-02T00:00:00Z'));
    expect(str).toContain('2020');
  });
  it('slug display', () => {
    expect(slugToDisplay('spilbergs')).toBe('The Spilbergs');
  });
}); 