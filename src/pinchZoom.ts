import { PinchZoomParameters } from "./types";

const evHistory: Touch[] = [];

// 터치 시작
function touchStartHandler({ event }: { event: TouchEvent }) {
  const touches = event.changedTouches;
  if (evHistory.length + touches.length <= 2) {
    for (let i = 0; i < touches.length; i++) {
      const touch = touches[i];
      evHistory.push(touch);
    }
  }
  console.log(evHistory);
}

// 터치 끝
function touchEndHandler({ event }: { event: TouchEvent }) {
  const touches = event.changedTouches;
  for (let i = 0; i < touches.length; i++) {
    const touch = touches[i];
    const index = evHistory.findIndex((ev) => ev.identifier === touch.identifier);
    if (index !== -1) {
      evHistory.splice(index, 1);
    }
  }
  console.log(evHistory);
}

// 터치 이동
function touchMoveHandler({ event }: { event: TouchEvent }) {}

export default function pinchZoom({
  screen,
  target,
  setState,
  getState,
}: PinchZoomParameters) {
  screen.addEventListener("touchstart", (event) => touchStartHandler({ event }));
  screen.addEventListener("touchend", (event) => touchEndHandler({ event }));
  // screen.addEventListener("touchmove", (event) => touchMoveHandler({ event }));
}
