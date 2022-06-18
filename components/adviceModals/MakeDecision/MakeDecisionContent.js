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
  Checkbox,
  DatePicker
} from '@ui'
import {
  Check,
  Close
 } from '@mui/icons-material'

const MakeDecisionContent = ({ toggle }) => {
  const [whyDecisionMade, setWhyDecisionMade] = useState('')
  const handleWhyDecisionMadeChange = (event) => {
    setWhyDecisionMade(event.target.value)
  }
  const [decisionChanges, setDecisionChanges] = useState('')
  const handleDecisionChangesChange = (event) => {
    setDecisionChanges(event.target.value)
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
                <Typography variant="body1">Summarize why you made the decision you did. Your advice givers will be notified of your decision.</Typography>
                <TextField
                  fullWidth
                  label="I made this decision because..."
                  placeholder="Type something..."
                  value={whyDecisionMade}
                  onChange={handleWhyDecisionMadeChange}
                />
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Stack spacing={2}>
                <Typography variant="body1">Were there any changes to your decision along the way?</Typography>
                <TextField
                  fullWidth
                  label="There were changes to my decision such as..."
                  placeholder="Type something..."
                  value={decisionChanges}
                  onChange={handleDecisionChangesChange}
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
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <Button variant="outlined" fullWidth onClick={toggle}>Decide not to proceed</Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button fullWidth onClick={toggle}>Decide to proceed</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

      </form>

    </div>
  )
}

export default MakeDecisionContent
