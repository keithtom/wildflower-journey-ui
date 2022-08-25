import { useState } from "react";

import { phases } from "../../lib/utils/fake-data";

import {
  PageContainer,
  Button,
  Grid,
  Typography,
  Stack,
  Card,
  Avatar,
  AvatarGroup,
} from "@ui";

const SSJ = ({}) => {
  const [viewPhaseProgress, setViewPhaseProgress] = useState(true);

  return (
    <PageContainer>
      <Stack spacing={12}>
        <Typography variant="h3" bold>
          School Startup Journey
        </Typography>
        <Card>
          <Stack spacing={6}>
            <Typography variant="h4" bold>
              Your Startup Family
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <UserCard />
              </Grid>
              <Grid item xs={12} sm={4}>
                <UserCard />
              </Grid>
              <Grid item xs={12} sm={4}>
                <UserCard />
              </Grid>
            </Grid>
          </Stack>
        </Card>
        <Card variant="lightened" size="large">
          <Grid container justifyContent="space-between">
            <Grid item>
              <Stack>
                <Typography variant="h4" bold>
                  You're not alone. There are 22 other Emerging Teacher Leaders!
                </Typography>
                <Typography variant="bodyRegular" lightened>
                  Get to know a growing number of ETLs, share learnings, and
                  educate together.
                </Typography>
              </Stack>
            </Grid>
            <Grid item>
              <Stack direction="row" spacing={6}>
                <AvatarGroup>
                  <Avatar />
                  <Avatar />
                  <Avatar />
                  <Avatar />
                </AvatarGroup>
                <Button>
                  <Typography variant="h4" bold light>
                    Meet your peers!
                  </Typography>
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Card>
        <Card>
          <Stack spacing={6}>
            <Typography variant="h4" bold>
              Ways to work together
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Card variant="lightened">
                  <Stack spacing={6}>
                    <Typography variant="bodyLarge" bold>
                      With your self
                    </Typography>
                    <Stack spacing={3}>
                      <Card size="small">Check on your growth plan</Card>
                      <Card size="small">Engage in equity training</Card>
                      <Card size="small" variant="lightened">
                        View more
                      </Card>
                    </Stack>
                  </Stack>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card variant="lightened">
                  <Stack spacing={6}>
                    <Typography variant="bodyLarge" bold>
                      With your team
                    </Typography>
                    <Stack spacing={3}>
                      <Card size="small">Check on your growth plan</Card>
                      <Card size="small">Engage in equity training</Card>
                      <Card size="small" variant="lightened">
                        View more
                      </Card>
                    </Stack>
                  </Stack>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card variant="lightened">
                  <Stack spacing={6}>
                    <Typography variant="bodyLarge" bold>
                      With your community
                    </Typography>
                    <Stack spacing={3}>
                      <Card size="small">Check on your growth plan</Card>
                      <Card size="small">Engage in equity training</Card>
                      <Card size="small" variant="lightened">
                        View more
                      </Card>
                    </Stack>
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </Stack>
        </Card>
        <Card>
          <Stack spacing={6}>
            <Stack direction="row" spacing={6}>
              <Typography
                variant="h4"
                bold
                hoverable
                lightened={!viewPhaseProgress}
                onClick={() => setViewPhaseProgress(true)}
              >
                Phases
              </Typography>
              <Typography
                variant="h4"
                bold
                hoverable
                lightened={viewPhaseProgress}
                onClick={() => setViewPhaseProgress(false)}
              >
                Categories
              </Typography>
            </Stack>

            {viewPhaseProgress ? (
              <Grid container spacing={3}>
                <Grid item xs={12} sm={3}>
                  <Card variant="lightened">
                    <Stack spacing={6}>
                      <Typography variant="bodyLarge" bold>
                        Discovery
                      </Typography>
                    </Stack>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Card variant="lightened">
                    <Stack spacing={6}>
                      <Typography variant="bodyLarge" bold>
                        Visioning
                      </Typography>
                    </Stack>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Card variant="lightened">
                    <Stack spacing={6}>
                      <Typography variant="bodyLarge" bold>
                        Planning
                      </Typography>
                    </Stack>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Card variant="lightened">
                    <Stack spacing={6}>
                      <Typography variant="bodyLarge" bold>
                        Startup
                      </Typography>
                    </Stack>
                  </Card>
                </Grid>
              </Grid>
            ) : (
              <Grid container spacing={3}>
                {phases.map((p, i) => (
                  <Grid item xs={12} sm={4}>
                    <Card variant="lightened" key={i}>
                      <Typography variant="bodyLarge" bold>
                        {p}
                      </Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Stack>
        </Card>
      </Stack>
    </PageContainer>
  );
};

export default SSJ;

const UserCard = ({}) => {
  return (
    <Card variant="lightened" size="small">
      <Grid container spacing={3}>
        <Grid item>
          <Avatar />
        </Grid>
        <Grid item>
          <Stack>
            <Typography variant="bodyRegular" bold>
              FirstName LastName
            </Typography>
            <Typography variant="bodySmall" lightened>
              Resident Site Entrepreneur
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
};
