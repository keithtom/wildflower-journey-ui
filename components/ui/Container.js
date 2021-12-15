import styled from 'styled-components'

const StyledContainer = styled.div`
  padding: ${({ theme }) => theme.util.buffer*8}px;
  border-radius: ${({ theme }) => theme.util.radiusLarge}px;
  /* box-shadow: ${({ theme }) => theme.util.shadowLarge}; */
  border: 1px solid ${({ theme }) => theme.color.neutral.light};
`;

const Container = ({ children }) => {
  return (
    <StyledContainer>
      {children}
    </StyledContainer>
  )
}

export default Container
