// @flow
import React, { PureComponent } from 'react';

type Props = {
  id: string,
  root?: HTMLElement,
  rootMargin?: string,
  threshold?: number,
  onIntersect: (id: string, entry: IntersectionObserverEntry) => void,
  onlyFireOn?: 'enter' | 'exit',
  children: React$Node,
};

class IntersectionObserver extends PureComponent<Props> {
  observer: ?IntersectionObserver;
  elem: ?HTMLElement;

  hasStartedObservation: boolean = false;

  componentDidMount() {
    if (typeof window.IntersectionObserver === 'undefined') {
      import('../../polyfills/intersection-observer.js')
        .then(() => this.beginObservation())
        .catch(err =>
          console.error('Could not load IntersectionObserver polyfill')
        );
      return;
    }

    this.beginObservation();
  }

  componentWillUnmount() {
    if (this.observer && typeof this.observer.disconnect === 'function') {
      this.observer.disconnect();
    }
  }

  beginObservation = () => {
    const {
      id,
      children,
      onIntersect,
      onlyFireOn,
      ...intersectionOptions
    } = this.props;

    this.observer = new window.IntersectionObserver(entries => {
      // While the IntersectionObserver API supports multiple entries, we'll
      // only ever have 1, since we're only observing a single node.
      const [entry] = entries;

      this.triggerCallbackIfNecessary(entry);

      this.hasStartedObservation = true;
    }, intersectionOptions);

    this.observer.observe(this.elem);
  };

  triggerCallbackIfNecessary = (entry: IntersectionObserverEntry) => {
    const { id, onIntersect, onlyFireOn } = this.props;

    // IntersectionObserver API has this annoying habit of firing right when
    // we begin observing it. While this may be intended behaviour, it messes
    // with my plans.
    //
    // For this project, I'm choosing to identify and ignore this event.
    // If this were a generalized OSS component, though, I'd trim this bit.
    if (!this.hasStartedObservation) {
      return;
    }

    if (onlyFireOn) {
      // if the top of the child is within the viewport, that means it's
      // entering. Otherwise, it must be exiting, because it's already 100%
      // entered.
      const eventType =
        entry.boundingClientRect.top > 0 ? 'entering' : 'exiting';

      if (eventType === 'entering' && onlyFireOn !== 'enter') {
        return;
      }

      if (eventType === 'exiting' && onlyFireOn !== 'exit') {
        return;
      }
    }

    onIntersect(id, entry);
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
