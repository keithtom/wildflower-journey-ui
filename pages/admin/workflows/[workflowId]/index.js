import { useState } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { PageContainer, Grid, Typography } from "@ui";
import InlineActionTile from "@components/admin/InlineActionTile";

const Workflow = ({}) => {
  const router = useRouter();
  const workflowId = router.query.workflowId;
  const processId = "qwer-5678";

  const [isDraftingNewVersion, setIsDraftingNewVersion] = useState(false);
  const [versionHasChanges, setVersionHasChanges] = useState(false);
  const [addProcessModalOpen, setAddProcessModalOpen] = useState(false);

  const processStatus = "unedited";

  const handleStartNewVersion = () => {
    console.log("Start new version");
    setIsDraftingNewVersion(true);
  };
  const handleSubmitNewVersion = () => {
    console.log("Submit new version");
  };
  const handleCancelDraft = () => {
    console.log("Cancel draft");
    setIsDraftingNewVersion(false);
  };
  const handleAddProcess = () => {
    console.log("Add process");
    setAddProcessModalOpen(true);
  };
  const handleRemoveProcess = (id) => {
    console.log("Remove process", id);
  };
  const handleRestoreProcess = (id) => {
    console.log("Restore process", id);
  };
  const handleReplaceProcess = (id) => {
    console.log("Replace process", id);
  };
  const handleRepositionProcess = (id, position) => {
    // TODO drag and drop logic here
    console.log("Reposition process", id, position);
  };

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
                <Typography variant="bodyRegular" lightened>
                  V13
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item>
            {isDraftingNewVersion ? (
              <Stack direction="row" spacing={3}>
                <Button variant="contained" onClick={handleCancelDraft}>
                  Cancel Version Draft
                </Button>
                <Button
                  variant="contained"
                  disabled={!versionHasChanges}
                  onClick={handleSubmitNewVersion}
                >
                  Submit New Version
                </Button>
              </Stack>
            ) : (
              <Button variant="contained" onClick={handleStartNewVersion}>
                Start New Version
              </Button>
            )}
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
                <ListItem
                  disablePadding
                  divider
                  secondaryAction={
                    !isDraftingNewVersion ? null : (
                      <Stack direction="row" spacing={1}>
                        {processStatus === "removed" ? (
                          <Button
                            variant="text"
                            onClick={() => handleRestoreProcess(processId)}
                          >
                            Restore
                          </Button>
                        ) : (
                          <>
                            <Button
                              variant="text"
                              onClick={() => handleReplaceProcess(processId)}
                            >
                              Replace
                            </Button>
                            <Button
                              variant="text"
                              color="error"
                              onClick={() => handleRemoveProcess(processId)}
                            >
                              Remove
                            </Button>
                          </>
                        )}
                      </Stack>
                    )
                  }
                >
                  <InlineActionTile
                    showAdd={isDraftingNewVersion}
                    status="default"
                    add={handleAddProcess}
                    reposition={handleRepositionProcess}
                  />
                  <ListItemButton
                    onClick={() =>
                      router.push(
                        `/admin/workflows/${workflowId}/processes/${processId}`
                      )
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
      <AddProcessModal
        open={addProcessModalOpen}
        onClose={() => setAddProcessModalOpen(false)}
      />
    </PageContainer>
  );
};

export default Workflow;

const AddProcessModal = ({ open, onClose }) => {
  const isCreating = null;
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Process</DialogTitle>
      <DialogContent>
        <div>Choose</div>
        <div>Create</div>
      </DialogContent>
      {isCreating ? (
        <DialogActions>
          <Button>Create</Button>
        </DialogActions>
      ) : null}
    </Dialog>
  );
};
