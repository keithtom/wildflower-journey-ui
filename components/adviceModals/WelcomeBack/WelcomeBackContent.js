import { useState, useEffect } from "react";

import {
  Box,
  Grid,
  TextField,
  Select,
  MultiSelect,
  Button,
  Card,
  Typography,
  Stack,
  Switch,
  Checkbox,
} from "@ui";

const WelcomeBackContent = ({ toggle }) => {
  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Stack spacing={4}>
            <Typography>
              You're on track to making a successful decision! The most
              important thing you can do now is listen and reflect.
            </Typography>
            <Typography>
              However, sometimes it's hard to figure out how to get feedback
              from your advice givers. We recommend a few ways to stay on top of
              it:
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <Typography>
              Schedule 1 on 1 conversations with your advice givers
            </Typography>
          </Card>
          <Card>
            <Typography>Email your advice givers</Typography>
          </Card>
          <Card>
            <Typography>
              Bring your decision up in a group context (e.g. a faculty meeting)
            </Typography>
          </Card>
          <Card>
            <Typography>Share this decision broadly (e.g. in slack)</Typography>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Button fullWidth onClick={toggle}>
                Sounds good
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default WelcomeBackContent;
