import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";
import { getCookie } from "cookies-next";

import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Skeleton,
} from "@mui/material";

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
import useAuth from "@lib/utils/useAuth";
import { useUserContext } from "@lib/useUserContext";

import useAssignedSteps from "@hooks/useAssignedSteps";
import useMilestones from "@hooks/useMilestones";

const OpenSchoolToDoList = ({}) => {
  const hero = "/assets/images/ssj/SelfManagement_hero.jpg";

  const router = useRouter();
  const { workflow } = router.query;
  const phase = getCookie("phase");

  const [teamAssignments, setTeamAssignments] = useState([]);

  const { currentUser, isOperationsGuide } = useUserContext();
  const { assignedSteps, isLoading, isError } = useAssignedSteps(workflow);
  const { milestonesToDo, isLoadingMilestonesToDo } = useMilestones(workflow, {
    phase,
    omit_include: true,
  });

  const removeStep = (taskId) => {
    const updatedSteps = assignedSteps.filter((step) => step.id !== taskId);
    mutate(`/api/${workflow}/assigned_steps`, updatedSteps, false);
  };

  useAuth("/login");

  console.log({ currentUser });
  // console.log({ assignedIsError });
  // console.log({ assignedIsLoading });
  console.log({ assignedSteps });
  // console.log({ steps });
  // console.log({ teamAssignments });

  return (
    <PageContainer>
      <Stack spacing={12} mb={12}>
        <Hero imageUrl={hero} />
        {isLoading ? (
          <Stack spacing={6}>
            <Skeleton width={240} height={48} />
            <Stack spacing={3}>
              {Array.from({ length: 5 }, (_, j) => (
                <Skeleton key={j} height={64} m={0} variant="rounded" />
              ))}
            </Stack>
          </Stack>
        ) : assignedSteps.length ? (
          <Card noPadding>
            <List
              subheader={
                <Card variant="lightened" size="small" noRadius>
                  <Stack direction="row" spacing={5} pl={1} alignItems="center">
                    <Icon type="calendarCheck" variant="primary" />
                    <Typography variant="bodyRegular" bold>
                      Your to do list
                    </Typography>
                  </Stack>
                </Card>
              }
            >
              {isLoading ? (
                <>
                  {Array.from({ length: 5 }, (_, j) => (
                    <ListItem>
                      <Skeleton width={240} height={24} />
                    </ListItem>
                  ))}
                </>
              ) : (
                assignedSteps?.map((step, i) => {
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
                })
              )}
            </List>
          </Card>
        ) : null}
      </Stack>
    </PageContainer>
  );
};

export default OpenSchoolToDoList;
