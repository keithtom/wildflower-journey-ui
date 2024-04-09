import { useState } from "react";
import { mutate } from "swr";

import {
  List,
  Card,
  ListItem,
  ListItemText,
  ListItemButton,
  ListSubheader,
  Chip,
  Stack,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Skeleton,
  Snackbar,
} from "@mui/material";
import { PageContainer, Grid, Typography } from "@ui";
import useMilestones from "@hooks/workflow/definition/useMilestones";

import processes from "@api/workflow/definition/processes";

const ProcessLibrary = () => {
  const [repositionedSnackbarOpen, setRemoveProcessSnackbarOpen] =
    useState(false);
  const [addProcessModalOpen, setAddProcessModalOpen] = useState(false);
  // get data
  const { milestones, isLoading, isError } = useMilestones();
  // console.log({ milestones });

  const handleRemoveProcess = async (id) => {
    try {
      await processes.deleteMilestone(id);
      mutate(`/definition/processes`);
      setRemoveProcessSnackbarOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PageContainer isAdmin>
      <Stack spacing={6}>
        <Grid container>
          <Grid item>
            <Stack spacing={2}>
              <Typography variant="h4" bold>
                Process Library
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12}>
            <Card noPadding>
              <List
                subheader={
                  <ListSubheader
                    component="div"
                    id="nested-list-subheader"
                    sx={{ background: "#eaeaea" }}
                  >
                    <Grid container justifyContent="space-between">
                      <Grid item>Not in a workflow</Grid>
                      <Grid item>
                        <Button variant="contained" size="small">
                          Add
                        </Button>
                      </Grid>
                    </Grid>
                  </ListSubheader>
                }
              >
                {isLoading
                  ? Array.from({ length: 5 }).map((_, index) => (
                      <ListItem divider key={index}>
                        <ListItemText>
                          <Skeleton variant="text" width={120} />
                        </ListItemText>
                      </ListItem>
                    ))
                  : milestones.data.data
                      .filter((item) => item.attributes.numOfInstances < 1)
                      .map((milestone, i) => (
                        <ListItem
                          disablePadding
                          divider
                          key={i}
                          secondaryAction={
                            <Button
                              variant="text"
                              color="error"
                              onClick={() => handleRemoveProcess(milestone.id)}
                            >
                              Remove
                            </Button>
                          }
                        >
                          <ListItemButton>
                            <Stack
                              direction="row"
                              spacing={3}
                              alignItems="center"
                            >
                              <ListItemText>
                                {milestone.attributes.title}
                              </ListItemText>
                              {milestone.attributes.numOfSteps ? (
                                <Chip
                                  label={`${milestone.attributes.numOfSteps} steps`}
                                  size="small"
                                />
                              ) : null}
                              {milestone.attributes.categories.map((c, i) => (
                                <Chip label={c} size="small" key={i} />
                              ))}
                            </Stack>
                          </ListItemButton>
                        </ListItem>
                      ))}
              </List>
            </Card>
          </Grid>
        </Grid>
        {/* <Grid container>
          <Grid item xs={12}>
            <Card noPadding>
              <List
                subheader={
                  <ListSubheader
                    component="div"
                    id="nested-list-subheader"
                    sx={{ background: "#eaeaea" }}
                  >
                    <Grid container justifyContent="space-between">
                      <Grid item>In a workflow (Published or not)</Grid>
                    </Grid>
                  </ListSubheader>
                }
              >
                {isLoading
                  ? Array.from({ length: 5 }).map((_, index) => (
                      <ListItem divider key={index}>
                        <ListItemText>
                          <Skeleton variant="text" width={120} />
                        </ListItemText>
                      </ListItem>
                    ))
                  : milestones.data.data
                      .filter((item) => item.attributes.numOfInstances > 1)
                      .map((milestone, i) => (
                        <ListItem disablePadding divider key={i}>
                          <ListItemButton>
                            <Stack
                              direction="row"
                              spacing={3}
                              alignItems="center"
                            >
                              <ListItemText>
                                {milestone.attributes.title}
                              </ListItemText>
                              {milestone.attributes.numOfSteps ? (
                                <Chip
                                  label={`${milestone.attributes.numOfSteps} steps`}
                                  size="small"
                                />
                              ) : null}
                              {milestone.attributes.categories.map((c, i) => (
                                <Chip label={c} size="small" key={i} />
                              ))}
                            </Stack>
                          </ListItemButton>
                        </ListItem>
                      ))}
              </List>
            </Card>
          </Grid>
        </Grid> */}
      </Stack>
      <Snackbar
        autoHideDuration={1000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={repositionedSnackbarOpen}
        onClose={() => setRemoveProcessSnackbarOpen(false)}
        message="Process removed"
      />
    </PageContainer>
  );
};

export default ProcessLibrary;
