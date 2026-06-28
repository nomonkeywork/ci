"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

const ITEMS = [
  { value: "de", label: "DE" },
  { value: "en", label: "EN" },
];

export default function LanguageSwitcher({ locale }: { locale: string }) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicator, setIndicator] = useState<{
    left: number;
    width: number;
  } | null>(null);

  const activeIndex = ITEMS.findIndex((i) => i.value === locale);

  const measure = useCallback(() => {
    if (activeIndex === -1) {
      setIndicator(null);
      return;
    }
    const el = itemRefs.current[activeIndex];
    const container = containerRef.current;
    if (!el || !container) return;
    const cRect = container.getBoundingClientRect();
    const eRect = el.getBoundingClientRect();
    setIndicator({ left: eRect.left - cRect.left, width: eRect.width });
  }, [activeIndex]);

  useEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new ResizeObserver(measure);
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, [measure]);

  return (
    <div
      ref={containerRef}
      role="tablist"
      aria-label="Language"
      className="relative inline-flex rounded-full p-1"
      style={{
        backgroundColor: "var(--c-switch-track)",
        boxShadow:
          "inset 0 2px 2px -1px rgba(0,0,0,0.05), inset 0 0 0 0.5px rgba(0,0,0,0.12)",
      }}
    >
      {indicator && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute top-1 bottom-1 z-0 rounded-full"
          style={{
            backgroundColor: "var(--c-switch-thumb)",
            boxShadow: "0 1px 2px rgba(0,0,0,0.10), 0 0 0 0.5px rgba(0,0,0,0.06)",
          }}
          animate={{ left: indicator.left, width: indicator.width }}
          initial={false}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      {ITEMS.map((item, i) => {
        const isActive = item.value === locale;
        return (
          <button
            key={item.value}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            role="tab"
            aria-selected={isActive}
            onClick={() => {
              if (item.value !== locale) router.push(`/${item.value}`);
            }}
            className="relative z-10 rounded-full select-none px-3 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(52%_0.16_48)]"
            style={{
              fontFamily: "var(--font-sg-bold)",
              fontSize: "0.68rem",
              letterSpacing: "0.1em",
              color: isActive ? "var(--c-text)" : "var(--c-text-faint)",
              transition: "color 150ms ease",
            }}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
