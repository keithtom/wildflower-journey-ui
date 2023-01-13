import processesApi from "../api/processes";

import { useState } from "react";
import { FormControlLabel } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Typography,
  Grid,
  Box,
  Stack,
  Checkbox,
  Icon,
  Link,
  IconButton,
  Chip,
  Avatar,
} from "./ui";
import InfoDrawer from "./InfoDrawer";

const StyledTask = styled(Box)`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.color.neutral.lightened};
  padding: ${({ theme }) => theme.util.buffer * 6}px 0;
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
  assignee,
}) => {
  const [taskIsComplete, setTaskIsComplete] = useState(isComplete);
  const [infoDrawerOpen, setInfoDrawerOpen] = useState(false);

  async function handleCompleteTask() {
    // api call, backend determiens state. needs spinner and error management.
    try {
      // if checking, complete, if unchecking, uncomplete.
      const response = await processesApi.complete(taskId);
      setTaskIsComplete(!taskIsComplete); // take state from API response?
    } catch (err) {
      console.error(err);
    }

    if (isLast) {
      handleCompleteMilestone();
    }
  }

  return (
    <>
      <StyledTask onClick={() => setInfoDrawerOpen(true)}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Stack direction="row" spacing={4} alignItems="center">
              {isDecision ? (
                <>
                  <Icon
                    type="zap"
                    variant={isComplete ? "primary" : "lightened"}
                  />
                  <Chip label="Decision" size="small" />
                  <Typography variant="bodyLarge" struck={isComplete} bold>
                    {title}
                  </Typography>
                </>
              ) : (
                <Stack direction="row" spacing={4}>
                  <Icon
                    type={isComplete ? "checkCircle" : "circle"}
                    variant={isComplete ? "primary" : "lightened"}
                  />
                  <Typography variant="bodyLarge" bold struck={isComplete}>
                    {title}
                  </Typography>
                </Stack>
              )}
            </Stack>
          </Grid>
          <Grid item>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar size="mini" />
            </Stack>
          </Grid>
        </Grid>
      </StyledTask>
      <InfoDrawer
        task={{
          title: title,
          assignee: assignee,
          resourceTitle: null,
          resourceType: null,
          resourceUrl: null,
          isComplete: isComplete,
          isDecision: isDecision,
          decisionOptions: decisionOptions,
        }}
        categories={categories}
        about="About the task"
        open={infoDrawerOpen}
        toggle={() => setInfoDrawerOpen(!infoDrawerOpen)}
        handleCompleteTask={handleCompleteTask}
      />
    </>
  );
};

export default Task;
