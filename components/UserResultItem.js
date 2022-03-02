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
  Popover
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
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Avatar sx={{
                  width: 32,
                  height: 32
                }} />
              </Grid>
              <Grid item>
                <Typography>{user.attributes.firstName} {user.attributes.lastName}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Chip label="Finance" />
              </Grid>
              <Grid item>
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
