import Link from 'next/link'
import { useRouter } from 'next/router'

import {
  Drawer,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar
} from '@mui/material'
import {
 PeopleAlt,
 MeetingRoom
} from '@mui/icons-material'

import { styled } from '@mui/material/styles'

const Nav = ({}) => {
  const router = useRouter()

  return (
    <Drawer
      sx={{
        width: 240,
        '& .MuiDrawer-paper': {
          width: 240
        }
      }}
      variant="permanent"
      anchor="left"
    >

      <List>
        <ListItem button>
          <ListItemIcon>
            <Avatar />
          </ListItemIcon>
          <ListItemText primary="Maya Walley" />
        </ListItem>
      </List>

      <Divider />

      <List>
        <Link href="/network">
          <ListItem button selected={'/network' === router.pathname}>
            <ListItemIcon>
              <PeopleAlt />
            </ListItemIcon>
            <ListItemText primary='Network' />
          </ListItem>
        </Link>

        <Link href="/school-profile">
          <ListItem button selected={'/school-profile' === router.pathname}>
            <ListItemIcon>
              <MeetingRoom />
            </ListItemIcon>
            <ListItemText primary='Your School' />
          </ListItem>
        </Link>
      </List>

    </Drawer>
  )
}

export default Nav

const navItems = [
]
