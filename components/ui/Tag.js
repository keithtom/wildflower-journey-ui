import styled from 'styled-components'

const StyledTag = styled.span`
  background: ${({ theme }) => theme.color.neutral.light};
  padding: ${({ theme }) => theme.util.buffer}px ${({ theme }) => theme.util.buffer*2}px;
  border-radius: ${({ theme }) => theme.util.radius}px;
`;
import {
  Text
} from '../ui'

const Tag = ({ children }) => {
  return (
    <StyledTag>
      <Text body regular>
        {children}
      </Text>
    </StyledTag>
  )
}

export default Tag
