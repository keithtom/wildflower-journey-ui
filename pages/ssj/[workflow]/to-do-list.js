import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";
import { getCookie } from "cookies-next";
import { List, ListItem, Skeleton } from "@mui/material";

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

const ToDoList = ({}) => {
  const hero = "/assets/images/ssj/SelfManagement_hero.jpg";

  const router = useRouter();
  const { workflow } = router.query;
  const phase = getCookie("phase");

  const [teamAssignments, setTeamAssignments] = useState([]);

  const { currentUser, isOperationsGuide } = useUserContext();
  const { assignedSteps, isLoading } = useAssignedSteps(workflow, {
    current_user: isOperationsGuide ? null : true,
  });
  const { milestonesToDo, isLoadingMilestonesToDo } = useMilestones(workflow, {
    phase,
    omit_include: true,
  });

  const removeStep = (taskId) => {
    const updatedSteps = assignedSteps.filter((step) => step.id !== taskId);
    mutate(`/api/${workflow}/assigned_steps`, updatedSteps, false);
  };

  useAuth("/login");

  // console.log({ assignedIsError });
  // console.log({ assignedIsLoading });
  // console.log({ assignedSteps });
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
        ) : teamAssignments.length ? (
          teamAssignments?.map((t, i) => (
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
                {t.assignments?.map((step, i) => {
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
                        ? "Next time you meet with them help them add a task to their to do list."
                        : "To start, add a task from one of these milestones. You can take them on at your own pace, according to your interests, needs, and timeline."}
                    </Typography>
                  </Stack>
                </Card>
              </Grid>
              {!isOperationsGuide ? (
                <Grid item xs={12} sm={6}>
                  <Card
                    noBorder
                    variant="lightened"
                    noRadius
                    sx={{ height: "100%" }}
                  >
                    {isLoadingMilestonesToDo ? (
                      <Stack spacing={2}>
                        {Array.from({ length: 3 }, (_, j) => (
                          <Skeleton
                            key={j}
                            height={48}
                            m={0}
                            variant="rounded"
                          />
                        ))}
                      </Stack>
                    ) : (
                      <Stack spacing={2}>
                        {milestonesToDo?.map((m, i) => (
                          <Link
                            href={`/ssj/${workflow}/${m.attributes.phase}/${m.id}`}
                            key={i}
                          >
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
                    )}
                  </Card>
                </Grid>
              ) : null}
            </Grid>
          </Card>
        )}
      </Stack>
    </PageContainer>
  );
};

export default ToDoList;
