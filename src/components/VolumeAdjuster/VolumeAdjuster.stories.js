// @flow
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import VolumeAdjuster from './VolumeAdjuster';

class Manager extends Component<{}, { volume: number }> {
  state = {
    volume: 0,
  };

  handleAdjustVolume = (volume: number) => this.setState({ volume });

  render() {
    return (
      <VolumeAdjuster
        currentVolume={this.state.volume}
        maxVolume={10}
        onAdjustVolume={this.handleAdjustVolume}
      />
    );
  }
}
storiesOf('VolumeAdjuster', module)
  .add('empty', () => (
    <VolumeAdjuster
      currentVolume={0}
      maxVolume={10}
      onAdjustVolume={action('Adjust volume')}
    />
  ))
  .add('full', () => (
    <VolumeAdjuster
      currentVolume={10}
      maxVolume={10}
      onAdjustVolume={action('Adjust volume')}
    />
  ))
  .add('managed', () => <Manager />);
