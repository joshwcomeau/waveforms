// @flow
// Inspired by the jQuery plugin FitText
// https://github.com/davatron5000/FitText.js/blob/master/jquery.fittext.js

import React, { PureComponent } from 'react';

import { debounce } from '../../utils';

type Props = {
  compressor: number,
  children: React$Node,
};

class FitText extends PureComponent<Props> {
  static defaultProps = {
    compressor: 1,
  };

  elem: ?HTMLElement;

  componentDidMount() {
    this.resize();

    window.addEventListener('resize', this.resize);
  }

  componentDidUpdate() {
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = debounce(() => {
    const { compressor } = this.props;
    const { elem } = this;

    if (!elem) {
      return;
    }

    const { width } = elem.getBoundingClientRect();

    elem.style.fontSize = width / (compressor * 10) + 'px';
  }, 100);

  render() {
    const { children } = this.props;

    // prettier-ignore
    return (
      <div ref={(elem: ?HTMLElement) => (this.elem = elem)}>
        {children}
      </div>
    );
  }
}

export default FitText;
