import {
  Avatar,
  Box,
  Grid,
  Typography,
  Divider
} from '@mui/material'

const DirectoryHero = ({ user, school }) => {
  return (
    <Box
      sx={{
        width: 1,
        paddingTop: 48,
        background: '#fafafa'
      }}
    >
      <Grid container p={8} alignItems="center" spacing={8}>
        {user ?
          <Grid item>
            <Avatar
              sx={{
                width: 64,
                height: 64
              }}
              src={user.profileImage}
            />
          </Grid>
        : null}
        <Grid item>
          <Typography variant="h3">{user ? `${user.firstName} ${user.lastName}` : school.name}</Typography>
        </Grid>
      </Grid>
      <Divider />
    </Box>
  )
}

export default DirectoryHero
