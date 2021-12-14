import styled from 'styled-components'

const StyledMaxWidth = styled.div`
  max-width: ${({ theme }) => theme.breakpoint.md}px;
  margin: ${({ theme }) => theme.util.buffer*10}px auto;
`;

const MaxWidth = ({children}) => {
  return (
    <StyledMaxWidth>
      {children}
    </StyledMaxWidth>
  )
}

export default MaxWidth
