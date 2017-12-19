// @flow

// Canvases won't allow us to overflow. and our molecules can move outside
// the standard canvas dimensions.
// To maintain consistency with how I use SVG in this project (which is,
// the width/height isn't guaranteed to contain the SVG entirely).
// To solve this, we'll make it 2 rows/columns larger, and then offset that
// using margin so that it's "centered" with where it needs to be.

export const getDimensions = (
  baseWidth: number,
  baseHeight: number,
  numOfRows: number,
  numOfCols: number
) => {
  const colWidth = baseWidth / numOfCols;
  const rowHeight = baseHeight / numOfRows;

  const widthWithPadding = baseWidth + colWidth * 2;
  const heightWithPadding = baseHeight + rowHeight * 2;

  return { colWidth, rowHeight, widthWithPadding, heightWithPadding };
};
