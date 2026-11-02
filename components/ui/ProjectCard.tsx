import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { projectPath } from '@/lib/routes';
import type { Project } from '@/types';

/** Portrait project card linking to the project's case-study page. */
export function ProjectCard({ project, headingLevel = 'h3' }: { project: Project; headingLevel?: 'h2' | 'h3' }) {
  const Heading = headingLevel;

  return (
    <Link href={projectPath(project.slug)} className="group block" id={`project-card-${project.slug}`}>
      <div className="aspect-[4/5] overflow-hidden rounded-lg bg-surface-alt">
        <img
          src={project.image}
          alt={project.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex items-start justify-between gap-4 pt-4">
        <div>
          <p className="eyebrow text-text-ghost">{project.category.toLowerCase()}</p>
          <Heading className="heading-3 mt-1 group-hover:text-gold transition-colors">{project.name}</Heading>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-text-dim">
            <MapPin className="h-3.5 w-3.5" /> {project.location}
          </p>
        </div>
        <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-text-ghost group-hover:text-gold transition-colors" />
      </div>
    </Link>
  );
}
