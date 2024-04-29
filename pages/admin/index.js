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
import useAllTeams from "@hooks/useAllTeams";

const AdminDashboard = () => {
  const { workflows, isLoading } = useWorkflows();
  const { teams, isLoading: isLoadingTeams } = useAllTeams();

  const workflowImage = "/assets/images/ssj/wildflowerSystems.jpg";
  const schoolsImage = "/assets/images/ssj/SSJ_hero.jpg";

  return (
    <PageContainer isAdmin>
      <Stack spacing={6}>
        <Grid container>
          <Grid item>
            <Typography variant="bodyLarge" bold>
              Admin Dashboard
            </Typography>
          </Grid>
        </Grid>
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
                        {isLoadingTeams ? (
                          <Skeleton width={200} />
                        ) : (
                          `${teams.length} Schools`
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
        </Grid>
      </Stack>
    </PageContainer>
  );
};

export default AdminDashboard;
