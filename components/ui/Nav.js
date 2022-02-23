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
        <Link href="/user-profile">
          <ListItem button selected={'/user-profile' === router.pathname}>
            <ListItemIcon>
              <Avatar
                sx={{
                  width: 32,
                  height: 32
                }}
                src={user.profileImage}
              />
            </ListItemIcon>
            <ListItemText primary={`${user.firstName} ${user.lastName}`} />
          </ListItem>
        </Link>
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

const user = {
  email: "laurinda_lockman@spencer-hickle.io",
  firstName: "Maya",
  lastName: "Walley",
  profileImage: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80',
  phoneNumber: '(917) 123-4567',
  location: 'New York City',
  skills: [
    'Finance',
    'Home Schooling',
    'Real Estate'
  ],
  bio: 'Hi there! I decided to pursue being a teacher leader 3 years ago when my son needed to sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. '
}

