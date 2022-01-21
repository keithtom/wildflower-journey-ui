import styled from 'styled-components'

import {
  User,
} from '@styled-icons/boxicons-solid'
import {
  Check,
  X,
} from '@styled-icons/boxicons-regular'

const StyledIcon = styled.span`
  width: ${({ theme }) => theme.util.buffer * 4}px;
  height: ${({ theme }) => theme.util.buffer * 4}px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  }

  return (
    <StyledIcon {...rest}>
      {source}
    </StyledIcon>
  )
}

export default Icon
