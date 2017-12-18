// @flow
import { INTRO_STEPS, COLORS } from '../../constants';

import type { IntroStep } from '../../constants';
import type { WaveformShape } from '../../types';

export type StepData = {
  showWaveform: boolean,
  showAirGrid: boolean,
  frequencyOverride: ?number,
  amplitudeOverride: ?number,
  isPlaying: boolean,
  waveformShape: WaveformShape,
  waveformColor: string,
  waveformOpacity: number,
  // TODO: should just use `xAxisOpacity`. When opacity is 0, we can choose
  // not to render within the component (or just keep it hidden)
  showXAxis: boolean,
  showYAxis: boolean,
  showXAxisLabels: boolean,
  showYAxisLabels: boolean,
  showYAxisIntercept: boolean,
  xAxisOpacity: number,
  yAxisOpacity: number,
  showAmplitudeSlider: boolean,
  showFrequencySlider: boolean,
  showCycleIndicator: boolean,
};

export const getDataForStep = (step: IntroStep): StepData => {
  const defaults: StepData = {
    showWaveform: true,
    showAirGrid: false,
    frequencyOverride: null,
    amplitudeOverride: null,
    isPlaying: false,
    waveformShape: 'sine',
    waveformColor: COLORS.blue[500],
    waveformOpacity: 1,
    showXAxis: true,
    showYAxis: true,
    showXAxisLabels: false,
    showYAxisLabels: false,
    showYAxisIntercept: false,
    xAxisOpacity: 1,
    yAxisOpacity: 1,
    showAmplitudeSlider: false,
    showFrequencySlider: false,
    showCycleIndicator: false,
  };

  switch (step) {
    case 'title': {
      return {
        ...defaults,
        showYAxis: false,
      };
    }

    case 'about-this-thing': {
      return {
        ...defaults,
        isPlaying: true,
        showYAxis: false,
      };
    }

    case 'intro-with-labels': {
      return defaults;
    }

    case 'x-axis-time': {
      return {
        ...defaults,
        waveformOpacity: 0.5,
        showXAxisLabels: true,
      };
    }

    case 'y-axis-amplitude': {
      return {
        ...defaults,
        waveformOpacity: 0.5,
        showYAxisLabels: true,
      };
    }

    case 'y-axis-amplitude-with-control': {
      return {
        ...defaults,
        showYAxisLabels: true,
        showAmplitudeSlider: true,
      };
    }

    case 'frequency-introduction': {
      return {
        ...defaults,
        waveformOpacity: 0.5,
        showXAxisLabels: true,
        showCycleIndicator: true,
        frequencyOverride: 2,
      };
    }

    case 'frequency-introduction-pt2': {
      return {
        ...defaults,
        waveformOpacity: 0.5,
        showXAxisLabels: true,
        frequencyOverride: 2,
      };
    }

    case 'frequency-with-control': {
      return {
        ...defaults,
        showAmplitudeSlider: true,
        showFrequencySlider: true,
      };
    }

    case 'how-sound-works-intro': {
      return {
        ...defaults,
        isPlaying: true,
        waveformColor: COLORS.gray[700],
        waveformOpacity: 0.5,
        xAxisOpacity: 0.5,
        yAxisOpacity: 0.5,
        showYAxisIntercept: true,
      };
    }

    case 'how-sound-works-air-grid': {
      return {
        ...defaults,
        showWaveform: false,
        showAirGrid: true,
        isPlaying: true,
        waveformColor: COLORS.gray[700],
        waveformOpacity: 0.5,
        xAxisOpacity: 0.5,
        yAxisOpacity: 0.5,
        showYAxisIntercept: true,
        showAmplitudeSlider: true,
        showFrequencySlider: true,
      };
    }

    default:
      console.error(
        'Unrecognized step number!! Returning default values for waveform'
      );
      return defaults;
  }
};
