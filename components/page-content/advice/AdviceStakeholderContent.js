import AdviceSummary from '../../AdviceSummary'
import {
  Card,
  Grid,
  Stack,
  Typography
} from '@ui'

const AdviceStakeholderContent = () => {
  return (
    <Stack spacing={4}>
      <Grid container spacing={4} direction="row" justify="space-between">
        <Grid item xs={12} sm={9}>
          <Typography variant="h3">As a Stakeholder</Typography>
          <Typography variant="bodyLightened">When others ask for your feedback on an open decision they will appear here.</Typography>
        </Grid>
      </Grid>

      {advices.map((advice, i) =>
        <Card>
          <AdviceSummary
            key={i}
            status="open"
            content={advice.content}
            createdAt={advice.createdAt}
            location={advice.location}
            thoughtPartners={advice.thoughtPartners}
            deadline={advice.needAdviceBy}
          />
        </Card>
      )}
    </Stack>
  )
}

export default AdviceStakeholderContent

const advices = [
  {
    id: 21,
    content: "I am going to update the bookkeeping process at my school.",
    createdAt: "2022-03-19 05:01:47.589",
    updatedAt: "2022-04-02 05:01:47.589",
    location: 'Boston Montessori',
    needAdviceBy: "2022-04-20 05:01:47.589",
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
    location: 'Cambridge Montessori',
    needAdviceBy: "2022-04-05 05:01:47.589",
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
