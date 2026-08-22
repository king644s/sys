'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Mic2, Smartphone, ToggleLeft, type LucideIcon } from 'lucide-react';

type Scene = {
  id: string;
  label: string;
  tone: string;
  core: string;
  glow: string;
};

const SCENES: Scene[] = [
  {
    id: 'movie',
    label: 'Movie night',
    tone: '2700K',
    core: '#FFBA5C',
    glow: 'rgba(255, 186, 92, 0.5)',
  },
  {
    id: 'morning',
    label: 'Morning',
    tone: '5000K',
    core: '#C5D8FF',
    glow: 'rgba(186, 214, 255, 0.48)',
  },
  {
    id: 'home',
    label: 'Lived-in',
    tone: '3500K',
    core: '#8F8DF0',
    glow: 'rgba(143, 141, 240, 0.5)',
  },
];

const NODES: { id: string; label: string; icon: LucideIcon; angle: number }[] = [
  { id: 'app', label: 'App', icon: Smartphone, angle: -90 },
  { id: 'voice', label: 'Voice', icon: Mic2, angle: 30 },
  { id: 'switch', label: 'Switch', icon: ToggleLeft, angle: 150 },
];

const SCENE_MS = 3600;
const NODE_MS = 2400;

function orbitPoint(angleDeg: number, radius = 39) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    left: `${50 + radius * Math.cos(rad)}%`,
    top: `${50 + radius * Math.sin(rad)}%`,
  };
}

function TickMarks() {
  const ticks = Array.from({ length: 72 }, (_, i) => {
    const angle = (i * 5 * Math.PI) / 180;
    const major = i % 6 === 0;
    const inner = major ? 91.5 : 94.2;
    const outer = 98;
    return {
      key: i,
      major,
      x1: 100 + inner * Math.cos(angle),
      y1: 100 + inner * Math.sin(angle),
      x2: 100 + outer * Math.cos(angle),
      y2: 100 + outer * Math.sin(angle),
    };
  });

  return (
    <g className="text-border-high/70">
      {ticks.map((tick) => (
        <line
          key={tick.key}
          x1={tick.x1}
          y1={tick.y1}
          x2={tick.x2}
          y2={tick.y2}
          stroke="currentColor"
          strokeWidth={tick.major ? 1.1 : 0.6}
          strokeLinecap="round"
          opacity={tick.major ? 0.9 : 0.45}
        />
      ))}
    </g>
  );
}

export function ResponsiveLightOrb() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [nodeIndex, setNodeIndex] = useState(0);
  const scene = SCENES[sceneIndex];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let sceneId: number | undefined;
    let nodeId: number | undefined;

    const start = () => {
      if (sceneId != null) return;
      sceneId = window.setInterval(() => {
        setSceneIndex((prev) => (prev + 1) % SCENES.length);
      }, SCENE_MS);
      nodeId = window.setInterval(() => {
        setNodeIndex((prev) => (prev + 1) % NODES.length);
      }, NODE_MS);
    };

    const stop = () => {
      if (sceneId != null) {
        window.clearInterval(sceneId);
        sceneId = undefined;
      }
      if (nodeId != null) {
        window.clearInterval(nodeId);
        nodeId = undefined;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      },
      { threshold: 0.35 }
    );

    observer.observe(root);
    return () => {
      observer.disconnect();
      stop();
    };
  }, []);

  return (
    <figure
      ref={rootRef}
      className="respond-orb relative mx-auto aspect-square w-72 md:w-80"
      style={
        {
          '--respond-core': scene.core,
          '--respond-glow': scene.glow,
        } as CSSProperties
      }
      aria-label="Adaptive light commanded by app, voice, and smart switches — shifting from movie night to morning to a lived-in home."
    >
      <div className="respond-orb__bloom" aria-hidden />
      <div className="respond-orb__echo" aria-hidden />
      <div className="respond-orb__echo respond-orb__echo--late" aria-hidden />
      <div className="respond-orb__scanner" aria-hidden />

      <svg
        className="absolute inset-0 h-full w-full pointer-events-none"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden
      >
        <TickMarks />

        <circle
          cx="100"
          cy="100"
          r="78"
          className="respond-orb__track"
          stroke="currentColor"
          strokeWidth="0.6"
          strokeDasharray="2.2 5.4"
        />
        <circle
          cx="100"
          cy="100"
          r="58"
          className="text-gold/35"
          stroke="currentColor"
          strokeWidth="0.7"
        />
        <circle
          className="respond-orb__arc"
          cx="100"
          cy="100"
          r="68"
          strokeWidth="1.45"
          strokeLinecap="round"
          strokeDasharray="48 380"
        />
      </svg>

      <div className="respond-orb__core">
        <div className="respond-orb__fixture" aria-hidden>
          <span className="respond-orb__fixture-lens" />
        </div>
        <span
          key={scene.id}
          className="respond-orb__scene flex flex-col items-center"
        >
          <span className="font-serif text-lg md:text-xl text-cream font-light tracking-tight leading-none">
            {scene.label}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold mt-1.5">
            {scene.tone}
          </span>
        </span>
      </div>

      {NODES.map((node, index) => {
        const Icon = node.icon;
        const isActive = index === nodeIndex;
        const north = node.angle === -90;

        return (
          <div
            key={node.id}
            className={`respond-orb__node${isActive ? ' is-active' : ''}${north ? ' respond-orb__node--north' : ''}`}
            style={orbitPoint(node.angle)}
          >
            <div className="respond-orb__node-icon">
              <Icon className="respond-orb__node-glyph w-3.5 h-3.5" strokeWidth={1.6} aria-hidden />
            </div>
            <span className="respond-orb__node-label">{node.label}</span>
          </div>
        );
      })}
    </figure>
  );
}
