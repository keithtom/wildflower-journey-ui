import styled from 'styled-components'

const StyledMaxWidth = styled.div`
  max-width: ${({ theme }) => theme.breakpoint.md}px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.util.buffer*4}px;
`;

const MaxWidth = ({children}) => {
  return (
    <StyledMaxWidth>
      {children}
    </StyledMaxWidth>
  )
}

export default MaxWidth
