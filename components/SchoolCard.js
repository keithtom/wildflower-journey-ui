import { Grid, Typography, Stack, Card, Avatar, Link } from "@ui";

const SchoolCard = ({ schoolName, location, logo, link }) => {
  return (
    <Link href={link}>
      <Card variant="lightened" size="small" hoverable>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar src={logo} />
          </Grid>
          <Grid item>
            <Stack>
              <Typography variant="bodyRegular" bold>
                {schoolName}
              </Typography>
              <Typography variant="bodySmall" lightened>
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
