// @flow
import React from 'react';
import { Link as RRLink } from 'react-router-dom';
import styled from 'styled-components';

import { COLORS } from '../../constants';

type Props = {
  external?: boolean,
  target?: '_blank' | '_parent' | '_self' | '_top',
};

const Link = ({ external, target, ...delegated }: Props) => {
  const LinkComponent = external ? ExternalLink : InternalLink;

  const additionalProps = {};

  if (target === '_blank') {
    additionalProps.rel = 'noopener noreferrer';
  }

  return <LinkComponent {...additionalProps} {...delegated} />;
};

const InternalLink = styled(RRLink)`
  position: relative;
  display: inline-block;
  color: ${COLORS.primary[500]};
  text-decoration: none;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
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
