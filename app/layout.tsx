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
  title: 'nomonkeywork - Interactive Monkey Mascot',
  description: 'Playful monkey mascot with interactive eye tracking',
  openGraph: {
    title: 'nomonkeywork',
    description: 'Interactive monkey mascot that follows your mouse',
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
