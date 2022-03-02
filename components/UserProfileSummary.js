import { useState } from 'react'

import {
  Grid,
  Card,
  Stack,
  Typography,
  Chip,
  Button
} from '@ui'
import UserContactModal from '../components/UserContactModal'

const UserProfileSummary = ({ user }) => {
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const toggleContactModal = () => setContactModalOpen(!contactModalOpen)

  return (
    <>
      <Card>
        <Stack spacing={4}>
          <Stack spacing={2}>
            <Typography variant="h6">About</Typography>
            <Typography>{user.bio}</Typography>
          </Stack>
          <Stack spacing={2}>
            <Typography variant="h6">Contact</Typography>
            <Typography>{user.location}</Typography>
            { false &&
              <Button
                variant="outlined"
                onClick={() => setContactModalOpen(true)}
              >
                Contact {user.firstName}
              </Button>
            }
          </Stack>
          <Stack spacing={2}>
            <Typography variant="h6">Roles</Typography>
            <Grid container spacing={1}>
              {user.roles.map((s, i) =>
                <Grid item key={i}>
                  <Chip label={s} />
                </Grid>
              )}
            </Grid>
          </Stack>
          <Stack spacing={2}>
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
      </Card>

      <UserContactModal
        user={user}
        open={contactModalOpen}
        toggle={toggleContactModal}
      />
    </>
  )
}

export default UserProfileSummary
