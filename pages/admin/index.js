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
      </Stack>
    </PageContainer>
  );
};

export default AdminDashboard;
