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
  Link
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
          marginTop: 0,
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
              : router.pathname === '/advice/drafts' ? 'Advice Process'
              : router.pathname === '/advice/open' ? 'Advice Process'
              : router.pathname === '/advice/thought-partner' ? 'Advice Process'
              : router.pathname === '/advice/stakeholder' ? 'Advice Process'
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

        <Stack
          justifyContent="space-between"
          direction="column"
          sx={{ height: '100%' }}
        >

          <div>
            <NavLink
              to="/user-profile"
              label={`${user.firstName} ${user.lastName}`}
              icon={
                <Avatar
                  sx={{
                    width: 32,
                    height: 32
                  }}
                  src={user.profileImage}
                />
              }
            />

            <Divider />

            <NavLink
              to="/network"
              label="Network"
              icon={<PeopleAlt fontSize="small" />}
            />

            <NavLink
              to="/school-profile"
              label="Your School"
              icon={<MeetingRoom fontSize="small" />}
            />

            <NavLink
              to="/advice/drafts"
              active={('/advice/drafts' || 'advice/open' || 'advice/thought-partner' || 'advice/stakeholder')}
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
    </>
  )
}

export default Nav

const user = {
  email: "laurinda_lockman@spencer-hickle.io",
  firstName: "Maya",
  lastName: "Walley",
  profileImage: 'https://images.unsplash.com/photo-1589317621382-0cbef7ffcc4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
  phoneNumber: '(917) 123-4567',
  location: 'New York City',
  skills: [
    'Finance',
    'Home Schooling',
    'Real Estate'
  ],
  bio: 'Hi there! I decided to pursue being a teacher leader 3 years ago when my son needed to sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. '
}

