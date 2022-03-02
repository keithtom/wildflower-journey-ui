import {
  Grid,
  Card,
  Typography,
  Divider
} from '@ui'

const SchoolResultItem = ({ school }) => {
  const hasAddressInfo = (school.relationships.address.street && school.relationships.address.city && school.relationships.address.state)
  return (
    <Card>
      <Grid container mb={2} justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">{school.attributes.name}</Typography>
          <Typography>{school.attributes.website}</Typography>
          {hasAddressInfo && <Typography variant="bodyLightened">{school.relationships.address.street}, {school.relationships.address.city}, {school.relationships.address.state}</Typography>}
        </Grid>
        <Grid item>
          <Grid container alignItems="flex-end" flexDirection="column">
            <Grid item>
              <Typography>{school.attributes.phone}</Typography>
            </Grid>
            <Grid item>
              <Typography>{school.attributes.email}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Divider />

      <Grid container mt={1} spacing={4}>
        <Grid item>
          <Typography variant="subtitle2">Governance</Typography>
          <Typography variant="bodyLightened">{school.attributes.governanceType}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle2">Tuition Assistance</Typography>
          <Typography variant="bodyLightened">{school.attributes.tuitionAssistanceType}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle2">Age Level</Typography>
          <Typography variant="bodyLightened">{school.attributes.agesServed}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle2">Calendar</Typography>
          <Typography variant="bodyLightened">{school.attributes.calendar}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle2">Max Enrollment</Typography>
          <Typography variant="bodyLightened">{school.attributes.maxEnrollment}</Typography>
        </Grid>
      </Grid>
    </Card>
  )
}

export default SchoolResultItem
