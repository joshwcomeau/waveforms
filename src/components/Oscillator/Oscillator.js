// @flow
import { PureComponent } from 'react';

import { DEFAULT_WAVEFORM_SHAPE } from '../../constants';

import { fade } from './Oscillator.helpers';

import type { WaveformShape } from '../../types';

type Props = {
  audioCtx: AudioContext,
  masterOut: AudioDestinationNode,
  shape: WaveformShape,
  frequency: number,
  amplitude: number,
};

// CLIP_FADE_DURATION controls the duration over amplitude changes when
// starting/stopping, to avoid pops/clicks.
const CLIP_FADE_DURATION = 0.015;
// GLIDE_DURATION is used for the frequency, to smoothly shift to a new value.
const GLIDE_DURATION = 0.5;

class Oscillator extends PureComponent<Props> {
  audioCtx: AudioContext;
  oscillatorNode: OscillatorNode;
  amplitudeGainNode: GainNode;

  static defaultProps = {
    shape: DEFAULT_WAVEFORM_SHAPE,
    amplitude: 1,
  };

  componentDidMount() {
    this.initializeAudio();
  }

  componentWillReceiveProps(nextProps: Props) {
    const { shape, frequency, amplitude } = nextProps;

    if (shape !== this.props.shape) {
      this.updateShape(shape);
    }

    if (frequency !== this.props.frequency) {
      this.updateFrequency(frequency);
    }

    if (amplitude !== this.props.amplitude) {
      this.updateAmplitude(amplitude);
    }
  }

  componentWillUnmount() {
    this.stop();
  }

  initializeAudio = () => {
    const { audioCtx, masterOut, shape, frequency, amplitude } = this.props;

    this.oscillatorNode = audioCtx.createOscillator();

    this.amplitudeGainNode = audioCtx.createGain();

    this.oscillatorNode.type = shape;
    this.oscillatorNode.frequency.value = frequency;

    this.amplitudeGainNode.gain.value = amplitude;

    this.oscillatorNode.connect(this.amplitudeGainNode);
    this.amplitudeGainNode.connect(masterOut);

    fade({
      direction: 'in',
      oscillator: this.oscillatorNode,
      output: this.amplitudeGainNode,
      duration: CLIP_FADE_DURATION,
      context: audioCtx,
    });
  };

  updateShape = (shape: WaveformShape) => {
    this.oscillatorNode.type = shape;
  };

  updateFrequency = (frequency: number) => {
    const { audioCtx } = this.props;

    this.oscillatorNode.frequency.exponentialRampToValueAtTime(
      frequency,
      audioCtx.currentTime + GLIDE_DURATION
    );
  };

  updateAmplitude = (amplitude: number) => {
    const { audioCtx } = this.props;

    // For some reason, `exponentialRampToValueAtTime` doesn't like 0s.
    // In that case, let's just cut it off instantly, whatever.
    if (amplitude === 0) {
      this.amplitudeGainNode.gain.value = 0;
      return;
    }

    this.amplitudeGainNode.gain.exponentialRampToValueAtTime(
      amplitude,
      audioCtx.currentTime + GLIDE_DURATION / 2
    );
  };

  stop = () => {
    const { audioCtx } = this.props;

    if (this.oscillatorNode) {
      fade({
        direction: 'out',
        oscillator: this.oscillatorNode,
        output: this.amplitudeGainNode,
        duration: CLIP_FADE_DURATION,
        context: audioCtx,
      });
    }
  };

  render() {
    return null;
  }
}

export default Oscillator;
