import * as THREE from "three";
import { getCamera, scene } from "./scene";
import { COLORS } from "./constants";

export function init() {
  let camera = getCamera(),
    meshes = [],
    time = 0,
    offset = 0,
    width,
    height;

  function init() {
    const vFOV = (camera.fov * Math.PI) / 180;
    height = 2 * Math.tan(vFOV / 2) * Math.abs(camera.position.z);
    width = height * camera.aspect;

    const mesh1 = getLineMesh(width, height, COLORS.blue700);
    const mesh2 = getLineMesh(width, height, COLORS.blue500);
    const mesh3 = getLineMesh(width, height, COLORS.blue300);
    const mesh4 = getLineMesh(width, height, COLORS.blue100);

    scene.add(mesh1, mesh2, mesh3, mesh4);
    meshes.push(mesh1);
    meshes.push(mesh2);
    meshes.push(mesh3);
    meshes.push(mesh4);
  }

  function getLineMesh(width, height, color) {
    const shape = new THREE.Shape();
    shape.autoClose = false;

    const dx = 20;
    const dy = 20;
    let r = getRand(0, 3);

    let { startPos, lastDir } = getStartingPosition(width, height);

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
    straight(20);

    let loopCount = 0,
      loopMax = 1;

    for (let i = 0; i < 200; i++) {
      let r = getRand(0, 10);

      if (r === 0) {
        turnLeft();
      } else if (r === 1) {
        turnRight();
      } else if (r === 2 && loopCount < loopMax) {
        turnRight();
        turnRight();
        turnRight();
        loopCount++;
      } else if (r === 3 && loopCount < loopMax) {
        turnLeft();
        turnLeft();
        turnLeft();
        loopCount++;
      } else if (r === 4 || r === 5) {
        straight();
      }

      straight(5);

      if (
        x < -width / 2 ||
        x > width / 2 ||
        y < -height / 2 ||
        y > height / 2
      ) {
        straight();
        break;
      }
    }

    const geometry = new THREE.TubeGeometry(getCurve(shape), 2048, 0.75);
    const material = new THREE.MeshBasicMaterial({ color });
    const mesh = new THREE.Mesh(geometry, material);

    mesh.geometry.setDrawRange(0, 0);

    return mesh;
  }

  let drawMax = 150000;

  function render() {
    if (time <= drawMax) {
      time += 1200;
    } else {
      offset += 1200;
    }

    meshes.forEach((mesh) => mesh.geometry.setDrawRange(offset, time));

    // reset for new lines
    if (offset >= drawMax * 2) {
      scene.remove(meshes[0], meshes[1]);
      meshes = [
        getLineMesh(width, height, COLORS.blue700),
        getLineMesh(width, height, COLORS.blue500),
        getLineMesh(width, height, COLORS.blue300),
        getLineMesh(width, height, COLORS.blue100),
      ];
      scene.add(meshes[0], meshes[1], meshes[2], meshes[3]);
      time = 0;
      offset = 0;
    }
  }

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

  function getStartingPosition(width, height) {
    let r = getRand(0, 3);
    let startPos = [];
    let lastDir = 0;

    const top = height / 2 - 1;
    const bottom = -height / 2 + 1;
    const left = -width / 2 + 1;
    const right = width / 2 - 1;

    if (r == 0) {
      startPos[0] = getRand(left, right);
      startPos[1] = height / 2;
      lastDir = 2;
    } else if (r == 1) {
      startPos[0] = width / 2;
      startPos[1] = getRand(bottom, top);
      lastDir = 3;
    } else if (r == 2) {
      startPos[0] = getRand(left, right);
      startPos[1] = -height / 2;
      lastDir = 0;
    } else {
      startPos[0] = -width / 2;
      startPos[1] = getRand(bottom, top);
      lastDir = 1;
    }

    return {
      startPos,
      lastDir,
    };
  }

  init();

  return render;
}
