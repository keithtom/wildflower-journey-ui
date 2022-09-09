import { styled, css } from "@mui/material/styles";

import { Grid, Card, Typography, Stack, Chip, Icon, Link, Avatar } from "./ui";

const Milestone = ({
  title,
  effort,
  category,
  phase,
  assignee,
  isComplete,
  isUpNext,
}) => {
  return (
    <Link href="/ssj/milestone">
      <Card
        variant={isComplete ? "success" : isUpNext ? "outlined" : "lightened"}
        hoverable
      >
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Stack direction="row" spacing={6} alignItems="center">
              {isComplete && <Icon type="checkCircle" variant="success" />}
              <Typography variant="bodyLarge" bold lightened={isUpNext}>
                {title}
              </Typography>
            </Stack>
          </Grid>

          <Grid item>
            <Stack direction="row" spacing={6} alignItems="center">
              {effort && (
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="bodySmall" bold lightened uppercase>
                    Effort
                  </Typography>
                  <Chip size="small" label={effort} />
                </Stack>
              )}
              {category && (
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="bodySmall" bold lightened uppercase>
                    Category
                  </Typography>
                  <Chip size="small" label={category} />
                </Stack>
              )}
              {phase && (
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="bodySmall" bold lightened uppercase>
                    Phase
                  </Typography>
                  <Chip size="small" label={phase} />
                </Stack>
              )}
              {assignee && (
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="bodySmall" bold lightened uppercase>
                    Assignee
                  </Typography>
                  <Avatar />
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
