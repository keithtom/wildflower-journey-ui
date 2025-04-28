import { useState } from "react";
import { styled, css } from "@mui/material/styles";

import { user } from "../../lib/utils/fake-data";
import { theme } from "../../styles/theme";
import { getScreenSize } from "../../hooks/react-responsive";

import { Box, Grid, Card, Stack, Icon, Typography, Spinner } from "./index";
import Nav from "../Nav";
import Header from "../Header";

// NOTE: This is not included in storybook

const PageWrapper = styled(Box)`
  display: flex;
`;
const PageContent = styled(Box)`
  flex-grow: 1;
  padding: ${({ theme }) => theme.util.buffer * 6}px;
  overflow-y: hidden;
`;

const PageContainer = ({
  children,
  isLoading,
  hideNav,
  title,
  isAdmin,
  ...props
}) => {
  const { screenSize } = getScreenSize();
  //TODO: Get this data from the backend
  const SSJAbandonProcessStarted = false;

  return (
    <>
      <PageWrapper>
        {SSJAbandonProcessStarted ? (
          <>
            <Header />
            <PageContent
              sx={{
                marginTop: screenSize.isSm
                  ? `${theme.util.appBarHeight * 2}px`
                  : `${theme.util.appBarHeight}px`,
              }}
            >
              <Grid container alignItems="center" justifyContent="center">
                <Grid item xs={12} sm={6} md={5} lg={4}>
                  <Card>
                    <Stack spacing={6}>
                      <Icon type="windowClose" variant="primary" size="large" />
                      <Typography variant="h4" bold>
                        You abandoned your School Startup Journey
                      </Typography>
                      <Typography variant="bodyLarge" lightened>
                        We're sorry to see you go. If it looks like you may
                        start a different Montessori school in the future, we
                        hope you choose Wildflower Schools.
                      </Typography>
                      <Card variant="primaryLightened" size="small">
                        <Typography variant="bodySmall">
                          Email rengage@wildflowerschools.org to talk to someone
                          about working with Wildflowers again.
                        </Typography>
                      </Card>
                    </Stack>
                  </Card>
                </Grid>
              </Grid>
            </PageContent>
          </>
        ) : (
          <>
            {!hideNav && <Header title={title} isAdmin={isAdmin} />}

            <PageContent
              sx={{
                marginTop: screenSize.isSm
                  ? `${theme.util.appBarHeight * 2}px`
                  : `${theme.util.appBarHeight}px`,
              }}
              {...props}
            >
              {isLoading ? (
                <Box
                  sx={{
                    flexGrow: "1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: `calc(100vh - ${theme.util.appBarHeight * 2}px)`,
                  }}
                >
                  <Spinner />
                </Box>
              ) : (
                children
              )}
            </PageContent>
          </>
        )}
      </PageWrapper>
    </>
  );
};

export default PageContainer;
