import React from 'react';

import { COLORS, DEFAULT_WAVEFORM_SHAPE } from '../../constants';

import Header from '../Header';
import Paragraph from '../Paragraph';
import SectionTitle from '../SectionTitle';
import Sidebar from '../Sidebar';
import Aux from '../Aux';
import FrequencyGraph from '../FrequencyGraph';

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
  | 'triangle-wave'
  | 'square-wave'
  | 'sawtooth-wave';

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
  'triangle-wave',
  'square-wave',
  'sawtooth-wave',
];

export type StepData = {
  id: string,

  // Waveform/AirGrid parameters
  showWaveform: boolean,
  showAirGrid: boolean,
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
  highlightAirGridColumn: boolean,
  makeSoundToggleable: boolean,

  // Section parameters
  getMargin: (windowWidth: number) => number,
  children: React$Node,
};

const marginFunctions = {
  none: windowHeight => 0,
  small: windowHeight => windowHeight * 0.35,
  large: windowHeight => windowHeight * 0.45,
};

const defaults: StepData = {
  showWaveform: true,
  showAirGrid: false,
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
  highlightAirGridColumn: false,
  makeSoundToggleable: false,
  getMargin: marginFunctions.large,
};

export const steps = {
  title: {
    ...defaults,
    showYAxis: false,
    getMargin: marginFunctions.none,
    children: <Header />,
  },
  'about-this-thing': {
    ...defaults,
    isPlaying: true,
    showYAxis: false,
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
    makeSoundToggleable: true,
    getMargin: marginFunctions.small,
    children: (
      <Aux>
        <Paragraph>
          Because this guide deals with audio waveforms, it's beneficial to be
          able to hear stuff. This way, when you change parameters, you can hear
          the difference it makes.
        </Paragraph>
        <Paragraph>
          That said, nobody likes webpages that autoplay sound. So, when there's
          something to hear, a button will pop up in the top right corner to
          toggle audio on/off.
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
    makeSoundToggleable: true,
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
    isPlaying: true,
    waveformColor: COLORS.gray[700],
    waveformOpacity: 0.5,
    xAxisOpacity: 0.5,
    yAxisOpacity: 0.5,
    showYAxisIntercept: true,
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
    showWaveform: false,
    showAirGrid: true,
    isPlaying: true,
    waveformColor: COLORS.gray[700],
    waveformOpacity: 0.5,
    xAxisOpacity: 0.5,
    yAxisOpacity: 0.5,
    showYAxisIntercept: true,
    showAmplitudeSlider: true,
    showFrequencySlider: true,
    frequencySliderMax: 2,
    children: (
      <Aux>
        <Paragraph>
          Sound is vibration. That blue dot's motion? That's what molecules in
          the air do, when a sine wave is played.
        </Paragraph>

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
    showWaveform: false,
    showAirGrid: true,
    isPlaying: true,
    waveformColor: COLORS.gray[700],
    waveformOpacity: 0.5,
    xAxisOpacity: 0.5,
    yAxisOpacity: 0.5,
    showYAxisIntercept: true,
    showAmplitudeSlider: true,
    showFrequencySlider: true,
    highlightAirGridColumn: true,
    frequencySliderMax: 2,
    children: (
      <Aux>
        <Paragraph>
          How does this relate to our previous waveforms? Notice how a single
          particle moves back and forth. Does the pattern seem familiar? Each
          particle is moving in a sine wave, same as our waveform.
        </Paragraph>
      </Aux>
    ),
  },
  'harmonics-intro': {
    ...defaults,
    frequencyOverride: 2,
    amplitudeOverride: 1,
    showAmplitudeSlider: true,
    showFrequencySlider: true,
    makeSoundToggleable: true,
    children: ({ frequency, amplitude }) => (
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

        <Paragraph>
          To understand what this means, let's take a look at a graph of the
          frequencies audible for a given waveform. Let's start with the sine
          wave's graph:
        </Paragraph>

        <FrequencyGraph
          shape="sine"
          baseFrequency={frequency}
          baseAmplitude={amplitude}
        />

        <Paragraph>
          The graph is pretty empty, because sine waves don't have any
          harmonics.
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
    isPlaying: false,
    waveformShape: 'triangle',
    frequencyOverride: 2,
    amplitudeOverride: 1,
    showAmplitudeSlider: true,
    showFrequencySlider: true,
    makeSoundToggleable: true,
    getMargin: marginFunctions.small,
    children: ({ frequency, amplitude }) => (
      <Aux>
        <Paragraph>
          Here's another common waveform: the <strong>triangle wave</strong>.
        </Paragraph>

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

        <Paragraph>
          Harmonics are additional frequencies that happen automatically with
          certain waveforms. We'll learn more about why that is soon, but first,
          let's graph these additional harmonics:
        </Paragraph>

        <FrequencyGraph
          shape="triangle"
          baseFrequency={frequency}
          baseAmplitude={amplitude}
        />
      </Aux>
    ),
  },
  'square-wave': {
    ...defaults,
    isPlaying: false,
    waveformShape: 'square',
    frequencyOverride: 2,
    amplitudeOverride: 1,
    showAmplitudeSlider: true,
    showFrequencySlider: true,
    makeSoundToggleable: true,
    getMargin: marginFunctions.small,
    children: ({ frequency, amplitude }) => (
      <Aux>
        <Paragraph>Square wave</Paragraph>

        <FrequencyGraph
          shape="square"
          baseFrequency={frequency}
          baseAmplitude={amplitude}
        />
      </Aux>
    ),
  },
  'sawtooth-wave': {
    ...defaults,
    isPlaying: false,
    waveformShape: 'sawtooth',
    frequencyOverride: 2,
    amplitudeOverride: 1,
    showAmplitudeSlider: true,
    showFrequencySlider: true,
    makeSoundToggleable: true,
    getMargin: marginFunctions.small,
    children: ({ frequency, amplitude }) => (
      <Aux>
        <Paragraph>sawtooth wave</Paragraph>

        <FrequencyGraph
          shape="sawtooth"
          baseFrequency={frequency}
          baseAmplitude={amplitude}
        />
      </Aux>
    ),
  },
};

export const stepsArray = Object.entries(steps).map(([key, value]) => ({
  id: key,
  ...value,
}));
