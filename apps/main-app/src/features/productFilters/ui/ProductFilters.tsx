import React from 'react';
import { observer } from 'mobx-react-lite';
import { Input } from '@poizon-market/ui-kit';
import { productStore } from '@/entities/product/model/store';
import { ProductFilters } from '@/entities/product/model/types';

export const ProductFilters: React.FC = observer(() => {
  const handleFilterChange = (filters: Partial<ProductFilters>) => {
    productStore.setFilters({
      ...productStore.filters,
      ...filters
    });
  };

  return (
    <div className="space-y-4">
      <Input
        label="Поиск"
        placeholder="Поиск по названию или описанию"
        value={productStore.filters.search || ''}
        onChange={(e) => handleFilterChange({ search: e.target.value })}
      />
      <Input
        label="Минимальная цена"
        type="number"
        placeholder="0"
        value={productStore.filters.minPrice || ''}
        onChange={(e) => handleFilterChange({ minPrice: Number(e.target.value) })}
      />
      <Input
        label="Максимальная цена"
        type="number"
        placeholder="1000000"
        value={productStore.filters.maxPrice || ''}
        onChange={(e) => handleFilterChange({ maxPrice: Number(e.target.value) })}
      />
      <Input
        label="Категория"
        placeholder="Введите категорию"
        value={productStore.filters.category || ''}
        onChange={(e) => handleFilterChange({ category: e.target.value })}
      />
    </div>
  );
}); 