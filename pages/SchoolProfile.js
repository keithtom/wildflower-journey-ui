import Head from 'next/head'

import UserInfo from '../components/UserInfo'
import SchoolProfileCard from '../components/SchoolProfileCard'
import {
  MaxWidth,
  Container,
  Text,
  PageContainer,
  Grid
} from '../components/ui'

const SchoolProfile = () => {
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
              <SchoolProfileCard
                large
                schoolName="Brooklyn Heights Montessori"
                subtitle="brooklynheightsmontessori.com"
                address="93 Pierrepont Street, Brooklyn, NY 11201"
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
                        <Text body regular>Brooklyn Heights Montessori is a welcoming and supportive community of passionate parents who sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</Text>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container spacing={2}>

                      {schoolDetails.attributes.map((s, i) =>
                        <Grid item xs={12} key={i}>
                          <Grid container>
                            <Grid item xs={6}>
                              <Text body small bold>{s.title}</Text>
                            </Grid>
                            <Grid item xs={6}>
                              <Text body small lightened>{s.value}</Text>
                            </Grid>
                          </Grid>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container spacing={4}>
                      <Grid item>
                        <Text title small bold>Contact</Text>
                      </Grid>
                      <Grid item xs={12}>
                        <UserInfo
                          name={schoolDetails.contactMember.name}
                          badge={schoolDetails.contactMember.badge}
                          profileImage={schoolDetails.contactMember.profileImage}
                          phoneNumber={schoolDetails.contactMember.phoneNumber}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                </Grid>
              </Container>
            </Grid>

            <Grid item xs={12} md={7}>
              <Grid container mb={8}>
                <Grid item>
                  <Text title small bold>{members.length} Members</Text>
                </Grid>
              </Grid>
              <Grid container spacing={4}>
                {members.map((m, i) =>
                  <Grid item xs={12} key={i}>
                    <Container full>
                      <UserInfo
                        name={m.name}
                        badge={m.badge}
                        profileImage={m.profileImage}
                      />
                    </Container>
                  </Grid>
                )}
              </Grid>
            </Grid>

          </Grid>

        </MaxWidth>

      </PageContainer>

    </>
  )
}

export default SchoolProfile

const schoolDetails = {
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
    name: 'Maya Walley',
    badge: 'Teacher Leader',
    profileImage: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80',
    phoneNumber: '(917) 123-4567'
  }
}

const members = [
  {
    name: 'Joey Aaronson',
    badge: 'Teacher Leader',
    profileImage: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80'
  },
  {
    name: 'Michael Davidson',
    badge: 'Teacher Leader',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3000&q=80'
  },
  {
    name: 'Sara Piper',
    badge: 'Teacher Leader',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80'
  },
  {
    name: 'Johnathan Wang',
    badge: 'Member',
    profileImage: 'https://images.unsplash.com/photo-1487309078313-fad80c3ec1e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1635&q=80'
  },
  {
    name: 'Kimberly St.Cloud',
    badge: 'Member',
    profileImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80'
  },
]
