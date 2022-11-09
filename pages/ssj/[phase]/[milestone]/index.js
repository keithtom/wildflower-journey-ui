import { useState } from "react";
import { styled, css } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import { Container, Draggable } from "react-smooth-dnd";
import { arrayMoveImmutable } from "array-move";

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
  MilestoneId,
  PhaseTitle,
  MilestoneTitle,
  MilestoneAttributes,
  MilestoneTasks,
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

  console.log("Tasks", MilestoneTasks);

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
              {MilestoneAttributes.status ? (
                <Stack spacing={2}>
                  <Typography variant="bodyMini" lightened bold>
                    STATUS
                  </Typography>
                  <StatusChip
                    status={MilestoneAttributes.status}
                    size="small"
                    withIcon
                  />
                </Stack>
              ) : null}
              {MilestoneAttributes.effort ? (
                <Stack spacing={2}>
                  <Typography variant="bodyMini" lightened bold>
                    EFFORT
                  </Typography>
                  <EffortChip
                    effort={MilestoneAttributes.effort}
                    size="small"
                    withIcon
                  />
                </Stack>
              ) : null}
              {MilestoneAttributes.category ? (
                <Stack spacing={2}>
                  <Typography variant="bodyMini" lightened bold>
                    CATEGORY
                  </Typography>
                  <CategoryChip
                    category={MilestoneAttributes.category}
                    size="small"
                    withIcon
                  />
                </Stack>
              ) : null}
              {MilestoneAttributes.assignee ? (
                <Stack spacing={2}>
                  <Typography variant="bodyMini" lightened bold>
                    ASSIGNEE
                  </Typography>
                  <Avatar size="mini" />
                </Stack>
              ) : null}
              {MilestoneAttributes.author ? (
                <Stack spacing={2}>
                  <Typography variant="bodyMini" lightened bold>
                    AUTHOR
                  </Typography>
                  <Avatar size="mini" />
                </Stack>
              ) : null}
            </Stack>
          </StyledMilestoneHeader>
        </Stack>

        <StyledMilestoneTasks downplayed={isUpNext}>
          <Stack spacing={3}>
            {userIsEditing ? (
              <>
                <NewTaskInput />
                <EditableTaskList tasks={FakeMilestoneTasks} />
              </>
            ) : MilestoneTasks ? (
              MilestoneTasks.map((t, i) => (
                <Task
                  link={`/ssj/${PhaseTitle}/${MilestoneId}/${t.id}`}
                  title={t.attributes.title}
                  key={i}
                  isDecision={t.attributes.kind === "decision"}
                  isNext={i === 2}
                  isLast={i + 1 === FakeMilestoneTasks.length}
                  isComplete={t.attributes.completed === true}
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
const EditableTaskItem = ({ title, isDraggable }) => {
  return (
    <Grid container flexDirection="row" spacing={3} alignItems="center">
      <Grid item>
        <Icon
          type="dotsVertical"
          className={isDraggable && "drag-handle"}
          hoverable={isDraggable}
          variant={!isDraggable && "lightened"}
        />
      </Grid>
      <Grid item flex={1}>
        <Card size="small" variant="lightened">
          <Typography varaint="bodyRegular">{title}</Typography>
        </Card>
      </Grid>
      <Grid item>
        <IconButton disabled={!isDraggable}>
          <Icon type="close" variant={!isDraggable && "lightened"} />
        </IconButton>
      </Grid>
    </Grid>
  );
};
const EditableTaskList = ({ tasks }) => {
  const [taskList, setTaskList] = useState(tasks);

  const onDrop = ({ removedIndex, addedIndex }) => {
    // console.log({ removedIndex, addedIndex });
    setTaskList((items) => arrayMoveImmutable(items, removedIndex, addedIndex));
  };
  return (
    <Container dragHandleSelector=".drag-handle" lockAxis="y" onDrop={onDrop}>
      {taskList &&
        taskList.map((t, i) => (
          <Draggable key={i}>
            <EditableTaskItem
              title={t.title}
              isDraggable={!t.isSensibleDefault}
            />
          </Draggable>
        ))}
    </Container>
  );
};

export async function getServerSideProps({ query }) {
  const MilestoneId = query.milestone;
  const apiRoute = `https://api.wildflowerschools.org/v1/workflow/processes/${MilestoneId}`;

  const res = await fetch(apiRoute);
  const data = await res.json();

  const Workflow = data.included.filter((i) => i.type === "workflow");
  const PhaseTitle = Workflow[0].attributes.name;
  const MilestoneTitle = data.data.attributes.title;
  const MilestoneAttributes = data.data.attributes;
  const MilestoneTasks = data.included.filter((i) => i.type === "step");

  const FakeMilestoneTasks = [
    {
      title: "Complete WF School Name Research Document",
      completed: false,
      isSensibleDefault: true,
    },
    {
      title: "Complete advice process on your Name Research Document",
      completed: false,
      isSensibleDefault: true,
    },
    {
      title:
        "Are you going to use the WF Group Exemption or file independently?",
      isDecision: true,
      completed: false,
      isSensibleDefault: true,
    },
    {
      title:
        "Email your name and research document to support@wildflowerschools.org to confirm name selection",
      completed: false,
      isSensibleDefault: false,
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
      MilestoneId,
      PhaseTitle,
      MilestoneTitle,
      MilestoneAttributes,
      MilestoneTasks,
      FakeMilestoneTasks,
      FakeAlternativeMilestones,
    },
  };
}
