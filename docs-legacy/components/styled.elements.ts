import styled from 'styled-components';
import { grid, flexbox, typography, color, background, space, layout } from 'styled-system';
import { Link } from '@redocly/theme/components/Link/Link';
import { Box } from '@theme/ui/Box';
import { H1, H2, H3 } from '@redocly/theme/components/Typography';

import careersBg from '../images/background/left-bg.png';
import { breakpoints } from '@redocly/theme/core/utils';

export const Button = styled.button<{
  color?: 'primary' | 'accent';
  inversed?: boolean;
  width?: string;
  large?: boolean;
  small?: boolean;
}>(
  ({ large, small, width, color, inversed }) => `
  outline: 0;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  padding: ${large ? '20px 90px' : small ? '10px 20px' : '15px 40px'};
  border-radius: ${large ? '40px' : '25px'};
  border: 2px solid;
  letter-spacing: ${large ? '2.4px' : '1.4px'};
  font-size: ${large ? '24px' : '14px'};
  font-weight: 700;
  width: ${width || 'auto'};
  border-color: ${color === 'accent' ? 'var(--color-accent-main)' : 'var(--color-primary-main)'};
  background-color: ${inversed
      ? '#fff'
      : color === 'accent'
        ? 'var(--color-accent-main)'
        : 'var(--color-primary-main)'
    };
  color: ${!inversed
      ? '#fff'
      : color === 'accent'
        ? 'var(--color-accent-main)'
        : 'var(--color-primary-main)'
    };
  text-align: center;
  cursor: pointer;
  transition: color 0.3s ease, background-color 0.3s ease;
  -webkit-font-smoothing: antialiased;
  &:hover,
  &:focus {
    background-color: ${!inversed
      ? '#fff'
      : color === 'accent'
        ? 'var(--color-accent-main)'
        : 'var(--color-primary-main)'
    };
    color: ${inversed
      ? '#fff'
      : color === 'accent'
        ? 'var(--color-accent-main)'
        : 'var(--color-primary-main)'
    };
  }
  &:disabled {
    background-color: #ccc;
    border-color: #ccc;
    pointer-events: none;
  }
  @media screen and (min-width: ${breakpoints.small}) {
    padding: 15px 25px;
  }
  ${large
      ? `
      @media screen and (min-width: ${breakpoints.medium}) {
      font-size: 14px;
      letter-spacing: 1.4px;
      padding: 15px 40px;
      border-radius: 25px;
    }
  `
      : ''
    }
  ${space}
`
);

export const ButtonLink = styled(Button.withComponent('a'))`
  line-height: normal;
  ${space}
`;

export const LandingButton = styled(Button.withComponent('a')) <{
  withIcon?: boolean;
}>`
  line-height: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 325px;
  font-size: 16px;
  border-radius: 30px;
  padding-top: ${({ withIcon }) => (withIcon ? '13px' : '18px')};
  padding-bottom: ${({ withIcon }) => (withIcon ? '13px' : '18px')};
  svg {
    margin-right: 10px;
    fill: #fff;
  }
  &:hover,
  &:focus {
    path {
      fill: var(--color-primary-main);
    }
  }
  @media screen and (min-width: ${breakpoints.medium}) {
    padding-top: ${({ withIcon }) => (withIcon ? '13px' : '18px')};
    padding-bottom: ${({ withIcon }) => (withIcon ? '13px' : '18px')};
  }
`;

export const UnderlinedLink = styled.a`
  color: var(--color-primary-main);
  text-decoration: underline;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.86;
  letter-spacing: 0.7px;

  &:hover,
  &:visited {
    color: var(--color-primary-main);
  }
`;

export const StyledLink = styled.a`
  && {
    color: var(--color-primary-main);
    text-decoration: none;
    ${typography}
    ${color}
    transition: opacity .25s ease;
    &:hover,
    &:visited {
      opacity: 0.8;
    }
  }
`;

export const StyledRouterLink = styled(StyledLink.withComponent(Link))``;

export const StyledH1 = styled(H1)`
  ${typography}
  ${space}
  -webkit-font-smoothing: antialiased;
`;

export const StyledH2 = styled(H2)`
  ${space}
  color: var(--color-primary-main);
  -webkit-font-smoothing: antialiased;
  @media screen and (min-width: ${breakpoints.medium}) {
    font-size: 1.25rem;
  }
  ${typography}
  ${color}
`;

export const LandingH1 = styled(StyledH2.withComponent('h1'))`
  font-size: 1.875rem;
  font-weight: 600;
  line-height: 1.27;
`;

export const StyledH3 = styled(H3)`
  && {
    ${space}
    ${color}
    font-size: 20px;
    line-height: 1.44;
    -webkit-font-smoothing: antialiased;
    @media screen and (min-width: ${breakpoints.small}) {
      font-size: 25px;
    }
    ${typography}
  }
`;

export const H4 = styled.h4`
  font-size: 20px;
  color: var(--color-primary-main);
  font-weight: var(--font-weight-bold);
  -webkit-font-smoothing: antialiased;
  ${typography}
  ${color}
  ${space}
`;

export const SectionHeader = styled(H2)`
  && {
    ${space}
  }
  color: var(--color-primary-main);
  font-size: 25px;
  letter-spacing: 1.2px;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  span {
    color: var(--color-accent-main);
  }
  @media screen and (min-width: ${breakpoints.small}) {
    font-size: 30px;
    letter-spacing: 2px;
  }
  @media screen and (min-width: ${breakpoints.medium}) {
    font-size: 40px;
  }
`;

export const PricingLandingH1 = styled(H1)`
  font-size: 22px;
  text-align: center;
  letter-spacing: 1px;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  span {
    color: var(--color-accent-main);
  }
  @media screen and (min-width: ${breakpoints.small}) {
    font-size: 35px;
  }
  @media screen and (min-width: ${breakpoints.medium}) {
    font-size: 40px;
    line-height: 1.2;
  }
`;

export const PricingLandingButton = styled(ButtonLink)`
  && {
    padding: 13px 70px;
    @media screen and (min-width: ${breakpoints.small}) {
      padding: 10px 40px;
    }
  }
`;

export const HighlightedText = styled.span`
  color: var(--color-primary-main);
`;

export const Strong = styled.strong`
  font-weight: var(--font-weight-bold);
`;

export const StyledTypography = styled.p`
  line-height: 1.44;
  letter-spacing: 0.9px;
  font-size: 1.25rem;
  ${typography}
  ${space}
  ${layout}
`;

export const ResponsiveTypography = styled.p`
  ${space}
  font-size: 14px;
  @media screen and (min-width: ${breakpoints.small}) {
    font-size: 16px;
  }
`;

export const TextSecondary = styled.p`
  && {
    margin-top: 0;
    font-size: 18px;
    line-height: 1.69;
    ${typography}
    ${space}
  }
`;

export const Title = styled(H3)`
  margin-top: 0;
  ${space}
  font-size: 20px;
  line-height: 1.27;
  color: var(--color-primary-main);
  -webkit-font-smoothing: antialiased;
  ${color}
  @media screen and (min-width: ${breakpoints.medium}) {
    font-size: 30px;
  }
  ${typography}
  ${layout}
`;

export const Background = styled(Box) <{ bgImage: string }>`
  background-size: contain;
  background-image: url(${({ bgImage }) => bgImage});
  background-repeat: no-repeat;
  ${background}
`;

export const ResponsiveImg = styled.img`
  display: block;
  height: auto;
  max-width: 100%;
  ${layout}
`;

export const ImgItem = styled.div`
  justify-self: center;
  max-width: 170px;
  padding: 15px;
  &:first-child,
  &:last-child {
    justify-self: center;
  }
  &:not(:last-child) {
    margin-bottom: 45px;
  }

  @media screen and (min-width: ${breakpoints.medium}) {
    &:not(:last-child) {
      margin-bottom: 0;
    }
    &:first-child {
      justify-self: flex-start;
    }
    &:last-child {
      justify-self: flex-end;
    }
  }
`;

export const CareersImageBg = styled(Box)`
  background-image: url(${careersBg});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: left top;
  position: absolute;
  left: 0;
  top: -50px;
  min-height: 500px;
  width: 100%;
  z-index: -1;
  @media screen and (min-width: ${breakpoints.small}) {
    min-height: 250px;
    bottom: 70px;
    top: auto;
  }
`;

export const CustomLayout = styled.div`
  margin-top: -75px;
  @media screen and (min-width: ${breakpoints.medium}) {
    margin-top: -100px;
  }
`;

export const Container = styled(Box)`
  max-width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-left: 15px;
  padding-right: 15px;

  @media screen and (min-width: ${breakpoints.small}) {
    padding-left: 30px;
    padding-right: 30px;
  }
  @media screen and (min-width: ${breakpoints.medium}) {
    max-width: 1170px;
    padding-left: 15px;
    padding-right: 15px;
  }
`;

export const Grid = styled(Box)`
  display: grid;
  ${flexbox}
  ${grid}
`;

export const GridItem = styled(Box)`
  ${flexbox}
  ${grid};
`;

export const ImageShadow = styled(Box)`
  border-radius: 20px;
  box-shadow: 0px 15px 55px 0 rgba(0, 0, 0, 0.18);
  overflow: hidden;
  img {
    height: 100%;
    width: 100%;
  }
  @media screen and (min-width: ${breakpoints.medium}) {
    border-radius: 10px;
  }
`;

export const Paper = styled(Box)`
  border-radius: 25px;
  box-shadow: 0px 15px 55px 0 rgba(0, 0, 0, 0.08);
  background-color: #fff;
`;

export const DarkPaper = styled(Paper)`
  background-color: #3f3f3f;
`;

export const Code = styled(StyledTypography)`
  font-family: 'Source Code Pro', monospace;
`;

export const Divider = styled.div<{ bgColor?: string }>`
  height: 1px;
  width: 100%;
  background-color: ${({ theme, bgColor }) => bgColor || 'var(--color-primary-main)'};
`;

export const Avatar = styled.div`
  width: 118px;
  height: 118px;
  border: 2px solid var(--color-primary-main);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

export const TriangleWrapper = styled.div`
  position: absolute;
  top: 45px;
  left: -15px;

  @media screen and (min-width: ${breakpoints.medium}) {
    bottom: -16px;
    top: auto;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const Triangle = styled.span`
  display: block;
  position: relative;
  width: 0;
  height: 0;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-right: 15px solid #e1e1e1;
  &::after {
    content: '';
    width: 0;
    height: 0;
    border-top: 16px solid transparent;
    border-bottom: 16px solid transparent;
    border-right: 16px solid #fff;
    position: absolute;
    top: -16px;
    left: 1px;
  }

  @media screen and (min-width: ${breakpoints.medium}) {
    border-style: solid;
    border-width: 15px 15px 0 15px;
    border-color: #e1e1e1 transparent transparent transparent;
    &::after {
      border-style: solid;
      border-width: 16px 16px 0 16px;
      border-color: #fff transparent transparent transparent;
      top: -17px;
      left: -16px;
    }
  }
`;

export const List = styled.ul<{ noGutters?: boolean }>`
  && {
    margin: 0;
    padding: 0;
    padding-left: 20px;
    li:not(:last-of-type) {
      margin-bottom: ${({ noGutters }) => (noGutters ? '0' : '5')}px;
    }
  }
`;

export const ListItem = styled.li`
  color: var(--color-text-primary);
  font-size: 14px;
  p {
    margin: 0;
    line-height: 1.4;
  }
  @media screen and (min-width: ${breakpoints.small}) {
    font-size: 16px;
  }
`;

export const OrderedList = styled(List.withComponent('ol'))``;

export const OrderedListItem = styled.li`
  font-size: 20px;
  color: var(--color-text-primary);
  &:not(:last-of-type) {
    margin-bottom: 5px;
  }
  &::marker {
    color: ${({ theme }) => theme.colors.primary.main};
    font-weight: 600;
  }
`;

export const StyledContent = styled.section`
  button[aria-label='expand properties'] {
    color: var(--color-text-primary);
  }
`;

// ================================================
// BLOG
// ================================================

export const PostLink = styled(Link)`
  color: var(--color-primary-main);
  text-decoration: none;
  ${typography}
`;

export const Quote = styled(Box)`
  border: 1px solid #e1e1e1;
  border-radius: 21px;
  padding: 40px 45px;
  position: relative;

  @media screen and (min-width: ${breakpoints.medium}) {
    padding: 45px 30px 25px;
    ${StyledTypography},
    ${StyledLink},
    ${PostLink} {
      text-align: center;
    }
    ${StyledLink},
    ${PostLink} {
      display: block;
      margin-top: 20px;
    }
    ${StyledTypography} {
      font-size: 16px;
    }
  }
`;

export const PostCategory = styled(Link)`
  border: 1px solid #e1e1e1;
  border-radius: 5px;
  color: var(--color-primary-main);
  padding: 3px 25px;
  font-size: 20px;
  text-decoration: none;
  margin-right: 6px;
  margin-bottom: 6px;
`;

export const Text = styled(StyledTypography)`
  && {
    font-size: 15px;
  }
`;

export const Aside = styled.aside`
  width: 100%;
  flex-shrink: 0;
  margin-bottom: 40px;
  @media screen and (min-width: ${breakpoints.small}) {
    width: 100%;
  }
`;

export const BlogPageWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 275px;
  grid-column-gap: 45px;
  max-width: 1150px;
  margin: 60px auto 0;
  padding: 0 15px;
  @media screen and (min-width: ${breakpoints.small}) {
    flex-direction: column;
  }
  @media screen and (min-width: ${breakpoints.medium}) {
    max-width: 100%;
    grid-template-columns: 1fr;
  }
`;
