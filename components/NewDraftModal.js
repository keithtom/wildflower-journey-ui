import { useState } from 'react'

import {
  Card,
  Grid,
  Stack,
  Checkbox,
  Typography,
  Modal,
  Button,
  TextField
} from '@ui'

const NewDraftModal = ({ open, toggle }) => {
  const [decision, setDecision] = useState('')
  return (
    <Modal
      open={open}
      toggle={toggle}
      title="New draft"
    >
      <Stack spacing={2}>
        <Typography>Complete the sentence</Typography>
        <TextField
          id="outlined-multiline-flexible"
          label="I am going to..."
          placeholder="e.g. introduce healthier lunches at my school."
          multiline
          maxRows={4}
          inputProps={{ maxLength: 140 }}
          value={decision}
          onChange={(e) => setDecision(e.target.value)}
          charCount={decision.length}
          charLimit={140}
        />

        <Typography variant="bodyLightened">Consider whether you have the authority in your role to decide:</Typography>
        <Grid container spacing={1} alignItems="center" direction="row">
          <Grid item><Checkbox /></Grid>
          <Grid item><Typography>I believe I have the authority to make this decision</Typography></Grid>
        </Grid>

        <Button href="/advice/14">Create decision draft</Button>
      </Stack>
    </Modal>
  )
}

export default NewDraftModal
