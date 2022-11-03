import * as THREE from "three";
import { coordinateToPosition, clamp } from "../utils";
import { geoInterpolate } from "d3-geo";
import { GLOBE_RADIUS } from "../constants";

const TUBE_RADIUS_SEGMENTS = 8;
const DEFAULT_TUBE_RADIUS = 0.4;
const CURVE_SEGMENTS = 44;
const CURVE_MIN_ALTITUDE = 80;
const CURVE_MAX_ALTITUDE = 80;

export function Tube(coords, material) {
  const { spline } = getSplineFromCoords(coords);
  this.geometry = new THREE.TubeGeometry(
    spline,
    CURVE_SEGMENTS,
    DEFAULT_TUBE_RADIUS,
    TUBE_RADIUS_SEGMENTS,
    false
  );

  this.geometry.setDrawRange(0, 0);
  this.mesh = new THREE.Mesh(this.geometry, material);
  this.spline = spline;
}

function getSplineFromCoords(coords) {
  const startLat = coords[0];
  const startLng = coords[1];
  const endLat = coords[2];
  const endLng = coords[3];

  // spline vertices
  const start = coordinateToPosition(startLat, startLng, GLOBE_RADIUS);
  const end = coordinateToPosition(endLat, endLng, GLOBE_RADIUS);
  const altitude = clamp(
    start.distanceTo(end) * 0.75,
    CURVE_MIN_ALTITUDE,
    CURVE_MAX_ALTITUDE
  );

  // return fn to get points in the middle of the the latLng "line"
  const interpolate = geoInterpolate([startLng, startLat], [endLng, endLat]);
  const midCoord1 = interpolate(0.25);
  const midCoord2 = interpolate(0.75);

  const mid1 = coordinateToPosition(
    midCoord1[1],
    midCoord1[0],
    GLOBE_RADIUS + altitude
  );
  const mid2 = coordinateToPosition(
    midCoord2[1],
    midCoord2[0],
    GLOBE_RADIUS + altitude
  );

  return {
    start,
    end,
    spline: new THREE.CubicBezierCurve3(start, mid1, mid2, end),
  };
}
