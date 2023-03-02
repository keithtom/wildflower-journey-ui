import { useState } from "react";

import {
  PageContainer,
  Typography,
  Card,
  Stack,
  Icon,
  IconButton,
  Link,
  Grid,
  Chip,
  Avatar,
  Divider,
} from "@ui";
import CategoryChip from "../../components/CategoryChip";
import Milestone from "../../components/Milestone";
import Task from "../../components/Task";
import Resource from "../../components/Resource";
import setAuthHeader from "../../lib/setAuthHeader";
import axios from "axios";
import baseUrl from "@lib/utils/baseUrl";

const ToDoList = ({
  includedDocuments,
  dataAssignedSteps,
  data,
  milestonesWithSelfAssignedTasks,
}) => {
  console.log({ dataAssignedSteps });
  console.log({ includedDocuments });
  console.log({ data });
  console.log({ milestonesWithSelfAssignedTasks });

  return (
    <PageContainer>
      <Stack spacing={12}>
        <Stack spacing={6} direction="row" alignItems="center">
          <Icon type="calendarCheck" variant="primary" size="large" />
          <Typography variant="h3" bold>
            Your to do list
          </Typography>
          <Typography variant="h3" lightened>
            {dataAssignedSteps[0].steps.length}
          </Typography>
        </Stack>

        {milestonesWithSelfAssignedTasks.map((m, i) =>
          m.relationships.steps.data.map((s, i) => <div>hi</div>)
        )}

        {dataAssignedSteps.map((a, i) => (
          <Stack>
            {a.steps.map((t, i) => (
              <Task
                taskId={t.data.id}
                // link={`/ssj/${phase}/${m.id}/${t.id}`}
                title={t.data.attributes.title}
                key={i}
                isDecision={t.data.attributes.kind === "Decision"}
                decisionOptions={t.data.attributes.decisionOptions}
                isComplete={t.data.attributes.completed}
                isNext={i === 0}
                // handleCompleteMilestone={handleCompleteMilestone}
                // categories={m.attributes.categories}
                description={t.data.attributes.description}
                resources={t.data.relationships.documents.data}
                includedDocuments={includedDocuments}
                worktime={
                  (t.data.attributes.maxWorktime +
                    t.data.attributes.minWorktime) /
                  2 /
                  60
                }
                taskAssignee={dataAssignedSteps[0].assignee_info}
              />
            ))}
          </Stack>
        ))}
      </Stack>
    </PageContainer>
  );
};

export default ToDoList;

export async function getServerSideProps({ req, res }) {
  const workflowId = "c502-4f84";
  const phase = "visioning";

  const apiRouteAssignedSteps = `${baseUrl}/v1/ssj/dashboard/assigned_steps?workflow_id=${workflowId}`;
  setAuthHeader({ req, res });
  const responseAssignedSteps = await axios.get(apiRouteAssignedSteps);
  const dataAssignedSteps = await responseAssignedSteps.data;

  const includedDocuments = {};
  dataAssignedSteps[0].steps.forEach((i) =>
    i.included
      .filter((i) => i.type === "document")
      .forEach((i) => {
        includedDocuments[i.id] = i;
      })
  );

  const apiRoute = `${baseUrl}/v1/workflow/workflows/${workflowId}/processes?phase=${phase}&self_assigned=true`;
  const response = await axios.get(apiRoute);
  const data = await response.data;
  const steps = {};
  var totalSteps = 0;
  data.included.forEach((included) => {
    if (included.type == "step") {
      steps[included.id] = included;
      totalSteps++;
    }
  });
  data.data.forEach((milestone) => {
    milestone.relationships.steps.data.forEach((includedStep, i) => {
      milestone.relationships.steps.data.splice(i, 1, steps[includedStep.id]);
    });
  });
  const milestonesWithSelfAssignedTasks = data.data;

  return {
    props: {
      data,
      milestonesWithSelfAssignedTasks,
      includedDocuments,
      dataAssignedSteps,
    },
  };
}
