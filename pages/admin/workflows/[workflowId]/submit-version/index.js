import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";

import {
  Link,
  Alert,
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
  Popper,
  FormControl,
  InputLabel,
  TextField,
  Select,
  OutlinedInput,
  MenuItem,
} from "@mui/material";
import { Commit } from "@mui/icons-material";
import { PageContainer, Grid, Typography } from "@ui";
import useWorkflow from "@hooks/workflow/definition/useWorkflow";
import workflowApi from "@api/workflow/definition/workflows";
import InlineActionTile from "@components/admin/InlineActionTile";

const SubmitVersionPage = () => {
  const router = useRouter();
  const workflowId = router.query.workflowId;

  const [groupedProcesses, setGroupedProcesses] = useState([]);

  // Fetch data
  const { workflow, isLoading, isError } = useWorkflow(workflowId);
  console.log({ workflow });

  //  group processes by phase
  function groupByPhase(data) {
    const phasesOrder = ["visioning", "planning", "startup"];
    const grouped = data.reduce((acc, item) => {
      const phase = item.attributes.phase;
      if (!acc[phase]) {
        acc[phase] = [];
      }
      acc[phase].push(item);
      return acc;
    }, {});
    return phasesOrder.reduce((acc, phase) => {
      if (grouped[phase]) {
        const count = grouped[phase].reduce((count, milestone) => {
          const hasUnreplicatedProcess =
            milestone.relationships.selectedProcesses.data.some(
              (selectedProcess) =>
                selectedProcess.attributes.state !== "replicated"
            );
          return hasUnreplicatedProcess ? count + 1 : count;
        }, 0);

        acc.push({
          phase: phase,
          numberOfChanges: count,
          milestones: grouped[phase],
        });
      }
      return acc;
    }, []);
  }

  useEffect(() => {
    setGroupedProcesses(
      groupByPhase(isLoading ? [] : workflow?.relationships.processes.data)
    );
  }, [workflow]);
  console.log({ groupedProcesses });

  const handleSubmitNewVersion = async () => {
    try {
      const response = await workflowApi.publishWorkflow(workflowId);
      console.log({ response });
      router.push(`/admin/workflows/${workflowId}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <PageContainer isAdmin>
      <Stack spacing={6}>
        <Alert severity="success" icon={<Commit fontSize="inherit" />}>
          <Typography variant="bodyRegular">Confirm new version</Typography>
        </Alert>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Stack direction="row" spacing={3} alignItems="center">
              <Typography variant="h4" bold>
                {isLoading ? (
                  <Skeleton width={120} />
                ) : (
                  workflow.attributes.name
                )}
              </Typography>

              <Chip
                label={
                  isLoading ? (
                    <Skeleton width={64} />
                  ) : (
                    `Submitting ${workflow.attributes.version}`
                  )
                }
                size="small"
                variant="outlined"
              />
              <Chip label="Not Published" size="small" color="secondary" />
            </Stack>
          </Grid>
          <Grid item>
            <Stack direction="row" spacing={3}>
              <Link href={`/admin/workflows/${workflowId}`}>
                <Button>Go back</Button>
              </Link>
              <Button variant="contained" onClick={handleSubmitNewVersion}>
                Confirm and submit
              </Button>
            </Stack>
          </Grid>
        </Grid>

        {isLoading ? (
          <Grid container>
            <Grid item xs={12}>
              <Card noPadding>
                <List
                  subheader={
                    <ListSubheader
                      component="div"
                      id="nested-list-subheader"
                      sx={{
                        background: "#eaeaea",
                        paddingX: 4,
                        paddingY: 3,
                      }}
                    >
                      <Skeleton variant="text" width={120} height={24} />
                    </ListSubheader>
                  }
                >
                  {Array.from({ length: 3 }).map((_, index) => (
                    <ListItem key={index} divider>
                      <ListItemText>
                        <Skeleton variant="text" width={120} />
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
              </Card>
            </Grid>
          </Grid>
        ) : (
          groupedProcesses.map((phase, i) => (
            <Grid container>
              <Grid item xs={12} key={i}>
                <Card>
                  <List
                    fullWidth
                    subheader={
                      <ListSubheader
                        component="div"
                        id="nested-list-subheader"
                        sx={{ background: "#eaeaea" }}
                      >
                        <Stack direction="row" alignItems="center" spacing={3}>
                          <Grid item>
                            {phase.phase.charAt(0).toUpperCase() +
                              phase.phase.slice(1)}
                          </Grid>
                          <Grid item>
                            <Chip
                              size="small"
                              color={
                                phase.numberOfChanges > 0
                                  ? "secondary"
                                  : "default"
                              }
                              label={`${
                                phase.numberOfChanges > 0
                                  ? phase.numberOfChanges
                                  : "No"
                              } Changes`}
                            />
                          </Grid>
                        </Stack>
                      </ListSubheader>
                    }
                  >
                    {phase.milestones.map((process, i) => (
                      <ListItem
                        key={i}
                        disablePadding
                        divider
                        sx={{
                          opacity:
                            process.relationships.selectedProcesses.data[0]
                              .attributes.state === "replicated"
                              ? 0.5
                              : null,
                        }}
                        // show phase title
                        // if removed, show red bg with dot
                        // if added, show green bg with dot
                        // if changed, show yellow bg with dot
                        // if not changed, show lightened with gray dot
                      >
                        <InlineActionTile
                          status={
                            process.relationships.selectedProcesses.data[0]
                              .attributes.state
                          }
                          dragHandle={null}
                          disabled
                        />
                        <Stack
                          direction="row"
                          spacing={3}
                          alignItems="center"
                          pl={3}
                        >
                          <ListItemText>
                            <Typography variant="bodyRegular">
                              {process.attributes.title}
                            </Typography>
                          </ListItemText>
                          <Chip
                            label={`${process.attributes.numOfSteps} steps`}
                            size="small"
                          />
                          {process.attributes.categories.map((c, i) => (
                            <Chip label={c} size="small" key={i} />
                          ))}
                        </Stack>
                      </ListItem>
                    ))}
                  </List>
                </Card>
              </Grid>
            </Grid>
          ))
        )}
      </Stack>
    </PageContainer>
  );
};

export default SubmitVersionPage;
