// @flow
export const getWidthFor1Cycle = ({ numOfCycles }: { numOfCycles: number }) =>
  1 / numOfCycles * 100 + '%';
