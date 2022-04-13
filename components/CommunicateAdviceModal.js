import { useState } from 'react'

import {
  Alert,
  Card,
  DatePicker,
  Grid,
  Stack,
  Checkbox,
  Typography,
  Modal,
  Button,
  TextField
} from '@ui'

const CommunicateAdviceModal = ({ open, toggle }) => {

  return (
    <Modal
      open={open}
      toggle={toggle}
      title="Make your decision"
    >
      <Stack spacing={2}>

        <Alert>You decided to proceed with this decision!</Alert>

        <Typography variant="h5">Write a message to others expressing your rationale for this decision.</Typography>
        <Typography>If you made adjustments to your decision along the way, summarize them here.</Typography>
        <TextField
          placeholder="e.g. it benefits my school..."
          id="outlined-multiline-flexible"
          label="I made this decision because..."
          multiline
        />


        <Grid container justifyContent="flex-end" spacing={4}>
          <Grid item>
            <Button onClick={toggle} variant="outlined">Cancel</Button>
          </Grid>
          <Grid item>
            <Button href="/advice/closed">Communicate your decision</Button>
          </Grid>
        </Grid>
      </Stack>
    </Modal>
  )
}

export default CommunicateAdviceModal
