"use client";

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

interface EyePosition { x: number; y: number; }
interface PupilPosition { left: EyePosition; right: EyePosition; }

const MonkeyEyes: React.FC = () => {
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  const [reducedMotion, setReducedMotion] = useState(false);
  const [smoothPupilPos, setSmoothPupilPos] = useState<PupilPosition>({
    left: { x: 0, y: 0 },
    right: { x: 0, y: 0 },
  });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!reducedMotion) {
        const maxTilt = 12;
        setTilt({
          rotateY: (e.clientX / window.innerWidth - 0.5) * 2 * maxTilt,
          rotateX: (e.clientY / window.innerHeight - 0.5) * -2 * maxTilt,
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;

    let animationFrameId: number;
    const smoothFactor = 0.15;

    const getEyePosition = (eyeEl: HTMLDivElement | null): EyePosition => {
      if (!eyeEl) return { x: 0, y: 0 };
      const { x: mx, y: my } = mousePos.current;
      const rect = eyeEl.getBoundingClientRect();
      const dx = mx - (rect.left + rect.width / 2);
      const dy = my - (rect.top + rect.height / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 5) return { x: 0, y: 0 };
      const angle = Math.atan2(dy, dx);
      const clamped = Math.min(dist, 10);
      return { x: Math.cos(angle) * clamped, y: Math.sin(angle) * clamped };
    };

    const animate = () => {
      const lp = getEyePosition(leftEyeRef.current);
      const rp = getEyePosition(rightEyeRef.current);
      setSmoothPupilPos(prev => ({
        left: {
          x: prev.left.x + (lp.x - prev.left.x) * smoothFactor,
          y: prev.left.y + (lp.y - prev.left.y) * smoothFactor,
        },
        right: {
          x: prev.right.x + (rp.x - prev.right.x) * smoothFactor,
          y: prev.right.y + (rp.y - prev.right.y) * smoothFactor,
        },
      }));
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [reducedMotion]);

  return (
    <div
      className="relative mx-auto cursor-pointer select-none"
      style={{
        width: 'min(520px, 92vw)',
        height: 'min(520px, 92vw)',
        perspective: '1000px',
      }}
    >
      <div
        className="relative w-full h-full"
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(1.02)`,
          transition: reducedMotion ? 'none' : 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/monkey-head.svg"
            alt="nomonkeywork mascot, a grinning chimp"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>

        <div
          ref={leftEyeRef}
          className="absolute z-10 flex items-center justify-center overflow-hidden"
          style={{
            width: '40px', height: '40px', borderRadius: '50%',
            backgroundColor: '#0f0f0f',
            top: 'calc(42.5% - 20px)', left: 'calc(39% - 20px)',
          }}
        >
          <div style={{
            width: '14px', height: '14px', borderRadius: '50%',
            backgroundColor: 'white', flexShrink: 0,
            transform: `translate(${smoothPupilPos.left.x}px, ${smoothPupilPos.left.y}px)`,
          }} />
        </div>

        <div
          ref={rightEyeRef}
          className="absolute z-10 flex items-center justify-center overflow-hidden"
          style={{
            width: '40px', height: '40px', borderRadius: '50%',
            backgroundColor: '#0f0f0f',
            top: 'calc(42.5% - 20px)', left: 'calc(61.5% - 20px)',
          }}
        >
          <div style={{
            width: '14px', height: '14px', borderRadius: '50%',
            backgroundColor: 'white', flexShrink: 0,
            transform: `translate(${smoothPupilPos.right.x}px, ${smoothPupilPos.right.y}px)`,
          }} />
        </div>
      </div>
    </div>
  );
};

export default MonkeyEyes;
