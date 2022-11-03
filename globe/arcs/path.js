import * as THREE from "three";
import { Tube } from "./tube";
import { Impact } from "./impact";
import { LeadLight } from "./leadLight";
import { clamp } from "../utils";

const DRAW_MAX = 3000;

export function Path(coords, color) {
  this.mesh = new THREE.Object3D();

  // circle that appears at start and end of arc
  const startImpact = new Impact(coords[0], coords[1], color);
  const endImpact = new Impact(coords[2], coords[3], color);

  // the arc between latLngs
  const tube = new Tube(coords, pathMaterial.clone());
  tube.mesh.material.uniforms.color1.value = new THREE.Color(color);

  // glowing ball at head of arc
  const leadLight = new LeadLight(color);
  leadLight.setPosition(0, 0, 0);
  let time = 0;

  this.play = () => {
    // must be a power of 3!
    time += 45;

    // start impact circle
    if (time > 0) {
      const s = 0.5 + Math.sin(time / 800);
      startImpact.scale.set(s, s, s);
    }

    // animate arc line
    tube.geometry.setDrawRange(clamp(time - DRAW_MAX, 0, DRAW_MAX), time);

    // animate glowing ball at front of line
    const pt = tube.spline.getPointAt(time / (DRAW_MAX - 850));
    leadLight.setPosition(pt);

    // hide start impact circle
    if (time >= DRAW_MAX) {
      startImpact.scale.set(0);
    }

    // start end impact circle
    if (time >= DRAW_MAX - 750 && endImpact.scale.x == 0) {
      endImpact.scale.set(1, 1, 1);
    }

    // start hiding end impact circle
    if (time - DRAW_MAX >= DRAW_MAX) {
      const endScale = clamp(endImpact.scale.x - 0.02, 0.00001, 1);
      endImpact.scale.set(endScale, endScale, endScale);
    }

    // reset for new lines
    if (time >= DRAW_MAX * 3) {
      time = 0;
      startImpact.scale.set(0);
      endImpact.scale.set(0);
    }
  };

  this.mesh.add(
    tube.mesh,
    startImpact,
    endImpact,
    leadLight.light,
    leadLight.glowBall
  );
}

const pathMaterial = new THREE.ShaderMaterial({
  uniforms: {
    color1: {
      value: new THREE.Color(0xff0000),
    },
  },
  vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 color1;
    varying vec2 vUv;

    void main() {
      float a = smoothstep(0.0, 1.0, vUv.x);
      vec3 color2 = mix(vec3(1, 1, 0), color1, a);
      gl_FragColor = vec4(color2, 1.0);
    }
  `,
  transparent: true,
  depthWrite: false,
});
