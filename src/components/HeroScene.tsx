import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

function SceneFallback() {
  return (
    <div className="scene-fallback" aria-hidden="true">
      <svg viewBox="0 0 650 600" fill="none">
        <defs>
          <linearGradient id="chrome" x1="160" y1="140" x2="410" y2="420" gradientUnits="userSpaceOnUse"><stop stopColor="#8d958b" /><stop offset=".18" stopColor="#fafdf5" /><stop offset=".35" stopColor="#666e65" /><stop offset=".49" stopColor="#e8eee2" /><stop offset=".7" stopColor="#333e32" /><stop offset="1" stopColor="#bdc8b5" /></linearGradient>
          <linearGradient id="slash" x1="320" y1="190" x2="355" y2="390" gradientUnits="userSpaceOnUse"><stop stopColor="#d5ffa8" /><stop offset="1" stopColor="#679441" /></linearGradient>
        </defs>
        <g transform="rotate(-17 325 300)">
          <ellipse cx="325" cy="300" rx="285" ry="200" stroke="#a5bf8c" strokeOpacity=".18" transform="rotate(35 325 300)" />
          <ellipse cx="325" cy="300" rx="286" ry="165" stroke="#a5bf8c" strokeOpacity=".35" transform="rotate(-28 325 300)" />
          <path d="M242 203L143 294Q133 304 143 314L242 405L267 370L195 304L267 238Z" transform="translate(5 13)" fill="#3c4536" /><path d="M242 203L143 294Q133 304 143 314L242 405L267 370L195 304L267 238Z" fill="url(#chrome)" />
          <path d="M401 203L500 294Q510 304 500 314L401 405L375 370L447 304L375 238Z" transform="translate(5 13)" fill="#3c4536" /><path d="M401 203L500 294Q510 304 500 314L401 405L375 370L447 304L375 238Z" fill="url(#chrome)" />
          <path d="M338 181H378L313 424H273Z" fill="url(#slash)" /><circle cx="75" cy="212" r="5" fill="#c5f891" /><circle cx="559" cy="380" r="3" fill="#c5f891" />
        </g>
      </svg>
    </div>
  );
}

export default function HeroScene({ animate }: { animate: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const animateRef = useRef(animate);
  const [ready, setReady] = useState(false);
  useEffect(() => { animateRef.current = animate; }, [animate]);
  useEffect(() => {
    const container = host.current;
    if (!container) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' }); }
    catch { return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-8, 8, 4, -4, 0.1, 100);
    camera.position.set(0, 0, 14);
    const environment = new RoomEnvironment();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const environmentTarget = pmrem.fromScene(environment, 0.04);
    scene.environment = environmentTarget.texture;
    environment.dispose();
    pmrem.dispose();
    const chrome = new THREE.MeshPhysicalMaterial({ color: 0xd9e0d4, metalness: 1, roughness: 0.16, envMapIntensity: 1.75, clearcoat: 1, clearcoatRoughness: 0.12 });
    const lime = new THREE.MeshPhysicalMaterial({ color: 0xc4f68d, metalness: 0.43, roughness: 0.23, envMapIntensity: 1.1, clearcoat: 0.85 });
    const placement = new THREE.Group();
    const sculpture = new THREE.Group();
    scene.add(placement);
    placement.add(sculpture);

    // Beveled, extruded glyphs give the code its sculptural, reflected edges.
    const bracketShape = new THREE.Shape();
    bracketShape.moveTo(0.4, 1.03);
    bracketShape.lineTo(-0.64, 0.1);
    bracketShape.quadraticCurveTo(-0.74, 0, -0.64, -0.1);
    bracketShape.lineTo(0.4, -1.03);
    bracketShape.lineTo(0.7, -0.68);
    bracketShape.lineTo(-0.06, 0);
    bracketShape.lineTo(0.7, 0.68);
    bracketShape.closePath();
    const extrusion = { depth: 0.36, bevelEnabled: true, bevelSegments: 5, steps: 1, bevelSize: 0.105, bevelThickness: 0.1, curveSegments: 18 };
    const bracketGeometry = new THREE.ExtrudeGeometry(bracketShape, extrusion);
    bracketGeometry.center();
    const leftBracket = new THREE.Mesh(bracketGeometry, chrome);
    leftBracket.position.x = -1.56;
    leftBracket.rotation.y = -0.13;
    sculpture.add(leftBracket);
    const rightBracket = new THREE.Mesh(bracketGeometry, chrome);
    rightBracket.rotation.z = Math.PI;
    rightBracket.rotation.y = 0.17;
    rightBracket.position.x = 1.56;
    sculpture.add(rightBracket);
    const slashShape = new THREE.Shape();
    slashShape.moveTo(-0.58, -1.3);
    slashShape.lineTo(-0.19, -1.3);
    slashShape.lineTo(0.59, 1.3);
    slashShape.lineTo(0.2, 1.3);
    slashShape.closePath();
    const slashGeometry = new THREE.ExtrudeGeometry(slashShape, { ...extrusion, bevelSize: 0.08, bevelThickness: 0.09 });
    slashGeometry.center();
    const slash = new THREE.Mesh(slashGeometry, lime);
    slash.position.z = 0.2;
    sculpture.add(slash);
    const orbitGroup = new THREE.Group();
    placement.add(orbitGroup);
    const orbitMaterial = new THREE.MeshBasicMaterial({ color: 0xbad899, transparent: true, opacity: 0.23 });
    const orbitGeometry = new THREE.TorusGeometry(3.05, 0.008, 6, 180);
    const firstOrbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
    firstOrbit.rotation.set(0.82, -0.35, 0.1);
    orbitGroup.add(firstOrbit);
    const secondOrbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
    secondOrbit.rotation.set(-0.52, 0.9, -0.55);
    secondOrbit.scale.setScalar(1.09);
    orbitGroup.add(secondOrbit);
    const sphereGeometry = new THREE.SphereGeometry(0.042, 16, 16);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xd2ffa6 });
    const orbiter = new THREE.Mesh(sphereGeometry, sphereMaterial);
    firstOrbit.add(orbiter);
    const secondOrbiter = new THREE.Mesh(sphereGeometry, sphereMaterial);
    secondOrbiter.scale.setScalar(0.65);
    secondOrbit.add(secondOrbiter);
    scene.add(new THREE.AmbientLight(0xffffff, 1));
    const mainLight = new THREE.DirectionalLight(0xf5ffec, 4);
    mainLight.position.set(2, 6, 8);
    scene.add(mainLight);
    const greenLight = new THREE.PointLight(0xb5f780, 55, 20, 2);
    greenLight.position.set(3, -3, 4);
    placement.add(greenLight);
    const rimLight = new THREE.DirectionalLight(0xffffff, 3);
    rimLight.position.set(-5, 0, -1);
    scene.add(rimLight);

    let isVisible = true;
    let isPageVisible = !document.hidden;
    let time = 0;
    let lastTime = 0;
    let frame = 0;
    let mouseX = 0;
    let mouseY = 0;
    let smoothMouseX = 0;
    let smoothMouseY = 0;
    function updateObjects() {
      sculpture.rotation.set(0.12 + smoothMouseY * 0.1, -0.28 + Math.sin(time * 0.3) * 0.13 + smoothMouseX * 0.2, -0.21 + Math.sin(time * 0.38) * 0.035);
      sculpture.position.y = Math.sin(time * 0.65) * 0.105;
      orbitGroup.rotation.z = time * 0.022;
      orbiter.position.set(Math.cos(time * 0.22 + 1) * 3.05, Math.sin(time * 0.22 + 1) * 3.05, 0);
      secondOrbiter.position.set(Math.cos(-time * 0.17 + 3.6) * 3.05, Math.sin(-time * 0.17 + 3.6) * 3.05, 0);
    }
    function resize() {
      const width = container!.clientWidth;
      const height = container!.clientHeight;
      if (!width || !height) return;
      const mobile = width <= 700;
      const viewHeight = mobile ? 10.7 : 7.2;
      const viewWidth = viewHeight * width / height;
      camera.left = -viewWidth / 2;
      camera.right = viewWidth / 2;
      camera.top = viewHeight / 2;
      camera.bottom = -viewHeight / 2;
      camera.updateProjectionMatrix();
      placement.position.set(mobile ? 0.1 : viewWidth * 0.242, mobile ? -2.28 : 0.03, 0);
      placement.scale.setScalar((mobile ? Math.min(width / 430, 1) * 0.87 : width < 1050 ? 0.9 : 1.11) * 0.4);
      renderer.setSize(width, height);
      updateObjects();
      renderer.render(scene, camera);
    }
    function onPointerMove(event: PointerEvent) {
      if (!isVisible || !animateRef.current || event.pointerType === 'touch') return;
      mouseX = THREE.MathUtils.clamp((event.clientX / window.innerWidth - 0.5) * 2, -1, 1);
      mouseY = THREE.MathUtils.clamp((event.clientY / window.innerHeight - 0.5) * 2, -1, 1);
    }
    function onVisibilityChange() { isPageVisible = !document.hidden; }
    const visibilityObserver = new IntersectionObserver(([entry]) => { isVisible = entry.isIntersecting; }, { threshold: 0 });
    visibilityObserver.observe(container);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);
    const onContextLost = (event: Event) => { event.preventDefault(); setReady(false); };
    const onContextRestored = () => { resize(); setReady(true); };
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);
    renderer.domElement.addEventListener('webglcontextrestored', onContextRestored);
    function tick(now: number) {
      const delta = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 0;
      lastTime = now;
      if (isVisible && isPageVisible && animateRef.current) {
        time += delta;
        smoothMouseX += (mouseX - smoothMouseX) * 0.025;
        smoothMouseY += (mouseY - smoothMouseY) * 0.025;
        updateObjects();
        renderer.render(scene, camera);
      }
      frame = requestAnimationFrame(tick);
    }
    resize();
    setReady(true);
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', onContextRestored);
      bracketGeometry.dispose();
      slashGeometry.dispose();
      orbitGeometry.dispose();
      sphereGeometry.dispose();
      chrome.dispose();
      lime.dispose();
      orbitMaterial.dispose();
      sphereMaterial.dispose();
      environmentTarget.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);
  return <div className="hero-scene" aria-hidden="true">{!ready && <SceneFallback />}<div className={`webgl-canvas ${ready ? 'is-ready' : ''}`} ref={host} /></div>;
}