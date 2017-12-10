// @flow
import React, { PureComponent } from 'react';

type Props = {
  id: string,
  root?: HTMLElement,
  rootMargin?: string,
  threshold?: number,
  callback: (id: string, entries: Array<IntersectionObserverEntry>) => void,
  children: React$Node,
};

class IntersectionObserver extends PureComponent<Props> {
  observer: ?IntersectionObserver;
  elem: ?HTMLElement;

  componentDidMount() {
    if (typeof window.IntersectionObserver === 'undefined') {
      import('../../polyfills/intersection-observer.js')
        .then(res => this.beginObservation(res.IntersectionObserver))
        .catch(err =>
          console.error('Could not load IntersectionObserver polyfill')
        );

      return;
    }

    this.beginObservation(window.IntersectionObserver);
  }

  componentWillUnmount() {
    if (this.observer && typeof this.observer.disconnect === 'function') {
      this.observer.disconnect();
    }
  }

  beginObservation = IntersectionObserver => {
    const { id, children, callback, ...intersectionOptions } = this.props;

    this.observer = new IntersectionObserver(entries => {
      callback(id, entries);
    }, intersectionOptions);

    this.observer.observe(this.elem);
  };

  render() {
    return (
      <div ref={htmlElement => (this.elem = htmlElement)}>
        {this.props.children}
      </div>
    );
  }
}

export default IntersectionObserver;
