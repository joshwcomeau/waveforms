// @flow
import React, { Component } from 'react';
import RcSlider, { createSliderWithTooltip } from 'rc-slider';
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
        <RcSlider {...delegatedProps} />
      </div>
    );
  }
}

// HACK: RC Slider uses specific class names for styling, so we'll just use
// those.
const SLIDER_HEIGHT = 16;
const SLIDER_BAR_HEIGHT = 2;

injectGlobal`
  .rc-slider {
    position: relative;
    height: ${SLIDER_HEIGHT + 'px'};
  }

  .rc-slider .rc-slider-rail, .rc-slider .rc-slider-track {
    position: absolute;
    height: ${SLIDER_BAR_HEIGHT + 'px'};
  }

  .rc-slider .rc-slider-rail {
    width: 100%;
    background: ${COLORS.gray[300]};
  }

  .rc-slider .rc-slider-track {
    background: ${COLORS.purple[700]};
  }

  .rc-slider .rc-slider-handle {
    position: absolute;
    top: ${SLIDER_BAR_HEIGHT / 2 + 'px'};
    background: ${COLORS.purple[500]};
    width: ${SLIDER_HEIGHT + 'px'};
    height: ${SLIDER_HEIGHT + 'px'};
    transform: translate(-50%, -50%);
    border-radius: 50%;
    cursor: grab;
    touch-action: pan-x;
  }

  .rc-slider .rc-slider-handle:active {
    cursor: grabbing;
  }
`;

export default Slider;
