// @flow
import React from 'react';

type Props = {
  size: number,
};

const Spacer = ({ size }: Props) => (
  <div style={{ width: size, height: size }} />
);

export default Spacer;
