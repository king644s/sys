'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Category } from '../../types';
import { ProductOrbit } from '../3d/ProductOrbit';
import { categoryPath } from '@/lib/routes';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getShape = (): 'spotlight' | 'track' | 'linear' | 'deep' | 'zoom' | 'bollard' => {
    switch (category.slug) {
      case 'cob-spotlight':
        return 'spotlight';
      case 'magnetic-track':
        return 'track';
      case 'downlight-panel':
        return 'deep';
      case 'profile-light':
      case 'hanging-profile-light':
        return 'linear';
      case 'surface':
        return 'spotlight';
      default:
        return 'bollard';
    }
  };

  return (
    <Link
      href={categoryPath(category.slug)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group card card-interactive flex h-full flex-col overflow-hidden"
      id={`category-card-${category.slug}`}
    >
      <div className="relative m-2 mb-0 h-[220px] overflow-hidden rounded-md bg-surface-alt">
        {category.has3D ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <ProductOrbit shape={getShape()} isHovered={isHovered} />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <img
              src={category.image}
              alt={category.name}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="max-h-full max-w-full h-auto w-auto object-contain object-center transition-transform duration-700 ease-out-expo group-hover:scale-105"
            />
          </div>
        )}

        <span className="chip absolute right-3 top-3 h-6 bg-surface">{category.count} fixtures</span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-card-lg">
        <h3 className="heading-3 group-hover:text-gold transition-colors">{category.name}</h3>
        <p className="flex-1 text-sm leading-relaxed text-text-dim">{category.description}</p>
        <span className="link-arrow mt-3">
          View range <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
