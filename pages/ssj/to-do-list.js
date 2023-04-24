import { useEffect, useState } from "react";
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
import Task from "../../components/Task";
import Hero from "../../components/Hero";
import setAuthHeader from "../../lib/setAuthHeader";
import axios from "axios";
import baseUrl from "@lib/utils/baseUrl";
import { getCookie } from "cookies-next";

const ToDoList = ({
  includedDocuments,
  includedProcess,
  dataAssignedSteps,
  milestonesToDo,
}) => {
  const [assignedSteps, setAssignedSteps] = useState(
    dataAssignedSteps.length ? dataAssignedSteps[0].steps : []
  );

  const removeStep = (taskId) => {
    setTimeout(() => {
      const array = assignedSteps.slice();
      const taskToRemove = array.map((e) => e.data.id);
      const indexTasks = taskToRemove.indexOf(taskId);
      array.splice(indexTasks, 1);
      setAssignedSteps(array);
    }, 1500);
  };

  const hero = "/assets/images/ssj/SelfManagement_hero.jpg";

  // console.log({ dataAssignedSteps });
  // console.log({ assignedSteps });
  // console.log({ includedProcess });
  // console.log({ includedDocuments });

  return (
    <PageContainer
      isLoading={
        !dataAssignedSteps ||
        !milestonesToDo ||
        !includedProcess ||
        !includedDocuments
      }
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
            {assignedSteps.map((t, i) => {
              const processId = t.included.filter(
                (i) => i.type === "process"
              )[0].id;
              return (
                <Task
                  taskId={t.data.id}
                  title={t.data.attributes.title}
                  key={t.data.id}
                  isDecision={t.data.attributes.kind === "Decision"}
                  decisionOptions={t.data.attributes.decisionOptions}
                  isComplete={t.data.attributes.completed}
                  isNext={i === 0}
                  description={t.data.attributes.description}
                  resources={t.data.relationships.documents.data}
                  includedDocuments={includedDocuments}
                  processName={includedProcess[processId].attributes.title}
                  worktime={
                    (t.data.attributes.maxWorktime +
                      t.data.attributes.minWorktime) /
                    2 /
                    60
                  }
                  taskAssignee={dataAssignedSteps[0].assignee_info}
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
  const workflowId = getCookie("workflowId", { req, res });
  const phase = getCookie("phase", { req, res });
  const apiRouteAssignedSteps = `${process.env.API_URL}/v1/ssj/dashboard/assigned_steps?workflow_id=${workflowId}`;
  setAuthHeader({ req, res });
  const responseAssignedSteps = await axios.get(apiRouteAssignedSteps);
  const dataAssignedSteps = await responseAssignedSteps.data;
  const includedDocuments = {};
  dataAssignedSteps[0]?.steps.forEach((i) =>
    i.included
      .filter((i) => i.type === "document")
      .forEach((i) => {
        includedDocuments[i.id] = i;
      })
  );
  const includedProcess = {};
  dataAssignedSteps[0]?.steps.forEach((i) =>
    i.included
      .filter((i) => i.type === "process")
      .forEach((i) => {
        includedProcess[i.id] = i;
      })
  );

  const apiRouteMilestones = `${process.env.API_URL}/v1/workflow/workflows/${workflowId}/processes?phase=${phase}`;
  const responseMilestones = await axios.get(apiRouteMilestones);
  const dataMilestones = await responseMilestones.data;
  const milestonesToDo = [];
  dataMilestones.data.forEach((milestone) => {
    if (milestone.attributes.status == "to do") {
      milestonesToDo.push(milestone);
    }
  });

  return {
    props: {
      includedDocuments,
      includedProcess,
      dataAssignedSteps,
      milestonesToDo,
    },
  };
}
