import AdviceSummary from './AdviceSummary'
import {
  Button,
  Grid,
  Stack,
  Typography,
  Card
} from '@ui'
import { ArrowForward } from '@mui/icons-material'

const AdviceDraftsContent = () => {
  return (
    <Stack spacing={4}>
      <Grid container spacing={4} direction="row" justify="space-between">
        <Grid item xs={12} sm={9}>
          <Typography variant="h3">Your drafts</Typography>
          <Typography variant="bodyLightened">Your home base to think through decisions before bringing them to your stakeholders for feedback.</Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button>New draft</Button>
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
        <AdviceSummary
          key={i}
          status="draft"
          content={draft.content}
          createdAt={draft.createdAt}
          thoughtPartners={draft.thoughtPartners}
        />
      )}
    </Stack>
  )
}

export default AdviceDraftsContent

const drafts = [
  {
    id: 21,
    content: "I am going to update the bookkeeping process at my school.",
    createdAt: "2022-03-14 05:01:47.589",
    updatedAt: "2022-03-28 05:01:47.589",
    thoughtPartners: [
      {
        firstName: "Keith",
        lastName: "Tom",
        avatar: "https://avatars.githubusercontent.com/u/12635?v=4"
      },
      {
        firstName: "Taylor",
        lastName: "Zanke",
        avatar: "https://avatars.githubusercontent.com/u/1396123?v=4"
      }
    ]
  },
  {
    id: 21,
    content: "I am going to update the bookkeeping process at my school.",
    createdAt: "2022-04-05 05:01:47.589",
    updatedAt: "2022-03-28 05:01:47.589",
    thoughtPartners: [
      {
        firstName: "Keith",
        lastName: "Tom",
        avatar: "https://avatars.githubusercontent.com/u/12635?v=4"
      },
      {
        firstName: "Taylor",
        lastName: "Zanke",
        avatar: "https://avatars.githubusercontent.com/u/1396123?v=4"
      },
      {
        firstName: "Keith",
        lastName: "Tom",
        avatar: "https://avatars.githubusercontent.com/u/12635?v=4"
      },
      {
        firstName: "Taylor",
        lastName: "Zanke",
        avatar: "https://avatars.githubusercontent.com/u/1396123?v=4"
      },
      {
        firstName: "Keith",
        lastName: "Tom",
        avatar: "https://avatars.githubusercontent.com/u/12635?v=4"
      },
      {
        firstName: "Taylor",
        lastName: "Zanke",
        avatar: "https://avatars.githubusercontent.com/u/1396123?v=4"
      },
      {
        firstName: "Keith",
        lastName: "Tom",
        avatar: "https://avatars.githubusercontent.com/u/12635?v=4"
      },
      {
        firstName: "Taylor",
        lastName: "Zanke",
        avatar: "https://avatars.githubusercontent.com/u/1396123?v=4"
      },
    ]
  }
]

const helpfulTips = [
  'Invite thought partners to a draft to gut-check your decision before sharing it.',
  'Use this space to shape your thinking. Create as many drafts as you would like to.'
]