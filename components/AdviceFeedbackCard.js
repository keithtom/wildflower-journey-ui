import { useState } from 'react'

import {
  PageContainer,
  Grid,
  Stack,
  Divider,
  Card,
  Typography,
  Button,
  Modal
} from '@ui'
import {
  ArrowForwardIos
} from '@mui/icons-material'

const AdviceFeedbackCard = ({ feedbackStatus }) => {
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false)

  return (
    <>
      <Card onClick={() => setFeedbackModalOpen(true)} sx={{ '&:hover': {cursor: 'pointer'}}}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Grid container spacing={4}>
              <Grid item>
                <Stack spacing={2}>
                  <Typography variant="caption">FEEDBACK STATUS</Typography>
                  <Typography variant="h5">{feedbackStatus}</Typography>
                </Stack>
              </Grid>
              <Grid item>
                <Stack spacing={2}>
                  <Typography variant="caption">POSTED</Typography>
                  <Typography variant="h5">Just now</Typography>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <ArrowForwardIos fontSize="small" />
          </Grid>
        </Grid>
      </Card>

      <Modal
        open={feedbackModalOpen}
        toggle={() => setFeedbackModalOpen(!feedbackModalOpen)}
        title="Feedback from Molly Brown"
      >
        <Typography variant="h5">Activity</Typography>
        <Card>
          <Stack spacing={2}>
            <Typography>I was considering how much you’ll need to dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
            <Stack direction="row" spacing={2}>
              <Typography variant="bodyLightened">Molly Brown posted</Typography>
              <Typography variant="body">just now</Typography>
            </Stack>
          </Stack>
        </Card>
        <Grid container justifyContent="center">
          <Grid item>
            <Divider orientation="vertical" sx={{height: '24px'}} />
          </Grid>
        </Grid>
        <Card>
          <Stack spacing={2}>
            <Typography>Feedback requested</Typography>
            <Stack direction="row" spacing={2}>
              <Typography variant="bodyLightened">You</Typography>
              <Typography variant="body">2 weeks ago</Typography>
            </Stack>
          </Stack>
        </Card>
      </Modal>
    </>
  )
}

export default AdviceFeedbackCard
