import MonkeyEyesClient from '@/app/components/MonkeyEyesClient';
import EmailCapture from '@/app/components/EmailCapture';
import TypewriterLines from '@/app/components/TypewriterLines';
import LanguageSwitcher from '@/app/components/LanguageSwitcher';
import ThemeToggle from '@/app/components/ThemeToggle';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { getDictionary } from '@/i18n';

export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = getDictionary(locale);

  return (
    <>
      <div className="fixed top-4 right-4 sm:top-5 sm:right-5 z-50 flex items-center gap-2">
        <ThemeToggle />
        <LanguageSwitcher locale={locale} />
      </div>
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6 py-8 sm:py-16"
      style={{ background: 'var(--c-canvas)', minHeight: '100dvh' }}
    >
      <div className="w-full mx-auto text-center" style={{ maxWidth: '780px' }}>
        <h1
          className="animate-fade-up mb-4 sm:mb-8"
          style={{
            fontFamily: 'var(--font-sg-bold)',
            color: 'var(--c-text)',
            fontSize: 'clamp(2.25rem, 9vw, 7.5rem)',
            letterSpacing: '-0.045em',
            lineHeight: '1',
          }}
        >
          nomonkey<span className="logo-dot">.</span>work
        </h1>

        <div className="animate-fade-up delay-100">
          <MonkeyEyesClient />
        </div>

        <TypewriterLines
          className="animate-fade-up delay-200 mt-4 sm:mt-8"
          style={{
            fontFamily: 'var(--font-sg-regular)',
            color: 'var(--c-text-muted)',
            fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
            letterSpacing: '-0.01em',
            lineHeight: '1.6',
          }}
          variants={[...d.tw.variants]}
          staticWe={d.tw.we}
          staticYou={d.tw.you}
        />

        <div className="animate-fade-in delay-350 mt-5 sm:mt-10">
          <EmailCapture
            placeholder={d.form.placeholder}
            ctaLabel={d.form.cta}
            successMessage={d.form.success}
            errorMessage={d.form.error}
          />
        </div>
      </div>

      <Analytics />
      <SpeedInsights />
    </main>
    </>
  );
}
