import { describe, it, expect, afterEach, vi } from 'vitest';
import { createSoup } from './soupGen';

const off = { seafoodMode: false, veggieMode: false, bizarroMode: false };

// "You should make \n\n<Person>'s <Adjective> <a, b, c> soup with <topping> on top!"
const SOUP_PATTERN = /^You should make \n\n(.+)'s (\w+) (.+) soup with (.+) on top!$/;

const ingredientsOf = (soup: string): string[] => {
  const match = soup.match(SOUP_PATTERN);
  if (!match) throw new Error(`Unexpected soup format: ${soup}`);
  return match[3].split(', ');
};

describe('createSoup', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns a soup in the expected sentence format', () => {
    expect(createSoup(off)).toMatch(SOUP_PATTERN);
  });

  it('picks exactly one ingredient per category in normal mode', () => {
    for (let i = 0; i < 50; i++) {
      // protein, veggie, veggie2, legumes, carb, spice
      expect(ingredientsOf(createSoup(off))).toHaveLength(6);
    }
  });

  it('uses the first entry of each list when Math.random returns 0', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    expect(createSoup(off)).toBe(
      "You should make \n\nKramer's Hearty chicken, onions, green beans, black beans, rice, thyme soup with parmesan cheese on top!"
    );
  });

  it('uses seafood instead of meat in seafood mode', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const [protein] = ingredientsOf(createSoup({ ...off, seafoodMode: true }));
    expect(protein).toBe('lobster');
  });

  it('uses a vegetarian protein in veggie mode', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const [protein] = ingredientsOf(createSoup({ ...off, veggieMode: true }));
    expect(protein).toBe('tofu');
  });

  it('gives seafood mode priority when seafood and veggie are both on', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const [protein] = ingredientsOf(createSoup({ ...off, seafoodMode: true, veggieMode: true }));
    expect(protein).toBe('lobster');
  });

  it('never repeats an ingredient in bizarro mode', () => {
    for (let i = 0; i < 50; i++) {
      const ingredients = ingredientsOf(createSoup({ ...off, bizarroMode: true }));
      expect(ingredients.length).toBeGreaterThanOrEqual(6);
      // "fennel" appears in veggie and "fennel seeds" in spice, but no exact duplicates
      expect(new Set(ingredients).size).toBe(ingredients.length);
    }
  });
});
