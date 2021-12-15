import styled from 'styled-components'

const StyledContainer = styled.div`
  padding: ${({ theme }) => theme.util.buffer*8}px;
  padding-top: ${props => props.paddingTopLarge && props.theme.util.buffer*48}px;
  border-radius: ${({ theme }) => theme.util.radiusLarge}px;
  width: 100%;
  border: 1px solid ${props => props.yellow ? 'none'
    : props.theme.color.neutral.light
  };
  background: ${props => props.yellow ? props.theme.color.primary.yellow.lightened
    : props.theme.color.neutral.white
  };
`;

const Container = ({
  children,
  ...rest
}) => {
  return (
    <StyledContainer
      {...rest}
    >
      {children}
    </StyledContainer>
  )
}

export default Container
