import { useState } from "react";

import {
  Grid,
  Card,
  Typography,
  Stack,
  Icon,
  IconButton,
  Link,
  Avatar,
  Button,
  Chip,
} from "./ui";
import CategoryChip from "./CategoryChip";
import EffortChip from "./EffortChip";
import PhaseChip from "./PhaseChip";
import InfoDrawer from "./InfoDrawer";

const Milestone = ({
  link,
  title,
  description,
  effort,
  categories,
  phase,
  status,
  stepsCount,
  stepsAssignedCount,
  stepsCompleteCount,
  variant,
}) => {
  const [infoDrawerOpen, setInfoDrawerOpen] = useState(false);

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
                {status === "in progress" && stepsAssignedCount ? (
                  <Chip
                    size="small"
                    label={
                      <Stack spacing={1} direction="row">
                        Working on {stepsAssignedCount} of {stepsCount} tasks
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
                  {categories && (
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
        effort={effort}
        categories={categories}
        about={description}
        actions={<MilestoneDrawerActions stepsCount={stepsCount} link={link} />}
      />
    </>
  );
};

export default Milestone;

const MilestoneDrawerActions = ({ stepsCount, link }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Link href={link}>
          <Button full>
            <Typography light bold>
              View all {stepsCount} tasks
            </Typography>
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
};
