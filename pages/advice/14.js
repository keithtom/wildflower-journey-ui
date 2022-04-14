import { useState } from 'react'
import Head from 'next/head'
import AdviceProcessNavigation from '@components/page-content/advice/AdviceProcessNavigation'
import AdviceOpenContent from '@components/page-content/advice/AdviceOpenContent'
import AdviceSummary from '@components/AdviceSummary'
import AdviceActions from '@components/AdviceActions'
import {
  PageContainer,
  Grid,
  Stack,
  Divider,
  Card,
  Typography,
  Button,
  TextField
} from '@ui'
import {
  Add,
  Close
} from '@mui/icons-material'
import UserSummary from '@components/UserSummary'


const AdviceDecisionPage = () => {

  // Demo stuff
  const [canAdvance, setCanAdvance] = useState(false)
  const [attachmentAdded, setAttachmentAdded] = useState(false)
  const [schoolStakeholderAdded, setSchoolStakeholderAdded] = useState(false)
  const [hubStakeholderAdded, setHubStakeholderAdded] = useState(false)
  const [thoughtPartnersAdded, setThoughtPartnersAdded] = useState(false)

  const decisionStatus = 'draft'

  const handleLastClick = () => {
    setCanAdvance(true)
    setHubStakeholderAdded(true)
  }

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
          activeStep={null}
          canAdvance={canAdvance}
        />

        <Grid sx={{ p: 6 }}>
          <Stack spacing={4}>

            <AdviceSummary
              status={decisionStatus}
              content={adviceData.content}
              createdAt={adviceData.createdAt}
              location={adviceData.location}
              thoughtPartners={thoughtPartnersAdded && adviceData.thoughtPartners}
              deadline={adviceData.needAdviceBy}
            />

            <Divider />

            <Stack spacing={2}>
              <Typography variant="body1">Your Thought Partners</Typography>
              <Typography variant="bodyLightened">Close confidants you’d like to gut-check this decision with before sharing it with impacted stakeholders.</Typography>
              {thoughtPartnersAdded &&
                  <Stack>
                    <Card>
                      <UserSummary
                        firstName="Keith"
                        lastName="Tom"
                        roles={['Teacher leader']}
                        skills={['Technology']}
                      />
                    </Card>
                    <Card>
                      <UserSummary
                        firstName="Taylor"
                        lastName="Zanke"
                        roles={['Regional Site Entrepreneur']}
                        skills={['Design']}
                      />
                    </Card>
                  </Stack>
              }
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <Button variant="outlined" onClick={() => setThoughtPartnersAdded(true)}>
                    <Add />
                  </Button>
                </Grid>
                <Grid item>
                  <Typography>Add a thought partner</Typography>
                </Grid>
              </Grid>
            </Stack>

            <Divider />

            <Card>
              <Typography variant="h3">Context</Typography>
              <Card sx={{backgroundColor: 'neutral.light'}}>
                <Stack spacing={4}>
                  <Typography>Summary</Typography>
                  <TextField
                    sx={{backgroundColor: 'white'}}
                    placeholder="A summary of your proposed decision"
                    multiline
                    maxRows={4}
                  />
                </Stack>
              </Card>

              <Card sx={{backgroundColor: 'neutral.light'}}>
                <Stack spacing={4}>
                  <Typography>Attachments</Typography>
                  {attachmentAdded &&
                    <Card>
                      <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                          <Stack spacing={1}>
                            <Typography>Boston Montessori Lunch Menu - Final</Typography>
                            <Typography variant="bodyLightened">drive.google.com/drive/097823049uadcd</Typography>
                          </Stack>
                        </Grid>
                        <Grid item>
                          <Close onClick={() => setAttachmentAdded(false)}/>
                        </Grid>
                      </Grid>
                    </Card>
                  }

                  <Grid container spacing={4}>
                    <Grid item xs={11}>
                      <TextField
                        sx={{backgroundColor: 'white'}}
                        placeholder="Paste a link to an attachment"
                        multiline
                        maxRows={4}
                      />
                    </Grid>
                    <Grid item>
                      <Button variant="outlined" onClick={() => setAttachmentAdded(true)}>
                        <Add />
                      </Button>
                    </Grid>
                  </Grid>

                </Stack>
              </Card>
            </Card>

            <Card>
              <Typography variant="h3">Stakeholders</Typography>
              <Card sx={{backgroundColor: 'neutral.light'}}>
                <Stack spacing={4}>
                  <Typography>Your School</Typography>
                  {schoolStakeholderAdded &&
                    <Stack>
                      <Card>
                        <UserSummary
                          firstName="Molly"
                          lastName="Brown"
                          roles={['Teacher leader']}
                          skills={['Finance', 'Real estate']}
                        />
                      </Card>
                      <Card>
                        <UserSummary
                          firstName="Jeffery"
                          lastName="Smith"
                          roles={['Regional Site Entrepreneur']}
                          skills={['Finance', 'Nutrition']}
                        />
                      </Card>
                    </Stack>
                  }
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Button variant="outlined" onClick={() => setSchoolStakeholderAdded(true)}>
                        <Add />
                      </Button>
                    </Grid>
                    <Grid item>
                      <Typography>Add a stakeholder</Typography>
                    </Grid>
                  </Grid>
                </Stack>

              </Card>

              <Card sx={{backgroundColor: 'neutral.light'}}>
                <Stack spacing={4}>
                  <Typography>Your Hub</Typography>
                  {hubStakeholderAdded &&
                    <Stack>
                      <Card>
                        <UserSummary
                          firstName="Tim"
                          lastName="Peterson"
                          roles={['Operations Guide']}
                          skills={['Nutrition']}
                        />
                      </Card>
                    </Stack>
                  }
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Button variant="outlined" onClick={handleLastClick}>
                        <Add />
                      </Button>
                    </Grid>
                    <Grid item>
                      <Typography>Add a stakeholder</Typography>
                    </Grid>
                  </Grid>
                </Stack>
              </Card>

              <Card sx={{backgroundColor: 'neutral.light'}}>
                <Stack spacing={4}>
                  <Typography>Wildflower Foundation</Typography>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Button variant="outlined">
                        <Add />
                      </Button>
                    </Grid>
                    <Grid item>
                      <Typography>Add a stakeholder</Typography>
                    </Grid>
                  </Grid>
                </Stack>
              </Card>

            </Card>
            {/* <Button variant="outlined" onClick={() => setCanAdvance(!canAdvance)}>Toggle can advance</Button> */}
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
  createdAt: "2022-04-12 05:01:47.589",
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
