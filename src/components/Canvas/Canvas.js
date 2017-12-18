import React, { PureComponent } from 'react';

import { scaleCanvas } from '../../helpers/canvas.helpers';

type Props = {
  innerRef: (elem: HTMLElement) => void,
};

class Canvas extends PureComponent<Props> {
  static defaultProps = {
    width: 800,
    height: 600,
  };

  canvas: HTMLCanvasElement;

  handleRef = (canvas: HTMLCanvasElement) => {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    scaleCanvas(this.canvas, this.ctx);

    this.props.innerRef(this.canvas, this.ctx);
  };

  render() {
    const { innerRef, ...delegatedProps } = this.props;
    return <canvas ref={this.handleRef} {...delegatedProps} />;
  }
}

export default Canvas;
