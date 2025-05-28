import * as React from 'react';
import styled from 'styled-components';

export function FormatImage({ align, width, withLightbox = true, caption, children }) {
  // Images default to lightbox enabled
  const [showLightbox, setShowLightbox] = React.useState(false);
  const handleImageClick = () => {
    setShowLightbox(!showLightbox);
  };

  const imageNode = React.Children.only(children);
  const imageSrc = imageNode.props.children.props.src;
  const imageAltText = imageNode.props.children.props.alt;

  return (
    <>
      {withLightbox && showLightbox && (
        <LightboxContainer showLightbox={showLightbox} onClick={handleImageClick}>
          <CloseButton>×</CloseButton>
          <Image src={imageSrc} alt={imageAltText} />
        </LightboxContainer>
      )}
      {withLightbox && !showLightbox && (
        <LightboxWrapper onClick={handleImageClick} align={align} width={width}>
          <CaptionWrapper>
            <Image src={imageSrc} alt={imageAltText} />
            {caption && (
              <Caption>
                <p>{caption}</p>
              </Caption>
            )}
          </CaptionWrapper>
        </LightboxWrapper>
      )}
      {!withLightbox && (
        <ImageWrapper align={align} width={width}>
          <CaptionWrapper>
            <Image src={imageSrc} alt={imageAltText} />
            {caption && (
              <Caption>
                <p>{caption}</p>
              </Caption>
            )}
          </CaptionWrapper>
        </ImageWrapper>
      )}
    </>
  );
}

const Image = styled.img`
  max-width: 100%;
  width: 100%;
  height: auto;
  display: block;
  border-radius: 4px;
  margin: inherit !important;
`;
const ImageWrapper = styled.div.attrs((props) => ({
  width: props.width ? props.width : 'auto',
}))`
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  display: table;

  margin: ${({ align }) =>
    align === 'left' ? '0 auto 0 0' : align === 'right' ? '0 0 0 auto' : 'auto'};

  width: ${(props) => props.width};
`;

const LightboxWrapper = styled(ImageWrapper)`
  cursor: pointer;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 30px;
  right: 30px;
  font-size: 36px;
  color: #fe6d41;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font: normal normal normal 2em/1 FontAwesome;
`;

const LightboxContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.55);
  z-index: 999;
  display: ${({ showLightbox }) => (showLightbox ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;

  img {
    cursor: pointer;
    height: auto;
    width: 60vw;
  }
`;

const Caption = styled.div`
  // Limits the caption to same width as image
  display: table-caption;
  caption-side: bottom;
  width: 100%;
  margin: inherit;
  position: absolute;
  font-size: 14px;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0;
  overflow: hidden;
  transition: height 0.3s ease-in-out;
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;

  p {
    font-family: 'Source Sans Pro', sans-serif;
    font-weight: var(--font-weight-bold);
    color: #fff;
    line-height: 36px;
  }
`;

const CaptionWrapper = styled.div`
  margin: inherit;

  &:hover ${Caption} {
    height: 36px;
  }
`;
