import { useState } from "react";
import { FormControlLabel, RadioGroup } from "@mui/material";
import { styled, css } from "@mui/material/styles";
import stepsApi from "@api/workflow/steps";
import { useUserContext } from "@lib/useUserContext";

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
} from "./ui";
import InfoDrawer from "./InfoDrawer";

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
  processName
}) => {
  const { currentUser } = useUserContext(); // why doesn't this work?
  
  // Common interface that all invokations of Task should use.
  // Always call out the constants here and never directly pull from task.attributes in the UI; except unless you are setting default state in a useState hook.
  // If you have props that depend on where they are being called from, put them as inputs for Task
  
  const taskId = task.id;
  const title = task.attributes.title;
  const description = task.attributes.description;
  const worktime = task.attributes.maxWorktime;

  const resources = task.relationships.documents.data;

  const [taskIsAssignedToMe, setTaskIsAssignedToMe] = useState(task.attributes.isAssignedToMe);
  const [canAssignTask, setCanAssignTask] = useState(task.attributes.canAssign);
  const [canUnassignTask, setCanUnassignTask] = useState(task.attributes.canUnassign);
  const [taskAssignees, setTaskAssignees] = useState(task.relationships.assignees.data || []);
  
  const [taskIsComplete, setTaskIsComplete] = useState(task.attributes.isComplete);
  const [canCompleteTask, setCanCompleteTask] = useState(task.attributes.canComplete);
  const [canUncompleteTask, setCanUncompleteTask] = useState(task.attributes.canUncomplete);
  const [taskCompleters, setTaskCompleters] = useState(task.relationships.completers.data || []);
    
  // default to a selected option if selected in assignments.
  const isDecision = task.attributes.isDecision;
  const decisionQuestion = task.attributes.decisionQuestion;
  const decisionOptions = task.relationships.decisionOptions?.data || [];
  const [isDecided, setIsDecided] = useState(task.attributes.isComplete);
  const [selectedDecisionOption, setDecisionOption] = useState(task.attributes.selectedOption); // your selection
  
  const [infoDrawerOpen, setInfoDrawerOpen] = useState(false);
  const [assignToastOpen, setAssignToastOpen] = useState(false);
  const [unassignToastOpen, setUnassignToastOpen] = useState(false);
  
  
  async function handleCompleteTask() {
    // api call, backend determiens state. needs spinner and error management.
    try {
      // if checking, complete, if unchecking, uncomplete.
      const response = await stepsApi.complete(taskId);
      const task = response.data.data
      
      setTaskIsAssignedToMe(task.attributes.isAssignedToMe);
      setCanAssignTask(task.attributes.canAssign);
      setCanUnassignTask(task.attributes.canUnassign);
      setTaskAssignees(task.relationships.assignees.data || []);
 
      setTaskIsComplete(task.attributes.isComplete);
      setCanCompleteTask(task.attributes.canComplete);
      setCanUncompleteTask(task.attributes.canUncomplete);
      setTaskCompleters(task.relationships.completers.data || []);
      
      setInfoDrawerOpen(false);
      if (removeStep) {
        removeStep(taskId);
      }
    } catch (err) {
      console.error(err);
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
      const task = response.data.data
      
      setTaskIsAssignedToMe(task.attributes.isAssignedToMe);
      setCanAssignTask(task.attributes.canAssign);
      setCanUnassignTask(task.attributes.canUnassign);
      setTaskAssignees(task.relationships.assignees.data || []); // we use assignee.attributes.completedAt in InfoDrawer for the checkmark

      setTaskIsComplete(task.attributes.isComplete);
      setCanCompleteTask(task.attributes.canComplete);
      setCanUncompleteTask(task.attributes.canUncomplete);
      setTaskCompleters(task.relationships.completers.data || []);
    } catch (err) {
      console.error(err);
    }
  }
  async function handleAssignUser() {
    try {
      const response = await stepsApi.assign(taskId);
      const task = response.data.data
      
      setTaskIsAssignedToMe(task.attributes.isAssignedToMe);
      setCanAssignTask(task.attributes.canAssign);
      setCanUnassignTask(task.attributes.canUnassign);
      
      setTaskAssignees(task.relationships.assignees.data || []);
    } catch (err) {
      console.error(err);
    }
    setAssignToastOpen(true);
  }
  async function handleUnassignUser() {
    try {
      const response = await stepsApi.unassign(taskId);
      const task = response.data.data
      
      setTaskIsAssignedToMe(task.attributes.isAssignedToMe);
      setCanAssignTask(task.attributes.canAssign);
      setCanUnassignTask(task.attributes.canUnassign);
      setTaskAssignees(task.relationships.assignees.data || []);

      setInfoDrawerOpen(false);
      
      if (removeStep) {
        removeStep(taskId);
      }
    } catch (err) {
      console.error(err);
    }
    setUnassignToastOpen(true);
  }
  async function handleMakeDecision() {
    const response = await stepsApi.selectOption(taskId, selectedDecisionOption);
    const task = response.data.data

    setTaskIsAssignedToMe(task.attributes.isAssignedToMe);
    setCanAssignTask(task.attributes.canAssign);
    setCanUnassignTask(task.attributes.canUnassign);
    setTaskAssignees(task.relationships.assignees.data || []);

    setTaskIsComplete(task.attributes.isComplete);
    setCanCompleteTask(task.attributes.canComplete);
    setCanUncompleteTask(task.attributes.canUncomplete);
    setTaskCompleters(task.relationships.completers.data || []);

    setIsDecided(true);
  }

  return (
    <>
      <StyledTask onClick={() => setInfoDrawerOpen(true)} variant={variant}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid
            item
            flex={1}
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: 0,
            }}
          >
            <Stack direction="row" spacing={4} alignItems="center">
              {isDecision ? (
                <>
                  <Icon
                    type="zap"
                    variant={isDecided ? "primary" : "lightened"}
                  />
                  <Chip
                    label={isDecided ? "Decided" : "Decision"}
                    size="small"
                    variant={isDecided && "primary"}
                  />
                  <Typography
                    variant={variant === "small" ? "bodyRegular" : "bodyLarge"}
                    struck={isDecided}
                    bold
                  >
                    {title}
                  </Typography>
                </>
              ) : (
                <Stack direction="row" spacing={4} alignItems="center">
                  <Icon
                    type={taskIsComplete ? "checkCircle" : "circleSolid"}
                    variant={taskIsComplete ? "primary" : "lightest"}
                  />
                  <Typography
                    variant={variant === "small" ? "bodyRegular" : "bodyLarge"}
                    bold
                    struck={taskIsComplete}
                  >
                    {title}
                  </Typography>
                </Stack>
              )}
            </Stack>
          </Grid>
          {/* {isNext && (
            <Grid item mr={2}>
              <Button small>
                <Typography light variant="bodySmall">
                  Start
                </Typography>
              </Button>
            </Grid>
          )} */}
          <Grid item>
            <Stack direction="row" spacing={3} alignItems="center">
              {processName && <Chip label={processName} size="small" />}
              { taskAssignees && taskAssignees.map((assignee) => (
                <Avatar key={assignee.id} size="mini" src={assignee?.attributes?.imageUrl} />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </StyledTask>
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
        actions={
          isDecision ? (
            <DecisionDrawerActions
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
}) => {
  const handleDecisionOptionChange = (e) => {
    setDecisionOption(e.target.value);
  };

  // what are the options for the step.  show that.
  // show hte currently selected decision?
  const showDecisionForm =  taskIsAssignedToMe;
  // TODO: get task completers
  const completedBy = taskCompleters[0]; // just take the first since only used when its not me

  const StyledDecisionCard = styled(Card)`
    /* Disabled */
    ${(props) =>
      props.disabled &&
      css`
        opacity: 0.7;
        pointer-events: none;
      `}
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
              <RadioGroup value={selectedDecisionOption} handleOptionsChange>
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
                <Button full variant="text" disabled={!canUnassignTask} onClick={handleUnassignUser}>
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
            { isDecided ? (
              <Button full disabled={true}>
                <Typography bold>
                  Decided by {completedBy?.attributes?.firstName} {completedBy?.attributes?.lastName}
                </Typography>
              </Button>
           ) : (
              <Button full disabled={!canAssignTask} onClick={handleAssignUser}>
                <Typography light bold>
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
}) => {
  const completedBy = taskCompleters[0]; // just take the first since only used when its not me
  // NOTE: canUncompleteTask is not the same as "Completed by me" because sometimes we can't uncomplete a step because the process is completed even though we completed the step.
  
  // is it assigned ot me, 
  return (
    <Grid container spacing={4}>
      {taskIsAssignedToMe ? (
        taskIsComplete ? (
          <>
            <Grid item xs={12}>
              <Button
                full
                variant="danger"
                disabled={!canUncompleteTask}
                onClick={handleUncompleteTask}
              >
                <Typography bold>
                  {canUncompleteTask
                    ? "Mark incomplete"
                    : `Completed by ${completedBy && completedBy.attributes.firstName} ${completedBy && completedBy.attributes.lastName}`}
                </Typography>
              </Button>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={6}>
              <Button full variant="text" disabled={!canUnassignTask} onClick={handleUnassignUser}>
                <Typography variant="bodyRegular" bold>
                  Remove from to do list
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button full disabled={!canCompleteTask} onClick={handleCompleteTask}>
                <Typography variant="bodyRegular" light bold>
                  Mark task complete
                </Typography>
              </Button>
            </Grid>
          </>
        )
      ) : ( // TODO: don't let someone assign a completed task (collaborative task)
        <Grid item xs={12}>
            { taskIsComplete ? (
              <Button full disabled={true}>
                <Typography bold>
                  Completed by {completedBy?.attributes?.firstName} {completedBy?.attributes?.lastName}
                </Typography>
              </Button>
           ) : (
              <Button full disabled={!canAssignTask} onClick={handleAssignUser}>
                <Typography light bold>
                  Add to my to do list
                </Typography>
              </Button>
            )}
        </Grid>
      )}
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