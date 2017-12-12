// @flow
import React, { PureComponent } from 'react';
import { Motion, spring } from 'react-motion';

import { DEFAULT_WAVEFORM_NUM_OF_CYCLES } from '../../constants';

import Aux from '../Aux';

type ChildrenValues = {
  progress: number,
  offset: number,
  numOfCycles: number,
};

type Props = {
  isPlaying: boolean,
  // How many times does the waveform repeat within the viewable area of this
  // player? Defaults to 1, which shows a single "period" of the waveform.
  numOfCycles: number,
  // `speed` is how many times the currently-drawn area repeats itself per
  // second. This is similar to `frequency`, with one key difference:
  // Frequency is the number of cycles per second, whereas this player may
  // be drawing multiple cycles.
  // If the `speed` is `2` and `numOfCycles` is `2`, the frequency can
  // be calculated as `1` (since 2 cycles repeat every 2 seconds)
  speed: number,

  children: (values: ChildrenValues) => React$Node,
};

type State = {
  // `progress` is the number of cycles that have advanced since starting.
  // It can be decimal: eg. a progress of 1.5 means that the waveform has
  // advanced by 1 and a half iterations.
  progress: number,
  lastTickAt: ?Date,
  // When we receive the request to stop the animation, it's nice to follow
  // through to the end of the current cycle, so that it winds up in its
  // original position.
  // This number controls the cycle the stop was requested in.
  stopRequestedAtCycle: ?number,
};

const calculateFrequency = (speed, numberOfCycles) => speed / numberOfCycles;

class WaveformPlayer extends PureComponent<Props, State> {
  animationFrameId: number;

  state = {
    progress: 0,
    lastTickAt: null,
    stopRequestedAtCycle: null,
  };

  static defaultProps = {
    isPlaying: false,
    numOfCycles: 1,
    speed: DEFAULT_WAVEFORM_NUM_OF_CYCLES,
  };

  componentDidMount() {
    if (this.props.isPlaying) {
      this.start();
    }
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
    this.setState({ lastTickAt: new Date() }, this.tick);
  };

  stop = () => {
    this.setState({
      stopRequestedAtCycle: this.state.progress,
    });
  };

  tick = () => {
    this.animationFrameId = window.requestAnimationFrame(() => {
      const { speed, numOfCycles } = this.props;
      const { progress, stopRequestedAtCycle, lastTickAt } = this.state;

      const frequency = calculateFrequency(speed, numOfCycles);

      if (!lastTickAt) {
        return;
      }

      const tickAt = new Date();

      const secondsSinceLastTick = (tickAt - lastTickAt) / 1000;

      // At first glance, you might think we're just translating a fixed SVG
      // by `n` pixels to the left on every tick.
      // Actually, though, we're redrawing the wave on every tick.
      // This winds up being simpler, since it's an endless animation; this way
      // we don't have to worry about running out of wave, and every tick is
      // exactly the same.
      //
      // So, since we're not actually "moving" anything, all we need to know is
      // how many cycles have passed. If the number is 0.2, we're 20% through
      // the wave, and can start drawing from there.
      // By changing that value, we get the illusion of it moving.
      // on every frame.

      // prettier-ignore
      const nextProgressVal = progress + (secondsSinceLastTick * frequency);

      // If this is the tick that pushes us into the next cycle, and we've
      // requested a stop, let's end this animation.
      if (typeof stopRequestedAtCycle === 'number') {
        const nextCyclesInteger = Math.floor(nextProgressVal);

        if (nextCyclesInteger > progress) {
          this.setState({
            progress: Math.floor(nextProgressVal),
            lastTickAt: tickAt,
            stopRequestedAtCycle: null,
          });
          return;
        }
      }

      this.setState(
        { progress: nextProgressVal, lastTickAt: tickAt },
        this.tick
      );
    });
  };

  renderValues = ({ progress }: { progress: number }) => {
    const { children, numOfCycles } = this.props;

    // `progress` is an ever-increasing decimal value representing how many
    // iterations of the loop have occured.
    // Transform this value into a circular value between 0 and 99.
    const offset = (progress * 100) % 100;

    // To appease React Motion, we have to return a React element, so we use
    // the self-erasing <Aux>. This is really just a bit of a hack; I shouldn't
    // really be using React Motion for this at all, I should just manage my own
    // spring values.
    return <Aux>{children({ progress, offset, numOfCycles })}</Aux>;
  };

  render() {
    const { progress } = this.state;

    return (
      <Motion
        defaultStyle={{ progress: 0 }}
        style={{ progress: spring(progress) }}
      >
        {this.renderValues}
      </Motion>
    );
  }
}

export default WaveformPlayer;
