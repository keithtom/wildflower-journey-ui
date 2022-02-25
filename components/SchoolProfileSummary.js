import { useState } from 'react'

import {
  Box,
  Avatar,
  Grid,
  Card,
  CardContent,
  Stack,
  Typography,
  Chip,
  Button
} from '@mui/material'
import UserContactModal from './UserContactModal'

const SchoolProfileSummary = ({ school }) => {
  const [contactModalOpen, setContactModalOpen] = useState(false)

  return (
    <>
      <Card>
        <CardContent>
          <Stack spacing={3}>
            <Stack spacing={1}>
              <Typography variant="h6">About</Typography>
              <Typography>{school.description}</Typography>
            </Stack>
            <Stack spacing={1}>
              <Grid container>
                {school.attributes.map((a, i) =>
                  <Grid item xs={12}>
                    <Grid container alignItems="center">
                      <Grid item xs={12} sm={6}>
                        <Typography variant="overline">{a.title}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography>{a.value}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Stack>
            <Stack spacing={1}>
              <Typography variant="h6">Contact</Typography>
              <Box>
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
              </Box>
              <Button
                variant="contained"
                onClick={() => setContactModalOpen(true)}
              >
                Contact {school.contactMember.firstName}
              </Button>
            </Stack>
          </Stack>
        </CardContent>
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
