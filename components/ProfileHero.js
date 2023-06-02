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
                  {roles.map((r, i) => (
                    <Typography variant="h4" lightened key={i}>
                      {r} {i === roles.length - 1 ? null : "•"}
                    </Typography>
                  ))}
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
