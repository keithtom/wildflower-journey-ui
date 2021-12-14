import styled from 'styled-components'

const StyledContainer = styled.div`
  padding: ${({ theme }) => theme.util.buffer*4}px;
  border-radius: ${({ theme }) => theme.util.radiusLarge}px;
  box-shadow: ${({ theme }) => theme.util.shadowLarge};
`;

const Container = ({ children }) => {
  return (
    <StyledContainer>
      {children}
    </StyledContainer>
  )
}

export default Container
