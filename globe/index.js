import { init as initScene } from "./scene";
import { init as initSphere } from "./sphere";
import { init as initPaths } from "./arcs";
import { init as initZoomies } from "./zoomies";
import Stats from "stats.js";

const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

// singleton
let instanceOfGlobe = null;

export class Globe {
  static newInstanceOf(container, showZoomies, showGlobe) {
    if (!instanceOfGlobe)
      instanceOfGlobe = new Globe(container, showZoomies, showGlobe);
    return instanceOfGlobe;
  }

  constructor(container, showZoomies = false, showGlobe = true) {
    const {
      play: sceneRender,
      renderer,
      camera,
      rootMesh,
      scene,
    } = initScene(container);

    this.sceneRender = sceneRender;

    if (showGlobe) this.sphereRender = initSphere();

    this.zoomiesRender = initZoomies();
    this.pathRender = initPaths(rootMesh);

    document.addEventListener(
      "keydown",
      this.handleKeyEvents.bind(this),
      false
    );

    this.container = container;
    this.renderer = renderer;
    this.camera = camera;
    this.scene = scene;
    this.animationFrame = null;
    this.showPaths = true;
    this.showZoomies = showZoomies;
    this.showGlobe = showGlobe;
    // const dci = new THREE.DrawCallInspector(renderer, scene, camera, {});
    // dci.mount();
  }

  play() {
    stats.begin();
    this.sceneRender();

    if (this.showGlobe) {
      this.sphereRender();
      if (this.showPaths) this.pathRender();
    }

    if (this.showZoomies) this.zoomiesRender();

    // dci.update();
    // dci.begin();
    this.renderer.render(this.scene, this.camera);
    // dci.end();

    stats.end();

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
