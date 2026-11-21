/**
 * Hero 3D scene: glossy extruded tech-stack logos around the QevoraTech logo tile.
 * A light wave sweeps left → right, filling each logo with its brand colour,
 * holds, then fades back to soft grey. Loops.
 *
 * - Logo paths come from `simple-icons` (CC0 path data; trademarks belong to their owners).
 * - No network: lighting is built from in-scene Lightformers, not an HDR download.
 * - Reduced motion: renders a single static frame with all logos coloured.
 */
import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Float, Lightformer, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import { siDocker, siKubernetes, siMongodb, siNodedotjs, siPython, siPytorch, siReact } from 'simple-icons';

// Generic filled cloud (24×24) — stands in for AWS, whose logo isn't licensed for modification.
const CLOUD_PATH =
  'M6.5 20A5.5 5.5 0 0 1 5.6 9.07 7 7 0 0 1 18.86 8.6 5.75 5.75 0 0 1 17.75 20Z';

type Logo = { name: string; path: string; hex: string };
const LOGOS: Logo[] = [
  { name: 'Python', path: siPython.path, hex: `#${siPython.hex}` },
  { name: 'PyTorch', path: siPytorch.path, hex: `#${siPytorch.hex}` },
  { name: 'React', path: siReact.path, hex: `#${siReact.hex}` },
  { name: 'Node.js', path: siNodedotjs.path, hex: `#${siNodedotjs.hex}` },
  // centre tile sits here
  { name: 'MongoDB', path: siMongodb.path, hex: `#${siMongodb.hex}` },
  { name: 'Docker', path: siDocker.path, hex: `#${siDocker.hex}` },
  { name: 'Kubernetes', path: siKubernetes.path, hex: `#${siKubernetes.hex}` },
  { name: 'Cloud', path: CLOUD_PATH, hex: '#FF9900' },
];

// Hand-placed arc: [x, y, z, tiltZ, scale]
const LAYOUT: [number, number, number, number, number][] = [
  [-5.1, -0.45, -0.7, 0.18, 1.0],
  [-3.95, 0.5, -0.35, -0.12, 1.0],
  [-2.85, -0.4, 0.15, 0.1, 1.05],
  [-1.95, 0.95, -0.4, -0.16, 0.85],
  [1.95, 0.95, -0.4, 0.16, 0.85],
  [2.85, -0.4, 0.15, -0.1, 1.05],
  [3.95, 0.5, -0.35, 0.12, 1.0],
  [5.1, -0.45, -0.7, -0.18, 1.0],
];

const BASE_GREY = new THREE.Color('#d2d3da');
const CYCLE = 6.5; // seconds per full wave loop
const STEP = 0.16; // delay between neighbouring logos

/** 0..1 brightness of logo `i` at time `t`: rise, hold, fade, rest. */
function waveIntensity(t: number, i: number) {
  const p = (((t - i * STEP) % CYCLE) + CYCLE) % CYCLE;
  const smooth = (x: number) => x * x * (3 - 2 * x);
  if (p < 0.5) return smooth(p / 0.5); // light up
  if (p < 4.6) return 1; // hold in brand colour
  if (p < 5.1) return 1 - smooth((p - 4.6) / 0.5); // quick fade
  return 0; // short grey rest before the next sweep
}

function extrudeSvgPath(d: string, viewBox = 24) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${viewBox} ${viewBox}"><path d="${d}"/></svg>`;
  const shapes = new SVGLoader().parse(svg).paths.flatMap((p) => p.toShapes());
  return finishGeometry(new THREE.ExtrudeGeometry(shapes, EXTRUDE), 1.15);
}

const EXTRUDE: THREE.ExtrudeGeometryOptions = {
  depth: 2.4,
  bevelEnabled: true,
  bevelThickness: 0.7,
  bevelSize: 0.35,
  bevelSegments: 5,
  curveSegments: 28,
};

/** Centre, flip SVG y-down → three y-up, and scale so the largest side equals `target` units. */
function finishGeometry(geo: THREE.ExtrudeGeometry, target: number) {
  geo.center();
  geo.rotateX(Math.PI); // rotation (not negative scale) keeps face winding intact
  geo.computeBoundingBox();
  const size = new THREE.Vector3();
  geo.boundingBox!.getSize(size);
  const k = target / Math.max(size.x, size.y);
  geo.scale(k, k, k);
  geo.computeVertexNormals();
  return geo;
}

/** QevoraTech mark (from the legacy 28×36 SVG), rebuilt as filled shapes for extrusion. */
function qevoraGeometry() {
  const capsule = (x1: number, y1: number, x2: number, y2: number, r: number) => {
    const a = Math.atan2(y2 - y1, x2 - x1);
    const s = new THREE.Shape();
    s.absarc(x2, y2, r, a - Math.PI / 2, a + Math.PI / 2, false);
    s.absarc(x1, y1, r, a + Math.PI / 2, a + (3 * Math.PI) / 2, false);
    return s;
  };
  const ring = (cx: number, cy: number, outer: number, inner: number) => {
    const s = new THREE.Shape();
    s.absarc(cx, cy, outer, 0, Math.PI * 2, false);
    const hole = new THREE.Path();
    hole.absarc(cx, cy, inner, 0, Math.PI * 2, true);
    s.holes.push(hole);
    return s;
  };
  const shapes = [
    capsule(2.25, 4.25, 2.25, 31.75, 2.25),
    ring(17, 9, 7.6, 4.4),
    capsule(18.5, 10.5, 22.5, 14.5, 1.5),
    ring(17, 27, 7.6, 4.4),
    capsule(18.5, 28.5, 22.5, 32.5, 1.5),
  ];
  const geo = new THREE.ExtrudeGeometry(shapes, { ...EXTRUDE, depth: 2.2 });
  return finishGeometry(geo, 1.0);
}

function LogoMesh({ logo, index, animate, spread }: { logo: Logo; index: number; animate: boolean; spread: number }) {
  const geometry = useMemo(() => extrudeSvgPath(logo.path), [logo.path]);
  const brand = useMemo(() => new THREE.Color(logo.hex), [logo.hex]);
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshPhysicalMaterial>(null);
  const [x, y, z, tilt, scale] = LAYOUT[index];

  useFrame(({ clock }) => {
    if (!mat.current || !mesh.current) return;
    const k = animate ? waveIntensity(clock.elapsedTime, index) : 1;
    mat.current.color.copy(BASE_GREY).lerp(brand, k);
    mat.current.emissive.copy(brand).multiplyScalar(k * 0.1);
    const s = scale * (1 + k * 0.06);
    mesh.current.scale.setScalar(s);
    mesh.current.rotation.y = Math.sin(clock.elapsedTime * 0.5 + index) * 0.25 + k * 0.15;
  });

  return (
    <Float enabled={animate} speed={1.2 + (index % 3) * 0.3} rotationIntensity={0.25} floatIntensity={0.5}>
      <mesh ref={mesh} geometry={geometry} position={[x * spread, y, z]} rotation={[0, 0, tilt]} castShadow>
        <meshPhysicalMaterial
          ref={mat}
          color={BASE_GREY}
          roughness={0.16}
          metalness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.06}
          envMapIntensity={1.35}
        />
      </mesh>
    </Float>
  );
}

function CentreTile({ ink }: { ink: string }) {
  const mark = useMemo(qevoraGeometry, []);
  return (
    <group position={[0, 0.05, 0.6]}>
      <RoundedBox args={[1.8, 1.8, 0.42]} radius={0.38} smoothness={8} castShadow>
        <meshPhysicalMaterial color={ink} roughness={0.22} clearcoat={1} clearcoatRoughness={0.1} envMapIntensity={0.8} />
      </RoundedBox>
      <mesh geometry={mark} position={[0, 0, 0.26]}>
        <meshPhysicalMaterial color="#ffffff" roughness={0.2} clearcoat={1} />
      </mesh>
    </group>
  );
}

function Scene({ animate, ink }: { animate: boolean; ink: string }) {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  // Phones: pull logos closer together so they can render larger.
  const narrow = viewport.width < 8;
  const spread = narrow ? 0.62 : 1;
  const fit = Math.min(1.05, viewport.width / (narrow ? 7.6 : 12));

  useFrame(({ pointer }, dt) => {
    if (!group.current || !animate) return;
    const g = group.current;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, pointer.x * 0.18, 3, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -pointer.y * 0.08, 3, dt);
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 6, 5]} intensity={1.6} castShadow />
      <group ref={group} scale={fit}>
        {LOGOS.map((logo, i) => (
          <LogoMesh key={logo.name} logo={logo} index={i} animate={animate} spread={spread} />
        ))}
        <CentreTile ink={ink} />
      </group>
      <ContactShadows position={[0, -1.45, 0]} opacity={0.22} scale={16} blur={3} far={3} />
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={2.5} position={[0, 5, 5]} rotation-x={-Math.PI / 3} scale={[12, 3, 1]} />
        <Lightformer form="rect" intensity={1.4} position={[-7, 1, 1]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} />
        <Lightformer form="rect" intensity={1.4} position={[7, 1, 1]} rotation-y={-Math.PI / 2} scale={[8, 3, 1]} />
        <Lightformer form="rect" intensity={0.8} position={[0, 0, 8]} scale={[10, 6, 1]} />
      </Environment>
    </>
  );
}

export default function TechLogos3D() {
  const reduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ink =
    (typeof window !== 'undefined' &&
      getComputedStyle(document.documentElement).getPropertyValue('--color-fg').trim()) ||
    '#18181b';

  return (
    <Canvas
      className="size-full"
      dpr={[1, 1.75]}
      frameloop={reduced ? 'demand' : 'always'}
      camera={{ position: [0, 0.2, 9], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
      aria-label="3D tech stack: Python, PyTorch, React, Node.js, MongoDB, Docker, Kubernetes and cloud around the QevoraTech logo"
      role="img"
    >
      <Scene animate={!reduced} ink={ink} />
    </Canvas>
  );
}
