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
 import UserSummary from './UserSummary'

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
        <UserSummary
          firstName={user.attributes.firstName}
          lastName={user.attributes.lastName}
          roles={user.roles}
          skills={user.relationships.skills}
        />

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
