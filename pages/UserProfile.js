import Head from 'next/head'

import UserProfileCard from '../components/UserProfileCard'
import UserInfo from '../components/UserInfo'
import SchoolProfileCard from '../components/SchoolProfileCard'
import {
  MaxWidth,
  Container,
  Text,
  PageContainer,
  Grid,
  Tag
} from '../components/ui'

const UserProfile = ({}) => {
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

        <MaxWidth>

          <Grid container spacing={12}>

            <Grid item xs={12}>
              <UserProfileCard
                large
                user={user}
              />
            </Grid>

            <Grid item xs={12} md={5}>
              <Container>
                <Grid container spacing={6}>

                  <Grid item xs={12}>
                    <Grid container spacing={4}>
                      <Grid item>
                        <Text title small bold>About</Text>
                      </Grid>
                      <Grid item>
                        <Text body regular>Hi there! I decided to pursue being a teacher leader 3 years ago when my son needed to sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</Text>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container spacing={4}>
                      <Grid item>
                        <Text title small bold>Contact</Text>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={4}>
                          <Grid item xs={12}>
                            <Text body regular>{user.location}</Text>
                          </Grid>
                          <Grid item xs={12}>
                            <UserInfo
                              phoneNumber={user.phoneNumber}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  {user.skills ?
                    <Grid item xs={12}>
                      <Grid container spacing={4}>
                        <Grid item>
                          <Text title small bold>Skills</Text>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container spacing={2}>
                            {user.skills.map((s, i) =>
                              <Grid item key={i}>
                                <Tag body regular>{s}</Tag>
                              </Grid>
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  : null}

                </Grid>
              </Container>
            </Grid>

            <Grid item xs={12} md={7}>
              <Grid container mb={8}>
                <Grid item>
                  <Text title small bold>School</Text>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <SchoolProfileCard
                    small
                    schoolName="Brooklyn Heights Montessori"
                    subtitle="brooklynheightsmontessori.com"
                    address="93 Pierrepont Street, Brooklyn, NY 11201"
                  />
                </Grid>
              </Grid>
            </Grid>

          </Grid>

        </MaxWidth>

      </PageContainer>

    </>
  )
}

export default UserProfile

const user = {
  name: 'Maya Walley',
  badge: 'Teacher Leader',
  profileImage: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80',
  phoneNumber: '(917) 123-4567',
  location: 'New York City',
  skills: [
    'Finance',
    'Home Schooling',
    'Real Estate'
  ]
}
