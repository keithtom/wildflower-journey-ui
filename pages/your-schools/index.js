import { useRouter } from "next/router";
import moment from "moment";
import Skeleton from "@mui/material/Skeleton";

import { useUserContext } from "@lib/useUserContext";
import useAuth from "@lib/utils/useAuth";
import useSSJTeams from "@hooks/useSSJTeams";

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
  const router = useRouter();

  //fetch data
  const { teams, isLoading } = useSSJTeams();

  //set teams array
  let ssjTeams = teams || [];

  //set grouped teams by phase
  const visioningTeams = ssjTeams.filter(
    (team) => team.attributes.currentPhase === "visioning"
  );
  const planningTeams = ssjTeams.filter(
    (team) => team.attributes.currentPhase === "planning"
  );
  const startupTeams = ssjTeams.filter(
    (team) => team.attributes.currentPhase === "startup"
  );

  useAuth("/login");
  // console.log({ ssjTeams });

  return (
    <PageContainer>
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <Stack spacing={3} direction="row" alignItems="center">
            <Avatar src={currentUser?.attributes.imageUrl} />
            <Stack>
              <Typography variant="h4" bold>
                Welcome, {currentUser?.attributes?.firstName}!
              </Typography>
              <Typography variant="bodyLarge" lightened>
                Operations Dashboard
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <Stack spacing={6}>
                <Typography variant="bodyLarge" bold>
                  Your Schools
                </Typography>

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
                      {visioningTeams.map((v, i) => (
                        <SchoolCard
                          key={i}
                          name={v.attributes.tempName}
                          location={v.attributes.tempLocation}
                          openDate={v.attributes.expectedStartDate}
                          team={v.relationships.partners.data}
                          workflowId={v.attributes.workflowId}
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
                      {planningTeams.map((p, i) => (
                        <SchoolCard
                          key={i}
                          name={p.attributes.tempName}
                          location={p.attributes.tempLocation}
                          openDate={p.attributes.expectedStartDate}
                          team={p.relationships.partners.data}
                          workflowId={p.attributes.workflowId}
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
                      {startupTeams.map((s, i) => (
                        <SchoolCard
                          key={i}
                          name={s.attributes.tempName}
                          location={s.attributes.tempLocation}
                          openDate={s.attributes.expectedStartDate}
                          team={s.relationships.partners.data}
                          workflowId={s.attributes.workflowId}
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

const SchoolCard = ({ name, location, team, openDate, workflowId }) => {
  const router = useRouter();
  const handleSetActiveTeam = (workflowId) => {
    sessionStorage.setItem("schoolName", name);
    router.push(`/ssj/${workflowId}/to-do-list`);
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
            <Avatar size="sm" />
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
                    team.map((t, i) => (
                      <Avatar size="sm" src={t.attributes?.imageUrl} key={i} />
                    ))}
                </AvatarGroup>
                <Stack>
                  <span>
                    <Typography variant="bodyRegular">
                      {team &&
                        team.map((t, i) => (
                          <span key={i}>
                            {t.attributes.firstName} {t.attributes.lastName}{" "}
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
                onClick={() => handleSetActiveTeam(workflowId)}
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
