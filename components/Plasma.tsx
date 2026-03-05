import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';
import './Plasma.css';

const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 0.5, 0.2];
  return [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  ];
};

const vertex = `#version 300 es
precision highp float;
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform vec3 uCustomColor;
uniform float uUseCustomColor;
uniform float uSpeed;
uniform float uDirection;
uniform float uScale;
uniform float uOpacity;
uniform vec2 uMouse;
uniform float uMouseInteractive;
out vec4 fragColor;

void mainImage(out vec4 o, vec2 C) {
  vec2 center = iResolution.xy * 0.5;
  C = (C - center) / uScale + center;
  vec2 mouseOffset = (uMouse - center) * 0.0002;
  C += mouseOffset * length(C - center) * step(0.5, uMouseInteractive);
  float i, d, z, T = iTime * uSpeed * uDirection;
  vec3 O, p, S;
  for (vec2 r = iResolution.xy, Q; ++i < 60.; O += o.w/d*o.xyz) {
    p = z*normalize(vec3(C-.5*r,r.y));
    p.z -= 4.;
    S = p;
    d = p.y-T;
    p.x += .4*(1.+p.y)*sin(d + p.x*0.1)*cos(.34*d + p.x*0.05);
    Q = p.xz *= mat2(cos(p.y+vec4(0,11,33,0)-T));
    z+= d = abs(sqrt(length(Q*Q)) - .25*(5.+S.y))/3.+8e-4;
    o = 1.+sin(S.y+p.z*.5+S.z-length(S-p)+vec4(2,1,0,8));
  }
  o.xyz = tanh(O/1e4);
}

bool finite1(float x){ return !(isnan(x) || isinf(x)); }
vec3 sanitize(vec3 c){
  return vec3(
    finite1(c.r) ? c.r : 0.0,
    finite1(c.g) ? c.g : 0.0,
    finite1(c.b) ? c.b : 0.0
  );
}

void main() {
  vec4 o = vec4(0.0);
  mainImage(o, gl_FragCoord.xy);
  vec3 rgb = sanitize(o.rgb);
  float intensity = (rgb.r + rgb.g + rgb.b) / 3.0;
  vec3 customColor = intensity * uCustomColor;
  vec3 finalColor = mix(rgb, customColor, step(0.5, uUseCustomColor));
  float alpha = length(rgb) * uOpacity;
  fragColor = vec4(finalColor, alpha);
}`;

interface PlasmaProps {
  color?: string;
  speed?: number;
  direction?: 'forward' | 'reverse' | 'pingpong';
  scale?: number;
  opacity?: number;
  mouseInteractive?: boolean;
}

export const Plasma = ({
  color = '#ffffff',
  speed = 1,
  direction = 'forward',
  scale = 1,
  opacity = 1,
  mouseInteractive = true,
}: PlasmaProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const containerEl = containerRef.current;
    if (!containerEl) return;

    const useCustomColor = color ? 1.0 : 0.0;
    const customColorRgb = color ? hexToRgb(color) : [1, 1, 1] as [number, number, number];
    const directionMultiplier = direction === 'reverse' ? -1.0 : 1.0;

    const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1 : 1.5);

    const renderer = new Renderer({ webgl: 2, alpha: true, antialias: false, dpr });
    const gl = renderer.gl;
    const canvas = gl.canvas as HTMLCanvasElement;

    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';

    containerEl.appendChild(canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime:             { value: 0 },
        iResolution:       { value: new Float32Array([1, 1]) },
        uCustomColor:      { value: new Float32Array(customColorRgb) },
        uUseCustomColor:   { value: useCustomColor },
        uSpeed:            { value: speed * 0.4 },
        uDirection:        { value: directionMultiplier },
        uScale:            { value: scale },
        uOpacity:          { value: opacity },
        uMouse:            { value: new Float32Array([0, 0]) },
        uMouseInteractive: { value: mouseInteractive ? 1.0 : 0.0 },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    let mouseThrottleId: ReturnType<typeof setTimeout> | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseInteractive || mouseThrottleId) return;
      mouseThrottleId = setTimeout(() => {
        mouseThrottleId = null;
        const rect = containerEl.getBoundingClientRect();
        program.uniforms.uMouse.value[0] = e.clientX - rect.left;
        program.uniforms.uMouse.value[1] = e.clientY - rect.top;
      }, 32);
    };

    if (mouseInteractive) {
      containerEl.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    let resizeTid: ReturnType<typeof setTimeout> | null = null;
    const setSize = () => {
      const rect = containerEl.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      renderer.setSize(w, h);
      program.uniforms.iResolution.value[0] = gl.drawingBufferWidth;
      program.uniforms.iResolution.value[1] = gl.drawingBufferHeight;
    };

    const ro = new ResizeObserver(() => {
      if (resizeTid) clearTimeout(resizeTid);
      resizeTid = setTimeout(setSize, 100);
    });
    ro.observe(containerEl);
    setSize();

    let raf = 0;
    let paused = false;
    const t0 = performance.now();
    let pausedAt = 0;
    let totalPaused = 0;

    const loop = (t: number) => {
      if (paused) return;
      const elapsed = (t - t0 - totalPaused) * 0.001;

      if (direction === 'pingpong') {
        const dur = 10;
        const seg = elapsed % dur;
        const fwd = Math.floor(elapsed / dur) % 2 === 0;
        const u = seg / dur;
        const smooth = u * u * (3 - 2 * u);
        program.uniforms.uDirection.value = 1.0;
        program.uniforms.iTime.value = fwd ? smooth * dur : (1 - smooth) * dur;
      } else {
        program.uniforms.iTime.value = elapsed;
      }

      renderer.render({ scene: mesh });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onVisibilityChange = () => {
      if (document.hidden) {
        paused = true;
        pausedAt = performance.now();
        cancelAnimationFrame(raf);
      } else {
        totalPaused += performance.now() - pausedAt;
        paused = false;
        raf = requestAnimationFrame(loop);
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (mouseInteractive) containerEl.removeEventListener('mousemove', handleMouseMove);
      if (mouseThrottleId) clearTimeout(mouseThrottleId);
      if (resizeTid) clearTimeout(resizeTid);
      try { containerEl.removeChild(canvas); } catch { /* already removed */ }
    };
  }, [color, speed, direction, scale, opacity, mouseInteractive]);

  return <div ref={containerRef} className="plasma-container" />;
};

export default Plasma;

