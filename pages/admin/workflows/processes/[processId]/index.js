import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";
import { useSortable } from "@dnd-kit/sortable";
import { Controller, useForm } from "react-hook-form";

import { snakeCase } from "@lib/utils/snakeCase";
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
  Select,
  OutlinedInput,
  FormControl,
  InputLabel,
  Checkbox,
  TextField,
  MenuItem,
  Skeleton,
  Breadcrumbs,
  Link,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormHelperText,
  Switch,
} from "@mui/material";
import ssj_categories from "@lib/ssj/categories";
import CategoryChip from "@components/CategoryChip";
import { DragHandle, Edit, Warning } from "@mui/icons-material";
import { PageContainer, Grid, Typography } from "@ui";
import InlineActionTile from "@components/admin/InlineActionTile";
import DraggableList from "@components/admin/DraggableList";

import processes from "@api/workflow/definition/processes";
import stepsApi from "@api/workflow/definition/steps";
import processApi from "@api/workflow/definition/processes";
import workflowApi from "@api/workflow/definition/workflows";
import useProcessInWorkflow from "@hooks/workflow/definition/useProcessInWorkflow";
import useMilestones from "@hooks/workflow/definition/useMilestones";
import useWorkflow from "@hooks/workflow/definition/useWorkflow";

const ProcessId = ({}) => {
  const router = useRouter();
  const processId = router.query.processId;
  const [workflowId, setWorkflowId] = useState(null);
  const [isEditingProcess, setIsEditingProcess] = useState(false);
  const [isDraftingNewVersion, setIsDraftingNewVersion] = useState(null);
  const [processHasChanges, setProcessHasChanges] = useState(false);
  const [originalData, setOriginalData] = useState(false);
  const [repositionedSnackbarOpen, setRepositionedSnackbarOpen] =
    useState(false);
  const [updatedProcessSnackbarOpen, setUpdatedProcessSnackbarOpen] =
    useState(false);
  const [addStepModalOpen, setAddStepModalOpen] = useState(false);
  const [addStepPosition, setAddStepPosition] = useState(null);
  const [showAddPrerequisiteModal, setShowAddPrerequisiteModal] =
    useState(false);

  console.log({ isDraftingNewVersion });
  console.log({ isEditingProcess });

  const { workflow, isLoading: workflowIsLoading } = useWorkflow(workflowId);
  // console.log({ workflow });

  const { processInWorkflow: milestone, isLoading } = useProcessInWorkflow(
    workflowId,
    processId
  );
  console.log({ milestone });
  // console.log({ processId });

  // const { milestone, isLoading, isError } = useMilestone(processId);
  // console.log(milestone);

  useEffect(() => {
    const id = localStorage.getItem("workflowId");
    setWorkflowId(id);
  }, []);
  useEffect(() => {
    setIsDraftingNewVersion(workflow?.attributes.published === false);
    setIsEditingProcess(
      milestone?.relationships.selectedProcesses.data[0].attributes.state ===
        "upgraded" ||
        milestone?.relationships.selectedProcesses.data[0].attributes.state ===
          "added"
    );
  }, [workflow, milestone]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm();

  console.log({ errors });

  useEffect(() => {
    setProcessHasChanges(isDirty);
  }, [isDirty]);

  useEffect(() => {
    if (!isLoading && milestone) {
      const defaultValues = {
        title: milestone?.attributes?.title,
        description: milestone?.attributes?.description,
        prerequisite: milestone?.attributes?.prerequisite,
        category_list: milestone?.attributes?.categories,
        phase_list: milestone?.attributes?.phase,
      };
      setOriginalData(defaultValues);
      reset(defaultValues);
    }
  }, [isLoading, milestone, reset]);

  const handleUpdateProcess = async (data) => {
    // Remove unchanged data
    const updatedData = Object.keys(data).reduce((acc, key) => {
      if (data[key] !== originalData[key]) {
        if (key === "category_list" && !Array.isArray(data[key])) {
          acc[key] = [data[key]];
        } else {
          acc[key] = data[key];
        }
      }
      return acc;
    }, {});

    // Update the process
    try {
      const response = await processes.editMilestone(milestone.id, updatedData);
      setProcessHasChanges(false);
      setUpdatedProcessSnackbarOpen(true);
      mutate(`definition/workflows/${workflowId}/processes/${processId}`);
      // console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCancelUpdateProcess = () => {
    // console.log("Cancel update process");
    // Reset form to original data
    reset(originalData);
  };

  const handleRepositionStep = async (
    stepId,
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
    const data = { step: { position: Number(newPosition) } };

    try {
      const response = await stepsApi.editStep(processId, stepId, data);
      mutate(`definition/workflows/${workflowId}/processes/${processId}`);
      setRepositionedSnackbarOpen(true);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  // const handleRemoveStep = async (stepId) => {
  //   console.log("Remove step", stepId);
  //   setShowRemoveStepCheck(false);
  //   try {
  //     const response = await stepsApi.deleteStep(processId, stepId);
  //     mutate(`definition/workflows/${workflowId}/processes/${processId}`);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleStageAddStep = (position) => {
    setAddStepPosition(position);
    setAddStepModalOpen(true);
  };
  const handleCreateStep = async (data) => {
    // console.log("Add step", data);
    const structuredData = {
      step: {
        ...data,
      },
    };

    try {
      const response = await stepsApi.createStep(processId, structuredData);
      mutate(`definition/workflows/${workflowId}/processes/${processId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = handleSubmit(handleUpdateProcess);

  const handleEditProcessInRollout = async () => {
    try {
      const response = await workflowApi.createNewProcessVersion(
        workflowId,
        processId
      );
      console.log({ response });
      router.push(`/admin/workflows/processes/${response.data.data.id}`);
    } catch (error) {
      console.log(error);
    }
    setIsEditingProcess(true);
  };

  const handleRevertAllEdits = async (selectedProcessId) => {
    try {
      const response = await workflowApi.reinstateProcessInWorkflow(
        selectedProcessId
      );
      console.log({ response });
      router.push(
        `/admin/workflows/processes/${response.data.data.attributes.processId}`
      );
    } catch (error) {
      console.log(error);
    }
    setIsEditingProcess(false);
  };

  const handleAddPrerequisite = async (id) => {
    const structuredData = {
      process: {
        workable_dependencies_attributes: [
          {
            workflow_id: workflowId,
            prerequisite_workable_type: "Workflow::Definition::Process",
            prerequisite_workable_id: id,
          },
        ],
      },
    };
    try {
      const response = await processApi.editMilestone(
        processId,
        structuredData
      );
      mutate(`definition/workflows/${workflowId}/processes/${processId}`);
      setShowAddPrerequisiteModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteDependency = async (dependencyId) => {
    console.log("Delete dependency", dependencyId);
    try {
      const response = await workflowApi.deleteDependency(dependencyId);
      mutate(`definition/workflows/${workflowId}/processes/${processId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageContainer isAdmin>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={6}>
          {isDraftingNewVersion ? (
            <Alert severity="warning" icon={<Edit fontSize="inherit" />}>
              <Typography variant="bodyRegular">
                Drafting new rollout
              </Typography>
            </Alert>
          ) : null}
          <Breadcrumbs aria-label="breadcrumb">
            {workflowId ? (
              <Link
                underline="hover"
                color="inherit"
                href={`/admin/workflows/${workflowId}`}
              >
                <Typography variant="bodyRegular" lightened>
                  Workflow
                </Typography>
              </Link>
            ) : (
              <Link
                underline="hover"
                color="inherit"
                href={`/admin/workflows/processes`}
              >
                <Typography variant="bodyRegular" lightened>
                  Processes
                </Typography>
              </Link>
            )}

            <Typography variant="bodyRegular">
              {isLoading ? <Skeleton width={64} /> : milestone.attributes.title}
            </Typography>
          </Breadcrumbs>

          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Stack direction="row" spacing={3} alignItems="center">
                <Typography variant="h4" bold>
                  {isLoading ? (
                    <Skeleton width={240} />
                  ) : (
                    milestone.attributes.title
                  )}
                </Typography>
                {/* <Chip label="Live" color="primary" size="small" /> */}
                {/* <Typography variant="bodyRegular" lightened>
                    Updated 4 weeks ago
                  </Typography> */}
              </Stack>
            </Grid>

            <Grid item>
              {processHasChanges ? (
                <Stack direction="row" spacing={3}>
                  <Button
                    variant="secondary"
                    onClick={handleCancelUpdateProcess}
                  >
                    Cancel
                  </Button>
                  <Button variant="contained" onClick={onSubmit}>
                    Update
                  </Button>
                </Stack>
              ) : isDraftingNewVersion ? (
                !isEditingProcess ? (
                  <Button
                    variant="contained"
                    onClick={handleEditProcessInRollout}
                  >
                    Edit This Process
                  </Button>
                ) : (
                  <Stack direction="row" spacing={3}>
                    <Button
                      disabled={
                        milestone?.relationships.selectedProcesses.data[0]
                          .attributes.state === "added"
                      }
                      variant="contained"
                      onClick={() =>
                        handleRevertAllEdits(
                          milestone.relationships.selectedProcesses.data[0].id
                        )
                      }
                    >
                      Revert All Edits
                    </Button>
                    <Button variant="contained" disabled>
                      Update
                    </Button>
                  </Stack>
                )
              ) : (
                <Stack direction="row" spacing={3}>
                  <Button variant="contained" disabled>
                    Update
                  </Button>
                </Stack>
              )}
            </Grid>
          </Grid>

          {/* FORM */}
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
                <>
                  <TextField
                    disabled={isDraftingNewVersion && !isEditingProcess}
                    label="Title"
                    placeholder="e.g. Complete The Visioning Advice Process"
                    error={errors.title}
                    {...field}
                  />
                  <FormHelperText error={errors.title}>
                    {errors && errors.title && errors.title.message}
                  </FormHelperText>
                </>
              )}
            />
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  disabled={isDraftingNewVersion && !isEditingProcess}
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
                name="category_list"
                control={control}
                defaultValue={[]}
                rules={{
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                }}
                render={({ field }) => (
                  <>
                    <Select
                      disabled={isDraftingNewVersion && !isEditingProcess}
                      {...field}
                      labelId="categories-label"
                      id="categories"
                      input={<OutlinedInput label="Categories" />}
                    >
                      {categories.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          <ListItemText primary={option.label} />
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText error={errors.categories}>
                      {errors &&
                        errors.categories &&
                        errors.categories.type === "required" &&
                        "This field is required"}
                    </FormHelperText>
                  </>
                )}
              />
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="phase-label">Phase</InputLabel>
              <Controller
                name="phase_list"
                control={control}
                defaultValue={[]}
                rules={{
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                  validate: {
                    hasPrerequisites: (value) =>
                      (milestone.relationships.prerequisites?.data?.length ||
                        0) === 0 || "Cannot submit if there are prerequisites",
                  },
                }}
                render={({ field }) => (
                  <>
                    <Select
                      disabled={!isEditingProcess || !isDraftingNewVersion}
                      {...field}
                      labelId="phase-label"
                      id="phase"
                      input={<OutlinedInput label="Phase" />}
                    >
                      {phases.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          <ListItemText primary={option.label} />
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText error={errors.phase_list}>
                      {errors &&
                        errors.phase_list &&
                        ((errors.phase_list.type === "required" &&
                          "This field is required") ||
                          (errors.phase_list.type === "hasPrerequisites" &&
                            "Remove prerequisites to update the phase of this process"))}
                    </FormHelperText>
                  </>
                )}
              />
            </FormControl>
          </Stack>

          <Card sx={{ padding: 0 }}>
            <List
              subheader={
                <ListSubheader
                  component="div"
                  id="nested-list-subheader"
                  sx={{ background: "#eaeaea" }}
                >
                  <Grid container justifyContent="space-between">
                    <Grid item>Prerequisite</Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        size="small"
                        disabled={!isDraftingNewVersion || !isEditingProcess}
                        onClick={() => setShowAddPrerequisiteModal(true)}
                      >
                        Add Prerequisite
                      </Button>
                    </Grid>
                  </Grid>
                </ListSubheader>
              }
            >
              {isLoading
                ? Array.from({ length: 1 }).map((_, index) => (
                    <ListItem key={index} divider>
                      <ListItemText>
                        <Skeleton variant="text" width={120} />
                      </ListItemText>
                    </ListItem>
                  ))
                : milestone.relationships.prerequisites.data.map((p, i) => (
                    <ListItem
                      key={i}
                      disablePadding
                      secondaryAction={
                        <Button
                          id={`remove-prerequisite-${i}`}
                          variant="text"
                          color="error"
                          disabled={!isEditingProcess}
                          onClick={() =>
                            handleDeleteDependency(
                              milestone?.relationships.workableDependencies.data.find(
                                (d) =>
                                  d.attributes.prerequisiteWorkableId.toString() ===
                                  p.id
                              ).id
                            )
                          }
                        >
                          Remove
                        </Button>
                      }
                    >
                      <ListItemButton disabled>
                        <ListItemText>{p.attributes.title}</ListItemText>
                      </ListItemButton>
                    </ListItem>
                  ))}
            </List>
          </Card>

          {/* STEPS */}
          <Card sx={{ overflow: "visible", padding: 0 }}>
            <List
              subheader={
                <ListSubheader
                  component="div"
                  id="nested-list-subheader"
                  sx={{ background: "#eaeaea" }}
                >
                  <Grid container justifyContent="space-between">
                    <Grid item>Steps</Grid>
                    {isLoading ? (
                      <Skeleton variant="text" width={120} />
                    ) : milestone.relationships.steps.data.length ? null : (
                      <Grid item>
                        <Button
                          variant="contained"
                          size="small"
                          disabled={!isDraftingNewVersion || !isEditingProcess}
                          onClick={() => handleStageAddStep(1000)}
                        >
                          Add step
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                </ListSubheader>
              }
            >
              {isLoading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <ListItem key={index} divider>
                    <ListItemText>
                      <Skeleton variant="text" width={120} />
                    </ListItemText>
                  </ListItem>
                ))
              ) : (
                <DraggableList
                  items={milestone.relationships.steps.data}
                  onReorder={(
                    stepId,
                    priorItemPosition,
                    subsequentItemPosition
                  ) => {
                    handleRepositionStep(
                      stepId,
                      priorItemPosition,
                      subsequentItemPosition
                    );
                  }}
                  getId={(item) => item.id}
                  getPosition={(item) => item.attributes.position}
                  renderItem={(step, i) => (
                    <StepListItem
                      workflowId={workflowId}
                      key={step.id}
                      step={step}
                      isEditingProcess={isEditingProcess}
                      isDraftingNewVersion={isDraftingNewVersion}
                      prevStepPosition={
                        i > 0 &&
                        milestone.relationships.steps.data[i - 1].attributes
                          .position
                      }
                      isLast={
                        i === milestone.relationships.steps.data.length - 1
                      }
                      // handleRemoveStep={handleRemoveStep}
                      handleStageAddStep={handleStageAddStep}
                    />
                  )}
                />
              )}
            </List>
          </Card>
        </Stack>
      </form>
      <AddPrerequisiteModal
        open={showAddPrerequisiteModal}
        onClose={() => setShowAddPrerequisiteModal(false)}
        handleAddPrerequisite={handleAddPrerequisite}
        workflow={workflow}
        milestone={milestone}
      />
      <AddStepModal
        open={addStepModalOpen}
        addStepPosition={addStepPosition}
        handleCreateStep={handleCreateStep}
        onClose={() => setAddStepModalOpen(false)}
      />
      <Snackbar
        autoHideDuration={1000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={repositionedSnackbarOpen}
        onClose={() => setRepositionedSnackbarOpen(false)}
        message="Step repositioned and saved."
      />
      <Snackbar
        autoHideDuration={1000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={updatedProcessSnackbarOpen}
        onClose={() => setUpdatedProcessSnackbarOpen(false)}
        message="Process updated."
      />
    </PageContainer>
  );
};

export default ProcessId;

const AddPrerequisiteModal = ({
  open,
  onClose,
  handleAddPrerequisite,
  workflow,
  milestone,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Add Prerequisite</DialogTitle>
      <DialogContent>
        <Card sx={{ padding: 0 }} variant="outlined">
          <ChoosePrerequisiteList
            handleAddPrerequisite={handleAddPrerequisite}
            workflow={workflow}
            milestone={milestone}
          />
        </Card>
        {/* list of processes */}
      </DialogContent>
    </Dialog>
  );
};

const AddStepModal = ({ open, addStepPosition, handleCreateStep, onClose }) => {
  const handleClose = () => {
    onClose();
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm();

  useEffect(() => {
    reset({
      position: addStepPosition,
    });
  }, [open]);

  const onSubmit = handleSubmit((data) => {
    // console.log({ data });
    handleCreateStep(data);
    reset();
    onClose();
  });
  return (
    <Dialog open={open} onClose={handleClose} fullWidth scroll="paper">
      <DialogTitle>Add Step</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Controller
            name="position"
            control={control}
            defaultValue=""
            render={({ field }) => <input type="hidden" {...field} />}
          />
          <StepFields control={control} errors={errors} />
        </DialogContent>
        <DialogActions>
          <Button type="submit" disabled={!isDirty}>
            Create Step
          </Button>
          {/* Step add button */}
        </DialogActions>
      </form>
    </Dialog>
  );
};

const StepListItem = ({
  isEditingProcess,
  isDraftingNewVersion,
  handleStageAddStep,
  prevStepPosition,
  step,
  isLast,
  workflowId,
}) => {
  const [showRemoveStepCheck, setShowRemoveStepCheck] = useState(false);
  const [stepCheckValue, setSetepCheckValue] = useState(null);
  const [deleteStepCheck, setDeleteStepCheck] = useState("");
  // console.log({ prevStepPosition });
  const router = useRouter();
  const processId = router.query.processId;

  const position = isLast
    ? step.attributes.position + 1000
    : (step.attributes.position + prevStepPosition) / 2;
  const lastStepPosition = step.attributes.position + 1000;

  // console.log({ step });

  const { listeners, attributes, isDragging } = useSortable({ id: step.id });

  const PositionGrabber = ({ ...props }) => {
    return (
      <Stack {...props} id={`drag-handle-${snakeCase(step.attributes.title)}`}>
        <DragHandle />
      </Stack>
    );
  };

  const handleRemoveStep = async (stepId) => {
    console.log("Remove step", stepId);
    setShowRemoveStepCheck(false);
    try {
      const response = await stepsApi.deleteStep(processId, stepId);
      mutate(`definition/workflows/${workflowId}/processes/${processId}`);
    } catch (error) {
      console.log(error);
    }
  };

  // handleRemoveStep(step.id);
  return (
    <ListItem
      disablePadding
      divider
      secondaryAction={
        !isEditingProcess ? null : (
          <Button
            variant="text"
            color="error"
            onClick={(e) => {
              setSetepCheckValue(step);
              setShowRemoveStepCheck(true);
            }}
            id={`remove-step-${snakeCase(step.attributes.title)}`}
          >
            Remove
          </Button>
        )
      }
      sx={{ background: "white", opacity: isDragging ? 0.5 : 1 }}
    >
      <InlineActionTile
        isLast={isLast}
        disabled={isDraftingNewVersion && !isEditingProcess}
        id={`inline-action-tile-${snakeCase(step.attributes.title)}`}
        showAdd={isDraftingNewVersion && isEditingProcess}
        status="default"
        add={() => handleStageAddStep(position, step.id)}
        lastAdd={() => handleStageAddStep(lastStepPosition, step.id)}
        dragHandle={<PositionGrabber {...listeners} {...attributes} />}
      />
      <ListItemButton
        disabled={isDraftingNewVersion && !isEditingProcess}
        onClick={() =>
          router.push(
            `/admin/workflows/processes/${processId}/steps/${step.id}`
          )
        }
      >
        <Stack direction="row" spacing={3} alignItems="center">
          <ListItemText>
            <Typography variant="bodyRegular">
              {step.attributes.title}
            </Typography>
          </ListItemText>
          <Chip label={step.attributes.maxWorktime} size="small" />
          <Chip
            label={
              step.attributes.completionType === "each_person"
                ? "Individual"
                : "Collaborative"
            }
            size="small"
          />
          <Chip
            label={step.attributes.kind === "default" ? "Default" : "Decision"}
            size="small"
          />
          {step.relationships.documents.data.length ? (
            <Chip
              label={`${step.relationships.documents.data.length} Resource`}
              size="small"
            />
          ) : null}
        </Stack>
      </ListItemButton>
      <Dialog
        fullWidth
        open={showRemoveStepCheck}
        onClose={() => setShowRemoveStepCheck(false)}
      >
        <DialogTitle>
          {showRemoveStepCheck
            ? `Remove "${stepCheckValue?.attributes.title}"`
            : null}
        </DialogTitle>
        <DialogContent>
          <Stack mt={3} spacing={3}>
            <TextField
              fullWidth
              name="delete_step_check"
              value={deleteStepCheck}
              onChange={(e) => setDeleteStepCheck(e.target.value)}
              label="To remove, type the step title"
              placeholder="e.g. Step Title"
            />
            <Stack direction="row" spacing={3}>
              <Warning color="primary" />
              <Typography variant="bodyRegular">
                Note that once removed, a step is gone and cannot be retrieved.
                If you need the content of this step you should save it
                elsewhere first.
              </Typography>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleRemoveStep(step.id)}
            color="error"
            disabled={
              showRemoveStepCheck &&
              deleteStepCheck !== stepCheckValue?.attributes.title
            }
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </ListItem>
  );
};

const categories = Object.values(ssj_categories).map((category) => ({
  label: category,
  value: category,
}));
const phases = [
  { label: "Visioning", value: "visioning" },
  { label: "Planning", value: "planning" },
  { label: "Startup", value: "startup" },
];

const StepFields = ({ control, errors }) => {
  return (
    <Stack spacing={6}>
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
        rules={{
          required: {
            value: true,
            message: "This field is required",
          },
        }}
        render={({ field }) => (
          <TextField
            multiline
            label="Description"
            placeholder="The description of this step"
            error={errors.description}
            helperText={
              errors && errors.description && errors.description.message
            }
            {...field}
          />
        )}
      />

      <Controller
        name="max_worktime"
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
            label="Worktime (in minutes)"
            placeholder="e.g. 60 for 1 hour"
            error={errors.max_worktime}
            helperText={
              errors && errors.max_worktime && errors.max_worktime.message
            }
            {...field}
          />
        )}
      />

      <Stack spacing={2}>
        <Typography variant="bodyRegular">Assignment</Typography>
        <Controller
          name="completion_type"
          defaultValue=""
          control={control}
          rules={{ required: true, message: "This field is required" }}
          render={({ field: { onChange, value } }) => (
            <RadioGroup value={value}>
              <FormControlLabel
                value="each_person"
                control={<Radio />}
                label={
                  "Individual (everyone can assign - everyone should complete)"
                }
                onChange={onChange}
              />
              <FormControlLabel
                value="one_per_group"
                control={<Radio />}
                label={
                  "Collaborative (everyone can assign - only one can complete per group)"
                }
                onChange={onChange}
              />
              <FormHelperText error={errors.completion_type}>
                {errors &&
                  errors.completion_type &&
                  errors.completion_type.type === "required" &&
                  "This field is required"}
              </FormHelperText>
            </RadioGroup>
          )}
        />
      </Stack>
      <Controller
        name="kind"
        defaultValue="default"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            label="Is decision"
            control={
              <Switch
                label="Kind"
                checked={field.value === "decision"}
                onChange={(e) =>
                  field.onChange(e.target.checked ? "decision" : "default")
                }
              />
            }
          />
        )}
      />
    </Stack>
  );
};

const ChoosePrerequisiteList = ({
  handleAddPrerequisite,
  workflow,
  milestone,
}) => {
  //  TODO: get the workflow, show processes from that workflow, and then filter out processes greater than the current processes position

  // console.log({ workflow });

  const milestonePosition =
    milestone.relationships.selectedProcesses.data[0].attributes.position;

  const filteredProcesses = workflow.relationships.processes.data.filter(
    (process) =>
      process.relationships.selectedProcesses.data[0].attributes.position <
        milestonePosition &&
      process.relationships.selectedProcesses.data[0].attributes.state !==
        "removed"
  );

  console.log({ filteredProcesses });

  return (
    <List>
      {!filteredProcesses ? (
        Array.from({ length: 12 }).map((_, index) => (
          <ListItem key={index} divider>
            <ListItemText>
              <Skeleton variant="text" width={120} />
            </ListItemText>
          </ListItem>
        ))
      ) : !filteredProcesses.length ? (
        <ListItem divider>
          <ListItemText>
            <Typography variant="bodyRegular">
              No prerequisites available
            </Typography>
          </ListItemText>
        </ListItem>
      ) : (
        filteredProcesses?.map((process, i) => (
          <ListItem disablePadding divider key={i}>
            <ListItemButton onClick={() => handleAddPrerequisite(process.id)}>
              <Stack direction="row" spacing={3} alignItems="center">
                <ListItemText>
                  <Typography noWrap>{process.attributes.title}</Typography>
                </ListItemText>
                <Chip
                  label={`${process.attributes.phase}`}
                  size="small"
                  variant="outlined"
                />
                <Chip
                  label={`${process.attributes.numOfSteps} steps`}
                  size="small"
                />
                {process.attributes.categories.map((c, i) => (
                  <CategoryChip category={c} key={i} size="small" />
                ))}
              </Stack>
            </ListItemButton>
          </ListItem>
        ))
      )}
    </List>
  );
};
