import { useRouter } from "next/router";

import {
  List,
  Card,
  ListItem,
  ListItemText,
  ListItemButton,
  ListSubheader,
  Chip,
  Stack,
  Button,
  Box,
} from "@mui/material";
import { PageContainer, Grid, Typography } from "@ui";

const Workflow = ({}) => {
  const router = useRouter();
  const processId = "qwer-5678";

  return (
    <PageContainer isAdmin>
      <Stack spacing={6}>
        <Grid container alignItems="flex-end" justifyContent="space-between">
          <Grid item xs={12} sm={6}>
            <Stack spacing={2}>
              <Typography variant="bodyRegular" bold>
                School Startup Journey
              </Typography>
              <Stack direction="row" spacing={3} alignItems="center">
                <Typography variant="h4" bold>
                  Independent
                </Typography>
                <Chip label="Sensible default" size="small" />
                <Chip label="Live" size="small" color="primary" />
                <Typography variant="bodyRegular" lightened>
                  Last updated 3 days ago
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item>
            <Button variant="contained" disabled>
              Start New Version
            </Button>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <Card noPadding>
              {/* TODO: Map through the sections */}
              <List
                subheader={
                  <ListSubheader
                    component="div"
                    id="nested-list-subheader"
                    sx={{ background: "#eaeaea" }}
                  >
                    Visioning
                  </ListSubheader>
                }
              >
                {/* TODO: Map through processes for section */}
                <ListItem disablePadding divider>
                  <Stack
                    sx={{
                      width: "48px",
                      borderRight: "1px solid #eaeaea",
                      height: "48px",
                    }}
                    alignItems="center"
                    justifyContent="center"
                  >
                    {/* TODO This is where dragging goes, and where status indicators go */}
                    •
                  </Stack>
                  <ListItemButton
                    onClick={() =>
                      router.push(`/admin/workflows/processes/${processId}`)
                    }
                  >
                    <Stack direction="row" spacing={3} alignItems="center">
                      <ListItemText>Develop your visioning album</ListItemText>
                      <Chip label="2 steps" size="small" />
                      <Chip label="Album, Advice, & Affiliation" size="small" />
                    </Stack>
                  </ListItemButton>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </PageContainer>
  );
};

export default Workflow;
