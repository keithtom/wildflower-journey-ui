import { useState } from 'react'
import styled from 'styled-components'

import ProfileMaya from '../public/assets/images/profile-maya.png'
import {
  Text,
  Grid,
  Icon
} from './ui'
import UserInfo from '../components/UserInfo'
import NavItem from '../components/NavItem'

const StyledNav = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: ${({ theme }) => theme.util.zIndexTop};
  width: ${({ theme }) => theme.util.buffer * 80}px;
  background: ${({ theme }) => theme.color.neutral.white};
  border-right: ${({ theme }) => theme.util.border};
`;
const StyledNavActions = styled(Grid)`
  padding: ${({ theme }) => theme.util.buffer * 6}px;
  border-bottom: ${({ theme }) => theme.util.border};
  transition: ${({ theme }) => theme.util.transition};
  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.color.neutral.light};
    transition: ${({ theme }) => theme.util.transition};
  }
  `;
const StyledNavContents = styled(Grid)`
  padding: ${({ theme }) => theme.util.buffer * 6}px;
`;
const StyledNavFooter = styled(Grid)`
  padding: ${({ theme }) => theme.util.buffer * 6}px;
`;

const Nav = ({}) => {
  const [navOpen, setNavOpen] = useState(true)

  return (
    <StyledNav open={navOpen}>

      <Grid container style={{height: '100%'}} alignItems="space-between">

        <Grid item flexDirection="column" justifyContent="flex-start">
          <StyledNavActions container alignItems="center" justifyContent="space-between">
            <Grid item>
              <UserInfo
                name="Maya Whalley"
                role="Teacher Leader"
                profileImage={ProfileMaya}
              />
            </Grid>
            <Grid item>
              <Icon type="dot-menu" lightened/>
            </Grid>
          </StyledNavActions>
          <StyledNavContents container spacing={2}>
            {Navigation.map((n, i) =>
              <Grid item xs={12}>
                <NavItem
                  route={n.route}
                  icon={n.icon}
                  name={n.name}
                  notificationCount={n.notificationCount}
                />
              </Grid>
            )}
          </StyledNavContents>
        </Grid>

        <Grid item flexDirection="column" justifyContent="flex-end">
          <StyledNavFooter container>
            <Grid item>
              <Text body small lightened>
                Powered by <Text body small lightened bold>Wildflower Platform</Text>
              </Text>
            </Grid>
          </StyledNavFooter>
        </Grid>

      </Grid>



    </StyledNav>
  )
}

export default Nav

const Navigation = [
  {
    name: 'Dashboard',
    route: '/',
    icon: 'layout'
  },
  {
    name: 'Your School',
    route: '/SchoolProfile',
    icon: 'graduation',
    notificationCount: 2
  },
  {
    name: 'Search',
    route: '/search',
    icon: 'search'
  },
  {
    name: 'Get Advice',
    route: '/',
    icon: 'directions',
  },
  {
    name: 'Resource Hub',
    route: '/',
    icon: 'layer',
  },
]
