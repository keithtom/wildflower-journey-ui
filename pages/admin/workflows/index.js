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

  // console.log({ workflows });

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
                  : workflows.map((workflow, i) => (
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

                            {workflow.attributes.published ? (
                              <Chip label="Live" size="small" color="primary" />
                            ) : (
                              <Chip
                                label="Not Published"
                                size="small"
                                color="secondary"
                              />
                            )}
                            {/* TODO: Retrieve last updated from API */}
                            {/* <Typography>Last updated 3 days ago</Typography> */}

                            <Typography
                              variant="bodyRegular"
                              lightened
                            >{`${workflow.attributes.numOfInstances} Instances`}</Typography>
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