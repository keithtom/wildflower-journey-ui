import {
  Tooltip,
  Alert,
  List,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  ListItem,
  ListItemText,
  ListItemButton,
  ListSubheader,
  Chip,
  Stack,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Skeleton,
  Snackbar,
  Popper,
  FormControl,
  InputLabel,
  TextField,
  Select,
  OutlinedInput,
  MenuItem,
} from "@mui/material";

import { PageContainer, Grid, Typography, Link } from "@ui";
import useWorkflows from "@hooks/workflow/definition/useWorkflows";
import useSchools from "@hooks/useSchools";
import usePersons from "@hooks/usePersons";
const AdminDashboard = () => {
  const { workflows, isLoading } = useWorkflows();
  const { data: schools, isLoading: isLoadingSchools } = useSchools({
    serialization_fields: ["name"],
    page: 1,
    per_page: 1,
  });
  const { people, isLoading: isLoadingPeople } = usePersons({
    lightweight: true,
    page: 1,
    per_page: 1,
  });

  const workflowImage = "/assets/images/ssj/wildflowerSystems.jpg";
  const schoolsImage = "/assets/images/ssj/SSJ_hero.jpg";
  const peopleImage = "/assets/images/direct-human-support.jpg";

  return (
    <PageContainer isAdmin title="Admin Dashboard">
      <Stack spacing={6}>
        <Grid container spacing={6}>
          <Grid item sm={6} md={4}>
            <Card>
              <Link href="/admin/workflows">
                <CardActionArea>
                  <CardMedia
                    sx={{ height: 140 }}
                    image={workflowImage}
                    title="workflows"
                  />
                  <CardContent>
                    <Stack spacing={3}>
                      <Typography variant="bodyLarge" bold lightened>
                        Edit
                      </Typography>
                      <Typography variant="h2" bold>
                        {isLoading ? (
                          <Skeleton width={200} />
                        ) : (
                          `${workflows.length} Workflows`
                        )}
                      </Typography>
                      <Typography variant="bodyLarge" bold highlight>
                        {isLoading ? (
                          <Skeleton width={120} />
                        ) : (
                          "View workflows"
                        )}
                      </Typography>
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Card>
              <Link href="/admin/schools">
                <CardActionArea>
                  <CardMedia
                    sx={{ height: 140 }}
                    image={schoolsImage}
                    title="schools"
                  />
                  <CardContent>
                    <Stack spacing={3}>
                      <Typography variant="bodyLarge" bold lightened>
                        Edit
                      </Typography>
                      <Typography variant="h2" bold>
                        {isLoadingSchools ? (
                          <Skeleton width={200} />
                        ) : (
                          `${schools?.meta?.total_entries} Schools`
                        )}
                      </Typography>
                      <Typography variant="bodyLarge" bold highlight>
                        {isLoading ? <Skeleton width={120} /> : "View schools"}
                      </Typography>
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Card>
              <Link href="/admin/people">
                <CardActionArea>
                  <CardMedia
                    sx={{ height: 140 }}
                    image={peopleImage}
                    title="people"
                  />
                  <CardContent>
                    <Stack spacing={3}>
                      <Typography variant="bodyLarge" bold lightened>
                        Edit
                      </Typography>
                      <Typography variant="h2" bold>
                        {isLoadingPeople ? (
                          <Skeleton width={200} />
                        ) : (
                          `${people?.meta?.total_entries} People`
                        )}
                      </Typography>
                      <Typography variant="bodyLarge" bold highlight>
                        {isLoading ? <Skeleton width={120} /> : "View people"}
                      </Typography>
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </PageContainer>
  );
};

export default AdminDashboard;
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Add any additional props you need to pass to the page component
    },
  };
}
