import styled from 'styled-components'
import Link from 'next/link'

import {
  Text,
  Grid,
  Icon
} from './ui'

const StyledNavItem = styled.div`
  width: 100%;
  border-radius: ${({ theme }) => theme.util.radius}px;
  padding: ${({ theme }) => theme.util.buffer * 3}px;
  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.color.neutral.light};
  }
`;

const NavItem = ({
  route,
  icon,
  name,
  notificationCount
}) => {
  return (
    <StyledNavItem>
      <Link href={route}>
        <Grid container>
          <Grid item xs={12}>
            <Grid container spacing={4} alignItems="center">
              <Grid item>
                <Icon type={icon} />
              </Grid>
              <Grid item>
                <Text body large>{name}</Text>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Link>
    </StyledNavItem>
  )
}

export default NavItem
