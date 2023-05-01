import axios from "axios";
import { useState } from "react";
import {
  PageContainer,
  Typography,
  Card,
  Stack,
  Icon,
  Link,
  Grid,
  Button,
} from "@ui";
import Task from "@components/Task";
import Hero from "@components/Hero";
import getAuthHeader from "@lib/getAuthHeader";
import { getCookie } from "cookies-next";
import assignmentsApi from "@api/workflow/assignments";

const ToDoList = ({
  steps,
  milestonesToDo,
}) => {
  const [assignedSteps, setAssignedSteps] = useState(steps);

  const removeStep = (taskId) => {
    setTimeout(() => {
      setAssignedSteps(assignedSteps.filter(step => step.id !== taskId))
    }, 1500);
  };

  const hero = "/assets/images/ssj/SelfManagement_hero.jpg";

  return (
    <PageContainer
      isLoading={false}
    >
      <Stack spacing={12}>
        <Hero imageUrl={hero} />
        <Stack spacing={6} direction="row" alignItems="center">
          <Icon type="calendarCheck" variant="primary" size="large" />
          <Typography variant="h3" bold>
            Your to do list
          </Typography>
          <Typography variant="h3" lightened>
            {assignedSteps.length ? assignedSteps.length : null}
          </Typography>
        </Stack>

        {assignedSteps.length ? (
          <Stack>
            {assignedSteps.map((step, i) => {
              return (
                <Task
                  key={step.id}
                  task={step}
                  processName={step.relationships.process.data.attributes.title}
                  isNext={i === 0}
                  removeStep={removeStep}
                />
              );
            })}
          </Stack>
        ) : (
          <Card noPadding>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={6}>
                <Card size="large" noBorder noRadius sx={{ height: "100%" }}>
                  <Stack spacing={6}>
                    <Icon type="calendarCheck" variant="primary" />
                    <Typography variant="h3" bold>
                      Looks like you don't have any tasks on your to do list!
                    </Typography>
                    <Typography variant="bodyLarge" lightened>
                      To start, add a task from one of these milestones. You can
                      take them on at your own pace, according to your
                      interests, needs, and timeline.
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
                      <Link href={`/ssj/${m.attributes.phase}/${m.id}`}>
                        <Card variant="light" size="small" key={i} hoverable>
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

export async function getServerSideProps({ req, res }) {
  const config = getAuthHeader({ req, res });
  
  const phase = getCookie("phase", { req, res });
  const workflowId = getCookie("workflowId", { req, res });
  const response = await assignmentsApi.index(workflowId, config);
  
  let steps = response.data.data
  // console.log("steps", steps)

  let milestonesToDo = [];
  // if no assigned steps, load milestones todos so we can suggest to user.
  if (!steps.length) {
    const apiRouteMilestones = `${process.env.API_URL}/v1/workflow/workflows/${workflowId}/processes?phase=${phase}&omit_include=true`;
    const responseMilestones = await axios.get(apiRouteMilestones, config);
    
    milestonesToDo = responseMilestones.data.data.filter(milestone => milestone.attributes.status == "to do");
  }
  
  return {
    props: {
      steps,
      milestonesToDo,
    },
  };
}
