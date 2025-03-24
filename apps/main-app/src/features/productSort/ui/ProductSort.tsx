import React from 'react';
import { observer } from 'mobx-react-lite';
import { Select } from '@poizon-market/ui-kit';
import { productStore } from '../../../entities/product/model/store';
import { ProductSort } from '../../../entities/product/model/types';
import { Product } from '../../../entities/product/model/types';

type SortableFields = Extract<keyof Product, 'name' | 'price' | 'createdAt' | 'stock'>;

const sortFields: { value: SortableFields; label: string }[] = [
  { value: 'name', label: 'По названию' },
  { value: 'price', label: 'По цене' },
  { value: 'createdAt', label: 'По дате создания' },
  { value: 'stock', label: 'По наличию' }
];

export const ProductSortComponent = observer(() => {
  const { sort, setSort } = productStore;

  const handleSortChange = (field: SortableFields) => {
    setSort({
      field,
      direction: sort.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  return (
    <div className="flex items-center gap-4">
      <Select<SortableFields>
        value={sort.field}
        onChange={handleSortChange}
        options={sortFields}
        placeholder="Сортировать по"
      />
      <button
        onClick={() => setSort({ ...sort, direction: sort.direction === 'asc' ? 'desc' : 'asc' })}
        className="px-3 py-1 border rounded hover:bg-gray-100"
      >
        {sort.direction === 'asc' ? '↑' : '↓'}
      </button>
    </div>
  );
}); 