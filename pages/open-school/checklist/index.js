import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import {
  Collapse,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";

import peopleApi from "@api/people";
import { useUserContext, useAssignViewingSchool } from "@lib/useUserContext";
import { clearLoggedInState } from "@lib/handleLogout";
import { handleFindMatchingItems } from "@lib/utils/usefulHandlers";
import useAuth from "@lib/utils/useAuth";

import {
  PageContainer,
  Grid,
  Typography,
  Avatar,
  Card,
  Stack,
  Button,
  Icon,
  IconButton,
  Chip,
  Box,
  Link,
} from "@ui";
import { fr } from "date-fns/locale";

const AdminChecklist = () => {
  const { currentUser } = useUserContext();
  const router = useRouter();

  // console.log({ currentUser });
  // useAuth("/login");

  return (
    <PageContainer>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="bodySmall" lightened>
                This Month
              </Typography>
              <Typography variant="h3" bold>
                July
              </Typography>
            </Grid>
            <Grid item>
              <IconButton>
                <Icon type="chevronLeft" variant="primary" />
              </IconButton>
              <IconButton>
                <Icon type="chevronRight" variant="primary" />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Card noPadding>
            <List
              subheader={
                <Card variant="lightened" size="small" noRadius>
                  <Typography variant="bodyRegular" bold>
                    In Progress
                  </Typography>
                </Card>
              }
            >
              <MilestoneGroup />
              <MilestoneGroup />
              <MilestoneGroup />
            </List>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card noPadding>
            <List
              subheader={
                <Card variant="lightened" size="small" noRadius>
                  <Typography variant="bodyRegular" bold>
                    To Do
                  </Typography>
                </Card>
              }
            >
              <MilestoneGroup />
              <MilestoneGroup />
              <MilestoneGroup />
            </List>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card noPadding>
            <List
              subheader={
                <Card variant="lightened" size="small" noRadius>
                  <Typography variant="bodyRegular" bold>
                    Up Next
                  </Typography>
                </Card>
              }
            >
              <MilestoneGroup />
              <MilestoneGroup />
              <MilestoneGroup />
            </List>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card noPadding>
            <List
              subheader={
                <Card variant="lightened" size="small" noRadius>
                  <Typography variant="bodyRegular" bold>
                    Done
                  </Typography>
                </Card>
              }
            >
              <MilestoneGroup />
              <MilestoneGroup />
              <MilestoneGroup />
            </List>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default AdminChecklist;

const MilestoneGroup = ({}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ListItemButton
        onClick={() => setOpen(!open)}
        sx={{ borderTop: "1px solid #f1f1f1" }}
      >
        <ListItemIcon sx={{ minWidth: "48px" }}>
          <Icon
            type="chevronRight"
            size="medium"
            sx={{
              rotate: open ? "90deg" : "0deg",
              transition: "all .15s ease-in-out",
            }}
          />
        </ListItemIcon>
        <ListItemText>
          <Typography variant="bodySmall">This Month</Typography>
        </ListItemText>
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton>
            <ListItemIcon sx={{ minWidth: "48px" }} />
            <ListItemText>
              <Typography variant="bodyRegular" bold>
                Process Title
              </Typography>
            </ListItemText>
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
};
