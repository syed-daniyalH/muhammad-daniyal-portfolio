import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectPage } from "@/components/project/project-page";
import {
  getAdjacentProjects,
  getCaseStudyProjects,
  getProjectBySlug,
} from "@/content";
import { BRAND_NAME } from "@/lib/branding";

interface CaseStudyProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams(): Array<{ slug: string }> {
  return getCaseStudyProjects().map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: CaseStudyProjectPageProps): Promise<Metadata> {
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
      title: `${project.title} | ${BRAND_NAME}`,
      description: project.metaDescription,
      url: project.route,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | ${BRAND_NAME}`,
      description: project.metaDescription,
    },
  };
}

export default async function CaseStudyProjectPage({
  params,
}: CaseStudyProjectPageProps): Promise<React.JSX.Element> {
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
