import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from '@/i18n';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Already has a locale prefix — pass through
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return;

  // Detect preferred locale from Accept-Language header
  const acceptLang = request.headers.get('accept-language') ?? '';
  const preferred: (typeof locales)[number] = acceptLang.toLowerCase().includes('de')
    ? 'de'
    : defaultLocale;

  return NextResponse.redirect(new URL(`/${preferred}${pathname}`, request.url));
}

export const config = {
  // Skip Next.js internals, static files, and known asset extensions
  matcher: ['/((?!_next|api|.*\\.(?:ico|png|svg|jpg|jpeg|webp|avif|json|txt|xml|woff2?|otf)).*)'],
};
