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
  IconButton,
  TextField,
  Select,
  MultiSelect,
  Radio,
  PageContainer,
} from "@ui";

const Terms = ({}) => {
  return (
    <PageContainer hideNav>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={9} md={7}>
          <Stack spacing={6}>
            <Typography variant="h2">Terms</Typography>
            <Typography variant="bodyLarge">
              This site is intended for use by the Wildflower community and the{" "}
              <Link
                href="https://connected.wildflowerschools.org/series/4409942/posts/4409924-wildflower-s-community-norms"
                target="_blank"
              >
                norms
              </Link>
              ,{" "}
              <Link
                href="https://connected.wildflowerschools.org/series/4409942/posts/4409908-wildflower-s-shared-values"
                target="_blank"
              >
                values
              </Link>{" "}
              and{" "}
              <Link
                href="https://connected.wildflowerschools.org/series/4676209-series-network-policies"
                target="_blank"
              >
                policies
              </Link>{" "}
              of the Wildflower community govern its usage. By using this site,
              you agree to adhere to Wildflower's expectations and policies. If
              you have questions or concerns, please email{" "}
              <Link href="mailto:support@wildflowerschools.org">
                support@wildflowerschools.org.
              </Link>
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Terms;
