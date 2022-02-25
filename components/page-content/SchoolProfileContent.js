import {
  schoolDetails,
  people
} from '@lib/utils/fake-data'
import{
  Grid,
  Stack,
  Typography
} from '@ui'
import DirectoryHero from '@components/DirectoryHero'
import SchoolProfileSummary from '@components/SchoolProfileSummary'
import UserResultItem from '@components/UserResultItem'

const SchoolProfileContent = () => {
  return (
    <>
      <DirectoryHero
        school={schoolDetails}
      />

      <Grid container p={8} spacing={8}>
        <Grid item xs={12} sm={4}>
          <SchoolProfileSummary school={schoolDetails} />
        </Grid>

        <Grid item xs={12} sm={8}>
          <Stack spacing={3}>
            <Typography variant="h6">{people.length} Members</Typography>
            <Stack spacing={1}>
              {people.map((p, i) =>
                <UserResultItem user={p} key={i} />
              )}
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </>
  )
}

export default SchoolProfileContent