import React from 'react';
import { observer } from 'mobx-react-lite';
import { Card, H2, P } from '@poizon-market/ui-kit';
import { formatPrice } from '@poizon-market/utils';
import { Product } from '../model/types';

interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = observer(({ 
  product, 
  onClick 
}) => {
  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onClick?.(product)}
    >
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <H2 className="text-xl mb-2">{product.name}</H2>
        <P className="text-gray-600 mb-2">{product.description}</P>
        <P className="text-blue-600 font-semibold">{formatPrice(product.price)}</P>
      </div>
    </Card>
  );
}); 