import {
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, useGLTF } from "@react-three/drei";
import * as THREE from "three";

import SmokeText, { CUP_PHRASES, useSectionTheme } from "./SmokeText";

useGLTF.preload("/models/coffee_cup_final.glb");

const CUP_FILL = 0.78;

const CAMERA_KEYS = [
  { p: 0.0, azimuth: 0.5, elevation: 0.45, radiusMul: 1.0, lookY: 0.02 },
  { p: 0.25, azimuth: 1.2, elevation: 0.55, radiusMul: 0.95, lookY: 0.03 },
  { p: 0.5, azimuth: 2.0, elevation: 1.15, radiusMul: 0.85, lookY: 0.07 },
  { p: 0.75, azimuth: 3.2, elevation: 0.5, radiusMul: 0.95, lookY: 0.03 },
  { p: 1.0, azimuth: 4.2, elevation: 0.42, radiusMul: 1.0, lookY: 0.02 },
];

function lerpKeys(progress, keys, baseRadius) {
  const p = THREE.MathUtils.clamp(progress, 0, 1);
  let i = 0;
  while (i < keys.length - 2 && p > keys[i + 1].p) i++;
  const a = keys[i];
  const b = keys[i + 1];
  const t = a.p === b.p ? 0 : (p - a.p) / (b.p - a.p);
  const ease = t * t * (3 - 2 * t);
  return {
    azimuth: THREE.MathUtils.lerp(a.azimuth, b.azimuth, ease),
    elevation: THREE.MathUtils.lerp(a.elevation, b.elevation, ease),
    radius: baseRadius * THREE.MathUtils.lerp(a.radiusMul, b.radiusMul, ease),
    lookY: THREE.MathUtils.lerp(a.lookY, b.lookY, ease),
  };
}

function fitCameraDistance(camera, sphere, aspect, fill = CUP_FILL) {
  const fovRad = (camera.fov * Math.PI) / 180;
  const hFov = 2 * Math.atan(Math.tan(fovRad / 2) * aspect);
  const distV = sphere.radius / Math.sin(fovRad / 2);
  const distH = sphere.radius / Math.sin(hFov / 2);
  return Math.max(distV, distH) / fill;
}

function CupModel({ baseRadiusRef, shadowYRef }) {
  const { scene } = useGLTF("/models/coffee_cup_final.glb");
  const { camera, size } = useThree();

  const model = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) child.material = child.material.clone();
      }
    });
    return clone;
  }, [scene]);

  useLayoutEffect(() => {
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.set(-center.x, -center.y, -center.z);
    const fitted = new THREE.Box3().setFromObject(model);
    const sphere = fitted.getBoundingSphere(new THREE.Sphere());
    baseRadiusRef.current = fitCameraDistance(
      camera,
      sphere,
      size.width / Math.max(size.height, 1)
    );
    shadowYRef.current = fitted.min.y;
  }, [model, camera, size, baseRadiusRef, shadowYRef]);

  return <primitive object={model} />;
}

function CameraRig({ scrollRef, baseRadiusRef }) {
  const { camera } = useThree();
  const lookTarget = useRef(new THREE.Vector3(0, 0.02, 0));

  useFrame((_, delta) => {
    const { azimuth, elevation, radius, lookY } = lerpKeys(
      scrollRef.current,
      CAMERA_KEYS,
      baseRadiusRef.current || 1.2
    );
    lookTarget.current.y = THREE.MathUtils.lerp(
      lookTarget.current.y,
      lookY,
      Math.min(1, delta * 5)
    );
    const cosEl = Math.cos(elevation);
    const damp = Math.min(1, delta * 4);
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      Math.sin(azimuth) * cosEl * radius,
      damp
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      Math.sin(elevation) * radius,
      damp
    );
    camera.position.z = THREE.MathUtils.lerp(
      camera.position.z,
      Math.cos(azimuth) * cosEl * radius,
      damp
    );
    camera.lookAt(lookTarget.current);
  });

  return null;
}

function Scene({ scrollRef, baseRadiusRef, shadowYRef }) {
  const shadowY = shadowYRef.current ?? -1.5;

  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 6, 5]} intensity={1.3} castShadow />
      <directionalLight position={[-3, 2, -2]} intensity={0.35} color="#d4a574" />
      <Environment preset="apartment" environmentIntensity={0.12} />
      <CupModel baseRadiusRef={baseRadiusRef} shadowYRef={shadowYRef} />
      <ContactShadows
        position={[0, shadowY + 0.02, 0]}
        opacity={0.25}
        scale={4}
        blur={2.5}
        far={3}
      />
      <CameraRig scrollRef={scrollRef} baseRadiusRef={baseRadiusRef} />
    </>
  );
}

export default function CoffeeCupCanvas({ scrollRef, className = "" }) {
  const baseRadiusRef = useRef(1.2);
  const shadowYRef = useRef(-1.5);

  return (
    <div className={className}>
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ fov: 22, near: 0.01, far: 100, position: [0.6, 0.5, 1.2] }}
        gl={{ antialias: true, alpha: true }}
        className="!h-full !w-full"
      >
        <Suspense fallback={null}>
          <Scene
            scrollRef={scrollRef}
            baseRadiusRef={baseRadiusRef}
            shadowYRef={shadowYRef}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export function useScrollProgress(containerRef) {
  const scrollRef = useRef(0);

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    let ticking = false;
    let rafId;

    const update = () => {
      const rect = container.getBoundingClientRect();
      const scrollable = container.scrollHeight - window.innerHeight;
      scrollRef.current =
        scrollable > 0
          ? Math.min(1, Math.max(0, -rect.top) / scrollable)
          : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [containerRef]);

  return scrollRef;
}

export function StickyCoffeeCup({ scrollRef }) {
  const theme = useSectionTheme();
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [pop, setPop] = useState(false);

  const phrase = CUP_PHRASES[phraseIndex % CUP_PHRASES.length];

  const handleCupClick = () => {
    setPop(true);
    setPhraseIndex((i) => (i + 1) % CUP_PHRASES.length);
    setTimeout(() => setPop(false), 350);
  };

  return (
    <div className="pointer-events-none fixed right-3 bottom-3 z-30 hidden lg:block xl:right-6 xl:bottom-6">
      <div className="relative h-[min(42vh,380px)] w-[min(280px,22vw)]">
        {/* Cup — clickable */}
        <button
          type="button"
          onClick={handleCupClick}
          aria-label={`Coffee cup. Steam says: ${phrase}. Click to change message.`}
          className="pointer-events-auto absolute inset-x-0 bottom-0 h-[88%] cursor-pointer border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-latte/60 focus-visible:ring-offset-2"
        >
          <CoffeeCupCanvas scrollRef={scrollRef} className="h-full w-full" />
        </button>

        {/* Smoke text — display only */}
        <div className="pointer-events-none absolute bottom-[52%] left-1/2 z-30 -translate-x-1/2">
          <SmokeText variant={theme} phrase={phrase} pop={pop} />
        </div>
      </div>
    </div>
  );
}
