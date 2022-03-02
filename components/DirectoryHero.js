import { useState } from 'react'

import {
  Avatar,
  Box,
  Button,
  Grid,
  Typography,
  Modal,
  Divider
} from '@ui'
import EditProfile from '@components/EditProfile'

const DirectoryHero = ({ user, school }) => {
  const [editModalOpen, setEditModalOpen] = useState(false)
  const toggleEditModal = () => setEditModalOpen(!editModalOpen)
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
        <Grid item>
          <Button variant="outlined" onClick={() => setEditModalOpen(true)}>Edit profile</Button>
          <Modal
            open={editModalOpen}
            toggle={toggleEditModal}
            title="Edit Profile"
          ><EditProfile user={user} /></Modal>
        </Grid>
      </Grid>
      <Divider />
    </Box>
  )
}

export default DirectoryHero
