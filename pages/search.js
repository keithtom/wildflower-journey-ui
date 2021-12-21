import Head from 'next/head'

import SchoolProfileCard from '../components/SchoolProfileCard'
import {
  MaxWidth,
  Container,
  Text,
  PageContainer,
  Grid,
  Input,
  Select
} from '../components/ui'

const SearchPage = ({}) => {
  return (
    <>
      <Head>
        <title>Wildflower Schools Directory | Search</title>
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
              <Input
                placeholder="Search for something..."
              />
            </Grid>

            <Grid item xs={12} md={5}>
              <Container>
                <Grid container spacing={6}>

                  <Grid item>
                    <Grid container spacing={6}>
                      <Grid item xs={12}>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <Text title small bold>Filter</Text>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid item xs={12}>
                            <Select
                              radio
                              label="Schools"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Select
                              radio
                              label="Teacher Leaders"
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Grid container spacing={6}>
                      <Grid item xs={12}>
                        <Text title small bold>Skills</Text>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid item xs={12}>
                            <Select
                              checkbox
                              label="Finance"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Select
                              checkbox
                              label="Home Schooling"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Select
                              checkbox
                              label="Real Estate"
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Grid container spacing={6}>
                      <Grid item xs={12}>
                        <Text title small bold>Ages</Text>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid item xs={12}>
                            <Select
                              checkbox
                              label="Toddler"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Select
                              checkbox
                              label="Primary"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Select
                              checkbox
                              label="Elementary"
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                </Grid>
              </Container>
            </Grid>

            <Grid item xs={12} md={7}>
              <Grid container mb={8}>
                <Grid item>
                  <Text title small bold>3 Results</Text>
                </Grid>
              </Grid>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <SchoolProfileCard
                    small
                    schoolName="Brooklyn Heights Montessori"
                    subtitle="brooklynheightsmontessori.com"
                    address="93 Pierrepont Street, Brooklyn, NY 11201"
                  />
                </Grid>
                <Grid item xs={12}>
                  <SchoolProfileCard
                    small
                    schoolName="Brooklyn Heights Montessori"
                    subtitle="brooklynheightsmontessori.com"
                    address="93 Pierrepont Street, Brooklyn, NY 11201"
                  />
                </Grid>
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

export default SearchPage
