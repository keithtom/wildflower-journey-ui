import React from 'react'
import styled from 'styled-components'
import { theme } from '../../styles/theme'

const totalColumns = 12

const GridContainer = styled.div`
  display: flex;
  ${(props) => props.container && `
    flex-wrap: wrap;
    width: 100%;
  `}
  ${(props) => (props.spacing && !props.item) && `
    width: calc(100% + ${theme.util.buffer * props.spacing}px);
    margin: ${-theme.util.buffer * (props.spacing / 2)}px;
  `}
  ${(props) => props.m && `margin: ${props.m * theme.util.buffer}px`};
  ${(props) => props.mt && `margin-top: ${props.mt * theme.util.buffer}px`};
  ${(props) => props.mb && `margin-bottom: ${props.mb * theme.util.buffer}px`};
  ${(props) => props.ml && `margin-left: ${props.ml * theme.util.buffer}px`};
  ${(props) => props.mr && `margin-right: ${props.mr * theme.util.buffer}px`};
  ${(props) => props.mtb && `margin: ${props.mtb * theme.util.buffer}px 0`};
  ${(props) => props.mlr && `margin: 0 ${props.mlr * theme.util.buffer}px`};
  ${(props) => (props.m || props.mt || props.mb || props.ml || props.mr || props.mtb || props.mlr) && 'flex-direction: column'};
  ${(props) => (props.flexDirection ? `flex-direction: ${props.flexDirection};` : !props.container ? 'flex-direction: column;' : '')}
  ${(props) => props.flexWrap && `flex-wrap: ${props.flexWrap};`}
  justify-content: ${(props) => (props.justifyContent ? props.justifyContent : 'flex-start')};
  flex: ${(props) => (props.flex ? props.flex : 'initial')};
  align-items: ${(props) => (props.alignItems ? props.alignItems : 'flex-start')};
  ${(props) => props.justifySelf && `justify-self: ${props.justifySelf};`}
  ${(props) => props.alignSelf && `align-self: ${props.alignSelf};`}
  ${(props) => props.alignContent && `align-content: ${props.alignContent};`}
  ${(props) => props.xs && `
    max-width: ${props.xs * 100 / totalColumns}%;
    flex-basis: ${props.xs * 100 / totalColumns}%;
  `}
  ${(props) => (props.sm) && `
    @media (min-width: ${theme.breakpoint.sm}px) {
      max-width: ${props.sm * 100 / totalColumns}%;
      flex-basis: ${props.sm * 100 / totalColumns}%;
    }
  `}
  ${(props) => props.md && `
    @media (min-width: ${theme.breakpoint.md}px) {
      max-width: ${props.md * 100 / totalColumns}%;
      flex-basis: ${props.md * 100 / totalColumns}%;
    }
  `}
  ${(props) => props.lg && `
    @media (min-width: ${theme.breakpoint.lg}px) {
      max-width: ${props.lg * 100 / totalColumns}%;
      flex-basis: ${props.lg * 100 / totalColumns}%;
    }
  `}

  ${(props) => props.spacing && `
    > .grid-child {
      padding: ${theme.util.buffer * (props.spacing / 2)}px;
    }
  `}
  ${(props) => props.full && 'width: 100%;'}
  &.grid-child {
    ${(props) => (props.flexDirection ? `flex-direction: ${props.flexDirection};` : 'flex-direction: column;')}
  }
`

const Grid = (props) => {
  const { item, className, ...gridProps } = props
  return <GridContainer {...gridProps} className={`${className} ${item && 'grid-child'}`} />
}

export default Grid
