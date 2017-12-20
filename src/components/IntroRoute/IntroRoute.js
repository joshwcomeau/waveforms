// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { INTRO_STEPS, WAVEFORM_ASPECT_RATIO } from '../../constants';
import { debounce } from '../../utils';

import Header from '../Header';
import Paragraph from '../Paragraph';
import SectionTitle from '../SectionTitle';
import AvailableWidth from '../AvailableWidth';
import Sidebar from '../Sidebar';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Aux from '../Aux';
import WaveformPlayer from '../WaveformPlayer';
import IntroRouteWaveform from '../IntroRouteWaveform';
import IntroRouteAirGrid from '../IntroRouteAirGrid';
import AirGrid from '../AirGrid';
import IntroRouteSection from '../IntroRouteSection';

import { getDataForStep } from './IntroRoute.helpers';

import type { IntroStep } from '../../constants';
import type { WaveformShape } from '../../types';

type Props = {};
type State = {
  currentStep: IntroStep,
  windowHeight: number,
  amplitude: number,
  frequency: number,
  shape: WaveformShape,
};

type Section = {
  id: IntroStep,
  getMargin?: (windowHeight: number) => number,
  children: React$Node,
};

const marginFunctions = {
  none: windowHeight => 0,
  small: windowHeight => windowHeight * 0.35,
  large: windowHeight => windowHeight * 0.45,
};

const sections: Array<Section> = [
  { id: 'title', getMargin: marginFunctions.none, children: <Header /> },
  {
    id: 'about-this-thing',
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
  {
    id: 'intro-with-labels',
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
  {
    id: 'x-axis-time',
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
  {
    id: 'y-axis-amplitude',
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
  {
    id: 'y-axis-amplitude-with-control',
    getMargin: marginFunctions.small,
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
  {
    id: 'frequency-introduction',
    children: (
      <Aux>
        <Paragraph>
          Next, let's look at <strong>frequency</strong>.
        </Paragraph>

        <Paragraph>
          The wave has been updated to repeat twice. Instead of 1 sine waveform
          cycle, you now have 2 sine waveform cycles!
        </Paragraph>

        <Paragraph>
          Important to note, though: The amount of time hasn't changed, though.
          This is still 1 second of audio.
        </Paragraph>

        <Paragraph>
          The number of cycles per second is known as the frequency. The unit of
          measurement is called the Hertz (abbreviated as 'Hz'). The wave over
          there is 2Hz, since the waveform repeats twice.
        </Paragraph>
      </Aux>
    ),
  },
  {
    id: 'frequency-introduction-pt2',
    getMargin: marginFunctions.small,
    children: (
      <Aux>
        <Paragraph>
          Frequency is just the technical term for "pitch". When you sing an
          "A4" note (The A in the middle of a standard piano), your throat
          vibrates at 440Hz.
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
  {
    id: 'frequency-with-control',
    getMargin: marginFunctions.small,
    children: (
      <Aux>
        <Paragraph>
          As with amplitude, feel free to tweak the frequency to see how the
          wave changes!
        </Paragraph>
      </Aux>
    ),
  },
  {
    id: 'how-sound-works-intro',
    children: (
      <Aux>
        <SectionTitle>1. How Sound Works</SectionTitle>
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
  {
    id: 'how-sound-works-air-grid',
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
];

class IntroRoute extends PureComponent<Props, State> {
  state = {
    currentStep: INTRO_STEPS[0],
    windowHeight: window.innerHeight,
    amplitude: 1,
    frequency: 1,
    shape: 'sine',
  };

  sectionRefs: Array<HTMLElement> = [];

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleUpdateAmplitude = (val: number) => {
    this.setState({ amplitude: val });
  };

  handleUpdateFrequency = (val: number) => {
    this.setState({ frequency: val });
  };

  handleResize = debounce(() => {
    this.setState({ windowHeight: window.innerHeight });
  }, 500);

  handleScroll = debounce(() => {
    // We rely on the IntersectionObserver API within each IntroRouteSection
    // to update the current section, in the `handleIntersect` method.
    //
    // Unfortunately, when scrolling quickly, the IntersectionObserver API has
    // the bad habit of "missing" intersections sometimes.
    //
    // This method handles those edge-cases, by scanning through the sections
    // and finding the first one in the viewport.
    const activeSectionIndex = this.sectionRefs.findIndex(
      section => section.getBoundingClientRect().bottom >= 0
    );

    if (activeSectionIndex !== this.state.currentStep) {
      this.setState({ currentStep: INTRO_STEPS[activeSectionIndex] });
    }
  }, 500);

  handleIntersect = (id: IntroStep, entry: IntersectionObserverEntry) => {
    const currentStepIndex = INTRO_STEPS.indexOf(this.state.currentStep);
    const intersectStepIndex = INTRO_STEPS.indexOf(id);

    // We don't yet know which direction they're scrolling in, but we can work
    // it out; when an item leaves through the top of the viewport, its index
    // matches the current step (after all, the current step is on the way out).
    // When scrolling back up, the item enters the viewport, which means the
    // item's step number will be less than the current one.
    const direction = id === this.state.currentStep ? 'forwards' : 'backwards';

    const nextStep =
      direction === 'forwards'
        ? INTRO_STEPS[intersectStepIndex + 1]
        : INTRO_STEPS[intersectStepIndex];

    this.setState({ currentStep: nextStep });
  };

  render() {
    const {
      currentStep,
      windowHeight,
      shape,
      amplitude,
      frequency,
    } = this.state;

    const stepData = getDataForStep(currentStep);

    return (
      <MaxWidthWrapper>
        <MainContent>
          <LeftColumnWrapper>
            <WaveformPlayer
              isPlaying={stepData.isPlaying}
              amplitude={
                typeof stepData.amplitudeOverride === 'number'
                  ? stepData.amplitudeOverride
                  : amplitude
              }
              frequency={
                typeof stepData.frequencyOverride === 'number'
                  ? stepData.frequencyOverride
                  : frequency
              }
            >
              {({ amplitude, frequency, progress }) => (
                <Aux>
                  <IntroRouteWaveform
                    amplitude={amplitude}
                    frequency={frequency}
                    progress={progress}
                    handleUpdateAmplitude={this.handleUpdateAmplitude}
                    handleUpdateFrequency={this.handleUpdateFrequency}
                    stepData={stepData}
                  />
                  <IntroRouteAirGrid
                    numOfRows={32}
                    numOfCols={26}
                    amplitude={amplitude}
                    frequency={frequency}
                    progress={progress}
                    stepData={stepData}
                  />
                </Aux>
              )}
            </WaveformPlayer>
          </LeftColumnWrapper>

          <RightColumnWrapper>
            {sections.map((section, index) => (
              <IntroRouteSection
                key={section.id}
                id={section.id}
                margin={
                  section.getMargin
                    ? section.getMargin(windowHeight)
                    : marginFunctions.large(windowHeight)
                }
                onIntersect={this.handleIntersect}
                isSelected={currentStep === section.id}
                innerRef={elem => (this.sectionRefs[index] = elem)}
              >
                {section.children}
              </IntroRouteSection>
            ))}
            <BottomTextSpacer height={window.innerHeight} />
          </RightColumnWrapper>
        </MainContent>
      </MaxWidthWrapper>
    );
  }
}

const MainContent = styled.div`
  display: flex;
  flex-direction: row;
`;

const LeftColumnWrapper = styled.div`
  flex: 1;
  margin-right: 65px;
`;

const RightColumnWrapper = styled.div`
  margin-left: 50px;
  flex: 1;
`;

const BottomTextSpacer = styled.div`
  height: ${props => props.height + 'px'};
`;

export default IntroRoute;
