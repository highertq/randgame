import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Daily Random Game - Play A New Game Every Day',
  description: 'Enjoy a new carefully selected game every day! Daily Random Game offers free browser games with no downloads needed. Perfect for quick breaks and stress relief.',
  keywords: 'daily games, free online games, browser games, casual games, no download games, quick break games, stress relief games, new game daily',
  openGraph: {
    title: 'Daily Random Game - Play A New Game Every Day',
    description: 'Discover a new game every day! Free browser games with no downloads needed. Perfect for short breaks and stress relief.',
    type: 'website',
    siteName: 'Daily Random Game',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Daily Random Game screenshot'
      }
    ]
  },
  alternates: {
    canonical: 'https://randgame.online'
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Open+Sans:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
