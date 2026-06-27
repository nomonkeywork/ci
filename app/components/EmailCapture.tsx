"use client";

import { useState, useRef, useCallback } from 'react';

type Status = 'idle' | 'leaving' | 'done';

export default function EmailCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const triggerShake = useCallback(() => {
    const el = inputRef.current;
    if (!el) return;
    el.classList.remove('animate-shake');
    void el.offsetWidth;
    el.classList.add('animate-shake');
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email address.');
      triggerShake();
      return;
    }
    setError('');
    setStatus('leaving');
    setTimeout(() => setStatus('done'), 300);
  };

  if (status === 'done') {
    return (
      <p
        className="animate-fade-up"
        role="status"
        style={{
          fontFamily: 'var(--font-sg-regular)',
          color: 'oklch(35% 0.012 70)',
          fontSize: '1.1rem',
        }}
      >
        You&apos;re on the list. We&apos;ll be in touch.
      </p>
    );
  }

  const isLeaving = status === 'leaving';

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      noValidate
      style={{
        opacity: isLeaving ? 0 : 1,
        transform: isLeaving ? 'translateY(-10px) scale(0.98)' : 'translateY(0) scale(1)',
        transition: 'opacity 260ms cubic-bezier(0.16, 1, 0.3, 1), transform 260ms cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: isLeaving ? 'none' : 'auto',
      }}
    >
      <div className="flex-1">
        <input
          ref={inputRef}
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError('');
          }}
          onAnimationEnd={() => inputRef.current?.classList.remove('animate-shake')}
          placeholder="your@email.com"
          className="w-full px-4 py-3 rounded-lg text-base outline-none focus:ring-2 focus:ring-[oklch(52%_0.16_48)] focus:ring-offset-2"
          style={{
            fontFamily: 'var(--font-sg-regular)',
            backgroundColor: 'oklch(97% 0.012 66)',
            border: `1.5px solid ${error ? 'oklch(50% 0.15 25)' : 'oklch(72% 0.035 66)'}`,
            color: 'oklch(18% 0.008 75)',
            transition: 'border-color 200ms ease, box-shadow 200ms ease',
          }}
          aria-label="Email address"
          aria-describedby={error ? 'email-error' : undefined}
          aria-invalid={error ? 'true' : undefined}
        />
        {error && (
          <p
            id="email-error"
            role="alert"
            className="mt-1.5 text-sm text-left animate-fade-down"
            style={{
              color: 'oklch(50% 0.15 25)',
              fontFamily: 'var(--font-sg-regular)',
            }}
          >
            {error}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="px-6 py-3 rounded-lg text-base whitespace-nowrap [transition:transform_150ms_cubic-bezier(0.16,1,0.3,1),box-shadow_150ms_ease] hover:scale-[1.03] hover:shadow-[0_4px_16px_oklch(62%_0.14_58_/_0.35)] active:scale-[0.97]"
        style={{
          fontFamily: 'var(--font-sg-regular)',
          backgroundColor: 'oklch(72% 0.10 62)',
          color: 'oklch(18% 0.008 75)',
        }}
      >
        Get early access
      </button>
    </form>
  );
}
