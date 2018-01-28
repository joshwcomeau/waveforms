import React, { PureComponent } from 'react';
import RetroHitCounter from 'react-retro-hit-counter';

import { COLORS } from '../../constants';

class HitCounter extends PureComponent {
  render() {
    return (
      <RetroHitCounter
        size={32}
        segmentActiveColor={COLORS.secondary[500]}
        segmentInactiveColor="#222222"
        backgroundColor="#000"
        hits={12345}
      />
    );
  }
}

export default HitCounter;
