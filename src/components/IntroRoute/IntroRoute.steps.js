import React from 'react';
import VolumeOn from 'react-icons/lib/md/volume-up';

import { COLORS, DEFAULT_WAVEFORM_SHAPE } from '../../constants';
import { roundTo } from '../../utils';

import Header from '../Header';
import Paragraph from '../Paragraph';
import SectionTitle from '../SectionTitle';
import Heading from '../Heading';
import Emphasized from '../Emphasized';
import Sidebar from '../Sidebar';
import Aux from '../Aux';
import FrequencyGraph from '../FrequencyGraph';
import IntroRouteAirGrid from '../IntroRouteAirGrid';
import MountWhenVisible from '../MountWhenVisible';
import RevealableAnswer from '../RevealableAnswer';
import WaveformEquation from '../WaveformEquation';
import UnorderedList from '../UnorderedList';
import KeyboardCharacter from '../KeyboardCharacter';

import type { WaveformShape } from '../../types';

export type IntroStep =
  | 'title'
  | 'about-this-thing'
  | 'about-sound-toggling'
  | 'intro-with-labels'
  | 'x-axis-time'
  | 'y-axis-amplitude'
  | 'y-axis-amplitude-with-control'
  | 'frequency-introduction'
  | 'frequency-introduction-pt2'
  | 'frequency-with-control'
  | 'how-sound-works-intro'
  | 'how-sound-works-air-grid'
  | 'how-sound-works-air-grid-pt2'
  | 'harmonics-intro'
  | 'sine-wave-graph'
  | 'triangle-wave'
  | 'triangle-wave-graph'
  | 'square-wave'
  | 'square-wave-graph'
  | 'sawtooth-wave'
  | 'sawtooth-wave-graph'
  | 'additive-synthesis-intro'
  | 'additive-synthesis-basic-add'
  | 'additive-synthesis-intro-convergence'
  | 'additive-synthesis-intro-num-of-harmonics';

export const INTRO_STEPS: Array<IntroStep> = [
  'title',
  'about-this-thing',
  'about-sound-toggling',
  'intro-with-labels',
  'x-axis-time',
  'y-axis-amplitude',
  'y-axis-amplitude-with-control',
  'frequency-introduction',
  'frequency-introduction-pt2',
  'frequency-with-control',
  'how-sound-works-intro',
  'how-sound-works-air-grid',
  'how-sound-works-air-grid-pt2',
  'harmonics-intro',
  'sine-wave-graph',
  'triangle-wave',
  'triangle-wave-graph',
  'square-wave',
  'square-wave-graph',
  'sawtooth-wave',
  'sawtooth-wave-graph',
  'additive-synthesis-intro',
  'additive-synthesis-basic-add',
  'additive-synthesis-intro-convergence',
  'additive-synthesis-intro-num-of-harmonics',
];

export type StepData = {
  id: string,

  // Waveform parameters
  frequencyOverride: ?number,
  amplitudeOverride: ?number,
  isPlaying: boolean,
  waveformShape: WaveformShape,
  waveformColor: string,
  waveformOpacity: number,
  // TODO: should just use `xAxisOpacity`. When opacity is 0, we can choose
  // not to render within the component (or just keep it hidden)
  showXAxis: boolean,
  showYAxis: boolean,
  showXAxisLabels: boolean,
  showYAxisLabels: boolean,
  showYAxisIntercept: boolean,
  xAxisOpacity: number,
  yAxisOpacity: number,
  showAmplitudeSlider: boolean,
  showFrequencySlider: boolean,
  frequencySliderMin: number,
  frequencySliderMax: number,
  frequencySliderStep: number,
  showCycleIndicator: boolean,
  showVolumeControls: boolean,

  // WaveformAddition params
  useWaveformAddition: boolean,
  showConvergenceSlider: boolean,
  showNumOfHarmonicsSlider: boolean,
  harmonicsForOverride: WaveformShape,
  numOfHarmonicsOverride: number,
  convergenceOverride: number,

  // Section parameters
  getMargin: (windowWidth: number) => number,
  children: React$Node,
};

const marginFunctions = {
  none: windowHeight => 0,
  xsmall: windowHeight => windowHeight * 0.15,
  small: windowHeight => windowHeight * 0.35,
  large: windowHeight => windowHeight * 0.45,
};

const defaults: StepData = {
  frequencyOverride: null,
  amplitudeOverride: null,
  isPlaying: false,
  waveformShape: DEFAULT_WAVEFORM_SHAPE,
  waveformColor: COLORS.primary[500],
  waveformOpacity: 1,
  showXAxis: true,
  showYAxis: true,
  showXAxisLabels: false,
  showYAxisLabels: false,
  showYAxisIntercept: false,
  xAxisOpacity: 1,
  yAxisOpacity: 1,
  showAmplitudeSlider: false,
  showFrequencySlider: false,
  frequencySliderMin: 0.5,
  frequencySliderMax: 3,
  frequencySliderStep: 0.1,
  showCycleIndicator: false,
  showVolumeControls: true,
  useWaveformAddition: false,
  showConvergenceSlider: false,
  getMargin: marginFunctions.large,
};

export const steps = {
  title: {
    ...defaults,
    showYAxis: false,
    showVolumeControls: false,
    getMargin: marginFunctions.none,
    children: <Header />,
  },
  'about-this-thing': {
    ...defaults,
    isPlaying: true,
    showYAxis: false,
    showVolumeControls: false,
    getMargin: marginFunctions.small,
    children: (
      <Aux>
        <Paragraph>Hi there!</Paragraph>
        <Paragraph>
          This interactive guide introduces waveforms. We'll go over the
          fundamental physics of sound, learn how it relates to music and
          harmony, and discover how to build complex tones from simple ones.
        </Paragraph>
        <Paragraph>
          This guide is primarily geared towards folks who produce music, but no
          prior knowledge is required. Even if you don't have any interest in
          music production, this guide may still interest you!
        </Paragraph>
      </Aux>
    ),
  },
  'about-sound-toggling': {
    ...defaults,
    isPlaying: true,
    showYAxis: false,
    getMargin: marginFunctions.small,
    children: ({ orientation }) => (
      <Aux>
        <Heading icon={<VolumeOn />}>Listen in</Heading>
        <Paragraph>
          Because this guide deals with audio waveforms, it's beneficial to be
          able to hear stuff. This way, when you change parameters, you can hear
          the difference it makes.
        </Paragraph>
        <Paragraph>
          Because nobody likes autoplaying sounds, the volume is currently
          muted. You can control it using the "volume" widget in the{' '}
          {orientation === 'portrait' ? 'top-right' : 'bottom left'} corner.
        </Paragraph>
        <Paragraph>
          You can also use keyboard shortcuts! The numbers{' '}
          <KeyboardCharacter>0</KeyboardCharacter> –{' '}
          <KeyboardCharacter>9</KeyboardCharacter> control the volume. You can
          also press <KeyboardCharacter>M</KeyboardCharacter> to mute or unmute
          the audio.
        </Paragraph>
        <Paragraph>
          <Emphasized>
            Try it now by pressing <KeyboardCharacter>M</KeyboardCharacter> on
            your keyboard!
          </Emphasized>
        </Paragraph>
      </Aux>
    ),
  },
  'intro-with-labels': {
    ...defaults,
    children: (
      <Aux>
        <SectionTitle>1. Reading Waveforms</SectionTitle>
        <Paragraph>
          The waveform over there is a graph, a cartesian plane. It's showing
          the relationship between two dimensions.
        </Paragraph>
      </Aux>
    ),
  },
  'x-axis-time': {
    ...defaults,
    waveformOpacity: 0.5,
    showXAxisLabels: true,
    getMargin: marginFunctions.small,
    children: (
      <Aux>
        <Paragraph>
          The horizontal line, our X axis, represents time. The exact units
          don't really matter right now, but to make it concrete, let's say that
          the current graph represents 1 second.
        </Paragraph>
      </Aux>
    ),
  },
  'y-axis-amplitude': {
    ...defaults,
    waveformOpacity: 0.5,
    showYAxisLabels: true,
    getMargin: marginFunctions.small,
    children: (
      <Aux>
        <Paragraph>
          The vertical line, our Y axis, represents <strong>amplitude</strong>.
          We'll go into more detail in a bit about what amplitude really is, but
          for now, you can think of it as volume. The bigger the wave, the
          louder the sound.
        </Paragraph>
      </Aux>
    ),
  },
  'y-axis-amplitude-with-control': {
    ...defaults,
    getMargin: marginFunctions.small,
    showYAxisLabels: true,
    showAmplitudeSlider: true,
    children: (
      <Aux>
        <Paragraph>
          Go ahead and tweak the waveform's amplitude, using the slider on the
          left.
        </Paragraph>

        <Paragraph>
          Try setting it all the way to 0, and notice how the line disappears.
        </Paragraph>
      </Aux>
    ),
  },
  'frequency-introduction': {
    ...defaults,
    waveformOpacity: 0.5,
    showXAxisLabels: true,
    showCycleIndicator: true,
    frequencyOverride: 2,
    children: (
      <Aux>
        <Paragraph>
          Next, let's look at <strong>frequency</strong>.
        </Paragraph>

        <Paragraph>
          The waveform we've been looking at is of a <em>sine wave</em>. This
          refers to the "shape" of the line in the waveform graph. The sine wave
          is "periodic": This means that the wave repeats.
        </Paragraph>

        <Paragraph>
          Waveforms are windows into a wave over a specific amount of time. In
          this case, our waveform covers two "periods" of a sine wave.
        </Paragraph>

        <Paragraph>
          Important to note: The amount of time hasn't changed. This is still 1
          second of audio. We've just squeezed two periods of the sine wave into
          our waveform, instead of 1.
        </Paragraph>

        <Paragraph>
          The number of periods per second is known as the frequency. The unit
          of measurement is called the Hertz (abbreviated as 'Hz'). The wave
          over there is 2Hz, since the waveform repeats twice.
        </Paragraph>
      </Aux>
    ),
  },
  'frequency-introduction-pt2': {
    ...defaults,
    getMargin: marginFunctions.small,
    waveformOpacity: 0.5,
    showXAxisLabels: true,
    frequencyOverride: 2,
    children: (
      <Aux>
        <Paragraph>
          Frequency is just the technical term for "pitch". For example, When
          you sing an "A4" note (The "A" in the middle of a typical piano), your
          throat vibrates at 440Hz.
        </Paragraph>
        <Sidebar>
          <Paragraph>
            For sound to be audible, it needs to be much faster than this: the
            human hearing range is from 20Hz to 20,000Hz.
          </Paragraph>
          <Paragraph>
            The frequencies in this guide use slower frequencies to keep the
            numbers and visualizations simpler, since the concepts are more
            important than the specific frequencies.
          </Paragraph>
        </Sidebar>
      </Aux>
    ),
  },
  'frequency-with-control': {
    ...defaults,
    getMargin: marginFunctions.small,
    showAmplitudeSlider: true,
    showFrequencySlider: true,
    children: (
      <Aux>
        <Paragraph>
          So, we now have control over 2 settings: <strong>amplitude</strong>{' '}
          and <strong>frequency</strong>.
        </Paragraph>

        <Paragraph>
          Play around with the sliders to see how they affect the waveform. If
          you'd like, you can also enable sound using the button in the top
          right. This way, you can hear how these parameters affect the sound.
        </Paragraph>
      </Aux>
    ),
  },
  'how-sound-works-intro': {
    ...defaults,
    waveformColor: COLORS.gray[700],
    waveformOpacity: 0.5,
    xAxisOpacity: 0.5,
    yAxisOpacity: 0.5,
    frequencyOverride: 1,
    children: (
      <Aux>
        <SectionTitle>2. How Sound Works</SectionTitle>
        <Paragraph>
          So, we've learned that waveforms are a graph showing amplitude changes
          over time, where amplitude swings between negative and positive
          values. But what the heck does that mean, in real-world terms?
        </Paragraph>

        <Paragraph>
          To help us understand, the waveform on the left now has a blue circle
          that follows the changes in amplitude over time. Because we're using a
          sine waveform, the motion is smooth.
        </Paragraph>

        <Paragraph>That blue dot</Paragraph>
      </Aux>
    ),
  },
  'how-sound-works-air-grid': {
    ...defaults,
    isPlaying: true,
    waveformColor: COLORS.gray[700],
    waveformOpacity: 0.5,
    xAxisOpacity: 0.5,
    yAxisOpacity: 0.5,
    showAmplitudeSlider: true,
    showFrequencySlider: true,
    frequencySliderMax: 2,
    children: ({ amplitude, frequency, progress, currentStep }) => (
      <Aux>
        <Paragraph>
          Sound is vibration. That blue dot's motion? That's what molecules in
          the air do, when a sine wave is played.
        </Paragraph>

        <MountWhenVisible
          currentStep={currentStep}
          belongsToStep="how-sound-works-air-grid"
          estimatedSize={226}
        >
          <IntroRouteAirGrid
            amplitude={amplitude}
            frequency={frequency}
            progress={progress}
          />
        </MountWhenVisible>

        <Paragraph>
          The grid on the left below the waveform represents a bunch of air
          molecules floating in the air. Notice how the molecules themselves
          aren't travelling through the air; the wave travels by causing a
          rippling effect through the air molecules.
        </Paragraph>

        <Paragraph>
          This is similar to what happens when you throw a stone in a smooth
          pond. Waves radiate outwards, but the actual water molecules don't
          move from the center out; the wave ripples through the water.
        </Paragraph>

        <Paragraph>
          Ever notice how, when you blast a song from a speaker, you can see the
          speaker cone vibrating? Speakers work by kicking off this chain
          reaction of vibrations.
        </Paragraph>

        <Sidebar>
          <Paragraph>
            Curious about how our ears translate these waves into sound that the
            brain understands? It's outside the scope of this guide, but it's
            super interesting stuff!
          </Paragraph>
          <Paragraph>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.nidcd.nih.gov/health/how-do-we-hear"
            >
              Learn more about our ears and sound.
            </a>
          </Paragraph>
        </Sidebar>
      </Aux>
    ),
  },
  'how-sound-works-air-grid-pt2': {
    ...defaults,
    isPlaying: true,
    waveformColor: COLORS.gray[700],
    waveformOpacity: 0.25,
    xAxisOpacity: 0.5,
    yAxisOpacity: 0.5,
    showYAxisIntercept: true,
    showAmplitudeSlider: true,
    showFrequencySlider: true,
    frequencySliderMax: 2,
    children: ({ amplitude, frequency, progress, currentStep }) => (
      <Aux>
        <Paragraph>
          How does this relate to our previous waveforms? Notice how a single
          particle moves back and forth. Does the pattern seem familiar? Each
          particle is moving in a sine wave, same as our waveform.
        </Paragraph>

        <MountWhenVisible
          currentStep={currentStep}
          belongsToStep="how-sound-works-air-grid-pt2"
          estimatedSize={226}
        >
          <IntroRouteAirGrid
            highlightAirGridColumn
            amplitude={amplitude}
            frequency={frequency}
            progress={progress}
          />
        </MountWhenVisible>
      </Aux>
    ),
  },
  'harmonics-intro': {
    ...defaults,
    isPlaying: true,
    children: ({ frequency, amplitude, currentStep }) => (
      <Aux>
        <SectionTitle>3. Harmonics</SectionTitle>
        <Paragraph>
          So far, we've been looking at the sine waveform exclusively, but there
          are plenty of other waveforms!
        </Paragraph>

        <Paragraph>
          We started with the sine because it is the "fundamental" waveform.
          What that means is that when a sine wave vibrates the air at 440Hz,
          the only thing you hear is a 440Hz tone. Sine waves are the "vanilla"
          wave; it doesn't have any bells or whistles.
        </Paragraph>
      </Aux>
    ),
  },
  'sine-wave-graph': {
    ...defaults,
    isPlaying: true,
    frequencyOverride: 1,
    amplitudeOverride: 1,

    showAmplitudeSlider: true,
    showFrequencySlider: true,
    getMargin: marginFunctions.xsmall,
    children: ({ frequency, amplitude, currentStep }) => (
      <Aux>
        <Paragraph>
          To understand what this means, let's take a look at a graph of the
          frequencies audible for a given waveform. Let's start with the sine
          wave's graph:
        </Paragraph>

        <MountWhenVisible
          currentStep={currentStep}
          belongsToStep="sine-wave-graph"
          estimatedSize={390}
        >
          <FrequencyGraph
            shape="sine"
            baseFrequency={frequency}
            baseAmplitude={amplitude}
          />
        </MountWhenVisible>

        <Paragraph>
          This graph is pretty uninteresting: we're playing a{' '}
          {roundTo(frequency, 1)}Hz tone, and so we see a spike at{' '}
          {roundTo(frequency, 1)}Hz.
        </Paragraph>
        <Sidebar>
          <Paragraph>
            Try changing the amplitude/frequency settings under the waveform to
            see how it affects this graph. This may help build an intuitive
            understanding of what this graph represents!
          </Paragraph>
        </Sidebar>
      </Aux>
    ),
  },
  'triangle-wave': {
    ...defaults,
    isPlaying: true,
    waveformShape: 'triangle',
    showAmplitudeSlider: true,
    showFrequencySlider: true,
    getMargin: marginFunctions.small,
    children: ({ frequency, amplitude, currentStep }) => (
      <Aux>
        <Heading>The Triangle Wave</Heading>

        <Paragraph>
          It looks quite a bit like a sine wave, but with the curviness removed.
          Instead, straight lines connect in triangle-like shapes.
        </Paragraph>

        <Paragraph>
          What effect does this have on the way it sounds? If you haven't
          already, go ahead and enable sound using the button in the top-right,
          and scroll between this and the previous section to hear the
          difference.
        </Paragraph>

        <Paragraph>
          Notice that the sound is a little "brighter"? It doesn't quite sound
          so muffled? This is because of <strong>harmonics</strong>
        </Paragraph>
      </Aux>
    ),
  },
  'triangle-wave-graph': {
    ...defaults,
    isPlaying: true,
    waveformShape: 'triangle',
    amplitudeOverride: 1,
    showAmplitudeSlider: true,
    showFrequencySlider: true,
    getMargin: marginFunctions.xsmall,
    children: ({ frequency, amplitude, currentStep }) => (
      <Aux>
        <Paragraph>
          Harmonics are additional frequencies that happen automatically with
          certain waveforms. We'll learn more about why that is soon, but first,
          let's graph these additional harmonics:
        </Paragraph>

        <MountWhenVisible
          currentStep={currentStep}
          belongsToStep="triangle-wave-graph"
          estimatedSize={390}
        >
          <FrequencyGraph
            shape="triangle"
            baseFrequency={frequency}
            baseAmplitude={amplitude}
          />
        </MountWhenVisible>
      </Aux>
    ),
  },
  'square-wave': {
    ...defaults,
    isPlaying: true,
    waveformShape: 'square',
    showAmplitudeSlider: true,
    showFrequencySlider: true,
    getMargin: marginFunctions.small,
    children: ({ frequency, amplitude, progress, currentStep }) => (
      <Aux>
        <Heading>The Square Wave</Heading>

        <Paragraph>
          The square wave is arguably the most extreme of the common periodic
          waveforms. It jumps between the highest and lowest possible values.
          It's a binary wave: it's either +1 or -1.
        </Paragraph>
      </Aux>
    ),
  },
  'square-wave-graph': {
    ...defaults,
    isPlaying: true,
    waveformShape: 'square',
    showAmplitudeSlider: true,
    showFrequencySlider: true,
    getMargin: marginFunctions.xsmall,
    children: ({ frequency, amplitude, currentStep }) => (
      <Aux>
        <Paragraph>
          In terms of harmonics, the square wave features exactly the same
          intervals as the triangle wave: Every "odd" harmonic (3rd, 5th, 7th,
          etc). The difference between the square and the triangle is that the
          square's harmonics are louder: they don't fall off so quickly, so you
          get more higher frequencies. This is plainly noticeable in the sound:
          squares sound much "brighter" than triangles.
        </Paragraph>

        <MountWhenVisible
          currentStep={currentStep}
          belongsToStep="square-wave-graph"
          estimatedSize={390}
        >
          <FrequencyGraph
            shape="square"
            baseFrequency={frequency}
            baseAmplitude={amplitude}
          />
        </MountWhenVisible>

        <Sidebar>
          <Paragraph>
            Unlike the previous two waveforms, a perfect square wave is
            impossible; it cannot exist in nature, we can only approximate it.
            Can you think of why that might be?
          </Paragraph>
          <Paragraph>
            <RevealableAnswer>
              Remember, the waveform represents the displacement of air
              molecules. Molecules cannot "teleport" from the +1 position to the
              -1 position. In reality, when a square wave is played through a
              speaker, it causes the air to move very quickly from both
              positions, but it is not instantaneous.
            </RevealableAnswer>
          </Paragraph>
        </Sidebar>
      </Aux>
    ),
  },
  'sawtooth-wave': {
    ...defaults,
    isPlaying: true,
    waveformShape: 'sawtooth',
    showAmplitudeSlider: true,
    showFrequencySlider: true,
    getMargin: marginFunctions.small,
    children: ({ frequency, amplitude, currentStep }) => (
      <Aux>
        <Heading>The Sawtooth Wave</Heading>

        <Paragraph>
          Finally, we have the sawtooth. Named after the blades of a saw, This
          waveform exhibits the linear rise of the triangle wave with the hard
          drop of the square wave.
        </Paragraph>

        <Paragraph>
          In terms of sound, it's vaguely similar to string instruments: when
          you run a bow across a violin's string, the friction between the two
          items causes the string to slip and catch, which causes the string to
          vibrate in a sawtooth-like pattern. Of course, real instruments
          produce far more complex waveforms than these basic ones!
        </Paragraph>
      </Aux>
    ),
  },
  'sawtooth-wave-graph': {
    ...defaults,
    isPlaying: true,
    waveformShape: 'sawtooth',
    showAmplitudeSlider: true,
    showFrequencySlider: true,
    getMargin: marginFunctions.xsmall,
    children: ({ frequency, amplitude, currentStep }) => (
      <Aux>
        <Paragraph>
          In terms of harmonics, sawtooth waveforms have additional frequencies
          at every interval, unlike triangles and squares which only add
          harmonics at every second interval.
        </Paragraph>

        <MountWhenVisible
          currentStep={currentStep}
          belongsToStep="sawtooth-wave-graph"
          estimatedSize={390}
        >
          <FrequencyGraph
            shape="sawtooth"
            baseFrequency={frequency}
            baseAmplitude={amplitude}
          />
        </MountWhenVisible>
      </Aux>
    ),
  },
  'additive-synthesis-intro': {
    ...defaults,
    children: (
      <Aux>
        <SectionTitle>4. Additive Synthesis</SectionTitle>
        <Paragraph>
          In the previous section, we learned about how different waveforms have
          different harmonics, but it's totally unclear <em>why</em> that's the
          case. For example, why does a square wave have all those extra tones
          when we're still just oscillating at a single frequency?
        </Paragraph>

        <Paragraph>
          To make sense of this, there's a surprising truth about waveforms:{' '}
          <strong>
            all of them can be built by just layering a bunch of sine waves on
            top of each other.
          </strong>
        </Paragraph>

        <WaveformEquation />

        <Paragraph>
          At first blush, this probably doesn't make any sense. How can sine
          waves be combined to make drastically-different waveforms like square
          or sawtooth?
        </Paragraph>

        <Paragraph>The answer lies in how waveform addition works.</Paragraph>
      </Aux>
    ),
  },
  'additive-synthesis-basic-add': {
    ...defaults,
    useWaveformAddition: true,
    harmonicsForOverride: 'square',
    numOfHarmonicsOverride: 2,

    getMargin: marginFunctions.small,
    children: ({ currentStep }) => (
      <Aux>
        <Paragraph>
          The waveform graph we've been looking at now shows multiple waves:
        </Paragraph>

        <UnorderedList>
          <li>
            <strong style={{ color: COLORS.primary[500] }}>1Hz at 1dB</strong>
          </li>
          <li>
            <strong style={{ color: COLORS.secondary[500] }}>
              3Hz at 0.33dB
            </strong>
          </li>
          <li>
            <strong style={{ color: COLORS.secondary[500] }}>
              5Hz at 0.2dB
            </strong>
          </li>
        </UnorderedList>

        <Paragraph>
          If you've ever used audio editing software, you've seen how a full
          song - which is comprised of many different instruments and sounds -
          creates a single wave. What we're looking at over there is not a wave
          yet: we have to combine the 3 lines into 1.
        </Paragraph>
        <Paragraph>
          This is known as <strong>waveform addition</strong>, and it makes
          sense when you think of it in real-world terms.
        </Paragraph>

        <Paragraph>
          Remember, sound is just the vibration of air molecules. If you play 3
          distinct tones, you don't get 3 separate air molecules vibrating at 3
          separate frequencies; the 3 tones combine to form a single waveform.
        </Paragraph>

        <Paragraph>
          How does the addition work? It's arithmetic: in our example, amplitude
          ranges from -1dB to 0dB. So, we can just add up the values. The 3
          waves will converge at a single point for every moment in time.
        </Paragraph>
      </Aux>
    ),
  },
  'additive-synthesis-intro-convergence': {
    ...defaults,
    useWaveformAddition: true,
    showConvergenceSlider: true,
    getMargin: marginFunctions.small,
    children: ({ frequency, amplitude, currentStep }) => (
      <Aux>
        <Paragraph>
          Use the new <strong>Convergence</strong> slider to watch the 3 lines
          converge into a single waveform.
        </Paragraph>

        <Paragraph>Notice how it kinda looks like a square wave?</Paragraph>

        <Paragraph>
          You were probably wondering where those numbers for the additional
          sine waves came from. Why were we adding 3Hz and 5Hz lines? Why were
          they at 0.33dB and 0.2dB?
        </Paragraph>

        <Paragraph>
          The answer is that we <em>reverse engineered</em> the square wave.
          Remember this chart, showing the harmonics for a square wave?
        </Paragraph>

        <MountWhenVisible
          currentStep={currentStep}
          belongsToStep="additive-synthesis-intro-convergence"
          estimatedSize={390}
        >
          <FrequencyGraph
            shape="square"
            baseFrequency={frequency}
            baseAmplitude={amplitude}
          />
        </MountWhenVisible>

        <Paragraph>
          We simply selected the first 3 numbers from this chart! Remember, a
          sine wave is the <strong>fundamental waveform</strong>. It doesn't
          have any harmonics of its own. So if we know the harmonics of any
          other waveform, we can just add sine waves in the right places to
          approximate them!
        </Paragraph>
      </Aux>
    ),
  },
  'additive-synthesis-intro-num-of-harmonics': {
    ...defaults,
    useWaveformAddition: true,
    showConvergenceSlider: true,
    showNumOfHarmonicsSlider: true,
    numOfHarmonicsOverride: 2,
    getMargin: marginFunctions.small,
    children: ({ frequency, amplitude, currentStep }) => (
      <Aux>
        <Paragraph>
          The more harmonics we add, the more our waveform starts to look like a
          square wave. Use the new <strong>Number of Harmonics</strong> slider
          to change the number rendered, and see how it affects the converged
          line.
        </Paragraph>
      </Aux>
    ),
  },
};

export const stepsArray = Object.entries(steps).map(([key, value]) => ({
  id: key,
  ...value,
}));
