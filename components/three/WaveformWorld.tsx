"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { setIntensity } from "@/lib/scrollState";

const WorldScene = dynamic(
  () => import("@/components/three/WorldScene").then((m) => ({ default: m.WorldScene })),
  { ssr: false, loading: () => null }
);

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
  } catch {
    return false;
  }
}

export function WaveformWorld() {
  const pathname = usePathname();
  const [mode, setMode] = useState<"loading" | "webgl" | "fallback">("loading");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 767px)").matches;
    setMode(reduced || small || !hasWebGL() ? "fallback" : "webgl");
  }, []);

  // Full intensity on the home film; subtle on inner pages.
  useEffect(() => {
    setIntensity(pathname === "/" ? 1 : 0.4);
  }, [pathname]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{ contain: "strict" }}
    >
      {mode === "webgl" && <WorldScene />}
      {mode === "fallback" && <WorldFallback subtle={pathname !== "/"} />}
    </div>
  );
}

function WorldFallback({ subtle }: { subtle: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ opacity: subtle ? 0.5 : 1 }}>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(92,107,61,0.12) 0%, transparent 65%), radial-gradient(ellipse 60% 40% at 50% 80%, rgba(200,176,64,0.08) 0%, transparent 70%)",
        }}
      />
      <svg
        className="absolute left-0 top-1/2 h-40 w-[200%] -translate-y-1/2 world-fallback-ribbon"
        viewBox="0 0 1200 160"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0 80 Q 150 20 300 80 T 600 80 T 900 80 T 1200 80"
          stroke="rgba(92,107,61,0.35)"
          strokeWidth="2"
        />
        <path
          d="M0 80 Q 150 130 300 80 T 600 80 T 900 80 T 1200 80"
          stroke="rgba(200,176,64,0.25)"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}
