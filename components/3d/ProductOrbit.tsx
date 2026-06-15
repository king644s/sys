'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ProductOrbitProps {
  shape: 'spotlight' | 'track' | 'linear' | 'deep' | 'zoom' | 'bollard';
  isHovered: boolean;
  accentColor?: string;
}

function createProxyModel(
  shape: ProductOrbitProps['shape'],
  matteDarkMaterial: THREE.MeshStandardMaterial,
  brassMaterial: THREE.MeshStandardMaterial,
  glassEmissiveMat: THREE.MeshBasicMaterial
): THREE.Group {
  const objectGroup = new THREE.Group();

  if (shape === 'spotlight') {
    const barrelGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.6, 32);
    const barrel = new THREE.Mesh(barrelGeo, matteDarkMaterial);
    barrel.rotation.x = Math.PI / 4;
    objectGroup.add(barrel);

    const bracketGeo = new THREE.TorusGeometry(0.35, 0.03, 16, 48, Math.PI);
    const bracket = new THREE.Mesh(bracketGeo, brassMaterial);
    bracket.position.y = 0.05;
    objectGroup.add(bracket);

    const mountGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.08, 16);
    const mount = new THREE.Mesh(mountGeo, matteDarkMaterial);
    mount.position.y = 0.4;
    objectGroup.add(mount);
  } else if (shape === 'track') {
    const railGeo = new THREE.BoxGeometry(0.5, 0.06, 0.1, 8);
    const rail = new THREE.Mesh(railGeo, matteDarkMaterial);
    rail.position.y = 0.45;
    objectGroup.add(rail);

    const armGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.18, 16);
    const arm = new THREE.Mesh(armGeo, brassMaterial);
    arm.position.y = 0.35;
    objectGroup.add(arm);

    const headGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.5, 32);
    const head = new THREE.Mesh(headGeo, matteDarkMaterial);
    head.position.y = 0.1;
    head.rotation.z = Math.PI / 6;
    objectGroup.add(head);

    const goldBandGeo = new THREE.CylinderGeometry(0.165, 0.165, 0.06, 32);
    const goldBand = new THREE.Mesh(goldBandGeo, brassMaterial);
    goldBand.position.set(-0.1, -0.07, 0);
    goldBand.rotation.z = Math.PI / 6;
    objectGroup.add(goldBand);
  } else if (shape === 'linear') {
    const profileGeo = new THREE.BoxGeometry(0.8, 0.12, 0.12);
    const profile = new THREE.Mesh(profileGeo, matteDarkMaterial);
    objectGroup.add(profile);

    const slitGeo = new THREE.BoxGeometry(0.78, 0.02, 0.124);
    const slit = new THREE.Mesh(slitGeo, glassEmissiveMat);
    slit.position.y = -0.052;
    objectGroup.add(slit);

    const cableGeo = new THREE.CylinderGeometry(0.005, 0.005, 0.4, 8);
    const cableL = new THREE.Mesh(cableGeo, brassMaterial);
    cableL.position.set(-0.35, 0.25, 0);
    const cableR = cableL.clone();
    cableR.position.x = 0.35;
    objectGroup.add(cableL);
    objectGroup.add(cableR);
  } else if (shape === 'deep') {
    const canGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.45, 32);
    const can = new THREE.Mesh(canGeo, matteDarkMaterial);
    objectGroup.add(can);

    const flangeGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.03, 32);
    const flange = new THREE.Mesh(flangeGeo, brassMaterial);
    flange.position.y = -0.21;
    objectGroup.add(flange);

    const emitterGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.02, 16);
    const emitter = new THREE.Mesh(emitterGeo, glassEmissiveMat);
    emitter.position.y = 0.1;
    objectGroup.add(emitter);
  } else if (shape === 'zoom') {
    const bodyGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.4, 32);
    const body = new THREE.Mesh(bodyGeo, matteDarkMaterial);
    body.position.y = 0.1;
    objectGroup.add(body);

    const telescopeGeo = new THREE.CylinderGeometry(0.20, 0.20, 0.3, 32);
    const telescope = new THREE.Mesh(telescopeGeo, brassMaterial);
    telescope.position.y = -0.15;
    objectGroup.add(telescope);

    const jointGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const joint = new THREE.Mesh(jointGeo, matteDarkMaterial);
    joint.position.y = 0.32;
    objectGroup.add(joint);
  } else {
    const stemGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.8, 32);
    const stem = new THREE.Mesh(stemGeo, matteDarkMaterial);
    objectGroup.add(stem);

    const ringGeo = new THREE.CylinderGeometry(0.122, 0.122, 0.1, 32);
    const ring = new THREE.Mesh(ringGeo, brassMaterial);
    ring.position.y = 0.25;
    objectGroup.add(ring);

    const slitGeo = new THREE.CylinderGeometry(0.11, 0.11, 0.08, 32);
    const slit = new THREE.Mesh(slitGeo, glassEmissiveMat);
    slit.position.y = 0.34;
    objectGroup.add(slit);

    const capGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.04, 32);
    const cap = new THREE.Mesh(capGeo, matteDarkMaterial);
    cap.position.y = 0.4;
    objectGroup.add(cap);
  }

  return objectGroup;
}

function centerAndFrameObject(
  objectGroup: THREE.Group,
  camera: THREE.PerspectiveCamera
): THREE.Vector3 {
  const boundingBox = new THREE.Box3().setFromObject(objectGroup);
  const center = boundingBox.getCenter(new THREE.Vector3());
  objectGroup.position.sub(center);

  const fittedBox = new THREE.Box3().setFromObject(objectGroup);
  const fittedSphere = fittedBox.getBoundingSphere(new THREE.Sphere());
  const fitOffset = 1.2;
  const fovRad = (camera.fov * Math.PI) / 180;
  const cameraDistance = Math.max(
    (fittedSphere.radius * fitOffset) / Math.tan(fovRad / 2),
    1.5
  );

  camera.position.set(0, 0, cameraDistance);
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix();

  return objectGroup.position.clone();
}

export function ProductOrbit({ shape, isHovered, accentColor = '#C9A96E' }: ProductOrbitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(isHovered);
  isHoveredRef.current = isHovered;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear stale canvases from HMR / StrictMode double-mount
    container.replaceChildren();

    let animationFrameId = 0;
    let resizeObserver: ResizeObserver | null = null;

    const getSize = () => {
      const width = container.clientWidth || 300;
      const height = container.clientHeight || 240;
      return { width, height };
    };

    const { width, height } = getSize();

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 10);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'low-power',
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x737680, 1.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xF5F0E8, 2.5);
    dirLight.position.set(2, 2, 2);
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0xE8C98A, 1.5);
    fillLight.position.set(-2.5, 1, -1.5);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(new THREE.Color(accentColor), 3.0, 5);
    rimLight.position.set(-2, -1.5, 1);
    scene.add(rimLight);

    const matteDarkMaterial = new THREE.MeshStandardMaterial({
      color: 0x4E515C,
      roughness: 0.3,
      metalness: 0.85,
    });
    const brassMaterial = new THREE.MeshStandardMaterial({
      color: 0xC9A96E,
      roughness: 0.15,
      metalness: 0.95,
    });
    const glassEmissiveMat = new THREE.MeshBasicMaterial({
      color: 0xFFFDF0,
    });

    const objectGroup = createProxyModel(shape, matteDarkMaterial, brassMaterial, glassEmissiveMat);
    scene.add(objectGroup);

    const basePosition = centerAndFrameObject(objectGroup, camera);

    let targetRotationY = 0;
    let currentRotationY = 0;
    let time = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.01;

      const hovered = isHoveredRef.current;
      targetRotationY = hovered
        ? Math.PI / 5 + Math.sin(time) * 0.06
        : Math.sin(time * 0.5) * 0.12;

      if (hovered) {
        dirLight.position.x = 2 + Math.cos(time * 2) * 0.8;
        dirLight.intensity = 3.5;
      } else {
        dirLight.position.set(2, 2, 2);
        dirLight.intensity = 2.5;
      }

      currentRotationY += (targetRotationY - currentRotationY) * 0.12;
      objectGroup.rotation.y = currentRotationY;
      objectGroup.position.y = basePosition.y + Math.sin(time * 1.5) * 0.02;

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

    resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    handleResize();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver?.disconnect();

      matteDarkMaterial.dispose();
      brassMaterial.dispose();
      glassEmissiveMat.dispose();
      objectGroup.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
        }
      });

      renderer.dispose();
      renderer.forceContextLoss();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      container.replaceChildren();
    };
  }, [shape, accentColor]);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full pointer-events-none overflow-hidden"
    />
  );
}
