import * as THREE from "three";
import { getCamera, scene } from "./scene";
import { COLORS } from "./constants";
import { Zoomy } from "./zoomy";

// the faster the start speed, the more zoomies you will need
const ZOOMY_COUNT = 20;

// how fast zoomies start one after the other
const ZOOMY_RELEASE_SPEED = 10;

const ZOOMY_COLORS = [
  COLORS.blue100,
  COLORS.blue300,
  COLORS.blue500,
  COLORS.sand,
];

export function init() {
  let time = 0;
  const zoomies = [];

  for (let i = 0; i < ZOOMY_COUNT; i++) {
    const color = ZOOMY_COLORS[i % ZOOMY_COLORS.length];
    zoomies.push(new Zoomy(color));
  }

  const play = () => {
    time += 1;

    if (time % 10 == 0) console.log("z length", zoomies.length);

    for (let i = 0; i < zoomies.length; i++) {
      if (
        time >= i * ZOOMY_RELEASE_SPEED ||
        time > ZOOMY_RELEASE_SPEED * ZOOMY_COUNT
      ) {
        const zoomy = zoomies[i];
        zoomy.play();

        // a zoomy is about to start exiting, fire a new one up
        if (zoomy.halfway && !zoomy.reported && zoomies.length < 20) {
          zoomy.reported = true;
          zoomies.push(new Zoomy(zoomy.color));
        }

        // remove old zoomy and add a fresh one to the end
        if (zoomy.complete) {
          zoomies.splice(i, 1);
        }
      }
    }
  };

  return play;
}
