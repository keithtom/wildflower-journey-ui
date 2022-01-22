import styled from 'styled-components'
import Link from 'next/link'

import {
  Text,
  Grid,
  Icon,
  Tag
} from './ui'

const StyledNavItem = styled.div`
  width: 100%;
  border-radius: ${({ theme }) => theme.util.radius}px;
  padding: ${({ theme }) => theme.util.buffer * 3}px;
  transition: ${({ theme }) => theme.util.transition};
  background: ${(props) => props.active ? props.theme.color.primary.purple.lightened : 'transparent'};
  &:hover {
    transition: ${({ theme }) => theme.util.transition};
    cursor: ${(props) => props.disabled ? 'auto' : 'pointer'};
    background: ${(props) => props.disabled ? 'transparent'
      : props.active ? props.theme.color.primary.purple.medium
        : props.theme.color.neutral.light
    };
  }
`;

const NavItem = ({
  route,
  icon,
  name,
  active,
  disabled,
  notificationCount
}) => {
  return (
    <StyledNavItem active={active} disabled={disabled}>
      <Link href={route}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Grid container spacing={4} alignItems="center">
              <Grid item>
                <Icon type={icon} primary={active} lightened={disabled}/>
              </Grid>
              <Grid item>
                <Text body large highlight={active} lightened={disabled}>{name}</Text>
              </Grid>
            </Grid>
          </Grid>
          {notificationCount ?
            <Grid item>
              <Tag alert center small>{notificationCount}</Tag>
            </Grid>
          : null}
        </Grid>
      </Link>
    </StyledNavItem>
  )
}

export default NavItem
