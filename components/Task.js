import processesApi from "../api/processes";
import { useState } from "react";
import { FormControlLabel } from "@mui/material";

import {
  Typography,
  Grid,
  Card,
  Stack,
  Checkbox,
  Icon,
  Link,
  IconButton,
} from "./ui";

const Task = ({
  taskId,
  title,
  isComplete,
  notNavigable,
  isDecision,
  isNext,
  isLast,
  link,
  handleCompleteMilestone,
}) => {
  const [taskIsComplete, setTaskIsComplete] = useState(isComplete);

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
  };

  return (
    <Card
      variant={
        !taskIsComplete && isNext && isDecision
          ? "primaryLightened"
          : taskIsComplete || isNext
          ? "lightened"
          : "outlined"
      }
      size="small"
    >
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Stack direction="row" spacing={4} alignItems="center">
            {isDecision ? (
              <>
                <Icon
                  type="zap"
                  variant={taskIsComplete || isNext ? "primary" : "lightened"}
                />
                <Typography
                  variant="bodyLarge"
                  lightened={!taskIsComplete && !isNext}
                  highlight={taskIsComplete || isNext}
                >
                  Decision
                </Typography>
                <Typography
                  variant="bodyLarge"
                  lightened={!taskIsComplete && !isNext}
                >
                  {title}
                </Typography>
              </>
            ) : (
              <FormControlLabel
                label={title}
                control={
                  <Checkbox
                    checked={taskIsComplete}
                    onChange={handleCompleteTask}
                  />
                }
              />
            )}
          </Stack>
        </Grid>
        {notNavigable ? null : (
          <Grid item>
            <Link href={link ? link : ""}>
              <IconButton>
                <Icon
                  type="chevronRight"
                  variant={
                    taskIsComplete ? null : isNext ? "primary" : "lightened"
                  }
                />
              </IconButton>
            </Link>
          </Grid>
        )}
      </Grid>
    </Card>
  );
};

export default Task;
