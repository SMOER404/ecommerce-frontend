import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrandsCarousel } from './BrandsCarousel';

// Мокаем функцию getBrands
jest.mock('@/shared/api', () => ({
  getBrands: jest.fn(() => Promise.resolve([
    {
      id: '1',
      name: 'Nike',
      description: 'Just Do It',
      image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&auto=format&fit=crop&q=60',
      createdAt: '2021-01-01',
      updatedAt: '2021-01-01',
    },
    {
      id: '2',
      name: 'Adidas',
      description: 'Impossible is Nothing',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=60',
      createdAt: '2021-01-01',
      updatedAt: '2021-01-01',
    },
  ])),
}));

describe('BrandsCarousel', () => {
  it('renders brands carousel section', async () => {
    render(<BrandsCarousel />);

    expect(screen.getByText('Популярные бренды')).toBeInTheDocument();

    // Ждем, пока загрузятся бренды
    await screen.findByText('Nike');
    await screen.findByText('Adidas');
  });

  it('renders brand links correctly', async () => {
    render(<BrandsCarousel />);

    // Ждем, пока загрузятся бренды
    const nikeLink = await screen.findByRole('link', { name: /nike/i });
    const adidasLink = await screen.findByRole('link', { name: /adidas/i });

    expect(nikeLink).toHaveAttribute('href', '/brands/1');
    expect(adidasLink).toHaveAttribute('href', '/brands/2');
  });
}); 