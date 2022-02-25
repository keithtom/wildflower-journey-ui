import {
  Grid,
  Card,
  CardContent,
  Stack,
  Typography,
  ToggleButton,
  Modal,
  Paper
} from '@mui/material'
import {
  Close
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
          <Stack spacing={1}>
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
            <Paper
              elevation={0}
              sx={{
                p: 1,
                background: '#fafafa'
              }}
            >
              <Typography>{user.email}</Typography>
            </Paper>
            <Paper
              elevation={0}
              sx={{
                p: 1,
                background: '#fafafa'
              }}
            >
              <Typography>{user.phoneNumber}</Typography>
            </Paper>
          </Stack>
        </CardContent>
      </Card>
    </Modal>
  )
}

export default UserContactModal
