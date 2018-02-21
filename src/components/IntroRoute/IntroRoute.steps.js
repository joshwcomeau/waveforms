import React, { Fragment } from 'react';

import { COLORS, DEFAULT_WAVEFORM_SHAPE } from '../../constants';
import { roundTo } from '../../utils';

import Header from '../Header';
import Paragraph from '../Paragraph';
import SectionTitle from '../SectionTitle';
import Heading from '../Heading';
import Emphasized from '../Emphasized';
import Sidebar from '../Sidebar';
import FrequencyGraph from '../FrequencyGraph';
import IntroRouteAirGrid from '../IntroRouteAirGrid';
import MountWhenVisible from '../MountWhenVisible';
import RevealableAnswer from '../RevealableAnswer';
import WaveformEquation from '../WaveformEquation';
import UnorderedList from '../UnorderedList';
import KeyboardCharacter from '../KeyboardCharacter';
import PortraitOnly from '../PortraitOnly';
import LandscapeOnly from '../LandscapeOnly';
import Link from '../Link';
import SliderIcon from '../SliderIcon';

import type {
  WaveformShape,
  HarmonicsForShape,
  WaveformAdditionType,
} from '../../types';

export type IntroStep =
  | 'title'
  | 'about-this-thing'
  | 'about-sound-toggling'
  | 'reading-waveform-graphs-intro'
  | 'x-axis-time'
  | 'y-axis-displacement'
  | 'y-axis-amplitude'
  | 'y-axis-amplitude-with-control'
  | 'frequency-introduction'
  | 'frequency-introduction-pt2'
  | 'frequency-with-control'
  | 'reading-waveform-graphs-summary'
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
  | 'additive-synthesis-intro-num-of-harmonics'
  | 'additive-synthesis-harmonics-tie-in'
  | 'additive-synthesis-phase'
  | 'additive-synthesis-noise-cancelling'
  | 'additive-synthesis-music'
  | 'conclusion'
  | 'over';

export const INTRO_STEPS: Array<IntroStep> = [
  'title',
  'about-this-thing',
  'about-sound-toggling',
  'reading-waveform-graphs-intro',
  'x-axis-time',
  'y-axis-displacement',
  'y-axis-amplitude',
  'y-axis-amplitude-with-control',
  'frequency-introduction',
  'frequency-introduction-pt2',
  'frequency-with-control',
  'reading-waveform-graphs-summary',
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
  'additive-synthesis-harmonics-tie-in',
  'additive-synthesis-phase',
  'additive-synthesis-noise-cancelling',
  'additive-synthesis-music',
  'conclusion',
  'over',
];

export type StepData = {
  id: string,

  // Waveform parameters
  showWaveform: boolean,
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
  waveformAdditionType: WaveformAdditionType,
  showNumOfHarmonicsSlider: boolean,
  showConvergenceSlider: boolean,
  showPhaseSlider: boolean,
  harmonicsForShapeOverride: HarmonicsForShape,
  numOfHarmonicsOverride: number,
  convergenceOverride: number,
  phaseOverride: number,

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
  showWaveform: true,
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
  waveformAdditionType: 'harmonics',
  showNumOfHarmonicsSlider: false,
  showConvergenceSlider: false,
  showPhaseSlider: false,

  getMargin: marginFunctions.large,
};

const waveformPosition = (
  <Fragment>
    <PortraitOnly>below</PortraitOnly>
    <LandscapeOnly>to the left</LandscapeOnly>
  </Fragment>
);

export const steps = {
  title: {
    ...defaults,
    frequencyOverride: 1,
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
      <Fragment>
        <Paragraph>Hi there!</Paragraph>
        <Paragraph>
          This interactive guide introduces and explores waveforms. We'll cover
          how to read these funny shapes, go over the fundamental physics of
          sound, learn how it relates to music and harmony, and discover how to
          build complex tones from simple ones.
        </Paragraph>
        <Paragraph>
          This guide is aimed at a general audience–no prior knowledge is
          required. It may be of particular interest to musicians, producers,
          and aspiring audio engineers, but it's designed to be accessible to
          everyone!
        </Paragraph>
      </Fragment>
    ),
  },
  'about-sound-toggling': {
    ...defaults,
    isPlaying: true,
    showYAxis: false,
    getMargin: marginFunctions.small,
    children: ({ orientation }) => (
      <Fragment>
        <Heading>Listen in</Heading>
        <Paragraph>
          This guide deals with audio waves, and so it's beneficial to be able
          to hear stuff. This way, when you change parameters, you can hear the
          difference it makes.
        </Paragraph>
        <Paragraph>
          Because nobody likes autoplaying sounds, the volume is currently
          muted. You can control it using the "volume" widget in the{' '}
          <PortraitOnly>top-right</PortraitOnly>
          <LandscapeOnly>bottom-left</LandscapeOnly> corner.
        </Paragraph>
        <LandscapeOnly>
          <Paragraph>
            You can also use <strong>keyboard shortcuts</strong>! The numbers{' '}
            <KeyboardCharacter>0</KeyboardCharacter> –{' '}
            <KeyboardCharacter>9</KeyboardCharacter> control the volume. You can
            also press <KeyboardCharacter>M</KeyboardCharacter> to mute or
            unmute the audio.
          </Paragraph>
          <Paragraph>
            <Emphasized>
              Try it now by pressing <KeyboardCharacter>M</KeyboardCharacter> on
              your keyboard!
            </Emphasized>
          </Paragraph>

          <Paragraph>You should hear a constant bass tone.</Paragraph>
        </LandscapeOnly>
      </Fragment>
    ),
  },
  'reading-waveform-graphs-intro': {
    ...defaults,
    children: (
      <Fragment>
        <SectionTitle>1. Reading Waveforms</SectionTitle>
        <Paragraph>
          First, let's take a closer look at the waveform {waveformPosition}.
        </Paragraph>

        <Paragraph>
          We're looking at a graph, a data visualization. The blue line is the
          data we're graphing, and it represents a sound wave. Specifically,
          it's telling us about the wave's <strong>displacement</strong>, and
          how it changes over <strong>time</strong>.
        </Paragraph>

        <Paragraph>Let's dig into what that means.</Paragraph>
      </Fragment>
    ),
  },
  'x-axis-time': {
    ...defaults,
    waveformOpacity: 0.5,
    showXAxisLabels: true,
    getMargin: marginFunctions.xsmall,
    children: (
      <Fragment>
        <Heading>Time</Heading>
        <Paragraph>
          The horizontal line, our X axis, represents <strong>time</strong>.
        </Paragraph>

        <Paragraph>
          In this case, our graph is showing a 1-second interval.
        </Paragraph>
      </Fragment>
    ),
  },
  'y-axis-displacement': {
    ...defaults,
    waveformOpacity: 0.5,
    showYAxisLabels: true,
    showXAxis: false,
    getMargin: marginFunctions.xsmall,
    children: (
      <Fragment>
        <Heading>Displacement</Heading>
        <Paragraph>
          When you pluck a guitar's string, you cause the string to wobble back
          and forth. If you had a zoomed-in, slow-motion camera, you'd be able
          to see that it oscillates from side to side, like a clock's pendulum.
        </Paragraph>

        <Paragraph>
          If you had the world's smallest ruler, you could measure the distance
          that the string moves from its default, resting position.
        </Paragraph>

        <Paragraph>
          When the guitar string vibrates, it causes a chain reaction with the
          air molecules around it; they all start vibrating as well, radiating
          outwards.
        </Paragraph>

        <Paragraph>
          Our Y-axis measures <strong>displacement</strong> of air molecules.
          It's a measure of a sound wave's loudness; a lightly-strummed guitar
          string only vibrates a little bit, so the displacement would be tiny.
          If you pick the string, pull it back an inch, and release, the
          string's displacement would be much higher, which would create a much
          louder sound wave.
        </Paragraph>

        <Paragraph>
          The waveform {waveformPosition} shows a single oscillation of a sound
          wave. It starts by displacing the air molecule in the positive
          direction by '1', and then in the negative direction by '-1'.
        </Paragraph>

        <Sidebar>
          <Paragraph>
            This is not a feature unique to guitar strings. Speakers work much
            the same way; if you play music loud enough through a speaker, you
            may notice its cone actually moving back and forth; the speaker
            moves, to kick-off the chain reaction of vibrating air molecules.
          </Paragraph>

          <Paragraph>
            Indeed, this is a fundamental feature of sound. Sound is created by
            something vibrating, and that vibration moves through the air in the
            form of a sound wave.
          </Paragraph>

          <Paragraph>
            This idea is explored in much greater detail in Part 2, below.
          </Paragraph>
        </Sidebar>
      </Fragment>
    ),
  },
  'y-axis-amplitude': {
    ...defaults,
    waveformOpacity: 0.5,
    showYAxisLabels: true,
    showXAxis: false,
    getMargin: marginFunctions.xsmall,
    children: (
      <Fragment>
        <Heading>Amplitude</Heading>
        <Paragraph>
          Waveforms are abstract representations of sound waves. While a real
          sound wave might displace an air molecule by 4 nanometers, we tend to
          use abstract measurements when dealing with waveforms.
        </Paragraph>

        <Paragraph>
          This is where <strong>amplitude</strong> comes in. It measures how
          much a molecule is displaced from its resting position. In our case,
          we're measuring it from 0 (silent) to 1 (the maximum amount
          displaced).
        </Paragraph>

        <Paragraph>
          Amplitude can be thought of as loudness. The more the air molecules
          are displaced, the louder the sound seems to us.
        </Paragraph>

        <Sidebar>
          <Paragraph>
            "Amplitude = loudness" is a bit of an oversimplification. Loudness
            is based on human perception.
          </Paragraph>

          <Paragraph>
            For example, imagine someone cheering in the apartment next door.
            The wall does a good job at dampening the displacement of air
            molecules, and so by the time the wave reaches your ears, the
            amplitude is probably quite low. But, because humans perceive
            cheering as a "loud sound", it might not seem as quiet as, say, the
            television you're watching, even if that television is displacing
            the air more than the cheering.
          </Paragraph>
        </Sidebar>
      </Fragment>
    ),
  },
  'y-axis-amplitude-with-control': {
    ...defaults,
    frequencyOverride: 1,
    getMargin: marginFunctions.xsmall,
    showYAxisLabels: true,
    showXAxis: false,
    showAmplitudeSlider: true,
    children: (
      <Fragment>
        <Paragraph>
          Let's make this interactive! Use the{' '}
          <SliderIcon fieldName="amplitude" />{' '}
          <LandscapeOnly>below</LandscapeOnly>
          <PortraitOnly>above</PortraitOnly> the waveform to see how changing
          the amplitude of the waveform affects the graph.
        </Paragraph>

        <Paragraph>
          Try setting it all the way to 0, and notice how the line flattens out.
          0 amplitude means that it's completely silent.
        </Paragraph>

        <br />

        <Sidebar type="summary">
          <Paragraph>
            A waveform is a <strong>graph</strong> that shows a wave's change in{' '}
            <strong>displacement</strong> over <strong>time</strong>. A
            waveform's <strong>amplitude</strong> controls the wave's maximum
            displacement.
          </Paragraph>
        </Sidebar>
      </Fragment>
    ),
  },
  'frequency-introduction': {
    ...defaults,
    amplitudeOverride: 1,
    frequencyOverride: 2,
    waveformOpacity: 0.5,
    showXAxisLabels: true,
    showCycleIndicator: true,
    children: (
      <Fragment>
        <Heading>Frequency</Heading>

        <Paragraph>
          The waveform has been updated so that it repeats twice in the
          available time (or, phrased another way, it's twice as fast).
        </Paragraph>

        <Paragraph>
          The waveform we're looking at is <strong>periodic</strong>; this means
          that the waveform can be repeated to produce a constant tone. When you
          unmute the sound, notice how the sound is totally consistent; it
          doesn't change from one second to the next. Periodic waveforms allow
          you to produce constant sound by repeating the waveform over and over.
          This differs from, say, a piano, where the quality of the note changes
          over time.
        </Paragraph>

        <Paragraph>
          <strong>Frequency</strong> is a measure of how many times the waveform
          repeats in a given amount of time. The common unit of measurement for
          frequency is the <em>Hertz</em>, abbreviated as "Hz", which represents
          the number of repetitions per second.
        </Paragraph>

        <Paragraph>
          Because we know that this waveform graph shows a 1-second interval, we
          can deduce that this wave is oscillating at <strong>2Hz</strong>.
        </Paragraph>
      </Fragment>
    ),
  },
  'frequency-introduction-pt2': {
    ...defaults,
    getMargin: marginFunctions.xsmall,
    waveformOpacity: 0.5,
    showXAxisLabels: true,
    frequencyOverride: 2,
    children: (
      <Fragment>
        <Paragraph>
          Frequency is similar to "pitch". The faster a wave repeats itself, the
          higher the pitch of the note.
        </Paragraph>

        <Paragraph>
          For example, when a singer sings an "A4" note (The "A" in the middle
          of a typical piano), their throat vibrates at 440Hz. If their voice
          raises to a "C5" note, 3 semitones higher, their throat would vibrate
          at ~523Hz.
        </Paragraph>

        <Paragraph>
          This phenomenon doesn't just happen with music. Think about a car's
          engine, and how the faster it "revs", the higher the pitch. The same
          can be said for a hand mixer, or a drill. Any physical object that
          makes noise doing the same thing hundreds or thousands of times a
          second should have a discernable pitch.
        </Paragraph>

        <Paragraph>
          Not all sound is periodic, though. For example, white noise—the sound
          of static, or waves crashing on the beach—is just a uniform
          distribution of audible frequencies. Because it isn't periodic, it
          doesn't have a discernable pitch.
        </Paragraph>

        <Sidebar type="warning">
          <Paragraph>
            It's important to point out that the waveforms we've been dealing
            with so far, at 1Hz and 2Hz, have been far too low-frequency to be
            audible. Perfect human hearing ranges from 20Hz to 20,000Hz, with
            20Hz being the lowest sub-bass you can hear.
          </Paragraph>
          <Paragraph>
            The reason for this discrepancy is that it's much easier to teach
            the concepts when the waves are slower. For example, you wouldn't be
            able to see a 440Hz wave oscillate: it's much too fast.
          </Paragraph>
          <Paragraph>
            The wave you hear when you unmute the sound is about{' '}
            <strong>100 times faster</strong> than the waveform being
            visualized.
          </Paragraph>
        </Sidebar>
      </Fragment>
    ),
  },
  'frequency-with-control': {
    ...defaults,
    getMargin: marginFunctions.small,
    showAmplitudeSlider: true,
    showFrequencySlider: true,
    children: (
      <Fragment>
        <Paragraph>
          Try tweaking the frequency with the{' '}
          <SliderIcon fieldName="frequency" />.
        </Paragraph>
        <Paragraph>
          Don't forget to enable sound with the{' '}
          <LandscapeOnly>
            <KeyboardCharacter>M</KeyboardCharacter> key
          </LandscapeOnly>
          <PortraitOnly>volume control above</PortraitOnly> to see how frequency
          and amplitude affect the resulting sound!
        </Paragraph>
      </Fragment>
    ),
  },
  'reading-waveform-graphs-summary': {
    ...defaults,
    children: (
      <Fragment>
        <Sidebar type="summary">
          <Paragraph>
            A waveform is just a schematic that helps us understand sound waves.
            They measure an air molecule's displacement over time. We can adjust
            the amplitude of a waveform to make it louder/quieter, and we can
            adjust the frequency of a waveform to make the pitch higher/lower.
          </Paragraph>
        </Sidebar>
      </Fragment>
    ),
  },
  'how-sound-works-intro': {
    ...defaults,
    waveformColor: COLORS.gray[700],
    waveformOpacity: 0.5,
    xAxisOpacity: 0.5,
    yAxisOpacity: 0.5,
    amplitudeOverride: 1,
    frequencyOverride: 1,
    children: (
      <Fragment>
        <SectionTitle>2. How Sound Works</SectionTitle>

        <Paragraph>
          In Part 1, we scratched the surface of how sound works, by thinking of
          displacement in terms of a vibrating guitar string, and the effect it
          has on sound molecules. Let's see if we can unravel this a bit more.
        </Paragraph>
      </Fragment>
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
    getMargin: marginFunctions.xsmall,
    children: ({ amplitude, frequency, progress, currentStep }) => (
      <Fragment>
        <Paragraph>
          The air around us is filled with molecules. When you play a sound out
          of a speaker, the speaker vibrates really quickly. That vibration
          moves through the molecules in the air, like a chain reaction, until
          it reaches your ear and is processed by the brain as sound.
        </Paragraph>

        <Paragraph>
          Imagine that each dot in this grid is an air molecule:
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
          Each dot is oscillating back and forth by a displacement controlled by
          the amplitude, and with a speed specified by the frequency.
        </Paragraph>

        <Paragraph>
          Because this is a chain reaction, you can see the effects of the
          vibrations moving from left to right, but this is a bit of an optical
          illusion: the air molecules themselves aren't flying across the space,
          they're just vibrating. But that vibration moves through the field.
        </Paragraph>
      </Fragment>
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
    getMargin: marginFunctions.small,
    children: ({ amplitude, frequency, progress, currentStep }) => (
      <Fragment>
        <Paragraph>
          The waveform we've been looking at {waveformPosition} shows the
          oscillation of a single air molecule. Compare the blue dot added to
          the waveform graph indicating the current displacement with the first
          column of air molecules in the grid below:
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
            direction="vertical"
          />
        </MountWhenVisible>

        <Paragraph>
          Because our waveform graph is just a representation of the change in
          displacement over time, it maps directly to what's actually happening
          with the air molecules!
        </Paragraph>

        <Paragraph>
          If you haven't already, try fiddling with the{' '}
          <SliderIcon fieldName="amplitude" /> and{' '}
          <SliderIcon fieldName="frequency" /> to see how it affects the air
          molecules in the grid.
        </Paragraph>
      </Fragment>
    ),
  },
  'harmonics-intro': {
    ...defaults,
    isPlaying: true,
    children: ({ frequency, amplitude, currentStep }) => (
      <Fragment>
        <SectionTitle>3. Harmonics</SectionTitle>
        <Paragraph>
          So far, we've been tweaking the amplitude and frequency of a waveform,
          but we've been using the same <strong>waveform shape</strong> all
          along.
        </Paragraph>

        <Paragraph>
          The shape of a waveform refers to the curve of the waveform line; in
          other words, how the displacement changes over time.
        </Paragraph>

        <Paragraph>
          We've been looking at a <strong>sine waveform</strong>. Its origins
          come from trigonometry, and it's known as the{' '}
          <em>fundamental waveform</em>.
        </Paragraph>

        <Paragraph>
          This is because it's pure: there are no "side effects". When you play
          a 440Hz sine wave, the only frequency you hear is 440Hz. Sine waves
          are the "vanilla" wave; it doesn't have any bells or whistles.
        </Paragraph>

        <Paragraph>
          When a waveform has "side effect" frequencies, we call them{' '}
          <strong>harmonics</strong>.
        </Paragraph>

        <Sidebar>
          <Paragraph>
            Curious to learn more about how the sine wave is derived from
            mathematics? There's an awesome{' '}
            <Link
              external
              target="_blank"
              to="https://www.khanacademy.org/math/algebra2/trig-functions/graphs-of-sine-cosine-tangent-alg2/v/we-graph-domain-and-range-of-sine-function"
            >
              Khan Academy video
            </Link>{' '}
            on the subject!
          </Paragraph>
        </Sidebar>
      </Fragment>
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
      <Fragment>
        <Paragraph>
          To help us understand how harmonics work, we need a way to represent
          the additional frequencies. Let's use a bar graph. Here's the sine
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
          This graph is pretty boring. Because the sine waveform is the{' '}
          <em>fundamental</em> waveform, it doesn't have any harmonies! What you
          see is what you get. A {roundTo(frequency, 1)}Hz wave plays a{' '}
          {roundTo(frequency, 1)}Hz tone, and that's it.
        </Paragraph>

        <Sidebar>
          <Paragraph>
            If this graph doesn't quite make sense, try fiddling with the
            amplitude/frequency sliders. This may help build an intuitive
            understanding of what this graph represents!
          </Paragraph>
        </Sidebar>
      </Fragment>
    ),
  },
  'triangle-wave': {
    ...defaults,
    isPlaying: true,
    frequencyOverride: 1,
    amplitudeOverride: 1,
    waveformShape: 'triangle',
    showAmplitudeSlider: true,
    showFrequencySlider: true,
    getMargin: marginFunctions.small,
    children: ({ frequency, amplitude, currentStep }) => (
      <Fragment>
        <Heading>The Triangle Waveform</Heading>
        <Paragraph>Woo, our first non-sine waveform!</Paragraph>

        <Paragraph>
          It looks quite a bit like the sine, but with the curviness removed.
          Instead, straight lines connect in triangle-like shapes.
        </Paragraph>

        <Paragraph>
          What effect does this have on the way it sounds? If you haven't
          already, go ahead and enable sound using the{' '}
          <LandscapeOnly>
            <KeyboardCharacter>M</KeyboardCharacter> key
          </LandscapeOnly>
          <PortraitOnly>audio controls above</PortraitOnly>, and scroll between
          this and the previous section to hear the difference.
        </Paragraph>

        <Paragraph>
          Notice that the sound is a little "brighter"? It doesn't quite sound
          so muffled? This is because of <strong>harmonics</strong>.
        </Paragraph>
      </Fragment>
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
      <Fragment>
        <Paragraph>
          Harmonics are additional frequencies that are created by certain
          waveforms. We'll learn more about why that is soon, but first, let's
          graph these additional harmonics:
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

        <Paragraph>
          Harmonics are always a multiple of the root frequency. Different
          waveforms have different selections, but they always follow the same
          pattern:
        </Paragraph>

        <UnorderedList>
          <li>Fundamental note (root frequency): {roundTo(frequency, 2)}Hz.</li>
          <li>
            Second harmonic (2x frequency): {roundTo(frequency * 2, 2)}Hz.
          </li>
          <li>Third harmonic (3x frequency): {roundTo(frequency * 3, 2)}Hz.</li>
          <li>
            Fourth harmonic (4x frequency): {roundTo(frequency * 4, 2)}Hz.
          </li>
          <li>... This pattern continues to infinity.</li>
        </UnorderedList>

        <Paragraph>
          Triangle waves only have <em>odd harmonics</em>. That means they have
          the root note, 3rd harmonic, 5th harmonic, 7th harmonic, and so on.
          These harmonics "taper off" as you get further away from the root
          frequency.
        </Paragraph>
      </Fragment>
    ),
  },
  'square-wave': {
    ...defaults,
    isPlaying: true,
    frequencyOverride: 1,
    amplitudeOverride: 1,
    waveformShape: 'square',
    showAmplitudeSlider: true,
    showFrequencySlider: true,
    getMargin: marginFunctions.small,
    children: ({ frequency, amplitude, progress, currentStep }) => (
      <Fragment>
        <Heading>The Square Waveform</Heading>

        <Paragraph>
          The square waveform is arguably the most extreme of the common
          periodic waveforms. It jumps between the highest and lowest possible
          values. It's a binary wave: it's either +1 or -1.
        </Paragraph>
      </Fragment>
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
      <Fragment>
        <Paragraph>
          The square waveform features exactly the same harmonics as the
          triangle waveform: Every "odd" harmonic (3rd, 5th, 7th, etc). The
          difference is that the square wave harmonics don't "fall off" as much
          the further you get from the root frequency. Look at how much louder
          the higher-frequency harmonics are for square waves:
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

        <Paragraph>
          This is plainly noticeable in the sound: squares sound much "brighter"
          than triangles.
        </Paragraph>

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
      </Fragment>
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
      <Fragment>
        <Heading>The Sawtooth Waveform</Heading>

        <Paragraph>
          Finally, we have the sawtooth. Named after the blades of a saw, This
          waveform exhibits the linear rise of the triangle waveform with the
          hard drop of the square waveform.
        </Paragraph>

        <Paragraph>
          In terms of sound, it's vaguely similar to string instruments: when
          you run a bow across a violin's string, the friction between the two
          items causes the string to slip and catch, which causes the string to
          vibrate in a sawtooth-like pattern. Of course, real instruments
          produce far more complex waves than these basic waveforms!
        </Paragraph>
      </Fragment>
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
      <Fragment>
        <Paragraph>
          In terms of harmonics, sawtooth waveforms have additional frequencies
          at <em>every multiple of the root frequency</em>, unlike triangles and
          squares which only have odd harmonics.
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
      </Fragment>
    ),
  },
  'additive-synthesis-intro': {
    ...defaults,
    frequencyOverride: 1,
    children: (
      <Fragment>
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
      </Fragment>
    ),
  },
  'additive-synthesis-basic-add': {
    ...defaults,
    useWaveformAddition: true,
    harmonicsForShapeOverride: 'square',
    numOfHarmonicsOverride: 1,
    convergenceOverride: 0,
    getMargin: marginFunctions.small,
    children: ({ currentStep }) => (
      <Fragment>
        <Paragraph>
          The waveform graph we've been looking at now shows two waves:
        </Paragraph>

        <UnorderedList>
          <li>
            <strong style={{ color: COLORS.primary[500] }}>
              1Hz at 1 amplitude
            </strong>
          </li>
          <li>
            <strong style={{ color: COLORS.secondary[500] }}>
              3Hz at 0.33 amplitude
            </strong>
          </li>
        </UnorderedList>

        <Paragraph>
          Put another way, this second wave is 3 times as fast, but at one-third
          the amplitude.
        </Paragraph>

        <Paragraph>
          If you've ever used audio editing software, you've seen how a full
          song—which is comprised of many different instruments and
          sounds—creates a single waveform. What we're looking at over there is
          not a waveform yet: we have to merge the two lines to form one.
        </Paragraph>

        <Paragraph>
          This is known as <strong>waveform addition</strong>. Let's try to
          understand it in real-world terms.
        </Paragraph>

        <Paragraph>
          Remember, sound is just the vibration of air molecules. If you play 2
          distinct tones, they both cause the air molecules to vibrate. A game
          of tug-of-war has 2 people pulling on a rope, and the displacement of
          the rope is the result of both people's effort.
        </Paragraph>

        <Paragraph>
          So, we just need to "add" the two waveforms together to get our end
          result. How does the addition work? It's arithmetic: imagine the
          waveform graph as a bunch of individual points. At each point, you
          simply add the individual displacement values. The new set of points
          is our new single waveform.
        </Paragraph>
      </Fragment>
    ),
  },
  'additive-synthesis-intro-convergence': {
    ...defaults,
    useWaveformAddition: true,
    harmonicsForShapeOverride: 'square',
    numOfHarmonicsOverride: 1,
    showConvergenceSlider: true,
    getMargin: marginFunctions.small,
    children: ({ frequency, amplitude, currentStep }) => (
      <Fragment>
        <Paragraph>
          Use the new <strong>Convergence</strong> slider to watch as the two
          lines are added together.
        </Paragraph>

        <Paragraph>
          Notice how it kinda looks like a square wave, if you squint?
        </Paragraph>
      </Fragment>
    ),
  },
  'additive-synthesis-intro-num-of-harmonics': {
    ...defaults,
    useWaveformAddition: true,
    harmonicsForShapeOverride: 'square',
    showConvergenceSlider: true,
    getMargin: marginFunctions.xsmall,
    children: ({ frequency, amplitude, currentStep }) => (
      <Fragment>
        <Paragraph>
          You might be wondering where the values for that first harmonic came
          from. Why did we choose these waveforms specifically?
        </Paragraph>

        <UnorderedList>
          <li>
            <strong style={{ color: COLORS.primary[500] }}>
              1Hz at 1 amplitude
            </strong>
          </li>
          <li>
            <strong style={{ color: COLORS.secondary[500] }}>
              3Hz at 0.33 amplitude
            </strong>
          </li>
        </UnorderedList>

        <Paragraph>
          The answer is that we <em>reverse engineered</em> the square waveform.
          Remember this chart, showing the harmonics for a square wave?
        </Paragraph>

        <MountWhenVisible
          currentStep={currentStep}
          belongsToStep="additive-synthesis-intro-num-of-harmonics"
          estimatedSize={390}
        >
          <FrequencyGraph
            shape="square"
            baseFrequency={frequency}
            baseAmplitude={amplitude}
          />
        </MountWhenVisible>

        <Paragraph>
          The two waves we're graphing are the 2 first waves in this chart!
        </Paragraph>
      </Fragment>
    ),
  },
  'additive-synthesis-harmonics-tie-in': {
    ...defaults,
    useWaveformAddition: true,
    harmonicsForShapeOverride: 'square',
    numOfHarmonicsOverride: 1,
    showConvergenceSlider: true,
    showNumOfHarmonicsSlider: true,
    getMargin: marginFunctions.xsmall,
    children: ({ frequency, amplitude, currentStep }) => (
      <Fragment>
        <Paragraph>
          The more harmonics we add from this chart, the more our waveform
          starts to look like a square wave. Use the new{' '}
          <SliderIcon fieldName="# of Harmonics" /> to change the number, and
          see how it affects the converged line.
        </Paragraph>
      </Fragment>
    ),
  },
  'additive-synthesis-phase': {
    ...defaults,
    frequencyOverride: 2,
    amplitudeOverride: 0.75,
    useWaveformAddition: true,
    waveformAdditionType: 'phase',
    showPhaseSlider: true,
    convergenceOverride: 0,
    phaseOverride: 36,
    showConvergenceSlider: true,
    children: ({ frequency, amplitude, currentStep }) => (
      <Fragment>
        <Heading>Phase</Heading>
        <Paragraph>
          Something counter-intuitive about waveform addition is that it doesn't
          always make the resulting sound louder.
        </Paragraph>
        <Paragraph>
          To demonstrate this more clearly, first we have to learn about another
          waveform property: <strong>phase</strong>.
        </Paragraph>

        <Paragraph>
          Simply put, phase is the amount of offset applied to a wave, measured
          in degrees. If a wave is 180 degrees out of phase, for example, that
          means it's delayed by 50% of its period.
        </Paragraph>

        <Paragraph>
          Our waveform graph on the right has been updated to show two identical
          waves in terms of amplitude and frequency. Try adjusting the new{' '}
          <SliderIcon fieldName="phase" /> to see how phase affects the second
          waveform, relative to the first.
        </Paragraph>
      </Fragment>
    ),
  },
  'additive-synthesis-noise-cancelling': {
    ...defaults,
    useWaveformAddition: true,
    waveformAdditionType: 'phase',
    showPhaseSlider: true,
    convergenceOverride: 0,
    showConvergenceSlider: true,
    getMargin: marginFunctions.xsmall,
    children: ({ frequency, amplitude, currentStep }) => (
      <Fragment>
        <Paragraph>
          Try adjusting the <SliderIcon fieldName="convergence" /> to see how
          the phase of a waveform affects how loud the resulting wave is.
        </Paragraph>

        <Sidebar>
          <Paragraph>
            Incidentally, this is exactly how noise-cancelling headphones work!
            They record the ambient noise around the headphones, offset its
            phase by 180 degrees, and mix it in with the sound coming out of the
            headphone's speakers. This "cancels out" the background noise, just
            as the 180-degree sine wave cancels out the original sine wave.
          </Paragraph>
          <Paragraph>
            This process is imperfect—real noise isn't as simple or consistent
            as sine waves, and there's latency between the sound being recorded
            and played back, so it generally works better on lower-frequency
            noise where the latency matters less—but it can be a remarkable
            effect in areas with consistent low-frequency noise, like airplanes
            or subways.
          </Paragraph>
        </Sidebar>
      </Fragment>
    ),
  },
  'additive-synthesis-music': {
    ...defaults,
    frequencyOverride: 2.04375,
    useWaveformAddition: true,
    waveformAdditionType: 'chord',
    showConvergenceSlider: true,
    showFrequencySlider: true,
    convergenceOverride: 0,
    phaseOverride: 0,
    children: ({ frequency, amplitude, currentStep }) => (
      <Fragment>
        <Heading>Chords</Heading>
        <Paragraph>
          Another way to think of waveform addition, perhaps a more concrete
          way, is to think musically. After all, when you play a chord on the
          piano, you're really just adding 3 waves together!
        </Paragraph>
        <Paragraph>
          The difference is the scale. With harmonics, the additional "notes"
          are all multiples of the root frequency, whereas western music divides
          an octave into 12 intervals.
        </Paragraph>
        <Paragraph>
          Just for fun, here's what a C Major chord looks like, built out of 3
          sine waves.
        </Paragraph>

        <MountWhenVisible
          currentStep={currentStep}
          belongsToStep="additive-synthesis-music"
          estimatedSize={390}
        >
          <FrequencyGraph
            shape="sine"
            type="chord"
            baseFrequency={frequency}
            baseAmplitude={amplitude}
          />
        </MountWhenVisible>

        <Paragraph>
          A fundamental truth about sound is that there are only 2 variables:{' '}
          <strong>time</strong> and <strong>displacement</strong>. We can create
          any sound imaginable by simply displacing air molecules by the right
          amount at the right time.
        </Paragraph>

        <Paragraph>
          Both the harmonics associated with certain waveforms and the
          additional waves needed to form chords are just the math needed to
          produce the right displacement at the right time.
        </Paragraph>
      </Fragment>
    ),
  },
  conclusion: {
    ...defaults,
    frequencyOverride: 1,
    amplitudeOverride: 0.75,
    showVolumeControls: false,
    isPlaying: true,
    children: (
      <Fragment>
        <SectionTitle>In Conclusion</SectionTitle>
        <Paragraph>
          An audio wave is the vibration of air molecules, which is how sound
          travels. A waveform describes a wave by graphing how an air molecule
          is displaced, over time.
        </Paragraph>

        <Paragraph>
          Amplitude is the strength of a wave's effect; the higher the
          amplitude, the more the air molecules are displaced. This also
          translates into loudness for the human ear; increasing a wave's
          amplitude will increase how loud it seems to us.
        </Paragraph>

        <Paragraph>
          The most common periodic waveforms are the sine, triangle, square, and
          sawtooth.
        </Paragraph>

        <Paragraph>
          These waveforms are said to be periodic because the wave they
          represent can be repeated to produce a constant tone. The faster the
          wave repeats, the higher the pitch of the sound.
        </Paragraph>

        <Paragraph>
          Different waveforms have different harmonics. A harmonic is an
          additional frequency created by the wave. The sine waveform is unique
          in that it doesn't have any additional harmonics; it is the
          fundamental waveform.
        </Paragraph>

        <Paragraph>
          To understand why certain waveforms have harmonics, we can attack the
          problem from the opposite end. Because the sine waveform is the
          fundamental waveform, it can be used to approximate all the other
          periodic waveforms, by just adding additional sine waves at the
          appropriate harmonics, and at the appropriate amplitude levels. In
          essence, a square wave can be thought of as an infinite number of sine
          waves, all happening at very specific frequencies and amplitudes.
        </Paragraph>
      </Fragment>
    ),
  },
  over: {
    ...defaults,
    showWaveform: false,
    showVolumeControls: false,
    isPlaying: false,
    getMargin: marginFunctions.none,
    children: null,
  },
};

export const stepsArray = Object.entries(steps).map(([key, value]) => ({
  id: key,
  ...value,
}));
