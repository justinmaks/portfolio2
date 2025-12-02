import type { Metadata } from 'next';
import Snake from '@/components/Snake';

export const metadata: Metadata = {
  title: 'Snake | Justin Maksimczuk',
  description: 'Retro Snake game implemented in React.',
};

export default function SnakePage() {
  return <Snake />;
}


