// @flow
import React, { Component } from 'react';
import ReactSlider from 'react-slider';
import { injectGlobal } from 'styled-components';

import { COLORS } from '../../constants';

type Props = {
  width: number,
  min?: number,
  max?: number,
  step?: number,
  value?: number,
  defaultValue?: number,
  withBars?: boolean,
  onChange: (val: number) => void,
};

class Slider extends Component<Props> {
  static defaultProps = {
    width: 100,
  };

  render() {
    const { width, ...delegatedProps } = this.props;

    return (
      <div style={{ width }}>
        <ReactSlider {...delegatedProps} className="slider-component" />
      </div>
    );
  }
}

// NOTE: React-slider uses specific class names to style
injectGlobal`
  .slider-component {
    height: 20px;
  }

  .slider-component .bar {
    top: 10px;
    height: 4px;
    transform: translateY(-50%);
  }

  .slider-component .bar-0 {
    background: ${COLORS.gray[700]};
  }

  .slider-component .bar-1 {
    background: ${COLORS.gray[300]};
  }

  .slider-component .handle {
    position: absolute;
    background: ${COLORS.green[500]};
    width: 20px;
    height: 20px;
    border-radius: 50%;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
  }
`;

export default Slider;
