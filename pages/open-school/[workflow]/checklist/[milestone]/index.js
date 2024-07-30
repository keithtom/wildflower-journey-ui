import { useRouter } from "next/router";
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
  Avatar,
  Button,
  PageContainer,
  Typography,
  Card,
  Stack,
  Icon,
  IconButton,
  Link,
  Modal,
  Grid,
  TextField,
} from "@ui";
import Task from "@components/Task";
import MilestonePageHead from "@components/MilestonePageHead";
import useMilestone from "@hooks/useMilestone";

const OpenSchoolMilestonePage = ({}) => {
  const router = useRouter();
  const { workflow, milestone: milestoneQuery } = router.query;

  const { milestone, isLoading } = useMilestone(milestoneQuery);

  const isUpNext = milestone?.attributes?.status === "up next";

  const sortedMilestoneTasks = milestone?.relationships?.steps?.data?.sort(
    (a, b) => (a.attributes.position > b.attributes.position ? 1 : -1)
  );

  const handleCompleteMilestone = () => {
    // setCompleteModalOpen(true);
    //send data to backend
    // ??? implement?
  };

  console.log({ milestone });

  return (
    <PageContainer>
      <Stack spacing={12}>
        <Grid container>
          <Grid item>
            <Stack direction="row" spacing={2} alignItems="center">
              <Link href={`/open-school/${workflow}/checklist`}>
                <IconButton>
                  <Icon type="chevronLeft" />
                </IconButton>
              </Link>
              <Typography capitalize>Back</Typography>
            </Stack>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <MilestonePageHead
              isLoading={isLoading}
              title={milestone?.attributes.title}
              description={milestone?.attributes.description}
              status={milestone?.attributes.status}
              categories={milestone?.attributes.categories}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <Card noPadding>
              <List
                subheader={
                  <Card variant="lightened" size="small" noRadius>
                    <Stack
                      direction="row"
                      spacing={5}
                      pl={1}
                      alignItems="center"
                    >
                      <Icon type="checkDouble" variant="primary" />
                      <Typography variant="bodyRegular" bold>
                        Tasks
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
                  sortedMilestoneTasks.map((t, i) => (
                    <Task
                      key={t.id}
                      task={t}
                      isLast={i + 1 === sortedMilestoneTasks.length}
                      isNext={isUpNext}
                      handleCompleteMilestone={handleCompleteMilestone}
                      categories={milestone.attributes.categories}
                    />
                  ))
                )}
              </List>
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </PageContainer>
  );
};

export default OpenSchoolMilestonePage;
