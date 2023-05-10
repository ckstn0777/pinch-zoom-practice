export type TransformState = {
  x: number;
  y: number;
  scale: number;
};

export type PinchZoomParameters = {
  screen: HTMLElement;
  setState: (state: TransformState) => void;
  getState: () => TransformState;
};

export type TouchMove = {
  event: TouchEvent;
  onPinch: ({ zoom, x, y }: HandlePinchZoomParameters) => void;
};

export type HandlePinchZoomParameters = {
  zoom: number;
  x: number;
  y: number;
};
