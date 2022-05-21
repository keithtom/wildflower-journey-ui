import AdviceSummary from '../../AdviceSummary'
import {
  Card,
  Grid,
  Stack,
  Typography
} from '@ui'

const AdviceOpenContent = ({ openAdvice }) => {

  return (
    <Stack spacing={4}>
      <Grid container spacing={4} direction="row" justify="space-between">
        <Grid item xs={12} sm={9}>
          <Typography variant="h3">Your open advice</Typography>
          <Typography variant="bodyLightened">Your open advice processes which stakeholders are giving advice on.</Typography>
        </Grid>
      </Grid>

      {openAdvice.map((advice, i) =>
        <Card>
          <AdviceSummary
            key={i}
            status="open"
            adviceId={advice.id}
            content={advice.attributes.title}
            createdAt={advice.attributes.createdAt}
            thoughtPartners={advice.relationships.stakeholders.data}
          />
        </Card>
      )}
    </Stack>
  )
}

export default AdviceOpenContent
