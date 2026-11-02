import { PROJECTS } from '@/data';
import { ProjectDetail } from '@/views/ProjectDetail';

interface PageProps {
  params: Promise<{ projectSlug: string }>;
}

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ projectSlug: project.slug }));
}

export default async function Page({ params }: PageProps) {
  const { projectSlug } = await params;
  return <ProjectDetail projectSlug={projectSlug} />;
}
