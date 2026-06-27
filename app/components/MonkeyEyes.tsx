"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';

interface EyePosition {
  x: number;
  y: number;
}

interface PupilPosition {
  left: EyePosition;
  right: EyePosition;
}

const MonkeyEyes: React.FC = () => {
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const [smoothPupilPos, setSmoothPupilPos] = useState<PupilPosition>({
    left: { x: 0, y: 0 },
    right: { x: 0, y: 0 },
  });

  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };

    const handleWindowResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleWindowResize);
    handleWindowResize();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const calculatePupilPosition = useCallback(
    (eyeElement: HTMLDivElement | null): EyePosition => {
      if (!eyeElement || typeof window === 'undefined') return { x: 0, y: 0 };

      const rect = eyeElement.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;

      const deltaX = mouseX - eyeCenterX;
      const deltaY = mouseY - eyeCenterY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < 5) return { x: 0, y: 0 };

      const maxRadius = 10;
      const angle = Math.atan2(deltaY, deltaX);
      const clampDistance = Math.min(distance, maxRadius);

      return {
        x: Math.cos(angle) * clampDistance,
        y: Math.sin(angle) * clampDistance,
      };
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    let animationFrameId: number;
    const smoothFactor = 0.15;

    const animatePupils = () => {
      const leftPos = calculatePupilPosition(leftEyeRef.current);
      const rightPos = calculatePupilPosition(rightEyeRef.current);

      setSmoothPupilPos((prev) => ({
        left: {
          x: prev.left.x + (leftPos.x - prev.left.x) * smoothFactor,
          y: prev.left.y + (leftPos.y - prev.left.y) * smoothFactor,
        },
        right: {
          x: prev.right.x + (rightPos.x - prev.right.x) * smoothFactor,
          y: prev.right.y + (rightPos.y - prev.right.y) * smoothFactor,
        },
      }));

      animationFrameId = requestAnimationFrame(animatePupils);
    };

    animatePupils();
    return () => cancelAnimationFrame(animationFrameId);
  }, [mouseX, mouseY, calculatePupilPosition]);

  const calculateTilt = useCallback(() => {
    if (typeof window === 'undefined' || windowSize.width === 0) {
      return { rotateX: 0, rotateY: 0 };
    }
    const relX = mouseX / windowSize.width;
    const relY = mouseY / windowSize.height;
    const maxTilt = 12;
    return {
      rotateY: (relX - 0.5) * 2 * maxTilt,
      rotateX: (relY - 0.5) * -2 * maxTilt,
    };
  }, [mouseX, mouseY, windowSize]);

  const tilt = calculateTilt();

  return (
    <div
      ref={containerRef}
      className="relative w-[400px] h-[400px] mx-auto cursor-pointer select-none"
      style={{ perspective: '1000px' }}
    >
      <div
        className="relative w-full h-full transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(1.02)`,
        }}
      >
        {/* Monkey face */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/monkey-head.svg"
            alt="Monkey Head"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>

        {/* Left eye — 40px fixed circle, centered via margin offset */}
        {/* Position derived from SVG viewBox 2487×2278 + object-contain 17px top offset */}
        <div
          ref={leftEyeRef}
          className="absolute z-10 flex items-center justify-center overflow-hidden"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#0f0f0f',
            top: 'calc(42.5% - 20px)',
            left: 'calc(39% - 20px)',
          }}
        >
          <div
            style={{
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              backgroundColor: 'white',
              flexShrink: 0,
              transform: `translate(${smoothPupilPos.left.x}px, ${smoothPupilPos.left.y}px)`,
            }}
          />
        </div>

        {/* Right eye */}
        <div
          ref={rightEyeRef}
          className="absolute z-10 flex items-center justify-center overflow-hidden"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#0f0f0f',
            top: 'calc(42.5% - 20px)',
            left: 'calc(61.5% - 20px)',
          }}
        >
          <div
            style={{
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              backgroundColor: 'white',
              flexShrink: 0,
              transform: `translate(${smoothPupilPos.right.x}px, ${smoothPupilPos.right.y}px)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MonkeyEyes;
