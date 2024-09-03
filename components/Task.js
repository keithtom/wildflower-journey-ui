import { useState, useEffect } from "react";
import { FormControlLabel, RadioGroup } from "@mui/material";
import { styled, css } from "@mui/material/styles";
import Router from "next/router";
import { mutate } from "swr";
import { useRouter } from "next/router";

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import {
  Typography,
  Grid,
  Box,
  Stack,
  Button,
  Icon,
  Chip,
  Avatar,
  Snackbar,
  Card,
  Radio,
  Badge,
  Divider,
} from "./ui";
import InfoDrawer from "./InfoDrawer";
import AssigneeRoster from "./AssigneeRoster";
import stepsApi from "@api/workflow/steps";
import usePerson from "@hooks/usePerson";
import useSchool from "@hooks/useSchool";
import useTeam from "@hooks/useTeam";
import { useUserContext } from "@lib/useUserContext";
import { clearLoggedInState } from "@lib/handleLogout";
import { handleFindMatchingItems } from "@lib/utils/usefulHandlers";

const StyledTask = styled(Box)`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.color.neutral.main};
  padding: ${({ theme }) => theme.util.buffer * 6}px 0;
  transition: all 0.15s ease;
  &:hover {
    background: ${({ theme }) => theme.color.neutral.lightened};
    transition: all 0.15s ease;
  }

  /* Small */
  ${(props) =>
    props.variant === "small" &&
    css`
      padding: ${props.theme.util.buffer * 2.5}px;
    `}

  &:last-child {
    border-bottom: none;
  }
  &:hover {
    cursor: pointer;
  }
`;

const Task = ({
  task,
  isLast,
  handleCompleteMilestone,
  categories,
  variant,
  removeStep,
  processName,
}) => {
  const { currentUser } = useUserContext();
  const router = useRouter();
  const { workflow, milestone } = router.query;

  let assignableUsers;
  // Fetch the current user's data
  const { data: person, isLoading: personIsLoading } = usePerson(
    currentUser?.id,
    { network: true }
  );
  // console.log({ person });
  // console.log({ currentUser });
  // Extract the school ID from the user's data
  const userSchoolId =
    person?.data?.relationships?.schools?.data?.[0]?.id || undefined;
  if (router.pathname.startsWith("/open-school/")) {
    // If the current route starts with '/open-school', fetch the school's data and use it to set assignableUsers
    const { data: school, isLoading: schoolIsLoading } =
      useSchool(userSchoolId);
    if (!schoolIsLoading) {
      assignableUsers = school?.included.filter((item) => {
        if (item.type === "person" && item.attributes.isOnboarded === true) {
          return school.included.some(
            (relationship) =>
              relationship.type === "schoolRelationship" &&
              relationship.relationships.person.data.id === item.id &&
              relationship.attributes.endDate === null
          );
        }
        return false;
      });
    }
  } else if (router.pathname.startsWith("/ssj/")) {
    // If the current route starts with '/ssj/', fetch the team's data and use it to set assignableUsers
    const teamId = currentUser?.attributes?.ssj?.teamId;
    const { team, isLoading: teamIsLoading } = useTeam(teamId);
    // set assignable users as partners
    if (!teamIsLoading) {
      assignableUsers = [
        ...(team?.data?.data?.relationships?.partners?.data || []),
      ];
    }
  }

  // Common interface that all invokations of Task should use.
  // Always call out the constants here and never directly pull from task.attributes in the UI; except unless you are setting default state in a useState hook.
  // If you have props that depend on where they are being called from, put them as inputs for Task

  // console.log({ task });
  // console.log({ assignableUsers });

  const taskId = task.id;
  const title = task.attributes.title;
  const description = task.attributes.description;
  const worktime = task.attributes.maxWorktime;

  const resources = task.relationships.documents.data;

  const [taskIsAssigned, setTaskIsAssigned] = useState(
    task?.relationships?.assignees?.data
      ? task?.relationships?.assignees?.data
      : null
  );

  const [taskIsAssignedToMe, setTaskIsAssignedToMe] = useState(
    task.attributes.isAssignedToMe
  );
  const [canAssignTask, setCanAssignTask] = useState(task.attributes.canAssign);
  const [canUnassignTask, setCanUnassignTask] = useState(
    task.attributes.canUnassign
  );
  const [taskAssignees, setTaskAssignees] = useState(
    task.relationships.assignees.data || []
  );

  const [taskIsComplete, setTaskIsComplete] = useState(
    task.attributes.isComplete
  );
  const [canCompleteTask, setCanCompleteTask] = useState(
    task.attributes.canComplete
  );
  const [canUncompleteTask, setCanUncompleteTask] = useState(
    task.attributes.canUncomplete
  );
  const [taskCompleters, setTaskCompleters] = useState(
    task.relationships.completers.data || []
  );
  const [completionType, setCompletionType] = useState(
    task.attributes.completionType
  );

  // default to a selected option if selected in assignments.
  const isDecision = task.attributes.isDecision;
  const decisionQuestion = task.attributes.decisionQuestion;
  const decisionOptions = task.relationships.decisionOptions?.data || [];
  const [isDecided, setIsDecided] = useState(task.attributes.isComplete);
  const [selectedDecisionOption, setDecisionOption] = useState(
    task.attributes.selectedOption
  ); // your selection

  const [infoDrawerOpen, setInfoDrawerOpen] = useState(false);
  const [assignToastOpen, setAssignToastOpen] = useState(false);
  const [unassignToastOpen, setUnassignToastOpen] = useState(false);

  // when the task is mutated, reset interface state
  useEffect(() => {
    setTaskIsAssigned(task?.relationships?.assignees?.data || null);
    setTaskIsAssignedToMe(task.attributes.isAssignedToMe);
    setCanAssignTask(task.attributes.canAssign);
    setCanUnassignTask(task.attributes.canUnassign);
    setTaskAssignees(task.relationships.assignees.data || []);
    setTaskIsComplete(task.attributes.isComplete);
    setCanCompleteTask(task.attributes.canComplete);
    setCanUncompleteTask(task.attributes.canUncomplete);
    setTaskCompleters(task.relationships.completers.data || []);
    setCompletionType(task.attributes.completionType);
    setIsDecided(task.attributes.isComplete);
  }, [task]);

  async function handleCompleteTask() {
    // api call, backend determiens state. needs spinner and error management.
    try {
      // if checking, complete, if unchecking, uncomplete.
      const response = await stepsApi.complete(taskId);
      const task = response.data.data;

      setInfoDrawerOpen(false);
      mutate(`/processes/${milestone}`);
      mutate(`/workflows/${workflow}/assigned_steps`);
      if (removeStep) {
        removeStep(taskId);
        mutate(`/processes/${milestone}`);
        mutate(`/workflows/${workflow}/assigned_steps`);
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        clearLoggedInState({});
        Router.push("/login");
      } else {
        console.error(error);
      }
    }

    if (isLast) {
      handleCompleteMilestone();
      setInfoDrawerOpen(false);
    }
  }
  async function handleUncompleteTask() {
    // api call, backend determiens state. needs spinner and error management.
    try {
      // if checking, complete, if unchecking, uncomplete.
      const response = await stepsApi.uncomplete(taskId);
      const task = response.data.data;

      mutate(`/processes/${milestone}`);
      mutate(`/workflows/${workflow}/assigned_steps`);
    } catch (err) {
      if (err?.response?.status === 401) {
        clearLoggedInState({});
        Router.push("/login");
      } else {
        console.error(err);
      }
    }
  }
  async function handleAssignUser(assigneeId) {
    try {
      const response = await stepsApi.assign(taskId, assigneeId);
      const task = response.data.data;
      mutate(`/processes/${milestone}`);
      mutate(`/workflows/${workflow}/assigned_steps`);
    } catch (err) {
      if (err?.response?.status === 401) {
        clearLoggedInState({});
        Router.push("/login");
      } else {
        console.error(err);
      }
    }
    setAssignToastOpen(true);
  }
  async function handleUnassignUser(assigneeId) {
    try {
      const response = await stepsApi.unassign(taskId, assigneeId);
      const task = response.data.data;
      mutate(`/processes/${milestone}`);
      mutate(`/workflows/${workflow}/assigned_steps`);
      if (removeStep) {
        removeStep(taskId);
        mutate(`/processes/${milestone}`);
        mutate(`/workflows/${workflow}/assigned_steps`);
      }
    } catch (err) {
      if (err?.response?.status === 401) {
        clearLoggedInState({});
        Router.push("/login");
      } else {
        console.error(err);
      }
    }
    setUnassignToastOpen(true);
  }
  async function handleMakeDecision() {
    try {
      const response = await stepsApi.selectOption(
        taskId,
        selectedDecisionOption
      );
      const task = response.data.data;

      mutate(`/processes/${milestone}`);
      mutate(`/workflows/${workflow}/assigned_steps`);
      setInfoDrawerOpen(false);

      if (removeStep) {
        removeStep(taskId);
        mutate(`/processes/${milestone}`);
        mutate(`/workflows/${workflow}/assigned_steps`);
      }
    } catch (err) {
      if (err?.response?.status === 401) {
        clearLoggedInState({});
        Router.push("/login");
      } else {
        console.error(err);
      }
    }
  }

  return (
    <>
      <ListItem
        disablePadding
        secondaryAction={
          <Stack direction="row" spacing={3} alignItems="center">
            {processName && <Chip label={processName} size="small" />}
            {assignableUsers ? (
              <AssigneeRoster
                handleAssignUser={handleAssignUser}
                handleUnassignUser={handleUnassignUser}
                assignableUsers={assignableUsers}
                assignees={taskAssignees}
                completers={taskCompleters}
                completionType={completionType}
              />
            ) : null}
          </Stack>
        }
      >
        <ListItemButton onClick={() => setInfoDrawerOpen(true)}>
          <ListItemIcon
            sx={{ minWidth: "48px", paddingLeft: "1px" }}
            children={
              isDecision ? (
                <Icon
                  type="zap"
                  variant={isDecided ? "primary" : "lightened"}
                />
              ) : (
                <Icon
                  type={taskIsComplete ? "checkCircle" : "circleSolid"}
                  variant={taskIsComplete ? "primary" : "lightest"}
                  className={
                    taskIsComplete ? "completedTask" : "uncompletedTask"
                  }
                />
              )
            }
          />
          <ListItemText>
            <Stack direction="row" spacing={3} alignItems="center">
              <Typography
                variant={variant === "small" ? "bodySmall" : "bodyRegular"}
                struck={isDecided || taskIsComplete}
                noWrap
              >
                {title}
              </Typography>
              {isDecision ? (
                <Chip
                  label={isDecided ? "Decided" : "Decision"}
                  size="small"
                  variant={isDecided && "primary"}
                />
              ) : null}
            </Stack>
          </ListItemText>
        </ListItemButton>
      </ListItem>

      <InfoDrawer
        open={infoDrawerOpen}
        toggle={() => setInfoDrawerOpen(!infoDrawerOpen)}
        assignees={taskAssignees}
        about={description}
        taskId={taskId}
        title={title}
        resources={resources}
        categories={categories}
        worktime={worktime}
        isDecision={isDecision}
        taskIsComplete={taskIsComplete}
        completers={taskCompleters}
        handleAssignUser={handleAssignUser}
        handleUnassignUser={handleUnassignUser}
        assignableUsers={assignableUsers}
        completionType={completionType}
        actions={
          isDecision ? (
            <DecisionDrawerActions
              completionType={completionType}
              assignableUsers={assignableUsers}
              taskIsAssigned={taskIsAssigned}
              taskIsAssignedToMe={taskIsAssignedToMe}
              isDecided={isDecided}
              decisionQuestion={decisionQuestion}
              decisionOptions={decisionOptions}
              selectedDecisionOption={selectedDecisionOption}
              setDecisionOption={setDecisionOption}
              canAssignTask={canAssignTask}
              canUnassignTask={canUnassignTask}
              handleAssignUser={handleAssignUser}
              handleUnassignUser={handleUnassignUser}
              handleMakeDecision={handleMakeDecision}
              taskCompleters={taskCompleters}
            />
          ) : (
            <TaskDrawerActions
              completionType={completionType}
              assignableUsers={assignableUsers}
              taskIsAssigned={taskIsAssigned}
              taskIsAssignedToMe={taskIsAssignedToMe}
              taskIsComplete={taskIsComplete}
              canAssignTask={canAssignTask}
              canUnassignTask={canUnassignTask}
              canCompleteTask={canCompleteTask}
              canUncompleteTask={canUncompleteTask}
              taskCompleters={taskCompleters}
              handleAssignUser={handleAssignUser}
              handleUnassignUser={handleUnassignUser}
              handleCompleteTask={handleCompleteTask}
              handleUncompleteTask={handleUncompleteTask}
            />
          )
        }
      />
      <TaskToast
        open={assignToastOpen}
        onClose={() => setAssignToastOpen(false)}
        isAssignToast={true}
        title={title}
        imageUrl={currentUser?.attributes?.imageUrl}
      />
      <TaskToast
        open={unassignToastOpen}
        onClose={() => setUnassignToastOpen(false)}
        isAssignToast={false}
        title={title}
        imageUrl={currentUser?.attributes?.imageUrl}
      />
    </>
  );
};

export default Task;

const DecisionDrawerActions = ({
  taskIsAssignedToMe,
  isDecided,
  decisionQuestion,
  decisionOptions,
  selectedDecisionOption,
  setDecisionOption,
  canAssignTask,
  canUnassignTask,
  handleAssignUser,
  handleUnassignUser,
  handleMakeDecision,
  taskCompleters,
  completionType,
}) => {
  const handleDecisionOptionChange = (e) => {
    setDecisionOption(e.target.value);
  };
  const { currentUser } = useUserContext();

  // what are the options for the step.  show that.
  // show hte currently selected decision?
  const showDecisionForm = taskIsAssignedToMe;
  // TODO: get task completers
  const completedBy = taskCompleters[0]; // just take the first since only used when its not me

  const StyledDecisionCard = styled(Card)`
    width: 100%;
    /* Disabled */
    ${(props) =>
      props.disabled &&
      css`
        opacity: 0.7;
        pointer-events: none;
      `};
  `;
  return (
    <Stack spacing={4}>
      {showDecisionForm ? (
        <Grid container>
          <StyledDecisionCard
            variant={isDecided ? "outlined" : "primaryOutlined"}
            disabled={isDecided}
          >
            <Stack spacing={6}>
              <Typography variant="bodyRegular" bold>
                {decisionQuestion}
              </Typography>
              <RadioGroup value={selectedDecisionOption}>
                {decisionOptions.map((o, i) => (
                  <FormControlLabel
                    key={o.id}
                    value={o.id}
                    control={<Radio disabled={isDecided} />}
                    label={o.attributes.description}
                    onChange={handleDecisionOptionChange}
                  />
                ))}
              </RadioGroup>
            </Stack>
          </StyledDecisionCard>
        </Grid>
      ) : null}

      <Grid container spacing={6}>
        {taskIsAssignedToMe ? (
          isDecided ? (
            <Grid item xs={12}>
              <Card variant="lightened">
                <Stack spacing={3}>
                  <Stack direction="row" spacing={3} alignItems="center">
                    <Icon type="check" variant="primary" />
                    <Typography variant="bodyLarge" bold highlight>
                      Decision made!
                    </Typography>
                  </Stack>
                  <Typography variant="bodyRegular">
                    You can't easily change this, but if you must, please reach
                    out to support@wildflowerschools.org
                  </Typography>
                </Stack>
              </Card>
            </Grid>
          ) : (
            <>
              <Grid item xs={12}>
                <Card size="small" variant="lightened">
                  <Grid container spacing={3} alignItems="center">
                    <Grid item>
                      <Icon type="commentError" variant="primary" />
                    </Grid>
                    <Grid item flex={1}>
                      <Typography variant="bodySmall">
                        If you'd like to change this decision, please email
                        support@wildflowerschools.org.
                      </Typography>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Button
                  full
                  variant="text"
                  disabled={!canUnassignTask}
                  onClick={() => handleUnassignUser(currentUser?.id)}
                >
                  <Typography bold variant="bodyRegular">
                    Remove from to do list
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  full
                  disabled={!selectedDecisionOption}
                  onClick={handleMakeDecision}
                >
                  <Typography bold variant="bodyRegular">
                    Make final decision
                  </Typography>
                </Button>
              </Grid>
            </>
          )
        ) : (
          <Grid item xs={12}>
            {isDecided ? (
              <Button full disabled={true}>
                <Typography bold>
                  Decided by {completedBy?.attributes?.firstName}{" "}
                  {completedBy?.attributes?.lastName}
                </Typography>
              </Button>
            ) : (
              <Button
                full
                disabled={!canAssignTask}
                onClick={() => handleAssignUser(currentUser?.id)}
              >
                <Typography light bold variant="bodyRegular">
                  Add to my to do list
                </Typography>
              </Button>
            )}
          </Grid>
        )}
      </Grid>
    </Stack>
  );
};

const TaskDrawerActions = ({
  taskIsAssigned,
  taskIsAssignedToMe,
  taskIsComplete,
  canAssignTask,
  canUnassignTask,
  canCompleteTask,
  canUncompleteTask,
  taskCompleters,
  handleAssignUser,
  handleUnassignUser,
  handleCompleteTask,
  handleUncompleteTask,
  completionType,
}) => {
  const { currentUser } = useUserContext();
  // const completedBy = taskCompleters[0]; // just take the first since only used when its not me
  // NOTE: canUncompleteTask is not the same as "Completed by me" because sometimes we can't uncomplete a step because the process is completed even though we completed the step.
  console.log({ taskCompleters });

  return (
    <Grid container spacing={4}>
      {taskIsComplete ? (
        // the task is complete by someone
        taskIsAssignedToMe ? (
          canCompleteTask ? (
            // the task is complete, assigned to me, and I can still complete it
            <>
              <Grid item xs={6}>
                <Button
                  full
                  variant="danger"
                  onClick={() => handleUnassignUser(currentUser?.id)}
                >
                  <Typography variant="bodyRegular" bold>
                    Remove from to do list
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button full onClick={handleCompleteTask}>
                  <Typography variant="bodyRegular" light bold>
                    Mark task complete
                  </Typography>
                </Button>
              </Grid>
            </>
          ) : canUncompleteTask ? (
            // the task is complete, assigned to me, I can't complete it, and I can uncomplete it
            <Grid item xs={12}>
              <Button full variant="danger" onClick={handleUncompleteTask}>
                <Typography bold>Mark incomplete</Typography>
              </Button>
            </Grid>
          ) : (
            // the task is complete, assigned to me, I can't complete it, and I can't uncomplete it
            // TODO: in this scenario, the task should be unassigned from the person that can't complete it
            <Grid item xs={12}>
              <Button full variant="danger" disabled>
                <Typography bold>
                  {`Completed by ${taskCompleters.map(
                    (completer, i) =>
                      `${completer.attributes.firstName} ${completer.attributes.lastName}`
                  )}`}
                </Typography>
              </Button>
            </Grid>
          )
        ) : // the task is complete, not assigned to me
        canAssignTask ? (
          // the task is complete, not assigned to me, and I can assign it
          canCompleteTask ? (
            <>
              <Grid item xs={6}>
                <Button
                  variant="lightened"
                  full
                  disabled={!canAssignTask}
                  onClick={() => handleAssignUser(currentUser?.id)}
                >
                  <Typography bold variant="bodyRegular">
                    Add to my to do list
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  full
                  disabled={!canAssignTask}
                  onClick={handleCompleteTask}
                >
                  <Typography light bold variant="bodyRegular">
                    Mark task complete
                  </Typography>
                </Button>
              </Grid>
            </>
          ) : (
            <div>?</div>
          )
        ) : (
          // the task is complete, not assigned to me, but I can't assign it
          <Grid item xs={12}>
            <Button full variant="danger" disabled>
              <Typography bold>
                {`Completed by ${taskCompleters.map(
                  (completer, i) =>
                    `${completer.attributes.firstName} ${completer.attributes.lastName}`
                )}`}
              </Typography>
            </Button>
          </Grid>
        )
      ) : // the task is not complete
      taskIsAssigned ? (
        // the task is not complete, and is assigned to someone
        taskIsAssignedToMe ? (
          // the task is not complete, and it is assigned to me
          canUnassignTask ? (
            // the task is not complete, and it is assigned to me, and I can unassign it
            <>
              <Grid item xs={6}>
                <Button
                  full
                  variant="danger"
                  onClick={() => handleUnassignUser(currentUser?.id)}
                >
                  <Typography variant="bodyRegular" bold>
                    Remove from to do list
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button full onClick={handleCompleteTask}>
                  <Typography variant="bodyRegular" light bold>
                    Mark task complete
                  </Typography>
                </Button>
              </Grid>
            </>
          ) : (
            // the task is not complete, and it is assigned to me, and I can't unassign it
            <div>?</div>
          )
        ) : (
          // the task is not complete, and it isn't assigned to me
          <>
            <Grid item xs={6}>
              <Button
                variant="lightened"
                full
                disabled={!canAssignTask}
                onClick={() => handleAssignUser(currentUser?.id)}
              >
                <Typography bold variant="bodyRegular">
                  Add to my to do list
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                full
                disabled={!canAssignTask}
                onClick={handleCompleteTask}
              >
                <Typography light bold variant="bodyRegular">
                  Mark task complete
                </Typography>
              </Button>
            </Grid>
          </>
        )
      ) : // the task is not complete, and isn't assigned to anyone
      canAssignTask ? (
        // the task is not complete, and isn't assigned to anyone, and I can assign it
        <>
          <Grid item xs={6}>
            <Button
              variant="lightened"
              full
              onClick={() => handleAssignUser(currentUser?.id)}
            >
              <Typography bold variant="bodyRegular">
                Add to my to do list
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button full onClick={handleCompleteTask}>
              <Typography light bold variant="bodyRegular">
                Mark task complete
              </Typography>
            </Button>
          </Grid>
        </>
      ) : (
        // the task is not complete, and isn't assigned to anyone, and I can't assign it
        <>
          <Grid item xs={6}>
            <Button
              variant="lightened"
              full
              disabled
              onClick={() => handleAssignUser(currentUser?.id)}
            >
              <Typography bold variant="bodyRegular">
                Add to my to do list
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button full disabled onClick={handleCompleteTask}>
              <Typography light bold variant="bodyRegular">
                Mark task complete
              </Typography>
            </Button>
          </Grid>
        </>
      )}
      {/* {taskIsAssignedToMe ? (
        taskIsComplete ? (
          canUncompleteTask ? (
            <Grid item xs={12}>
              <Button full variant="danger" onClick={handleUncompleteTask}>
                <Typography bold>Mark incomplete</Typography>
              </Button>
            </Grid>
          ) : (
            // cannot uncomplete task
            <Grid item xs={12}>
              <Button full variant="danger" disabled>
                <Typography bold>
                  {`Completed by ${
                    completedBy && completedBy.attributes.firstName
                  } ${completedBy && completedBy.attributes.lastName}`}
                </Typography>
              </Button>
            </Grid>
          )
        ) : (
          <>
            <Grid item xs={6}>
              <Button
                full
                variant="danger"
                disabled={!canUnassignTask}
                onClick={() => handleUnassignUser(currentUser?.id)}
              >
                <Typography variant="bodyRegular" bold>
                  Remove from to do list
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                full
                disabled={!canCompleteTask}
                onClick={handleCompleteTask}
              >
                <Typography variant="bodyRegular" light bold>
                  Mark task complete
                </Typography>
              </Button>
            </Grid>
          </>
        )
      ) : (
        // TODO: don't let someone assign a completed task (collaborative task)
        <Grid item xs={12}>
          {taskIsComplete ? (
            <Button full disabled={true}>
              <Typography bold>
                Completed by {completedBy?.attributes?.firstName}{" "}
                {completedBy?.attributes?.lastName}
              </Typography>
            </Button>
          ) : (
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Button
                  variant="lightened"
                  full
                  disabled={!canAssignTask}
                  onClick={() => handleAssignUser(currentUser?.id)}
                >
                  <Typography bold variant="bodyRegular">
                    Add to my to do list
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  full
                  disabled={!canAssignTask}
                  onClick={handleCompleteTask}
                >
                  <Typography light bold variant="bodyRegular">
                    Mark task complete
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      )} */}
    </Grid>
  );
};

const TaskToast = ({ isAssignToast, open, onClose, title, imageUrl }) => {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <div>
        <Card size="small" variant="primaryOutlined" sx={{ width: "320px" }}>
          <Stack spacing={1}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="bodySmall" lightened>
                  TASK {isAssignToast ? "ADDED" : "REMOVED"}
                </Typography>
              </Grid>
              <Grid item>
                <Icon type="close" hoverable onClick={onClose} />
              </Grid>
            </Grid>
            <Typography variant="bodyRegular" bold>
              {title}
            </Typography>
            <Stack direction="row" spacing={3} alignItems="center">
              {/* // TODO: becomes current user */}
              <Avatar size="mini" src={imageUrl} />
              <Stack direction="row" spacing={1}>
                <Typography variant="bodySmall">You</Typography>
                <Typography variant="bodySmall" lightened>
                  {isAssignToast ? "added" : "removed"}
                </Typography>
                <Typography variant="bodySmall">this task</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Card>
      </div>
    </Snackbar>
  );
};
