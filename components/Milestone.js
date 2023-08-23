import { useEffect, useState } from "react";

import { getScreenSize } from "../hooks/react-responsive";
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
  const { screenSize } = getScreenSize();

  const [infoDrawerOpen, setInfoDrawerOpen] = useState(false);

  const remainingSteps = stepCount - completedStepsCount;
  const assignedIncomplete = stepsAssignedCount - completedStepsCount;

  const [isMedium, setIsMedium] = useState(false);
  // During hydration `useEffect` is called. `window` is available in `useEffect`. In this case because we know we're in the browser checking for window is not needed. If you need to read something from window that is fine.
  // By calling `setColor` in `useEffect` a render is triggered after hydrating, this causes the "browser specific" value to be available. In this case 'red'.
  useEffect(() => setIsMedium(screenSize.isMd), []);

  return (
    <>
      <Link href={link ? link : "/"}>
        <Card
          variant="lightened"
          hoverable
          size="small"
          noRadius={variant === "small" ? true : false}
        >
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="space-between"
            flexWrap="noWrap"
          >
            <Grid item xs={10} sm={8} md={7}>
              <Stack direction="row" spacing={3} alignItems="center">
                <Grid item>
                  {status === "done" && (
                    <Icon type="checkCircle" variant="success" />
                  )}
                  {status === "up next" && (
                    <Icon type="circle" variant="lightened" />
                  )}
                  {status === "in progress" && (
                    <Icon
                      type="rightArrowCircleSolid"
                      variant="lightened"
                    />
                  )}
                  {status === "to do" && (
                    <Icon
                      className="rightArrowCircle"
                      type="rightArrowCircle"
                      variant="primary"
                    />
                  )}
                </Grid>
                <Typography
                  variant={variant === "small" ? "bodyRegular" : "bodyLarge"}
                  bold
                  lightened={status === "up next"}
                  noWrap
                >
                  {title}
                </Typography>
                {isMedium ? null : assignedIncomplete && remainingSteps ? (
                  <Chip
                    sx={{
                      "&:hover": {
                        zIndex: 1,
                      },
                    }}
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
                    sx={{
                      "&:hover": {
                        zIndex: 1,
                      },
                    }}
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

            <Grid item xs={2} sm={4} md={5}>
              <Grid
                container
                justifyContent="flex-end"
                alignItems="center"
                spacing={3}
                flexWrap="noWrap"
              >
                {screenSize.isSm ? null : (
                  <Grid item>
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
                              <CategoryChip category={m} size="small" key={i} />
                            ))}
                          </Stack>
                        </Stack>
                      )}
                    </Stack>
                  </Grid>
                )}
                <Grid item>
                  <IconButton onMouseDown={() => setInfoDrawerOpen(true)}>
                    <Icon type="dotsVertical" variant="lightened" />
                  </IconButton>
                </Grid>
              </Grid>
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
