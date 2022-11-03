import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const CAMERA_Z_MIN = 1;
const CAMERA_Z_MAX = 10000;
const _cameraZ = 800;

export const scene = new THREE.Scene();
export const rootMesh = new THREE.Mesh();

let camera;
export const getCamera = () => camera;

export function init(container) {
  const width = container.offsetWidth || window.innerWidth;
  const height = container.offsetHeight || window.innerHeight;
  camera = new THREE.PerspectiveCamera(
    30,
    width / height,
    CAMERA_Z_MIN,
    CAMERA_Z_MAX
  );

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });

  // main animation loop
  const play = () => {
    rootMesh.rotateY(0.006);
  };

  // init scene
  renderer.setSize(width, height);
  renderer.setClearColor(0x064997);
  container.appendChild(renderer.domElement);
  camera.position.z = _cameraZ;

  // add rootMesh to scene
  rootMesh.rotateZ(0.3);
  rootMesh.position.set(0, 0, 0);

  // lighting
  const light = new THREE.HemisphereLight(0xffffff, 0xdddddd, 1.05);
  scene.add(light);
  //scene.add(new THREE.AmbientLight(0xffffff, 1.1));

  const spotLight = new THREE.DirectionalLight(0xf5de65, 1.25);
  spotLight.position.set(-50, 0, 500);
  scene.add(spotLight);
  spotLight.lookAt(new THREE.Vector3(0, 0, 0));

  const backlight = new THREE.DirectionalLight(0xffffff, 6.0);
  backlight.position.set(-700, 600, -1500);
  scene.add(backlight);
  backlight.lookAt(new THREE.Vector3(0, 0, 0));

  const backlight2 = new THREE.DirectionalLight(0xffffff, 3.0);
  backlight2.position.set(700, -600, -1500);
  scene.add(backlight2);
  backlight2.lookAt(new THREE.Vector3(0, 0, 0));

  // scene.add(new THREE.AmbientLight(0xdddddd, 0.7));
  scene.background = new THREE.Color(0x175cad);
  // scene.background = new THREE.Color(0xff0000);

  scene.add(rootMesh);
  const controls = new OrbitControls(camera, renderer.domElement);

  return { play, renderer, camera, rootMesh, scene };
}
