/**
 * Hero 3D scene — plain three.js (no React / React Three Fiber, which pulled the
 * whole of three.js and React DOM into the page).
 *
 * Glossy extruded tech-stack logos around the QevoraTech logo tile. A light wave
 * sweeps left → right, filling each logo with its brand colour, holds, then fades
 * back to soft grey. Logos float gently and the scene tilts towards the pointer.
 *
 * Visual parity with the previous R3F version: same renderer defaults (ACES tone
 * mapping, sRGB output, camera looking at the origin), drei's ContactShadows /
 * RoundedBox / Float maths ported 1:1, same baked studio lighting.
 *
 * - Logo paths: `simple-icons` (CC0 path data; trademarks belong to their owners).
 * - Phones / touch: fewer polygons, standard material, lower pixel ratio, no MSAA.
 * - Stops rendering while off-screen; a single static frame for reduced motion.
 */
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import { HorizontalBlurShader } from 'three/examples/jsm/shaders/HorizontalBlurShader.js';
import { VerticalBlurShader } from 'three/examples/jsm/shaders/VerticalBlurShader.js';
import { toCreasedNormals } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { siDocker, siKubernetes, siMongodb, siNodedotjs, siPython, siPytorch, siReact } from 'simple-icons';

// Generic filled cloud (24×24) — stands in for AWS, whose logo isn't licensed for modification.
const CLOUD_PATH = 'M6.5 20A5.5 5.5 0 0 1 5.6 9.07 7 7 0 0 1 18.86 8.6 5.75 5.75 0 0 1 17.75 20Z';

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

const LITE =
  window.matchMedia('(max-width: 767px)').matches || window.matchMedia('(pointer: coarse)').matches;

/** 0..1 brightness of logo `i` at time `t`: rise, hold, fade, rest. */
function waveIntensity(t: number, i: number) {
  const p = (((t - i * STEP) % CYCLE) + CYCLE) % CYCLE;
  const smooth = (x: number) => x * x * (3 - 2 * x);
  if (p < 0.5) return smooth(p / 0.5); // light up
  if (p < 4.6) return 1; // hold in brand colour
  if (p < 5.1) return 1 - smooth((p - 4.6) / 0.5); // quick fade
  return 0; // short grey rest before the next sweep
}

// ---------- geometry ----------

const EXTRUDE: THREE.ExtrudeGeometryOptions = {
  depth: 2.4,
  bevelEnabled: true,
  bevelThickness: 0.7,
  bevelSize: 0.35,
  bevelSegments: LITE ? 2 : 5,
  curveSegments: LITE ? 10 : 28,
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

function extrudeSvgPath(d: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${d}"/></svg>`;
  const shapes = new SVGLoader().parse(svg).paths.flatMap((p) => p.toShapes());
  return finishGeometry(new THREE.ExtrudeGeometry(shapes, EXTRUDE), 1.15);
}

/** QevoraTech mark (28×36 SVG), rebuilt as filled shapes for extrusion. */
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
  return finishGeometry(new THREE.ExtrudeGeometry(shapes, { ...EXTRUDE, depth: 2.2 }), 1.0);
}

/** Port of drei's RoundedBoxGeometry (extruded rounded rect + creased normals). */
function roundedBoxGeometry(width: number, height: number, depth: number, radius: number, smoothness: number) {
  const eps = 0.00001;
  const r = radius - eps;
  const shape = new THREE.Shape();
  shape.absarc(eps, eps, eps, -Math.PI / 2, -Math.PI, true);
  shape.absarc(eps, height - r * 2, eps, Math.PI, Math.PI / 2, true);
  shape.absarc(width - r * 2, height - r * 2, eps, Math.PI / 2, 0, true);
  shape.absarc(width - r * 2, eps, eps, 0, -Math.PI / 2, true);
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: depth - radius * 2,
    bevelEnabled: true,
    bevelSegments: 8,
    steps: 1,
    bevelSize: radius - eps,
    bevelThickness: radius,
    curveSegments: smoothness,
  });
  geo.center();
  return toCreasedNormals(geo, 0.4);
}

// ---------- lighting ----------

/** Four glowing studio panels baked once into a prefiltered environment map. */
function studioEnvironment(renderer: THREE.WebGLRenderer) {
  const PANELS: [number, [number, number, number], [number, number, number], [number, number]][] = [
    [2.5, [0, 5, 5], [-Math.PI / 3, 0, 0], [12, 3]],
    [1.4, [-7, 1, 1], [0, Math.PI / 2, 0], [8, 3]],
    [1.4, [7, 1, 1], [0, -Math.PI / 2, 0], [8, 3]],
    [0.8, [0, 0, 8], [0, 0, 0], [10, 6]],
  ];
  const studio = new THREE.Scene();
  const plane = new THREE.PlaneGeometry(1, 1);
  const mats: THREE.Material[] = [];
  for (const [intensity, position, rotation, scale] of PANELS) {
    const m = new THREE.MeshBasicMaterial({
      color: new THREE.Color(1, 1, 1).multiplyScalar(intensity),
      side: THREE.DoubleSide,
      toneMapped: false,
    });
    mats.push(m);
    const panel = new THREE.Mesh(plane, m);
    panel.position.set(...position);
    panel.rotation.set(...rotation);
    panel.scale.set(scale[0], scale[1], 1);
    studio.add(panel);
  }
  const pmrem = new THREE.PMREMGenerator(renderer);
  const target = pmrem.fromScene(studio, 0, 0.1, 100);
  pmrem.dispose();
  plane.dispose();
  mats.forEach((m) => m.dispose());
  return target;
}

/** Port of drei's ContactShadows, baked once (frames = 1). */
function contactShadows(opts: { scale: number; far: number; blur: number; opacity: number; resolution: number }) {
  const { scale, far, blur, opacity, resolution } = opts;
  const rt = new THREE.WebGLRenderTarget(resolution, resolution);
  const rtBlur = new THREE.WebGLRenderTarget(resolution, resolution);
  rt.texture.generateMipmaps = rtBlur.texture.generateMipmaps = false;
  const planeGeometry = new THREE.PlaneGeometry(scale, scale).rotateX(Math.PI / 2);
  const blurPlane = new THREE.Mesh(planeGeometry);
  const depthMaterial = new THREE.MeshDepthMaterial();
  depthMaterial.depthTest = depthMaterial.depthWrite = false;
  depthMaterial.onBeforeCompile = (shader) => {
    shader.uniforms = { ...shader.uniforms, ucolor: { value: new THREE.Color('#000000') } };
    shader.fragmentShader = shader.fragmentShader.replace('void main() {', 'uniform vec3 ucolor;\nvoid main() {');
    shader.fragmentShader = shader.fragmentShader.replace(
      'vec4( vec3( 1.0 - fragCoordZ ), opacity );',
      'vec4( ucolor * fragCoordZ * 2.0, ( 1.0 - fragCoordZ ) * 1.0 );',
    );
  };
  const hBlur = new THREE.ShaderMaterial(HorizontalBlurShader);
  const vBlur = new THREE.ShaderMaterial(VerticalBlurShader);
  hBlur.depthTest = vBlur.depthTest = false;

  const group = new THREE.Group();
  group.rotation.x = Math.PI / 2;
  const shadowMesh = new THREE.Mesh(
    planeGeometry,
    new THREE.MeshBasicMaterial({ transparent: true, map: rt.texture, opacity, depthWrite: false }),
  );
  shadowMesh.scale.set(1, -1, 1);
  shadowMesh.rotation.set(-Math.PI / 2, 0, 0);
  const camera = new THREE.OrthographicCamera(-scale / 2, scale / 2, scale / 2, -scale / 2, 0, far);
  group.add(shadowMesh, camera);

  const blurPass = (renderer: THREE.WebGLRenderer, amount: number) => {
    blurPlane.visible = true;
    blurPlane.material = hBlur;
    hBlur.uniforms.tDiffuse.value = rt.texture;
    hBlur.uniforms.h.value = amount / 256;
    renderer.setRenderTarget(rtBlur);
    renderer.render(blurPlane, camera);
    blurPlane.material = vBlur;
    vBlur.uniforms.tDiffuse.value = rtBlur.texture;
    vBlur.uniforms.v.value = amount / 256;
    renderer.setRenderTarget(rt);
    renderer.render(blurPlane, camera);
    blurPlane.visible = false;
  };

  const bake = (renderer: THREE.WebGLRenderer, scene: THREE.Scene) => {
    group.updateMatrixWorld(true);
    const bg = scene.background;
    const override = scene.overrideMaterial;
    group.visible = false;
    scene.background = null;
    scene.overrideMaterial = depthMaterial;
    renderer.setRenderTarget(rt);
    renderer.render(scene, camera);
    blurPass(renderer, blur);
    blurPass(renderer, blur * 0.4);
    renderer.setRenderTarget(null);
    group.visible = true;
    scene.overrideMaterial = override;
    scene.background = bg;
  };

  return { group, bake };
}

// ---------- scene ----------

export function mount(container: HTMLElement) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const animate = !reduced;
  const ink = getComputedStyle(document.documentElement).getPropertyValue('--color-fg').trim() || '#18181b';

  // Renderer — same defaults React Three Fiber used.
  const renderer = new THREE.WebGLRenderer({ antialias: !LITE, alpha: true, powerPreference: 'high-performance' });
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.style.display = 'block';
  canvas.style.width = canvas.style.height = '100%';
  canvas.setAttribute('role', 'img');
  canvas.setAttribute(
    'aria-label',
    '3D tech stack: Python, PyTorch, React, Node.js, MongoDB, Docker, Kubernetes and cloud around the QevoraTech logo',
  );
  container.appendChild(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 1000);
  camera.position.set(0, 0.2, 9);
  camera.lookAt(0, 0, 0);

  const env = studioEnvironment(renderer);
  scene.environment = env.texture;
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const sun = new THREE.DirectionalLight(0xffffff, 1.6);
  sun.position.set(3, 6, 5);
  scene.add(sun);

  const root = new THREE.Group();
  scene.add(root);

  // Logos
  const logos = LOGOS.map((logo, i) => {
    const material = LITE
      ? new THREE.MeshStandardMaterial({ color: BASE_GREY, roughness: 0.22, metalness: 0.05, envMapIntensity: 1.35 })
      : new THREE.MeshPhysicalMaterial({
          color: BASE_GREY,
          roughness: 0.16,
          metalness: 0.05,
          clearcoat: 1,
          clearcoatRoughness: 0.06,
          envMapIntensity: 1.35,
        });
    const mesh = new THREE.Mesh(extrudeSvgPath(logo.path), material);
    const [, y, z, tilt] = LAYOUT[i];
    mesh.position.set(0, y, z); // x is set by layout()
    mesh.rotation.set(0, 0, tilt);
    const float = new THREE.Group(); // drei <Float> wrapper
    float.add(mesh);
    root.add(float);
    return {
      mesh,
      material,
      float,
      brand: new THREE.Color(logo.hex),
      floatSpeed: 1.2 + (i % 3) * 0.3,
      floatOffset: Math.random() * 10000,
    };
  });

  // Centre tile
  const tile = new THREE.Group();
  tile.position.set(0, 0.05, 0.6);
  tile.add(
    new THREE.Mesh(
      roundedBoxGeometry(1.8, 1.8, 0.42, 0.38, LITE ? 4 : 8),
      new THREE.MeshPhysicalMaterial({ color: ink, roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.1, envMapIntensity: 0.8 }),
    ),
  );
  const mark = new THREE.Mesh(qevoraGeometry(), new THREE.MeshPhysicalMaterial({ color: '#ffffff', roughness: 0.2, clearcoat: 1 }));
  mark.position.z = 0.26;
  tile.add(mark);
  root.add(tile);

  const shadows = contactShadows({ scale: 16, far: 3, blur: 3, opacity: 0.22, resolution: LITE ? 256 : 512 });
  shadows.group.position.set(0, -1.45, 0);
  scene.add(shadows.group);

  // Layout depends on the visible width at z = 0 (R3F's `viewport.width`).
  const layout = () => {
    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, LITE ? 1.25 : 1.75));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const distance = camera.position.length();
    const viewportWidth = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * distance * camera.aspect;
    const narrow = viewportWidth < 8; // phones: pull logos closer so they can render larger
    const spread = narrow ? 0.62 : 1;
    root.scale.setScalar(Math.min(1.05, viewportWidth / (narrow ? 7.6 : 12)));
    logos.forEach((l, i) => (l.mesh.position.x = LAYOUT[i][0] * spread));
  };

  // Pointer, normalised to -1..1 over the canvas (like R3F's `pointer`).
  const pointer = new THREE.Vector2();
  const onPointerMove = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  };

  const clock = new THREE.Clock();
  let shadowsBaked = false;

  const update = (dt: number) => {
    const t = clock.elapsedTime;
    logos.forEach((l, i) => {
      if (animate) {
        // drei <Float speed rotationIntensity={0.25} floatIntensity={0.5}>
        const ft = l.floatOffset + t;
        l.float.rotation.set(
          (Math.cos((ft / 4) * l.floatSpeed) / 8) * 0.25,
          (Math.sin((ft / 4) * l.floatSpeed) / 8) * 0.25,
          (Math.sin((ft / 4) * l.floatSpeed) / 20) * 0.25,
        );
        l.float.position.y = (Math.sin((ft / 4) * l.floatSpeed) / 10) * 0.5;
      }
      const k = animate ? waveIntensity(t, i) : 1;
      l.material.color.copy(BASE_GREY).lerp(l.brand, k);
      l.material.emissive.copy(l.brand).multiplyScalar(k * 0.1);
      l.mesh.scale.setScalar(LAYOUT[i][4] * (1 + k * 0.06));
      l.mesh.rotation.y = Math.sin(t * 0.5 + i) * 0.25 + k * 0.15;
    });
    if (animate) {
      root.rotation.y = THREE.MathUtils.damp(root.rotation.y, pointer.x * 0.18, 3, dt);
      root.rotation.x = THREE.MathUtils.damp(root.rotation.x, -pointer.y * 0.08, 3, dt);
    }
  };

  const render = () => {
    const dt = clock.getDelta();
    update(dt);
    if (!shadowsBaked) {
      shadows.bake(renderer, scene); // once, like <ContactShadows frames={1} />
      shadowsBaked = true;
    }
    renderer.render(scene, camera);
  };

  let running = false;
  const start = () => {
    if (running || reduced) return;
    running = true;
    clock.getDelta(); // don't jump after a pause
    renderer.setAnimationLoop(render);
  };
  const stop = () => {
    running = false;
    renderer.setAnimationLoop(null);
  };

  layout();
  const ro = new ResizeObserver(() => {
    layout();
    if (!running) render();
  });
  ro.observe(container);
  const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()));
  io.observe(container);
  if (animate) window.addEventListener('pointermove', onPointerMove, { passive: true });

  render(); // first frame immediately (and the only one for reduced motion)

  return () => {
    stop();
    ro.disconnect();
    io.disconnect();
    window.removeEventListener('pointermove', onPointerMove);
    env.dispose();
    renderer.dispose();
    canvas.remove();
  };
}
