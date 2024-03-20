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
} from "@mui/material";
import { PageContainer, Grid, Typography } from "@ui";

const Workflows = ({}) => {
  const router = useRouter();

  const workflowId = "asdf-1234";

  return (
    <PageContainer isAdmin>
      <Stack spacing={6}>
        <Grid container>
          <Grid item>
            <Typography variant="h4" bold>
              Workflows
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <Card noPadding>
              <List
                subheader={
                  <ListSubheader
                    component="div"
                    id="nested-list-subheader"
                    sx={{ background: "#eaeaea" }}
                  >
                    School Startup Journey
                  </ListSubheader>
                }
              >
                {/* TODO: Map through the workflows */}
                <ListItem disablePadding divider>
                  <ListItemButton
                    onClick={() =>
                      router.push(`/admin/workflows/${workflowId}`)
                    }
                  >
                    <Stack direction="row" spacing={3} alignItems="center">
                      <ListItemText>Independent</ListItemText>
                      <Chip label="Sensible default" size="small" />
                      <Chip label="Live" color="primary" size="small" />
                      <Typography>Last version created 3 days ago</Typography>
                      <Typography>V13</Typography>
                      <Typography>Used by 30 schools</Typography>
                    </Stack>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding divider>
                  <ListItemButton>
                    <Stack direction="row" spacing={3} alignItems="center">
                      <ListItemText>Charter</ListItemText>
                      <Chip label="Sensible default" size="small" />
                      <Chip label="Live" color="primary" size="small" />
                      <Typography>Last version created 3 days ago</Typography>
                      <Typography>V13</Typography>
                      <Typography>Used by 30 schools</Typography>
                    </Stack>
                  </ListItemButton>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <Card noPadding>
              <List
                subheader={
                  <ListSubheader
                    component="div"
                    id="nested-list-subheader"
                    sx={{ background: "#eaeaea" }}
                  >
                    Open School Checklist
                  </ListSubheader>
                }
              >
                <ListItem disablePadding divider>
                  <ListItemButton>
                    <Stack direction="row" spacing={3} alignItems="center">
                      <ListItemText>Independent</ListItemText>
                      <Chip label="Sensible default" size="small" />
                      <Chip label="Live" color="primary" size="small" />
                      <Typography>Last version created 3 days ago</Typography>
                      <Typography>V13</Typography>
                      <Typography>Used by 30 schools</Typography>
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
export default Workflows;
