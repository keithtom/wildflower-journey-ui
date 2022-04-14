import { useState } from 'react'

import {
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

const RequestAdviceModal = ({ open, toggle }) => {

  return (
    <Modal
      open={open}
      toggle={toggle}
      title="Request advice"
    >
      <Stack spacing={2}>
        <Typography>When do you need to decide by?</Typography>
        <DatePicker
          label="Decision due date"
        />

        <Typography variant="bodyLightened">Consider whether you have the authority in your role to decide:</Typography>
        <Grid container spacing={1} alignItems="center" direction="row">
          <Grid item><Checkbox /></Grid>
          <Grid item><Typography>I believe I have the authority to make this decision</Typography></Grid>
        </Grid>

        <Grid container justifyContent="flex-end" spacing={4}>
          <Grid item>
            <Button onClick={toggle} variant="outlined">cancel</Button>
          </Grid>
          <Grid item>
            <Button href="/advice/open">Open and request advice</Button>
          </Grid>
        </Grid>
      </Stack>
    </Modal>
  )
}

export default RequestAdviceModal
