import { Grid, Card, Typography, Stack, Icon, Link, Avatar } from "./ui";
import CategoryChip from "./CategoryChip";
import EffortChip from "./EffortChip";
import PhaseChip from "./PhaseChip";

const Milestone = ({ title, effort, category, phase, assignee, status }) => {
  return (
    <Link href="/ssj/milestone">
      <Card variant="lightened" hoverable>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Stack direction="row" spacing={6} alignItems="center">
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
                {category && (
                  <Stack direction="row" spacing={2} alignItems="center">
                    <CategoryChip size="small" category={category} withIcon />
                  </Stack>
                )}
                {assignee && (
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar size="mini" />
                  </Stack>
                )}
              </Stack>
              <Icon type="chevronRight" />
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </Link>
  );
};

export default Milestone;
