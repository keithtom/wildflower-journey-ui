import styled from 'styled-components'

import Nav from '../Nav'

const StyledPageContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: ${({ theme }) => theme.util.navWidth}px;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: ${({ theme }) => theme.util.buffer*12}px;
`

const PageContainer = ({ children }) => {
  return (
    <>
      <Nav user={user} />
      <StyledPageContainer>
        {children}
      </StyledPageContainer>
    </>
  )
}

export default PageContainer

const user = {
  "email": "laurinda_lockman@spencer-hickle.io",
  "firstName": "Barney",
  "lastName": "Wunsch",
  "phone": null,
  "profileRoute": "/user-profile"
}
