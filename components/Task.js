import { useEffect, useState } from "react";
import { FormControlLabel, RadioGroup } from "@mui/material";
import { styled, css } from "@mui/material/styles";
import processesApi from "../api/processes";
import stepsApi from "../api/steps";
import { useUserContext } from "@lib/useUserContext";

import {
  Typography,
  Grid,
  Box,
  Stack,
  Button,
  Icon,
  Link,
  IconButton,
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
  isComplete,
  notNavigable,
  isDecision,
  decisionOptions,
  isNext,
  isLast,
  link,
  handleCompleteMilestone,
  categories,
  taskAssignee,
  variant,
  resources,
  includedDocuments,
  processName,
  worktime,
  removeStep,
}) => {
  const [taskIsComplete, setTaskIsComplete] = useState(isComplete);
  const [infoDrawerOpen, setInfoDrawerOpen] = useState(false);
  const [assignee, setAssignee] = useState(taskAssignee);
  const [assignToastOpen, setAssignToastOpen] = useState(false);
  const [unassignToastOpen, setUnassignToastOpen] = useState(false);
  const [isDecided, setIsDecided] = useState(false);
  const [decisionOption, setDecisionOption] = useState();
  const { currentUser } = useUserContext();

  async function handleCompleteTask() {
    // api call, backend determiens state. needs spinner and error management.
    try {
      // if checking, complete, if unchecking, uncomplete.
      const response = await processesApi.complete(taskId);
      setTaskIsComplete(response.data.attributes.completed);
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
      const response = await processesApi.uncomplete(taskId);

      setTaskIsComplete(response.data.attributes.completed);
    } catch (err) {
      console.error(err);
    }
  }
  async function handleAssignSelf() {
    try {
      const response = await stepsApi.assign(taskId, currentUser.id);
      setAssignee(response.data.attributes.assigneeInfo);
    } catch (err) {
      console.error(err);
    }
    setAssignToastOpen(true);
  }
  async function handleUnassignSelf() {
    try {
      const response = await stepsApi.unassign(taskId);
      setAssignee(null);
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
    console.log(decisionOption);
    // try {
    //   const response = await stepsApi.decide(taskId, decisionOption);
    //   // console.log(response)
    //   // if (response has a decided option to be set successfully, then)
    //   setIsDecided(true);
    // } catch (err) {
    //   console.error(err);
    // }
  };

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

              <Avatar size="mini" src={assignee && assignee.imageUrl} />
            </Stack>
          </Grid>
        </Grid>
      </StyledTask>
      <InfoDrawer
        open={infoDrawerOpen}
        toggle={() => setInfoDrawerOpen(!infoDrawerOpen)}
        assignee={assignee}
        about={description}
        taskId={taskId}
        title={title}
        resources={resources}
        categories={categories}
        worktime={worktime}
        isDecision={isDecision}
        isComplete={taskIsComplete}
        includedDocuments={includedDocuments}
        actions={
          isDecision ? (
            <DecisionDrawerActions
              assignee={assignee}
              isDecided={isDecided}
              handleAssignSelf={handleAssignSelf}
              handleUnassignSelf={handleUnassignSelf}
              handleMakeDecision={handleMakeDecision}
              decisionOptions={decisionOptions}
              decisionOption={decisionOption}
              setDecisionOption={setDecisionOption}
            />
          ) : (
            <TaskDrawerActions
              assignee={assignee}
              isComplete={taskIsComplete}
              handleAssignSelf={handleAssignSelf}
              handleUnassignSelf={handleUnassignSelf}
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
        assignee={assignee}
      />
      <TaskToast
        open={unassignToastOpen}
        onClose={() => setUnassignToastOpen(false)}
        isAssignToast={false}
        title={title}
        assignee={assignee}
      />
    </>
  );
};

export default Task;

const DecisionDrawerActions = ({
  assignee,
  isDecided,
  handleAssignSelf,
  handleUnassignSelf,
  handleMakeDecision,
  decisionOptions,
  decisionOption,
  setDecisionOption,
}) => {
  const handleDecisionOptionChange = (e) => {
    setDecisionOption(e.target.value);
  };
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
      {assignee ? (
        <Grid container>
          <StyledDecisionCard
            variant={isDecided ? "outlined" : "primaryOutlined"}
            disabled={isDecided}
          >
            <Stack spacing={6}>
              <RadioGroup value={decisionOption} handleOptionsChange>
                {decisionOptions.map((o, i) => (
                  <FormControlLabel
                    key={i}
                    value={o.data?.id}
                    control={<Radio disabled={isDecided} />}
                    label={o.data?.attributes?.description}
                    onChange={handleDecisionOptionChange}
                  />
                ))}
              </RadioGroup>
            </Stack>
          </StyledDecisionCard>
        </Grid>
      ) : null}

      <Grid container spacing={6}>
        {assignee ? (
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
                        If you'd like to change this decision, please email support@wildflowerschools.org.
                      </Typography>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Button full variant="text" onClick={handleUnassignSelf}>
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
            <Button full onClick={handleAssignSelf}>
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
  assignee,
  isComplete,
  handleAssignSelf,
  handleUnassignSelf,
  handleCompleteTask,
  handleUncompleteTask,
}) => {
  return (
    <Grid container spacing={4}>
      {assignee ? (
        isComplete ? (
          <>
            <Grid item xs={12}>
              <Button full variant="danger" onClick={handleUncompleteTask}>
                <Typography bold>Mark incomplete</Typography>
              </Button>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={6}>
              <Button full variant="text" onClick={handleUnassignSelf}>
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
        )
      ) : (
        <Grid item xs={12}>
          <Button full onClick={handleAssignSelf}>
            <Typography light bold>
              Add to my to do list
            </Typography>
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

const TaskToast = ({ isAssignToast, open, onClose, title, assignee }) => {
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
              <Avatar size="mini" src={assignee && assignee.imageUrl} />
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
