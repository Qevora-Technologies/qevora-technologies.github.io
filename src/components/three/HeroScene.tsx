/**
 * Loads the heavy 3D scene only after the page is interactive (browser idle),
 * so text, buttons and scrolling are ready immediately — especially on phones.
 */
import { lazy, Suspense, useEffect, useState } from 'react';

const TechLogos3D = lazy(() => import('./TechLogos3D'));

export default function HeroScene() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const go = () => setReady(true);
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(go, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    // Safari has no requestIdleCallback.
    const t = globalThis.setTimeout(go, 1200);
    return () => globalThis.clearTimeout(t);
  }, []);
  if (!ready) return null;
  return (
    <Suspense fallback={null}>
      <div className="size-full animate-[fade-in_0.9s_ease-out]">
        <TechLogos3D />
      </div>
    </Suspense>
  );
}
