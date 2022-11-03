import * as THREE from "three";
import { GLOBE_RADIUS, COLORS } from "../constants";
import { pointShaderMaterial } from "./pointShader";

export function PointGlobe(count) {
  const pointGeom = new THREE.SphereGeometry(GLOBE_RADIUS + 1, 140, 140);

  const shouldPulse = []; // some dots pulse
  const shouldFade = []; // some dots fade

  const delay = new Float32Array(count);
  const isPulse = new Float32Array(count);
  const isFade = new Float32Array(count);

  const points = new THREE.Points(pointGeom, pointShaderMaterial);

  points.geometry.setAttribute(
    "isPulse",
    new THREE.BufferAttribute(isPulse, 1)
  );

  points.geometry.setAttribute("isFade", new THREE.BufferAttribute(isFade, 1));
  points.geometry.setAttribute("delay", new THREE.BufferAttribute(delay, 1));

  points.position.set(0, 0, 0);

  for (let i = 0; i < count; i++) {
    shouldPulse[i] = Math.random() > 0.7;
    shouldFade[i] = Math.random() > 0.5;
    delay[i] = Math.random() * 100;
  }

  const clock = new THREE.Clock();
  let time = 0;

  this.render = function () {
    time += clock.getDelta();
    points.material.uniforms.shift.value += 0.01;

    for (let i = 0; i < points.geometry.attributes.isPulse.array.length; i++) {
      if (shouldPulse[i]) {
        points.geometry.attributes.isPulse.array[i] = 1.0;
        points.geometry.attributes.isPulse.needsUpdate = true;
      }

      if (shouldFade[i]) {
        points.geometry.attributes.isFade.array[i] = 1.0;
        points.geometry.attributes.isFade.needsUpdate = true;
      }
    }
  };

  this.mesh = points;
}
