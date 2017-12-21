// @flow
import React, { PureComponent } from 'react';

import { DEFAULT_WAVEFORM_SHAPE } from '../../constants';
import { allPropsSameExcept } from '../../utils';

import { fadeWithContext } from './Oscillator.helpers';

import type { WaveformShape } from '../../types';

type Props = {
  shape: WaveformShape,
  frequency: number,
  amplitude: number,
  isAudible: boolean,
};

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const fade = fadeWithContext(audioCtx);

// FADE_DURATION controls the duration over amplitude changes when
// starting/stopping. really just used to avoid clipping. Extremely quick
const FADE_DURATION = 0.015;
// GLIDE_DURATION is used for the frequency, to smoothly shift to a new value.
const GLIDE_DURATION = 0.5;

class Oscillator extends PureComponent<Props> {
  audioCtx: AudioContext;
  oscillatorNode: OscillatorNode;
  gainNode: GainNode;

  static defaultProps = {
    shape: DEFAULT_WAVEFORM_SHAPE,
    amplitude: 1,
    isAudible: false,
  };

  componentDidMount() {
    if (this.props.isAudible) {
      this.play();
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { shape, frequency, amplitude, isAudible } = this.props;

    if (allPropsSameExcept('amplitude', this.props, prevProps)) {
      this.updateAmplitude(amplitude);
      return;
    }

    if (allPropsSameExcept('frequency', this.props, prevProps)) {
      this.updateFrequency(frequency);
      return;
    }

    // For other changes like changes to the shape or the audible status
    if (this.props.isAudible) {
      this.stop();
      this.play();
    } else {
      this.stop();
    }
  }

  componentWillUnmount() {
    this.stop();
  }

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
      this.gainNode.gain.value = 0;
      return;
    }
    this.gainNode.gain.exponentialRampToValueAtTime(
      amplitude,
      audioCtx.currentTime + GLIDE_DURATION / 2
    );
  };

  play = () => {
    const { shape, frequency, amplitude } = this.props;

    this.oscillatorNode = audioCtx.createOscillator();
    this.gainNode = audioCtx.createGain();

    this.oscillatorNode.type = shape;
    this.oscillatorNode.frequency.value = frequency;

    this.gainNode.gain.value = amplitude;

    this.oscillatorNode.connect(this.gainNode);
    this.gainNode.connect(audioCtx.destination);

    fade({
      direction: 'in',
      oscillator: this.oscillatorNode,
      output: this.gainNode,
      duration: FADE_DURATION,
    });
  };

  stop = () => {
    if (this.oscillatorNode) {
      fade({
        direction: 'out',
        oscillator: this.oscillatorNode,
        output: this.gainNode,
        duration: FADE_DURATION,
      });
    }
  };

  render() {
    return null;
  }
}

export default Oscillator;
