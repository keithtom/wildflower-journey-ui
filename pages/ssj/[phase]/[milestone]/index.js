import { useState } from "react";
import { styled, css } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";

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
import Task from "../../../../components/Task";
import CategoryChip from "../../../../components/CategoryChip";
import EffortChip from "../../../../components/EffortChip";
import PhaseChip from "../../../../components/PhaseChip";
import StatusChip from "../../../../components/StatusChip";
import Milestone from "../../../../components/Milestone";

const StyledMilestoneHeader = styled(Stack)`
  /* downplayed */
  ${(props) =>
    props.downplayed &&
    css`
      opacity: 0.5;
    `}
`;
const StyledMilestoneTasks = styled(Card)`
  /* downplayed */
  ${(props) =>
    props.downplayed &&
    css`
      opacity: 0.5;
    `}
`;

const MilestonePage = ({
  PhaseTitle,
  MilestoneTitle,
  FakeMilestoneTasks,
  FakeAlternativeMilestones,
}) => {
  const [completeModalOpen, setCompleteModalOpen] = useState(false);
  const [userIsEditing, setUserIsEditing] = useState(false);
  const isSensibleDefault = false;
  const isUpNext = false;

  const handleCompleteMilestone = () => {
    setCompleteModalOpen(true);
    //send data to backend
  };

  return (
    <PageContainer>
      <Stack spacing={12}>
        <Stack spacing={6}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Stack direction="row" spacing={2} alignItems="center">
                <Link href={`/ssj/${PhaseTitle}`}>
                  <IconButton>
                    <Icon type="chevronLeft" />
                  </IconButton>
                </Link>
                <Typography capitalize>{PhaseTitle}</Typography>
              </Stack>
            </Grid>
            <Grid item>
              {userIsEditing ? (
                <Stack spacing={1} direction="row">
                  <Button
                    variant="light"
                    onClick={() => setUserIsEditing(false)}
                  >
                    <Typography variant="bodyRegular">Cancel</Typography>
                  </Button>
                  <Button variant="primary">
                    <Typography variant="bodyRegular">Save</Typography>
                  </Button>
                </Stack>
              ) : (
                <Button variant="light" onClick={() => setUserIsEditing(true)}>
                  <Stack spacing={3} direction="row" alignItems="center">
                    <Icon type="pencil" size="small" />
                    <Typography variant="bodyRegular">Edit</Typography>
                  </Stack>
                </Button>
              )}
            </Grid>
          </Grid>
          {isUpNext && (
            <Card variant="primaryOutlined">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack>
                    <Typography variant="h3" bold>
                      Try something else first!
                    </Typography>
                    <Typography variant="bodyLarge" lightened>
                      Before completing this milestone, there are a few things
                      to work on first.
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={3}>
                    {FakeAlternativeMilestones.map((m, i) => (
                      <Milestone
                        link={`/ssj/${PhaseTitle}/${m.title}`}
                        key={i}
                        title={m.title}
                        effort={m.effort}
                        category={m.category}
                        assignee={m.assignee}
                        status={m.status}
                      />
                    ))}
                  </Stack>
                </Grid>
              </Grid>
            </Card>
          )}
          <StyledMilestoneHeader spacing={6} downplayed={isUpNext}>
            <Typography variant="h3" bold capitalize>
              {MilestoneTitle}
            </Typography>
            <Stack direction="row" spacing={6} alignItems="center">
              <Stack spacing={2}>
                <Typography variant="bodyMini" lightened bold>
                  STATUS
                </Typography>
                <StatusChip status="to do" size="small" withIcon />
              </Stack>
              <Stack spacing={2}>
                <Typography variant="bodyMini" lightened bold>
                  EFFORT
                </Typography>
                <EffortChip effort="Large" size="small" withIcon />
              </Stack>
              <Stack spacing={2}>
                <Typography variant="bodyMini" lightened bold>
                  PHASE
                </Typography>
                <PhaseChip phase="Discovery" size="small" withIcon />
              </Stack>
              <Stack spacing={2}>
                <Typography variant="bodyMini" lightened bold>
                  CATEGORY
                </Typography>
                <CategoryChip category="Finance" size="small" withIcon />
              </Stack>
              <Stack spacing={2}>
                <Typography variant="bodyMini" lightened bold>
                  ASSIGNEE
                </Typography>
                <Avatar size="mini" />
              </Stack>
              <Stack spacing={2}>
                <Typography variant="bodyMini" lightened bold>
                  AUTHOR
                </Typography>
                <Avatar size="mini" />
              </Stack>
            </Stack>
          </StyledMilestoneHeader>
        </Stack>

        <StyledMilestoneTasks downplayed={isUpNext}>
          <Stack spacing={3}>
            {userIsEditing ? (
              <>
                <NewTaskInput />
                {FakeMilestoneTasks &&
                  FakeMilestoneTasks.map((m, i) => (
                    <EditableTaskItem title={m.title} key={i} />
                  ))}
              </>
            ) : FakeMilestoneTasks ? (
              FakeMilestoneTasks.map((t, i) => (
                <Task
                  link={`/ssj/${PhaseTitle}/${MilestoneTitle}/${t.title}`}
                  title={t.title}
                  key={i}
                  isDecision={t.isDecision}
                  isNext={i === 2}
                  isLast={i + 1 === FakeMilestoneTasks.length}
                  isComplete={t.completed === true}
                  handleCompleteMilestone={handleCompleteMilestone}
                />
              ))
            ) : (
              <Card hoverable elevated size="small">
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Stack>
                      <Typography variant="bodyRegular" bold>
                        Looks like there are no tasks for this milestone.
                      </Typography>
                      <Typography variant="bodySmall" lightened>
                        Add a task to do in order to complete this milestone.
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item>
                    <Icon type="plus" variant="primary" />
                  </Grid>
                </Grid>
              </Card>
            )}
          </Stack>
        </StyledMilestoneTasks>

        {userIsEditing ? (
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Stack>
                <Typography variant="bodyRegular" bold>
                  {isSensibleDefault
                    ? "You can't delete this milestone."
                    : "Delete this milestone."}
                </Typography>
                <Typography variant="bodySmall" lightened>
                  {isSensibleDefault
                    ? "This is a default milestone and a key part of the SSJ."
                    : "Once you delete this milestone you can't retrieve it."}
                </Typography>
              </Stack>
            </Grid>
            <Grid item>
              <Button variant="danger" disabled={isSensibleDefault}>
                Delete milestone
              </Button>
            </Grid>
          </Grid>
        ) : null}
      </Stack>

      {completeModalOpen ? (
        <Modal
          title="Great work!"
          open={completeModalOpen}
          toggle={() => setCompleteModalOpen(!completeModalOpen)}
        >
          <Card variant="lightened" size="large">
            <Stack spacing={4} alignItems="center">
              <Stack direction="row" spacing={3} alignItems="center">
                <Icon type="flag" variant="primary" size="large" />
                <Typography variant="bodyLarge" bold highlight>
                  Milestone completed!
                </Typography>
              </Stack>
              <Typography variant="h2" bold>
                Name Your School
              </Typography>
              <Typography variant="bodyLarge" lightened center>
                You're making great progress!
              </Typography>
            </Stack>
          </Card>
        </Modal>
      ) : null}
    </PageContainer>
  );
};

export default MilestonePage;

const NewTaskInput = ({}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
    },
  });
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3} alignItems="center">
        <Grid item flex={1}>
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                label="Task to complete"
                placeholder="Add a task to do in order to complete this milestone"
                error={errors.title}
                helperText={
                  errors &&
                  errors.title &&
                  errors.title &&
                  "This field is required"
                }
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item>
          <IconButton type="submit" disabled={isSubmitting}>
            <Icon type="plus" />
          </IconButton>
        </Grid>
      </Grid>
    </form>
  );
};
const EditableTaskItem = ({ title }) => {
  return (
    <Grid container flexDirection="row" spacing={3} alignItems="center">
      <Grid item>
        <Icon type="dotsVertical" />
      </Grid>
      <Grid item flex={1}>
        <Card size="small" variant="lightened">
          <Typography varaint="bodyRegular">{title}</Typography>
        </Card>
      </Grid>
      <Grid item>
        <IconButton>
          <Icon type="close" />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export async function getServerSideProps({ query }) {
  const userId = query.userId;
  const ssjId = query.ssjId;
  // put the correct SSJ API route here
  // const apiRoute = `https://api.wildflowerschools.org/v1/advice/people/${userId}/decisions`;

  // const res = await fetch(apiRoute);
  // const data = await res.json();

  const PhaseTitle = query.phase;
  const MilestoneTitle = query.milestone;
  const FakeMilestoneTasks = [
    { title: "Complete WF School Name Research Document", completed: false },
    {
      title: "Complete advice process on your Name Research Document",
      completed: false,
    },
    {
      title:
        "Are you going to use the WF Group Exemption or file independently?",
      isDecision: true,
      completed: false,
    },
    {
      title:
        "Email your name and research document to support@wildflowerschools.org to confirm name selection",
      completed: false,
    },
  ];
  const FakeAlternativeMilestones = [
    {
      title: "Form your board",
      effort: "large",
      category: "Album Advice & Affiliation",
      assignee: "unassigned",
      status: "to do",
    },
    {
      title: "Get incorporated",
      effort: "large",
      category: "Album Advice & Affiliation",
      assignee: "unassigned",
      status: "to do",
    },
  ];

  return {
    props: {
      PhaseTitle,
      MilestoneTitle,
      FakeMilestoneTasks,
      FakeAlternativeMilestones,
    },
  };
}