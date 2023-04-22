import { CopyToClipboard } from "react-copy-to-clipboard";
import Link from "next/link";

import { Grid, Stack, Typography, IconButton, Icon, Card } from "@ui";

const UserContactInfo = ({ email, phone }) => {
  return (
    <Stack spacing={3}>
      {email ? (
        <Card size="small" variant="lightened">
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Stack spacing={1}>
                <Typography variant="bodyMini" bold lightened>
                  EMAIL
                </Typography>
                <Typography variant="bodyLarge">{email}</Typography>
              </Stack>
            </Grid>
            <Grid item>
              <CopyToClipboard text={email}>
                <IconButton>
                  <Icon type="copy" />
                </IconButton>
              </CopyToClipboard>
            </Grid>
          </Grid>
        </Card>
      ) : null}

      {phone ? (
        <Card size="small" variant="lightened">
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Stack spacing={1}>
                <Typography variant="bodyMini" bold lightened>
                  PHONE
                </Typography>
                <Typography variant="bodyLarge">{phone}</Typography>
              </Stack>
            </Grid>
            <Grid item>
              <CopyToClipboard text={phone}>
                <IconButton>
                  <Icon type="copy" />
                </IconButton>
              </CopyToClipboard>
            </Grid>
          </Grid>
        </Card>
      ) : null}

      {!phone && !email && (
        <Card variant="lightened">
          <Stack alignItems="center" spacing={3}>
            <Icon type="commentError" />

            <Typography variant="bodyLarge" center bold>
              We don't have any contact information for this person!
            </Typography>
            <Typography variant="bodyRegular" center>
              If you need to get in touch with them, please reach out to
              <Link href="mailto:support@wildflowerschools.org">
                <Typography variant="bodyRegular" highlight>
                  support@wildflowerschools.org
                </Typography>
              </Link>
            </Typography>
          </Stack>
        </Card>
      )}
    </Stack>
  );
};

export default UserContactInfo;
