// @flow
import { PureComponent } from 'react';

import { DEFAULT_WAVEFORM_SHAPE } from '../../constants';
import { allPropsSameExcept } from '../../utils';

import { fadeWithContext } from './Oscillator.helpers';

import type { WaveformShape } from '../../types';

type Props = {
  shape: WaveformShape,
  frequency: number,
  amplitude: number,
  masterVolume: number,
};

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const fade = fadeWithContext(audioCtx);

// FADE_DURATION controls the duration over amplitude changes when
// starting/stopping. really just used to avoid clipping. Extremely quick.
const FADE_DURATION = 0.015;
// GLIDE_DURATION is used for the frequency, to smoothly shift to a new value.
const GLIDE_DURATION = 0.5;

class Oscillator extends PureComponent<Props> {
  audioCtx: AudioContext;
  oscillatorNode: OscillatorNode;
  amplitudeGainNode: GainNode;
  masterVolumeGainNode: GainNode;

  static defaultProps = {
    shape: DEFAULT_WAVEFORM_SHAPE,
    amplitude: 1,
  };

  componentDidMount() {
    this.initializeAudio();
  }

  componentDidUpdate(prevProps: Props) {
    const { shape, frequency, amplitude, masterVolume } = this.props;

    if (shape !== prevProps.shape) {
      this.updateShape(shape);
    }

    if (frequency !== prevProps.frequency) {
      this.updateFrequency(frequency);
    }

    if (amplitude !== prevProps.amplitude) {
      this.updateAmplitude(amplitude);
    }

    if (masterVolume !== prevProps.masterVolume) {
      this.updateMasterVolume(masterVolume);
    }
  }

  componentWillUnmount() {
    this.stop();
  }

  initializeAudio = () => {
    const { shape, frequency, amplitude, masterVolume } = this.props;

    this.oscillatorNode = audioCtx.createOscillator();

    this.amplitudeGainNode = audioCtx.createGain();
    this.masterVolumeGainNode = audioCtx.createGain();

    this.oscillatorNode.type = shape;
    this.oscillatorNode.frequency.value = frequency;

    this.amplitudeGainNode.gain.value = amplitude;
    this.masterVolumeGainNode.gain.value = masterVolume;

    this.oscillatorNode.connect(this.amplitudeGainNode);
    this.amplitudeGainNode.connect(this.masterVolumeGainNode);
    this.masterVolumeGainNode.connect(audioCtx.destination);

    fade({
      direction: 'in',
      oscillator: this.oscillatorNode,
      output: this.amplitudeGainNode,
      duration: FADE_DURATION,
    });
  };

  updateShape = (shape: WaveformShape) => {
    this.oscillatorNode.type = shape;
  };

  updateFrequency = (frequency: number) => {
    this.oscillatorNode.frequency.exponentialRampToValueAtTime(
      frequency,
      audioCtx.currentTime + GLIDE_DURATION
    );
  };

  updateAmplitude = (amplitude: number) => {
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

  updateMasterVolume = (volume: number) => {
    this.masterVolumeGainNode.gain.value = volume;
  };

  stop = () => {
    if (this.oscillatorNode) {
      fade({
        direction: 'out',
        oscillator: this.oscillatorNode,
        output: this.amplitudeGainNode,
        duration: FADE_DURATION,
      });
    }
  };

  render() {
    return null;
  }
}

export default Oscillator;
