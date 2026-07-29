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
      className="group bg-surface-alt border border-border hover:border-gold/50 hover:shadow-hover transition-all duration-500 rounded-md overflow-hidden flex flex-col cursor-pointer transform hover:-translate-y-1"
      id={`category-card-${category.slug}`}
    >
      <div className="relative h-[240px] bg-void overflow-hidden border-b border-border/40">
        {category.has3D ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <ProductOrbit shape={getShape()} isHovered={isHovered} />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <img
              src={category.image}
              alt={category.name}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="max-h-full max-w-full h-auto w-auto object-contain object-center opacity-75 group-hover:scale-105 group-hover:opacity-100 group-hover:brightness-110 transition-all duration-700 ease-out-expo"
            />
          </div>
        )}

        <div className="absolute top-4 right-4 bg-void/80 border border-border px-2.5 py-1">
          <span className="font-mono text-xs text-gold font-semibold tracking-[0.15em]">
            {category.count} FIXTURES
          </span>
        </div>
      </div>

      <div className="p-card-lg flex flex-col flex-1 bg-surface-alt group-hover:bg-surface transition-colors duration-500">
        <h3 className="font-serif text-xl font-bold text-cream mb-2 group-hover:text-gold transition-colors duration-300">
          {category.name}
        </h3>

        <p className="font-sans text-sm text-text-dim leading-relaxed mb-4 flex-1">
          {category.description}
        </p>

        <div className="mt-auto flex justify-between items-center text-xs font-mono uppercase tracking-[0.15em] text-text-dim group-hover:text-gold transition-all duration-300">
          <span>Explore collections</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 duration-300" />
        </div>
      </div>
    </Link>
  );
}
