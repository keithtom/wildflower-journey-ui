import { useState } from 'react'
import Link from 'next/link'

import {
  Avatar,
  AvatarGroup,
  Box,
  Divider,
  Grid,
  Stack,
  Typography,
  Card,
  Chip,
  Button,
  Popover
} from '@ui'
import {
  ArrowBack,
  CheckCircle,
  CheckCircleOutlined,
  InfoOutlined
} from '@mui/icons-material'
import RequestAdviceModal from './RequestAdviceModal'

const StepContext = ({ context }) => {
  const [showStepContext, setShowStepContext] = useState(null)
  const handleClick = (event) => {
    setShowStepContext(event.currentTarget);
  };
  return (
    <>
      <InfoOutlined
        color="action"
        aria-owns={open ? 'context-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handleClick}
        onMouseLeave={() => setShowStepContext(null)}
      />
      <Popover
        id="context-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={showStepContext}
        anchorEl={showStepContext}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={() => setShowStepContext(null)}
        disableRestoreFocus
      >
        <Grid sx={{ p: 4 }}>
          <Typography>{context}</Typography>
        </Grid>
      </Popover>
    </>
  )
}

const AdviceActions = ({ status, activeStep, canAdvance }) => {
  const [requestAdviceOpen, setRequestAdviceOpen] = useState(false)

  return (
    <Box sx={{backgroundColor: 'neutral.light'}}>
      <Grid sx={{ p: 6 }}>

        <Stack>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Link href="/advice/drafts">
                <Stack direction="row" spacing={4} sx={{'&:hover': {cursor: 'pointer'}}}>
                  <ArrowBack fontSize="small" />
                  <Typography>Cancel</Typography>
                </Stack>
              </Link>
            </Grid>
            <Grid item>
              {
                status === 'draft' ?
                  <Button onClick={() => setRequestAdviceOpen(true)} variant={canAdvance ? 'contained' : 'disabled'}>Request advice</Button>
                : status === 'open' ?
                  <Grid container>
                    <Grid item><Button variant="contained">Request advice again</Button></Grid>
                    <Grid item><Button variant={canAdvance ? 'contained' : 'disabled'}>Make your decision</Button></Grid>
                  </Grid>
                : status === 'closed' ?
                  <Button variant="active">Communicate your decision</Button>
                : null
              }
              {/* Actions modals */}
              <RequestAdviceModal
                open={requestAdviceOpen}
                toggle={() => setRequestAdviceOpen(!requestAdviceOpen)}
              />
            </Grid>
          </Grid>

          {activeStep ?
            <Grid container spacing={4}>
              {AdviceSteps.map((a, i) =>
                <Grid item xs={12} sm={3} key={i}>
                  <Card>
                    <Stack spacing={2}>
                      <Grid container justifyContent="space-between">
                        <Grid item>
                          {activeStep > a.number ?
                            <CheckCircle />
                          : activeStep === a.number ?
                            <CheckCircleOutlined />
                          :
                            <CheckCircle color="disabled" />
                          }
                        </Grid>
                        <Grid item>
                          <StepContext context={a.context} />
                        </Grid>
                      </Grid>
                      <Typography variant="caption">Step {a.number}</Typography>
                      <Typography variant="body1">{a.title}</Typography>
                    </Stack>
                  </Card>
                </Grid>
              )}
            </Grid>
          :
            null
          }

        </Stack>
      </Grid>
      <Divider />
    </Box>
  )
}

export default AdviceActions

const AdviceSteps = [
  {
    number: '1',
    title: 'Request advice',
    context: 'This is the first step of the Advice Process!'
  },
  {
    number: '2',
    title: 'Feedback and listening',
    context: 'This is the second step of the Advice Process!'
  },
  {
    number: '3',
    title: 'Make your decision',
    context: 'This is the third step of the Advice Process!'
  },
  {
    number: '4',
    title: 'Communicate your decision',
    context: 'This is the final step of the Advice Process!'
  },
]
