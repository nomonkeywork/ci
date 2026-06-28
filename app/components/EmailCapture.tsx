"use client";

import { useState, useRef, useCallback } from 'react';
import { Mail } from 'lucide-react';

type Status = 'idle' | 'leaving' | 'done';

export default function EmailCapture({
  placeholder = 'your@email.com',
  ctaLabel = 'Get early access',
  successMessage = "You're on the list. We'll be in touch.",
  errorMessage = 'Enter a valid email address.',
}: {
  placeholder?: string;
  ctaLabel?: string;
  successMessage?: string;
  errorMessage?: string;
} = {}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [focused, setFocused] = useState(false);
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
      setError(errorMessage);
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
          color: 'var(--c-text-muted)',
          fontSize: '1.1rem',
        }}
      >
        {successMessage}
      </p>
    );
  }

  const isLeaving = status === 'leaving';

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row gap-3 w-full mx-auto items-start"
      noValidate
      style={{
        opacity: isLeaving ? 0 : 1,
        transform: isLeaving ? 'translateY(-10px) scale(0.98)' : 'translateY(0) scale(1)',
        transition: 'opacity 260ms cubic-bezier(0.16, 1, 0.3, 1), transform 260ms cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: isLeaving ? 'none' : 'auto',
      }}
    >
      <div className="flex-1">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            paddingLeft: '1rem',
            paddingRight: '0.5rem',
            gap: '0.625rem',
            borderRadius: '9999px',
            border: `2px solid ${error ? 'var(--c-error)' : focused ? '#000000' : 'var(--c-field-border)'}`,
            backgroundColor: '#ffffff',
            overflow: 'hidden',
            transition: 'border-color 200ms cubic-bezier(0.16, 1, 0.3, 1), border-width 200ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <Mail
            size={15}
            strokeWidth={1.75}
            style={{ color: 'var(--c-text-faint)', flexShrink: 0 }}
          />
          <input
            ref={inputRef}
            type="email"
            data-1p-ignore
            data-lpignore="true"
            data-form-type="other"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onAnimationEnd={() => inputRef.current?.classList.remove('animate-shake')}
            placeholder={placeholder}
            style={{
              width: '100%',
              paddingTop: '0.875rem',
              paddingBottom: '0.875rem',
              fontSize: '1rem',
              outline: 'none',
              outlineOffset: '0',
              border: 'none',
              boxShadow: 'none',
              WebkitAppearance: 'none',
              background: 'transparent',
              fontFamily: 'var(--font-sg-regular)',
              color: 'var(--c-text)',
            }}
            aria-label="Email address"
            aria-describedby={error ? 'email-error' : undefined}
            aria-invalid={error ? 'true' : undefined}
          />
        </div>
        {error && (
          <p
            id="email-error"
            role="alert"
            className="mt-1.5 text-sm text-left animate-fade-down px-4"
            style={{
              color: 'var(--c-error)',
              fontFamily: 'var(--font-sg-regular)',
            }}
          >
            {error}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="shrink-0 px-7 py-4 whitespace-nowrap [transition:transform_150ms_cubic-bezier(0.16,1,0.3,1),box-shadow_150ms_ease] hover:scale-[1.02] hover:shadow-[0_8px_32px_var(--c-btn-shadow)] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[oklch(52%_0.16_48)] focus:ring-offset-2"
        style={{
          fontFamily: 'var(--font-sg-bold)',
          fontSize: '1rem',
          letterSpacing: '-0.01em',
          background: 'var(--c-btn-bg)',
          color: 'var(--c-btn-text)',
          borderRadius: '9999px',
        }}
      >
        {ctaLabel}
      </button>
    </form>
  );
}
