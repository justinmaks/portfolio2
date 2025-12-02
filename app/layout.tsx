import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import MuiProviders from '@/components/MuiProviders';
import Navbar from '@/components/Navbar';
import Starfield from '@/components/Starfield';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Justin Maksimczuk | Software Engineer',
  description:
    'Portfolio site for Justin Maksimczuk, featuring projects, contact info, and interactive experiments.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <MuiProviders>
          <div id="background" aria-hidden />
          <Starfield />
          <Navbar />
          <main className="app-content">{children}</main>
        </MuiProviders>
      </body>
    </html>
  );
}
