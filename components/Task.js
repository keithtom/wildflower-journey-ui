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
  taskId,
  title,
  description,
  completionType,
  isDecision,
  isLast,
  handleCompleteMilestone,
  categories,
  variant,
  resources,
  processName,
  worktime,
  removeStep,
  isAssignedToMe,
  canAssign,
  canUnassign,
  assignees,
  isComplete,
  canComplete,
  canUncomplete,
  completers,
}) => {
  const { currentUser } = useUserContext(); // why doesn't this work?
  
  const [taskIsAssignedToMe, setTaskIsAssignedToMe] = useState(isAssignedToMe);
  const [canAssignTask, setCanAssignTask] = useState(canAssign);
  const [canUnassignTask, setCanUnassignTask] = useState(canUnassign);
  const [taskAssignees, setTaskAssignees] = useState(assignees || []);
  
  const [taskIsComplete, setTaskIsComplete] = useState(isComplete);
  const [canCompleteTask, setCanCompleteTask] = useState(canComplete);
  const [canUncompleteTask, setCanUncompleteTask] = useState(canUncomplete);
  const [taskCompleters, setTaskCompleters] = useState(completers);
    
  const [infoDrawerOpen, setInfoDrawerOpen] = useState(false);
  const [assignToastOpen, setAssignToastOpen] = useState(false);
  const [unassignToastOpen, setUnassignToastOpen] = useState(false);
  
  const [isDecided, setIsDecided] = useState(false);
  const [decisionOption, setDecisionOption] = useState();

  async function handleCompleteTask() {
    // api call, backend determiens state. needs spinner and error management.
    try {
      // if checking, complete, if unchecking, uncomplete.
      const response = await stepsApi.complete(taskId);
      const step = response.data.data
      
      setTaskIsAssignedToMe(step.attributes.isAssignedToMe);
      setCanAssignTask(step.attributes.canAssign);
      setCanUnassignTask(step.attributes.canUnassign);
      
      setTaskIsComplete(step.attributes.isComplete);
      setCanCompleteTask(step.attributes.canComplete);
      setCanUncompleteTask(step.attributes.canUncomplete);
      
      setTaskCompleters(step.relationships.completers || []);
      
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
      const step = response.data.data
      
      setTaskIsAssignedToMe(step.attributes.isAssignedToMe);
      setCanAssignTask(step.attributes.canAssign);
      setCanUnassignTask(step.attributes.canUnassign);
      
      setTaskIsComplete(step.attributes.isComplete);
      setCanCompleteTask(step.attributes.canComplete);
      setCanUncompleteTask(step.attributes.canUncomplete);
      setTaskCompleters(step.relationships.completers || []);
    } catch (err) {
      console.error(err);
    }
  }
  async function handleAssignUser() {
    try {
      const response = await stepsApi.assign(taskId);
      const step = response.data.data
      
      setTaskIsAssignedToMe(step.attributes.isAssignedToMe);
      setCanAssignTask(step.attributes.canAssign);
      setCanUnassignTask(step.attributes.canUnassign);
      
      setTaskAssignees(step.relationships.assignees || []);
    } catch (err) {
      console.error(err);
    }
    setAssignToastOpen(true);
  }
  async function handleUnassignUser() {
    try {
      const response = await stepsApi.unassign(taskId);
      const step = response.data.data
      
      setTaskIsAssignedToMe(step.attributes.isAssignedToMe);
      setCanAssignTask(step.attributes.canAssign);
      setCanUnassignTask(step.attributes.canUnassign);
      setTaskAssignees(step.relationships.assignees || []);

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
    const response = await stepsApi.selectOption(decisionOption);
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
                <Avatar size="mini" src={assignee && assignee.imageUrl} />
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
        completionType={completionType}
        taskIsComplete={taskIsComplete}
        completers={taskCompleters}
        actions={
          isDecision ? (
            <DecisionDrawerActions
              taskIsAssignedToMe={taskIsAssignedToMe}
              isDecided={isDecided}
              decisionOption={decisionOption}
              setDecisionOption={setDecisionOption}
              handleAssignSelf={handleAssignUser}
              handleUnassignSelf={handleUnassignUser}
              handleMakeDecision={handleMakeDecision}
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
        imageUrl={null}
        // imageUrl={currentUser&.imageUrl}
      />
      <TaskToast
        open={unassignToastOpen}
        onClose={() => setUnassignToastOpen(false)}
        isAssignToast={false}
        title={title}
        imageUrl={null}
        // imageUrl={currentUser&.imageUrl}
      />
    </>
  );
};

export default Task;

const DecisionDrawerActions = ({
  taskIsAssignedToMe,
  isDecided,
  decisionOption,
  setDecisionOption,
  canAssignTask,
  canUnassignTask,
  handleMakeDecision,
}) => {
  const handleDecisionOptionChange = (e) => {
    setDecisionOption(e.target.value);
  };

  const showDecisionForm =  taskIsAssignedToMe && !isDecided

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
              <RadioGroup value={decisionOption} handleOptionsChange>
                {FakeDecisionOptions.map((o, i) => (
                  <FormControlLabel
                    key={i}
                    value={o.value}
                    control={<Radio disabled={isDecided} />}
                    label={o.label}
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
                  disabled={!decisionOption}
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
            <Button full disabled={!canAssignTask} onClick={handleAssignUser}>
              <Typography light bold variant="bodyRegular">
                Add to my to do list
              </Typography>
            </Button>
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
          <Button full disabled={!canAssignTask} onClick={handleAssignUser}>
            <Typography light bold>
              Add to my to do list
            </Typography>
          </Button>
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

const FakeDecisionOptions = [
  {
    value: "wildflower group exemption",
    label: "I will apply with the Wildflower Group Exemption",
  },
  {
    value: "independently with irs",
    label: "I will apply independently using Form 1023 with the IRS",
  },
];
