import Head from 'next/head'
import AdviceProcessNavigation from '@components/page-content/advice/AdviceProcessNavigation'
import AdviceOpenContent from '@components/page-content/advice/AdviceOpenContent'
import AdviceSummary from '@components/AdviceSummary'
import {
  PageContainer,
  Grid,
  Stack,
  Divider,
  Card,
  Typography
} from '@ui'
import UserSummary from '@components/UserSummary'

const AdviceDecisionPage = () => {
  return (
    <>
      <Head>
        <title>Wildflower Advice Process</title>
        <meta name="title" content="Wildflower Advice Process" />
        <meta property="og:site_name" content="Wildflower Advice Process" key="og_wf_site_name" />
        <meta name="description" content="Wildflower Advice Process" />
        <meta name="keywords" content="Wildflower, Advice, Montessori" />
        <meta property="og:title" content="Wildflower Advice Process" key="og_wf_site_title" />
        <meta property="og:description" content="Wildflower Advice Process" key="og_wf_site_description" />
      </Head>

      <PageContainer>
        <Grid sx={{ p: 6 }}>
          <Stack spacing={4}>
            <AdviceSummary
              status="open"
              content={adviceData.content}
              createdAt={adviceData.createdAt}
              location={adviceData.location}
              thoughtPartners={adviceData.thoughtPartners}
              deadline={adviceData.needAdviceBy}
            />

            <Divider />

            <Card>
              <Typography variant="h3">Context</Typography>
              <Card>
                <Typography>Summary</Typography>
                <Card>
                  The tuition process at my school has been wrought with challenges over the last year as we’ve seen increased growth in our student population. Not only does this lead to difficulties with tracking tuition payments and matching an increasing number of expenses to line items in our banking software, it has also caused friction for parents who are seeking more efficient ways of depositing their tuition payments. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Card>
              </Card>

              <Card>
                <Typography>Attachments</Typography>
                <Card>
                  <Stack spacing={1}>
                    <Typography>Vialeta Bookkeeping Plan - Final</Typography>
                    <Typography variant="bodyLightened">drive.google.com/drive/097823049uadcd</Typography>
                  </Stack>
                </Card>
                <Card>
                  <Stack spacing={1}>
                    <Typography>Vialeta Bookkeeping Plan - Final</Typography>
                    <Typography variant="bodyLightened">drive.google.com/drive/097823049uadcd</Typography>
                  </Stack>
                </Card>
              </Card>
            </Card>

            <Card>
              <Typography variant="h3">Stakeholders</Typography>
              <Card>
                <Typography>Your School</Typography>
                <Grid container spacing={2} alignItems="stretch">
                  <Grid item xs={12} sm={8}>
                    <Card>
                      <UserSummary
                        firstName="Molly"
                        lastName="Brown"
                        roles={['Teacher leader']}
                        skills={['Finance', 'Real estate']}
                      />
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Card>Feedback status</Card>
                  </Grid>
                </Grid>
                
                <Grid container spacing={2} alignItems="stretch">
                  <Grid item xs={12} sm={8}>
                    <Card>
                      <UserSummary
                        firstName="Molly"
                        lastName="Brown"
                        roles={['Teacher leader']}
                        skills={['Finance', 'Real estate']}
                      />
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Card>Feedback status</Card>
                  </Grid>
                </Grid>
                
              </Card>

              <Card>
                <Typography>Your Hub</Typography>
                <Grid container spacing={2} alignItems="stretch">
                  <Grid item xs={12} sm={8}>
                    <Card>
                      <UserSummary
                        firstName="Molly"
                        lastName="Brown"
                        roles={['Teacher leader']}
                        skills={['Finance', 'Real estate']}
                      />
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Card>Feedback status</Card>
                  </Grid>
                </Grid>
                
                <Grid container spacing={2} alignItems="stretch">
                  <Grid item xs={12} sm={8}>
                    <Card>
                      <UserSummary
                        firstName="Molly"
                        lastName="Brown"
                        roles={['Teacher leader']}
                        skills={['Finance', 'Real estate']}
                      />
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Card>Feedback status</Card>
                  </Grid>
                </Grid>
                
              </Card>
            </Card>
          </Stack>
        </Grid>
      </PageContainer>
    </>
  )
}

export default AdviceDecisionPage

const adviceData = {
  id: 21,
  content: "I am going to update the bookkeeping process at my school.",
  createdAt: "2022-03-19 05:01:47.589",
  updatedAt: "2022-04-02 05:01:47.589",
  location: 'Boston Montessori',
  needAdviceBy: "2022-04-20 05:01:47.589",
  thoughtPartners: [
    {
      firstName: "Keith",
      lastName: "Tom",
      avatar: "https://avatars.githubusercontent.com/u/12635?v=4"
    },
    {
      firstName: "Taylor",
      lastName: "Zanke",
      avatar: "https://avatars.githubusercontent.com/u/1396123?v=4"
    }
  ]
}