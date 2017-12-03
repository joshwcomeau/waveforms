// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { scaleCanvas, getPixelRatio } from './Canvas.helpers';

type Props = {
  width: number,
  height: number,
  children: any,
};

class Canvas extends PureComponent<Props> {
  canvas: ?HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  pixelRatio: number;

  componentDidMount() {
    this.updateCanvasDimensions(this.props);

    this.pixelRatio = getPixelRatio(this.ctx);

    // TODO: Experiment with this!
    this.ctx.imageSmoothingEnabled = false;

    scaleCanvas(this.canvas, this.ctx);
  }

  componentWillReceiveProps(nextProps: Props) {
    this.updateCanvasDimensions(nextProps);
  }

  updateCanvasDimensions = ({ width, height }: Props) => {
    // `canvas` should always exist after mount, but Flow isn't smart enough
    // to realize it.
    if (!this.canvas) {
      return;
    }

    this.canvas.width = width;
    this.canvas.height = height;
  };

  storeRefToCanvas = (canvas: HTMLCanvasElement) => {
    // If the component unmounts before the ref can be stored,
    // bail early.
    if (!canvas) {
      return;
    }

    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  };

  render() {
    return <CanvasElem innerRef={this.storeRefToCanvas} />;
  }
}

const CanvasElem = styled.canvas`
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  height: 100%;
  background: #ccc;
`;

export default Canvas;
