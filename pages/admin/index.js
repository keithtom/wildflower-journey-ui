import {
  Box,
  PageContainer,
  Button,
  Grid,
  Typography,
  Stack,
  Card,
  Avatar,
  Modal,
  TextField,
  Radio,
  Spinner,
  Link,
} from "@ui";

const AdminDashboard = () => {
  const id = "1234-asdf";
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
        <Grid container>
          <Stack spacing={3}>
            <Grid item>
              <Link href="/admin/add-school">
                <Button>
                  <Typography variant="bodyRegular" light bold>
                    Add a school
                  </Typography>
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Link href={`/admin/edit-workflow/1`}>
                <Button>
                  <Typography variant="bodyRegular" light bold>
                    Edit the School Startup Journey
                  </Typography>
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Link href={`/admin/edit-workflow/${id}`}>
                <Button>
                  <Typography variant="bodyRegular" light bold>
                    Edit the Open School Checklist
                  </Typography>
                </Button>
              </Link>
            </Grid>
          </Stack>
        </Grid>
      </Stack>
    </PageContainer>
  );
};

export default AdminDashboard;
