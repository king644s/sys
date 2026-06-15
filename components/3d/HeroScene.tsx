'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglError, setWebglError] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Check for WebGL support
    const canvasTest = document.createElement('canvas');
    const gl = canvasTest.getContext('webgl') || canvasTest.getContext('experimental-webgl');
    if (!gl) {
      setWebglError(true);
      return;
    }

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 1. Scene & Setup
    const scene = new THREE.Scene();
    scene.background = null; // transparent background so our CSS gradient shines through

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    // Position slightly above and to the right
    camera.position.set(2, 2.5, 5);
    camera.lookAt(0, 0.5, 0);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);

    // 4. Floating Spotlight Fixture geometry
    const fixtureGroup = new THREE.Group();

    // Spotlight arm (upper cylinder)
    const armGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.5, 16);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xC9A96E, // Gold
      metalness: 0.9,
      roughness: 0.15,
      bumpScale: 0.05
    });
    const armMesh = new THREE.Mesh(armGeo, goldMat);
    armMesh.position.y = 1.6;
    fixtureGroup.add(armMesh);

    // Spotlight head (cylinder)
    const headGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.5, 32);
    const darkMat = new THREE.MeshStandardMaterial({
      color: 0x18181D, // Charcoal body
      metalness: 0.8,
      roughness: 0.2
    });
    const headMesh = new THREE.Mesh(headGeo, darkMat);
    headMesh.position.y = 1.25;
    headMesh.rotation.x = Math.PI / 6; // Angled down
    fixtureGroup.add(headMesh);

    // Gold rim on head
    const rimGeo = new THREE.CylinderGeometry(0.205, 0.205, 0.05, 32);
    const rimMesh = new THREE.Mesh(rimGeo, goldMat);
    rimMesh.position.y = 1.05;
    rimMesh.rotation.x = Math.PI / 6;
    fixtureGroup.add(rimMesh);

    // Inner glowing ring
    const emitGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.02, 32);
    const emitMat = new THREE.MeshBasicMaterial({ color: 0xF5F0E8 });
    const emitMesh = new THREE.Mesh(emitGeo, emitMat);
    emitMesh.position.y = 1.03;
    emitMesh.rotation.x = Math.PI / 6;
    fixtureGroup.add(emitMesh);

    scene.add(fixtureGroup);

    // 5. Volumetric Light Cone
    const coneGroup = new THREE.Group();
    // Volumetric cone geometry
    const coneGeo = new THREE.ConeGeometry(1.5, 4.0, 32, 1, true);
    // Shift pivot origin to apex
    coneGeo.translate(0, -2, 0);
    const coneMat = new THREE.MeshBasicMaterial({
      color: 0xC9A96E,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    const coneMesh = new THREE.Mesh(coneGeo, coneMat);
    coneMesh.position.set(0, 1.0, 0);
    // Angle exactly aligned with our spotlight head
    coneMesh.rotation.x = Math.PI / 6; 
    coneGroup.add(coneMesh);
    scene.add(coneGroup);

    // 6. Ground Reflective Plane
    const groundGeo = new THREE.PlaneGeometry(12, 12);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x0A0A0B,
      roughness: 0.4,
      metalness: 0.7
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = -1.2;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // 7. Light Sources
    // True spot point light
    const spotLight = new THREE.SpotLight(0xF5F0E8, 12, 10, Math.PI / 5, 0.5, 1);
    spotLight.position.set(0, 1.0, 0.1);
    spotLight.target.position.set(0, -1.2, -0.6);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    scene.add(spotLight);
    scene.add(spotLight.target);

    // Amber fill point lights for luxury room ambiance
    const pointLightGold = new THREE.PointLight(0xC9A96E, 1.5, 8);
    pointLightGold.position.set(-2, 1.5, 1);
    scene.add(pointLightGold);

    const pointLightWhite = new THREE.PointLight(0xFAFAF8, 0.8, 6);
    pointLightWhite.position.set(2, 0.8, -1);
    scene.add(pointLightWhite);

    // 8. Dusty motes particles flowing through light beam
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const driftSpeeds: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      // Confine randomly inside a cone radius space
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 1.5;
      const x = Math.cos(angle) * radius;
      const y = (Math.random() * 3.5) - 1.2;
      const z = Math.sin(angle) * radius - (y * 0.2); // slight slant tracking beam

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      driftSpeeds.push(0.002 + Math.random() * 0.005);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    // Soft glowing circle for particles
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 16;
    pCanvas.height = 16;
    const pCtx = pCanvas.getContext('2d');
    if (pCtx) {
      const grad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, 'rgba(245, 240, 232, 1)');
      grad.addColorStop(1, 'rgba(245, 240, 232, 0)');
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 16, 16);
    }
    const particleTex = new THREE.CanvasTexture(pCanvas);

    const particleMat = new THREE.PointsMaterial({
      color: 0xE8C98A,
      size: 0.12,
      transparent: true,
      opacity: 0.8,
      map: particleTex,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 9. Camera swoops on mount
    let startTime = Date.now();
    const duration = 1500; // ms

    // Interactivity: Mouse move offsets
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) - 0.5;
      mouseY = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Interactivity: Scroll-based camera drop
    let scrollYOffset = 0;
    const handleScroll = () => {
      scrollYOffset = window.scrollY / window.innerHeight;
    };
    window.addEventListener('scroll', handleScroll);

    // 10. Animation Loop
    let animationFrameId: number;
    let runOrbit = true;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = (Date.now() - startTime);
      const timeSecs = elapsedTime * 0.001;

      // Mount swooping animation
      if (elapsedTime < duration) {
        const progress = elapsedTime / duration;
        // Cubic ease out
        const ease = 1 - Math.pow(1 - progress, 3);
        camera.position.y = 5 - (ease * 2.5); // go from y=5 down to 2.5
        camera.position.z = 7 - (ease * 2);   // go from z=7 forward to 5
      } else {
        // Continuous subtle camera orbit + mouse coordinate lerping
        const angle = timeSecs * 0.015; // super slow orbit
        const targetX = 2 * Math.cos(angle) + (mouseX * 0.8);
        const targetZ = 5 * Math.sin(angle) + (mouseX * 0.8);
        const targetY = 2.5 + (mouseY * 0.5) - (scrollYOffset * 1.5); // Scroll lowers camera

        // Lerp camera coordinates
        camera.position.x += (targetX - camera.position.x) * 0.03;
        camera.position.y += (targetY - camera.position.y) * 0.03;
        camera.position.z += (targetZ - camera.position.z) * 0.03;
      }
      camera.lookAt(0, 0.4, 0);

      // Float spotlight fixture gently
      fixtureGroup.position.y = Math.sin(timeSecs * 0.8) * 0.03;
      fixtureGroup.rotation.y = Math.cos(timeSecs * 0.5) * 0.03;
      
      // Update volumetric light cone position slightly to follow cylinder
      coneGroup.position.y = fixtureGroup.position.y;
      coneGroup.rotation.y = fixtureGroup.rotation.y;

      // Animate particles drifting down and swaying
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const positionsArray = posAttr.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        // Update Y (downwards drift)
        positionsArray[i * 3 + 1] -= driftSpeeds[i];
        
        // Sway X/Z
        positionsArray[i * 3] += Math.sin(timeSecs + i) * 0.001;
        positionsArray[i * 3 + 2] += Math.cos(timeSecs - i) * 0.001;

        // Reset if falling below ground level
        if (positionsArray[i * 3 + 1] < -1.1) {
          positionsArray[i * 3 + 1] = 2.0;
          positionsArray[i * 3] = (Math.random() * 2) - 1;
          positionsArray[i * 3 + 2] = (Math.random() * 2) - 1;
        }
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose materials/geometries
      armGeo.dispose();
      goldMat.dispose();
      headGeo.dispose();
      darkMat.dispose();
      rimGeo.dispose();
      emitGeo.dispose();
      emitMat.dispose();
      coneGeo.dispose();
      coneMat.dispose();
      groundGeo.dispose();
      groundMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      particleTex.dispose();
      renderer.dispose();
    };
  }, []);

  if (webglError) {
    // Elegant fallback: highly atmospheric dark room lit by a luxurious single beam
    return (
      <div 
        id="hero-fallback"
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(250,249,246,1) 0%, rgba(250,249,246,0.5) 40%, rgba(250,249,246,0.9) 100%), url('https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1600&auto=format&fit=crop')`
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#FAF9F6_100%)] opacity-80" />
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      id="hero-3d-scene" 
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
