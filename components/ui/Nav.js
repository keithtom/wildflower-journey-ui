import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMediaQuery } from 'react-responsive'

import { theme } from '../../styles/theme'

import {
  Drawer,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  AppBar,
  IconButton,
  Typography
} from '@mui/material'
import {
 PeopleAlt,
 MeetingRoom,
 MenuOutlined,
 Quiz
} from '@mui/icons-material'

const drawerWidth = 240

const Nav = ({}) => {
  const [navOpen, setNavOpen] = useState(false)
  const router = useRouter()

  const isSm = useMediaQuery(
    { maxDeviceWidth: theme.breakpoints.values.sm },
  )

  return (
    <>
      <AppBar
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          paddingLeft: 6,
          marginTop: 0
        }}
      >
        <Toolbar>
          {isSm ?
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() => setNavOpen(true)}
            >
              <MenuOutlined />
            </IconButton>
          :
            <Typography variant="h6" noWrap>
              {router.pathname === '/network' ? 'Network'
              : router.pathname === '/user-profile' ? 'Your Profile'
              : router.pathname === '/school-profile' ? 'Your School'
              : router.pathname === '/advice' ? 'Advice Process'
              : null
              }
            </Typography>
          }
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            marginTop: 0
          }
        }}
        variant={isSm ? `temporary` : `permanent`}
        anchor="left"
        open={navOpen}
        onClose={() => setNavOpen(!navOpen)}
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

          <Link href="/advice">
            <ListItem button selected={'/advice' === router.pathname}>
              <ListItemIcon>
                <Quiz />
              </ListItemIcon>
              <ListItemText primary='Advice' />
            </ListItem>
          </Link>
        </List>

      </Drawer>
    </>
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

