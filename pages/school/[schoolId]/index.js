import { useRouter } from "next/router";
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListSubheader,
  ListItemAvatar,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { theme } from "../../../styles/theme";
import { useUserContext } from "@lib/useUserContext";
import { PageContainer, Grid, Card, Typography, Stack, Avatar } from "@ui";
import Header from "@components/Header";

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.radius.md,
  padding: theme.spacing(1.5, 2),

  "&:hover": {
    backgroundColor: theme.color.neutral.lightened,
  },
}));

const SchoolPage = ({}) => {
  const router = useRouter();
  const { schoolId } = router.query;

  const { currentUser } = useUserContext();
  console.log(currentUser);

  const hero = "/assets/images/ssj/SSJ_hero.jpg";

  return (
    <PageContainer>
      {/* <Header>
        <div>School name</div>
      </Header> */}
      <Grid container spacing={6}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Stack spacing={4}>
                <img src={hero} style={{ width: "100%", borderRadius: 12 }} />
                <List
                  subheader={
                    <ListSubheader
                      component="div"
                      sx={{
                        pb: 2, // Add padding bottom
                        px: 2,
                        backgroundColor: "transparent",
                      }}
                    >
                      <Typography variant="bodyRegular" bold>
                        School Startup Journey
                      </Typography>
                    </ListSubheader>
                  }
                >
                  <ListItem disablePadding>
                    <StyledListItemButton>
                      <ListItemText
                        primary={
                          <Grid container>
                            <Grid item xs={6}>
                              <Typography variant="bodyRegular" lightened>
                                Phase
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="bodyRegular">
                                Visioning
                              </Typography>
                            </Grid>
                          </Grid>
                        }
                      />
                    </StyledListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <StyledListItemButton>
                      <ListItemText
                        primary={
                          <Grid container>
                            <Grid item xs={6}>
                              <Typography variant="bodyRegular" lightened>
                                Location
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="bodyRegular">
                                Seattle, WA
                              </Typography>
                            </Grid>
                          </Grid>
                        }
                      />
                    </StyledListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <StyledListItemButton>
                      <ListItemText
                        primary={
                          <Grid container>
                            <Grid item xs={6}>
                              <Typography variant="bodyRegular" lightened>
                                Open Date
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="bodyRegular">
                                September 1, 2026
                              </Typography>
                            </Grid>
                          </Grid>
                        }
                      />
                    </StyledListItemButton>
                  </ListItem>
                </List>
              </Stack>
              <Divider sx={{ borderColor: theme.color.neutral.lightened }} />
              <List
                subheader={
                  <ListSubheader
                    component="div"
                    sx={{
                      pb: 2, // Add padding bottom
                      px: 2,
                      backgroundColor: "transparent",
                    }}
                  >
                    <Typography variant="bodyRegular" bold>
                      Startup Team
                    </Typography>
                  </ListSubheader>
                }
              >
                <ListItem disablePadding>
                  <StyledListItemButton>
                    <ListItemAvatar>
                      <Avatar
                        sx={{ height: 40, width: 40 }}
                        src={currentUser?.attributes.imageUrl}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="bodyRegular">
                          Maggie Paulin
                        </Typography>
                      }
                      secondary={
                        <Typography variant="bodyRegular" lightened>
                          Emerging Teacher Leader
                        </Typography>
                      }
                    />
                  </StyledListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <StyledListItemButton>
                    <ListItemAvatar>
                      <Avatar
                        sx={{ height: 40, width: 40 }}
                        src={currentUser?.attributes.imageUrl}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="bodyRegular">
                          Maggie Paulin
                        </Typography>
                      }
                      secondary={
                        <Typography variant="bodyRegular" lightened>
                          Emerging Teacher Leader
                        </Typography>
                      }
                    />
                  </StyledListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <StyledListItemButton>
                    <ListItemAvatar>
                      <Avatar
                        sx={{ height: 40, width: 40 }}
                        src={currentUser?.attributes.imageUrl}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="bodyRegular">
                          Maggie Paulin
                        </Typography>
                      }
                      secondary={
                        <Typography variant="bodyRegular" lightened>
                          Emerging Teacher Leader
                        </Typography>
                      }
                    />
                  </StyledListItemButton>
                </ListItem>
              </List>
            </Stack>
          </Card>
        </Grid>
        <Grid item>
          <div>
            <Typography variant="h2">Welcome, Maggie!</Typography>
          </div>
          <div>cta</div>
          <div>progress</div>
          <div>ways to work together</div>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default SchoolPage;
