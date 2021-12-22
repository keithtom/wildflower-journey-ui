import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'

import {
  MaxWidth,
  Button,
  Text,
  PageContainer,
  Grid,
  Container
} from '../components/ui'

const StyledImage = styled.img`
  max-height: ${({ theme }) => theme.util.buffer*12}px;
`;

export default function Home() {

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
              <Grid container flexDirection="column">

                <Grid item mb={24}>
                  <StyledImage src="/assets/wildflowers-logo.png" />
                </Grid>

                <Grid item mb={24} xs={8}>
                  <Grid container spacing={8}>
                    <Grid item>
                      <Text title headline bold>Welcome to the Wildflower Schools Platform!</Text>
                    </Grid>
                    <Grid item xs={9}>
                      <Text title small lightened>Level up your school, and get collaborating. Search for Teacher Leaders, Schools, and Skills!</Text>
                    </Grid>
                    <Grid item>
                      <Link href="/search">
                        <Button primary>Search the platform</Button>
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>

              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Container yellow>
                <Grid container>
                  <Grid item>
                    <Text title small bold>Latest updates</Text>
                  </Grid>
                </Grid>
              </Container>
            </Grid>

          </Grid>
        </MaxWidth>

      </PageContainer>
    </>
  )
}
