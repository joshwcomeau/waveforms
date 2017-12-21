// TODO: Modernize
/* eslint-disable */
export const range = function(start, end, step) {
  var range = [];
  var typeofStart = typeof start;
  var typeofEnd = typeof end;

  if (step === 0) {
    throw TypeError('Step cannot be zero.');
  }

  if (typeof end === 'undefined' && typeof 'step' === 'undefined') {
    end = start;
    start = 0;
    typeofStart = typeof start;
    typeofEnd = typeof end;
  }

  if (typeofStart == 'undefined' || typeofEnd == 'undefined') {
    throw TypeError('Must pass start and end arguments.');
  } else if (typeofStart != typeofEnd) {
    throw TypeError('Start and end arguments must be of same type.');
  }

  typeof step == 'undefined' && (step = 1);

  if (end < start) {
    step = -step;
  }

  if (typeofStart == 'number') {
    while (step > 0 ? end >= start : end <= start) {
      range.push(start);
      start += step;
    }
  } else if (typeofStart == 'string') {
    if (start.length != 1 || end.length != 1) {
      throw TypeError('Only strings with one character are supported.');
    }

    start = start.charCodeAt(0);
    end = end.charCodeAt(0);

    while (step > 0 ? end >= start : end <= start) {
      range.push(String.fromCharCode(start));
      start += step;
    }
  } else {
    throw TypeError('Only string and number types are supported');
  }

  return range;
};
/* eslint-enable */

export const sample = arr => arr[Math.floor(Math.random() * arr.length)];

export const random = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

export const sum = values => values.reduce((sum, value) => sum + value, 0);
export const mean = values => sum(values) / values.length;

export const clamp = (val, min = 0, max = 1) =>
  Math.max(min, Math.min(max, val));

export const debounce = (callback, wait, timeoutId = null) => (...args) => {
  window.clearTimeout(timeoutId);

  timeoutId = setTimeout(() => {
    callback.apply(null, args);
  }, wait);
};

export const isEmpty = obj => Object.keys(obj).length === 0;

const omit = function(obj, key) {
  var newObj = {};

  for (var name in obj) {
    if (name !== key) {
      newObj[name] = obj[name];
    }
  }

  return newObj;
};

export const convertArrayToMap = list =>
  list.reduce(
    (acc, item) => ({
      ...acc,
      [item.id]: item,
    }),
    {}
  );

// Either removes or adds an item to an array
// EXAMPLE: toggleInArray([1, 2], 3) -> [1, 2, 3]
// EXAMPLE: toggleInArray([1, 2], 2) -> [1]
export const toggleInArray = (arr, item) =>
  arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item];

// Combines 2 arrays, removing duplicates.
// EXAMPLE: mergeUnique([1, 2], [2, 3]) -> [1, 2, 3]
export const mergeUnique = (arr1, arr2) =>
  arr1.concat(arr2.filter(item => arr1.indexOf(item) === -1));

export const findRight = (arr, predicate) =>
  arr
    .slice()
    .reverse()
    .find(predicate);

export function requestAnimationFramePromise() {
  return new Promise(resolve => window.requestAnimationFrame(resolve));
}

export function setTimeoutPromise(duration) {
  return new Promise(resolve => window.setTimeout(resolve, duration));
}

export const deleteCookie = key => {
  document.cookie = `${encodeURIComponent(
    key
  )}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

type MapLikeObject = { [key: string]: any };

// This method is used when comparing two sets of props
// (eg. `componentDidUpdate`).
// It's helpful for determining if only a single prop changed, and all others
// remained the same
export const allPropsSameExcept = (
  changedPropKey: string,
  oldProps: MapLikeObject,
  newProps: MapLikeObject
) => {
  const oldPropsChangedProp = oldProps[changedPropKey];
  const newPropsChangedProp = newProps[changedPropKey];

  const oldPropsOtherProps = omit(oldProps, changedPropKey);
  const newPropsOtherProps = omit(newProps, changedPropKey);

  const isExceptionPropUnchanged = oldPropsChangedProp === newPropsChangedProp;

  // If our main prop hasn't changed, we know this method is false, since that's
  // a key part of the condition.
  if (isExceptionPropUnchanged) {
    return false;
  }

  // TODO: Check that both objects contain the same keys (no values absent in 1)

  // If all other props are the same, our conditions have been met!
  return Object.keys(oldPropsOtherProps).every(
    key => oldProps[key] === newProps[key]
  );
};
