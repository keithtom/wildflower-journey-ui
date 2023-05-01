import { useState } from "react";

import {
  Grid,
  Card,
  Typography,
  Stack,
  Icon,
  IconButton,
  Link,
  Button,
  Chip,
} from "./ui";
import CategoryChip from "./CategoryChip";
import PhaseChip from "./PhaseChip";
import InfoDrawer from "./InfoDrawer";

const Milestone = ({
  link,
  title,
  description,
  categories,
  hideCategoryChip,
  phase,
  status,
  stepCount,
  stepsAssignedCount,
  completedStepsCount,
  variant,
}) => {
  const [infoDrawerOpen, setInfoDrawerOpen] = useState(false);

  const remainingSteps = stepCount - completedStepsCount;
  const assignedIncomplete = stepsAssignedCount - completedStepsCount;

  return (
    <>
      <Link href={link ? link : "/"}>
        <Card
          variant="lightened"
          hoverable
          size="small"
          noRadius={variant === "small" ? true : false}
        >
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Stack direction="row" spacing={3} alignItems="center">
                {status === "done" && (
                  <Icon type="checkCircle" variant="success" />
                )}
                {status === "up next" && (
                  <Icon type="circle" variant="lightened" />
                )}
                {status === "in progress" && (
                  <Icon type="rightArrowCircleSolid" variant="lightened" />
                )}
                {status === "to do" && (
                  <Icon type="rightArrowCircle" variant="primary" />
                )}
                <Typography
                  variant={variant === "small" ? "bodyRegular" : "bodyLarge"}
                  bold
                  lightened={status === "up next"}
                >
                  {title}
                </Typography>
                {assignedIncomplete && remainingSteps ? (
                  <Chip
                    size="small"
                    label={
                      <Stack spacing={1} direction="row">
                        Working on {assignedIncomplete} of {remainingSteps}{" "}
                        remaining tasks
                      </Stack>
                    }
                  />
                ) : completedStepsCount ? (
                  <Chip
                    size="small"
                    label={
                      <Stack spacing={1} direction="row">
                        {completedStepsCount} of {stepCount} tasks completed
                      </Stack>
                    }
                  />
                ) : null}
              </Stack>
            </Grid>

            <Grid item>
              <Stack direction="row" spacing={6} alignItems="center">
                <Stack direction="row" spacing={3} alignItems="center">
                  {phase && (
                    <Stack direction="row" spacing={2} alignItems="center">
                      <PhaseChip size="small" phase={phase} withIcon />
                    </Stack>
                  )}
                  {categories && !hideCategoryChip && (
                    <Stack direction="row" spacing={2} alignItems="center">
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
                  <IconButton onMouseDown={() => setInfoDrawerOpen(true)}>
                    <Icon type="dotsVertical" variant="lightened" />
                  </IconButton>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Card>
      </Link>

      <InfoDrawer
        open={infoDrawerOpen}
        toggle={() => setInfoDrawerOpen(!infoDrawerOpen)}
        link={link}
        title={title}
        status={status}
        categories={categories}
        about={description}
        actions={<MilestoneDrawerActions stepCount={stepCount} link={link} />}
      />
    </>
  );
};

export default Milestone;

const MilestoneDrawerActions = ({ stepCount, link }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Link href={link}>
          <Button full>
            <Typography light bold>
              View all {stepCount} tasks
            </Typography>
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
};
