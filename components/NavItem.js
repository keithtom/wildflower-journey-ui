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
  transition: ${({ theme }) => theme.util.transition};
  background: ${(props) => props.active ? props.theme.color.primary.purple.lightened : 'transparent'};
  &:hover {
    transition: ${({ theme }) => theme.util.transition};
    cursor: pointer;
    background: ${({ theme }) => theme.color.neutral.light};
  }
`;

const NavItem = ({
  route,
  icon,
  name,
  active,
  notificationCount
}) => {
  return (
    <StyledNavItem active={active}>
      <Link href={route}>
        <Grid container>
          <Grid item xs={12}>
            <Grid container spacing={4} alignItems="center">
              <Grid item>
                <Icon type={icon} primary={active}/>
              </Grid>
              <Grid item>
                <Text body large highlight={active}>{name}</Text>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Link>
    </StyledNavItem>
  )
}

export default NavItem
