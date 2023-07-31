import Link from "next/link";

import { Grid, Typography, Stack, Button } from "@components/ui";
import PageContainer from "../components/ui/PageContainer";

const Custom500 = () => {
  const website = "/assets/images/website.png";

  return (
    <PageContainer hideNav>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item mt={24}>
          <Stack spacing={24} alignItems="center">
            <img src={website} style={{ maxWidth: "320px" }} />
            <Stack spacing={12} alignItems="center">
              <Typography variant="h4" bold highlight>
                ERROR 500
              </Typography>
              <Stack spacing={3} alignItems="center">
                <Typography variant="h1" bold>
                  Oops, something's not right.
                </Typography>
                <Typography variant="h3" lightened>
                  We're working on fixing this issue!
                </Typography>
              </Stack>
              <Link href="/login">
                <Button>
                  <Typography variant="bodyLarge" bold light>
                    Go back
                  </Typography>
                </Button>
              </Link>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Custom500;
