import { Grid, Card, Stack, Typography, Chip } from "@ui";

const AttributesCard = ({ attributes }) => {
  return (
    <Card>
      <Stack spacing={4}>
        {attributes.map((a, i) => (
          <Stack spacing={2} key={i}>
            <Typography variant="bodySmall" lightened>
              {a.name}
            </Typography>
            <Grid container spacing={1}>
              {a.values.map((a, i) => (
                <Grid item key={i}>
                  <Chip label={a} size="small" />
                </Grid>
              ))}
            </Grid>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
};

export default AttributesCard;
