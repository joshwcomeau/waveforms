import { BREAKPOINT_SIZES, IS_MOBILE_USER_AGENT } from '../constants';

export const getBreakpointFor = windowWidth =>
  Object.keys(BREAKPOINT_SIZES).find(
    name => windowWidth <= BREAKPOINT_SIZES[name]
  ) || 'xl';

export const isMobile = breakpoint => {
  if (!breakpoint) {
    breakpoint = getBreakpointFor(window.innerWidth);
  }

  return breakpoint === 'xs' || breakpoint === 'sm' || IS_MOBILE_USER_AGENT;
};

export const isDesktop = breakpoint => !isMobile(breakpoint);

export const isLargeScreen = breakpoint => {
  if (!breakpoint) {
    breakpoint = getBreakpointFor(window.innerWidth);
  }

  return breakpoint === 'lg' || breakpoint === 'xl';
};

export const getApproximateWindowHeight = () => {
  // Many mobile browsers like Safari do this irritating thing where the window
  // height changes depending on whether the "menu" at the bottom is shown or
  // not.
  //
  // Sometimes, you want things based on window height, but you DON'T want them
  // jumping around when the user scrolls and that menu shows/hides.
  //
  // For mobile, though, the window size is almost as large as the screen;
  // you can't (yet) have a Safari window open at an arbitrary size.
  // So we can just use the screen size for mobile user-agents, to get a static
  // approximation of the window size.
  //
  // WARNING: This always returns a value slightly larger than the available
  // window space, so don't use it for things where precision is important.
  if (IS_MOBILE_USER_AGENT) {
    // I don't know how widely available `window.screen` is, so fall back to
    // just using innerHeight
    return (window.screen && window.screen.height) || window.innerHeight;
  }

  // On desktop, we can simply use window.innerHeight. Easy-peasy.
  return window.innerHeight;
};
