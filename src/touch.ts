import pinchZoom from "./pinchZoom";
import { TransformState } from "./types";

export function touchInit(screen: HTMLElement, target: HTMLElement) {
  // 타겟의 상태 값
  const state: TransformState = {
    scale: 0.5,
  };

  // 타겟의 상태 값 수정 및 렌더링
  const setState = ({ scale }: TransformState) => {
    state.scale = scale;
    target.style.transform = `scale(${scale})`;
  };

  // 상태 값을 가져오는 함수
  const getState = () => {
    return state;
  };

  pinchZoom({ screen, target, setState, getState });
}
