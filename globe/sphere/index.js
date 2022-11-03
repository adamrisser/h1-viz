import * as THREE from "three";
import { GLOBE_RADIUS, COLORS } from "../constants";
import { rootMesh } from "../scene";
import { createGlowMesh } from "./halo";

import { PointGlobe } from "./pointGlobe";

// The globe consists of 3 elements:
// 1. A sphere that represents the earth
// 2. Sphere of points for the countries
// 3. Halo effect to smooth the edge

export function init() {
  console.log("init sphere");
  const globe = createGlobe(COLORS.sapphire);
  const points = new PointGlobe(globe.geometry.attributes.position.count);

  const halo = createGlowMesh(globe.geometry, {
    backside: true,
    color: COLORS.sand,
    size: GLOBE_RADIUS,
    power: 20.0, // dispersion
    coefficient: 0.09,
  });

  rootMesh.add(globe, points.mesh, halo);

  return points.render;
}

function createGlobe(color) {
  const geom = new THREE.SphereGeometry(GLOBE_RADIUS, 140, 140);
  const mat = new THREE.MeshLambertMaterial({ color });
  const globe = new THREE.Mesh(geom, mat);
  return globe;
}
