import { useRouter } from "next/router";
import { useState } from "react";
import { styled, css } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import { Container, Draggable } from "react-smooth-dnd";
import { arrayMoveImmutable } from "array-move";
import setAuthHeader from "../../../../lib/setAuthHeader";
import processesApi from "@api/workflow/processes";

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

const MilestonePage = ({ FakeMilestoneTasks, milestone, includedData }) => {
  const milestoneAttributes = milestone.attributes;

  const [completeModalOpen, setCompleteModalOpen] = useState(false);
  const [userIsEditing, setUserIsEditing] = useState(false);
  const isSensibleDefault = false;
  const isUpNext = milestoneAttributes.status === "up next";

  const handleCompleteMilestone = () => {
    setCompleteModalOpen(true);
    //send data to backend
    // ??? implement?
  };
  const handleSaveEditedMilestone = () => {
    //updateMilestone
    setUserIsEditing(false);
  };

  var milestonePrerequisites = milestone.relationships.prerequisiteProcesses.data
  var milestoneTasks = milestone.relationships.steps.data
  
  const sortedMilestoneTasks = milestoneTasks.sort((a, b) =>
    a.attributes.position > b.attributes.position ? 1 : -1
  );

  const router = useRouter();
  const { phase } = router.query;

  return (
    <PageContainer>
      <Stack spacing={12}>
        <Stack spacing={8}>
          {isUpNext && (
            <Card variant="primaryOutlined">
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <Stack spacing={2}>
                    <Typography variant="h4" bold highlight>
                      Hold up! Try something else first.
                    </Typography>
                    <Typography variant="bodyLarge" lightened>
                      We don't think you're quite ready to work on this yet. Try
                      working on these other milestones first.
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={3}>
                    {milestonePrerequisites &&
                      milestonePrerequisites.map((m, i) => (
                        <Milestone
                          link={`/ssj/${phase}/${m.id}`}
                          key={i}
                          title={m.attributes.title}
                          description={m.attributes.description}
                          effort={m.attributes.effort}
                          categories={m.attributes.categories}
                          status={m.attributes.status}
                          stepCount={m.relationships.steps.data.length}
                        />
                      ))}
                  </Stack>
                </Grid>
              </Grid>
            </Card>
          )}
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Stack direction="row" spacing={2} alignItems="center">
                <Link href={`/ssj/${phase}`}>
                  <IconButton>
                    <Icon type="chevronLeft" />
                  </IconButton>
                </Link>
                <Typography capitalize>{phase}</Typography>
              </Stack>
            </Grid>
            {/* <Grid item>
              {userIsEditing ? (
                <Stack spacing={1} direction="row">
                  <Button
                    variant="light"
                    onClick={() => setUserIsEditing(false)}
                  >
                    <Typography variant="bodyRegular">Cancel</Typography>
                  </Button>
                  <Button variant="primary" onClick={handleSaveEditedMilestone}>
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
            </Grid> */}
          </Grid>

          <StyledMilestoneHeader spacing={8}>
            <Typography variant="h2" bold capitalize>
              {milestone.attributes.title}
            </Typography>
            <Typography variant="bodyLarge" lightened>
              {milestone.attributes.description}
            </Typography>
            <Stack direction="row" spacing={6} alignItems="center">
              {milestoneAttributes.status ? (
                <Stack spacing={2}>
                  <Typography variant="bodyMini" lightened bold>
                    STATUS
                  </Typography>
                  <StatusChip
                    status={milestoneAttributes.status}
                    size="small"
                    withIcon
                  />
                </Stack>
              ) : null}
              {milestoneAttributes.categories ? (
                <Stack spacing={2}>
                  <Typography variant="bodyMini" lightened bold>
                    CATEGORY
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    {milestoneAttributes.categories.map((m, i) => (
                      <CategoryChip
                        category={m}
                        size="small"
                        withIcon
                        key={i}
                      />
                    ))}
                  </Stack>
                </Stack>
              ) : null}

              {milestoneAttributes.author ? (
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

        <Stack>
          <Stack direction="row" spacing={3} alignItems="center">
            <Icon type="checkDouble" variant="primary" size="large" />
            <Typography variant="h4" bold>
              Tasks
            </Typography>
          </Stack>
          {userIsEditing ? (
            <>
              <NewTaskInput />
              <EditableTaskList tasks={FakeMilestoneTasks} />
            </>
          ) : sortedMilestoneTasks ? (
            sortedMilestoneTasks.map((t, i) => (
              <Task
                taskId={t.id}
                link={`/ssj/${phase}/${milestone.id}/${t.id}`}
                title={t.attributes.title}
                description={t.attributes.description}
                key={i}
                isDecision={t.attributes.kind === "Decision"}
                decisionOptions={t.attributes.decisionOptions}
                isLast={i + 1 === sortedMilestoneTasks.length}
                isNext={isUpNext}
                handleCompleteMilestone={handleCompleteMilestone}
                categories={milestoneAttributes.categories}
                taskAssignees={t.relationships.assignees}
                completionType={t.attributes.completionType}
                taskCompleters={t.relationships.completers}
                resources={t.relationships.documents.data}
                worktime={t.attributes.maxWorktime}
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
                {milestone.attributes.title}
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
      <Stack spacing={3}>
        {taskList &&
          taskList.map((t, i) => (
            <Draggable key={i}>
              <EditableTaskItem
                title={t.title}
                isDraggable={!t.isSensibleDefault}
              />
            </Draggable>
          ))}
      </Stack>
    </Container>
  );
};

export async function getServerSideProps({ query, req, res }) {
  const milestoneId = query.milestone;

  setAuthHeader({ req, res });
  const response = await processesApi.show(milestoneId)
  const data = response.data;
  const milestone = data.data;
  const includedData = data.included || [];

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

  return {
    props: {
      milestone,
      includedData,
      FakeMilestoneTasks,
    },
  };
}
