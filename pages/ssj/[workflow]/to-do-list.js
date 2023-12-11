import { useState, useEffect } from "react";
import {
  PageContainer,
  Typography,
  Card,
  Stack,
  Icon,
  Link,
  Grid,
  Button,
  Avatar,
} from "@ui";
import Task from "@components/Task";
import Hero from "@components/Hero";
import getAuthHeader from "@lib/getAuthHeader";
import { clearLoggedInState, redirectLoginProps } from "@lib/handleLogout";
import { getCookie } from "cookies-next";
import stepsApi from "@api/workflow/steps";
import processesApi from "@api/workflow/processes";
import useAuth from "@lib/utils/useAuth";
import { useUserContext } from "@lib/useUserContext";

const ToDoList = ({ steps, milestonesToDo }) => {
  const { currentUser, isOperationsGuide } = useUserContext();
  const [assignedSteps, setAssignedSteps] = useState([]);
  const [teamAssignments, setTeamAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const removeStep = (taskId) => {
    setTimeout(() => {
      setAssignedSteps(assignedSteps.filter((step) => step.id !== taskId));
    }, 1500);
  };

  const hero = "/assets/images/ssj/SelfManagement_hero.jpg";

  useEffect(() => {
    if (isOperationsGuide) {
      const assignmentsByAssigneeId = {};
      steps.forEach((item) => {
        const assignees = item.relationships.assignees.data;
        assignees.forEach((assignee) => {
          const assigneeId = assignee.id;

          // Create an array for the assignee ID if it doesn't exist
          if (!assignmentsByAssigneeId[assigneeId]) {
            assignmentsByAssigneeId[assigneeId] = {
              assigneeId,
              firstName: assignee.attributes.firstName,
              lastName: assignee.attributes.lastName,
              imgUrl: assignee.attributes.imageUrl,
              assignments: [],
            };
          }

          // Push the item to the array for the assignee ID
          assignmentsByAssigneeId[assigneeId].assignments.push(item);
        });
      });
      const newArray = Object.values(assignmentsByAssigneeId);
      setTeamAssignments(newArray);
      setIsLoading(false);
    } else {
      setAssignedSteps(steps);
      setIsLoading(false);
    }
  }, [currentUser]);

  // useAuth("/login");

  // console.log({ assignedSteps });
  // console.log({ teamAssignments });

  return (
    <PageContainer isLoading={isLoading}>
      <Stack spacing={12}>
        <Hero imageUrl={hero} />

        {teamAssignments.length ? (
          teamAssignments.map((t, i) => (
            <Stack spacing={12} key={i}>
              <Stack spacing={6} direction="row" alignItems="center">
                <Avatar src={t.imgUrl} />
                <Typography variant="h3" bold>
                  {t.firstName} {t.lastName}'s to do List
                </Typography>
                <Typography variant="h3" lightened>
                  {t.assignments.length ? t.assignments.length : null}
                </Typography>
              </Stack>
              <Stack>
                {t.assignments.map((step, i) => {
                  return (
                    <Task
                      key={step.id}
                      task={step}
                      processName={
                        step.relationships.process.data.attributes.title
                      }
                      isNext={i === 0}
                      removeStep={removeStep}
                    />
                  );
                })}
              </Stack>
            </Stack>
          ))
        ) : assignedSteps.length ? (
          <Stack spacing={12}>
            <Stack spacing={6} direction="row" alignItems="center">
              <Icon type="calendarCheck" variant="primary" size="large" />
              <Typography variant="h3" bold>
                Your to do list
              </Typography>
              <Typography variant="h3" lightened>
                {assignedSteps.length ? assignedSteps.length : null}
              </Typography>
            </Stack>
            <Stack>
              {assignedSteps.map((step, i) => {
                return (
                  <Task
                    key={step.id}
                    task={step}
                    processName={
                      step.relationships.process.data.attributes.title
                    }
                    isNext={i === 0}
                    removeStep={removeStep}
                  />
                );
              })}
            </Stack>
          </Stack>
        ) : (
          <Card noPadding>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={6}>
                <Card size="large" noBorder noRadius sx={{ height: "100%" }}>
                  <Stack spacing={6}>
                    <Icon type="calendarCheck" variant="primary" />
                    <Typography variant="h3" bold>
                      {isOperationsGuide
                        ? "Looks like this team doesn't have anything on their do to list!"
                        : "Looks like you don't have any tasks on your to do list!"}
                    </Typography>
                    <Typography variant="bodyLarge" lightened>
                      {isOperationsGuide
                        ? "Next time you meet with them help them add a task to their to do list. Here are a few suggested tasks for this team."
                        : "To start, add a task from one of these milestones. You can take them on at your own pace, according to your interests, needs, and timeline."}
                    </Typography>
                  </Stack>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card
                  noBorder
                  variant="lightened"
                  noRadius
                  sx={{ height: "100%" }}
                >
                  <Stack spacing={2}>
                    {milestonesToDo.map((m, i) => (
                      <Link href={`/ssj/${m.attributes.phase}/${m.id}`} key={i}>
                        <Card variant="light" size="small" hoverable>
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Typography variant="bodyRegular" bold>
                              {m.attributes.title}
                            </Typography>
                            <Button small variant="text">
                              Start here
                            </Button>
                          </Stack>
                        </Card>
                      </Link>
                    ))}
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </Card>
        )}
      </Stack>
    </PageContainer>
  );
};

export default ToDoList;

export async function getServerSideProps({ query, req, res }) {
  const config = getAuthHeader({ req, res });
  if (!config) {
    console.log("no token found, redirecting to login");
    return redirectLoginProps();
  }

  const phase = getCookie("phase", { req, res });
  const workflowId = query.workflow;

  let response;
  config.params = { current_user: null };
  try {
    response = await stepsApi.assigned(workflowId, config);
  } catch (error) {
    if (error?.response?.status === 401) {
      clearLoggedInState({ req, res });
      return redirectLoginProps();
    } else {
      console.error(error);
    }
  }

  let steps = response.data.data;
  // console.log("steps", steps)

  let milestonesToDo = [];
  const responseMilestones = await processesApi.index({
    workflowId,
    params: { phase, omit_include: true },
    config,
  });

  milestonesToDo = responseMilestones.data.data.filter(
    (milestone) => milestone.attributes.status == "to do"
  );

  return {
    props: {
      steps,
      milestonesToDo,
    },
  };
}
