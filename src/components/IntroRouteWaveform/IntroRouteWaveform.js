// @flow
import React, { Fragment, PureComponent } from 'react';

import { COLORS } from '../../constants';
import { convertProgressToCycle } from '../../helpers/waveform.helpers';

import Waveform from '../Waveform';
import WaveformTween from '../WaveformTween';
import WaveformAxis from '../WaveformAxis';
import WaveformIntercept from '../WaveformIntercept';
import WaveformCycleIndicator from '../WaveformCycleIndicator';
import FadeTransition from '../FadeTransition';

import type { StepData } from '../IntroRoute/IntroRoute.steps';

type Props = {
  width: number,
  amplitude: number,
  frequency: number,
  progress: number,
  handleUpdateAmplitude: (amplitude: number) => void,
  handleUpdateFrequency: (frequency: number) => void,
  stepData: StepData,
};

class IntroRouteWaveform extends PureComponent<Props> {
  render() {
    const { width, amplitude, frequency, progress, stepData } = this.props;

    // `progress` is an ever-increasing decimal value representing how many
    // iterations of the loop have occured.
    // Transform this value into a circular value between 0 and 99.
    const offset = convertProgressToCycle(progress);

    return (
      <WaveformTween
        shape={stepData.waveformShape}
        amplitude={amplitude}
        frequency={frequency}
        offset={offset}
        width={width}
      >
        {({ points }) => (
          <Fragment>
            <Waveform
              points={points}
              frequency={frequency}
              amplitude={amplitude}
              offset={offset}
              color={stepData.waveformColor}
              strokeWidth={5}
              opacity={stepData.waveformOpacity}
              size={width}
            />

            <FadeTransition isVisible={stepData.showXAxis}>
              <WaveformAxis
                x
                strokeWidth={4}
                waveformSize={width}
                showLabels={stepData.showXAxisLabels}
                opacity={stepData.xAxisOpacity}
              />
            </FadeTransition>
            <FadeTransition isVisible={stepData.showYAxis}>
              <WaveformAxis
                y
                strokeWidth={4}
                waveformSize={width}
                showLabels={stepData.showYAxisLabels}
                opacity={stepData.yAxisOpacity}
              />
            </FadeTransition>

            <FadeTransition isVisible={stepData.showYAxisIntercept}>
              <WaveformIntercept
                size={20}
                color={COLORS.primary[500]}
                waveformSize={width}
                waveformShape={stepData.waveformShape}
                frequency={frequency}
                amplitude={amplitude}
                offset={offset}
              />
            </FadeTransition>

            <FadeTransition
              typeName="div"
              isVisible={stepData.showCycleIndicator}
            >
              <WaveformCycleIndicator frequency={frequency} />
            </FadeTransition>
          </Fragment>
        )}
      </WaveformTween>
    );
  }
}

export default IntroRouteWaveform;
