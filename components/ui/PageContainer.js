import styled from 'styled-components'

import Nav from '../Nav'

const StyledPageContainer = styled.div`
  height: 100vh;
  width: 100vw;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: ${({ theme }) => theme.util.buffer*12}px 0;
`

const PageContainer = ({ children }) => {
  return (
    <>
      <Nav/>
      <StyledPageContainer>
        {children}
      </StyledPageContainer>
    </>
  )
}

export default PageContainer
