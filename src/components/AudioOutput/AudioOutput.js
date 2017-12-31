// @flow
import { PureComponent } from 'react';

type Props = {
  masterVolume: number,
  children: (audioCtx: AudioContext, masterOut: GainNode) => void,
};

class AudioOutput extends PureComponent<Props> {
  audioCtx: ?AudioContext;
  masterVolumeGainNode: ?GainNode;

  componentWillReceiveProps(nextProps: Props) {
    const isAudibleForTheFirstTime =
      !this.audioCtx &&
      !this.masterVolumeGainNode &&
      nextProps.masterVolume > 0;

    if (isAudibleForTheFirstTime) {
      this.initializeAudio();
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

  initializeAudio() {
    const { masterVolume } = this.props;

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    const masterVolumeGainNode = audioCtx.createGain();

    masterVolumeGainNode.gain.value = masterVolume;
    masterVolumeGainNode.connect(audioCtx.destination);

    this.audioCtx = audioCtx;
    this.masterVolumeGainNode = masterVolumeGainNode;
  }

  render() {
    // Our `audioCtx` isn't created before mount.
    // This means that for the first render, we won't invoke the children or
    // create the oscillators. This is a feature, not a bug: our app doesn't
    // auto-play sound, and so we defer the cost of setting all this up until
    // it's actually needed.
    if (!this.audioCtx || !this.masterVolumeGainNode) {
      return null;
    }

    return this.props.children(this.audioCtx, this.masterVolumeGainNode);
  }
}

export default AudioOutput;
