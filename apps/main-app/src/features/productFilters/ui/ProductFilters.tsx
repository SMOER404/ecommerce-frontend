import React from 'react';
import { observer } from 'mobx-react-lite';
import { Input } from '@poizon-market/ui-kit';
import { productStore } from '@/entities/product/model/store';
import { ProductFilters } from '@/entities/product/model/types';

export const ProductFiltersComponent: React.FC = observer(() => {
  const handleFilterChange = (filters: Partial<ProductFilters>) => {
    productStore.setFilters({
      ...productStore.filters,
      ...filters,
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="search" className="text-sm font-medium">
          Поиск
        </label>
        <Input
          id="search"
          type="text"
          placeholder="Поиск по названию"
          value={productStore.filters.search}
          onChange={(e) => handleFilterChange({ search: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="minPrice" className="text-sm font-medium">
          Минимальная цена
        </label>
        <Input
          id="minPrice"
          type="number"
          placeholder="Минимальная цена"
          value={productStore.filters.minPrice}
          onChange={(e) => handleFilterChange({ minPrice: Number(e.target.value) })}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="maxPrice" className="text-sm font-medium">
          Максимальная цена
        </label>
        <Input
          id="maxPrice"
          type="number"
          placeholder="Максимальная цена"
          value={productStore.filters.maxPrice === Infinity ? '' : productStore.filters.maxPrice}
          onChange={(e) =>
            handleFilterChange({ maxPrice: e.target.value ? Number(e.target.value) : Infinity })
          }
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="category" className="text-sm font-medium">
          Категория
        </label>
        <Input
          id="category"
          type="text"
          placeholder="Введите категорию"
          value={productStore.filters.category}
          onChange={(e) => handleFilterChange({ category: e.target.value })}
        />
      </div>
    </div>
  );
});
