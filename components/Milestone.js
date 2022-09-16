import { styled, css } from "@mui/material/styles";

import { Grid, Card, Typography, Stack, Chip, Icon, Link, Avatar } from "./ui";
import CategoryChip from "./CategoryChip";
import EffortChip from "./EffortChip";

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
              <Typography variant="bodyLarge" bold>
                {title}
              </Typography>
            </Stack>
          </Grid>

          <Grid item>
            <Stack direction="row" spacing={6} alignItems="center">
              {effort && (
                <Stack direction="row" spacing={2} alignItems="center">
                  <EffortChip size="small" effort={effort} withIcon />
                </Stack>
              )}
              {category && (
                <Stack direction="row" spacing={2} alignItems="center">
                  <CategoryChip size="small" category={category} withIcon />
                </Stack>
              )}
              {phase && (
                <Stack direction="row" spacing={2} alignItems="center">
                  <Chip size="small" label={phase} />
                </Stack>
              )}
              {assignee && (
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar size="mini" />
                </Stack>
              )}
              <Icon type="chevronRight" />
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </Link>
  );
};

export default Milestone;
