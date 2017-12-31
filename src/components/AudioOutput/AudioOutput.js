// @flow
import { PureComponent } from 'react';

type Props = {
  masterVolume: number,
  children: (audioCtx: ?AudioContext, masterOut: ?GainNode) => void,
};

class AudioOutput extends PureComponent<Props, State> {
  audioCtx: ?AudioContext;
  masterVolumeGainNode: ?GainNode;

  componentDidMount() {
    this.initializeAudio(this.props.masterVolume);
  }

  componentWillReceiveProps(nextProps: Props) {
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

    this.forceUpdate();
  }

  render() {
    return this.props.children(this.audioCtx, this.masterVolumeGainNode);
  }
}

export default AudioOutput;
