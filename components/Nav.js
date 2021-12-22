import { useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'

import {
  Text,
  Grid
} from './ui'

const StyledNavToggler = styled.div`
  position: absolute;
  z-index: ${({ theme }) => theme.util.zIndexTop};
  width: ${({ theme }) => theme.util.buffer*12}px;
  height: ${({ theme }) => theme.util.buffer*12}px;
  top: ${({ theme }) => theme.util.buffer*12}px;
  left: ${({ theme }) => theme.util.buffer*12}px;
  border: 1px solid ${({ theme }) => theme.color.neutral.medium};
  border-radius: ${({ theme }) => theme.util.radiusLarge*10}px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.color.neutral.light};
  }
`;

const StyledNav = styled.div`
  position: absolute;
  z-index: ${({ theme }) => theme.util.zIndexMiddleTop};
  top: 0;
  bottom: 0;
  left: ${props => props.open ? 0 : `-${props.theme.util.buffer*80}px`};
  width: ${({ theme }) => theme.util.buffer*80}px;
  background: ${({ theme }) => theme.color.neutral.white};
  border-right: 1px solid ${({ theme }) => theme.color.neutral.medium};
  box-shadow: ${props => props.open ? props.theme.util.shadowLarge : 'none'};
  transition: ${({ theme }) => theme.util.transition};
  padding: ${({ theme }) => theme.util.buffer*36}px 0 ${({ theme }) => theme.util.buffer*12}px ${({ theme }) => theme.util.buffer*12}px;
`;

const StyledNavItem = styled(Grid)`
  * {
    color: ${({ theme }) => theme.color.text.lightened};
  }
  &:hover {
    cursor: pointer;
    * {
      color: ${({ theme }) => theme.color.text.dark};
    }
  }
`;

const Nav = ({}) => {
  const [navOpen, setNavOpen] = useState(false)

  return (
    <>
      <StyledNavToggler onClick={() => setNavOpen(!navOpen)}>
        <Grid item>
          <Text>T</Text>
        </Grid>
      </StyledNavToggler>

      <StyledNav open={navOpen}>
        <Grid container flexDirection="column" justifyContent="space-between"  style={{height: '100%'}}>

          <Grid item>
            <Grid container spacing={2}>

              <Link href="/UserProfile">
                <StyledNavItem item xs={12}>
                  <Text body large>Your Profile</Text>
                </StyledNavItem>
              </Link>

              <Link href="/SchoolProfile">
                <StyledNavItem item xs={12}>
                  <Text body large>Your School</Text>
                </StyledNavItem>
              </Link>
            </Grid>
          </Grid>

          <Grid item>
            <Text body small lightened>
              Wildflower Schools
            </Text>
          </Grid>

        </Grid>
      </StyledNav>
    </>
  )
}

export default Nav
