"use client";

import dynamic from 'next/dynamic';

const MonkeyEyes = dynamic(() => import('./MonkeyEyes'), {
  ssr: false,
  loading: () => <div style={{ width: 400, height: 400, margin: '0 auto' }} />,
});

export default function MonkeyEyesClient() {
  return <MonkeyEyes />;
}
