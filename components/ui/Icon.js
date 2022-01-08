import styled from 'styled-components'

import {
  User,
  CheckCircle
} from '@styled-icons/boxicons-solid'

const StyledIcon = styled.span`
  width: ${({ theme }) => theme.util.buffer*4}px;
  height: ${({ theme }) => theme.util.buffer*4}px;
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
    source = <CheckCircle />
  }

  return (
    <StyledIcon {...rest}>
      {source}
    </StyledIcon>
  )
}

export default Icon
