import { useState } from "react";

import { List, ListItem } from "@mui/material";
import {
  Avatar,
  Card,
  Chip,
  Typography,
  Grid,
  IconButton,
  Popover,
  Divider,
  Button,
} from "@ui";
import { MoreVert } from "@mui/icons-material";
import UserContactModal from "./UserContactModal";
import UserSummary from "./UserSummary";

const UserResultItem = ({ user, asStakeholderSelection }) => {
  const [actionsAnchor, setActionsAnchor] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const handleOpenActions = (e) => {
    setActionsAnchor(e.currentTarget);
  };
  const handleCloseActions = () => {
    setActionsAnchor(null);
  };

  const open = Boolean(actionsAnchor);
  const id = open ? "user-result-actions" : undefined;

  const [addedToStakeholders, setAddedToStakeholders] = useState(false);
  const handleAddToStakeholders = () => {
    setAddedToStakeholders(true);
    // the decision id will be needed here? Can get from the path param?
  };

  return (
    <>
      <Card>
        <UserSummary
          avatar={user.profileImage}
          firstName={user.firstName}
          lastName={user.lastName}
          roles={user.attributes.roles}
          skills={user.skills}
        />

        <Divider />

        <Grid
          container
          mt={2}
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                {user.relationships.schools
                  ? user.relationships.schools.data.map((s, i) => (
                      <Typography key={i}>{s}</Typography>
                    ))
                  : null}
              </Grid>
              <Grid item>
                <Typography>
                  • {user.relationships.address.city},{" "}
                  {user.relationships.address.state}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Typography>
                  {asStakeholderSelection ? "Add" : "Contact"}{" "}
                  {user.attributes.firstName}:
                </Typography>
              </Grid>
              {asStakeholderSelection ? (
                <Grid item>
                  <Button
                    onClick={() => setAddedToStakeholders(!addedToStakeholders)}
                    variant={addedToStakeholders ? "outlined" : "contained"}
                  >
                    {addedToStakeholders ? (
                      <Typography>Remove</Typography>
                    ) : (
                      <Typography>Add</Typography>
                    )}
                  </Button>
                </Grid>
              ) : (
                <Grid item>
                  <Button onClick={() => setContactModalOpen(true)}>
                    <Typography>Contact</Typography>
                  </Button>
                </Grid>
              )}
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
  );
};

export default UserResultItem;
