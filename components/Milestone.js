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
} from "./ui";
import CategoryChip from "./CategoryChip";
import EffortChip from "./EffortChip";
import PhaseChip from "./PhaseChip";
import InfoDrawer from "./InfoDrawer";

const Milestone = ({
  link,
  title,
  effort,
  categories,
  phase,
  status,
  stepCount,
}) => {
  const [infoDrawerOpen, setInfoDrawerOpen] = useState(false);

  return (
    <>
      <Link href={link && link}>
        <Card variant="lightened" hoverable size="small">
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Stack direction="row" spacing={3} alignItems="center">
                {status === "done" && (
                  <Icon type="checkCircle" variant="success" />
                )}
                {status === "up next" && (
                  <Icon type="rightArrowCircle" variant="lightened" />
                )}
                {status === "to do" && <Icon type="circle" variant="primary" />}
                <Typography
                  variant="bodyLarge"
                  bold
                  lightened={status === "up next"}
                >
                  {title}
                </Typography>
              </Stack>
            </Grid>

            <Grid item>
              <Stack direction="row" spacing={6} alignItems="center">
                <Stack direction="row" spacing={3} alignItems="center">
                  {effort && (
                    <Stack direction="row" spacing={2} alignItems="center">
                      <EffortChip size="small" effort={effort} withIcon />
                    </Stack>
                  )}
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
        toggle={() => setInfoDrawerOpen(!infoDrawerOpen)}
        milestone={{
          title: title,
          effort: effort,
          status: status,
          taskCount: stepCount,
          link: link,
        }}
        categories={categories}
        about="About the milestone"
        open={infoDrawerOpen}
      />
    </>
  );
};

export default Milestone;
