import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const spaceGroteskBold = localFont({
  src: '../fonts/SpaceGrotesk-Bold.otf',
  variable: '--font-sg-bold',
});

const spaceGroteskRegular = localFont({
  src: '../fonts/SpaceGrotesk-Regular.otf',
  variable: '--font-sg-regular',
});

export const metadata: Metadata = {
  title: 'nomonkeywork — We do the monkey work.',
  description: 'An agency that handles the repetitive work so your team can focus on what matters.',
  manifest: '/manifest.json',
  openGraph: {
    title: 'nomonkeywork',
    description: 'We do the monkey work. You do the real work.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${spaceGroteskBold.variable} ${spaceGroteskRegular.variable}`}>
        {children}
      </body>
    </html>
  );
}
