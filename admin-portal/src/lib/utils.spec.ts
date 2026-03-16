import { describe, it, expect } from 'vitest';
import { cn, formatCurrency } from './utils';

describe('utils', () => {
  describe('cn', () => {
    it('should merge tailwind classes correctly', () => {
      expect(cn('px-2', 'py-2')).toBe('px-2 py-2');
      expect(cn('px-2', { 'py-2': true, 'bg-red-500': false })).toBe('px-2 py-2');
      expect(cn('p-4 p-2')).toBe('p-2'); // tailwind-merge in action
    });
  });

  describe('formatCurrency', () => {
    it('should format numbers to IDR currency string', () => {
      // Note: Intl.NumberFormat might use different space characters (like non-breaking space) 
      // depending on environment, so we check if it contains the currency code and the number.
      const result = formatCurrency(50000);
      expect(result).toMatch(/Rp/);
      expect(result).toMatch(/50\.000/);
    });

    it('should handle zero correctly', () => {
      const result = formatCurrency(0);
      expect(result).toMatch(/Rp/);
      expect(result).toMatch(/0/);
    });
  });
});
