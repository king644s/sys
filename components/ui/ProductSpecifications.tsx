'use client';

import { useState, ReactNode } from 'react';
import { Product } from '../../types';
import {
  getHangingProfileBodyFinishLabel,
  getHangingProfileSizeOptions,
  getHangingProfileWattageOptions,
  isHangingProfileProduct,
} from '../../utils/hangingProfileProduct';
import { ChevronDown } from 'lucide-react';

interface ProductSpecificationsProps {
  product: Product;
}

interface AccordionSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}

function AccordionSection({ title, isOpen, onToggle, children }: AccordionSectionProps) {
  return (
    <div className="border border-border rounded-lg bg-surface-alt/20">
      <button
        onClick={onToggle}
        className={`w-full flex items-center gap-3.5 px-6 py-4 text-left bg-surface-alt/70 hover:bg-surface-alt/90 text-cream transition-colors duration-300 focus:outline-none cursor-pointer ${
          isOpen ? 'border-b border-border/40' : ''
        }`}
        aria-expanded={isOpen}
      >
        <ChevronDown
          className={`w-4 h-4 text-gold shrink-0 transition-transform duration-500 ease-out-expo ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
        <span className="font-serif text-lg tracking-wide font-medium text-cream">{title}</span>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-500 ease-out-expo ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`p-card-lg bg-void flex flex-col gap-4 transition-opacity duration-500 ease-out-expo ${
              isOpen ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductSpecifications({ product }: ProductSpecificationsProps) {
  const isHangingProfile = isHangingProfileProduct(product);
  const [isOpenSpec, setIsOpenSpec] = useState(false);
  const [isOpenTech, setIsOpenTech] = useState(isHangingProfile);

  const getDimensionsRows = () => {
    if (isHangingProfile) {
      const sizeOptions = getHangingProfileSizeOptions(product);
      const wattageOptions = getHangingProfileWattageOptions(product);
      const profileHeight =
        product.dimensionVariants?.[0]?.height ||
        product.specs['Profile Size']?.match(/(\d+)\s*mm/i)?.[1] ||
        '—';

      const variantRows = (product.dimensionVariants ?? []).map((variant) => ({
        wattage: variant.wattage,
        outerDiameter: variant.outerDiameter === 'Custom' ? 'Tailor Made' : `${variant.outerDiameter}mm`,
        height: variant.height,
        cutOut: '—',
        fixtureColor: '',
        cct: '',
        cost: undefined,
      }));

      const variantSizes = new Set(
        variantRows.map((row) => row.outerDiameter.replace(/mm$/, '')),
      );
      const variantWattages = new Set(variantRows.map((row) => row.wattage));

      const extraSizeRows = sizeOptions
        .filter((size) => {
          const numeric = size.match(/^(\d+)mm$/)?.[1];
          if (numeric && variantSizes.has(numeric)) return false;
          return !variantRows.some((row) => row.outerDiameter === size);
        })
        .map((size) => ({
          wattage: '—',
          outerDiameter: size,
          height: profileHeight,
          cutOut: '—',
          fixtureColor: '',
          cct: '',
          cost: undefined,
        }));

      const extraWattageRows = wattageOptions
        .filter((wattage) => !variantWattages.has(wattage))
        .map((wattage) => ({
          wattage,
          outerDiameter: '—',
          height: profileHeight,
          cutOut: '—',
          fixtureColor: '',
          cct: '',
          cost: undefined,
        }));

      const combined = [...variantRows, ...extraSizeRows, ...extraWattageRows];
      if (combined.length > 0) return combined;

      return sizeOptions.map((size) => ({
        wattage: '—',
        outerDiameter: size,
        height: profileHeight,
        cutOut: '—',
        fixtureColor: '',
        cct: '',
        cost: undefined,
      }));
    }

    if (product.dimensionVariants && product.dimensionVariants.length > 0) {
      return product.dimensionVariants.map((variant) => ({
        wattage: variant.wattage,
        outerDiameter: variant.outerDiameter,
        height: variant.height,
        cutOut: variant.cutOut,
        fixtureColor: variant.fixtureColor,
        cct: variant.cct,
        cost: variant.cost,
      }));
    }

    const hasDimensions = product.specs['Dimensions'];
    const height = hasDimensions ? (hasDimensions.match(/H\s*(\d+)mm/i)?.[1] || '98') : '98';
    const outerDia = hasDimensions ? (hasDimensions.match(/Ø\s*(\d+)mm|(\d+)mm/i)?.[1] || '63') : '63';

    return [
      {
        wattage: '',
        outerDiameter: outerDia,
        height,
        cutOut: product.specs['Drill Cutout']?.replace(/[^\d]/g, '') || '—',
        fixtureColor: '',
        cct: '',
        cost: undefined,
      },
    ];
  };

  const getTechSpecValue = (key: string, defaultValue: string) => {
    const specs = product.specs || {};
    const foundKey = Object.keys(specs).find((k) => k.toLowerCase() === key.toLowerCase());
    return foundKey ? specs[foundKey] : defaultValue;
  };

  const formatSpecValue = (label: string, value: string) => {
    if (!value || value === '—') return value;

    if (label === 'Lumen Efficiency') {
      return value.replace(/lm\/w/gi, 'LM/W');
    }

    if (label === 'Product Codes') {
      return value.toUpperCase();
    }

    if (label === 'CCT') {
      return value
        .split('/')
        .map((part) => part.trim())
        .filter(Boolean)
        .map((part) => (/^\d+k$/i.test(part) ? part.toUpperCase() : part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()))
        .join(' / ');
    }

    const preserveBrandCase = (word: string) => {
      if (word.toLowerCase() === 'syslight') return 'SYSlight';
      return null;
    };

    const formatSegment = (segment: string) => {
      if (segment.includes('/')) {
        return segment
          .split('/')
          .map((part) => {
            const trimmed = part.trim();
            if (/^\d+k$/i.test(trimmed)) return trimmed.toUpperCase();
            const brand = preserveBrandCase(trimmed);
            if (brand) return brand;
            return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
          })
          .join('/');
      }

      return segment
        .split(' ')
        .map((word, index) => {
          const brand = preserveBrandCase(word);
          if (brand) return brand;
          const lower = word.toLowerCase();
          if (/^\d/.test(word)) return word;
          if (lower === 'lm/w') return 'LM/W';
          if (index === 0) return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
          return lower;
        })
        .join(' ');
    };

    return value.split(' / ').map(formatSegment).join(' / ');
  };

  const formatTechSpecDisplay = (label: string, value: string) => {
    if (!value || value === '—') return value;
    if (isHangingProfile) return value.toUpperCase();
    return formatSpecValue(label, value);
  };

  const dimensionRows = getDimensionsRows();
  const hasVariants = isHangingProfile
    ? dimensionRows.length > 0
    : product.dimensionVariants && product.dimensionVariants.length > 0;

  const commonTechSpecs = [
    { label: 'LED', value: getTechSpecValue('LED', 'Cree / Bridgelux / Tyanshine') },
    { label: 'Driver', value: getTechSpecValue('Driver', 'SYSlight / Philips / Osram') },
    { label: 'CRI', value: getTechSpecValue('CRI', '80 & above') },
    { label: 'Lumen Efficiency', value: getTechSpecValue('Lumen Efficiency', '100 - 120 LM/W') },
    { label: 'Material', value: getTechSpecValue('Material', 'Aluminum die casting') },
  ];

  const hangingTechSpecs = [
    { label: 'Type', value: getTechSpecValue('Type', '—') },
    { label: 'Material', value: getTechSpecValue('Material', '—') },
    { label: 'Diffuser', value: getTechSpecValue('Diffuser', '—') },
    { label: 'Body Finish', value: getHangingProfileBodyFinishLabel(product) },
    { label: 'Profile Size', value: getTechSpecValue('Profile Size', '—') },
    { label: 'Mounting', value: getTechSpecValue('Mounting', '—') },
    {
      label: 'Size',
      value: getTechSpecValue('Size', getTechSpecValue('Dia Size', '—')),
    },
    {
      label: 'Wattage',
      value: getTechSpecValue('Wattage', getTechSpecValue('Wattage Options', '—')),
    },
    { label: 'CCT', value: getTechSpecValue('CCT Options', '—') },
    { label: 'Corner Radius', value: getTechSpecValue('Corner Radius', '—') },
    { label: 'Additional Features', value: getTechSpecValue('Additional Features', '—') },
    { label: 'LED', value: getTechSpecValue('LED', '—') },
    { label: 'Driver', value: getTechSpecValue('Driver', '—') },
  ].filter((spec) => spec.value !== '—');

  const techSpecs = isHangingProfile
    ? hangingTechSpecs
    : hasVariants
    ? [
        { label: 'Classification', value: getTechSpecValue('Classification', '—') },
        { label: 'CCT', value: getTechSpecValue('CCT Options', '—') },
        { label: 'Reflector Color', value: getTechSpecValue('Fixture Color', '—') },
        { label: 'Product Codes', value: getTechSpecValue('Product Codes', '—') },
        { label: 'Additional Features', value: getTechSpecValue('Additional Features', '—') },
      ]
        .filter((spec) => spec.value !== '—')
        .concat(commonTechSpecs)
    : [
        ...commonTechSpecs,
        {
          label: 'Colour Temp',
          value: getTechSpecValue(
            'Colour Temps (CCT)',
            getTechSpecValue('CCT', '2700K / 3000K / 3500K / 4000K / 5000K / 6500K')
          ),
        },
        { label: 'Optics', value: getTechSpecValue('Optics', 'Herculux') },
        {
          label: 'Ring Colour',
          value: getTechSpecValue(
            'Ring Colour',
            'White / Mat Black / Gold / Rose Gold / Chrome / Silver / Pearl Shining Black'
          ),
        },
        { label: 'Heatsink Colour', value: getTechSpecValue('Heatsink Colour', 'Grey') },
        {
          label: 'Beam Angle',
          value: getTechSpecValue(
            'Beam Angles',
            getTechSpecValue('Beam Options', '15° / 24° / 36° / 55° (5° available in 75mm cutout)')
          ),
        },
      ];

  return (
    <div id="product-accordions-specification-panel" className="flex flex-col gap-8 w-full">
      {!isHangingProfile && (
        <AccordionSection
          title="Specification"
          isOpen={isOpenSpec}
          onToggle={() => setIsOpenSpec((prev) => !prev)}
        >
          <div className="border border-border/85 rounded-[6px] overflow-hidden shadow-sm">
            <div className="bg-gold-muted px-4 py-3 border-b border-border-mid/50">
              <h4 className="font-sans text-xs font-semibold tracking-[0.08em] text-white uppercase">
                Dimensions
              </h4>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="bg-surface-alt border-b border-border">
                    {hasVariants && (
                      <th className="py-3 px-4 font-sans text-xs text-text-dim uppercase tracking-[0.08em] font-semibold">
                        Wattage
                      </th>
                    )}
                    <th className="py-3 px-4 font-sans text-xs text-text-dim uppercase tracking-[0.08em] font-semibold text-center">
                      Outer Diameter (mm)
                    </th>
                    <th className="py-3 px-4 font-sans text-xs text-text-dim uppercase tracking-[0.08em] font-semibold text-center">
                      Height (mm)
                    </th>
                    <th className="py-3 px-4 font-sans text-xs text-text-dim uppercase tracking-[0.08em] font-semibold text-center">
                      Cut Out (mm)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dimensionRows.map((row, index) => (
                    <tr
                      key={index}
                      className="border-b border-border/30 last:border-0 hover:bg-surface-alt/20 transition-colors"
                    >
                      {hasVariants && (
                        <td className="py-3.5 px-4 font-medium text-gold font-mono text-xs">
                          {row.wattage}
                        </td>
                      )}
                      <td className="py-3.5 px-4 text-center text-text-dim font-mono">{row.outerDiameter}</td>
                      <td className="py-3.5 px-4 text-center text-text-dim font-mono">{row.height}</td>
                      <td className="py-3.5 px-4 text-center text-text-dim font-mono">{row.cutOut}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </AccordionSection>
      )}

      <AccordionSection
        title="Technical Specification"
        isOpen={isOpenTech}
        onToggle={() => setIsOpenTech((prev) => !prev)}
      >
        <div className="border border-border/85 rounded-xl overflow-hidden shadow-sm">
          <div className="bg-gold-muted px-4 py-3 border-b border-border-mid/50">
            <h4 className="font-sans text-xs font-semibold tracking-[0.08em] text-white uppercase">
              Technical Specifications
            </h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <tbody>
                {techSpecs.map((spec, index) => (
                  <tr
                    key={index}
                    className="border-b border-border/30 last:border-0 hover:bg-surface-alt/20 transition-colors"
                  >
                    <td className="py-3.5 px-5 font-sans text-xs text-text-dim uppercase tracking-[0.08em] font-semibold w-[35%] md:w-[30%]">
                      {spec.label}
                    </td>
                    <td
                      className={`py-3.5 px-5 text-cream font-medium ${
                        isHangingProfile ? 'uppercase tracking-wide' : 'normal-case'
                      }`}
                    >
                      {formatTechSpecDisplay(spec.label, spec.value)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AccordionSection>
    </div>
  );
}
