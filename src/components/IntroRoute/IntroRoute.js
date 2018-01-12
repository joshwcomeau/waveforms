// @flow
import React, { Fragment, PureComponent } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';
import { debounce } from '../../utils';
import { getHarmonicsForWave } from '../../helpers/waveform.helpers';
import { getApproximateWindowHeight } from '../../helpers/responsive.helpers';

import Aux from '../Aux';
import MaxWidthWrapper from '../MaxWidthWrapper';
import WaveformPlayer from '../WaveformPlayer';
import IntroRouteWaveformWrapper from '../IntroRouteWaveformWrapper';
import IntroRouteWaveform from '../IntroRouteWaveform';
import IntroRouteWaveformAddition from '../IntroRouteWaveformAddition';
import AudioOutput from '../AudioOutput';
import Oscillator from '../Oscillator';
import IntroRouteSection from '../IntroRouteSection';
import IntroRouteEnd from '../IntroRouteEnd';
import VolumeAdjuster from '../VolumeAdjuster';
import FadeTransition from '../FadeTransition';

import { steps, stepsArray, INTRO_STEPS } from './IntroRoute.steps';
import { getActiveSectionInWindow } from './IntroRoute.helpers';

import type { HarmonicsForShape } from '../../types';
import type { IntroStep } from './IntroRoute.steps';

// At what point from the top should the active step switch?
// Eg. at 0.5, the step rolls over when the top of the next step reaches half
// of the viewport's height. At 0.9, the section would have to be scrolled
// almost to the top before the active section rolls over.
const ACTIVE_STEP_ROLLOVER_RATIO = 0.45;

type Props = {};
type State = {
  currentStep: IntroStep,
  windowHeight: number,

  // Waveform data
  amplitude: number,
  frequency: number,

  // Waveform addition data
  harmonicsForShape: HarmonicsForShape,
  numOfHarmonics: number,
  convergence: number,
  phase: number,

  // Audio data
  audioVolume: number,
  audioMuted: boolean,
  audioEnabled: boolean,
};

class IntroRoute extends PureComponent<Props, State> {
  state = {
    currentStep: INTRO_STEPS[0],
    windowHeight: getApproximateWindowHeight(),
    amplitude: 1,
    frequency: 1,
    harmonicsForShape: 'square',
    numOfHarmonics: 2,
    convergence: 0,
    phase: 0,
    audioVolume: 0.5,
    audioMuted: true,
    audioEnabled: false,
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
    // NOTE: I really don't like that this is dealt with at such a high level,
    // since there won't always even be a Waveform (the WaveformAddition
    // component manages this all internally).
    // For future routes, let's use Redux instead. Would make this much nicer.
    if (this.state.currentStep !== prevState.currentStep) {
      const stepData = steps[this.state.currentStep];

      const nextState: any = {};

      const overrideableFields = [
        'frequency',
        'amplitude',
        'harmonicsForShape',
        'numOfHarmonics',
        'convergence',
      ];

      overrideableFields.forEach(field => {
        const fieldOverride = `${field}Override`;

        if (stepData[fieldOverride] != null) {
          nextState[field] = stepData[fieldOverride];
        }
      });

      this.setState(nextState);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleUpdateField = (field: string) => (val: any) => {
    this.setState({ [field]: val });
  };

  handleUpdateAmplitude = this.handleUpdateField('amplitude');
  handleUpdateFrequency = this.handleUpdateField('frequency');
  handleUpdateHarmonicsForShape = this.handleUpdateField('harmonicsForShape');
  handleUpdateNumOfHarmonics = this.handleUpdateField('numOfHarmonics');
  handleUpdateConvergence = this.handleUpdateField('convergence');
  handleUpdatePhase = this.handleUpdateField('phase');

  handleUpdateAudioVolume = (audioVolume: number) => {
    this.setState({ audioVolume, audioMuted: false, audioEnabled: true });
  };

  handleToggleMuteAudio = () => {
    this.setState({ audioMuted: !this.state.audioMuted, audioEnabled: true });
  };

  handleKeydown = (ev: SyntheticKeyboardEvent<*>) => {
    const { keyCode } = ev;

    const key = String.fromCharCode(keyCode);

    const isNumber = !isNaN(Number(key));

    if (isNumber) {
      // $FlowFixMe - Flow doesn't believe that it's a number.
      this.handleUpdateAudioVolume(key / 10);
    } else if (key === 'M') {
      this.handleToggleMuteAudio();
    }
  };

  handleResize = debounce(() => {
    this.setState({ windowHeight: getApproximateWindowHeight() });
  }, 500);

  handleScroll = debounce(() => {
    // TODO: Update this to use the new intersection logic

    // We rely on the IntersectionObserver API within each IntroRouteSection
    // to update the current section, in the `handleIntersect` method.
    //
    // Unfortunately, when scrolling quickly, the IntersectionObserver API has
    // the bad habit of "missing" intersections sometimes.
    //
    // Also, IntersectionObserver isn't supported in all browsers, like Safari.
    // In those cases, I async-load a polyfill, but it's entirely possible the
    // user will begin scrolling before the polyfill is loaded, and so it's good
    // to have a fallback.
    //
    // This method handles these edge-cases, by scanning through the sections
    // and finding the first one from the end that is above the 45% window
    // threshold.
    const activeSection = getActiveSectionInWindow(
      this.sectionRefs,
      ACTIVE_STEP_ROLLOVER_RATIO
    );

    // If they've scrolled to the end, past all the steps, there may not be
    // a nextStep. We can abort in this case.

    if (!activeSection) {
      return;
    }

    if (activeSection !== this.state.currentStep) {
      this.setState({ currentStep: activeSection });
    }
  }, 500);

  handleIntersect = (id: IntroStep, entry: IntersectionObserverEntry) => {
    const intersectStepIndex = INTRO_STEPS.indexOf(id);

    // We don't yet know which direction they're scrolling in, but we can work
    // it out; when an item leaves through the top of the viewport, its index
    // matches the current step (after all, the current step is on the way out).
    // When scrolling back up, the item enters the viewport, which means the
    // item's step number will be less than the current one.
    const direction = id === this.state.currentStep ? 'backwards' : 'forwards';

    const nextStep =
      direction === 'forwards'
        ? INTRO_STEPS[intersectStepIndex]
        : INTRO_STEPS[intersectStepIndex - 1];

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

  renderAudio() {
    const {
      currentStep,
      amplitude,
      frequency,
      harmonicsForShape,
      numOfHarmonics,
      audioVolume,
      audioMuted,
      audioEnabled,
    } = this.state;

    // This renders the actual audio: No visual UI.
    // This is dependent on audio being enabled, which only happens when the
    // user unmutes the audio somehow.
    //
    // This is mostly to get around mobile Safari's requirement that audio only
    // happen as a response to user action.
    if (!audioEnabled) {
      return null;
    }

    const stepData = steps[currentStep];

    const effectiveAudioVolume = (audioMuted ? 0 : audioVolume) * 0.5;

    // While our waveforms will render between 0.2Hz and 3Hz, we also have an
    // oscillator that needs to vibrate at normal ranges.
    // By multiplying by 100, we ensure that doubling the unit still augments
    // the pitch by an octave. We also add 100 to make the low-end audible.
    const adjustedAudibleFrequency = frequency * 100;

    return (
      <AudioOutput masterVolume={effectiveAudioVolume}>
        {(audioCtx, masterOut) => (
          <Aux>
            <Oscillator
              key="base-frequency"
              shape={stepData.waveformShape}
              amplitude={amplitude}
              frequency={adjustedAudibleFrequency}
              audioCtx={audioCtx}
              masterOut={masterOut}
            />

            {stepData.useWaveformAddition &&
              numOfHarmonics > 0 &&
              getHarmonicsForWave({
                shape: harmonicsForShape,
                baseFrequency: adjustedAudibleFrequency,
                baseAmplitude: amplitude,
                maxNumberToGenerate: numOfHarmonics,
              })
                .filter(({ frequency }) => frequency < 20000)
                .map(({ frequency, amplitude }) => (
                  <Oscillator
                    key={frequency}
                    shape="sine"
                    amplitude={amplitude}
                    frequency={frequency}
                    audioCtx={audioCtx}
                    masterOut={masterOut}
                  />
                ))}
          </Aux>
        )}
      </AudioOutput>
    );
  }

  renderVolumeControl() {
    const { currentStep, audioVolume, audioMuted } = this.state;

    const stepData = steps[currentStep];

    return (
      <VolumeAdjusterLayer>
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
      </VolumeAdjusterLayer>
    );
  }

  renderWaveformColumn(
    amplitude: number,
    frequency: number,
    convergence: number,
    phase: number,
    progress: number
  ) {
    const { currentStep, harmonicsForShape, numOfHarmonics } = this.state;

    const stepData = steps[currentStep];

    return (
      <WaveformColumn>
        <IntroRouteWaveformWrapper>
          {(width: number) => (
            <Aux>
              {!stepData.useWaveformAddition && (
                <IntroRouteWaveform
                  width={width}
                  amplitude={amplitude}
                  frequency={frequency}
                  progress={progress}
                  handleUpdateAmplitude={this.handleUpdateAmplitude}
                  handleUpdateFrequency={this.handleUpdateFrequency}
                  stepData={stepData}
                />
              )}

              {stepData.useWaveformAddition && (
                <IntroRouteWaveformAddition
                  type={stepData.waveformAdditionType}
                  width={width}
                  stepData={stepData}
                  baseAmplitude={amplitude}
                  baseFrequency={frequency}
                  harmonicsForShape={harmonicsForShape}
                  numOfHarmonics={numOfHarmonics}
                  convergence={convergence}
                  phase={phase}
                  handleUpdateHarmonicsForShape={
                    this.handleUpdateHarmonicsForShape
                  }
                  handleUpdateNumOfHarmonics={this.handleUpdateNumOfHarmonics}
                  handleUpdateConvergence={this.handleUpdateConvergence}
                  handleUpdatePhase={this.handleUpdatePhase}
                />
              )}
            </Aux>
          )}
        </IntroRouteWaveformWrapper>
      </WaveformColumn>
    );
  }

  renderTutorialColumn(amplitude: number, frequency: number, progress: number) {
    const { currentStep, windowHeight } = this.state;

    return (
      <TutorialColumn>
        {stepsArray.map((section, index) => (
          <IntroRouteSection
            key={section.id}
            id={section.id}
            currentStep={currentStep}
            margin={section.getMargin(windowHeight)}
            onIntersect={this.handleIntersect}
            rolloverRatio={ACTIVE_STEP_ROLLOVER_RATIO}
            innerRef={elem => (this.sectionRefs[index] = elem)}
          >
            {typeof section.children === 'function'
              ? section.children({
                  amplitude,
                  frequency,
                  progress,
                  currentStep,
                })
              : section.children}
          </IntroRouteSection>
        ))}
      </TutorialColumn>
    );
  }

  render() {
    const {
      currentStep,
      amplitude,
      frequency,
      convergence,
      phase,
    } = this.state;

    const stepData = steps[currentStep];

    return (
      <Fragment>
        <MaxWidthWrapper>
          {this.renderAudio()}

          {this.renderVolumeControl()}

          <WaveformPlayer
            isPlaying={stepData.isPlaying}
            amplitude={amplitude}
            frequency={frequency}
            convergence={convergence}
            phase={phase}
          >
            {({ amplitude, frequency, convergence, phase, progress }) => (
              <MainContent>
                {this.renderWaveformColumn(
                  amplitude,
                  frequency,
                  convergence,
                  phase,
                  progress
                )}
                {this.renderTutorialColumn(amplitude, frequency, progress)}
              </MainContent>
            )}
          </WaveformPlayer>
        </MaxWidthWrapper>
        <IntroRouteEnd />
      </Fragment>
    );
  }
}

// In landscape, our IntroRoute is comprised of 2 equal-width columns (one for
// the waveform, the other for the tutorial copy and contents).
// The distance between them is fixed:
const LANDSCAPE_GUTTER = 120;

const VolumeAdjusterLayer = styled.div`
  z-index: 10;
  position: fixed;

  @media (orientation: portrait) {
    top: 0;
    right: 0;
  }

  @media (orientation: landscape) {
    bottom: 1rem;
  }
`;

const VolumeAdjusterWrapper = styled.div`
  background: ${COLORS.gray[50]};
  padding: 0.4rem 1rem 1rem;
`;

const MainContent = styled.div`
  position: relative;
  z-index: 1;
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
