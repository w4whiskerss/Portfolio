"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import type { ISourceOptions } from "@tsparticles/engine";

const createParticleOptions = (theme: "light" | "dark"): ISourceOptions => {
  const isLight = theme === "light";

  return {
    fullScreen: { enable: false, zIndex: 0 },
    background: {
      color: isLight ? "#ffffff" : "#0b0b0b",
    },
    particles: {
      number: {
        value: 90,
        density: { enable: true, width: 800, height: 800 },
      },
      color: {
        value: isLight ? "#000000" : "#ffffff",
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: isLight ? 0.5 : 0.6,
      },
      size: {
        value: { min: 1, max: 3 },
      },
      links: {
        enable: true,
        distance: 150,
        color: isLight ? "#000000" : "#ffffff",
        opacity: isLight ? 0.25 : 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        outModes: {
          default: "bounce",
        },
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab",
        },
        resize: {
          enable: true,
        },
      },
      modes: {
        grab: {
          distance: 200,
          links: {
            opacity: isLight ? 0.65 : 1,
          },
        },
      },
    },
    detectRetina: true,
  };
};

type ParticleBackgroundProps = {
  id?: string;
  className?: string;
};

export default function ParticleBackground({
  id = "particles",
  className = "pointer-events-none h-full w-full",
}: ParticleBackgroundProps) {
  const [isReady, setIsReady] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    void initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setIsReady(true);
    });
  }, []);

  useEffect(() => {
    const syncTheme = () => {
      setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const particleOptions = useMemo(() => createParticleOptions(theme), [theme]);

  if (!isReady) {
    return null;
  }

  return (
    <Particles
      id={id}
      className={className}
      options={particleOptions}
    />
  );
}
