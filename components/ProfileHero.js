import { useState } from 'react'

import {
  Avatar,
  Box,
  Grid,
  Typography,
  Divider
} from '@ui'

const ProfileHero = ({ profileImage, name, action  }) => {
  return (
    <Box
      sx={{
        width: 1,
        paddingTop: 48,
        background: '#fafafa'
      }}
    >
      <Grid container p={8} alignItems="center" spacing={8}>
        {profileImage && <Grid item>
          <Avatar
            sx={{
              width: 64,
              height: 64
            }}
            src={profileImage}
          />
        </Grid>}
        <Grid item>
          <Typography variant="h3">{name}</Typography>
        </Grid>
        {action && <Grid item>
          {action}
        </Grid>}
      </Grid>
      <Divider />
    </Box>
  )
}

export default ProfileHero
