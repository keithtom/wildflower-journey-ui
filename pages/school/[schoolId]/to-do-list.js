import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  List,
  ListItem,
  ListSubheader,
  ListItemAvatar,
  ListItemText,
  ListItemIcon,
  Skeleton,
} from "@mui/material";
import { mutate } from "swr";

import { getTranslatedAttr } from "@lib/utils/getTranslatedAttr";
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
import useSelectedWorkflow from "@hooks/useSelectedWorkflow";
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
  const { data: school, isLoading: isLoadingSchool } = useSchool(schoolId);
  const { currentUser } = useUserContext();
  const isOpen = school?.data?.attributes?.status === "Open";

  const { selectedWorkflow, isLoading: isLoadingWorkflow } =
    useSelectedWorkflow(school?.data?.attributes?.workflowIds, isOpen);

  const [activeWorkflow, setActiveWorkflow] = useState(null);

  // Only fetch assigned steps when we have an activeWorkflow
  const { assignedSteps, isLoading } = useAssignedSteps(
    activeWorkflow ? activeWorkflow : null
  );

  // Initialize activeWorkflow from selectedWorkflow, but don't overwrite user choice
  useEffect(() => {
    if (!activeWorkflow && selectedWorkflow?.id) {
      setActiveWorkflow(selectedWorkflow.id);
    }
  }, [selectedWorkflow, activeWorkflow]);

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
      `/workflows/${activeWorkflow}/assigned_steps`,
      {
        data: assignedSteps.filter((step) => step.id !== taskId),
      },
      false // Don't revalidate immediately
    );
  };

  // console.log({ assignedSteps });
  // console.log({ activeWorkflow });
  // console.log({ groupedSteps });

  return (
    <PageContainer title={school?.data.attributes.name}>
      <Stack spacing={6}>
        <Grid container spacing={4} alignItems="center">
          <Grid item>
            <Typography variant="bodyLarge" bold>
              To Do List
            </Typography>
          </Grid>
          {isLoadingSchool ? (
            // Show skeleton while loading
            <>
              <Grid item>
                <Skeleton
                  variant="rectangular"
                  width={120}
                  height={32}
                  sx={{ borderRadius: 16 }}
                />
              </Grid>
              <Grid item>
                <Skeleton
                  variant="rectangular"
                  width={140}
                  height={32}
                  sx={{ borderRadius: 16 }}
                />
              </Grid>
            </>
          ) : (
            // Show actual workflow options when loaded
            (school?.data?.attributes?.workflowIds || []).map((w, i) => (
              <Grid item key={i}>
                <WorkflowOption
                  workflowId={w}
                  setSelectedWorkflow={setActiveWorkflow}
                  selectedWorkflow={activeWorkflow}
                />
              </Grid>
            ))
          )}
        </Grid>

        {activeWorkflow && !isLoading && groupedSteps && (
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
                          step.relationships.process.data.attributes[
                            getTranslatedAttr(router.locale, "title")
                          ] || step.relationships.process.data.attributes.title
                        }
                        isNext={index === 0}
                        removeStep={removeStep}
                        workflowId={activeWorkflow}
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
