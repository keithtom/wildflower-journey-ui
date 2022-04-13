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

const DecideAdviceModal = ({ open, toggle }) => {

  return (
    <Modal
      open={open}
      toggle={toggle}
      title="Make your decision"
    >
      <Stack spacing={2}>
        <Grid container justifyContent="flex-end" spacing={4}>
          <Grid item>
            <Button onClick={toggle} variant="outlined">Decide to not proceed</Button>
          </Grid>
          <Grid item>
            <Button href="/advice/demo/14-2">Decide to proceed</Button>
          </Grid>
        </Grid>
      </Stack>
    </Modal>
  )
}

export default DecideAdviceModal
