/**
 * Super thin wrapper around WaveformAxis. Mainly used in stories to make life
 * easier
 */
// @flow
import React from 'react';

import Aux from '../Aux';
import WaveformAxis from '../WaveformAxis';

import type { Props } from '../WaveformAxis';

const WaveformAxes = (props: Props) => (
  <Aux>
    <WaveformAxis x {...props} />
    <WaveformAxis y {...props} />
  </Aux>
);

export default WaveformAxes;
