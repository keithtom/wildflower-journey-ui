import Link from 'next/link'

import AdviceSummary from '../../AdviceSummary'
import {
  Card,
  Grid,
  Stack,
  Typography
} from '@ui'

const AdviceOpenContent = () => {

  return (
    <Stack spacing={4}>
      <Grid container spacing={4} direction="row" justify="space-between">
        <Grid item xs={12} sm={9}>
          <Typography variant="h3">Your open advice</Typography>
          <Typography variant="bodyLightened">Your open advice processes which stakeholders are giving advice on.</Typography>
        </Grid>
      </Grid>

      {advices.map((advice, i) =>
        <Link href="/advice/demo/14-1">
          <Card sx={{'&:hover': { cursor: 'pointer'}}}>
            <AdviceSummary
              key={i}
              status="open"
              content={advice.content}
              createdAt={advice.createdAt}
              thoughtPartners={advice.thoughtPartners}
            />
          </Card>
        </Link>
      )}
    </Stack>
  )
}

export default AdviceOpenContent

const advices = [
  {
    id: 13,
    content: "I am going to introduce healthier lunches at my school.",
    createdAt: "2022-04-12 05:01:47.589",
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
    content: "I am going to hire an administrative assistant at my school.",
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
