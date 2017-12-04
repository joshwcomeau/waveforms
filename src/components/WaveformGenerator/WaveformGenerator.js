// @flow
import React, { PureComponent } from 'react';

import Waveform from '../Waveform';

import type { WaveformShape } from '../../types';

// A 'mid-range' wave is ~260Hz (middle C).
const MIDDLE_C = 5;

const NUM_OF_POINTS = 1024;

// We want our window size to fit a single cycle at 260Hz.
// That means we need to record 1/260th of a second.
// Our window size is in milliseconds.
const WINDOW_SIZE = 1 / MIDDLE_C;

type Props = {
  shape: WaveformShape,
  frequency: number,
  isAudible: boolean,
};

type State = {
  points?: Uint8Array,
};

class WaveformGenerator extends PureComponent<Props, State> {
  static defaultProps = {
    shape: 'sine',
    frequency: MIDDLE_C,
    isAudible: false,
  };

  state = {};

  requestFrameId: number;

  audioContext: AudioContext = new AudioContext();
  analyzer: AnalyserNode;
  oscillator: OscillatorNode;

  waveformDataArray: Uint8Array;

  componentDidMount() {
    const { shape, frequency, isAudible } = this.props;

    this.oscillator = this.audioContext.createOscillator();
    this.oscillator.frequency.value = this.props.frequency;
    this.oscillator.type = shape;

    this.analyzer = this.audioContext.createAnalyser();
    this.analyzer.fftSize = NUM_OF_POINTS * 2;

    this.waveformDataArray = new Uint8Array(this.analyzer.frequencyBinCount);

    // Daisy-chain our oscillator to the analyzer, and analyzer to output
    // (if we want the audio to be audible)
    this.oscillator.connect(this.analyzer);
    if (isAudible) {
      this.analyzer.connect(this.audioContext.destination);
    }

    this.oscillator.start();

    this.extractData();
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.requestFrameId);
  }

  extractData = () => {
    this.requestFrameId = window.requestAnimationFrame(() => {
      this.analyzer.getByteTimeDomainData(this.waveformDataArray);

      this.forceUpdate();

      this.extractData();
    });
  };

  render() {
    if (!this.waveformDataArray) {
      return null;
    }
    // We render far too many points; trim out 9/10ths of them
    const points = this.waveformDataArray.filter(
      (_, index) => index % 10 === 0,
    );
    return <Waveform size={512} points={points} />;
  }
}

export default WaveformGenerator;
