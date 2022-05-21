import { useState } from 'react'
import { useRouter } from 'next/router'
import { useMediaQuery } from 'react-responsive'

import { theme } from '../../styles/theme'

import {
  Drawer,
  Toolbar,
  Avatar,
  AppBar,
  IconButton,
  Link,
  Box,
  Menu,
  MenuItem
} from '@mui/material'
import {
  Card,
  NavLink,
  Typography,
  Stack,
  Grid,
  Divider
} from '@ui'
import {
 PeopleAlt,
 MeetingRoom,
 MenuOutlined,
 Quiz,
 Info,
 ArrowForward
} from '@mui/icons-material'

const drawerWidth = 240

const Nav = ({}) => {
  const [navOpen, setNavOpen] = useState(false)
  const [profileNavOpen, setProfileNavOpen] = useState(false)
  const router = useRouter()

  const isSm = useMediaQuery(
    { maxDeviceWidth: theme.breakpoints.values.sm },
  )

  return (
    <Box sx={{display: 'flex'}}>
      <AppBar
        position="fixed"
        sx={{
          ml: { sm: `${drawerWidth}px` },
          paddingLeft: 4,
          paddingRight: 4,
          marginTop: 0,
          zIndex: 2,
          background: 'white',
          color: 'black',
          border: 0,
          outline: `1px solid ${theme.palette.border.main}`
        }}
      >
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1 }}>
            {isSm ?
              <Stack direction="row" alignItems="center" spacing={2}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={() => setNavOpen(!navOpen)}
                >
                  <MenuOutlined />
                </IconButton>
                <Typography variant="body1" noWrap>Wildflower Platform</Typography>
              </Stack>
            :
              <Typography variant="h6" noWrap>Wildflower Platform</Typography>
            }
          </Box>
          <Box>
            <Avatar
              sx={{
                width: 32,
                height: 32
              }}
              src={user.profileImage}
              onClick={() => setProfileNavOpen(true)}
              id="profile-avatar"
            />
            {profileNavOpen &&
              <Menu
                id="menu-appbar"
                anchorEl="profile-avatar"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={() => setProfileNavOpen(!profileNavOpen)}
                onClose={() => setProfileNavOpen(false)}
              >
                <NavLink
                   onClick={() => setProfileNavOpen(false)}
                   to="/user-profile"
                    label="My Profile"
                />
                <NavLink
                   onClick={() => setProfileNavOpen(false)}
                   to="/school-profile"
                    label="My School"
                />
              </Menu>
            }
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          zIndex: 1,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            marginTop: 0,
            border: 0,
            outline: `1px solid ${theme.palette.border.main}`
          }
        }}
        variant={isSm ? `temporary` : `permanent`}
        anchor="left"
        open={navOpen}
        onClose={() => setNavOpen(!navOpen)}
      >
        <Toolbar />

        <Stack
          justifyContent="space-between"
          direction="column"
          sx={{ height: '100%' }}
        >
          <div>
            <NavLink
              to="/network"
              label="Network"
              icon={<PeopleAlt fontSize="small" />}
            />
            <NavLink
              to="/advice"
              // active={('/advice/drafts' || 'advice/open' || 'advice/thought-partner' || 'advice/stakeholder')}
              label="Advice"
              icon={<Quiz fontSize="small" />}
            />
          </div>

          <Grid container p={4} spacing={8}>
            <Grid item xs={12}>
              <Card>
                <Stack spacing={2}>
                  <Info color="primary"/>
                  <Typography variant="body1">We want to hear from you!</Typography>
                  <Typography variant="body2">Send us an email with any and all feedback.</Typography>
                  <Link href="mailto:tech-pilot@wildflowerschools.org?subject=Directory" underline="none">
                    <Stack flexDirection="row" justifyContent="space-between">
                        Send an email
                      <ArrowForward color="primary" fontSize="small" />
                    </Stack>
                  </Link>
                </Stack>
              </Card>
            </Grid>
          </Grid>

        </Stack>

      </Drawer>
    </Box>
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

