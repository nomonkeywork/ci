import MonkeyEyesClient from '@/app/components/MonkeyEyesClient';
import EmailCapture from '@/app/components/EmailCapture';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function Home() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6 py-8 sm:py-16"
      style={{ backgroundColor: 'oklch(93% 0.022 66)' }}
    >
      <div className="w-full mx-auto text-center" style={{ maxWidth: '780px' }}>
        <h1
          className="animate-fade-up mb-4 sm:mb-8"
          style={{
            fontFamily: 'var(--font-sg-bold)',
            color: 'oklch(18% 0.008 75)',
            fontSize: 'clamp(2.25rem, 9vw, 7.5rem)',
            letterSpacing: '-0.045em',
            lineHeight: '1',
          }}
        >
          nomonkey<span style={{ color: '#ffffff' }}>.</span>work
        </h1>

        <div className="animate-fade-up delay-100">
          <MonkeyEyesClient />
        </div>

        <p
          className="animate-fade-up delay-200 text-balance mt-4 sm:mt-8"
          style={{
            fontFamily: 'var(--font-sg-regular)',
            color: 'oklch(32% 0.012 70)',
            fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
            letterSpacing: '-0.01em',
          }}
        >
          We do the monkey work. You do the real work.
          {/* We do the monkey moves. You make the money moves. */}
          {/* We deal with the monkey business. You deal with the money business. */}
        </p>

        <div className="animate-fade-in delay-350 mt-5 sm:mt-10">
          <EmailCapture />
        </div>
      </div>

      <Analytics />
      <SpeedInsights />
    </main>
  );
}
