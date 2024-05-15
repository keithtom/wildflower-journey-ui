import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSortable } from "@dnd-kit/sortable";
import { mutate } from "swr";
import { useForm, Controller } from "react-hook-form";

import { snakeCase } from "@lib/utils/snakeCase";
import {
  Tooltip,
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
import ssj_categories from "@lib/ssj/categories";
import CategoryChip from "@components/CategoryChip";
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
  const [versionHasChanges, setVersionHasChanges] = useState(false);
  const [addProcessModalOpen, setAddProcessModalOpen] = useState(false);
  const [repositionedSnackbarOpen, setRepositionedSnackbarOpen] =
    useState(false);
  const [groupedProcesses, setGroupedProcesses] = useState([]);
  const [stagedProcessPosition, setStagedProcessPosition] = useState(null);
  const [phaseAddedInto, setPhaseAddedInto] = useState(null);

  // console.log(isDraftingNewVersion);
  // console.log({ versionHasChanges });
  // console.log({ groupedProcesses });
  // console.log({ stagedProcessPosition });

  useEffect(() => {
    if (workflowId) {
      localStorage.setItem("workflowId", workflowId);
    }
  }, [workflowId]);

  // console.log({ workflowId });

  const { workflow, isLoading, isError } = useWorkflow(workflowId);
  console.log({ workflow });

  const rolloutInProgress =
    workflow?.attributes.rolloutStartedAt !== null &&
    workflow?.attributes.rolloutCompletedAt === null;

  useEffect(() => {
    setIsDraftingNewVersion(
      workflow?.attributes.published === false && !rolloutInProgress
    );
    setVersionHasChanges(
      workflow?.relationships.processes.data.some((process) => {
        return process.relationships.selectedProcesses.data.some(
          (selectedProcess) =>
            selectedProcess.attributes.processId.toString() === process.id &&
            selectedProcess.attributes.state !== "replicated"
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
    router.push(`/admin/workflows/${workflowId}/submit-version`);
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
    // console.log({ structuredData });
    try {
      const response = await workflowApi.createProcessInWorkflow(
        workflowId,
        structuredData
      );
      mutate(`/definition/workflows/${workflowId}`);
    } catch (error) {
      console.log(error);
    }
    console.log({ data });
  };
  const handleRemoveProcess = async (processId) => {
    try {
      const response = await workflowApi.deleteProcessInWorkflow(
        workflowId,
        processId
      );
      console.log({ response });
      mutate(`/definition/workflows/${workflowId}`);
    } catch (error) {
      console.log(error);
    }
    // console.log("Remove process", id);
  };
  const handleReinstateProcess = async (processId) => {
    // console.log("Reinstate process", processId);
    try {
      const response = await workflowApi.reinstateProcessInWorkflow(processId);
      mutate(`/definition/workflows/${workflowId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRepositionProcess = async (
    processId,
    priorItemPosition,
    subsequentItemPosition
  ) => {
    let newPosition;
    if (priorItemPosition === null) {
      newPosition = Math.floor(subsequentItemPosition / 2);
    } else if (subsequentItemPosition === null) {
      newPosition = Math.floor(priorItemPosition * 1.5);
    } else {
      newPosition = Math.floor(
        (priorItemPosition + subsequentItemPosition) / 2
      );
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

    const repositionInProcessData = {
      selected_process: { position: Number(newPosition) },
    };
    try {
      const response = await workflowApi.repositionProcessInRollout(
        Number(selectedProcessId),
        repositionInProcessData
      );

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
                    ) : workflow.attributes.published === false &&
                      !rolloutInProgress ? (
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
                ) : rolloutInProgress ? (
                  <Chip
                    label="Publishing in progress"
                    size="small"
                    variant="outlined"
                    color="primary"
                  />
                ) : workflow.attributes.published ? (
                  <Chip label="Published" size="small" color="primary" />
                ) : (
                  <Chip label="Not Published" size="small" color="secondary" />
                )}
                <Typography variant="bodyRegular" lightened>
                  {isLoading ? (
                    <Skeleton width={64} />
                  ) : (
                    `Used by ${workflow.attributes.numOfInstances} schools`
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
                    Review New Version
                  </Button>
                </Stack>
              )
            ) : (
              <Button
                variant="contained"
                onClick={handleStartNewVersion}
                disabled={isLoading}
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
                  <Card noPadding sx={{ overflow: "visible" }}>
                    <List
                      subheader={
                        <ListSubheader
                          component="div"
                          id="nested-list-subheader"
                          sx={{ background: "#eaeaea" }}
                        >
                          {phase.phase.charAt(0).toUpperCase() +
                            phase.phase.slice(1)}
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
                            disabled={rolloutInProgress}
                            key={process.id}
                            process={process}
                            prevProcessPosition={
                              i > 0
                                ? phase?.milestones[i - 1]?.relationships
                                    .selectedProcesses.data[0].attributes
                                    .position
                                : null
                            }
                            isLast={i === phase.milestones.length - 1}
                            isDraftingNewVersion={isDraftingNewVersion}
                            handleStageAddProcess={handleStageAddProcess}
                            handleRemoveProcess={handleRemoveProcess}
                            handleReinstateProcess={handleReinstateProcess}
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
        setStagedProcessPosition={setStagedProcessPosition}
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
  setStagedProcessPosition,
  handleCreateProcess,
  onClose,
  workflowId,
  phaseAddedInto,
}) => {
  const [addType, setAddType] = useState(null);

  // console.log({ stagedProcessPosition });

  const handleClose = () => {
    onClose();
    setAddType(null);
    setStagedProcessPosition(null);
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
    setAddType(null);
    reset();
    onClose();
  });

  const handleChooseProcess = async (processId) => {
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
      setAddType(null);
      reset();
      onClose();
      mutate(`/definition/workflows/${workflowId}`);
    } catch (error) {
      console.log(error);
    }
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
  handleReinstateProcess,
  prevProcessPosition,
  process,
  isLast,
  disabled,
}) => {
  const router = useRouter();

  const status =
    process.relationships.selectedProcesses?.data[0].attributes.state;
  const selectedProcesses = process.relationships.selectedProcesses?.data;

  const processPosition =
    (selectedProcesses[0].attributes.position + prevProcessPosition) / 2;
  // console.log({ processPosition });
  const lastProcessPosition = selectedProcesses[0].attributes.position + 1000;

  const isRemoved = selectedProcesses.some(
    (process) => process.attributes.state === "removed"
  );

  const numOfPrerequisites = process?.attributes.prerequisiteTitles.length;

  // console.log({ process });
  // console.log({ prevProcessPosition });
  // console.log(process.attributes.title, {
  //   ownPosition: selectedProcesses[0].attributes.position,
  //   prevProcessPosition: prevProcessPosition,
  // });

  const { listeners, attributes, isDragging } = useSortable({ id: process.id });

  const PositionGrabber = ({ ...props }) => {
    return (
      <Stack
        {...props}
        id={`drag-handle-${snakeCase(process.attributes.title)}`}
      >
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
          <Stack direction="row" spacing={1} alignItems="center">
            {status === "repositioned" ? (
              <Chip label="Repositioned" size="small" variant="outlined" />
            ) : null}
            {isRemoved ? (
              <Button
                variant="text"
                onClick={() =>
                  handleReinstateProcess(
                    process.relationships.selectedProcesses.data[0].id
                  )
                }
              >
                Reinstate
              </Button>
            ) : (
              <ConditionalTooltip
                display={process?.attributes.isPrerequisite}
                title="Can't remove a process that is a prerequisite"
              >
                <span>
                  <Button
                    variant="text"
                    color="error"
                    disabled={process?.attributes.isPrerequisite}
                    onClick={() => handleRemoveProcess(process.id)}
                  >
                    Remove
                  </Button>
                </span>
              </ConditionalTooltip>
            )}
          </Stack>
        )
      }
      sx={{ background: "white", opacity: isDragging ? 0.5 : 1 }}
    >
      <InlineActionTile
        isLast={isLast}
        disabled={isRemoved || disabled}
        id={`inline-action-tile-${snakeCase(process.attributes.title)}`}
        showAdd={isRemoved ? null : isDraftingNewVersion}
        status={isDraftingNewVersion ? status : "replicated"}
        add={() =>
          handleStageAddProcess(processPosition, process.attributes.phase)
        }
        lastAdd={() =>
          handleStageAddProcess(lastProcessPosition, process.attributes.phase)
        }
        dragHandle={<PositionGrabber {...listeners} {...attributes} />}
      />

      <ListItemButton
        disabled={disabled}
        onClick={() => router.push(`/admin/workflows/processes/${process.id}`)}
      >
        <Stack
          direction="row"
          spacing={3}
          alignItems="center"
          sx={isRemoved ? { opacity: 0.2 } : null}
        >
          <ListItemText>
            <Typography struck={isRemoved} variant="bodyRegular">
              {process.attributes.title}
            </Typography>
          </ListItemText>
          <Chip label={`${process.attributes.numOfSteps} steps`} size="small" />
          {process.attributes.categories.map((c, i) => (
            <CategoryChip category={c} size="small" key={i} />
          ))}
          {numOfPrerequisites ? (
            <Tooltip
              title={
                <Stack>
                  {process?.attributes.prerequisiteTitles.map((t, i) => (
                    <span>{t}</span>
                  ))}
                </Stack>
              }
            >
              <Chip
                label={`${numOfPrerequisites} prerequisite${
                  numOfPrerequisites > 1 ? "s" : ""
                }`}
                size="small"
                variant="outlined"
              />
            </Tooltip>
          ) : null}
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
                      <CategoryChip category={c} size="small" key={i} />
                    ))}
                  </Stack>
                </ListItemButton>
              </ListItem>
            ))
          )}
    </List>
  );
};
const ConditionalTooltip = ({ title, children, display }) => {
  return display ? <Tooltip title={title}>{children}</Tooltip> : children;
};

const categories = Object.values(ssj_categories).map((category) => ({
  label: category,
  value: category,
}));

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
