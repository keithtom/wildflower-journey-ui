import { styled, css } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";

import {
  Button,
  Grid,
  Stack,
  Typography,
  Card,
  Box,
  Link,
  TextField,
  PageContainer,
} from "@ui";

const LoggedOut = ({}) => {
  return (
    <PageContainer hideNav>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card>
            <Stack spacing={6}>
              <Grid container justifyContent="center" spacing={6}>
                <Grid item>
                  <Typography variant="h4" bold>
                    You're logged out
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="bodyRegular">
                    Thanks for using My Wildflower! We will see you again soon!
                  </Typography>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Link href="/login">
                  <Button full variant="secondary">
                    <Typography variant="bodyRegular">Log in again</Typography>
                  </Button>
                </Link>
              </Grid>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default LoggedOut;
