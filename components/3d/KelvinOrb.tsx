'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useLightingStore } from '../../store/lightingStore';

export function KelvinOrb() {
  const containerRef = useRef<HTMLDivElement>(null);
  const kelvin = useLightingStore((state) => state.kelvin);
  const orbMaterialRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const glowMaterialRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const pointLightRef = useRef<THREE.PointLight | null>(null);
  const ringMaterialRefs = useRef<THREE.MeshBasicMaterial[]>([]);

  // Helper to map Kelvin scale to a real color representation
  const getKelvinColor = (temp: number): THREE.Color => {
    // Linear interpolate between warm (2700K) -> neutral (4000K) -> cool (6500K)
    const color = new THREE.Color();

    if (temp <= 4000) {
      // Interpolate between 2700K (#FF9E3D) and 4000K (#FFF9F2)
      const ratio = (temp - 2700) / (4000 - 2700);
      const warm = new THREE.Color('#FF9225');
      const neutral = new THREE.Color('#FAFAF8');
      color.lerpColors(warm, neutral, ratio);
    } else {
      // Interpolate between 4000K (#FAFAF8) and 6500K (#A6CEFF)
      const ratio = (temp - 4000) / (6500 - 4000);
      const neutral = new THREE.Color('#FAFAF8');
      const cool = new THREE.Color('#9ECEFF');
      color.lerpColors(neutral, cool, ratio);
    }
    return color;
  };

  // Keep colors updated in real-time when store state triggers
  useEffect(() => {
    const color = getKelvinColor(kelvin);
    if (orbMaterialRef.current) {
      orbMaterialRef.current.color.copy(color);
    }
    if (glowMaterialRef.current) {
      glowMaterialRef.current.color.copy(color);
    }
    if (pointLightRef.current) {
      pointLightRef.current.color.copy(color);
    }
    ringMaterialRefs.current.forEach((mat) => mat.color.copy(color));
  }, [kelvin]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear stale canvases from HMR / StrictMode double-mount
    container.replaceChildren();

    const getSize = () => {
      const width = container.clientWidth || 500;
      const height = container.clientHeight || 500;
      return { width, height };
    };

    const { width, height } = getSize();

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = null;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10);
    camera.position.z = 3.0;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    const initialColor = getKelvinColor(kelvin);

    // 4. Glowing Core Sphere
    const sphereGeo = new THREE.SphereGeometry(0.35, 64, 64);
    const orbMat = new THREE.MeshBasicMaterial({
      color: initialColor,
      transparent: true,
      opacity: 0.95
    });
    const orb = new THREE.Mesh(sphereGeo, orbMat);
    scene.add(orb);
    orbMaterialRef.current = orbMat;

    // Outer glow shell (additive blending)
    const glowGeo = new THREE.SphereGeometry(0.48, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: initialColor,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    scene.add(glow);
    glowMaterialRef.current = glowMat;

    // 5. Point Light inside the sphere reflecting on surrounding geometry if any
    const pointLight = new THREE.PointLight(initialColor, 3, 10);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);
    pointLightRef.current = pointLight;

    // 6. Three Outer Concentric Rings (different geometries, axes, speeds)
    const ringsGroup = new THREE.Group();

    // Ring 1 (Inner loop)
    const ring1Geo = new THREE.RingGeometry(0.6, 0.61, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: initialColor.clone(),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.55
    });
    const ring1 = new THREE.Mesh(ring1Geo, ringMat1);
    ring1.rotation.x = Math.PI / 4;
    ringsGroup.add(ring1);

    // Ring 2 (Middle accent loop)
    const ring2Geo = new THREE.RingGeometry(0.8, 0.815, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: initialColor.clone(),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75
    });
    const ring2 = new THREE.Mesh(ring2Geo, ringMat2);
    ring2.rotation.y = -Math.PI / 6;
    ringsGroup.add(ring2);

    // Ring 3 (Outer fine loop)
    const ring3Geo = new THREE.RingGeometry(1.05, 1.058, 64);
    const ringMat3 = new THREE.MeshBasicMaterial({
      color: initialColor.clone(),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35
    });
    const ring3 = new THREE.Mesh(ring3Geo, ringMat3);
    ring3.rotation.x = -Math.PI / 3;
    ring3.rotation.y = Math.PI / 8;
    ringsGroup.add(ring3);

    scene.add(ringsGroup);
    ringMaterialRefs.current = [ringMat1, ringMat2, ringMat3];

    // 7. Animation cycle
    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.01;

      // Pulse core point light intensity elegantly
      const pulseIntensity = Math.sin(time * 1.5) * 0.45 + 2.5;
      if (pointLightRef.current) {
        pointLightRef.current.intensity = pulseIntensity;
      }

      // Pulse glow scale slightly
      const glowScale = 1.0 + Math.sin(time * 3.0) * 0.03;
      glow.scale.set(glowScale, glowScale, glowScale);

      // Rotate rings on multiple axes at varying speeds
      ring1.rotation.z = time * 0.2;
      ring2.rotation.z = -time * 0.4;
      ring3.rotation.z = time * 0.08;

      // Slow orbital sway for secondary depth
      ringsGroup.rotation.x = Math.sin(time * 0.3) * 0.15;
      ringsGroup.rotation.y = Math.cos(time * 0.4) * 0.15;

      // Gentle floating for core
      orb.position.y = Math.sin(time * 0.8) * 0.04;
      glow.position.y = orb.position.y;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const { width: w, height: h } = getSize();
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    handleResize();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();

      ring1Geo.dispose();
      ringMat1.dispose();
      ring2Geo.dispose();
      ringMat2.dispose();
      ring3Geo.dispose();
      ringMat3.dispose();
      sphereGeo.dispose();
      orbMat.dispose();
      glowGeo.dispose();
      glowMat.dispose();
      renderer.dispose();
      renderer.forceContextLoss();

      orbMaterialRef.current = null;
      glowMaterialRef.current = null;
      pointLightRef.current = null;
      ringMaterialRefs.current = [];

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      container.replaceChildren();
    };
  }, []);

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center"
      style={{
        boxShadow: `0 0 100px ${getKelvinColor(kelvin).getStyle()}22`
      }}
    >
      {/* 3D WebGL Area */}
      <div 
        ref={containerRef} 
        id="kelvin-webgl-orb" 
        className="w-full h-full min-h-[400px] max-w-[560px] max-h-[560px] rounded-[2px] bg-surface-alt dark:bg-transparent" 
      />

      {/* Decorative Aura Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none rounded-full blur-3xl opacity-20 transform scale-75 transition-colors duration-500"
        style={{
          backgroundColor: getKelvinColor(kelvin).getStyle()
        }}
      />
    </div>
  );
}
