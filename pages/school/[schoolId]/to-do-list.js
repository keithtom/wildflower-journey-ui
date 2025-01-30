import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  List,
  ListItem,
  ListSubheader,
  ListItemAvatar,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { mutate } from "swr";

import {
  PageContainer,
  Grid,
  Typography,
  Chip,
  Card,
  Stack,
  Avatar,
  Icon,
} from "@ui";
import useSchool from "@hooks/useSchool";
import useAssignedSteps from "@hooks/useAssignedSteps";
import useWorkflow from "@hooks/useWorkflow";
import { useUserContext } from "../../../lib/useUserContext";
import Task from "@components/Task";
import { theme } from "../../../styles/theme";

const WorkflowOption = ({
  workflowId,
  setSelectedWorkflow,
  selectedWorkflow,
}) => {
  const { workflow, isLoading } = useWorkflow(workflowId);
  return (
    <Chip
      label={
        workflow?.attributes.recurring === true
          ? "Open School Checklist"
          : "School Startup Journey"
      }
      onClick={() => setSelectedWorkflow(workflowId)}
      variant={selectedWorkflow === workflowId && "primary"}
    />
  );
};

const ToDoListPage = ({}) => {
  const router = useRouter();
  const { schoolId } = router.query;
  const { data: school } = useSchool(schoolId);
  const { currentUser } = useUserContext();
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [hasSetInitialWorkflow, setHasSetInitialWorkflow] = useState(false);

  // Only fetch assigned steps when we have a selectedWorkflow
  const { assignedSteps, isLoading } = useAssignedSteps(
    selectedWorkflow ? selectedWorkflow : null
    // { current_user: true }
  );

  // Update selectedWorkflow only once when school data becomes available
  useEffect(() => {
    if (
      !hasSetInitialWorkflow &&
      school?.data?.attributes?.workflowIds?.length > 0
    ) {
      setSelectedWorkflow(school.data.attributes.workflowIds[0]);
      setHasSetInitialWorkflow(true);
    }
  }, [school, hasSetInitialWorkflow]);

  // Group steps by assignee
  const groupedSteps =
    assignedSteps?.reduce((acc, step) => {
      // Get the completers for this step
      const completers = step.relationships.completers.data.map((c) => c.id);

      // For each assignee of this step
      step.relationships.assignees.data.forEach((assignee) => {
        // Skip if this assignee has already completed the step
        if (completers.includes(assignee.id)) {
          return;
        }

        // Initialize the assignee's steps array if it doesn't exist
        if (!acc[assignee.id]) {
          acc[assignee.id] = {
            assignee,
            steps: [],
          };
        }

        // Only add the step if it's not already in this assignee's list
        const stepNotYetAdded = !acc[assignee.id].steps.some(
          (s) => s.id === step.id
        );
        if (stepNotYetAdded) {
          acc[assignee.id].steps.push(step);
        }
      });
      return acc;
    }, {}) || {};

  // Convert groupedSteps object to array and ensure current user is first
  const groupedStepsArray = Object.values(groupedSteps);
  if (groupedStepsArray.length > 0) {
    const currentUserIndex = groupedStepsArray.findIndex(
      (group) => group.assignee.id === currentUser.id
    );

    if (currentUserIndex > -1) {
      const currentUserGroup = groupedStepsArray.splice(currentUserIndex, 1)[0];
      groupedStepsArray.unshift(currentUserGroup);
    }
  }

  const removeStep = (taskId) => {
    // Only proceed if we have assignedSteps
    if (!assignedSteps) return;

    // Update the SWR cache with the filtered steps
    mutate(
      `/workflows/${selectedWorkflow}/assigned_steps`,
      {
        data: assignedSteps.filter((step) => step.id !== taskId),
      },
      false // Don't revalidate immediately
    );
  };

  console.log({ assignedSteps });
  console.log({ selectedWorkflow });
  console.log({ groupedSteps });

  return (
    <PageContainer title={school?.data.attributes.name}>
      <Stack spacing={6}>
        <Grid container spacing={4} alignItems="center">
          <Grid item>
            <Typography variant="bodyLarge" bold>
              To Do List
            </Typography>
          </Grid>
          {school?.data.attributes.workflowIds.map((w, i) => (
            <Grid item key={i}>
              <WorkflowOption
                workflowId={w}
                setSelectedWorkflow={setSelectedWorkflow}
                selectedWorkflow={selectedWorkflow}
              />
            </Grid>
          ))}
        </Grid>

        {selectedWorkflow && !isLoading && groupedSteps && (
          <Stack spacing={4}>
            {Object.keys(groupedSteps).length === 0 ? (
              <Card>
                <Stack spacing={4} alignItems="center" sx={{ py: 8 }}>
                  <Icon type="checkCircle" size="large" variant="primary" />
                  <Stack spacing={1} alignItems="center">
                    <Typography variant="h3" align="center">
                      All caught up!
                    </Typography>
                    <Typography variant="bodyLarge" lightened align="center">
                      There are no tasks assigned at the moment.
                    </Typography>
                  </Stack>
                </Stack>
              </Card>
            ) : (
              groupedStepsArray.map(({ assignee, steps }) => (
                <Card key={assignee.id} noPadding>
                  <List
                    subheader={
                      <ListSubheader
                        variant="lightened"
                        sx={{
                          position: "relative",
                          borderRadius: 0,
                          px: 4,
                          py: 1,
                          borderBottom: `1px solid ${theme.color.neutral.main}`,
                          backgroundColor: theme.color.neutral.lightened,
                        }}
                      >
                        <ListItem disableGutters>
                          <ListItemAvatar sx={{ minWidth: "48px" }}>
                            <Avatar
                              src={assignee.attributes.imageUrl}
                              size="sm"
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Stack direction="row" spacing={6}>
                                <Typography variant="bodyRegular" bold>
                                  {assignee.id === currentUser?.id
                                    ? "Assigned to you"
                                    : `Assigned to ${assignee.attributes.firstName} ${assignee.attributes.lastName}`}
                                </Typography>
                                <Typography variant="bodyRegular" lightened>
                                  {steps.length}
                                </Typography>
                              </Stack>
                            }
                          />
                        </ListItem>
                      </ListSubheader>
                    }
                  >
                    {steps.map((step, index) => (
                      <Task
                        key={step.id}
                        task={step}
                        processName={
                          step.relationships.process.data.attributes.title
                        }
                        isNext={index === 0}
                        removeStep={removeStep}
                        workflow={selectedWorkflow}
                      />
                    ))}
                  </List>
                </Card>
              ))
            )}
          </Stack>
        )}
      </Stack>
    </PageContainer>
  );
};

export default ToDoListPage;

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Add any additional props you need to pass to the page component
    },
  };
}
