import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import {
  Avatar,
  Box,
  Grid,
  Typography,
  Divider,
  Card,
  Stack,
  IconButton,
  Icon,
} from "@ui";

const ProfileHero = ({ profileImage, name, action }) => {
  return (
    <Card variant="lightened" size="large">
      <Grid container spacing={8}>
        {profileImage && (
          <Grid item>
            <Avatar size="xl" src={profileImage} />
          </Grid>
        )}
        <Grid item flex={1}>
          <Stack style={{ height: "100%" }} justifyContent="space-between">
            <Grid container justifyContent="space-between">
              <Grid item>
                <Stack>
                  <Typography variant="h2" bold>
                    {name}
                  </Typography>
                  <Typography variant="h3" lightened>
                    Teacher Leader
                  </Typography>
                </Stack>
              </Grid>
              <Grid item>
                <Typography variant="bodyLarge" lightened>
                  Wild Rose Montessori
                </Typography>
                <Typography variant="bodyRegular" lightened>
                  Cambridge, MA
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <Card size="small">
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Grid item>
                      <Stack spacing={1}>
                        <Typography variant="bodyMini" bold lightened>
                          EMAIL
                        </Typography>
                        <Typography variant="bodyLarge">
                          katelyn@wildrosemontessori.com
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item>
                      <CopyToClipboard text="katelyn@wildrosemontessori.com">
                        <IconButton>
                          <Icon type="copy" />
                        </IconButton>
                      </CopyToClipboard>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card size="small">
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Grid item>
                      <Stack spacing={1}>
                        <Typography variant="bodyMini" bold lightened>
                          PHONE
                        </Typography>
                        <Typography variant="bodyLarge">
                          (123) 456 7891
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item>
                      <CopyToClipboard text="1234567891">
                        <IconButton>
                          <Icon type="copy" />
                        </IconButton>
                      </CopyToClipboard>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
        {/* {action && <Grid item>{action}</Grid>} */}
      </Grid>
    </Card>
  );
};

export default ProfileHero;
