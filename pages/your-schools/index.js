import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import moment from "moment";

import peopleApi from "@api/people";
import teamsApi from "@api/ssj/teams";
import { useUserContext, useAssignViewingSchool } from "@lib/useUserContext";
import { clearLoggedInState } from "@lib/handleLogout";
import { handleFindMatchingItems } from "@lib/utils/usefulHandlers";
import useAuth from "@lib/utils/useAuth";

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

  useAuth("/login");

  //swr call to teams for currentUser ops guide
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    "api/ssj/teams",
    () => teamsApi.index().then((res) => res.data),
    {
      onErrorRetry: (error) => {
        if (error?.response?.status === 401) {
          clearLoggedInState({});
          router.push("/login");
        } else {
          console.error(error);
        }
      },
    }
  );
  //set teams array
  let ssjTeams = data || [];
  //set a new array of the ETLs
  const ssjETLs = [].concat(
    ...ssjTeams.map((t) => t.relationships.partners.data)
  );
  //request the people data from the api
  const { data: peopleData, isLoading: peopleDataLoading } = useSWR(
    "/api/person",
    () => peopleApi.index().then((res) => res?.data),
    {
      onErrorRetry: (error) => {
        if (error?.response?.status === 401) {
          clearLoggedInState({});
          router.push("/login");
        } else {
          console.error(error);
        }
      },
    }
  );
  //TODO: Find a way to only request this data from the peopleApi so the entire people list is not provided, slowing performance
  //TODO: or, find a way to include the ssj etl display data in the teamapi req
  //Filter the people data to only show ETLs part of the relevant teams
  const ETLs =
    peopleData && ssjETLs && handleFindMatchingItems(peopleData, ssjETLs, "id");

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

  //identify the workflowID for each of the teams

  // console.log({ ssjETLs });
  // console.log({ ETLs });
  // console.log({ ssjTeams });
  // console.log({ peopleData });
  // console.log({ visioningTeams });
  // console.log({ currentUser });
  // console.log({ data });

  return (
    <PageContainer isLoading={isLoading}>
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

                {visioningTeams.length ? (
                  <Stack spacing={3}>
                    <Grid item>
                      <PhaseChip phase="Visioning" size="large" />
                    </Grid>
                    {visioningTeams.map((v, i) => (
                      <SchoolCard
                        key={i}
                        name={v.attributes.tempName}
                        location={v.attributes.tempLocation}
                        openDate={v.attributes.expectedStartDate}
                        team={
                          ETLs &&
                          visioningTeams &&
                          handleFindMatchingItems(
                            ETLs,
                            v.relationships.partners.data,
                            "id"
                          )
                        }
                        workflowId={v.attributes.workflowId}
                      />
                    ))}
                  </Stack>
                ) : null}
                {planningTeams.length ? (
                  <Stack spacing={3}>
                    <Grid item>
                      <PhaseChip phase="Planning" size="large" />
                    </Grid>
                    {planningTeams.map((p, i) => (
                      <SchoolCard
                        key={i}
                        name={p.attributes.tempName}
                        location={p.attributes.tempLocation}
                        openDate={p.attributes.expectedStartDate}
                        team={
                          ETLs &&
                          planningTeams &&
                          handleFindMatchingItems(
                            ETLs,
                            p.relationships.partners.data,
                            "id"
                          )
                        }
                        workflowId={p.attributes.workflowId}
                      />
                    ))}
                  </Stack>
                ) : null}
                {startupTeams.length ? (
                  <Stack spacing={3}>
                    <Grid item>
                      <PhaseChip phase="Startup" size="large" />
                    </Grid>
                    {startupTeams.map((s, i) => (
                      <SchoolCard
                        key={i}
                        name={s.attributes.tempName}
                        location={s.attributes.tempLocation}
                        openDate={s.attributes.expectedStartDate}
                        team={
                          ETLs &&
                          startupTeams &&
                          handleFindMatchingItems(
                            ETLs,
                            s.relationships.partners.data,
                            "id"
                          )
                        }
                        workflowId={s.attributes.workflowId}
                      />
                    ))}
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
    router.push(`/ssj/${workflowId}/to-do-list`);
    console.log(workflowId);
    sessionStorage.setItem("schoolName", name);
    // set the workflow id for the team to view
    // store the workflow id in state someplace that can be accessed by other pages (a new useWorkflow context hook?) -> maybe a generalized state manager context hook...
    //redirect to that team's ssj to do list
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
                          <span>
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
