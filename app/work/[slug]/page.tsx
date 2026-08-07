import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectPage } from "@/components/project/project-page";
import {
  getAdjacentProjects,
  getProjectBySlug,
  getWorkProjects,
} from "@/content";

interface WorkProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams(): Array<{ slug: string }> {
  return getWorkProjects().map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: WorkProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project || project.tier === "systems-lab") {
    return {};
  }

  return {
    title: project.title,
    description: project.metaDescription,
    alternates: {
      canonical: project.route,
    },
    openGraph: {
      title: `${project.title} | Daniyal Haider`,
      description: project.metaDescription,
      url: project.route,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Daniyal Haider`,
      description: project.metaDescription,
    },
  };
}

export default async function WorkProjectPage({
  params,
}: WorkProjectPageProps): Promise<React.JSX.Element> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project || project.tier === "systems-lab") {
    notFound();
  }

  const { previous, next } = getAdjacentProjects(project.slug);

  return (
    <ProjectPage
      project={project}
      previous={previous}
      next={next}
    />
  );
}
