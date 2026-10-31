import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import About from './about';

const woofie = () => screen.queryByAltText('Woofie the cat');

describe('<About /> Woofie preview', () => {
  it('is hidden initially', () => {
    render(<About />);
    expect(woofie()).not.toBeInTheDocument();
  });

  it('shows on mouse hover and hides on mouse leave', () => {
    render(<About />);
    const name = screen.getByText('Woofie');

    fireEvent.pointerEnter(name, { pointerType: 'mouse' });
    expect(woofie()).toBeInTheDocument();

    fireEvent.pointerLeave(name, { pointerType: 'mouse' });
    expect(woofie()).not.toBeInTheDocument();
  });

  it('toggles on tap for touch input', () => {
    render(<About />);
    const name = screen.getByText('Woofie');

    fireEvent.pointerUp(name, { pointerType: 'touch' });
    expect(woofie()).toBeInTheDocument();

    fireEvent.pointerUp(name, { pointerType: 'touch' });
    expect(woofie()).not.toBeInTheDocument();
  });

  it('renders the image in a portal on document.body to escape backdrop-blur', () => {
    const { container } = render(<About />);
    fireEvent.pointerEnter(screen.getByText('Woofie'), { pointerType: 'mouse' });

    expect(container).not.toContainElement(woofie());
    expect(document.body).toContainElement(woofie());
  });
});
