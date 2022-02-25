import Head from 'next/head'

import {
  Grid,
  Stack,
  Typography
} from '@mui/material'

import PageContainer from '../components/ui/PageContainer'
import DirectoryHero from '../components/DirectoryHero'
import UserProfileSummary from '../components/UserProfileSummary'
import SchoolResultItem from '../components/SchoolResultItem'

const UserProfile = ({}) => {

  return (
    <>
      <Head>
        <title>Wildflower Schools Directory | User Profile</title>
        <meta name="title" content="Wildflower Schools Directory" />
        <meta property="og:site_name" content="Wildflower Schools Directory" key="og_wf_site_name" />
        <meta name="description" content="Wildflower Schools Directory" />
        <meta name="keywords" content="Wildflower, Schools, Directory, Montessori" />
        <meta property="og:title" content="Wildflower Schools Directory" key="og_wf_site_title" />
        <meta property="og:description" content="Wildflower Schools Directory" key="og_wf_site_description" />
      </Head>

      <PageContainer>

        <DirectoryHero
          user={user}
        />

        <Grid container p={3} spacing={3}>
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

      </PageContainer>
    </>
  )
}

export default UserProfile

const user = {
  email: "laurinda_lockman@spencer-hickle.io",
  firstName: "Maya",
  lastName: "Walley",
  profileImage: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80',
  phoneNumber: '(917) 123-4567',
  location: 'New York City',
  skills: [
    'Finance',
    'Home Schooling',
    'Real Estate'
  ],
  bio: 'Hi there! I decided to pursue being a teacher leader 3 years ago when my son needed to sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. ',
  school: {"id":"6362-514b","type":"school","attributes":{"name":"Brookville Primary School","shortName":null,"website":"satterfield.biz","phone":"391.483.9249 x45663","email":"nubia.ernser@waelchi.com","governanceType":"Charter","tuitionAssistanceType":"County Childcare Assistance Programs","agesServed":"Infants","calendar":"10 month","maxEnrollment":11,"facebook":null,"instagram":null},"relationships":{"address":{"data":{"id":"1","type":"address"}}}}
}
