import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Daily Random Game - Play A New Game Every Day',
  description: 'Enjoy a new carefully selected game every day! Daily Random Game offers free browser games with no downloads needed. Perfect for quick breaks and stress relief.',
  keywords: 'daily games, free online games, browser games, casual games, no download games, quick break games, stress relief games, new game daily',
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
        {/* 移除直接添加的脚本标签，改用 Next.js 的 Script 组件 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Open+Sans:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        
        {/* 使用 Next.js Script 组件添加 Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KS4NZWBEPH"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KS4NZWBEPH');
          `}
        </Script>
      </body>
    </html>
  );
}
