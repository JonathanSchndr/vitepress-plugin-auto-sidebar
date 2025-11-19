import { describe, it, expect } from 'vitest';
import { getSidebar } from '../index';

describe('getSidebar', () => {
  it('should return empty array for non-existent directory', () => {
    const result = getSidebar({
      contentRoot: '/non-existent-path-12345',
      contentDirs: ['/'],
    });
    expect(result).toEqual([]);
  });

  it('should use default options when none provided', () => {
    const result = getSidebar({
      contentRoot: '/non-existent-path',
    });
    expect(result).toEqual([]);
  });
});
