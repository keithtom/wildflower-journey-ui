import { Grid, Avatar, Typography, Chip } from "./ui";

const UserSummary = ({ avatar, firstName, lastName, roles, skills }) => {
  return (
    <Grid container justifyContent="space-between" alignItems="center" mb={2}>
      <Grid item>
        <Grid container alignItems="flex-start" spacing={4}>
          <Grid item>
            <Avatar
              sx={{
                width: 32,
                height: 32,
              }}
              src={avatar ? avatar : null}
            />
          </Grid>
          <Grid item>
            <Typography variant="h5">
              {firstName} {lastName}
            </Typography>
            {roles
              ? roles.map((r, i) => <Typography key={i}>{r}</Typography>)
              : null}
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container alignItems="center" spacing={2}>
          {skills.map((s, i) => (
            <Grid item key={i}>
              <Chip label={s} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserSummary;
