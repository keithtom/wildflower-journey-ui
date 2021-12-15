import styled from 'styled-components'

const StyledPageContainer = styled.div`
  height: 100vh;
  width: 100vw;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-top: ${({ theme }) => theme.util.buffer*12}px;
`

const PageContainer = ({ children }) => {
  return (
    <StyledPageContainer>
      {children}
    </StyledPageContainer>
  )
}

export default PageContainer
