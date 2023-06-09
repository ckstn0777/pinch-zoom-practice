import { HandlePinchZoomParameters, PinchZoomParameters, TouchMove } from "./types";

const evHistory: Touch[] = [];
let prevDistance = -1; // 이전 거리

// 터치 시작
function touchStartHandler({ event }: { event: TouchEvent }) {
  const touches = event.changedTouches;
  if (evHistory.length + touches.length <= 2) {
    for (let i = 0; i < touches.length; i++) {
      const touch = touches[i];
      evHistory.push(touch);
    }
  }
  // console.log(evHistory);
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
  // console.log(evHistory);
}

// 터치 이동 - 핀치 발생 체크 (사실 여기가 핵심)
function touchMoveHandler({ event, onPinch }: TouchMove) {
  const touches = event.changedTouches;
  for (let i = 0; i < touches.length; i++) {
    const touch = touches[i];
    const index = evHistory.findIndex((ev) => ev.identifier === touch.identifier);
    if (index !== -1) {
      evHistory[index] = touch; // update

      // 두 개의 터치에 대해 확인해서 핀치 줌 발생 여부를 판단한다
      if (evHistory.length === 2) {
        const xDiff = evHistory[0].clientX - evHistory[1].clientX;
        const yDiff = evHistory[0].clientY - evHistory[1].clientY;

        // 유클리드 거리 공식 : (x1 - x2)^2 + (y1 - y2)^2
        const distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);

        // 첫 핀치의 경우 비교군이 없으므로 prevDiff가 -1인 경우 생략한다.
        if (prevDistance > 0) {
          const zoom = distance - prevDistance;

          // 두 터치의 중심점을 구한다
          const x = (evHistory[0].clientX + evHistory[1].clientX) / 2;
          const y = (evHistory[0].clientY + evHistory[1].clientY) / 2;
          //console.log(x, y);

          // screen의 top, left 좌표를 구한다
          const { top, left } = (
            event.currentTarget as HTMLElement
          ).getBoundingClientRect();

          // x - left, y - top을 통해 screen 내부의 좌표로 변환한다 (상관없는 screen 기준을 제거하는 느낌)
          // 고정축을 (0, 0)으로 변환하는 로직인거 같다
          onPinch({ zoom, x: x - left, y: y - top });
        }

        prevDistance = distance;
      }
    }
  }
}

export default function pinchZoom({ screen, setState, getState }: PinchZoomParameters) {
  const handlePinch = ({ zoom, x: centerX, y: centerY }: HandlePinchZoomParameters) => {
    if (zoom === 0) return;
    // console.log("zoom :", zoom);
    // console.log("centerX :", centerX);
    // console.log("centerY :", centerY);

    const { x, y, scale } = getState();

    const zoomWeight = 0.02;
    const nextScale = scale + (zoom > 0 ? zoomWeight : -zoomWeight);

    // console.log("x :", x);
    // console.log("y :", y);

    const biasX = (centerX - x) * ((zoom > 0 ? zoomWeight : -zoomWeight) / scale);
    const biasY = (centerY - y) * ((zoom > 0 ? zoomWeight : -zoomWeight) / scale);

    // console.log("biasX :", biasX);
    // console.log("biasY :", biasY);

    const nextX = x - biasX;
    const nextY = y - biasY;

    const nextState = {
      x: nextX,
      y: nextY,
      scale: nextScale,
    };

    setState(nextState);
  };

  screen.addEventListener("touchstart", (event) => touchStartHandler({ event }));
  screen.addEventListener("touchmove", (event) =>
    touchMoveHandler({ event, onPinch: handlePinch })
  );
  screen.addEventListener("touchend", (event) => touchEndHandler({ event }));
}
