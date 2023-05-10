import pinchZoom from "./pinchZoom";
import { TransformState } from "./types";

export function touchInit(screen: HTMLElement, target: HTMLElement) {
  // 타겟의 상태 값
  const state: TransformState = {
    x: 0,
    y: 0,
    scale: 0.5,
  };

  // 타겟의 상태 값 수정 및 렌더링
  const setState = ({ x, y, scale }: TransformState) => {
    state.x = x;
    state.y = y;
    state.scale = scale;
    target.style.transform = `translateX(${x}px) translateY(${y}px) scale(${scale})`;
  };

  // 상태 값을 가져오는 함수
  const getState = () => {
    return state;
  };

  pinchZoom({ screen, setState, getState });
}
