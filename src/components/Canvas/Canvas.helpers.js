// @flow

// Figure out our backing scale.
// This ensures canvas looks crisp on retina displays, where there are
// in fact 4 on-screen pixels for every 1 calculated pixel.
export function scaleCanvas(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
) {
  const ratio = getPixelRatio(ctx);

  if (ratio === 1) {
    return;
  }

  /* eslint-disable no-param-reassign */
  canvas.style.height = canvas.height + 'px';
  canvas.style.width = canvas.width + 'px';
  canvas.width *= ratio;
  canvas.height *= ratio;
  /* eslint-enable */

  ctx.scale(ratio, ratio);
}

export function getPixelRatio(ctx: CanvasRenderingContext2D) {
  let backingStoreRatio =
    ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.backingStorePixelRatio ||
    1;

  // Should be impossible, but if any of the above `ctx` values return a non-
  // number, just use the default value of 1.
  if (typeof backingStoreRatio !== 'number') {
    backingStoreRatio = 1;
  }

  return (window.devicePixelRatio || 1) / backingStoreRatio;
}

export function createCanvasCopy(canvas: HTMLCanvasElement) {
  //create a new canvas
  const newCanvas = document.createElement('canvas');
  const newContext = newCanvas.getContext('2d');

  //set dimensions
  newCanvas.width = canvas.width;
  newCanvas.height = canvas.height;

  //apply the old canvas to the new one
  newContext.drawImage(canvas, 0, 0);

  return newCanvas;
}
