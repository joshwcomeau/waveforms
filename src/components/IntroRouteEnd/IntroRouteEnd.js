// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS, BREAKPOINTS } from '../../constants';

import Spacer from '../Spacer';
import Heading from '../Heading';
import Paragraph from '../Paragraph';
import Link from '../Link';
import MaxWidthWrapper from '../MaxWidthWrapper';

const IntroRouteEnd = () => {
  return (
    <Wrapper>
      <MaxWidthWrapper>
        <Spacer size={128} />
        <CongratsHeading>
          <LetterSquash>W</LetterSquash>oohoo, you finished it!
        </CongratsHeading>
        <LimitedParagraph>
          Thanks so much for playing. I hope it was worthwhile and educational!
        </LimitedParagraph>

        <LimitedParagraph>
          This project was heavily inspired by R2D3's amazing{' '}
          <Link
            external
            to="http://www.r2d3.us/visual-intro-to-machine-learning-part-1/"
          >
            visual intro to machine learning
          </Link>.
        </LimitedParagraph>

        <LimitedParagraph>
          This was a blast to build, and I'd love to make this part of a series.
          Please{' '}
          <Link
            external
            to="https://docs.google.com/forms/d/e/1FAIpQLSe7dFRfI36VLOaQfgjxCa-hINSTrQTNhrmj3A5ewCDITH_WHw/viewform?usp=sf_link"
          >
            take this survey
          </Link>{' '}
          to let me know how I could improve, and what I should cover next time.
          It's only 4 questions :)
        </LimitedParagraph>
        <Spacer size={172} />
      </MaxWidthWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 64px;
  background: ${COLORS.gray[300]};
`;

const CongratsHeading = styled(Heading)`
  font-size: 60px;
  font-weight: 700;
  letter-spacing: -2px;
  text-align: center;
  margin-bottom: 60px;

  @media ${BREAKPOINTS.sm} {
    font-size: 48px;
  }

  @media ${BREAKPOINTS.mdMin} {
    font-size: 72px;
  }
`;

const LetterSquash = styled.span`
  letter-spacing: -7px;
`;

const LimitedParagraph = styled(Paragraph)`
  max-width: 600px;
  font-size: 26px;
  margin-left: auto;
  margin-right: auto;
`;

export default IntroRouteEnd;
