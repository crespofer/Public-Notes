import { render, screen } from '@testing-library/react';
import Page from '~/app/page';

// Mock the Hero component
vi.mock('~/components/ui/hero', () => ({
  Hero: () => <div data-testid="hero">Hero Component</div>,
}));

describe('Page', () => {
  it('renders the Hero component', () => {
    render(<Page />);

    const hero = screen.getByTestId('hero');
    expect(hero).toBeInTheDocument();
    expect(hero).toHaveTextContent('Hero Component');
  });
});
