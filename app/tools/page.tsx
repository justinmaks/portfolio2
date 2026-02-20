import type { Metadata } from 'next';
import Tools from '@/components/Tools';

export const metadata: Metadata = {
  title: 'Dev Tools | Justin Maksimczuk',
  description: 'Client-side developer utilities: JWT decoder, Base64, Unix timestamp, JSON formatter, UUID generator, CIDR calculator.',
};

export default function ToolsPage() {
  return <Tools />;
}
