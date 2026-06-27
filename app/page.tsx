import MonkeyEyesClient from '@/app/components/MonkeyEyesClient';
import EmailCapture from '@/app/components/EmailCapture';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function Home() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6 py-16"
      style={{ backgroundColor: 'oklch(93% 0.022 66)' }}
    >
      <div className="w-full mx-auto text-center" style={{ maxWidth: '780px' }}>
        <h1
          className="animate-fade-up"
          style={{
            fontFamily: 'var(--font-sg-bold)',
            color: 'oklch(18% 0.008 75)',
            fontSize: 'clamp(3.5rem, 11vw, 7.5rem)',
            letterSpacing: '-0.045em',
            lineHeight: '1',
            marginBottom: '2rem',
          }}
        >
          nomonkey<span style={{ color: '#ffffff' }}>.</span>work
        </h1>

        <div className="animate-fade-up delay-100">
          <MonkeyEyesClient />
        </div>

        <p
          className="animate-fade-up delay-200 text-balance"
          style={{
            fontFamily: 'var(--font-sg-regular)',
            color: 'oklch(32% 0.012 70)',
            fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
            marginTop: '2rem',
            letterSpacing: '-0.01em',
          }}
        >
          We do the monkey work. You do the real work.
          {/* We do the monkey moves. You make the money moves. */}
          {/* We deal with the monkey business. You deal with the money business. */}
        </p>

        <div className="animate-fade-in delay-350" style={{ marginTop: '2.5rem' }}>
          <EmailCapture />
        </div>
      </div>

      <Analytics />
      <SpeedInsights />
    </main>
  );
}
