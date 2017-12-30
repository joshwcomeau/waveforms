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

import { SPRING_SETTINGS } from '../../constants';
import {
  applyWaveformAddition,
  getPointsForWaveform,
} from '../../helpers/waveform.helpers';

import type { WaveformShape } from '../../types';
import type { Props as WaveformProps } from '../Waveform';

type Props = {
  shape: WaveformShape,
  frequency: number,
  amplitude: number,
  offset: number,
  width: number,
  // Using React$Element instead of Reat$Node to be consistent with what
  // ReactMotion's <Motion> requires.
  children: (props: WaveformProps) => React$Element<*>,
};

type State = {
  oldShape: WaveformShape,
  progress: ?number,
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

    // When the waveform changes shape, progress will "spring" from 0 to 1.
    // Once that transition is complete, the `onRest` callback sets `progress`
    // to `null`. When `null` is specified, we 'reset' it to 0 (no spring).
    // This is how we ensure that multiple transitions can happen
    // (otherwise, once the first transition has happened, `progress` would sit
    // at `1` and future updates would be instant.)
    // prettier-ignore
    const newProgressVal = typeof this.state.progress === 'number'
      ? spring(this.state.progress, SPRING_SETTINGS)
      : 0;

    return (
      // Motion complains because it's not clear that `children`
      // returns a React element (since the children
      <Motion
        defaultStyle={{ progress: 0 }}
        style={{ progress: newProgressVal }}
        onRest={() => this.setState({ oldShape: shape, progress: null })}
      >
        {({ progress }) => {
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
