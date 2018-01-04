// @flow
import { INTRO_STEPS } from './IntroRoute.steps';

export const getActiveSectionInWindow = (
  refs: Array<HTMLElement>,
  rolloverRatio: number
) => {
  const threshold = window.innerHeight * rolloverRatio;

  const activeSectionReverseIndex = [...refs]
    .reverse()
    .findIndex(section => section.getBoundingClientRect().top <= threshold);

  if (activeSectionReverseIndex === -1) {
    return;
  }

  const activeSectionIndex = refs.length - 1 - activeSectionReverseIndex;

  return INTRO_STEPS[activeSectionIndex];
};
