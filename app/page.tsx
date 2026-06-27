import MonkeyEyesClient from '@/app/components/MonkeyEyesClient';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1
          className="text-5xl md:text-7xl mb-12 bg-clip-text text-transparent"
          style={{
            fontFamily: 'var(--font-sg-bold)',
            backgroundImage: 'linear-gradient(to right, #3c3c3c, #0f0f0f)',
          }}
        >
          nomonkey.work
        </h1>

        <MonkeyEyesClient />

        <div className="mt-12 space-y-4">
          <div className="flex justify-center gap-4">
            <button
              className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl"
              style={{ fontFamily: 'var(--font-sg-regular)' }}
            >
              Coming soon
            </button>

            {/* <button
              className="px-6 py-3 bg-white text-purple-600 rounded-full hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl"
              style={{ fontFamily: 'var(--font-sg-regular)' }}
            >
              Learn More
            </button> */}
          </div>
        </div>
      </div>

      <Analytics />
      <SpeedInsights />
    </main>
  );
}
