// @flow
/**
 * When scrolling between sections that change the waveform, it'd be neat if
 * the waveform "tweened" from one shape to another rather than just snapping
 * to the new shape.
 *
 * This component listens for updates to the shape and passes the points down
 * to its children.
 */
import React, { PureComponent } from 'react';
import { Motion, spring } from 'react-motion';

import {
  applyWaveformAddition,
  getPointsForWaveform,
} from '../../helpers/waveform.helpers';

import type { WaveformShape, WaveformPoint } from '../../types';
import type { Props as WaveformProps } from '../Waveform';

const shapeMap = {
  sine: 1,
  triangle: 2,
  square: 3,
  sawtooth: 4,
};

type Props = {
  shape: WaveformShape,
  frequency: number,
  amplitude: number,
  offset: number,
  width: number,
  children: (props: WaveformProps) => React$Node,
};

type State = {
  oldShape: WaveformShape,
  progress: number,
};

class WaveformTween extends PureComponent<Props, State> {
  state = {
    progress: 0,
    oldShape: 'sine',
  };

  componentDidUpdate(prevProps: Props) {
    if (prevProps.shape !== this.props.shape) {
      this.setState({
        oldShape: prevProps.shape,
        progress: 1,
      });
    }
  }

  render() {
    const { shape, children, ...waveformProps } = this.props;

    return (
      <Motion
        defaultStyle={{ progress: 0 }}
        style={{
          progress: this.state.progress === 0 ? 0 : spring(this.state.progress),
        }}
        onRest={() => this.setState({ oldShape: shape, progress: 0 })}
      >
        {({ progress }) => {
          // `progress` is simply a number from 0 to 1 which controls how far
          // we are, between oldShape and shape.
          // 0 = render the oldShape, 1 = render the (new) shape
          const points = applyWaveformAddition(
            getPointsForWaveform({
              shape: this.state.oldShape,
              ...waveformProps,
            }),
            [
              getPointsForWaveform({
                shape,
                ...waveformProps,
              }),
            ],
            progress
          );

          return children({ points, ...waveformProps });
        }}
      </Motion>
    );
  }
}

export default WaveformTween;
