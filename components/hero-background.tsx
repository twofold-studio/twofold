"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const fragmentShader = `
uniform float iTime,isDark,iScroll;
uniform vec2 iResolution;
uniform vec3 color1Start,color2Start,color3Start,color1End,color2End,color3End;
#define W vec3(1)
#define D .08
#define O1 vec2(D*.25,0)
#define O2 vec2(.015,.005)
#define O3 vec2(D*.5,.015)
float h(float n){return fract(sin(n)*43758.5453123);}
float wave(vec2 p,float d,float o){return 1.-smoothstep(0.,d,distance(p.x,.5+sin(o+p.y*3.)*.15));}
vec3 cols(float s){return vec3(0);}
vec4 bD(vec2 p,float o,float s){
  vec3 c1=mix(color1Start,color1End,s),c2=mix(color2Start,color2End,s),c3=mix(color3Start,color3End,s);
  return vec4(c1*wave(p+O1,D,o)+c2*wave(p-O2,D,o)+c3*wave(p-O3,D,o),1);
}
vec4 bDG(vec2 p,float o,float s){
  vec3 c1=mix(color1Start,color1End,s),c2=mix(color2Start,color2End,s),c3=mix(color3Start,color3End,s);
  float d=D*2.5;
  return vec4(c1*wave(p+O1,d,o)+c2*wave(p-O2,d,o)+c3*wave(p-O3,d,o),1);
}
vec4 bL(vec2 p,float o,float s){
  vec3 c1=mix(color1Start,color1End,s),c2=mix(color2Start,color2End,s),c3=mix(color3Start,color3End,s);
  return vec4(mix(W,c1,wave(p+O1,D,o))*mix(W,c2,wave(p-O2,D,o))*mix(W,c3,wave(p-O3,D,o)),1);
}
vec4 bLG(vec2 p,float o,float s){
  vec3 c1=mix(color1Start,color1End,s),c2=mix(color2Start,color2End,s),c3=mix(color3Start,color3End,s);
  float d=D*2.5;
  return vec4(mix(W,c1,wave(p+O1,d,o))*mix(W,c2,wave(p-O2,d,o))*mix(W,c3,wave(p-O3,d,o)),1);
}
vec2 rot(vec2 p,float a){float s=sin(a),c=cos(a);return vec2(p.x*c-p.y*s,p.x*s+p.y*c);}
float crt(vec2 u,float t){
  float sc=.95+.05*sin((u.y+t*.05)*iResolution.y*1.5);
  float fl=.99+.01*sin(t*8.);
  vec2 ct=u-vec2(iResolution.x/iResolution.y*.5,.5);
  return sc*fl*(1.-dot(ct,ct)*.15);
}
float ease(float t){float m=1.-t;return 1.-m*m*m*m;}
float prog(float i,float t){return ease(clamp((t-i*.2)/3.5,0.,1.));}
float mask(vec2 p,float pr){float th=mix(2.5,-1.,(p.x+p.y)*.5);return smoothstep(mix(2.5,-1.,pr)-.4,mix(2.5,-1.,pr),(p.x+p.y)*.5);}
float beam(float y,float t,float i){
  float sp=.08+h(i*7.3)*.06,ph=h(i*13.7)*10.,by=fract(t*sp+ph),dw=min(abs(y-by),1.-abs(y-by));
  return exp(-dw*dw*25.)*.8;
}
void main(){
  vec2 uv=gl_FragCoord.xy/iResolution.y,su=gl_FragCoord.xy/iResolution.xy;

  // === WAVE SCALE (larger = waves appear smaller/zoomed out) ===
  float sc=1.1;

  float ar=iResolution.x/iResolution.y;

  // === LEFT/RIGHT OFFSET (larger = waves move more to the right) ===
  float xOffset=0.7;

  uv=uv*sc-vec2(ar*xOffset*sc,.5*sc);
  uv=rot(uv,radians(mix(-55.,-120.,iScroll)));
  uv.y+=.5*sc;
  float bf=smoothstep(0.,.25,su.y),t=iTime*.1;
  float p1=prog(0.,iTime),p2=prog(1.,iTime),p3=prog(2.,iTime);
  float m1=mask(uv,p1),m2=mask(uv+vec2(.3,0),p2),m3=mask(uv+vec2(.6,0),p3);
  float cr=crt(su,iTime);
  float b1=beam(su.y,iTime,0.),b2=beam(su.y,iTime,1.),b3=beam(su.y,iTime,2.);
  vec2 u2=uv+vec2(.3,0),u3=uv+vec2(.6,0);
  if(isDark>.5){
    vec4 w1=bD(uv,t,iScroll)*m1,w2=bD(u2,t,iScroll)*m2,w3=bD(u3,t,iScroll)*m3;
    float l1=min(1.,w1.r+w1.g+w1.b),l2=min(1.,w2.r+w2.g+w2.b),l3=min(1.,w3.r+w3.g+w3.b);
    w1.rgb+=vec3(1,.9,.95)*b1*l1;w2.rgb+=vec3(.9,.85,1)*b2*l2;w3.rgb+=vec3(.85,.9,1)*b3*l3;
    vec4 wv=(w1+w2+w3)*.5;
    vec4 g1=bDG(uv,t,iScroll)*m1,g2=bDG(u2,t,iScroll)*m2,g3=bDG(u3,t,iScroll)*m3;
    vec4 gl=(g1+g2+g3)*.5;
    vec3 fc=wv.rgb+gl.rgb*.35;
    float wi=min(1.,wv.r+wv.g+wv.b),gi=min(1.,gl.r+gl.g+gl.b);
    float a=smoothstep(0.,.15,gi)*smoothstep(.05,.4,wi+gi*.5)*bf;
    fc*=mix(1.,cr,smoothstep(0.,.5,wi));
    gl_FragColor=vec4(fc,a);
  }else{
    vec4 r1=bL(uv,t,iScroll),r2=bL(u2,t,iScroll),r3=bL(u3,t,iScroll);
    vec3 w1=mix(W,r1.rgb,m1),w2=mix(W,r2.rgb,m2),w3=mix(W,r3.rgb,m3);
    float l1=1.-r1.r*r1.g*r1.b,l2=1.-r2.r*r2.g*r2.b,l3=1.-r3.r*r3.g*r3.b;
    w1=mix(w1,W,b1*l1*.5);w2=mix(w2,W,b2*l2*.5);w3=mix(w3,W,b3*l3*.5);
    vec3 wv=w1*w2*w3;
    vec4 g1=bLG(uv,t,iScroll),g2=bLG(u2,t,iScroll),g3=bLG(u3,t,iScroll);
    vec3 gl=mix(W,g1.rgb,m1)*mix(W,g2.rgb,m2)*mix(W,g3.rgb,m3);
    vec3 fc=mix(wv,gl,.2);
    fc*=mix(1.,cr,1.-fc.r*fc.g*fc.b);
    fc=mix(W,fc,bf);
    gl_FragColor=vec4(fc,1);
  }
}
`;

const vertexShader = `
void main() {
    gl_Position = vec4(position, 1.0);
}
`;

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result && result[1] && result[2] && result[3]) {
    return [
      parseInt(result[1], 16) / 255,
      parseInt(result[2], 16) / 255,
      parseInt(result[3], 16) / 255,
    ];
  }
  return [1, 1, 1];
}

interface ColorSet {
  color1: string;
  color2: string;
  color3: string;
}

interface ShaderPlaneProps {
  isDark: boolean;
  startColors: ColorSet;
  endColors: ColorSet;
  onReady: () => void;
}

// Arkada green, Bukinistika brass, Helios forest; scrolling turns them toward the blue of Vilian's own site.
const defaultStartColors = {
  color1: "#2c6e4a",
  color2: "#a8823f",
  color3: "#16543a",
};

const defaultEndColors = {
  color1: "#2457a8",
  color2: "#2c6e4a",
  color3: "#a8823f",
};

function ShaderPlane({
  isDark,
  startColors,
  endColors,
  onReady,
}: ShaderPlaneProps) {
  const readyRef = useRef(false);
  const frameRef = useRef(0);
  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);
  const handleRendered = () => {
    if (readyRef.current) return;
    readyRef.current = true;
    frameRef.current = requestAnimationFrame(onReady);
  };
  const meshRef = useRef<THREE.Mesh>(null);
  const { size, gl } = useThree();
  const defaultStart = defaultStartColors;
  const defaultEnd = defaultEndColors;

  const uniforms = useMemo(
    () => ({
      iTime: { value: 0 },
      iResolution: {
        // Filled from the renderer's actual drawing buffer before painting.
        value: new THREE.Vector2(1, 1),
      },
      isDark: { value: 1.0 },
      iScroll: { value: 0.0 },
      color1Start: {
        value: new THREE.Vector3(
          ...hexToRgb(startColors?.color1 ?? defaultStart.color1)
        ),
      },
      color2Start: {
        value: new THREE.Vector3(
          ...hexToRgb(startColors?.color2 ?? defaultStart.color2)
        ),
      },
      color3Start: {
        value: new THREE.Vector3(
          ...hexToRgb(startColors?.color3 ?? defaultStart.color3)
        ),
      },
      color1End: {
        value: new THREE.Vector3(
          ...hexToRgb(endColors?.color1 ?? defaultEnd.color1)
        ),
      },
      color2End: {
        value: new THREE.Vector3(
          ...hexToRgb(endColors?.color2 ?? defaultEnd.color2)
        ),
      },
      color3End: {
        value: new THREE.Vector3(
          ...hexToRgb(endColors?.color3 ?? defaultEnd.color3)
        ),
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms.isDark) {
        material.uniforms.isDark.value = isDark ? 1.0 : 0.0;
      }
    }
  }, [isDark]);

  useEffect(() => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      const u = material.uniforms;
      if (
        u.color1Start &&
        u.color2Start &&
        u.color3Start &&
        u.color1End &&
        u.color2End &&
        u.color3End
      ) {
        u.color1Start.value.set(...hexToRgb(startColors.color1));
        u.color2Start.value.set(...hexToRgb(startColors.color2));
        u.color3Start.value.set(...hexToRgb(startColors.color3));
        u.color1End.value.set(...hexToRgb(endColors.color1));
        u.color2End.value.set(...hexToRgb(endColors.color2));
        u.color3End.value.set(...hexToRgb(endColors.color3));
      }
    }
  }, [startColors, endColors]);

  useEffect(() => {
    const handleScroll = () => {
      if (meshRef.current) {
        const material = meshRef.current.material as THREE.ShaderMaterial;
        if (material.uniforms.iScroll) {
          const scrollProgress = Math.min(
            1,
            window.scrollY / window.innerHeight
          );
          const eased =
            scrollProgress * scrollProgress * (3 - 2 * scrollProgress);
          material.uniforms.iScroll.value = eased;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms.iResolution) {
        // Use actual framebuffer size (includes device pixel ratio)
        const drawingBufferSize = gl.getDrawingBufferSize(new THREE.Vector2());
        material.uniforms.iResolution.value.set(
          drawingBufferSize.x,
          drawingBufferSize.y
        );
      }
    }
  }, [size, gl]);

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms.iTime) {
        material.uniforms.iTime.value = state.clock.elapsedTime;
      }
    }
  });

  return (
    <mesh ref={meshRef} onAfterRender={handleRendered}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}

export function HeroBackground({
  startColors,
  endColors,
  onReady,
}: {
  startColors?: Partial<ColorSet>;
  endColors?: Partial<ColorSet>;
  onReady: () => void;
}) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const mergedStartColors = { ...defaultStartColors, ...startColors };
  const mergedEndColors = { ...defaultEndColors, ...endColors };
  return (
    <Canvas
      className="h-full w-full"
      style={{ pointerEvents: "none" }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 1] }}
      onCreated={({ gl, size }) => {
        gl.setSize(size.width, size.height);
      }}
      resize={{ scroll: false }}
      gl={{ antialias: false, powerPreference: "high-performance" }}
    >
      <ShaderPlane
        onReady={onReady}
        isDark={isDark}
        startColors={mergedStartColors}
        endColors={mergedEndColors}
      />
    </Canvas>
  );
}
