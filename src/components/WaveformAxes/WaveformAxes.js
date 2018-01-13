/**
 * Super thin wrapper around WaveformAxis. Mainly used in stories to make life
 * easier
 */
// @flow
import React, { Fragment } from 'react';

import WaveformAxis from '../WaveformAxis';

import type { Props } from '../WaveformAxis';

const WaveformAxes = (props: Props) => (
  <Fragment>
    <WaveformAxis x {...props} />
    <WaveformAxis y {...props} />
  </Fragment>
);

export default WaveformAxes;
