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
  title,
  isComplete,
  notNavigable,
  isDecision,
  isNext,
  link,
}) => {
  const [taskIsComplete, setTaskIsComplete] = useState(isComplete);
  const handleCompleteTask = () => {
    setTaskIsComplete(!taskIsComplete);
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
            <Link href="/ssj/task">
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
