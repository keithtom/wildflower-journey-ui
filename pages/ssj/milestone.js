import { useState } from "react";
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
  Chip,
  Modal,
  Grid,
  TextField,
} from "@ui";
import Task from "../../components/Task";
import CategoryChip from "../../components/CategoryChip";
import EffortChip from "../../components/EffortChip";
import PhaseChip from "../../components/PhaseChip";
import StatusChip from "../../components/StatusChip";

const MilestonePage = ({}) => {
  const [completeModalOpen, setCompleteModalOpen] = useState(false);
  const [userIsEditing, setUserIsEditing] = useState(false);
  const isSensibleDefault = false;

  return (
    <PageContainer>
      <Stack spacing={12}>
        <Stack spacing={3}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Stack direction="row" spacing={2} alignItems="center">
                <Link href="/ssj/discovery">
                  <IconButton>
                    <Icon type="chevronLeft" />
                  </IconButton>
                </Link>
                <Typography>Discovery</Typography>
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
          <Typography variant="h3" bold>
            Name Your School
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
        </Stack>

        <Card>
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
              FakeMilestoneTasks.map((m, i) => (
                <Task
                  title={m.title}
                  key={i}
                  isDecision={m.isDecision}
                  isNext={i === 2}
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
        </Card>

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

const FakeMilestoneTasks = [
  { title: "Complete WF School Name Research Document" },
  { title: "Complete advice process on your Name Research Document" },
  {
    title: "Are you going to use the WF Group Exemption or file independently?",
    isDecision: true,
  },
  {
    title:
      "Email your name and research document to support@wildflowerschools.org to confirm name selection",
  },
];

const NewTaskInput = ({}) => {
  const [taskTitle, setTaskTitle] = useState("");
  const handleTaskTitleChange = (event) => {
    setTaskTitle(event.target.value);
  };

  return (
    <Grid container flexDirection="row" spacing={3} alignItems="center">
      <Grid item flex={1}>
        <TextField
          label="Task to complete"
          placeholder="Add a task to do in order to complete this milestone"
          value={taskTitle}
          onChange={handleTaskTitleChange}
        />
      </Grid>
      <Grid item>
        <IconButton>
          <Icon type="plus" />
        </IconButton>
      </Grid>
    </Grid>
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
