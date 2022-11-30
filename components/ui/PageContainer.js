import { styled, css } from "@mui/material/styles";
import { Box, Grid, Card, Stack, Icon, Typography } from "./index";
import Nav from "../Nav";
import Header from "../Header";

// NOTE: This is not included in storybook

const PageWrapper = styled(Box)`
  display: flex;
`;
const PageContent = styled(Box)`
  flex-grow: 1;
  margin-top: ${({ theme }) => theme.util.appBarHeight}px;
  padding: ${({ theme }) => theme.util.buffer * 6}px;
`;

const PageContainer = ({ children }) => {
  //TODO: Get this data from the backend
  const SSJAbandonProcessStarted = false;

  return (
    <>
      <PageWrapper>
        {SSJAbandonProcessStarted ? (
          <>
            <Header />
            <PageContent>
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
            <Nav />
            <PageContent>{children}</PageContent>
          </>
        )}
      </PageWrapper>
    </>
  );
};

export default PageContainer;
