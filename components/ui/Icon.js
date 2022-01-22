import styled from 'styled-components'

import {
  User,
  Map,
  Star,
  Layout,
  Graduation,
  Search,
  Directions,
  Layer
} from '@styled-icons/boxicons-solid'
import {
  Check,
  X,
  DotsVerticalRounded
} from '@styled-icons/boxicons-regular'

const StyledIcon = styled.span`
  width: ${({ theme }) => theme.util.buffer * 5}px;
  height: ${({ theme }) => theme.util.buffer * 5}px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: ${(props) => (props.size ? `${props.size}px` : `${({ theme }) => theme.util.buffer * 5}px`)};
    ${(props) => (props.color ? `color: ${props.color};` : `color: ${props.theme.color.text.dark};`)}
    ${(props) => (props.link ? `color: ${props.theme.color.primary.purple.main};` : `color: ${props.theme.color.text.dark};`)}
    ${(props) => (props.primary ? `color: ${props.theme.color.primary.purple.main};` : `color: ${props.theme.color.text.dark};`)}
    ${(props) => props.light && `color: ${props.theme.color.neutral.white};`}
    ${(props) => props.lightened && `color: ${props.theme.color.neutral.medium};`}
    opacity: ${props => (props.opacity === 'light') ? props.theme.color.opacity.light
      : (props.opacity === 'medium') ? props.theme.color.opacity.medium
        : (props.opacity === 'dark') ? props.theme.color.opacity.dark
          : '1'
    };
    /* ${(props) => props.error && `color: ${props.theme.color.error.main};`} */
    position: relative;
    top: -1px;
    display: inline-block;
    vertical-align: middle;
    overflow: hidden;
  }
`

const Icon =({
  type,
  ...rest
}) => {
  let source

  if (type === 'user') {
    source = <User />
  } else if (type === 'check') {
    source = <Check />
  } else if (type === 'close') {
    source = <X />
  } else if (type === 'map') {
    source = <Map />
  } else if (type === 'star') {
    source = <Star />
  } else if (type === 'dot-menu') {
    source = <DotsVerticalRounded />
  } else if (type === 'layout') {
    source = <Layout />
  } else if (type === 'graduation') {
    source = <Graduation />
  } else if (type === 'search') {
    source = <Search />
  } else if (type === 'directions') {
    source = <Directions />
  } else if (type === 'layer') {
    source = <Layer />
  }

  return (
    <StyledIcon {...rest}>
      {source}
    </StyledIcon>
  )
}

export default Icon
