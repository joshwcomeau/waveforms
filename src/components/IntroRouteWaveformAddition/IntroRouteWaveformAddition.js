// @flow
/**
 * This wrapper shares a lot in common with `IntroRouteWaveform`.
 * Still not sure if it should be standalone, or merged in.
 */
import React, { PureComponent } from 'react';
import { Motion, spring } from 'react-motion';
import styled from 'styled-components';

import WaveformAddition from '../WaveformAddition';
import WaveformAxis from '../WaveformAxis';
import Slider from '../Slider';

import type { Props as WaveformProps } from '../Waveform';

type Props = {
  width: number,
  waveforms: Array<WaveformProps>,
};

type State = {
  convergence: number,
};

class IntroRouteWaveformAddition extends PureComponent<Props, State> {
  state = {
    convergence: 0,
  };

  handleUpdateConvergence = (val: number) => {
    this.setState({ convergence: val });
  };

  render() {
    const { width, waveforms } = this.props;
    const { convergence } = this.state;

    // If no waveforms are provided, just don't render anything.
    // This can happen when scrolling up from the `WaveformAddition` section.
    if (!waveforms) {
      return null;
    }

    return (
      <FlexParent>
        <WaveformWrapper>
          <Motion
            defaultStyle={{ convergence: 0 }}
            style={{ convergence: spring(convergence) }}
          >
            {({ convergence }) => (
              <WaveformAddition
                size={width}
                waveforms={waveforms}
                convergence={convergence}
              />
            )}
          </Motion>

          <WaveformAxis
            x
            strokeWidth={4}
            waveformSize={width}
            showLabels={false}
            opacity={1}
          />

          <WaveformAxis
            y
            strokeWidth={4}
            waveformSize={width}
            showLabels={false}
            opacity={1}
          />
        </WaveformWrapper>
        <ControlsWrapper>
          <Slider
            label="Convergence"
            width={width / 2 - 15}
            min={0}
            max={1}
            step={0.01}
            defaultValue={0}
            value={convergence}
            onChange={this.handleUpdateConvergence}
          />
        </ControlsWrapper>
      </FlexParent>
    );
  }
}

// TODO: deduplicate with IntroRouteWaveform
const FlexParent = styled.div`
  display: flex;
  flex-direction: column;

  @media (orientation: portrait) {
    flex-direction: column-reverse;
  }
`;

const WaveformWrapper = styled.div`
  @media (orientation: landscape) {
    padding-bottom: 40px;
  }
`;

const ControlsWrapper = styled.div`
  @media (orientation: portrait) {
    padding-bottom: 40px;
  }
`;

export default IntroRouteWaveformAddition;
