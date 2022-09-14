import { useState } from "react";
import { FormControlLabel } from "@mui/material";

import { Grid, Card, Stack, Checkbox, Icon, Link, IconButton } from "./ui";

const Task = ({ title, isComplete, notNavigable, link }) => {
  const [taskIsComplete, setTaskIsComplete] = useState(isComplete);
  const handleCompleteTask = () => {
    setTaskIsComplete(!taskIsComplete);
  };
  return (
    <Card variant="lightened" size="small">
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Stack direction="row" spacing={4} alignItems="center">
            <FormControlLabel
              label={title}
              control={
                <Checkbox
                  checked={taskIsComplete}
                  onChange={handleCompleteTask}
                />
              }
            />
          </Stack>
        </Grid>
        {notNavigable ? null : (
          <Grid item>
            <Link href="/ssj/task">
              <IconButton>
                <Icon type="chevronRight" />
              </IconButton>
            </Link>
          </Grid>
        )}
      </Grid>
    </Card>
  );
};

export default Task;
