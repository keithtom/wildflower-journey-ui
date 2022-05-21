import {useRouter} from 'next/router'
import Link from 'next/link'

import { handleTimeUntil, handleTimeSince } from '@lib/utils/usefulHandlers'
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
  LocationOn,
  AccessTime
} from '@mui/icons-material'

const AdviceSummary = ({
  adviceId,
  status,
  location,
  content,
  createdAt,
  deadline,
  stakeholders,
  ...rest
}) => {
  const adviceStatus = (status === 'draft') ? 'Draft' : (status === 'open') ? 'Open' : 'Closed'
  const action = (status === 'draft') ? 'drafted' : (status === 'open') ? 'opened' : 'closed'

  const router = useRouter()

  return (
    <Link href={`${router.asPath }/${adviceId}`}>
      <Stack spacing={2} {...rest}>
        <Grid container spacing={2} justifyContent="space-between" alignItems="center">
          <Grid item>
            <Grid container spacing={2} alignItems="center">
              <Grid item><Chip label={adviceStatus} /></Grid>
              { (deadline && status !== 'draft') && <Grid item><DeadlineCounter deadline={deadline} /></Grid> }
            </Grid>
          </Grid>
          {location && <Grid item>
            <Grid container spacing={1}>
              <Grid item><LocationOn fontSize="small" color="neutral"  /></Grid>
              <Grid item><Typography variant="bodyLightened">{location}</Typography></Grid>
            </Grid>
          </Grid>}
        </Grid>
        <Typography variant="h4">{content}</Typography>
        <div><Grid container spacing={4} alignItems="center">
          <Grid item>You {action} this {handleTimeUntil(createdAt)}</Grid>
          <Grid item><Divider orientation="vertical" flexItem style={{ height: 20 }} /></Grid>
          {stakeholders &&
            <Grid item>
              <Grid container spacing={1} alignItems="center">
                <Grid item>
                  <AvatarGroup sm total={stakeholders.length}>{stakeholders.map((tp, i) =>
                    <Avatar alt={`${tp.firstName} ${tp.lastName}`} src={tp.avatar} />
                  )}</AvatarGroup>
                </Grid>
                <Grid item>{stakeholders.length} stakeholders</Grid>
              </Grid>
            </Grid>
          }
        </Grid></div>
      </Stack>
    </Link>
  )
}

export default AdviceSummary

const DeadlineCounter = ({ deadline }) => {
  return (
    <Grid container spacing={1}>
      <Grid item><AccessTime fontSize="small" color="neutral" /></Grid>
      <Grid item><Typography variant="bodyLightened">{handleTimeSince(deadline)} remaining to give feedback</Typography></Grid>
    </Grid>
  )
}
