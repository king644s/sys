'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PRODUCTS, PROJECTS } from '../data';
import { getProjectDetail } from '../data/projectDetails';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { SectionHeader } from '../components/ui/SectionHeader';
import { ProductCard } from '../components/ui/ProductCard';
import { ProjectCard } from '../components/ui/ProjectCard';
import { ProjectBlocks } from '../components/ui/ProjectBlocks';
import { FactGrid } from '../components/ui/ProjectMedia';
import { Button } from '../components/ui/Button';
import { ROUTES } from '@/lib/routes';

export function ProjectDetail({ projectSlug }: { projectSlug: string }) {
  const data = getProjectDetail(projectSlug);

  if (!data) {
    return (
      <div className="container-page flex flex-col items-center py-24 text-center">
        <h1 className="heading-2">Project not found</h1>
        <Button variant="primary" href={ROUTES.projects} className="mt-6">
          <ArrowLeft className="h-4 w-4" /> All projects
        </Button>
      </div>
    );
  }

  const { project, detail } = data;
  const products = detail.productSlugs
    .map((slug) => PRODUCTS.find((p) => p.slug === slug))
    .filter((p): p is (typeof PRODUCTS)[number] => Boolean(p));
  const moreProjects = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 3);
  const sector = project.category.charAt(0) + project.category.slice(1).toLowerCase();

  return (
    <div className="transition-page-enter">
      <Breadcrumbs />

      {/* Header */}
      <section className="container-page pb-10 pt-4">
        <ScrollReveal direction="up">
          <span className="eyebrow">
            {sector} · {project.location}
          </span>
          <h1 className="heading-1 mt-3 max-w-4xl">{project.name}</h1>
          <p className="lead mt-4 max-w-2xl">{detail.summary}</p>
        </ScrollReveal>
      </section>

      {/* Hero image + key facts */}
      <section className="container-page">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="aspect-[4/3] overflow-hidden rounded-xl bg-surface-alt md:aspect-[21/9]">
            <img
              src={detail.heroImage}
              alt={project.name}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
            />
          </div>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.15} className="mt-5">
          <FactGrid facts={detail.facts} />
        </ScrollReveal>
      </section>

      <ProjectBlocks blocks={detail.blocks} />

      {/* Fixtures used */}
      {products.length > 0 && (
        <section className="section border-t border-border">
          <div className="container-page">
            <SectionHeader
              eyebrow="Specified here"
              title="Fixtures in this project"
              description="The SYSlight fixtures used across this space."
              action={
                <Link href={ROUTES.products} className="link-arrow">
                  All products <ArrowRight className="h-4 w-4" />
                </Link>
              }
            />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product, idx) => (
                <ScrollReveal key={product.id} direction="up" delay={idx * 0.05}>
                  <ProductCard product={product} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* More projects */}
      <section className="section border-t border-border bg-void-dark">
        <div className="container-page">
          <SectionHeader
            eyebrow="Projects"
            title="More spaces we've lit"
            action={
              <Link href={ROUTES.projects} className="link-arrow">
                All projects <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />
          <div className="grid grid-cols-1 gap-x-5 gap-y-10 md:grid-cols-3">
            {moreProjects.map((p, idx) => (
              <ScrollReveal key={p.slug} direction="up" delay={idx * 0.08}>
                <ProjectCard project={p} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
