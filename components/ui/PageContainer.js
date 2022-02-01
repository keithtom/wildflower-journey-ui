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
  name: 'Maya Whalley',
  role: 'Teacher Leader',
  phoneNumber: '917-123-4567',
  profileRoute: '/user-profile',
  profileImage: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80'
}