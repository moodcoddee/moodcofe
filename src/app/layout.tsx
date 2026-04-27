import type { Metadata } from 'next';
import { IBM_Plex_Mono } from 'next/font/google';
import './globals.scss';

const IBM = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-imb',
});

export const metadata: Metadata = {
  title: 'Mood Coffee',
  description:
    'A coffee shop located in the heart of Troy, Michigan. We serve a variety of coffee drinks, pastries, and light meals. Our cozy atmosphere is perfect for studying, working, or catching up with friends.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={IBM.variable}>
      <body>{children}</body>
    </html>
  );
}
