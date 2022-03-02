import { useState } from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard';

import {
  Grid,
  Card,
  CardContent,
  Stack,
  Typography,
  ToggleButton,
  Modal,
  Paper,
  IconButton
} from '@mui/material'
import {
  Close,
  ContentCopy
} from '@mui/icons-material'

const UserContactModal = ({ user, open, toggle }) => {

  return (
    <Modal
      open={open}
      onClose={toggle}
    >
      <Card
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
        }}
      >
        <CardContent>
          <Stack spacing={2}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h6">Contact {user.firstName} {user.lastName}</Typography>
              </Grid>
              <Grid item>
                <ToggleButton
                  size="small"
                  onChange={toggle}
                >
                  <Close />
                </ToggleButton>
              </Grid>
            </Grid>

            {user.attributes.email ?
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  background: '#fafafa'
                }}
              >
                <Grid container alignItems="center" justifyContent="space-between">
                  <Grid item>
                    <Typography>{user.attributes.email}</Typography>
                  </Grid>
                  <Grid item>
                    <CopyToClipboard text={user.attributes.email}>
                      <IconButton>
                        <ContentCopy />
                      </IconButton>
                    </CopyToClipboard>
                  </Grid>
                </Grid>
              </Paper>
            : null}

            {user.attributes.phone ?
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  background: '#fafafa'
                }}
              >
                <Typography>{user.attributes.phone}</Typography>
              </Paper>
            : null}
          </Stack>
        </CardContent>
      </Card>
    </Modal>
  )
}

export default UserContactModal
