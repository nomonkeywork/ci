"use client";

import dynamic from 'next/dynamic';

const MonkeyEyes = dynamic(() => import('./MonkeyEyes'), {
  ssr: false,
  loading: () => <div style={{ width: 'min(520px, 92vw)', height: 'min(520px, 92vw)', margin: '0 auto' }} />,
});

export default function MonkeyEyesClient() {
  return <MonkeyEyes />;
}
