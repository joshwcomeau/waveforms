// @flow
import { range, sum } from '../utils';

import type { WaveformShape, WaveformPoint } from '../types';
import type { Props as WaveformProps } from '../components/Waveform';

/**
 * This method gets an array of axis-relative points that can be used for
 * further calculations.
 * Given a waveform shape, and some information about its frequency/offset/size,
 * this method returns an array of X/Y values that describes the waveform.
 * This is NOT plot-ready, since the Y values range from -1 to 1.
 * Further processing is required to get something drawable.
 */
export const getPointsForWaveform = ({
  shape,
  frequency,
  amplitude,
  width,
  offset,
}: WaveformProps): Array<WaveformPoint> => {
  // Get an array of `x` values.
  // For now, we're drawing lines at every second point, for performance.
  // After experimentation, this may change.
  const ratioBetweenPointsAndPixels = 2;
  const xValues = range(0, width + 1, ratioBetweenPointsAndPixels);

  // Convert each X value to a proper coordinate system, relative to the axis
  // (so, Y values will be from -1 to 1)
  return xValues.map(x => {
    // We need a progress value, to help inform where this `x` value is, in
    // terms of the cycles drawn.

    // Start by getting the width of a single cycle.
    // If `frequency` is `1`, then this is just the whole width.
    // If we're drawing more/less than a single cycle, though, we need to do
    // some division.
    const widthOfSingleCycle = width / frequency;

    // Next, we need to figure out the progress in terms of the cycle.
    // If the frequency is 4, This progress will be a value from 0 to 4.
    const progressRelativeToCycles = x / widthOfSingleCycle;

    // Finally, we have to take the waveform's offset into account.
    // As a refresher: `offset` ranges from 0 to 99, and it controls how much
    // to shift the waveform by.
    // Example: A sine wave with 50 offset will look like an inverted sine wave.
    // The `* 100` is necessary since offset is 0-99 instead of 0-1.
    // TODO: Probably makes sense to keep it from 0-1, makes more semantic sense
    const progress = progressRelativeToCycles * 100 + offset;

    return {
      x,
      y: getPositionAtPointRelativeToAxis(
        shape,
        frequency,
        amplitude,
        progress
      ),
    };
  });
};

export const createPathFromWaveformPoints = (
  points: Array<WaveformPoint>,
  height: number
) => {
  // The points provided to this method will range in y-value from -1 to 1.
  // This is mathematically pure, but it's not something our SVG can understand.
  // Convert this -1:1 range to a 0:height range.
  const drawablePoints = points.map(({ x, y }) => ({
    x,
    y: translateAxisRelativeYValue(y, height),
  }));

  // Finally, let's create the `path` string that the SVG can use.
  return drawablePoints.reduce((acc, { x, y }, index) => {
    // For the very first point, we have to Move to that area
    if (index === 0) {
      return `M ${x},${y} `;
    }

    // For all subsequent points, we can just draw a line to it.
    return `${acc} L ${x},${y}`;
  }, '');
};

/**
 * Given progress between 0 and 100, figure out the Y position, relative
 * to the X axis (from 1 to -1)
 */
export const getPositionAtPointRelativeToAxis = (
  shape: WaveformShape,
  frequency: number,
  amplitude: number,
  progress: number
) => {
  switch (shape) {
    case 'sine': {
      // Each sine cycle is 2Pi long, in trigonometry terms.
      // The frequency determines how many cycles are in the available space.
      const cycleLength = Math.PI * 2;
      const totalLength = cycleLength * frequency;

      // the progress is through the given cycle, but we may be rendering
      // multiple cycles.
      const progressThroughDrawableArea = progress * (1 / frequency);

      // Right now, `progress` ranges from 0 to 100.
      // Normalize this value to fit between 0 and `totalLength`.
      // Just cross-multiplying to get the normalized value:
      //
      // progress         positionInRads
      // --------  =      --------------
      //   100             totalLength
      //
      // prettier-ignore
      const positionInRads = (progressThroughDrawableArea * totalLength) / 100;

      // Now we can simply take the sin of the rad position to get a value,
      // from -1 to 1. We multiply by amplitude (a value between 0 and 1) to
      // make sure the waveform isn't more powerful than desired.
      return Math.sin(positionInRads) * amplitude;
    }

    case 'square': {
      // Square waves are easy; the value is either `amplitude` or `-amplitude`.
      // Figure out how far we are through the current iteration, since the
      // drawable wave might have multiple iterations if frequency > 1Hz.
      const progressThroughIteration = progress % 100;

      return progressThroughIteration < 50 ? amplitude : -amplitude;
    }

    case 'sawtooth': {
      // Each sawtooth iteration simply ranges from `-amplitude` to `amplitude`
      // in a linear way.

      const progressThroughIteration = progress % 100;

      // Normally, this would be a simple cross-multiplication to normalize
      // between min and max, but our min is a negative number. Start by
      // adding that amount so that it ranges from `0 - 2*amplitude`
      const adjustedMax = amplitude * 2;

      return progressThroughIteration * adjustedMax / 100 - amplitude;
    }

    case 'triangle': {
      // This waveform might include multiple iterations, if frequency > 1Hz.
      // This is an easy thing to solve, though; make it cyclical so that we're
      // only looking at values from 0 to 99.
      const progressThroughIteration = progress % 100;

      // Each triangle iteration has 4 quadrants of equal size:
      // - the initial ramp up from 0 to 1
      // - the ramp down from 1 to 0,
      // - another from 0 to -1
      // - the final ramp back up from -1 to 0.
      //
      //  Q1 | Q2 |    |
      //    /|\   |    |
      //  /  |  \ |    |
      //  ---|---\|--- |-----/--------------------------------
      //     |    | \  |   /
      //     |    |  \ | /
      //     |    | Q3 | Q4
      //
      // Our `progressThroughIteration` is a value from 0 to 99, so we can
      // figure out which quadrant it's in by dividing this number by 4.
      //
      // (Adding 1 so that it ranges from 1-4 instead of 0.3. So that, for
      // example, 'second quadrant' is unambiguous.)
      const quadrant = Math.floor(progressThroughIteration / 25) + 1;

      const progressThroughQuadrant = progress % 25;

      switch (quadrant) {
        case 1: {
          // Quadrant 1 is easy, since it ranges from 0 to 1.
          // To get the value from 0 to 1, just divide progress by the
          // quadrant max (25). Then, to get the amplitude, multiply by the
          // wave's actual amplitude.
          //
          // To understand the `* amplitude` bit, remember that the wave's
          // amplitude ranges from 0 to 1.
          // If the wave is at max loudness, this value wouldn't be necessary
          // (since `* 1` can always be omitted).
          // If the wave is at half amplitude, though, our triangle's peak
          // should be halfway up from the X-axis. So we multiply by 0.5.
          return progressThroughQuadrant / 25 * amplitude;
        }

        case 2: {
          // Quadrant 2 is similar to quadrant 1, but reversed. Going from 1-0.
          // To solve this, we can simply subtract the value from our max
          // amplitude.
          // Again, if we're at max amplitude, this would just be `1 - stuff`.
          // Since we want to "invert" it vertically:
          //
          // Value  |  Inverted value
          // 1      |  0
          // 0.25   |  0.75
          // 0.5    |  0.5
          //
          // See how you can "invert" each value by subtracting it from 1?
          //
          // But yeah, because our max amplitude can be less than 1, we have
          // to use `amplitude` instead of `1`.
          return amplitude - progressThroughQuadrant / 25 * amplitude;
        }

        case 3: {
          // Our third quadrant ranges from 0 to -1.
          // This is getting more complicated, but it's really just building on
          // the previous 2 quadrants.
          //
          // Quadrant 3 is identical to quadrant 2 except that it's lower.
          // If amplitude is 1, you could think of quadrant 2 as being 1 lower
          // than quadrant 3.
          //
          // By subtracting our max amplitude from the end of the Q2 formula,
          // we lower it accordingly.
          return (
            amplitude - progressThroughQuadrant / 25 * amplitude - amplitude
          );
        }

        case 4: {
          // Finally, our final quadrant ranges from -1 to 0.
          // Similar to how Q3 was just Q2 minus amplitude, Q4 is really just
          // Q1 minus amplitude.
          //
          // This make sense when you think about it. Q3 is just Q2 but lower.
          // Similarly, Q4 is just Q1 but lower.
          return progressThroughQuadrant / 25 * amplitude - amplitude;
        }
      }
    }

    default:
      throw new Error('Unrecognized waveform shape supplied: ' + shape);
  }
};

const translateAxisRelativeYValue = (
  // a value from -1 to 1 (relative to the axis)
  yValue: number,
  // The height in pixels of our waveform drawing
  height: number
) => {
  // Invert the y value. This is so that negative values are below the line,
  // while positive ones are above it.
  yValue *= -1;

  // Start by changing the range of the yValue:
  // -1...1 -> 0...2
  const incrementedYValue = yValue + 1;

  // Now we can just cross-multiply!
  //     Y              X
  //  ------    =    ------
  //     2           height
  //
  // prettier-ignore
  return (incrementedYValue * height) / 2;
};

export const getInterceptPosition = (
  shape: WaveformShape,
  height: number,
  frequency: number,
  amplitude: number,
  progress: number
) => {
  const relativePosition = getPositionAtPointRelativeToAxis(
    shape,
    frequency,
    amplitude,
    progress
  );

  return translateAxisRelativeYValue(relativePosition, height);
};

export const applyWaveformAddition = (
  mainWave: Array<WaveformPoint>,
  appliedWaves: Array<Array<WaveformPoint>>,
  // ratio is the "effect" of the applied wave on the main wave, from 0-1.
  ratio: number
) => {
  if (ratio === 0) {
    // At 0, it has no effect. We can just return the main wave as-is.
    return mainWave;
  }

  // For everything in-between, the applied wave adjusts the main wave by the
  // amount specified.
  return mainWave.map((point, index) => {
    const appliedWavesAtPoint = sum(appliedWaves.map(wave => wave[index].y));

    const mainValue = point.y * (1 - ratio);
    const appliedValue = appliedWavesAtPoint * ratio;

    return {
      x: point.x,
      y: mainValue + appliedValue,
    };
  });
};

export const convertProgressToCycle = (progress: number) =>
  (progress * 100) % 100;

type GetHarmonicsForWaveArgs = {
  shape: WaveformShape,
  baseFrequency: number,
  baseAmplitude: number,
  maxNumberToGenerate: number,
};

export const getHarmonicsForWave = ({
  shape,
  baseFrequency,
  baseAmplitude,
  maxNumberToGenerate,
}: GetHarmonicsForWaveArgs) => {
  const harmonics = [];

  switch (shape) {
    // Sine waves have no harmonics
    case 'sine':
      return harmonics;

    case 'sawtooth': {
      return range(1, maxNumberToGenerate).map(i => {
        // the first index would be our main wave; we're only interested in the
        // harmonics.
        const harmonicIndex = i + 1;

        const frequency = baseFrequency * harmonicIndex;
        const amplitude = baseAmplitude / frequency;

        return { frequency, amplitude };
      });
    }

    case 'square': {
      return range(1, maxNumberToGenerate).map(i => {
        // Our index will be simple increments (1,2,3,4...)
        // We're only interested in ODD harmonics for square waves, though
        // (3, 5, 7, 9...)
        //
        // We want to do the following conversion:
        //
        // Index | Harmonic
        //   1   |    3
        //   2   |    5
        //   3   |    7
        //   4   |    9
        //
        // Looking at the numbers, a simple formula presents itself:
        const harmonicIndex = i * 2 + 1;

        const frequency = baseFrequency * harmonicIndex;
        const amplitude = baseAmplitude / frequency;

        return { frequency, amplitude };
      });
    }

    case 'triangle': {
      // Triangles are similar to squares - they feature odd harmonics at
      // ever-increasing amplitudes - but with one wrinkle: the phase is
      // inverted for every second harmonic.
      return range(1, maxNumberToGenerate).map(i => {
        const harmonicIndex = i * 2 + 1;

        // Triangles alternate phases.
        // To understand this, first we need to understand that these two things
        // are equivalent:
        //
        // - cut the offset of the waveform by π (AKA 50%)
        // - Multiplying the amplitude by -1
        //
        // The reason for this makes sense if you imagine both scenarios.
        // A periodic waveform like the triangle can be thought of in 2 "halves"
        // the first half is a positive triangle, the second half is negative.
        //
        //   First
        //    /\ |
        //  /   \|
        //  -----|------/-
        //       |\   /
        //       | \/
        //       |Second
        //
        // When we rotate the offset by 50%, we invert it:
        //
        //           Second
        //             /\
        //           /   \
        //  \------/------\
        //   \   /
        //    \/
        //  First
        //
        // Similarly, if we multiply every point's amplitude by -1, we achieve
        // the exact same effect, through a different mechanism; instead of
        // pulling the waveform forward by 50%, we rotate it across a 3D axis
        // (imagine flipping a sign away from you to be upside down).
        //
        // So yeah, for triangles to work, we need to invert every second
        // wave that we add.
        const isOddHarmonic = i % 2 !== 0;
        const amplitudePhaseMultiplier = isOddHarmonic ? -1 : 1;

        const frequency = baseFrequency * harmonicIndex;
        const amplitude =
          baseAmplitude / frequency ** 2 * amplitudePhaseMultiplier;

        return { frequency, amplitude };
      });
    }

    default:
      return [];
  }
};
