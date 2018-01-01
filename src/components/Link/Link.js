// @flow
import React from 'react';
import { Link as RRLink } from 'react-router-dom';
import styled from 'styled-components';

import { COLORS } from '../../constants';

type Props = {
  external?: boolean,
};

const Link = ({ external, ...delegated }: Props) => {
  const LinkComponent = external ? ExternalLink : InternalLink;

  return <LinkComponent {...delegated} />;
};

const InternalLink = styled(RRLink)`
  color: ${COLORS.primary[500]};
`;

const ExternalLink = InternalLink.withComponent('a').extend.attrs({
  href: props => props.to,
})``;

export default Link;
