import * as THREE from "three";
import { init as initScene } from "./scene";
import { init as initZoomies } from "./zoomies";
// import Stats from "stats.js";

// const stats = new Stats();
// stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
// document.body.appendChild(stats.dom);

// singleton
let instanceOfGlobe = null;

export class Onboarding {
  static newInstanceOf(container, showZoomies) {
    if (!instanceOfGlobe)
      instanceOfGlobe = new Onboarding(container, showZoomies);
    return instanceOfGlobe;
  }

  constructor(container) {
    const { play: sceneRender, renderer, camera, scene } = initScene(container);
    this.sceneRender = sceneRender;

    this.zoomiesRender = initZoomies();

    this.container = container;
    this.renderer = renderer;
    this.camera = camera;
    this.scene = scene;
    this.animationFrame = null;
    this.zoomies = [];
  }

  play() {
    this.sceneRender();

    this.zoomiesRender();

    this.renderer.render(this.scene, this.camera);

    this.animationFrame = requestAnimationFrame(() => this.play());
  }

  handleKeyEvents({ which: keyCode }) {
    if (keyCode == 49) this.showZoomies = !this.showZoomies;
    else if (keyCode == 50) this.showPaths = !this.showPaths;
  }

  dispose() {
    console.log("dispose");
    this.renderer.dispose();
    cancelAnimationFrame(this.animationFrame);
  }
}
