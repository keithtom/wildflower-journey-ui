import { useState } from "react";

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
  Link,
} from "@ui";

const ProfileHero = ({
  profileImage,
  firstName,
  lastName,
  roles,
  school,
  schoolLogo,
  location,
  schoolLink,
}) => {
  return (
    <Card variant="lightened" size="large">
      <Grid container spacing={12} alignItems="center">
        <Grid item>
          <Avatar size="lg" src={profileImage} />
        </Grid>
        <Grid item flex={1}>
          <Stack
            style={{ height: "100%" }}
            justifyContent="space-between"
            spacing={6}
          >
            <Grid container justifyContent="space-between">
              <Grid item>
                <Stack spacing={2}>
                  <Typography variant="h2" bold>
                    {firstName} {lastName}
                  </Typography>
                  <Grid container>
                    {roles.map((r, i) => (
                      <Grid item key={i} pr={i === i.length ? 0 : 1}>
                        <Typography variant="h4" lightened>
                          {r} {i === roles.length - 1 ? null : "•"}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ProfileHero;
