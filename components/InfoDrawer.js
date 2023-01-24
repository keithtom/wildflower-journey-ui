import { useState } from "react";
import { styled } from "@mui/material/styles";
import { Drawer } from "@mui/material";
import { FormControlLabel, RadioGroup } from "@mui/material";
import processesApi from "../api/processes";
import stepsApi from "../api/steps";
import { useUserContext } from "@lib/useUserContext";

import {
  Card,
  Typography,
  Stack,
  Grid,
  Icon,
  IconButton,
  Chip,
  Divider,
  Button,
  Avatar,
  Link,
  Radio,
  Snackbar,
} from "./ui/index";
import EffortChip from "./EffortChip";
import CategoryChip from "./CategoryChip";
import StatusChip from "./StatusChip";
import Resource from "./Resource";

const CustomDrawer = styled(Drawer)`
  margin: 0;
  flex-shrink: 0;
  width: ${({ theme }) => theme.util.infoDrawerWidth}px;
  z-index: 1;
  .MuiDrawer-paper {
    width: ${({ theme }) => theme.util.infoDrawerWidth}px;
    outline: 1px solid ${({ theme }) => theme.color.neutral.main};
    border: none;
    margin-top: 0;
    padding-top: ${({ theme }) => theme.util.appBarHeight}px;
  }
`;

const InfoDrawer = ({
  toggle,
  open,
  milestone,
  task,
  about,
  categories,
  handleCompleteTask,
}) => {
  const [userIsUpdatingDecision, setUserIsUpdatingDecision] = useState(false);
  const [decisionOption, setDecisionOption] = useState();
  const [isDecided, setIsDecided] = useState(false);
  const [assignToastOpen, setAssignToastOpen] = useState(false);
  const [unassignToastOpen, setUnassignToastOpen] = useState(false);
  const [assignee, setAssignee] = useState(task && task.assignee);
  const [taskIsComplete, setTaskIsComplete] = useState(task && task.isComplete);
  const { currentUser } = useUserContext();

  async function handleAssignSelf() {
    try {
      const response = await stepsApi.assign(task.id, currentUser.id);
      setAssignee(currentUser)
      // TODO: update UI for Taylor
    } catch (err) {
      console.error(err);
    }

    // console.log("assigning yourself");
    // setAssignee(true); //assign the user
    setAssignToastOpen(true);
    //update the assignee on the task
  };

  async function handleUnassignSelf() {
    try {
      const response = await stepsApi.unassign(task.id);
      setAssignee(null)
      // TODO: update UI for Taylor
    } catch (err) {
      console.error(err);
    }
    // console.log("unassigning yourself");
    setUnassignToastOpen(true);
    //update the assignee on the task
  };
  const handleAskOpsGuide = () => {
    console.log("ask ops guide");
  };

  const handleDecisionOptionChange = (e) => {
    setDecisionOption(e.target.value);
  };
  const handleMakeDecision = () => {
    setUserIsUpdatingDecision(false);
    setIsDecided(true);
    console.log("made a decision!");
    //send decision to backend
  };

  async function handleCompleteTask() {
    // api call, backend determiens state. needs spinner and error management.
    try {
      // if checking, complete, if unchecking, uncomplete.
      const response = await processesApi.complete(task.id);
      console.log(response)
      setTaskIsComplete(true); 
      // TODO: update UI for Taylor
    } catch (err) {
      console.error(err);
    }

    if (task.isLast) {
      // TODO: Taylor
      // handleCompleteMilestone();
    }
  }

  async function handleMarkTaskIncomplete() {
    // api call, backend determiens state. needs spinner and error management.
    try {
      // if checking, complete, if unchecking, uncomplete.
      const response = await processesApi.uncomplete(task.id);
      setTaskIsComplete(false); 
      console.log(response);
      // TODO: update UI for Taylor
    } catch (err) {
      console.error(err);
    }

    if (task.isLast) {
      // TODO: Taylor
      // handleUncompleteMilestone(); 
    }
    console.log("marking the task incomplete");
  };


  return (
    <>
      <CustomDrawer anchor="right" open={open} onClose={toggle}>
        <Stack
          justifyContent="space-between"
          direction="column"
          sx={{ height: "100%" }}
        >
          <Card noBorder>
            <Stack spacing={12}>
              <Stack spacing={6}>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Chip
                      label={
                        milestone
                          ? "Milestone"
                          : task.isDecision
                          ? "Decision"
                          : "Task"
                      }
                      size="small"
                    />
                  </Grid>
                  <Grid item>
                    <IconButton onClick={toggle}>
                      <Icon type="close" />
                    </IconButton>
                  </Grid>
                </Grid>

                <Typography variant="bodyLarge" bold>
                  {milestone ? milestone.title : task && task.title}
                </Typography>
                <Stack direction="row" spacing={4}>
                  {task && (
                    <Stack spacing={2}>
                      <Typography variant="bodyMini" lightened bold>
                        ASSIGNEE
                      </Typography>
                      <Avatar
                        size="mini"
                        // TODO: can we get the assignee information for each task in the process serializer
                        // src={
                        //   task.assignee.profileImage &&
                        //   task.assignee.profileImage
                        // }
                      />
                      {/* use assignee.src or equivalent, if none, show null */}
                    </Stack>
                  )}
                  {milestone && milestone.status && (
                    <Stack spacing={2}>
                      <Typography variant="bodyMini" lightened bold>
                        STATUS
                      </Typography>
                      <StatusChip
                        status={milestone.status}
                        size="small"
                        withIcon
                      />
                    </Stack>
                  )}
                  {categories && (
                    <Stack spacing={2}>
                      <Typography variant="bodyMini" lightened bold>
                        CATEGORY
                      </Typography>
                      <Stack direction="row" spacing={2}>
                        {categories.map((m, i) => (
                          <CategoryChip
                            category={m}
                            size="small"
                            withIcon
                            key={i}
                          />
                        ))}
                      </Stack>
                    </Stack>
                  )}
                  {milestone && milestone.effort && (
                    <Stack spacing={2}>
                      <Typography variant="bodyMini" lightened bold>
                        EFFORT
                      </Typography>
                      <EffortChip
                        size="small"
                        effort={milestone.effort}
                        withIcon
                      />
                    </Stack>
                  )}
                </Stack>
              </Stack>
              {task && task.resources && task.resources.data && (
                <Stack spacing={2}>
                  {task.resources.data.map((r, i) => (
                    <Resource link={r.link} title={r.title} key={i} />
                  ))}
                </Stack>
              )}
              {about && (
                <Stack spacing={4}>
                  <Stack direction="row" spacing={4}>
                    <Icon type="glasses" variant="primary" size="medium" />
                    <Typography variant="bodyRegular" bold>
                      About
                    </Typography>
                  </Stack>
                  <Divider />
                  <Typography>{about}</Typography>
                </Stack>
              )}
              {task && assignee && task.isDecision && FakeDecisionOptions && (
                <DecisionForm
                  options={FakeDecisionOptions}
                  isDecided={isDecided}
                  decisionOption={decisionOption}
                  handleDecisionOptionChange={handleDecisionOptionChange}
                />
              )}
            </Stack>
          </Card>
          <Card noBorder>
            <Stack spacing={6}>
              <Divider />
              <Grid container spacing={4}>
                {milestone ? (
                  <>
                    <Grid item xs={6}>
                      <Button full variant="secondary">
                        <Typography>Ask your ops guide</Typography>
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Link href={milestone.link}>
                        <Button full>
                          <Typography light bold>
                            View {milestone && milestone.taskCount} tasks
                          </Typography>
                        </Button>
                      </Link>
                    </Grid>
                  </>
                ) : task && task.isDecision ? (
                  assignee ? (
                    isDecided ? (
                      <Grid item xs={12}>
                        <Button
                          full
                          variant="secondary"
                          onClick={() => setIsDecided(false)}
                        >
                          <Typography>Change decision</Typography>
                        </Button>
                      </Grid>
                    ) : (
                      <Grid item xs={12}>
                        <Button
                          full
                          disabled={!decisionOption}
                          onClick={handleMakeDecision}
                        >
                          <Typography>Decide</Typography>
                        </Button>
                      </Grid>
                    )
                  ) : (
                    <Grid item xs={12}>
                      <Button full onClick={handleAssignSelf}>
                        <Typography light bold>
                          Assign yourself
                        </Typography>
                      </Button>
                    </Grid>
                  )
                ) : assignee ? (
                  taskIsComplete ? (
                    <>
                      <Grid item xs={6}>
                        <Button
                          full
                          variant="secondary"
                          onClick={handleAskOpsGuide}
                        >
                          <Typography light bold>
                            Ask your ops guide
                          </Typography>
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          full
                          variant="danger"
                          onClick={handleMarkTaskIncomplete}
                        >
                          <Typography bold>Mark incomplete</Typography>
                        </Button>
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Grid item xs={6}>
                        <Button
                          full
                          variant="text"
                          onClick={handleUnassignSelf}
                        >
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
            </Stack>
          </Card>
        </Stack>
      </CustomDrawer>
      <TaskToast
        open={assignToastOpen}
        onClose={() => setAssignToastOpen(false)}
        isAssignToast={true}
        title={task && task.title}
      />
      <TaskToast
        open={unassignToastOpen}
        onClose={() => setUnassignToastOpen(false)}
        isAssignToast={false}
        title={task && task.title}
      />
    </>
  );
};

export default InfoDrawer;

const TaskToast = ({ isAssignToast, open, onClose, title }) => {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      autoHideDuration={6000}
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
              <Avatar size="mini" />
              {/* use assignee.src or equivalent, if none, show null */}
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

const DecisionForm = ({
  options,
  disabled,
  isDecided,
  decisionOption,
  handleDecisionOptionChange,
}) => {
  const StyledDecisionCard = styled(Card)`
    /* Disabled */
    ${(props) =>
      props.disabled &&
      css`
        opacity: 0.25;
        pointer-events: none;
      `}
  `;

  return (
    <StyledDecisionCard
      variant={isDecided ? "outlined" : "primaryOutlined"}
      disabled={disabled}
    >
      <Stack spacing={6}>
        <RadioGroup value={decisionOption} handleOptionsChange>
          {options.map((o, i) => (
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
