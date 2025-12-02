import type { Metadata } from 'next';
import Projects from '@/components/Projects';

export const metadata: Metadata = {
  title: 'Projects | Justin Maksimczuk',
  description: 'Highlighted engineering projects and experiments.',
};

export default function ProjectsPage() {
  return <Projects />;
}


