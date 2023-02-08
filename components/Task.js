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
}) => {
  const [taskIsComplete, setTaskIsComplete] = useState(isComplete);
  const [infoDrawerOpen, setInfoDrawerOpen] = useState(false);
  const [assignee, setAssignee] = useState(taskAssignee);
  const [assignToastOpen, setAssignToastOpen] = useState(false);
  const [unassignToastOpen, setUnassignToastOpen] = useState(false);
  const [isDecided, setIsDecided] = useState(false);
  const { currentUser } = useUserContext();

  async function handleCompleteTask() {
    // api call, backend determiens state. needs spinner and error management.
    try {
      // if checking, complete, if unchecking, uncomplete.
      const response = await processesApi.complete(taskId);
      setTaskIsComplete(response.data.attributes.completed);
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
    } catch (err) {
      console.error(err);
    }
    setUnassignToastOpen(true);
  }
  const handleMakeDecision = () => {
    //TODO: Api call to set decision
    setIsDecided(true);
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
                    type={taskIsComplete ? "checkCircle" : "circle"}
                    variant={taskIsComplete ? "primary" : "lightened"}
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
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar size="mini" src={assignee && assignee.imageUrl} />
            </Stack>
          </Grid>
        </Grid>
      </StyledTask>
      <InfoDrawer
        open={infoDrawerOpen}
        toggle={() => setInfoDrawerOpen(!infoDrawerOpen)}
        assignee={assignee}
        about="..."
        taskId={taskId}
        title={title}
        resources={resources}
        categories={categories}
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
}) => {
  const [decisionOption, setDecisionOption] = useState();
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
    <Stack spacing={6}>
      {assignee ? (
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

      <Grid container spacing={4}>
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
                        Changing decisions is not advised. Please take the
                        necessary steps to be certain about your decision before
                        making it here.
                      </Typography>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Button full variant="text" onClick={handleUnassignSelf}>
                  <Typography bold>Unassign yourself</Typography>
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  full
                  disabled={!decisionOption}
                  onClick={handleMakeDecision}
                >
                  <Typography bold>Make final decision</Typography>
                </Button>
              </Grid>
            </>
          )
        ) : (
          <Grid item xs={12}>
            <Button full onClick={handleAssignSelf}>
              <Typography light bold>
                Assign yourself
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
    <>
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
                  <Typography bold>Unassign yourself</Typography>
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button full onClick={handleCompleteTask}>
                  <Typography light bold>
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
                Assign yourself
              </Typography>
            </Button>
          </Grid>
        )}
      </Grid>
    </>
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
                  TASK {isAssignToast ? "ASSIGNED" : "UNASSIGNED"}
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
                  {isAssignToast ? "assigned" : "unassigned"}
                </Typography>
                <Typography variant="bodySmall">yourself</Typography>
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
