import { Grid, Typography, Stack, Card, Avatar, Link } from "@ui";

const SchoolCard = ({ schoolName, subtitle, location, logo, link }) => {
  return (
    <Link href={link}>
      <Card variant="lightened" size="small" hoverable>
        <Grid container spacing={6} alignItems="center">
          <Grid item>
            <Avatar src={logo} size="md" />
          </Grid>
          <Grid item>
            <Stack>
              <Typography variant="bodyRegular" bold>
                {schoolName}
              </Typography>
              {subtitle ? (
                <Typography variant="bodyRegular">{subtitle}</Typography>
              ) : null}
              <Typography variant="bodyRegular" lightened>
                {location}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </Link>
  );
};

export default SchoolCard;
