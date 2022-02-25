import {
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
} from '@mui/material'
import {
  Chip
} from '@ui'

const UserResultItem = ({ user }) => {
  return (
    <Card>
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Avatar sx={{
                  width: 32,
                  height: 32
                }} />
              </Grid>
              <Grid item>
                <Typography>{user.attributes.firstName} {user.attributes.lastName}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Chip label="Finance" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default UserResultItem
