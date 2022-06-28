import { useState } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel';

import {
  Box,
  Grid,
  TextField,
  Select,
  MultiSelect,
  Button,
  Card,
  Typography,
  Stack,
  Switch,
  Checkbox
} from '@ui'

const NewDraftContent = ({ toggle }) => {
  const [decisionTitle, setDecisionTitle] = useState('')
  const handleDecisionTitleChange = (event) => {
    setDecisionTitle(event.target.value)
  }
  const [authorRole, setAuthorRole] = useState('')
  const handleAuthorRoleChange = (event) => {
    setAuthorRole(event.target.value)
  }
  const [hasAuthority, setHasAuthority] = useState(false)
  const handleHasAuthorityChange = (event) => {
    setHasAuthority(true)
  }

  return (
    <div>

      <form>

      <Grid container spacing={4}>

        <Grid item xs={12}>
          <Stack spacing={2}>
            <Typography variant="body1">Title your decision by completing the sentence</Typography>
            <TextField
              fullWidth
              label="I am going to..."
              placeholder="Introduce healthier school lunches at my school..."
              value={decisionTitle}
              onChange={handleDecisionTitleChange}
              charCount={decisionTitle.length}
              charLimit={140}
            />
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack spacing={2}>
            <Typography variant="body1">In what role are you making this decision?</Typography>
            <TextField
              fullWidth
              label="Your role"
              placeholder="e.g. Teacher Leader, Finance Lead, etc."
              value={authorRole}
              onChange={handleAuthorRoleChange}
            />
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack spacing={2}>
            <Typography variant="body1">Consider whether you have the authority in your role to decide</Typography>
            <FormControlLabel control={<Checkbox checked={hasAuthority} onChange={handleHasAuthorityChange} />} label="I believe I have the authority to decide"/>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          {/* WIL-128 */}
          <Button fullWidth onClick={toggle}>Create your decision draft</Button>
        </Grid>

      </Grid>

      </form>

    </div>
  )
}

export default NewDraftContent
