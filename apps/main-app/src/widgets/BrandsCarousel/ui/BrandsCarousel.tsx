'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/shared/ui/card';
import { Typography } from '@/shared/ui/typography';
import { Loading } from '@/shared/ui/loading';
import { getBrands } from '@/shared/api';
import type { Brand } from '@poizonmarket/api-client';

interface PaginatedResponse {
  items: Brand[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const BrandsCarousel = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await getBrands();
        console.log('Received response:', response);
        
        if (response && typeof response === 'object' && 'items' in response) {
          const paginatedResponse = response as unknown as PaginatedResponse;
          setBrands(paginatedResponse.items);
        } else {
          console.error('Unexpected response format:', response);
          setError('Неверный формат данных');
          setBrands([]);
        }
      } catch (error) {
        console.error('Error fetching brands:', error);
        setError('Ошибка при загрузке брендов');
        setBrands([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  if (loading) {
    return (
      <div className="py-8">
        <Typography variant="h2" className="mb-6">
          Популярные бренды
        </Typography>
        <div className="flex justify-center py-12">
          <Loading size="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8">
        <Typography variant="h2" className="mb-6">
          Популярные бренды
        </Typography>
        <div className="text-red-500 text-center py-12">
          {error}
        </div>
      </div>
    );
  }

  if (!brands.length) {
    return (
      <div className="py-8">
        <Typography variant="h2" className="mb-6">
          Популярные бренды
        </Typography>
        <div className="text-gray-500 text-center py-12">
          Бренды не найдены
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <Typography variant="h2" className="mb-6">
        Популярные бренды
      </Typography>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <Card key={brand.id} className="p-4">
            <div className="aspect-square relative mb-4">
              <img
                src={brand.image}
                alt={brand.name}
                className="object-contain w-full h-full"
              />
            </div>
            <Typography variant="h3" className="mb-2">
              {brand.name}
            </Typography>
            <Typography variant="body2" className="text-gray-600">
              {brand.description}
            </Typography>
          </Card>
        ))}
      </div>
    </div>
  );
}; 