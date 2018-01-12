import React from 'react';
import styled from 'styled-components';

import { BREAKPOINTS } from '../../constants';

import Spacer from '../Spacer';
import Heading from '../Heading';
import Paragraph from '../Paragraph';

const IntroRouteEnd = () => {
  return (
    <Wrapper>
      <Spacer size={128} />
      <CongratsHeading>Woohoo, you made it!</CongratsHeading>
      <LimitedParagraph>
        Thanks so much for playing. I hope it was worthwhile and educational!
      </LimitedParagraph>

      <LimitedParagraph />
      <Spacer size={window.innerHeight * 0.8} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 64px;
`;

const CongratsHeading = styled(Heading)`
  font-size: 60px;
  font-weight: 700;
  letter-spacing: -2px;
  text-align: center;

  @media ${BREAKPOINTS.sm} {
    font-size: 48px;
  }

  @media ${BREAKPOINTS.mdMin} {
    font-size: 72px;
  }
`;

const LimitedParagraph = styled(Paragraph)`
  max-width: 500px;
  margin: auto;
`;

export default IntroRouteEnd;
