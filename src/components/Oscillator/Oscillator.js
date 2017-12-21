// @flow
import React, { PureComponent } from 'react';

import { DEFAULT_WAVEFORM_SHAPE } from '../../constants';
import type { WaveformShape } from '../../types';

type Props = {
  shape: WaveformShape,
  frequency: number,
  amplitude: number,
  isAudible: boolean,
};

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

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

  componentDidUpdate() {
    if (this.props.isAudible) {
      this.play();
    } else {
      this.stop();
    }
  }

  componentWillUnmount() {
    this.stop();
  }

  play = () => {
    const { shape, frequency, amplitude } = this.props;

    this.oscillatorNode = audioCtx.createOscillator();
    this.gainNode = audioCtx.createGain();

    this.oscillatorNode.type = shape;
    this.oscillatorNode.frequency.value = frequency;

    this.gainNode.gain.value = amplitude;

    this.oscillatorNode.connect(this.gainNode);
    this.gainNode.connect(audioCtx.destination);

    this.oscillatorNode.start();
  };

  stop = () => {
    if (this.oscillatorNode) {
      this.oscillatorNode.stop();
    }
  };

  render() {
    return null;
  }
}

export default Oscillator;
