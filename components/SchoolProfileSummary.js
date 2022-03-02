import { useState } from 'react'

import {
  Box,
  Avatar,
  Grid,
  Card,
  Stack,
  Typography,
  Button
} from '@ui'
import UserContactModal from './UserContactModal'

const SchoolProfileSummary = ({ school }) => {
  const [contactModalOpen, setContactModalOpen] = useState(false)

  return (
    <>
      <Card>
        <Stack spacing={4}>
          <Stack spacing={2}>
            <Typography variant="h6">About</Typography>
            <Typography>{school.description}</Typography>
          </Stack>
          <Stack spacing={2}>
            <Grid container>
              {school.attributes.map((a, i) =>
                <Grid item xs={12}>
                  <Grid container alignItems="center">
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">{a.title}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="bodyLightened">{a.value}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Stack>
          <Stack spacing={2}>
            <Typography variant="h6">Contact</Typography>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32
                  }}
                  src={school.contactMember.profileImage}
                />
              </Grid>
              <Grid item>
                <Typography>{school.contactMember.firstName} {school.contactMember.lastName}</Typography>
              </Grid>
            </Grid>
            <Button
              variant="outlined"
              onClick={() => setContactModalOpen(true)}
            >
              Contact {school.contactMember.firstName}
            </Button>
          </Stack>
        </Stack>
      </Card>

      <UserContactModal
        user={school.contactMember}
        open={contactModalOpen}
        toggle={() => setContactModalOpen(!contactModalOpen)}
      />
    </>
  )
}

export default SchoolProfileSummary
