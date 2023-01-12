import { useState } from "react";
import { styled } from "@mui/material/styles";
import { Drawer } from "@mui/material";
import { FormControlLabel, RadioGroup } from "@mui/material";

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
} from "./ui/index";
import EffortChip from "./EffortChip";
import CategoryChip from "./CategoryChip";
import StatusChip from "./StatusChip";

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
  const handleAssignSelf = () => {
    console.log("assigning yourself");
  };
  const handleAskOpsGuide = () => {
    console.log("ask ops guide");
  };
  const handleMarkTaskIncomplete = () => {
    console.log("marking the task incomplete");
  };

  const [userIsUpdatingDecision, setUserIsUpdatingDecision] = useState(false);
  const [decisionOption, setDecisionOption] = useState();
  const handleDecisionOptionChange = (e) => {
    setDecisionOption(e.target.value);
  };
  const handleMakeDecision = () => {
    setUserIsUpdatingDecision(false);
    console.log("made a decision!");
    //send decision to backend
  };
  const notDecided = !decisionOption;
  const isDecided = userIsUpdatingDecision ? false : true;

  return (
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
                    <Avatar size="mini" />
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
            {task &&
              task.assignee &&
              task.isDecision &&
              FakeDecisionOptions && (
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
              ) : (
                task &&
                (task.assignee ? (
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
                      <Button full onClick={handleCompleteTask}>
                        <Typography light bold>
                          Mark task complete
                        </Typography>
                      </Button>
                    </Grid>
                  </>
                ) : task.isComplete ? (
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
                ) : task.assignee && task.isDecision ? (
                  <Grid item xs={12}>
                    {isDecided ? (
                      <Button
                        full
                        variant="secondary"
                        onClick={() => setUserIsUpdatingDecision(true)}
                      >
                        <Typography>Change decision</Typography>
                      </Button>
                    ) : (
                      <Button
                        full
                        disabled={notDecided}
                        onClick={() => setUserIsUpdatingDecision(false)}
                      >
                        <Typography>Decide</Typography>
                      </Button>
                    )}
                  </Grid>
                ) : (
                  <Grid item xs={12}>
                    <Button full onClick={handleAssignSelf}>
                      <Typography light bold>
                        Assign yourself
                      </Typography>
                    </Button>
                  </Grid>
                ))
              )}
            </Grid>
          </Stack>
        </Card>
      </Stack>
    </CustomDrawer>
  );
};

export default InfoDrawer;

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
