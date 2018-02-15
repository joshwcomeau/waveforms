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
          Let me know what you think{' '}
          <Link external to="https://twitter.com/JoshWComeau">
            on Twitter
          </Link>{' '}
          or{' '}
          <Link external to="mailto:joshwcomeau@gmail.com">
            by email
          </Link>. I'm especially keen to hear if you have suggestions for other
          audio concepts you'd like explained this way!
        </LimitedParagraph>

        <LimitedParagraph>
          This project was created with React.{' '}
          <Link external to="https://github.com/joshwcomeau/waveforms">
            View the source
          </Link>.
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

        <LimitedParagraph />

        <LimitedParagraph>
          Warm thanks to Pat McNeil, instructor at{' '}
          <Link external to="http://www.vaniercollege.qc.ca/audio/">
            Vanier College
          </Link>, who taught me all this stuff originally, and Matt
          Dunn-Rankin, co-worker at{' '}
          <Link external to="https://www.khanacademy.org/">
            Khan Academy
          </Link>. Pat's deep audio expertise and Matt's keen eye for pedagogy
          greatly improved this exploration.
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
  margin-bottom: 42px;
`;

export default IntroRouteEnd;
