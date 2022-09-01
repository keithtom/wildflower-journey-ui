import { styled, css } from "@mui/material/styles";

import { Grid, Card, Typography, Stack, Chip, Icon, Link } from "./ui";

const Milestone = ({ title, effort, category, isComplete, isUpNext }) => {
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
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="bodySmall" bold lightened capitalize>
                  Effort
                </Typography>
                <Chip
                  size="small"
                  label="Small"
                  variant={effort === "small" && "filled"}
                />
                <Chip
                  size="small"
                  label="Medium"
                  variant={effort === "medium" && "filled"}
                />
                <Chip
                  size="small"
                  label="Large"
                  variant={effort === "large" && "filled"}
                />
              </Stack>
            </Stack>
          </Grid>
          <Grid item>
            <Stack direction="row" spacing={6} alignItems="center">
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="bodySmall" bold lightened capitalize>
                  Category
                </Typography>
                <Chip size="small" label={category} />
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
