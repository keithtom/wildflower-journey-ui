import { useRouter } from "next/router";
import {
  List,
  Card,
  ListItem,
  ListItemText,
  ListItemButton,
  ListSubheader,
  Chip,
  Stack,
  Skeleton,
} from "@mui/material";

import { PageContainer, Grid, Typography } from "@ui";
import useWorkflows from "@hooks/workflow/definition/useWorkflows";

const Workflows = ({}) => {
  const router = useRouter();

  // Load data
  const { workflows, isLoading, isError } = useWorkflows();

  console.log({ workflows });

  const SSJWorkflows = workflows?.filter(
    (w) => w.attributes.recurring === false
  );
  const OSCWorkflows = workflows?.filter(
    (w) => w.attributes.recurring === true
  );

  return (
    <PageContainer isAdmin>
      <Stack spacing={6}>
        <Grid container>
          <Grid item>
            <Typography variant="h4" bold>
              Workflows
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card sx={{ padding: 0 }}>
              <List
                subheader={
                  <ListSubheader
                    component="div"
                    id="nested-list-subheader"
                    sx={{ background: "#eaeaea" }}
                  >
                    School Startup Journey
                  </ListSubheader>
                }
              >
                {isLoading
                  ? Array.from({ length: 3 }).map((_, index) => (
                      <ListItem key={index} divider>
                        <ListItemText>
                          <Skeleton variant="text" width={120} />
                        </ListItemText>
                      </ListItem>
                    ))
                  : SSJWorkflows.map((workflow, i) => (
                      <ListItem disablePadding divider key={i}>
                        <ListItemButton
                          onClick={() =>
                            router.push(`/admin/workflows/${workflow.id}`)
                          }
                        >
                          <Stack
                            direction="row"
                            spacing={3}
                            alignItems="center"
                          >
                            <ListItemText>
                              {workflow.attributes.name}
                            </ListItemText>
                            {/* TODO: Retrieve isSensibleDefault from API */}
                            {/* <Chip label="Sensible default" size="small" /> */}
                            <Chip
                              label={
                                workflow.attributes.published
                                  ? workflow.attributes.version
                                  : `Drafting ${workflow.attributes.version}`
                              }
                              size="small"
                              variant="outlined"
                            />

                            {isLoading ? (
                              <Skeleton variant="rounded" width={120} />
                            ) : workflow?.attributes.needsSupport ? (
                              <Chip
                                label="Needs Support"
                                size="small"
                                variant="outlined"
                                color="error"
                              />
                            ) : workflow?.attributes.rolloutStartedAt !==
                                null &&
                              workflow?.attributes.rolloutCompletedAt ===
                                null ? (
                              <Chip
                                label="Publishing in progress"
                                size="small"
                                variant="outlined"
                                color="primary"
                              />
                            ) : workflow.attributes.published ? (
                              <Stack
                                direction="row"
                                spacing={3}
                                alignItems="center"
                              >
                                <Chip
                                  label="Published"
                                  size="small"
                                  color="primary"
                                />
                                <Typography variant="bodyRegular" lightened>
                                  Used by {workflow.attributes.numOfInstances}{" "}
                                  schools
                                </Typography>
                              </Stack>
                            ) : (
                              <Chip
                                label="Not Published"
                                size="small"
                                color="secondary"
                              />
                            )}
                          </Stack>
                        </ListItemButton>
                      </ListItem>
                    ))}
              </List>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ padding: 0 }}>
              <List
                subheader={
                  <ListSubheader
                    component="div"
                    id="nested-list-subheader"
                    sx={{ background: "#eaeaea" }}
                  >
                    Open School Checklist
                  </ListSubheader>
                }
              >
                {isLoading
                  ? Array.from({ length: 3 }).map((_, index) => (
                      <ListItem key={index} divider>
                        <ListItemText>
                          <Skeleton variant="text" width={120} />
                        </ListItemText>
                      </ListItem>
                    ))
                  : OSCWorkflows.map((workflow, i) => (
                      <ListItem disablePadding divider key={i}>
                        <ListItemButton
                          onClick={() =>
                            router.push(`/admin/workflows/${workflow.id}`)
                          }
                        >
                          <Stack
                            direction="row"
                            spacing={3}
                            alignItems="center"
                          >
                            <ListItemText>
                              {workflow.attributes.name}
                            </ListItemText>
                            {/* TODO: Retrieve isSensibleDefault from API */}
                            {/* <Chip label="Sensible default" size="small" /> */}
                            <Chip
                              label={
                                workflow.attributes.published
                                  ? workflow.attributes.version
                                  : `Drafting ${workflow.attributes.version}`
                              }
                              size="small"
                              variant="outlined"
                            />

                            {isLoading ? (
                              <Skeleton variant="rounded" width={120} />
                            ) : workflow?.attributes.needsSupport ? (
                              <Chip
                                label="Needs Support"
                                size="small"
                                variant="outlined"
                                color="error"
                              />
                            ) : workflow?.attributes.rolloutStartedAt !==
                                null &&
                              workflow?.attributes.rolloutCompletedAt ===
                                null ? (
                              <Chip
                                label="Publishing in progress"
                                size="small"
                                variant="outlined"
                                color="primary"
                              />
                            ) : workflow.attributes.published ? (
                              <Stack
                                direction="row"
                                spacing={3}
                                alignItems="center"
                              >
                                <Chip
                                  label="Published"
                                  size="small"
                                  color="primary"
                                />
                                <Typography variant="bodyRegular" lightened>
                                  Used by {workflow.attributes.numOfInstances}{" "}
                                  schools
                                </Typography>
                              </Stack>
                            ) : (
                              <Chip
                                label="Not Published"
                                size="small"
                                color="secondary"
                              />
                            )}
                          </Stack>
                        </ListItemButton>
                      </ListItem>
                    ))}
              </List>
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </PageContainer>
  );
};
export default Workflows;
