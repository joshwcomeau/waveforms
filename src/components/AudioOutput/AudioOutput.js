// @flow
import { PureComponent } from 'react';

type Props = {
  masterVolume: number,
  children: (audioCtx: AudioContext, masterOut: GainNode) => void,
};

type State = {
  isInitialized: boolean,
};

class AudioOutput extends PureComponent<Props, State> {
  audioCtx: ?AudioContext;
  masterVolumeGainNode: ?GainNode;

  state = {
    isInitialized: false,
  };

  componentWillReceiveProps(nextProps: Props) {
    const isAudibleForTheFirstTime =
      !this.audioCtx &&
      !this.masterVolumeGainNode &&
      nextProps.masterVolume > 0;

    if (isAudibleForTheFirstTime) {
      this.initializeAudio(nextProps.masterVolume);
      return;
    }

    // Should be impossible, this is just Flow appeasement:
    if (!this.masterVolumeGainNode) {
      return;
    }

    const hasVolumeChanged = nextProps.masterVolume !== this.props.masterVolume;

    if (hasVolumeChanged) {
      this.masterVolumeGainNode.gain.value = nextProps.masterVolume;
    }
  }

  initializeAudio(volume: number) {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    const masterVolumeGainNode = audioCtx.createGain();

    masterVolumeGainNode.gain.value = volume;
    masterVolumeGainNode.connect(audioCtx.destination);

    this.audioCtx = audioCtx;
    this.masterVolumeGainNode = masterVolumeGainNode;

    this.setState({ isInitialized: true });
  }

  render() {
    if (
      !this.state.isInitialized ||
      !this.audioCtx ||
      !this.masterVolumeGainNode
    ) {
      return null;
    }

    return this.props.children(this.audioCtx, this.masterVolumeGainNode);
  }
}

export default AudioOutput;
