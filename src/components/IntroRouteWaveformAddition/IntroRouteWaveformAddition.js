// @flow
/**
 * This wrapper shares a lot in common with `IntroRouteWaveform`.
 * Still not sure if it should be standalone, or merged in.
 */
import React, { PureComponent } from 'react';

import WaveformAddition from '../WaveformAddition';

import type { Props as WaveformProps } from '../Waveform';

type Props = {
  width: number,
  waveforms: Array<WaveformProps>,
};

type State = {
  progress: number,
};

class IntroRouteWaveformAddition extends PureComponent<Props, State> {
  state = {
    progress: 0,
  };

  render() {
    const { width, waveforms } = this.props;
    const { progress } = this.state;

    // If no waveforms are provided, just don't render anything.
    // This can happen when scrolling up from the `WaveformAddition` section.
    if (!waveforms) {
      return null;
    }

    return (
      <WaveformAddition
        size={width}
        waveforms={waveforms}
        progress={progress}
      />
    );
  }
}

export default IntroRouteWaveformAddition;
