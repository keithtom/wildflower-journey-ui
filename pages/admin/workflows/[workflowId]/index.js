import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSortable } from "@dnd-kit/sortable";
import { mutate } from "swr";
import { useForm, Controller } from "react-hook-form";

import {
  Alert,
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
  Snackbar,
  Popper,
  FormControl,
  InputLabel,
  TextField,
  Select,
  OutlinedInput,
  MenuItem,
} from "@mui/material";
import { DragHandle, Edit } from "@mui/icons-material";
import { PageContainer, Grid, Typography } from "@ui";
import InlineActionTile from "@components/admin/InlineActionTile";
import DraggableList from "@components/admin/DraggableList";
import useWorkflow from "@hooks/workflow/definition/useWorkflow";
import useMilestones from "@hooks/workflow/definition/useMilestones";
import processApi from "@api/workflow/definition/processes";
import workflowApi from "@api/workflow/definition/workflows";

const Workflow = ({}) => {
  const router = useRouter();
  const workflowId = router.query.workflowId;

  const [isDraftingNewVersion, setIsDraftingNewVersion] = useState(false);
  // TODO: Set versionHasChanges from backend
  //  look through all selected processes and look for state, if any do not say "replicated" there are changes
  const [versionHasChanges, setVersionHasChanges] = useState(false);
  console.log({ versionHasChanges });
  const [addProcessModalOpen, setAddProcessModalOpen] = useState(false);
  const [repositionedSnackbarOpen, setRepositionedSnackbarOpen] =
    useState(false);
  const [groupedProcesses, setGroupedProcesses] = useState([]);
  console.log({ groupedProcesses });
  const [stagedProcessPosition, setStagedProcessPosition] = useState(null);
  console.log({ stagedProcessPosition });
  const [phaseAddedInto, setPhaseAddedInto] = useState(null);

  const checkForChanges = () => {
    if (
      !workflow ||
      !workflow.relationships ||
      !workflow.relationships.process
    ) {
      return false;
    }

    return workflow.relationships.process.some(
      (process) => process.state !== "replicated"
    );
  };

  useEffect(() => {
    if (workflowId) {
      localStorage.setItem("workflowId", workflowId);
    }
  }, [workflowId]);

  // console.log({ workflowId });

  const { workflow, isLoading, isError } = useWorkflow(workflowId);
  console.log({ workflow });

  useEffect(() => {
    setIsDraftingNewVersion(workflow?.attributes.published === false);
    setVersionHasChanges(
      workflow?.relationships.processes.data.some((process) => {
        return process.relationships.selectedProcesses.data.some(
          (selectedProcess) =>
            selectedProcess.id === process.id &&
            selectedProcess.state !== "replicated"
        );
      })
    );
  }, [workflow]);

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

  useEffect(() => {
    setGroupedProcesses(
      groupByPhase(isLoading ? [] : workflow?.relationships.processes.data)
    );
  }, [workflow]);
  // console.log({ groupedProcesses });

  const handleStartNewVersion = async () => {
    try {
      const response = await workflowApi.newVersionWorkflow(workflowId);
      console.log("response in handle new version ---", response);
      router.push(`/admin/workflows/${response.data.data.id}`);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancelDraft = async () => {
    try {
      const response = await workflowApi.deleteWorkflow(workflowId);
      console.log("response in cancel draft!! -----", response);
      // TODO: Push to the workflow that the deleted workflow was a duplicate of
      router.push(`/admin/workflows/${workflow.attributes.previousVersionId}`);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmitNewVersion = () => {
    // console.log("Submit new version");
  };
  const handleStageAddProcess = (position, phase) => {
    setAddProcessModalOpen(true);
    setPhaseAddedInto(phase);
    setStagedProcessPosition(position);
  };
  const handleCreateProcess = async (data) => {
    const structuredData = {
      process: {
        category_list: data.categories,
        title: data.title,
        description: data.description,
        phase_list: data.phase,
        selected_processes_attributes: [
          { workflow_id: workflowId, position: data.position },
        ],
      },
    };
    console.log({ structuredData });
    try {
      const response = await workflowApi.createProcessInWorkflow(
        workflowId,
        structuredData
      );
      console.log();
      mutate(`/definition/workflows/${workflowId}`);
    } catch (error) {
      console.log(error);
    }
    console.log({ data });
  };
  const handleRemoveProcess = (processId) => {
    try {
      const response = workflowApi.deleteProcessInWorkflow(
        workflowId,
        processId
      );
      mutate(`/definition/workflows/${workflowId}`);
    } catch (error) {
      console.log(error);
    }
    // console.log("Remove process", id);
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
    // using the processId, find the process in the workflow
    const process = workflow.relationships.processes.data.find(
      (p) => p.id === processId
    );
    let selectedProcessId = null;
    // if the process has a selected process, get the id
    if (
      process &&
      process.relationships &&
      process.relationships.selectedProcesses &&
      process.relationships.selectedProcesses.data.length > 0
    ) {
      // get the selected process id
      selectedProcessId = process.relationships.selectedProcesses.data[0].id;
    }
    const data = {
      process: {
        selected_processes_attributes: [
          {
            //pass the selected process id
            id: selectedProcessId,
            workflow_id: workflowId,
            position: newPosition,
          },
        ],
      },
    };
    try {
      // Make API call to update the position of the step
      const response = await processApi.editMilestone(processId, data);
      mutate(`/definition/workflows/${workflowId}`);
      setRepositionedSnackbarOpen(true);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <PageContainer isAdmin>
      <Stack spacing={6}>
        {isDraftingNewVersion ? (
          <Alert severity="warning" icon={<Edit fontSize="inherit" />}>
            <Typography variant="bodyRegular">Drafting new rollout</Typography>
          </Alert>
        ) : null}
        <Grid container alignItems="flex-end" justifyContent="space-between">
          <Grid item>
            <Stack spacing={2}>
              {/* <Typography variant="bodyRegular" bold>
                School Startup Journey
              </Typography> */}
              <Stack direction="row" spacing={3} alignItems="center">
                <Typography variant="h4" bold>
                  {isLoading ? (
                    <Skeleton width={64} />
                  ) : (
                    workflow.attributes.name
                  )}
                </Typography>
                <Chip
                  label={
                    isLoading ? (
                      <Skeleton width={32} />
                    ) : workflow.attributes.published === false ? (
                      `Drafting ${workflow.attributes.version}`
                    ) : (
                      workflow.attributes.version
                    )
                  }
                  size="small"
                  variant="outlined"
                />
                {/* TODO: Retrieve isSensibleDefault from API */}
                {/* <Chip label="Sensible default" size="small" /> */}
                {/* TODO: Retrieve last updated from API */}
                {/* <Typography>Last updated 3 days ago</Typography> */}
                {isLoading ? (
                  <Skeleton variant="rounded" width={120} />
                ) : workflow.attributes.published ? (
                  <Chip label="Published" size="small" color="primary" />
                ) : (
                  <Chip label="Not Published" size="small" color="secondary" />
                )}
                <Typography variant="bodyRegular" lightened>
                  {isLoading ? (
                    <Skeleton width={64} />
                  ) : (
                    `${workflow.attributes.numOfInstances} Instances`
                  )}
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item>
            {isDraftingNewVersion ? (
              isLoading ? (
                <Skeleton width={120} height={64} />
              ) : (
                <Stack direction="row" spacing={3}>
                  <Button
                    variant="contained"
                    onClick={handleCancelDraft}
                    disabled={!workflow.attributes.previousVersionId}
                  >
                    Cancel Draft
                  </Button>
                  <Button
                    variant="contained"
                    disabled={!versionHasChanges}
                    onClick={handleSubmitNewVersion}
                  >
                    Submit New Version
                  </Button>
                </Stack>
              )
            ) : (
              <Button
                variant="contained"
                onClick={handleStartNewVersion}
                // disabled
              >
                Draft New Version
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
          : groupedProcesses.map((phase, phaseIndex) => (
              <Grid container key={phaseIndex}>
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
                        getId={(item) =>
                          item.relationships.selectedProcesses.data[0].id
                        }
                        getPosition={(item) =>
                          item.relationships.selectedProcesses.data[0]
                            .attributes.position
                        }
                        renderItem={(process, i) => (
                          <ProcessListItem
                            key={i}
                            process={process}
                            prevProcessPosition={
                              phaseIndex > 0 &&
                              phase.milestones[phaseIndex - 1].relationships
                                .selectedProcesses.data[0].attributes.position
                            }
                            isDraftingNewVersion={isDraftingNewVersion}
                            handleStageAddProcess={handleStageAddProcess}
                            handleRemoveProcess={handleRemoveProcess}
                          />
                        )}
                      />
                    </List>
                  </Card>
                </Grid>
              </Grid>
            ))}
      </Stack>
      <AddProcessModal
        workflowId={workflowId}
        open={addProcessModalOpen}
        stagedProcessPosition={stagedProcessPosition}
        onClose={() => setAddProcessModalOpen(false)}
        handleCreateProcess={handleCreateProcess}
        phaseAddedInto={phaseAddedInto}
      />
      <Snackbar
        autoHideDuration={1000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={repositionedSnackbarOpen}
        onClose={() => setRepositionedSnackbarOpen(false)}
        message="Process repositioned and saved."
      />
    </PageContainer>
  );
};

export default Workflow;

const AddProcessModal = ({
  open,
  stagedProcessPosition,
  handleCreateProcess,
  onClose,
  workflowId,
  phaseAddedInto,
}) => {
  const [addType, setAddType] = useState(null);

  const handleClose = () => {
    onClose();
    setAddType(null);
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm();

  useEffect(() => {
    reset({
      phase: phaseAddedInto,
      position: stagedProcessPosition,
    });
  }, [open]);

  const onSubmit = handleSubmit((data) => {
    // console.log({ data });
    handleCreateProcess(data);
    reset();
    onClose();
  });

  const handleChooseProcess = async (processId) => {
    // console.log(id);
    const structuredData = {
      process: {
        selected_processes_attributes: [
          {
            workflow_id: workflowId,
            position: stagedProcessPosition,
          },
        ],
      },
    };
    try {
      const response = await workflowApi.chooseProcessInWorkflow(
        workflowId,
        processId,
        structuredData
      );
      mutate(`/definition/workflows/${workflowId}`);
    } catch (error) {
      console.log(error);
    }
    onClose();
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth scroll="paper">
      <DialogTitle>Add Process</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          {addType === null ? (
            <Stack spacing={3}>
              <Button
                onClick={() => setAddType("create")}
                fullWidth
                variant="contained"
              >
                Create: Create a brand new process
              </Button>
              <Button
                onClick={() => setAddType("choose")}
                fullWidth
                variant="outlined"
              >
                Choose: Choose an existing process
              </Button>
            </Stack>
          ) : addType === "create" ? (
            <>
              <Controller
                name="position"
                control={control}
                defaultValue=""
                render={({ field }) => <input type="hidden" {...field} />}
              />
              <AddProcessFields control={control} errors={errors} />
            </>
          ) : (
            addType === "choose" && (
              <Card noPadding variant="outlined">
                <ChooseProcessList
                  handleChooseProcess={handleChooseProcess}
                  phaseAddedInto={phaseAddedInto}
                />
              </Card>
            )
          )}
        </DialogContent>
        {addType === "create" ? (
          <DialogActions>
            <Button type="submit">Create</Button>
          </DialogActions>
        ) : null}
      </form>
    </Dialog>
  );
};

const ProcessListItem = ({
  isDraftingNewVersion,
  handleStageAddProcess,
  handleRemoveProcess,
  prevProcessPosition,
  process,
}) => {
  // console.log({ prevProcessPosition });

  // console.log({ process });
  const router = useRouter();

  const selectedProcesses = process.relationships.selectedProcesses?.data;

  const processPosition =
    (selectedProcesses[0].attributes.position + prevProcessPosition) / 2;
  // console.log({ processPosition });

  const isRemoved = selectedProcesses.some(
    (process) => process.attributes.state === "removed"
  );
  // removed, added, upgraded
  // replicated

  const { listeners, attributes, isDragging } = useSortable({ id: process.id });

  const PositionGrabber = ({ ...props }) => {
    return (
      <Stack {...props} id={`drag-handle-${process.id}`}>
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
            {isRemoved ? (
              <Button variant="text">Reinstate</Button>
            ) : (
              <Button
                variant="text"
                color="error"
                onClick={() => handleRemoveProcess(process.id)}
              >
                Remove
              </Button>
            )}
          </Stack>
        )
      }
      sx={{ background: "white", opacity: isDragging ? 0.5 : 1 }}
    >
      <InlineActionTile
        disabled={isRemoved}
        id={`inline-action-tile-${process.id}`}
        showAdd={isRemoved ? null : isDraftingNewVersion}
        status="default"
        add={() =>
          handleStageAddProcess(processPosition, process.attributes.phase)
        }
        dragHandle={<PositionGrabber {...listeners} {...attributes} />}
      />

      <ListItemButton
        onClick={() => router.push(`/admin/workflows/processes/${process.id}`)}
      >
        <Stack
          direction="row"
          spacing={3}
          alignItems="center"
          sx={isRemoved ? { opacity: 0.2 } : null}
        >
          <ListItemText>
            <Typography struck={isRemoved}>
              {process.attributes.title}
            </Typography>
          </ListItemText>
          <Chip label={`${process.attributes.numOfSteps} steps`} size="small" />
          {process.attributes.categories.map((c, i) => (
            <Chip label={c} size="small" key={i} />
          ))}
        </Stack>
      </ListItemButton>
    </ListItem>
  );
};

const AddProcessFields = ({ control, errors }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Stack spacing={3}>
          <Controller
            name="title"
            control={control}
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: "This field is required",
              },
            }}
            render={({ field }) => (
              <TextField
                label="Title"
                placeholder="e.g. Complete The Visioning Advice Process"
                error={errors.title}
                helperText={errors && errors.title && errors.title.message}
                {...field}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                multiline
                label="Description"
                placeholder="The description of this process"
                {...field}
              />
            )}
          />

          <FormControl fullWidth>
            <InputLabel id="categories-label">Categories</InputLabel>
            <Controller
              name="categories"
              control={control}
              defaultValue={[]}
              rules={{
                required: {
                  value: true,
                  message: "This field is required",
                },
              }}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="categories-label"
                  id="categories"
                  input={<OutlinedInput label="Categories" />}
                  helperText={
                    errors &&
                    errors.categories &&
                    errors.categories.type === "required" &&
                    "This field is required"
                  }
                >
                  {categories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      <ListItemText primary={option.label} />
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="phase-label">Phase</InputLabel>
            <Controller
              name="phase"
              control={control}
              defaultValue={[]}
              rules={{
                required: {
                  value: true,
                  message: "This field is required",
                },
              }}
              render={({ field }) => (
                <Select
                  disabled
                  {...field}
                  labelId="phase-label"
                  id="phase"
                  input={<OutlinedInput label="Phase" />}
                  helperText={
                    errors &&
                    errors.phase &&
                    errors.phase.type === "required" &&
                    "This field is required"
                  }
                >
                  {ssjPhases.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      <ListItemText primary={option.label} />
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Stack>
      </Grid>
    </Grid>
  );
};

const ChooseProcessList = ({ handleChooseProcess, phaseAddedInto }) => {
  const [milestonesInPhase, setMilestonesInPhase] = useState(null);
  // console.log({ milestonesInPhase });
  const { milestonesByPhase, isLoadingMilestonesByPhase } = useMilestones();
  // console.log({ milestonesByPhase });
  const capitalizedPhaseAddedInto =
    phaseAddedInto.charAt(0).toUpperCase() + phaseAddedInto.slice(1);

  useEffect(() => {
    setMilestonesInPhase(
      milestonesByPhase?.filter(
        (milestone) => milestone.phase === capitalizedPhaseAddedInto
      )
    );
  }, [isLoadingMilestonesByPhase]);

  return (
    <List
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
          sx={{ background: "#eaeaea" }}
        >
          Adding a process to {capitalizedPhaseAddedInto}
        </ListSubheader>
      }
    >
      {isLoadingMilestonesByPhase
        ? Array.from({ length: 12 }).map((_, index) => (
            <ListItem key={index} divider>
              <ListItemText>
                <Skeleton variant="text" width={120} />
              </ListItemText>
            </ListItem>
          ))
        : milestonesInPhase?.map((m) =>
            m.milestones.map((process, i) => (
              <ListItem disablePadding divider key={i}>
                <ListItemButton onClick={() => handleChooseProcess(process.id)}>
                  <Stack direction="row" spacing={3} alignItems="center">
                    <ListItemText>
                      <Typography noWrap>{process.attributes.title}</Typography>
                    </ListItemText>
                    <Chip
                      label={`${process.relationships.steps.data.length} steps`}
                      size="small"
                    />
                    {process.attributes.categories.map((c, i) => (
                      <Chip label={c} size="small" key={i} />
                    ))}
                  </Stack>
                </ListItemButton>
              </ListItem>
            ))
          )}
    </List>
  );
};

const categories = [
  {
    label: "Albums, Advice & Network Membership",
    value: "Albums, Advice & Network Membership",
  },
  { label: "Finance", value: "Finance" },
  { label: "Facilities", value: "Facilities" },
  { label: "Governance & Compliance", value: "Governance & Compliance" },
  { label: "Human Resources", value: "Human Resources" },
  {
    label: "Community & Family Engagement",
    value: "Community & Family Engagement",
  },
  {
    label: "Classroom & Program Practices",
    value: "Classroom & Program Practices",
  },
];
const ssjPhases = [
  { label: "Visioning", value: "visioning" },
  { label: "Planning", value: "planning" },
  { label: "Startup", value: "startup" },
];
const openSchoolChecklistPhases = [
  { label: "January", value: "January" },
  { label: "February", value: "February" },
  { label: "March", value: "March" },
  { label: "April", value: "April" },
  { label: "May", value: "May" },
  { label: "June", value: "June" },
  { label: "July", value: "July" },
  { label: "August", value: "August" },
  { label: "September", value: "September" },
  { label: "October", value: "October" },
  { label: "November", value: "November" },
  { label: "December", value: "December" },
  { label: "Monthly", value: "Monthly" },
  { label: "Quarterly", value: "Quarterly" },
  { label: "Yearly", value: "Yearly" },
];
