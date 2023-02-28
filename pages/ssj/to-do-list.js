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

const ToDoList = ({ dataAssignedSteps }) => {
  // console.log({ data });
  // console.log({ processByCategory });
  // console.log({ dataResources });
  // console.log({ dataAssignedSteps });
  // console.log(Object.keys(dataResources[0])[0]);

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
                // resources={t.data.relationships.documents.data}
                // includedDocuments={includedDocuments}
                // categories={m.attributes.categories}
                description={t.data.attributes.description}
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
  // const userId = query.userId;
  // const ssjId = query.ssjId;

  // const workflowId = "5947-ab7f"
  const workflowId = "c502-4f84";

  const apiRouteAssignedSteps = `${baseUrl}/v1/ssj/dashboard/assigned_steps?workflow_id=${workflowId}`;
  setAuthHeader({ req, res });
  const responseAssignedSteps = await axios.get(apiRouteAssignedSteps);
  const dataAssignedSteps = await responseAssignedSteps.data;

  return {
    props: {
      dataAssignedSteps,
    },
  };
}
