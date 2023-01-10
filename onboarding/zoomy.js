import * as THREE from "three";
import { getCamera, scene } from "./scene";

export function Zoomy(color) {
  this.color = color;

  let camera = getCamera(),
    time = 0,
    offset = 0,
    width,
    height;

  const vFOV = (camera.fov * Math.PI) / 180;
  height = 2 * Math.tan(vFOV / 2) * Math.abs(camera.position.z);
  width = height * camera.aspect;

  const shape = new THREE.Shape();
  shape.autoClose = false;

  const dx = 5;
  const dy = 5;
  let r = getRand(0, 3);

  let { startPos, lastDir } = getLeftStartingPosition(width, height);

  let x = startPos[0],
    y = startPos[1];

  function straight(len = 1) {
    function drawLine() {
      if (lastDir === 0) {
        y += dy / 5;
        shape.lineTo(x, y);
      } else if (lastDir === 1) {
        x += dx / 5;
        shape.lineTo(x, y);
      } else if (lastDir === 2) {
        y -= dy / 5;
        shape.lineTo(x, y);
      } else if (lastDir === 3) {
        x -= dx / 5;
        shape.lineTo(x, y);
      }
    }

    for (let i = 0; i < len * 2; i++) drawLine();
  }

  function turn(dir = 1) {
    if (lastDir === 0) {
      shape.quadraticCurveTo(x, y + dy, x + dx * dir, y + dy);
      x += dx * dir;
      y += dy;
      lastDir = dir > 0 ? 1 : 3;
      shape.lineTo(x, y);
    } else if (lastDir === 1) {
      shape.quadraticCurveTo(x + dx, y, x + dx, y - dy * dir);
      x += dx;
      y -= dy * dir;
      lastDir = dir > 0 ? 2 : 0;
      shape.lineTo(x, y);
    } else if (lastDir === 2) {
      shape.quadraticCurveTo(x, y - dy, x - dx * dir, y - dy);
      x -= dx * dir;
      y -= dy;
      lastDir = dir > 0 ? 3 : 1;
      shape.lineTo(x, y);
    } else if (lastDir === 3) {
      shape.quadraticCurveTo(x - dx, y, x - dx, y + dy * dir);
      x -= dx;
      y += dy * dir;
      shape.lineTo(x, y);
      lastDir = dir > 0 ? 0 : 2;
    }
  }

  const turnLeft = () => turn(-1);
  const turnRight = () => turn(1);

  shape.moveTo(startPos[0], startPos[1]);
  straight(10); // push it from the edge before fancy maneuvers

  let loopCount = 0,
    loopMax = 1;

  for (let i = 0; i < 200; i++) {
    let r = getRand(0, 10);

    if (r === 0) {
      turnLeft(); // dont let it go left
    } else if (r === 1) {
      turnRight();
    } else if (r === 2 && loopCount < loopMax) {
      turnRight();
      turnRight();
      turnRight();
      loopCount++;
    } else if (r === 3 && loopCount < loopMax) {
      // turnLeft();
      // straight(getRand(4, 16));
      // turnRight();
      // loopCount++;
    } else if (r === 4 || r === 5) {
      straight();
    }

    if (lastDir == 0) {
      straight(5);
      turnRight();
      straight(getRand(4, 16));
    } else if (lastDir == 2) {
      straight(5);
      turnLeft();
      straight(getRand(4, 16));
    } else {
      straight(5);
    }

    if (x < -width / 2 || x > width / 2 || y < -height / 2 || y > height / 2) {
      straight(4);
      break;
    }
  }

  const thickness = getRand(0, 4) * 0.2;
  const geometry = new THREE.TubeGeometry(getCurve(shape), 64 * 4, thickness);
  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.5,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.geometry.setDrawRange(0, 0);

  scene.add(mesh);

  const drawMax = 15000;
  const speed = 60 * thickness; // has to be divisible by 3

  this.play = () => {
    if (time <= drawMax) {
      time += speed;
    } else {
      this.halfway = true;
      offset += speed;
    }

    mesh.geometry.setDrawRange(offset, time);

    if (offset >= drawMax * 2) {
      scene.remove(mesh);
      time = 0;
      offset = 0;
      this.complete = true;
    }
  };

  function getCurve(shape) {
    const arcPoints = shape.getPoints();
    const lines = [];

    for (let i = 0; i < arcPoints.length; i += 2) {
      const pointA = arcPoints[i];
      const pointB = arcPoints[i + 1] || pointA;

      lines.push(
        new THREE.LineCurve3(
          new THREE.Vector3(pointA.x, pointA.y, 0),
          new THREE.Vector3(pointB.x, pointB.y, 0)
        )
      );
    }

    const path = new THREE.CurvePath();
    path.curves.push(...lines);
    return path;
  }

  function getRand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getLeftStartingPosition(width, height) {
    let r = 3;
    let startPos = [];
    let lastDir = 0;

    const top = height / 2 - 1;
    const bottom = -height / 2 + 1;
    const left = -width / 2 + 1;
    const right = width / 2 - 1;

    startPos[0] = -width / 2;
    startPos[1] = getRand(bottom, top);
    lastDir = 1;

    return {
      startPos,
      lastDir,
    };
  }
}
