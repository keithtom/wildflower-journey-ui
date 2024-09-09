import { useState } from "react";

import {
  Avatar,
  Box,
  Chip,
  Grid,
  Typography,
  Divider,
  Card,
  Stack,
  IconButton,
  Icon,
  Link,
} from "@ui";
import { getScreenSize } from "@hooks/react-responsive";

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
  const { screenSize } = getScreenSize();
  return (
    <Card variant="lightened" size={screenSize.isSm ? null : "large"}>
      <Grid
        container
        spacing={screenSize.isSm ? 6 : 12}
        alignItems="center"
        justifyContent={screenSize.isSm && "center"}
        direction={screenSize.isSm ? "column" : "row"}
      >
        <Grid item>
          <Avatar size="lg" src={profileImage} />
        </Grid>
        <Grid item flex={1}>
          <Stack
            style={{ height: "100%" }}
            justifyContent="space-between"
            spacing={6}
          >
            <Grid
              container
              spacing={6}
              justifyContent={screenSize.isSm ? "center" : null}
            >
              <Grid item>
                <Typography variant="h2" bold>
                  {firstName} {lastName}
                </Typography>
              </Grid>
              <Grid item>
                <Grid
                  container
                  spacing={2}
                  justifyContent={screenSize.isSm ? "center" : null}
                >
                  {roles.map((r, i) => (
                    <Grid item key={i}>
                      <Chip label={r} size="small" />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ProfileHero;
