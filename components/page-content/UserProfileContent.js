import {
  Grid,
  Stack,
  Typography
} from '@mui/material'
import DirectoryHero from '@components/DirectoryHero'
import UserProfileSummary from '@components/UserProfileSummary'
import SchoolResultItem from '@components/SchoolResultItem'
import { user } from '@lib/utils/fake-data'

const UserProfileContent = () => {
  return (
    <>
      <DirectoryHero
        user={user}
      />

      <Grid container p={8} spacing={8}>
        <Grid item xs={12} sm={4}>
          <UserProfileSummary user={user} />
        </Grid>

        <Grid item xs={12} sm={8}>
          <Stack spacing={3}>
            <Typography variant="h6">School</Typography>
            <Stack spacing={1}>
              <SchoolResultItem schoolName={user.school.attributes.name} />
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </>
  )
}

export default UserProfileContent