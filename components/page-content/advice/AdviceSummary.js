import {
  Avatar,
  AvatarGroup,
  Divider,
  Grid,
  Stack,
  Typography,
  Card,
  Chip
} from '@ui'
import {
  LocationOn
} from '@mui/icons-material'

const AdviceSummary = ({
  status,
  location,
  content,
  createdAt,
  thoughtPartners,
  ...rest
}) => {
  const adviceStatus = (status === 'draft') ? 'Draft' : (status === 'open') ? 'Open' : 'Closed'
  const action = (status === 'draft') ? 'drafted' : (status === 'open') ? 'opened' : 'closed'

  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const today = new Date();
  const createdDate = new Date(createdAt);
  const daysAgo = Math.round(Math.abs((today - createdDate) / oneDay));
  const createdDaysAgo = (daysAgo > 1) ? `${daysAgo} days ago` : (daysAgo === 1) ? `yesterday` : `today`

  return (
    <Card {...rest}>
      <Stack spacing={2}>
        <Grid container spacing={2} justifyContent="space-between" alignItems="center">
          <Grid item><Chip label={adviceStatus} /></Grid>
          {location && <Grid item>
            <Grid container spacing={1}>
              <Grid item><LocationOn fontSize="small" color="neutral"  /></Grid>
              <Grid item><Typography variant="bodyLightened">{location}</Typography></Grid>
            </Grid>
          </Grid>}
        </Grid>
        <Typography variant="h4">{content}</Typography>
        <div><Grid container spacing={4} alignItems="center">
          <Grid item>You {action} this {createdDaysAgo}</Grid>
          <Grid item><Divider orientation="vertical" flexItem style={{ height: 20 }} /></Grid>
          <Grid item>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <AvatarGroup sm total={thoughtPartners.length}>{thoughtPartners.map((tp, i) =>
                  <Avatar alt={`${tp.firstName} ${tp.lastName}`} src={tp.avatar} />
                )}</AvatarGroup> 
              </Grid>
              <Grid item>{thoughtPartners.length} thought partners</Grid>
            </Grid>
          </Grid>
        </Grid></div>
      </Stack>
    </Card>
  )
}

export default AdviceSummary