// @flow
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import VolumeAdjuster from './VolumeAdjuster';

class Manager extends Component<{}, { volume: number, isMuted: boolean }> {
  state = {
    volume: 0,
    isMuted: false,
  };

  handleAdjustVolume = (volume: number) => this.setState({ volume });
  handleToggleMute = () => this.setState({ isMuted: !this.state.isMuted });

  render() {
    return (
      <VolumeAdjuster
        currentVolume={this.state.volume}
        isMuted={this.state.isMuted}
        onAdjustVolume={this.handleAdjustVolume}
        onToggleMute={this.handleToggleMute}
      />
    );
  }
}
storiesOf('VolumeAdjuster', module)
  .add('empty', () => (
    <VolumeAdjuster
      currentVolume={0}
      onAdjustVolume={action('Adjust volume')}
      onToggleMute={action('Toggle mute')}
    />
  ))
  .add('full', () => (
    <VolumeAdjuster
      currentVolume={1}
      onAdjustVolume={action('Adjust volume')}
      onToggleMute={action('Toggle mute')}
    />
  ))
  .add('4 steps', () => (
    <VolumeAdjuster
      currentVolume={1}
      steps={4}
      onAdjustVolume={action('Adjust volume')}
      onToggleMute={action('Toggle mute')}
    />
  ))
  .add('managed', () => <Manager />);
