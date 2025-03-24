'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/shared/ui/card';
import { Typography } from '@/shared/ui/typography';
import { Loading } from '@/shared/ui/loading';
import { getProducts } from '@/shared/api';
import type { Product, Brand } from '@poizonmarket/api-client';

interface PaginatedResponse {
  data: (Product & { brand: Brand })[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const FeaturedProducts = () => {
  const [products, setProducts] = useState<(Product & { brand: Brand })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        console.log('Received products response:', response);
        
        if (response && typeof response === 'object' && 'data' in response) {
          const paginatedResponse = response as unknown as PaginatedResponse;
          setProducts(paginatedResponse.data);
        } else {
          console.error('Unexpected response format:', response);
          setError('Неверный формат данных');
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Ошибка при загрузке продуктов');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-12">
        <Typography variant="h2" className="mb-6">Популярные товары</Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div className="flex justify-center py-12">
            <Loading size="lg" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4">
        <Typography variant="h3" className="text-red-500">{error}</Typography>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="text-center p-4">
        <Typography variant="h3">Продукты не найдены</Typography>
      </div>
    );
  }

  return (
    <section className="py-12">
      <Typography variant="h2" className="mb-6">Популярные товары</Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="aspect-square relative">
              <img
                src={product.images?.[0] || product.image}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-4">
              <Typography variant="h3" className="mb-2">
                {product.name}
              </Typography>
              <Typography variant="body2" className="text-gray-600 mb-2">
                {product.brand?.name}
              </Typography>
              <Typography variant="h4" className="text-primary">
                {product.price} ₽
              </Typography>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}; 