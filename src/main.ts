import "./style.css";
import { touchInit } from "./touch";
import { preventBrowserZoom } from "./utils";

function init() {
  // 브라우저 기본 pinch zoom 비활성화
  preventBrowserZoom();

  const screen = document.getElementById("screen");
  const target = document.getElementById("img-wrapper");

  if (!screen || !target) {
    throw new Error("Element not found");
  }

  // 터치 이벤트 리스너 제어
  touchInit(screen, target);
}

init();
