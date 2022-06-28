import { useState } from 'react'

import AdviceSummary from '../../AdviceSummary'
import {
  Button,
  Grid,
  Stack,
  Typography,
  Card
} from '@ui'
import { NewDraftModal } from '@adviceModals'
import { ArrowForward } from '@mui/icons-material'

const AdviceDraftsContent = ({drafts}) => {
  const [newDraftOpen, setNewDraftOpen] = useState(false)

  return (
    <Stack spacing={4}>
      <Grid container spacing={4} direction="row" justify="space-between">
        <Grid item xs={12} sm={9}>
          <Typography variant="h3">Your drafts</Typography>
          <Typography variant="bodyLightened">Your home base to think through decisions before bringing them to your stakeholders for feedback.</Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          {/* WIL-128 */}
          <Button onClick={() => setNewDraftOpen(true)}>New draft</Button>
          <NewDraftModal
            open={newDraftOpen}
            toggle={() => setNewDraftOpen(!newDraftOpen)}
          />
        </Grid>
      </Grid>

      <Card>
        <Typography variant="overline">Helpful Tips</Typography>
        <Stack spacing={2}>
        {helpfulTips.map((t,i) =>
          <div><Grid key={i} container spacing={2} direction="row">
            <Grid item>
              <ArrowForward />
            </Grid>
            <Grid item xs="11">{t}</Grid>
          </Grid></div>
        )}
      </Stack>
      </Card>

      {drafts.map((draft, i) =>
        <Card>
          <AdviceSummary
            key={i}
            status="draft"
            adviceId={draft.id}
            content={draft.attributes.title}
            createdAt={draft.attributes.createdAt}
            stakeholders={draft.relationships.stakeholders.data}
          />
        </Card>
      )}
    </Stack>
  )
}

export default AdviceDraftsContent

const helpfulTips = [
  'Invite thought partners to a draft to gut-check your decision before sharing it.',
  'Use this space to shape your thinking. Create as many drafts as you would like to.'
]
