'use client';

import { useEffect, useRef } from 'react';

const STAR_COUNT = 500;

export default function Starfield() {
  const starContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = starContainerRef.current;
    if (!container) {
      return undefined;
    }

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < STAR_COUNT; i += 1) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.top = `${Math.random() * 100}vh`;
      star.style.left = `${Math.random() * 100}vw`;
      fragment.appendChild(star);
    }

    container.appendChild(fragment);

    return () => {
      container.innerHTML = '';
    };
  }, []);

  return <div ref={starContainerRef} className="stars" aria-hidden="true" />;
}


