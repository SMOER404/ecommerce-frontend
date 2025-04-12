import { render, screen, waitFor } from '@testing-library/react';
import { BrandsCarousel } from '../ui/BrandsCarousel';

const mockBrands = [
  { id: 1, name: 'Nike', logo: 'https://placehold.co/200x200?text=Nike' },
  { id: 2, name: 'Adidas', logo: 'https://placehold.co/200x200?text=Adidas' },
  { id: 3, name: 'Puma', logo: 'https://placehold.co/200x200?text=Puma' },
  { id: 4, name: 'Reebok', logo: 'https://placehold.co/200x200?text=Reebok' },
  { id: 5, name: 'Under Armour', logo: 'https://placehold.co/200x200?text=UA' },
];

const mockGetBrands = jest.fn();

jest.mock('@poizon-market/api-client', () => ({
  getBrands: () => mockGetBrands(),
}));

describe('BrandsCarousel', () => {
  beforeEach(() => {
    mockGetBrands.mockReset();
  });

  it('отображает загрузку при получении данных', () => {
    mockGetBrands.mockImplementation(() => new Promise(() => {}));
    render(<BrandsCarousel />);
    expect(screen.getAllByTestId('skeleton')).toHaveLength(4);
  });

  it('отображает бренды после успешной загрузки', async () => {
    mockGetBrands.mockResolvedValue(mockBrands);
    render(<BrandsCarousel />);

    await waitFor(() => {
      mockBrands.forEach((brand) => {
        const images = screen.getAllByAltText(brand.name);
        expect(images.length).toBeGreaterThan(0);
      });
    });
  });

  it('отображает временные данные при ошибке загрузки', async () => {
    mockGetBrands.mockRejectedValue(new Error('Network error'));
    render(<BrandsCarousel />);

    await waitFor(() => {
      mockBrands.forEach((brand) => {
        const images = screen.getAllByAltText(brand.name);
        expect(images.length).toBeGreaterThan(0);
      });
    });
  });

  it('отображает временные данные при ошибке 429', async () => {
    const error = new Error('Rate limit exceeded');
    (error as any).response = { status: 429 };
    (error as any).retryAfter = 5;
    mockGetBrands.mockRejectedValue(error);
    render(<BrandsCarousel />);

    await waitFor(() => {
      mockBrands.forEach((brand) => {
        const images = screen.getAllByAltText(brand.name);
        expect(images.length).toBeGreaterThan(0);
      });
    });
  });

  it('отображает временные данные при пустом ответе', async () => {
    mockGetBrands.mockResolvedValue([]);
    render(<BrandsCarousel />);

    await waitFor(() => {
      mockBrands.forEach((brand) => {
        const images = screen.getAllByAltText(brand.name);
        expect(images.length).toBeGreaterThan(0);
      });
    });
  });
});
