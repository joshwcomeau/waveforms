// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { WAVEFORM_ASPECT_RATIO, DEFAULT_WAVEFORM_SIZE } from '../../constants';
import { getInterceptPosition } from '../../helpers/waveform.helpers';

import Waveform from '../Waveform';
import WaveformAxes from '../WaveformAxes';

import type { Props as WaveformProps } from '../Waveform';

type Props = {
  ...WaveformProps,
  frequency: number,
  isPlaying: boolean,
};

type State = {
  // `cycles` is the number of cycles that have advanced since starting.
  // It can be decimal, and is reset whenever `isPlaying` changes.
  cycles: number,
  lastTickAt?: Date,
};

class WaveformPlayer extends PureComponent<Props, State> {
  animationFrameId: number;

  state = {
    cycles: 0,
  };

  static defaultProps = {
    frequency: 1,
    shape: 'sine',
  };

  componentDidMount() {
    if (this.props.isPlaying) {
      this.start();
    }

    // window.setTimeout(this.stop, 4000);
  }

  componentWillReceiveProps(nextProps: Props) {
    const isJustStarting = !this.props.isPlaying && nextProps.isPlaying;
    const isJustStopping = this.props.isPlaying && !nextProps.isPlaying;

    if (isJustStarting) {
      this.start();
    } else if (isJustStopping) {
      this.stop();
    }
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animationFrameId);
  }

  start = () => {
    this.setState(
      {
        cycles: 0,
        lastTickAt: new Date(),
      },
      this.tick,
    );
  };

  stop = () => {
    window.cancelAnimationFrame(this.animationFrameId);

    this.setState({ cycles: 0 });
  };

  tick = () => {
    this.animationFrameId = window.requestAnimationFrame(() => {
      if (!this.state.lastTickAt) {
        return;
      }

      const tickAt = new Date();

      const secondsSinceLastTick = (tickAt - this.state.lastTickAt) / 1000;

      // Each tick, we want to advance the waveform by a certain amount.
      // This is controlled by the offset, and it's how we control the "speed"
      // of the waveform. The higher the frequency, the faster we want the
      // wave to "appear" to move.
      //
      // Of course, we aren't actually "moving" anything; we're redrawing it
      // on every frame.
      const cyclesPerSecond =
        0.5 / this.props.frequency + this.props.frequency * 0.1;

      const nextcycles =
        this.state.cycles + secondsSinceLastTick * cyclesPerSecond;

      this.setState({ cycles: nextcycles, lastTickAt: tickAt }, this.tick);
    });
  };

  render() {
    const { isPlaying, ...delegatedProps } = this.props;
    const { cycles } = this.state;

    // Turn cycles into a cyclical value between 0 and 99
    const progress = (cycles * 100) % 100;

    // Figure out where the cycles indicator needs to be, if required.
    const width =
      typeof delegatedProps.size === 'number'
        ? delegatedProps.size
        : DEFAULT_WAVEFORM_SIZE;
    const height = width * WAVEFORM_ASPECT_RATIO;

    const interceptPosition = getInterceptPosition(
      delegatedProps.shape,
      height,
      delegatedProps.frequency,
      progress,
    );

    return (
      <WaveformAxes size={delegatedProps.size}>
        <Waveform {...delegatedProps} offset={progress} />
        <WaveformIntercept position={interceptPosition} />
      </WaveformAxes>
    );
  }
}

const WaveformIntercept = styled.div.attrs({
  style: ({ position }) => ({
    transform: `translateY(${position}px)`,
  }),
})`
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background: red;
  position: absolute;
  top: 10px;
  left: 5px;
  will-change: transform;
`;

export default WaveformPlayer;
