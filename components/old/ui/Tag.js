import styled from 'styled-components'

const StyledTag = styled.span`
  background: ${(props) => props.alert ? props.theme.color.alert.main : props.theme.color.neutral.light};
  padding: ${({ theme }) => theme.util.buffer}px ${({ theme }) => theme.util.buffer*2}px;
  border-radius: ${(props) => props.alert ? props.theme.util.radiusLarge
    : props.theme.util.radius
  }px;
  width: ${(props) => props.alert && props.theme.util.buffer * 6}px;
  height: ${(props) => props.alert && props.theme.util.buffer * 6}px;
  ${(props) => props.center &&`
    display: flex;
    align-items: center;
    justify-content: center;
  `}
`;
import {
  Text
} from '../ui'

const Tag = ({
  children,
  alert,
  center,
  small
}) => {
  return (
    <StyledTag alert={alert} center={center}>
      <Text body regular small={small} light={alert}>
        {children}
      </Text>
    </StyledTag>
  )
}

export default Tag
