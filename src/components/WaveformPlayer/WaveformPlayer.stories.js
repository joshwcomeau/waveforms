// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';

import WaveformPlayer from './WaveformPlayer';

storiesOf('WaveformPlayer', module)
  .add('default (paused)', () => <WaveformPlayer />)
  .add('playing', () => <WaveformPlayer isPlaying />)
  .add('playing (2Hz)', () => <WaveformPlayer isPlaying frequency={2} />);
