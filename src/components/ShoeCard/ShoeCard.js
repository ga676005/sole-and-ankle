import React from 'react'
import styled from 'styled-components/macro'

import { COLORS, WEIGHTS } from '../../constants'
import { formatPrice, pluralize, isNewShoe } from '../../utils'
import Spacer from '../Spacer'

const VARIANTS_STYLES = {
  'on-sale': {
    text: 'Sale',
    bg: '#C5295D'
  },
  'new-release': {
    text: 'Just Released!',
    bg: '#6868D9'
  }
}

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const variantStyle = VARIANTS_STYLES[variant]

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        {variantStyle && (
          <ShoeStatus style={{ '--bg-clr': variantStyle.bg }}>
            {variantStyle.text}
          </ShoeStatus>
        )}
        <ImageWrapper>
          <Image alt='' src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price className={variant === 'on-sale' ? 'on-sale' : ''}>
            {formatPrice(price)}
          </Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {salePrice && <SalePrice> {formatPrice(salePrice)} </SalePrice>}
        </Row>
      </Wrapper>
    </Link>
  )
}

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`

const Wrapper = styled.article`
  position: relative;
  isolation: isolate;
`

const ImageWrapper = styled.div`
  border-radius: 8px;
  overflow: hidden;
  padding: 20px 0;
  background-color: ${COLORS.gray[100]};
`

const Image = styled.img`
  width: 100%;
`

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
  margin-right: auto;
`

const Price = styled.span`
  &.on-sale {
    color: ${COLORS.gray[700]};
    text-decoration: line-through;
  }
`

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`

const ShoeStatus = styled.span`
  font-weight: ${WEIGHTS.medium};
  font-size: 14px;
  color: ${COLORS.white};
  background-color: var(--bg-clr);
  position: absolute;
  top: 10px;
  right: -10px;
  padding: 4px 8px;
  border-radius: 2px;
`

export default ShoeCard
