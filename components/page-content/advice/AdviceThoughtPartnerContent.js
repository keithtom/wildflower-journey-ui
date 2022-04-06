import AdviceSummary from './AdviceSummary'
import {
  Grid,
  Stack,
  Typography
} from '@ui'

const AdviceThoughtPartnerContent = () => {
  return (
    <Stack spacing={4}>
      <Grid container spacing={4} direction="row" justify="space-between">
        <Grid item xs={12} sm={9}>
          <Typography variant="h3">As a Thought Partner</Typography>
          <Typography variant="bodyLightened">When others ask for your input on a decision draft they will appear here.</Typography>
        </Grid>
      </Grid>

      {advices.map((advice, i) => 
        <AdviceSummary
          key={i}
          status="draft"
          content={advice.content}
          createdAt={advice.createdAt}
          location={advice.location}
          thoughtPartners={advice.thoughtPartners}
        />
      )}
    </Stack>
  )
}

export default AdviceThoughtPartnerContent

const advices = [
  {
    id: 21,
    content: "I am going to update the bookkeeping process at my school.",
    createdAt: "2022-03-14 05:01:47.589",
    updatedAt: "2022-03-28 05:01:47.589",
    location: 'Boston Montessori',
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
