import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Soup from './Soup';

describe('<Soup />', () => {
  it('shows the generated soup', () => {
    render(<Soup generatedSoup="Newman's Zesty soup" onGenerateRecipe={() => {}} />);
    expect(screen.getByRole('heading', { name: "Newman's Zesty soup" })).toBeInTheDocument();
  });

  it('calls onGenerateRecipe when the button is clicked', () => {
    const onGenerateRecipe = vi.fn();
    render(<Soup generatedSoup="soup" onGenerateRecipe={onGenerateRecipe} />);

    fireEvent.click(screen.getByRole('button', { name: 'Generate Recipe' }));

    expect(onGenerateRecipe).toHaveBeenCalledTimes(1);
  });

  it('disables the button while a recipe is loading so it cannot fire duplicate requests', () => {
    const onGenerateRecipe = vi.fn();
    render(<Soup generatedSoup="soup" onGenerateRecipe={onGenerateRecipe} isLoading />);

    const button = screen.getByRole('button', { name: 'Generating...' });
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(onGenerateRecipe).not.toHaveBeenCalled();
  });
});
