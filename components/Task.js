import { useState } from "react";
import { FormControlLabel } from "@mui/material";
import { styled, css } from "@mui/material/styles";
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
} from "./ui";
import InfoDrawer from "./InfoDrawer";

const StyledTask = styled(Box)`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.color.neutral.lightened};
  padding: ${({ theme }) => theme.util.buffer * 6}px 0;

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
  assignee,
  variant,
  resources,
}) => {
  const [taskIsComplete, setTaskIsComplete] = useState(isComplete);
  const [infoDrawerOpen, setInfoDrawerOpen] = useState(false);

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
            }}
          >
            <Stack direction="row" spacing={4} alignItems="center">
              {isDecision ? (
                <>
                  <Icon
                    type="zap"
                    variant={isComplete ? "primary" : "lightened"}
                  />
                  <Chip label="Decision" size="small" />
                  <Typography
                    variant={variant === "small" ? "bodyRegular" : "bodyLarge"}
                    struck={isComplete}
                    bold
                  >
                    {title}
                  </Typography>
                </>
              ) : (
                <Stack direction="row" spacing={4} alignItems="center">
                  <Icon
                    type={isComplete ? "checkCircle" : "circle"}
                    variant={isComplete ? "primary" : "lightened"}
                  />
                  <Typography
                    variant={variant === "small" ? "bodyRegular" : "bodyLarge"}
                    bold
                    struck={isComplete}
                  >
                    {title}
                  </Typography>
                </Stack>
              )}
            </Stack>
          </Grid>
          {isNext && (
            <Grid item mr={2}>
              <Button small>
                <Typography light variant="bodySmall">
                  Start
                </Typography>
              </Button>
            </Grid>
          )}
          <Grid item>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                size="mini"
                // src={assignee.profileImage && assignee.profileImage} TODO: get this to work!
              />
            </Stack>
          </Grid>
        </Grid>
      </StyledTask>
      <InfoDrawer
        task={{
          title: title,
          id: taskId,
          assignee: assignee,
          resources: resources,
          isComplete: isComplete,
          isDecision: isDecision,
          decisionOptions: decisionOptions,
          isLast,
        }}
        categories={categories}
        about="About the task"
        open={infoDrawerOpen}
        toggle={() => setInfoDrawerOpen(!infoDrawerOpen)}
        // handleCompleteTask={handleCompleteTask}
      />
    </>
  );
};

export default Task;
