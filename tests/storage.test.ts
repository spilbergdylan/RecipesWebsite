import { describe, it, expect } from 'vitest';
import { validateFile } from '@/lib/storage';

describe('storage.validateFile', () => {
  it('accepts valid type and size', () => {
    expect(() => validateFile('image/png', 1000)).not.toThrow();
  });
  it('rejects large file', () => {
    expect(() => validateFile('image/png', 6 * 1024 * 1024)).toThrow();
  });
  it('rejects invalid type', () => {
    expect(() => validateFile('application/pdf', 1000)).toThrow();
  });
}); 