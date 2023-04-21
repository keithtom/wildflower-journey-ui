import { Grid, Card, Stack, Typography, Chip, Button, Divider } from "@ui";

const UserProfileSummary = ({ user }) => {
  return (
    <Card>
      <Stack spacing={4}>
        <Stack spacing={2}>
          <Typography variant="bodySmall" lightened>
            ROLES
          </Typography>
          <Grid container spacing={1}>
            {user.roles.map((s, i) => (
              <Grid item key={i}>
                <Chip label={s} size="small" />
              </Grid>
            ))}
          </Grid>
        </Stack>
        <Stack spacing={2}>
          <Typography variant="bodySmall" lightened>
            SKILLS
          </Typography>
          <Grid container spacing={1}>
            {user.skills.map((s, i) => (
              <Grid item key={i}>
                <Chip label={s} size="small" />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Stack>
    </Card>
  );
};

export default UserProfileSummary;
