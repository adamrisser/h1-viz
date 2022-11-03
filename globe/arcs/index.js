import { Path } from "./path";
import { COLORS } from "../constants";

const colors = [
  COLORS.corral,
  COLORS.royalYellow,
  COLORS.white,
  COLORS.plum400,
];

export function init(rootMesh) {
  const paths = [];

  const allCoords = [
    getRandomLLCurve(),
    getRandomLLCurve(),
    getRandomLLCurve(),
    getRandomLLCurve(),
    getRandomLLCurve(),
    getRandomLLCurve(),
    getRandomLLCurve(),
    getRandomLLCurve(),
  ];

  allCoords.forEach((coords, i) => {
    const path = new Path(coords, colors[i % colors.length]);
    paths.push(path);
    rootMesh.add(path.mesh);
  });

  let time = 0;

  const play = () => {
    time += 30;

    paths.forEach((path, i) => {
      if (time >= i * 1500) path.play();
    });
  };

  return play;
}

function getRandomLLCurve() {
  return [
    getRandomInRange(-90, 90, 3),
    getRandomInRange(-180, 180, 3),
    getRandomInRange(-90, 90, 3),
    getRandomInRange(-180, 180, 3),
  ];
}

function getRandomInRange(from, to, fixed) {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}
