'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { PROJECTS } from '../data';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { MapPin, Building } from 'lucide-react';

type ProjectCategoryFilter = 'ALL' | 'RESIDENTIAL' | 'HOSPITALITY' | 'OFFICES' | 'RETAIL';

const PROJECT_FILTERS: ProjectCategoryFilter[] = ['ALL', 'RESIDENTIAL', 'HOSPITALITY', 'OFFICES', 'RETAIL'];

function parseCategoryFilter(value: string | null): ProjectCategoryFilter {
  if (value && PROJECT_FILTERS.includes(value as ProjectCategoryFilter)) {
    return value as ProjectCategoryFilter;
  }
  return 'ALL';
}

export function Projects() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] = useState<ProjectCategoryFilter>(() =>
    parseCategoryFilter(searchParams.get('category'))
  );

  useEffect(() => {
    setActiveFilter(parseCategoryFilter(searchParams.get('category')));
  }, [searchParams]);

  const handleFilterChange = (filter: ProjectCategoryFilter) => {
    setActiveFilter(filter);
    const params = new URLSearchParams(searchParams.toString());
    if (filter === 'ALL') {
      params.delete('category');
    } else {
      params.set('category', filter);
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const filteredProjects = PROJECTS.filter((proj) => {
    if (activeFilter === 'ALL') return true;
    return proj.category === activeFilter;
  });

  return (
    <div className="transition-page-enter">
      <Breadcrumbs />
      {/* Header section */}
      <section className="max-w-4xl mx-auto px-6 text-center py-12 md:py-16">
        <ScrollReveal direction="up">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold mb-3 block">
            04 / architectural showcase
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-cream font-light tracking-tight leading-tight">
            Sculpted <span className="italic font-serif text-gold font-normal">Completed Spaces.</span>
          </h1>
          <p className="font-sans text-sm text-text-dim max-w-xl mx-auto mt-5 leading-relaxed">
            Witness how our lighting classifications sculpt atmospheres across India. From waterfront private residences to BKC consulate office lounges and hotel sanctuaries.
          </p>
        </ScrollReveal>
      </section>

      {/* Grid classification filters */}
      <section className="max-w-7xl mx-auto px-6 mb-12 flex justify-center">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="flex flex-wrap gap-2 justify-center border border-border p-1.5 bg-surface-alt">
            {PROJECT_FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={`px-5 py-2 font-mono text-[11px] uppercase tracking-[0.15em] transition-all duration-300 cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-gold text-void-dark font-bold shadow-glow-sm'
                    : 'text-text-dim hover:text-cream'
                }`}
              >
                {filter.replace('_', ' ')}
              </button>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-6 py-4">
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <div key={project.slug}>
                <ScrollReveal direction="up" delay={idx * 0.08}>
                  <div 
                    className="group relative h-[400px] bg-void overflow-hidden border border-border hover:border-gold/50 hover:shadow-hover hover:-translate-y-1 transition-all duration-500 rounded-md"
                    id={`project-card-${project.slug}`}
                  >
                    <img
                      src={project.image}
                      alt={project.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700 ease-out-expo"
                    />
                    
                    {/* Underlay bottom shadow gradients */}
                    <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />

                    {/* Top quick badges */}
                    <div className="absolute top-6 left-6 bg-surface/90 border border-border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-gold-muted">
                      {project.category}
                    </div>

                    {/* Core details at bottom */}
                    <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col justify-end">
                      <h3 className="font-serif text-xl font-bold text-cream mb-1 group-hover:text-gold transition-colors duration-300">
                        {project.name}
                      </h3>
                      <p className="font-sans text-sm text-text-dim flex items-center gap-1.5 mt-2">
                        <MapPin className="w-3.5 h-3.5 text-gold-muted" />
                        <span>{project.location}</span>
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-border mt-6">
            <span className="font-mono text-xs text-text-dim uppercase tracking-widest">
              No matching structural reference found.
            </span>
          </div>
        )}
      </section>

      {/* Submission CTA block */}
      <section className="max-w-4xl mx-auto px-6 py-20 mt-16 text-center border-t border-border">
        <ScrollReveal direction="up">
          <Building className="w-10 h-10 text-gold-muted/50 mb-4 mx-auto" />
          <h2 className="font-serif text-2xl md:text-3xl font-light text-cream tracking-tight">
            Feature your Next Project Showcased
          </h2>
          <p className="font-sans text-sm text-text-dim max-w-md mx-auto mt-4 leading-relaxed">
            We partner with architectural houses, publishing pristine reference case sheets and high-resolution professional footage profiles.
          </p>
        </ScrollReveal>
      </section>
    </div>
  );
}
