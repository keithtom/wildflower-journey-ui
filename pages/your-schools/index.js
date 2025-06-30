import { useEffect } from "react";
import { useRouter } from "next/router";
import moment from "moment";
import Skeleton from "@mui/material/Skeleton";

import { useUserContext } from "@lib/useUserContext";
import useAuth from "@lib/utils/useAuth";
import useSchools from "@hooks/useSchools";
import PhaseChip from "../../components/PhaseChip";
import {
  PageContainer,
  Grid,
  Typography,
  Avatar,
  Card,
  Stack,
  AvatarGroup,
  Button,
  Icon,
} from "@ui";

const YourSchools = () => {
  const { currentUser } = useUserContext();

  const { data: schools, isLoading } = useSchools({
    person_id: currentUser?.id,
    role: "Ops Guide",
    serialization_fields: [
      "status",
      "currentPhase",
      "name",
      "tempLocation",
      "expectedStartDate",
      "activePartners",
      "id",
    ],
  });

  // useEffect(() => {
  //   console.log({ schools });
  // }, [schools, isLoading]);

  //set grouped teams by phase
  const visioningTeams = schools?.data.filter(
    (school) =>
      school.attributes.currentPhase === "visioning" &&
      school.attributes.status !== "Abandoned" &&
      school.attributes.status !== "Paused"
  );
  const planningTeams = schools?.data.filter(
    (school) =>
      school.attributes.currentPhase === "planning" &&
      school.attributes.status !== "Abandoned" &&
      school.attributes.status !== "Paused"
  );
  const startupTeams = schools?.data.filter(
    (school) =>
      school.attributes.currentPhase === "startup" &&
      school.attributes.status !== "Abandoned" &&
      school.attributes.status !== "Paused"
  );

  useAuth("/login");

  return (
    <PageContainer title="Your Schools">
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <Stack spacing={6}>
                {isLoading ? (
                  <Stack spacing={6}>
                    <Skeleton width={120} height={48} />
                    <Stack spacing={3}>
                      {Array.from({ length: 5 }, (_, j) => (
                        <Skeleton key={j} height={64} m={0} variant="rounded" />
                      ))}
                    </Stack>
                  </Stack>
                ) : visioningTeams.length ? (
                  <Stack spacing={6}>
                    <Grid item>
                      <PhaseChip phase="Visioning" size="large" />
                    </Grid>
                    <Stack spacing={3} id="visioning-stack">
                      {visioningTeams?.map((v, i) => (
                        <SchoolCard
                          key={i}
                          name={v.attributes.name}
                          location={v.attributes.tempLocation}
                          openDate={v.attributes.expectedStartDate}
                          team={v.attributes.activePartners}
                          schoolId={v.id}
                        />
                      ))}
                    </Stack>
                  </Stack>
                ) : null}

                {isLoading ? (
                  <Stack spacing={6}>
                    <Skeleton width={120} height={48} />
                    <Stack spacing={3}>
                      {Array.from({ length: 5 }, (_, j) => (
                        <Skeleton key={j} height={64} m={0} variant="rounded" />
                      ))}
                    </Stack>
                  </Stack>
                ) : planningTeams.length ? (
                  <Stack spacing={6}>
                    <Grid item>
                      <PhaseChip phase="Planning" size="large" />
                    </Grid>
                    <Stack spacing={3}>
                      {planningTeams?.map((p, i) => (
                        <SchoolCard
                          key={i}
                          name={p.attributes.name}
                          location={p.attributes.tempLocation}
                          openDate={p.attributes.expectedStartDate}
                          team={p.attributes.activePartners}
                          schoolId={p.id}
                        />
                      ))}
                    </Stack>
                  </Stack>
                ) : null}
                {isLoading ? (
                  <Stack spacing={6}>
                    <Skeleton width={120} height={48} />
                    <Stack spacing={3}>
                      {Array.from({ length: 5 }, (_, j) => (
                        <Skeleton key={j} height={64} m={0} variant="rounded" />
                      ))}
                    </Stack>
                  </Stack>
                ) : startupTeams.length ? (
                  <Stack spacing={6}>
                    <Grid item>
                      <PhaseChip phase="Startup" size="large" />
                    </Grid>
                    <Stack spacing={3}>
                      {startupTeams?.map((s, i) => (
                        <SchoolCard
                          key={i}
                          name={s.attributes.name}
                          location={s.attributes.tempLocation}
                          openDate={s.attributes.expectedStartDate}
                          team={s.attributes.activePartners}
                          schoolId={s.id}
                        />
                      ))}
                    </Stack>
                  </Stack>
                ) : null}
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default YourSchools;

const SchoolCard = ({ name, location, team, openDate, schoolId }) => {
  const router = useRouter();
  const handleSetActiveTeam = (schoolId) => {
    router.push(`/school/${schoolId}/`);
  };

  return (
    <Card size="small">
      <Grid container alignItems="center" spacing={6}>
        <Grid item xs={12} sm={6}>
          <Stack
            spacing={3}
            direction="row"
            alignItems="center"
            sx={{ width: "85%" }}
          >
            <Stack sx={{ width: "100%" }}>
              <Typography
                variant="bodyLarge"
                bold
                noWrap
                sx={{ width: "100%" }}
              >
                {name}
              </Typography>

              <Stack direction="row" spacing={3}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Icon type="map" variant="lightened" size="small" />
                  <Typography variant="bodyRegular" lightened>
                    {location ? location : "Location TBD"}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Icon type="calendar" variant="lightened" size="small" />

                  <Typography variant="bodyRegular" lightened>
                    Open Date{" "}
                    {openDate ? moment(openDate).format("MMMM D, YYYY") : "TBD"}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container alignItems="center">
            <Grid item flex={1}>
              <Stack spacing={3} direction="row">
                <AvatarGroup>
                  {team &&
                    team?.map((t, i) => (
                      <Avatar
                        size="sm"
                        src={t.data.attributes?.imageUrl}
                        key={i}
                      />
                    ))}
                </AvatarGroup>
                <Stack>
                  <span>
                    <Typography variant="bodyRegular">
                      {team &&
                        team?.map((t, i) => (
                          <span key={i}>
                            {t.data.attributes.firstName}{" "}
                            {t.data.attributes.lastName}{" "}
                            {i !== team.length - 1 ? "and " : null}
                          </span>
                        ))}
                    </Typography>
                  </span>
                  <Typography variant="bodySmall" lightened>
                    Emerging Teacher Leaders
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid item>
              <Button
                variant="text"
                small
                onClick={() => handleSetActiveTeam(schoolId)}
              >
                <Typography variant="bodyRegular" bold>
                  View
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Add any additional props you need to pass to the page component
    },
  };
}
