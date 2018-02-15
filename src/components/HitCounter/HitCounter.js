// @flow
import React, { PureComponent } from 'react';
import RetroHitCounter from 'react-retro-hit-counter';

import { COLORS } from '../../constants';

type Props = {};
type State = {
  hits: ?number,
};

const IS_HTTPS = window.location.protocol.indexOf('https') !== -1;

class HitCounter extends PureComponent<Props, State> {
  state = {
    hits: null,
  };

  timeoutId: number;

  componentDidMount() {
    // This component lives in a very busy, very long page.
    // Immediately after mount, many components redraw themselves, since the
    // first pass is just used to read window dimensions.
    // In other words, this is a critical, busy time, and the hit counter at
    // the bottom of the page is not a priority.
    // So, defer it by a few seconds.
    this.timeoutId = window.setTimeout(this.requestHits, 5000);
  }

  componentWillUnmount() {
    window.clearTimeout(this.timeoutId);
  }

  requestHits = () => {
    const url = `http://159.203.41.223:1337${window.location.pathname}`;

    // Argh, so my analytics server is HTTP.
    // I'll hopefully soon fix it to run on HTTPS, but in the meantime, we'll
    // just avoid tracking hits on the HTTPS version. The hit tracker is mainly
    // for fun nostalgia, so it's not a huge loss :)
    if (IS_HTTPS) {
      return;
    }

    fetch(url)
      .then(response => response.json())
      .then(({ views }) => this.setState({ hits: views }))
      .catch(err => console.log('Error retrieving hit counter stats:', err));
  };

  render() {
    const { hits } = this.state;

    if (typeof hits !== 'number') {
      return null;
    }

    return (
      <RetroHitCounter
        hits={hits}
        size={32}
        segmentActiveColor={COLORS.secondary[500]}
        segmentInactiveColor="#222222"
        backgroundColor="#000"
      />
    );
  }
}

export default HitCounter;
