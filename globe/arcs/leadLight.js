import * as THREE from "three";
import { COLORS } from "../constants";

export function LeadLight(color) {
  this.light = new THREE.PointLight(COLORS.plum, 5, 100);
  this.glowBall = createSphere(color);
  this.setPosition = ({ x, y, z }) => {
    this.light.position.set(x, y, z);
    this.glowBall.position.set(x, y, z);
  };
}

const particleTexture = new THREE.TextureLoader().load("/glow-sprite.png");

function createSphere(color) {
  const spriteMaterial = new THREE.SpriteMaterial({
    map: particleTexture,
    color: color,
    depthWrite: false,
    transparent: true,
    opacity: 0.8, // translucent particles
    blending: THREE.AdditiveBlending, // "glowing" particles
  });

  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(32, 32, 1.0); // imageWidth, imageHeight
  // sprite.material.color.setHSL( Math.random(), 0.9, 0.7 );

  return sprite;
}
