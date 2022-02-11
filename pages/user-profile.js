import { useState } from 'react'
import Head from 'next/head'

import {
  Box,
  Divider,
  Grid,
  Card,
  CardContent,
  Stack,
  Typography,
  Avatar,
  Chip,
  Button,
  ToggleButton,
  Modal,
  Paper
} from '@mui/material'
import {
  Close
 } from '@mui/icons-material'

import PageContainer from '../components/ui/PageContainer'

const UserProfile = ({}) => {
  const [contactModalOpen, setContactModalOpen] = useState(false)

  return (
    <>
      <Head>
        <title>Wildflower Schools Directory | User Profile</title>
        <meta name="title" content="Wildflower Schools Directory" />
        <meta property="og:site_name" content="Wildflower Schools Directory" key="og_wf_site_name" />
        <meta name="description" content="Wildflower Schools Directory" />
        <meta name="keywords" content="Wildflower, Schools, Directory, Montessori" />
        <meta property="og:title" content="Wildflower Schools Directory" key="og_wf_site_title" />
        <meta property="og:description" content="Wildflower Schools Directory" key="og_wf_site_description" />
      </Head>

      <PageContainer>

        <Box
          sx={{
            width: 1,
            paddingTop: 20,
            background: '#fafafa'
          }}
        >
          <Grid container p={3} alignItems="center" spacing={3}>
            <Grid item>
              <Avatar
                sx={{
                  width: 64,
                  height: 64
                }}
                src={user.profileImage}
              />
            </Grid>
            <Grid item>
              <Typography variant="h3">{user.firstName} {user.lastName}</Typography>
            </Grid>
          </Grid>
          <Divider />
        </Box>

        <Grid container p={3} spacing={3}>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Stack spacing={3}>
                  <Stack spacing={1}>
                    <Typography variant="h6">About</Typography>
                    <Typography>{user.bio}</Typography>
                  </Stack>
                  <Stack spacing={1}>
                    <Typography variant="h6">Contact</Typography>
                    <Typography>{user.location}</Typography>
                    <Button
                      variant="contained"
                      onClick={() => setContactModalOpen(true)}
                    >
                      Contact {user.firstName}
                    </Button>
                  </Stack>
                  <Stack spacing={1}>
                    <Typography variant="h6">Skills</Typography>
                    <Grid container spacing={1}>
                      {user.skills.map((s, i) =>
                        <Grid item key={i}>
                          <Chip label={s} />
                        </Grid>
                      )}
                    </Grid>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Stack spacing={3}>
              <Typography variant="h6">School</Typography>
              <Stack spacing={1}>
                <Card>
                  <CardContent>
                    <Grid container>
                      <Grid item>
                        <Typography>Brooklyn Heights Montessori</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Modal
          open={contactModalOpen}
          onClose={() => setContactModalOpen(false)}
        >
          <Card
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
            }}
          >
            <CardContent>
              <Stack spacing={1}>
                <Grid container alignItems="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h6">Contact {user.firstName} {user.lastName}</Typography>
                  </Grid>
                  <Grid item>
                    <ToggleButton
                      size="small"
                      onChange={() => setContactModalOpen(!contactModalOpen)}
                    >
                      <Close />
                    </ToggleButton>
                  </Grid>
                </Grid>
                <Paper
                  elevation={0}
                  sx={{
                    p: 1,
                    background: '#fafafa'
                  }}
                >
                  <Typography>{user.email}</Typography>
                </Paper>
                <Paper
                  elevation={0}
                  sx={{
                    p: 1,
                    background: '#fafafa'
                  }}
                >
                  <Typography>{user.phoneNumber}</Typography>
                </Paper>
              </Stack>
            </CardContent>
          </Card>
        </Modal>

      </PageContainer>

    </>
  )
}

export default UserProfile

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
