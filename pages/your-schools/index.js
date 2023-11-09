import { useUserContext } from "@lib/useUserContext";
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
} from "@ui";

const YourSchools = () => {
  const { currentUser } = useUserContext();
  return (
    <PageContainer>
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <Stack spacing={3} direction="row" alignItems="center">
            <Avatar src={currentUser?.attributes.imageUrl} />
            <Stack>
              <Typography variant="h4" bold>
                Welcome, Christina!
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

                <Stack spacing={3}>
                  {/* Map through school across phases */}
                  <Grid item>
                    <PhaseChip phase="Visioning" size="large" />
                  </Grid>
                  {/* Map through schools in visioning */}
                  <Card>
                    <Grid container alignItems="center">
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={3} direction="row" alignItems="center">
                          <Avatar />
                          <Stack>
                            <Typography variant="bodyLarge" bold>
                              June Bug Montessori
                            </Typography>
                            <Typography variant="bodyRegular" lightened>
                              Cambridge, Massachusetts
                            </Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={12} sm={6}>
                            <Stack spacing={3} direction="row">
                              <AvatarGroup>
                                <Avatar size="sm" />
                                <Avatar size="sm" />
                              </AvatarGroup>
                              <Stack>
                                <Typography variant="bodyRegular">
                                  Dale and Jennifer
                                </Typography>
                                <Typography variant="bodySmall" lightened>
                                  Emerging Teacher Leaders
                                </Typography>
                              </Stack>
                            </Stack>
                          </Grid>
                          <Grid item flex={1}>
                            <Stack>
                              <Typography variant="bodyRegular">
                                June 3, 2024
                              </Typography>
                              <Typography variant="bodySmall" lightened>
                                Q3 2024
                              </Typography>
                            </Stack>
                          </Grid>
                          <Grid item>
                            <Button variant="text" size="small">
                              <Typography variant="bodyRegular" bold>
                                View
                              </Typography>
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Card>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default YourSchools;
