import "./style.css";

// 브라우저 기본 pinch zoom 비활성화
function preventBrowserZoom() {
  function listener(event: TouchEvent) {
    // 핀치 줌의 경우 두 개 이상의 이벤트가 발생한다
    console.log(event);
    if (event.touches.length > 1) {
      event.preventDefault(); // preventDefault를 사용하려면 passive를 false로 해줘야겠군. 음... 그런 의미였구나
    }
  }

  document.addEventListener("touchmove", listener, { passive: false });
}

preventBrowserZoom();
