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

    // Squares and sawtooths can be a bit piercing. Let's apply a subtle filter
    // to keep it gentler.
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 5000;
    filter.gain.value = 20;

    masterVolumeGainNode.connect(filter);
    filter.connect(audioCtx.destination);

    this.audioCtx = audioCtx;
    this.masterVolumeGainNode = masterVolumeGainNode;

    this.forceUpdate();
  }

  render() {
    if (!this.audioCtx) {
      return null;
    }

    return this.props.children(this.audioCtx, this.masterVolumeGainNode);
  }
}

export default AudioOutput;
