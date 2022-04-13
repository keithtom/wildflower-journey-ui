import { useState } from 'react'
import Head from 'next/head'
import AdviceProcessNavigation from '@components/page-content/advice/AdviceProcessNavigation'
import AdviceOpenContent from '@components/page-content/advice/AdviceOpenContent'
import AdviceSummary from '@components/AdviceSummary'
import AdviceActions from '@components/AdviceActions'
import AdviceFeedbackCard from '@components/AdviceFeedbackCard'
import {
  Alert,
  PageContainer,
  Grid,
  Stack,
  Divider,
  Card,
  Typography,
  Button
} from '@ui'
import UserSummary from '@components/UserSummary'

const AdviceDecisionPage = () => {
  const [canAdvance, setCanAdvance] = useState(true)

  const decisionStatus = 'open'

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

        <AdviceActions
          status={decisionStatus}
          activeStep={4}
          canAdvance={canAdvance}
        />

        <Grid sx={{ p: 6 }}>
          <Stack spacing={4}>

          <Alert>
            You decided to proceed with this decision!
          </Alert>

            <AdviceSummary
              status={decisionStatus}
              content={adviceData.content}
              createdAt={adviceData.createdAt}
              location={adviceData.location}
              thoughtPartners={adviceData.thoughtPartners}
            />

            <Divider />

            <Card>
              <Typography variant="h3">Context</Typography>
              <Card>
                <Typography>Summary</Typography>
                <Card>
                  My school's lunches have involved meat and fried food since opening. At first this was a function of affordability and availability, but as we've scaled it has become apparent that parents and students alike wish for healthier options. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Card>
              </Card>

              <Card>
                <Typography>Attachments</Typography>
                <Card>
                  <Stack spacing={1}>
                    <Typography>Boston Montessori Lunch Menu - Final</Typography>
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
                    <AdviceFeedbackCard
                      feedbackStatus="Supports"
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} alignItems="stretch">
                  <Grid item xs={12} sm={8}>
                    <Card>
                      <UserSummary
                        firstName="Jeffery"
                        lastName="Smith"
                        roles={['Resident Site Entrepreneur']}
                        skills={['Finance', 'Nutrition']}
                      />
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <AdviceFeedbackCard
                      feedbackStatus="No Advice"
                    />
                  </Grid>
                </Grid>

              </Card>

              <Card>
                <Typography>Your Hub</Typography>
                <Grid container spacing={2} alignItems="stretch">
                  <Grid item xs={12} sm={8}>
                    <Card>
                      <UserSummary
                        firstName="Tim"
                        lastName="Peterson"
                        roles={['Operations Guide']}
                        skills={['Nutrition']}
                      />
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <AdviceFeedbackCard
                      feedbackStatus="Supports"
                    />
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
  id: 14,
  content: "I am going to introduce healthier lunches at my school.",
  createdAt: "2022-03-28 05:01:47.589",
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
