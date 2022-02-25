import Head from 'next/head'

import {
  Grid,
  Stack,
  Typography,
} from '@mui/material'

import PageContainer from '../components/ui/PageContainer'
import DirectoryHero from '../components/DirectoryHero'
import SchoolProfileSummary from '../components/SchoolProfileSummary'
import UserResultItem from '../components/UserResultItem'

const SchoolProfile = ({}) => {

  return (
    <>
      <Head>
        <title>Wildflower Schools Directory | School Profile</title>
        <meta name="title" content="Wildflower Schools Directory" />
        <meta property="og:site_name" content="Wildflower Schools Directory" key="og_wf_site_name" />
        <meta name="description" content="Wildflower Schools Directory" />
        <meta name="keywords" content="Wildflower, Schools, Directory, Montessori" />
        <meta property="og:title" content="Wildflower Schools Directory" key="og_wf_site_title" />
        <meta property="og:description" content="Wildflower Schools Directory" key="og_wf_site_description" />
      </Head>

      <PageContainer>

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

      </PageContainer>

    </>
  )
}

export default SchoolProfile

const schoolDetails = {
  name: 'Brooklyn Heights Montessori',
  description: 'Brooklyn Heights Montessori is a welcoming and supportive community of passionate parents who sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
  attributes: [
    {
      title: 'Governance',
      value: 'Independent'
    },
    {
      title: 'Tuition Assistance',
      value: 'Voucher'
    },
    {
      title: 'Age Level',
      value: 'Primary'
    },
    {
      title: 'Calendar',
      value: '10 Months'
    },
    {
      title: 'Max. Enrollment',
      value: '12 Students'
    }
  ],
  contactMember: {
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
    bio: 'Hi there! I decided to pursue being a teacher leader 3 years ago when my son needed to sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. '
  }
}

const people = [{"id":"2601-8f69","type":"person","attributes":{"email":"noel_trantow@homenick.net","firstName":"Jaimee","lastName":"Gleichner","phone":null},"relationships":{"schools":{"data":[]},"roles":{"data":[]},"skills":{"data":[]},"experiences":{"data":[]},"address":{"data":null}}},{"id":"9acf-aef7","type":"person","attributes":{"email":"georgina_grant@schumm.info","firstName":"Pete","lastName":"Stiedemann","phone":null},"relationships":{"schools":{"data":[]},"roles":{"data":[]},"skills":{"data":[]},"experiences":{"data":[]},"address":{"data":null}}},{"id":"490f-89d5","type":"person","attributes":{"email":"robt@ledner.net","firstName":"Flossie","lastName":"Bashirian","phone":null},"relationships":{"schools":{"data":[]},"roles":{"data":[]},"skills":{"data":[]},"experiences":{"data":[]},"address":{"data":null}}},{"id":"4864-6bf1","type":"person","attributes":{"email":"dorsey.hand@fay-pfannerstill.net","firstName":"June","lastName":"Hegmann","phone":null},"relationships":{"schools":{"data":[{"id":"1","type":"school"}]},"roles":{"data":[{"id":"1","type":"role"}]},"skills":{"data":[{"id":"1","type":"skill"},{"id":"2","type":"skill"}]},"experiences":{"data":[{"id":"1","type":"experience"}]},"address":{"data":{"id":"3","type":"address"}}}},{"id":"2b1f-190a","type":"person","attributes":{"email":"hoyt@ortiz.org","firstName":"Phil","lastName":"Batz","phone":null},"relationships":{"schools":{"data":[]},"roles":{"data":[{"id":"2","type":"role"}]},"skills":{"data":[{"id":"3","type":"skill"}]},"experiences":{"data":[]},"address":{"data":null}}},{"id":"9d7e-32ec","type":"person","attributes":{"email":"laurinda_lockman@spencer-hickle.io","firstName":"Barney","lastName":"Wunsch","phone":null},"relationships":{"schools":{"data":[]},"roles":{"data":[]},"skills":{"data":[]},"experiences":{"data":[]},"address":{"data":null}}}]
