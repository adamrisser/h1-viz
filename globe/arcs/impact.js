import * as THREE from "three";
import { GLOBE_RADIUS } from "../constants";
import { calcPosFromLatLonRad } from "../utils";

const radius = 8.0;

export function Impact(lat, lng, color) {
  const geom = new THREE.CircleGeometry(radius, 32);
  const box = new THREE.Mesh(geom, impactMaterial.clone());

  // pass these to the shader
  box.material.uniforms.color1.value = new THREE.Color(color);
  box.material.uniforms.radius.value = radius;

  // place on the globe
  box.position.set(...calcPosFromLatLonRad(lat, lng, GLOBE_RADIUS + 0.1));

  // make sure the geom is tangential to the sphere
  box.lookAt(new THREE.Vector3(0, 0, 0));

  // hide it until it animates in
  box.scale.set(0, 0, 0);

  return box;
}

const impactMaterial = new THREE.ShaderMaterial({
  uniforms: {
    color1: {
      value: new THREE.Color(0xffffff),
    },
    radius: {
      value: 8.0,
    },
  },
  vertexShader: `
    varying vec2 vPosition;

    void main() {
      vPosition = vec2(position.x, position.y);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 color1;
    uniform float radius;
    varying vec2 vPosition;
    
    void main() {
      float a = 1. - smoothstep(.0, radius, sqrt(dot(vPosition, vPosition)));
      gl_FragColor = vec4(color1, a - 0.4);
    }
  `,
  transparent: true,
  side: THREE.DoubleSide,
});
