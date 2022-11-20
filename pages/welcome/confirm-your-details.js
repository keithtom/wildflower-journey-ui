import { useEffect, useState } from "react";
import { styled, css } from "@mui/material/styles";

import {
  Button,
  Grid,
  Stack,
  Typography,
  Card,
  Box,
  Icon,
  Avatar,
  Link,
} from "@ui";
import Header from "@components/Header";

const PageContent = styled(Box)`
  flex-grow: 1;
  margin-top: ${({ theme }) => theme.util.appBarHeight}px;
  padding: ${({ theme }) => theme.util.buffer * 6}px;
`;
const ConfirmYourDetails = ({}) => {
  const user = false;
  return (
    <>
      <Header user={user} />
      <PageContent>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Card>
              <Stack alignItems="center">
                <Typography variant="h4" bold>
                  Confirm your personal details
                </Typography>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </PageContent>
    </>
  );
};

export default ConfirmYourDetails;
