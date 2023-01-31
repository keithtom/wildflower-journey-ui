import { Grid, Card, Typography, Stack, Icon, IconButton, Link } from "./ui";

const Resource = ({ title, link }) => {
  return (
    <Card variant="lightened" size="small">
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Stack direction="row" spacing={4} alignItems="center">
            <Icon type="link" variant="primary" />
            <Typography variant="bodyLarge" bold>
              {title}
            </Typography>
          </Stack>
        </Grid>
        <Grid item>
          <Link href={link}>
            <IconButton>
              <Icon type="linkExternal" variant="lightened" />
            </IconButton>
          </Link>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Resource;
