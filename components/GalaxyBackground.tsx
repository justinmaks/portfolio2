'use client';

import { usePathname } from 'next/navigation';
import { useSyncExternalStore } from 'react';
import Galaxy from '@/components/reactbits/Galaxy';

// The shader cost scales with rendered pixels, and the stars are soft glows, so render
// below native resolution: it is visually near-identical and keeps integrated GPUs and
// phones smooth. Touch devices go a step lower to save battery.
const subscribe = () => () => {};
const getDpr = () => (window.matchMedia('(pointer: coarse)').matches ? 0.6 : 0.75);

export default function GalaxyBackground() {
  const pathname = usePathname();
  const dpr = useSyncExternalStore(subscribe, getDpr, () => 1);

  return (
    <div
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}
    >
      <Galaxy
        transparent
        dpr={dpr}
        density={1.2}
        layers={3}
        glowIntensity={0.3}
        saturation={0.15}
        hueShift={220}
        twinkleIntensity={0.4}
        rotationSpeed={0.03}
        starSpeed={0.3}
        repulsionStrength={1.5}
        // Click/tap warp only on the landing page so tool buttons don't trigger it.
        clickWarp={pathname === '/'}
      />
    </div>
  );
}
