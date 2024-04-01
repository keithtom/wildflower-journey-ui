import { useState } from "react";
import { useRouter } from "next/router";
import { useSortable } from "@dnd-kit/sortable";

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
  Skeleton,
} from "@mui/material";
import { DragHandle } from "@mui/icons-material";
import { PageContainer, Grid, Typography } from "@ui";
import InlineActionTile from "@components/admin/InlineActionTile";
import DraggableList from "@components/admin/DraggableList";
import useWorkflow from "@hooks/workflow/definition/useWorkflow";
import useMilestones from "@hooks/workflow/definition/useMilestones";
import processApi from "@api/workflow/definition/processes";

const Workflow = ({}) => {
  const router = useRouter();
  const workflowId = router.query.workflowId;

  const { workflow, isLoading, isError } = useWorkflow(workflowId);
  // console.log({ workflow });

  // Transform the data to group by phase
  function groupByPhase(data) {
    const phasesOrder = ["visioning", "planning", "startup"];
    const grouped = data.reduce((acc, item) => {
      const phase = item.attributes.phase;
      if (!acc[phase]) {
        acc[phase] = [];
      }
      acc[phase].push(item);
      return acc;
    }, {});
    return phasesOrder.reduce((acc, phase) => {
      if (grouped[phase]) {
        acc.push({ phase: phase, milestones: grouped[phase] });
      }
      return acc;
    }, []);
  }

  const groupedProcesses = groupByPhase(
    isLoading ? [] : workflow?.relationships.processes.data
  );
  console.log({ groupedProcesses });

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
  const handleRepositionProcess = async (
    processId,
    priorItemPosition,
    subsequentItemPosition
  ) => {
    let newPosition;
    if (priorItemPosition === null) {
      newPosition = subsequentItemPosition / 2;
    } else if (subsequentItemPosition === null) {
      newPosition = priorItemPosition * 1.5;
    } else {
      newPosition = (priorItemPosition + subsequentItemPosition) / 2;
    }
    const process_params = {
      process: {
        selected_processes_attributes: [
          { id: processId, workflow_id: workflowId, position: newPosition },
        ],
      },
    };

    try {
      // Make API call to update the position of the step
      const response = await processApi.editMilestone(
        processId,
        process_params
      );
      mutate(`/definition/workflows/${workflowId}`);
    } catch (error) {
      console.error("There was an error!", error);
    }
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
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <Grid container>
                <Grid item xs={12}>
                  <Card noPadding>
                    <List
                      subheader={
                        <ListSubheader
                          component="div"
                          id="nested-list-subheader"
                          sx={{
                            background: "#eaeaea",
                            paddingX: 4,
                            paddingY: 3,
                          }}
                        >
                          <Skeleton variant="text" width={120} height={24} />
                        </ListSubheader>
                      }
                    >
                      {Array.from({ length: 3 }).map((_, index) => (
                        <ListItem key={index} divider>
                          <ListItemText>
                            <Skeleton variant="text" width={120} />
                          </ListItemText>
                        </ListItem>
                      ))}
                    </List>
                  </Card>
                </Grid>
              </Grid>
            ))
          : groupedProcesses.map((phase, i) => (
              <Grid container key={i}>
                <Grid item xs={12}>
                  <Card noPadding>
                    <List
                      subheader={
                        <ListSubheader
                          component="div"
                          id="nested-list-subheader"
                          sx={{ background: "#eaeaea" }}
                        >
                          {phase.phase}
                        </ListSubheader>
                      }
                    >
                      <DraggableList
                        items={phase.milestones}
                        onReorder={(
                          processId,
                          priorItemPosition,
                          subsequentItemPosition
                        ) => {
                          handleRepositionProcess(
                            processId,
                            priorItemPosition,
                            subsequentItemPosition
                          );
                        }}
                        getPosition={(item) =>
                          item.relationships.selectedProcesses.data.map(
                            (d) => d.attributes.position
                          )
                        }
                        renderItem={(process, i) => (
                          <ProcessListItem
                            key={i}
                            id={process.id}
                            process={process}
                            isDraftingNewVersion={isDraftingNewVersion}
                          />
                          // <ListItem
                          //   key={i}
                          //   disablePadding
                          //   divider
                          //   secondaryAction={
                          //     !isDraftingNewVersion ? null : (
                          //       <Stack direction="row" spacing={1}>
                          //         {processStatus === "removed" ? (
                          //           <Button
                          //             variant="text"
                          //             onClick={() =>
                          //               handleRestoreProcess(process.id)
                          //             }
                          //           >
                          //             Restore
                          //           </Button>
                          //         ) : (
                          //           <>
                          //             <Button
                          //               variant="text"
                          //               onClick={() =>
                          //                 handleReplaceProcess(process.id)
                          //               }
                          //             >
                          //               Replace
                          //             </Button>
                          //             <Button
                          //               variant="text"
                          //               color="error"
                          //               onClick={() =>
                          //                 handleRemoveProcess(process.id)
                          //               }
                          //             >
                          //               Remove
                          //             </Button>
                          //           </>
                          //         )}
                          //       </Stack>
                          //     )
                          //   }
                          // >
                          //   <InlineActionTile
                          //     showAdd={isDraftingNewVersion}
                          //     status="default"
                          //     add={handleAddProcess}
                          //     reposition={handleRepositionProcess}
                          //   />
                          //   <ListItemButton
                          //     onClick={() =>
                          //       router.push(
                          //         `/admin/workflows/${workflowId}/processes/${process.id}`
                          //       )
                          //     }
                          //   >
                          //     <Stack
                          //       direction="row"
                          //       spacing={3}
                          //       alignItems="center"
                          //     >
                          //       <ListItemText>
                          //         {process.attributes.title}
                          //       </ListItemText>
                          //       <Chip
                          //         label={`${process.attributes.numOfSteps} steps`}
                          //         size="small"
                          //       />
                          //       {process.attributes.categories.map((c, i) => (
                          //         <Chip label={c} size="small" key={i} />
                          //       ))}
                          //     </Stack>
                          //   </ListItemButton>
                          // </ListItem>
                        )}
                      />
                    </List>
                  </Card>
                </Grid>
              </Grid>
            ))}
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

const ProcessListItem = ({ isDraftingNewVersion, process }) => {
  const router = useRouter();
  const workflowId = router.query.workflowId;

  // console.log({ step });

  const { listeners, attributes, isDragging } = useSortable({ id: process.id });

  const handleAddProcess = () => {
    console.log("Add process");
  };
  const handleRemoveProcess = (id) => {
    console.log("Remove process", id);
  };

  const PositionGrabber = ({ ...props }) => {
    return (
      <Stack {...props}>
        <DragHandle />
      </Stack>
    );
  };

  return (
    <ListItem
      disablePadding
      divider
      secondaryAction={
        !isDraftingNewVersion ? null : (
          <Stack direction="row" spacing={1}>
            {processStatus === "removed" ? (
              <Button
                variant="text"
                onClick={() => handleRestoreProcess(process.id)}
              >
                Restore
              </Button>
            ) : (
              <>
                <Button
                  variant="text"
                  onClick={() => handleReplaceProcess(process.id)}
                >
                  Replace
                </Button>
                <Button
                  variant="text"
                  color="error"
                  onClick={() => handleRemoveProcess(process.id)}
                >
                  Remove
                </Button>
              </>
            )}
          </Stack>
        )
      }
      sx={{ background: "white", opacity: isDragging ? 0.5 : 1 }}
    >
      <InlineActionTile
        showAdd={isDraftingNewVersion}
        status="default"
        add={handleAddProcess}
        dragHandle={<PositionGrabber {...listeners} {...attributes} />}
      />
      <ListItemButton
        onClick={() =>
          router.push(`/admin/workflows/${workflowId}/processes/${process.id}`)
        }
      >
        <Stack direction="row" spacing={3} alignItems="center">
          <ListItemText>{process.attributes.title}</ListItemText>
          <Chip label={`${process.attributes.numOfSteps} steps`} size="small" />
          {process.attributes.categories.map((c, i) => (
            <Chip label={c} size="small" key={i} />
          ))}
        </Stack>
      </ListItemButton>
    </ListItem>
  );
};
