import moment from "moment";
import { Grid, Card, Stack, Typography, Chip } from "@ui";
import { Location } from "styled-icons/fluentui-system-filled";

const AttributesCard = ({
  pronouns,
  ethnicity,
  language,
  montessoriCertification,
  state,
  openDate,
  agesServed,
  governance,
  maxEnrollment,
  numClassrooms,
  affinityGroups,
  genderIdentity,
}) => {
  return (
    <Card>
      <Stack spacing={4}>
        {pronouns ? (
          <Stack spacing={2}>
            <Typography variant="bodySmall" lightened uppercase bold>
              Pronouns
            </Typography>
            <Grid container>
              <Grid item>
                <Chip label={pronouns} size="small" />
              </Grid>
            </Grid>
          </Stack>
        ) : null}
        {openDate ? (
          <Stack spacing={2}>
            <Typography variant="bodySmall" lightened uppercase bold>
              Open Date
            </Typography>
            <Grid container>
              <Grid item>
                <Chip
                  label={moment(openDate).format("MMMM D, YYYY")}
                  size="small"
                />
              </Grid>
            </Grid>
          </Stack>
        ) : null}
        {maxEnrollment ? (
          <Stack spacing={2}>
            <Typography variant="bodySmall" lightened uppercase bold>
              Max Enrollment
            </Typography>
            <Grid container>
              <Grid item>
                <Chip label={maxEnrollment} size="small" />
              </Grid>
            </Grid>
          </Stack>
        ) : null}
        {numClassrooms ? (
          <Stack spacing={2}>
            <Typography variant="bodySmall" lightened uppercase bold>
              Number of Classrooms
            </Typography>
            <Grid container>
              <Grid item>
                <Chip label={numClassrooms} size="small" />
              </Grid>
            </Grid>
          </Stack>
        ) : null}
        {governance ? (
          <Stack spacing={2}>
            <Typography variant="bodySmall" lightened uppercase bold>
              Governance
            </Typography>
            <Grid container>
              <Grid item>
                <Chip label={governance} size="small" />
              </Grid>
            </Grid>
          </Stack>
        ) : null}
        {ethnicity?.length ? (
          <Stack spacing={2}>
            <Typography variant="bodySmall" lightened uppercase bold>
              Ethnicity
            </Typography>
            <Grid container spacing={2}>
              {ethnicity.map((e, i) => (
                <Grid item key={i}>
                  <Chip label={e} size="small" />
                </Grid>
              ))}
            </Grid>
          </Stack>
        ) : null}
        {agesServed?.length ? (
          <Stack spacing={2}>
            <Typography variant="bodySmall" lightened uppercase bold>
              Ages Served
            </Typography>
            <Grid container spacing={2}>
              {agesServed.map((a, i) => (
                <Grid item key={i}>
                  <Chip label={a} size="small" />
                </Grid>
              ))}
            </Grid>
          </Stack>
        ) : null}

        {language ? (
          <Stack spacing={2}>
            <Typography variant="bodySmall" lightened uppercase bold>
              Language
            </Typography>
            <Grid container>
              <Grid item>
                <Chip label={language} size="small" />
              </Grid>
            </Grid>
          </Stack>
        ) : null}
        {state ? (
          <Stack spacing={2}>
            <Typography variant="bodySmall" lightened uppercase bold>
              State
            </Typography>
            <Grid container>
              <Grid item>
                <Chip label={state} size="small" />
              </Grid>
            </Grid>
          </Stack>
        ) : null}
        {montessoriCertification?.length ? (
          <Stack spacing={2}>
            <Typography variant="bodySmall" lightened uppercase bold>
              Montessori Certification
            </Typography>
            <Grid container spacing={2}>
              {montessoriCertification.map((m, i) => (
                <Grid item key={i}>
                  <Chip label={m} size="small" />
                </Grid>
              ))}
            </Grid>
          </Stack>
        ) : null}
      </Stack>
    </Card>
  );
};

export default AttributesCard;
