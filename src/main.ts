import "./style.css";

// 브라우저 기본 pinch zoom 비활성화
function preventBrowserZoom() {
  function listener(event: TouchEvent) {
    // 핀치 줌의 경우 두 개 이상의 이벤트가 발생한다
    if (event.touches.length > 1) {
      // preventDefault를 사용하려면 passive를 false로 해줘야 한다
      event.preventDefault();
    }
  }

  document.addEventListener("touchmove", listener, { passive: false });
}

preventBrowserZoom();
