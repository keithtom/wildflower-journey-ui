import { useState } from 'react'
import {
  Grid,
  Stack,
  Typography,
  Button,
  Modal
} from '@ui'
import ProfileHero from '@components/ProfileHero'
import UserProfileSummary from '@components/UserProfileSummary'
import SchoolResultItem from '@components/SchoolResultItem'
import EditUserProfile from '@components/EditUserProfile'
import { user } from '@lib/utils/fake-data'

const UserProfileContent = () => {
  return (
    <>
      <ProfileHero
        profileImage={user.profileImage}
        name={`${user.firstName} ${user.lastName}`}
        action={<UserAction user={user} />}
      />

      <Grid container p={8} spacing={8}>
        <Grid item xs={12} sm={4}>
          <UserProfileSummary user={user} />
        </Grid>

        <Grid item xs={12} sm={8}>
          <Stack spacing={4}>
            <Typography variant="h6">School</Typography>
            <Stack spacing={2}>
              <SchoolResultItem school={user.school} />
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </>
  )
}

export default UserProfileContent

const UserAction = ({ user }) => {
  const [editModalOpen, setEditModalOpen] = useState(false)
  const toggleEditModal = () => setEditModalOpen(!editModalOpen)
  return (
    <>
      <Button variant="outlined" onClick={() => setEditModalOpen(true)}>Edit profile</Button>
      <Modal
        open={editModalOpen}
        toggle={toggleEditModal}
        title="Edit Profile"
      >
        <EditUserProfile user={user} toggle={toggleEditModal} />
      </Modal>
    </>
  )
}