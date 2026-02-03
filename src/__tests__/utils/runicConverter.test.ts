import { describe, it, expect } from 'vitest';
import { convertNumberToRune, splitNumberIntoDigits } from '../../utils/runicConverter';

describe('runicConverter', () => {
  describe('convertNumberToRune', () => {
    it('converts 1 to correct lines', () => {
      const result = convertNumberToRune(1);
      expect(result.number).toBe(1);
      expect(result.runicLineNumbers).toContain(10);
      expect(result.runicLineNumbers).toContain(13);
      expect(result.runicLineNumbers).toContain(16);
      expect(result.runicLineNumbers).toContain(2);
    });

    it('converts 1991 to all modifiers', () => {
      const result = convertNumberToRune(1991);
      expect(result.number).toBe(1991);
      expect(result.runicLineNumbers).toEqual(expect.arrayContaining([1, 2, 7, 8, 9, 17, 10, 13, 16]));
    });

    it('converts 4723 to correct lines', () => {
      const result = convertNumberToRune(4723);
      expect(result.number).toBe(4723);
      // 4723 = 4 (thousands: 23), 7 (hundreds: 8,17), 2 (tens: 3), 3 (units: 20) + base lines (10,13,16)
      expect(result.runicLineNumbers).toEqual(expect.arrayContaining([10, 13, 16, 23, 8, 17, 3, 20]));
    });

    it('always includes base lines (10, 13, 16)', () => {
      const result = convertNumberToRune(1);
      expect(result.runicLineNumbers).toContain(10);
      expect(result.runicLineNumbers).toContain(13);
      expect(result.runicLineNumbers).toContain(16);
    });

    it('converts single digit number correctly', () => {
      const result = convertNumberToRune(5);
      expect(result.number).toBe(5);
      expect(result.runicLineNumbers).toContain(10);
      expect(result.runicLineNumbers).toContain(13);
      expect(result.runicLineNumbers).toContain(16);
    });

    it('converts 9999 to correct lines', () => {
      const result = convertNumberToRune(9999);
      expect(result.number).toBe(9999);
      expect(result.runicLineNumbers.length).toBeGreaterThan(3);
      expect(result.runicLineNumbers).toContain(10);
      expect(result.runicLineNumbers).toContain(13);
      expect(result.runicLineNumbers).toContain(16);
    });

    it('converts 100 to correct lines', () => {
      const result = convertNumberToRune(100);
      expect(result.number).toBe(100);
      expect(result.runicLineNumbers).toContain(8);
      expect(result.runicLineNumbers).toContain(10);
      expect(result.runicLineNumbers).toContain(13);
      expect(result.runicLineNumbers).toContain(16);
    });

    it('converts 1000 to correct lines', () => {
      const result = convertNumberToRune(1000);
      expect(result.number).toBe(1000);
      expect(result.runicLineNumbers).toContain(7);
      expect(result.runicLineNumbers).toContain(10);
      expect(result.runicLineNumbers).toContain(13);
      expect(result.runicLineNumbers).toContain(16);
    });
  });

  describe('splitNumberIntoDigits', () => {
    it('splits 1991 into 4 digits', () => {
      const digits = splitNumberIntoDigits(1991);
      expect(digits).toEqual({
        thousands: 1,
        hundreds: 9,
        tens: 9,
        units: 1,
      });
    });

    it('splits 23 with null thousands/hundreds', () => {
      const digits = splitNumberIntoDigits(23);
      expect(digits.thousands).toBeNull();
      expect(digits.hundreds).toBeNull();
      expect(digits.tens).toEqual(2);
      expect(digits.units).toEqual(3);
    });

    it('splits single digit number', () => {
      const digits = splitNumberIntoDigits(7);
      expect(digits.thousands).toBeNull();
      expect(digits.hundreds).toBeNull();
      expect(digits.tens).toBeNull();
      expect(digits.units).toEqual(7);
    });

    it('splits 100 with null tens/units', () => {
      const digits = splitNumberIntoDigits(100);
      expect(digits.thousands).toBeNull();
      expect(digits.hundreds).toEqual(1);
      expect(digits.tens).toEqual(0);
      expect(digits.units).toEqual(0);
    });

    it('splits 1000 correctly', () => {
      const digits = splitNumberIntoDigits(1000);
      expect(digits.thousands).toEqual(1);
      expect(digits.hundreds).toEqual(0);
      expect(digits.tens).toEqual(0);
      expect(digits.units).toEqual(0);
    });

    it('splits 9999 correctly', () => {
      const digits = splitNumberIntoDigits(9999);
      expect(digits.thousands).toEqual(9);
      expect(digits.hundreds).toEqual(9);
      expect(digits.tens).toEqual(9);
      expect(digits.units).toEqual(9);
    });

    it('splits 5432 correctly', () => {
      const digits = splitNumberIntoDigits(5432);
      expect(digits).toEqual({
        thousands: 5,
        hundreds: 4,
        tens: 3,
        units: 2,
      });
    });
  });
});
