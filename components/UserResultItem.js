import { useState } from 'react'

import {
  List,
  ListItem,
} from '@mui/material'
import {
  Avatar,
  Card,
  Chip,
  Typography,
  Grid,
  IconButton,
  Popover,
  Divider,
  Button
} from '@ui'
import {
  MoreVert
 } from '@mui/icons-material'
 import UserContactModal from './UserContactModal'

const UserResultItem = ({ user }) => {
  const [actionsAnchor, setActionsAnchor] = useState(false)
  const [contactModalOpen, setContactModalOpen] = useState(false)

  const handleOpenActions = (e) => {
    setActionsAnchor(e.currentTarget)
  }
  const handleCloseActions = () => {
    setActionsAnchor(null)
  }

  const open = Boolean(actionsAnchor)
  const id = open ? 'user-result-actions' : undefined

  return (
    <>
      <Card>
        <Grid container justifyContent="space-between" alignItems="center" mb={2}>
          <Grid item>
            <Grid container alignItems="flex-start" spacing={4}>
              <Grid item>
                <Avatar sx={{
                  width: 32,
                  height: 32
                }} />
              </Grid>
              <Grid item>
                <Typography variant="h5">{user.attributes.firstName} {user.attributes.lastName}</Typography>
                {user.roles ?
                  user.roles.map((r, i) =>
                    <Typography key={i}>{r}</Typography>
                  )
                : null}
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container alignItems="center" spacing={2}>
              {user.relationships.skills.map((s, i) =>
                <Grid item key={i}>
                  <Chip label={s} />
                </Grid>
              )}
              {/* <Grid item>
                <IconButton
                  id={id}
                  onClick={handleOpenActions}
                >
                  <MoreVert />
                </IconButton>
                <Popover
                  id={id}
                  open={open}
                  onClose={handleCloseActions}
                  anchorEl={actionsAnchor}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                >
                  <List>
                    <ListItem button onClick={() => setContactModalOpen(true)}>
                      <Typography>Contact</Typography>
                    </ListItem>
                  </List>
                </Popover>
              </Grid> */}
            </Grid>
          </Grid>
        </Grid>

        <Divider />

        <Grid container mt={2} spacing={2} justifyContent="space-between" alignItems="center">
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                {user.relationships.schools ?
                  user.relationships.schools.map((s, i) =>
                    <Typography key={i}>{s}</Typography>
                  )
                : null}
              </Grid>
              <Grid item>
                <Typography>• {user.relationships.address.city}, {user.relationships.address.state}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Typography>Contact {user.attributes.firstName}:</Typography>
              </Grid>
              <Grid item>
                <Button onClick={() => setContactModalOpen(true)}>
                  <Typography>Contact</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

      </Card>

      <UserContactModal
        user={user}
        open={contactModalOpen}
        toggle={() => setContactModalOpen(!contactModalOpen)}
      />
    </>
  )
}

export default UserResultItem
