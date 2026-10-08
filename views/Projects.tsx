'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { PROJECTS } from '../data';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { MapPin, Building, ArrowRight } from 'lucide-react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Button } from '../components/ui/Button';
import { ROUTES } from '@/lib/routes';

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

  const counts = PROJECT_FILTERS.reduce<Record<string, number>>((acc, filter) => {
    acc[filter] = filter === 'ALL' ? PROJECTS.length : PROJECTS.filter((p) => p.category === filter).length;
    return acc;
  }, {});

  return (
    <div className="transition-page-enter">
      <Breadcrumbs />

      <section className="container-page pb-10 pt-4">
        <SectionHeader
          as="h1"
          eyebrow="Projects"
          title="Spaces we've lit"
          description="Waterfront homes, hotel sanctuaries and corporate offices across India — lit with SYSlight fixtures."
          className="!mb-8"
        />

        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1" role="tablist" aria-label="Filter projects by sector">
          {PROJECT_FILTERS.map((filter) => {
            const active = activeFilter === filter;
            return (
              <button
                key={filter}
                role="tab"
                aria-selected={active}
                onClick={() => handleFilterChange(filter)}
                className={`inline-flex h-9 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors ${
                  active
                    ? 'border-cream bg-cream text-void'
                    : 'border-border-mid text-text-dim hover:border-border-high hover:text-cream'
                }`}
              >
                {filter === 'ALL' ? 'All' : filter.charAt(0) + filter.slice(1).toLowerCase()}
                <span className={`text-xs ${active ? 'opacity-70' : 'text-text-ghost'}`}>{counts[filter]}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="container-page pb-20">
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, idx) => (
              <ScrollReveal key={project.slug} direction="up" delay={idx * 0.06}>
                <article className="group" id={`project-card-${project.slug}`}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-surface-alt">
                    <img
                      src={project.image}
                      alt={project.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
                    />
                    <span className="chip absolute left-3 top-3 h-6 bg-surface">
                      {project.category.charAt(0) + project.category.slice(1).toLowerCase()}
                    </span>
                  </div>
                  <h2 className="heading-3 mt-4">{project.name}</h2>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-text-dim">
                    <MapPin className="h-3.5 w-3.5" />
                    {project.location}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="card px-6 py-20 text-center">
            <p className="body">No projects in this sector yet.</p>
          </div>
        )}
      </section>

      <section className="container-page pb-20">
        <div className="card flex flex-col gap-6 bg-surface-alt border-transparent p-8 md:flex-row md:items-center md:justify-between md:p-12">
          <div className="flex max-w-xl gap-5">
            <Building className="mt-1 h-8 w-8 shrink-0 text-gold" />
            <div>
              <h2 className="heading-2">Feature your next project</h2>
              <p className="body mt-2">
                We partner with architecture and design studios to document finished spaces with
                professional photography and case studies.
              </p>
            </div>
          </div>
          <Button variant="primary" href={ROUTES.professionals}>
            Work with us <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}
