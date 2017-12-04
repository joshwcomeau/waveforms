export const getPathForPoints = (points: Uint8Array) => {
  console.log('given', points);
  const pointsArray = Array.from(points || []);
  console.log(pointsArray);
  const [firstPoint, ...otherPoints] = pointsArray;

  let path = `M ${0},${firstPoint} `;

  let index = 1;

  otherPoints.forEach(point => {
    path += `L ${index},${point} `;
    index++;
  });

  return path;
};
