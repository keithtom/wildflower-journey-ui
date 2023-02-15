import { Grid, Card, Typography, Stack, Icon, IconButton, Link } from "./ui";

const Resource = ({ title, link, description }) => {
  return (
    <Card variant="lightened" size="small">
      <Grid
        container
        alignItems={description ? "flex-start" : "center"}
        justifyContent="space-between"
        spacing={4}
      >
        <Grid item flex={1}>
          <Stack
            direction="row"
            spacing={4}
            alignItems={description ? "flex-start" : "center"}
          >
            <Grid item>
              <Icon type="link" variant="primary" />
            </Grid>
            <Stack spacing={description && 2}>
              <Typography variant="bodyLarge" bold>
                {title}
              </Typography>
              {description && (
                <Typography variant="bodySmall" lightened>
                  {description}
                </Typography>
              )}
            </Stack>
          </Stack>
        </Grid>
        <Grid item>
          <a href={link} target="_blank">
            <IconButton>
              <Icon type="linkExternal" variant="lightened" />
            </IconButton>
          </a>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Resource;
