import { useState } from 'react'

import {
  Grid,
  Card,
  CardContent,
  Stack,
  Typography,
  Chip,
  Button
} from '@mui/material'
import UserContactModal from '../components/UserContactModal'

const UserProfileSummary = ({ user }) => {
  const [contactModalOpen, setContactModalOpen] = useState(false)

  return (
    <>
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

      <UserContactModal
        user={user}
        open={contactModalOpen}
        toggle={() => setContactModalOpen(!contactModalOpen)}
      />
    </>
  )
}

export default UserProfileSummary
