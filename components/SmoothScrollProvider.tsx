"use client";

import { ReactLenis } from "lenis/react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    // Whenever pathname changes, Lenis smooth scroll usually handles it,
    // but we can ensure window scrolls to top if needed, though ReactLenis does it automatically if configured.
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
