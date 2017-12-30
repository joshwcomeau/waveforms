// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';
import { debounce } from '../../utils';

import MaxWidthWrapper from '../MaxWidthWrapper';
import WaveformPlayer from '../WaveformPlayer';
import IntroRouteWaveformWrapper from '../IntroRouteWaveformWrapper';
import IntroRouteWaveform from '../IntroRouteWaveform';
import WaveformAddition from '../WaveformAddition';
import Oscillator from '../Oscillator';
import IntroRouteSection from '../IntroRouteSection';
import VolumeAdjuster from '../VolumeAdjuster';
import FadeTransition from '../FadeTransition';

import { steps, stepsArray, INTRO_STEPS } from './IntroRoute.steps';

import type { IntroStep } from './IntroRoute.steps';

type Props = {};
type State = {
  currentStep: IntroStep,
  windowHeight: number,
  amplitude: number,
  frequency: number,
  audioVolume: number,
  audioMuted: boolean,
};

class IntroRoute extends PureComponent<Props, State> {
  state = {
    currentStep: INTRO_STEPS[0],
    windowHeight: window.innerHeight,
    amplitude: 1,
    frequency: 1,
    audioVolume: 0.5,
    audioMuted: true,
  };

  sectionRefs: Array<HTMLElement> = [];

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    // When going forwards a step, we may wish to specify an override frequency
    // or amplitude.
    if (this.state.currentStep !== prevState.currentStep) {
      const currentStepIndex = INTRO_STEPS.indexOf(this.state.currentStep);
      const previousStepIndex = INTRO_STEPS.indexOf(prevState.currentStep);

      // Note that we don't do this while going backwards, for the simple reason
      // that if the user has already seen a section, it's more important to
      // preserve their changes than to revert to the optimal value. They've
      // seen the section already, they understand how it works.
      // TODO: Maybe a better solution is to keep track of a `maxSeenStep`,
      // so that when they rewind and then go forward, it doesn't re-adjust?
      if (currentStepIndex < previousStepIndex) {
        return;
      }

      const stepData = steps[this.state.currentStep];

      const nextState = {};

      if (typeof stepData.frequencyOverride === 'number') {
        nextState.frequency = stepData.frequencyOverride;
      }

      if (typeof stepData.amplitudeOverride === 'number') {
        nextState.amplitude = stepData.amplitudeOverride;
      }

      this.setState(nextState);
    }
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

  handleUpdateAudioVolume = (val: number) => {
    this.setState({ audioVolume: val, audioMuted: false });
  };

  handleToggleMuteAudio = () => {
    this.setState({ audioMuted: !this.state.audioMuted });
  };

  handleKeydown = (ev: SyntheticKeyboardEvent<*>) => {
    const { key } = ev;

    const isNumber = !isNaN(Number(key));

    if (isNumber) {
      // $FlowFixMe - Flow doesn't believe that it's a number.
      this.handleUpdateAudioVolume(key / 10);
    } else if (key === 'm') {
      this.handleToggleMuteAudio();
    }
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
      const nextStep = INTRO_STEPS[activeSectionIndex];

      // If they've scrolled to the end, past all the steps, there may not be
      // a nextStep. We can abort in this case.
      if (!nextStep) {
        return;
      }

      this.setState({ currentStep: nextStep });
    }
  }, 500);

  handleIntersect = (id: IntroStep, entry: IntersectionObserverEntry) => {
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

    // If they've scrolled past the final step (to the footer or w/e), there
    // may not be a next step. We can abort in this case.
    // NOTE: This is also required to avoid a quirk where refreshing the page
    // while scrolled near the bottom means that it tries to go backwards from
    // the first step? Haven't investigated, but this fixes it.
    if (!nextStep) {
      return;
    }

    this.setState({ currentStep: nextStep });
  };

  render() {
    const {
      currentStep,
      windowHeight,
      amplitude,
      frequency,
      audioVolume,
      audioMuted,
    } = this.state;

    const stepData = steps[currentStep];

    const effectiveAudioVolume = (audioMuted ? 0 : audioVolume) * 0.5;

    // While our waveforms will render between 0.2Hz and 3Hz, we also have an
    // oscillator that needs to vibrate at normal ranges.
    // By multiplying by 100, we ensure that doubling the unit still augments
    // the pitch by an octave. We also add 100 to make the low-end audible.
    const adjustedAudibleFrequency = frequency * 100 + 100;

    return (
      <MaxWidthWrapper>
        <Oscillator
          shape={stepData.waveformShape}
          amplitude={amplitude}
          frequency={adjustedAudibleFrequency}
          masterVolume={effectiveAudioVolume}
        />

        <WaveformPlayer
          isPlaying={stepData.isPlaying}
          amplitude={amplitude}
          frequency={frequency}
        >
          {({ amplitude, frequency, progress }) => (
            <MainContent>
              <WaveformColumn>
                <IntroRouteWaveformWrapper>
                  {(width: number) =>
                    stepData.waveformShape ? (
                      <IntroRouteWaveform
                        width={width}
                        amplitude={amplitude}
                        frequency={frequency}
                        progress={progress}
                        handleUpdateAmplitude={this.handleUpdateAmplitude}
                        handleUpdateFrequency={this.handleUpdateFrequency}
                        stepData={stepData}
                      />
                    ) : (
                      <WaveformAddition
                        size={width}
                        waveforms={stepData.waveformsToAdd}
                        progress={0}
                      />
                    )
                  }
                </IntroRouteWaveformWrapper>

                <FadeTransition isVisible={stepData.showVolumeControls}>
                  <VolumeAdjusterWrapper>
                    <VolumeAdjuster
                      currentVolume={audioVolume}
                      isMuted={audioMuted}
                      onAdjustVolume={this.handleUpdateAudioVolume}
                      onToggleMute={this.handleToggleMuteAudio}
                    />
                  </VolumeAdjusterWrapper>
                </FadeTransition>
              </WaveformColumn>

              <TutorialColumn>
                {stepsArray.map((section, index) => (
                  <IntroRouteSection
                    key={section.id}
                    id={section.id}
                    currentStep={currentStep}
                    margin={section.getMargin(windowHeight)}
                    onIntersect={this.handleIntersect}
                    innerRef={elem => (this.sectionRefs[index] = elem)}
                  >
                    {typeof section.children === 'function'
                      ? section.children({
                          amplitude,
                          frequency,
                          progress,
                          currentStep: this.state.currentStep,
                        })
                      : section.children}
                  </IntroRouteSection>
                ))}
                <BottomTextSpacer height={window.innerHeight} />
              </TutorialColumn>
            </MainContent>
          )}
        </WaveformPlayer>
      </MaxWidthWrapper>
    );
  }
}

// In landscape, our IntroRoute is comprised of 2 equal-width columns (one for
// the waveform, the other for the tutorial copy and contents).
// The distance between them is fixed:
const LANDSCAPE_GUTTER = 120;

const VolumeAdjusterWrapper = styled.div`
  z-index: 10;
  background: ${COLORS.gray[50]};

  padding: 1rem;

  @media (orientation: portrait) {
    position: fixed;
    top: 0;
    right: 0;
  }

  @media (orientation: landscape) {
    position: fixed;
    bottom: 1rem;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: row;

  @media (orientation: portrait) {
    flex-direction: column;
  }
`;

const WaveformColumn = styled.div`
  flex: 1;

  @media (orientation: landscape) {
    /* Split the gutter equally between Waveform and Tutorial columns */
    margin-right: ${LANDSCAPE_GUTTER / 2 + 'px'};

    /*
      When resizing the window from portrait to landscape, the waveform wasn't
      shrinking. max-width is required to constrain the waveform to never take
      up more space than it's allowed.
    */
    max-width: calc(50% - ${LANDSCAPE_GUTTER / 2 + 'px'});
  }
`;

const TutorialColumn = styled.div`
  flex: 1;

  @media (orientation: landscape) {
    margin-left: ${LANDSCAPE_GUTTER / 2 + 'px'};
  }
`;

const BottomTextSpacer = styled.div`
  height: ${props => props.height + 'px'};
`;

export default IntroRoute;
