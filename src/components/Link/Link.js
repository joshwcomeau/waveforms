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
  position: relative;
  display: inline-block;
  color: ${COLORS.primary[500]};
  text-decoration: none;

  &:after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: ${COLORS.primary[500]};
    opacity: 0.9;
    border-radius: 2px;
  }
`;

const ExternalLink = InternalLink.withComponent('a').extend.attrs({
  href: props => props.to,
})``;

export default Link;
