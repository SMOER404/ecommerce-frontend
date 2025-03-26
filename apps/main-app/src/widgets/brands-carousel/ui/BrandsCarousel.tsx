'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getBrands } from '@poizon-market/api-client';
import type { Brand } from '@poizon-market/api-client';
import { Alert, AlertDescription } from '../../../shared/ui/alert';
import { Button } from '../../../shared/ui/button';
import { Skeleton } from '../../../shared/ui/skeleton';
import { AlertCircle } from 'lucide-react';
import { BRAND_IMAGE_SIZE, CAROUSEL_SETTINGS } from '../lib/constants';
import { BRAND_ROUTES } from '../config/routes';

export function BrandsCarousel() {
  const [brands, setBrands] = React.useState<Brand[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [retryCount, setRetryCount] = React.useState(0);
  const maxRetries = 3;
  const baseDelay = 2000; // Базовая задержка 2 секунды

  const loadBrands = React.useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const brands = await getBrands();
      setBrands(brands);
    } catch (err: any) {
      const isRateLimit = err?.response?.status === 429;
      const retryAfter = err?.retryAfter || 5;
      setError(isRateLimit 
        ? `Слишком много запросов. Пожалуйста, подождите ${retryAfter} секунд.` 
        : 'Ошибка при загрузке брендов');
      
      if (retryCount < maxRetries) {
        setRetryCount(prev => prev + 1);
        // Используем время ожидания из ответа сервера или экспоненциальную задержку
        const delay = isRateLimit 
          ? retryAfter * 1000 
          : baseDelay * Math.pow(2, retryCount);
        setTimeout(loadBrands, delay);
      }
    } finally {
      setIsLoading(false);
    }
  }, [retryCount]);

  React.useEffect(() => {
    loadBrands();
  }, [loadBrands]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" data-testid="skeleton" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {error}
          {retryCount < maxRetries && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => void loadBrands()}
              className="ml-4"
            >
              Повторить попытку
            </Button>
          )}
        </AlertDescription>
      </Alert>
    );
  }

  if (!Array.isArray(brands)) {
    return (
      <Alert>
        <AlertDescription>
          Ошибка формата данных
        </AlertDescription>
      </Alert>
    );
  }

  if (brands.length === 0) {
    return (
      <Alert>
        <AlertDescription>
          Бренды не найдены
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6">Популярные бренды</h2>
      <Slider {...CAROUSEL_SETTINGS}>
        {brands.map((brand) => (
          <div key={brand.id} className="px-2">
            <Link href={BRAND_ROUTES.details(brand.id)}>
              <div className="relative h-32 w-full overflow-hidden rounded-lg bg-gray-100">
                <div className="flex h-full items-center justify-center">
                  <span className="text-lg font-semibold text-gray-500">{brand.name}</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
} 