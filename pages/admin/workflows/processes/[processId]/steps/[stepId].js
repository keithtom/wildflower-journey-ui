import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";

import { Controller, useForm } from "react-hook-form";
import {
  Snackbar,
  Alert,
  List,
  Card,
  CardContent,
  ListItem,
  ListItemText,
  ListItemButton,
  ListSubheader,
  Chip,
  Stack,
  Button,
  RadioGroup,
  TextField,
  FormControlLabel,
  Radio,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Skeleton,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { Edit } from "@mui/icons-material";

import { PageContainer, Grid, Typography } from "@ui";
import stepsApi from "@api/workflow/definition/steps";
import useStep from "@hooks/workflow/definition/useStep";
import useMilestone from "@hooks/workflow/definition/useMilestone";
import useWorkflow from "@hooks/workflow/definition/useWorkflow";

const StepId = ({}) => {
  const router = useRouter();
  const [workflowId, setWorkflowId] = useState(null);
  const processId = router.query.processId;
  const stepId = router.query.stepId;

  const { workflow, isLoading: workflowIsLoading } = useWorkflow(workflowId);

  useEffect(() => {
    const id = localStorage.getItem("workflowId");
    setWorkflowId(id);
  }, []);
  useEffect(() => {
    setIsDraftingNewVersion(workflow?.attributes.published === false);
  }, [workflow]);

  //Fetch milestone data for breadcrumbs
  const { milestone, isLoading: milestoneIsLoading } = useMilestone(processId);
  // console.log({ milestone });
  //Fetch step data
  const { step, isLoading, isError } = useStep(processId, stepId);
  // console.log({ step });

  const [isDraftingNewVersion, setIsDraftingNewVersion] = useState(null);

  const [stepHasChanges, setStepHasChanges] = useState(false);
  const [originalData, setOriginalData] = useState(false);

  const [resourceModalOpen, setResourceModalOpen] = useState(false);
  const [updatedStepSnackbarOpen, setUpdatedStepSnackbarOpen] = useState(false);
  const [viewingResource, setViewingResource] = useState(null);

  const [resourceParams, setResourceParams] = useState([]);
  // console.log({ resourceParams });
  const [resourcesToDelete, setResourcesToDelete] = useState([]);
  // console.log({ resourcesToDelete });

  const [decisionModalOpen, setDecisionModalOpen] = useState(false);
  const [decisionOption, setDecisionOption] = useState(null);
  const [decisionOptionParams, setDecisionOptionParams] = useState([]);
  console.log({ decisionOptionParams });

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    getValues,
    formState: { errors, isDirty },
  } = useForm();

  useEffect(() => {
    setStepHasChanges(isDirty);
  }, [isDirty]);

  useEffect(() => {
    if (!isLoading && step) {
      const defaultValues = {
        title: step?.attributes?.title,
        decision_question: step?.attributes?.decisionQuestion,
        description: step?.attributes?.description,
        max_worktime: step?.attributes?.maxWorktime,
        kind: step?.attributes?.kind,
        completion_type: step?.attributes?.completionType,
        //TODO figure out if it makes sense to edit documents_attributes here
        // documents_attributes: step?.relationships?.documents?.data?.map(
        //   (document) => ({
        //     external_identifier: document.id,
        //     title: document.attributes?.title,
        //     link: document.attributes?.link,
        //   })
        // ),
      };
      setOriginalData(defaultValues);
      reset(defaultValues);
    }
  }, [isLoading, step, reset]);

  const kindField = watch("kind");

  const handleCancelUpdateStep = () => {
    reset(originalData);
    setResourceParams([]);
    setDecisionOptionParams([]);
    setResourcesToDelete([]);
    setStepHasChanges(false);
  };
  const handleUpdateStep = async (data) => {
    // console.log("Updating step", data);
    const allData = {
      step: {
        ...data,
      },

      // documents_attributes: resourceParams,
      // decision_options_attributes: decisionOptionParams,
    };

    if (resourceParams.length > 0) {
      allData.step.documents_attributes = resourceParams;
    }
    if (decisionOptionParams.length > 0) {
      allData.step.decision_options_attributes = decisionOptionParams;
    }

    Object.keys(allData.step).forEach((key) => {
      if (allData.step[key] === originalData[key]) {
        delete allData.step[key];
      }
    });
    // console.log({ allData });

    const hasChanges = Object.keys(allData.step).some(
      (key) => allData.step[key] !== originalData[key]
    );

    if (
      hasChanges ||
      resourceParams.length > 0 ||
      decisionOptionParams.length > 0
    ) {
      try {
        const response = await stepsApi.editStep(processId, step.id, allData);
        setStepHasChanges(false);
        setUpdatedStepSnackbarOpen(true);
        setResourceParams([]);
        setDecisionOptionParams([]);
        mutate(`/definition/processes/${processId}/steps/${step.id}`);
        // console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    if (resourcesToDelete.length > 0) {
      try {
        resourcesToDelete.forEach(async (resource) => {
          console.log("deleting resource", resource);
          const response = await stepsApi.deleteDocument(resource);
          setUpdatedStepSnackbarOpen(true);
          mutate(`/v1/documents/${resource}`);
          mutate(`/definition/processes/${processId}/steps/${step.id}`);
          setResourcesToDelete([]);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Resource handlers
  const handleUpdateResource = (data) => {
    console.log("Update resource", data);
    const preparedDataForApi = {
      title: data?.resource_title || "",
      link: data?.resource_link || "",
    };
    if (data?.resource_id !== null) {
      preparedDataForApi.id = data?.resource_id;
    }
    setResourceParams([...resourceParams, preparedDataForApi]);
    setStepHasChanges(true);
  };
  const handleRemoveResource = (id) => {
    // console.log(id);
    if (!resourcesToDelete.includes(id)) {
      setResourcesToDelete([...resourcesToDelete, id]);
    }
    setStepHasChanges(true);
  };
  const handleAddResource = () => {
    // console.log("Add resource");
  };
  const handleOpenResourceModal = (resource) => {
    // console.log("Open resource modal");
    setViewingResource(resource);
    setResourceModalOpen(true);
  };
  // Decision handlers
  const handleOpenDecisionModal = (decisionOption) => {
    // console.log("Open decision modal");
    setDecisionOption(decisionOption);
    setDecisionModalOpen(true);
  };
  const handleUpdateDecisionOption = (data) => {
    const structuredData = {
      id: data?.decision_id || "",
      description: data?.decision_option || "",
    };
    setDecisionOptionParams([...decisionOptionParams, structuredData]);
    setStepHasChanges(true);
    color = "error";
  };
  const handleRemoveDecisionOption = (optionId) => {
    // console.log("Remove decision option");
  };
  const handleAddDecisionOption = (data) => {
    const structuredData = {
      id: data?.decision_id || "",
      description: data?.decision_option || "",
    };
    setDecisionOptionParams([...decisionOptionParams, structuredData]);
    setStepHasChanges(true);
  };

  const onSubmit = handleSubmit(handleUpdateStep);

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

            <Link
              underline="hover"
              color="inherit"
              href={`/admin/workflows/processes/${processId}`}
            >
              <Typography variant="bodyRegular" lightened>
                {milestoneIsLoading ? (
                  <Skeleton width={64} />
                ) : (
                  milestone.attributes.title
                )}
              </Typography>
            </Link>
            <Typography variant="bodyRegular">
              {isLoading ? <Skeleton width={64} /> : step.attributes.title}
            </Typography>
          </Breadcrumbs>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Stack direction="row" spacing={3} alignItems="center">
                <Typography variant="h4" bold>
                  {isLoading ? <Skeleton width={64} /> : step.attributes.title}
                </Typography>
                {/* <Chip label="Live" color="primary" size="small" />
                <Typography variant="bodyRegular" lightened>
                  Updated 4 weeks ago
                </Typography> */}
              </Stack>
            </Grid>
            <Grid item>
              {stepHasChanges ? (
                <Stack direction="row" spacing={3}>
                  <Button variant="secondary" onClick={handleCancelUpdateStep}>
                    Cancel
                  </Button>
                  <Button variant="contained" onClick={onSubmit}>
                    Update
                  </Button>
                </Stack>
              ) : (
                <Button variant="contained" disabled>
                  Update
                </Button>
              )}
            </Grid>
          </Grid>

          {/* FORM */}
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
                  label="Worktime"
                  placeholder="e.g. 2 hours, or 3 minutes"
                  error={errors.worktime}
                  helperText={
                    errors && errors.worktime && errors.worktime.message
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
                  </RadioGroup>
                )}
              />
            </Stack>
          </Stack>

          {/* RESOURCES */}
          <Card noPadding>
            <List
              subheader={
                <ListSubheader
                  component="div"
                  id="nested-list-subheader"
                  sx={{ background: "#eaeaea" }}
                >
                  <Grid container justifyContent="space-between">
                    <Grid item>Resources</Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleOpenResourceModal(null)}
                      >
                        Add resource
                      </Button>
                    </Grid>
                  </Grid>
                </ListSubheader>
              }
            >
              {isLoading
                ? Array.from({ length: 3 }).map((_, index) => (
                    <ListItem key={index} divider>
                      <ListItemText>
                        <Skeleton variant="text" width={120} />
                      </ListItemText>
                    </ListItem>
                  ))
                : step.relationships.documents.data.map((resource, i) => (
                    <ListItem disablePadding divider key={i}>
                      <ListItemButton
                        onClick={() => handleOpenResourceModal(resource)}
                      >
                        <Stack direction="row" spacing={3} alignItems="center">
                          <ListItemText>
                            <Typography
                              variant="bodyRegular"
                              struck={resourcesToDelete.includes(resource.id)}
                            >
                              {resourceParams.find(
                                (param) => param.id === resource.id
                              )?.title || resource.attributes.title}
                            </Typography>
                          </ListItemText>
                          {resourceParams.some(
                            (param) => param.id === resource.id
                          ) ? (
                            <Chip
                              label="Edited"
                              size="small"
                              variant="outlined"
                            />
                          ) : null}
                        </Stack>
                      </ListItemButton>
                    </ListItem>
                  ))}
              {resourceParams.filter((param) => !param.id).length > 0 &&
                resourceParams.map((resourceBeingAdded, i) => (
                  <ListItem disablePadding divider key={i}>
                    <ListItemButton>
                      <Stack direction="row" spacing={3} alignItems="center">
                        <ListItemText>
                          <Typography variant="bodyRegular" lightened>
                            {resourceBeingAdded.title}
                          </Typography>
                        </ListItemText>
                      </Stack>
                    </ListItemButton>
                  </ListItem>
                ))}
            </List>
          </Card>
          {/* DECISION */}
          <Card>
            <CardContent>
              <Stack spacing={6}>
                <Controller
                  name="kind"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      label="Is decision"
                      control={
                        <Switch
                          disabled={!isDraftingNewVersion}
                          label="Kind"
                          checked={field.value === "decision"}
                          onChange={(e) =>
                            field.onChange(
                              e.target.checked ? "decision" : "default"
                            )
                          }
                        />
                      }
                    />
                  )}
                />
                {kindField === "decision" ? (
                  <Stack spacing={3}>
                    <Controller
                      name="decision_question"
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
                          label="Decision question"
                          placeholder="e.g. Will you do A or B?"
                          error={errors.decision_question}
                          helperText={
                            errors &&
                            errors.decision_question &&
                            errors.decision_question.message
                          }
                          {...field}
                        />
                      )}
                    />
                    <Card noPadding>
                      <List
                        subheader={
                          <ListSubheader
                            component="div"
                            id="nested-list-subheader"
                            sx={{ background: "#eaeaea" }}
                          >
                            <Grid container justifyContent="space-between">
                              <Grid item>Decision options</Grid>
                              <Grid item>
                                <Button
                                  variant="contained"
                                  size="small"
                                  onClick={() => handleOpenDecisionModal(null)}
                                  disabled={!isDraftingNewVersion}
                                >
                                  Add decision option
                                </Button>
                              </Grid>
                            </Grid>
                          </ListSubheader>
                        }
                      >
                        {decisionOptionParams
                          ? decisionOptionParams
                              .filter((d) => !d.id)
                              .map((d, i) => (
                                <ListItem disablePadding divider key={i}>
                                  <ListItemButton>
                                    <Stack
                                      direction="row"
                                      spacing={3}
                                      alignItems="center"
                                    >
                                      <ListItemText>
                                        <Typography
                                          variant="bodyRegular"
                                          lightened
                                        >
                                          {d.description}
                                        </Typography>
                                      </ListItemText>
                                      {decisionOptionParams.some(
                                        (param) => param.id === d.id
                                      ) ? (
                                        <Chip
                                          label="Added"
                                          size="small"
                                          variant="outlined"
                                        />
                                      ) : null}
                                    </Stack>
                                  </ListItemButton>
                                </ListItem>
                              ))
                          : null}
                        {isLoading
                          ? Array.from({ length: 3 }).map((_, index) => (
                              <ListItem key={index} divider>
                                <ListItemText>
                                  <Skeleton variant="text" width={120} />
                                </ListItemText>
                              </ListItem>
                            ))
                          : step.relationships.decisionOptions.data.map(
                              (decisionOption, i) => (
                                <ListItem
                                  disablePadding
                                  divider
                                  key={i}
                                  secondaryAction={
                                    <Button
                                      color="error"
                                      onClick={() =>
                                        handleRemoveDecisionOption(
                                          decisionOption.id
                                        )
                                      }
                                    >
                                      Remove
                                    </Button>
                                  }
                                >
                                  <ListItemButton
                                    onClick={() =>
                                      handleOpenDecisionModal(decisionOption)
                                    }
                                  >
                                    <Stack
                                      direction="row"
                                      spacing={3}
                                      alignItems="center"
                                    >
                                      <ListItemText>
                                        <Typography variant="bodyRegular">
                                          {decisionOptionParams.find(
                                            (param) =>
                                              param.id === decisionOption.id
                                          )?.description ||
                                            decisionOption.attributes
                                              .description}
                                        </Typography>
                                      </ListItemText>
                                      {decisionOptionParams.some(
                                        (param) =>
                                          param.id === decisionOption.id
                                      ) ? (
                                        <Chip
                                          label="Edited"
                                          size="small"
                                          variant="outlined"
                                        />
                                      ) : null}
                                    </Stack>
                                  </ListItemButton>
                                </ListItem>
                              )
                            )}
                      </List>
                    </Card>
                  </Stack>
                ) : null}
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </form>
      <ResourceModal
        open={resourceModalOpen}
        onClose={() => setResourceModalOpen(false)}
        handleRemoveResource={handleRemoveResource}
        handleUpdateResource={handleUpdateResource}
        handleAddResource={handleAddResource}
        resource={viewingResource}
      />
      <DecisionOptionModal
        isDraftingNewVersion={isDraftingNewVersion}
        open={decisionModalOpen}
        onClose={() => setDecisionModalOpen(false)}
        handleUpdateDecisionOption={handleUpdateDecisionOption}
        handleRemoveDecisionOption={handleRemoveDecisionOption}
        handleAddDecisionOption={handleAddDecisionOption}
        decisionOption={decisionOption}
      />
      <Snackbar
        autoHideDuration={1000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={updatedStepSnackbarOpen}
        onClose={() => setUpdatedStepSnackbarOpen(false)}
        message="Step updated."
      />
    </PageContainer>
  );
};

export default StepId;

const ResourceModal = ({
  open,
  onClose,
  resource,
  handleRemoveResource,
  handleUpdateResource,
  handleAddResource,
}) => {
  const [deleteResourceCheck, setDeleteResourceCheck] = useState("");
  const isAdding = !resource;

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm();

  useEffect(() => {
    reset({
      resource_id: resource?.id || null,
      resource_link: resource?.attributes?.link || "",
      resource_title: resource?.attributes?.title || "",
    });
  }, [open]);

  useEffect(() => {
    setDeleteResourceCheck("");
  }, [onClose]);

  const onSubmit = handleSubmit((data) => {
    if (isAdding) {
      handleUpdateResource(data);
    } else {
      handleUpdateResource(data);
    }
    onClose();
  });

  const removeResource = (id) => {
    handleRemoveResource(id);
    onClose();
  };

  // console.log("resource in resource modal", resource);

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Resource Modal</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <ResourceForm control={control} errors={errors} />
          {isAdding ? null : (
            <Stack mt={3}>
              <TextField
                fullWidth
                name="delete_resource_check"
                value={deleteResourceCheck}
                onChange={(e) => setDeleteResourceCheck(e.target.value)}
                label="To remove, type the resource title"
                placeholder="e.g. Resource Title"
              />
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          {isAdding ? null : (
            <Button
              color="error"
              disabled={deleteResourceCheck !== watch("resource_title")}
              onClick={() => removeResource(resource?.id)}
            >
              Remove
            </Button>
          )}
          <Button type="submit" disabled={!isDirty}>
            {isAdding ? "Add" : "Update"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const ResourceForm = ({ control, errors }) => {
  return (
    <Stack spacing={3}>
      <Controller
        name="resource_id"
        control={control}
        render={({ field }) => <input type="hidden" {...field} />}
      />
      <Controller
        name="resource_link"
        control={control}
        rules={{
          required: {
            value: true,
            message: "This field is required",
          },
          pattern: {
            value: /^(ftp|http|https):\/\/[^ "]+$/,
            message: "Invalid URL, must include https://",
          },
        }}
        render={({ field }) => (
          <TextField
            label="Resource Link"
            placeholder="e.g. https://www.google.com"
            error={errors.resource_link}
            helperText={
              errors && errors.resource_link && errors.resource_link.message
            }
            {...field}
          />
        )}
      />
      <Controller
        name="resource_title"
        control={control}
        rules={{
          required: {
            value: true,
            message: "This field is required",
          },
        }}
        render={({ field }) => (
          <TextField
            label="Resource Title"
            placeholder="e.g. Resource Title"
            error={errors.resource_title}
            helperText={
              errors && errors.resource_title && errors.resource_title.message
            }
            {...field}
          />
        )}
      />
    </Stack>
  );
};

const DecisionOptionModal = ({
  open,
  onClose,
  decisionOption,
  handleAddDecisionOption,
  handleRemoveDecisionOption,
  handleUpdateDecisionOption,
  isDraftingNewVersion,
}) => {
  // console.log({ decisionOption });
  const isAdding = !decisionOption;
  // console.log({ isAdding });
  // console.log({ isDraftingNewVersion });

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm();

  useEffect(() => {
    reset({
      decision_id: decisionOption?.id || null,
      decision_option: decisionOption?.attributes?.description || "",
    });
  }, [open]);

  const onSubmit = handleSubmit((data) => {
    console.log({ data });
    if (isDraftingNewVersion) {
      if (isAdding) {
        handleAddDecisionOption(data);
      } else {
        handleUpdateDecisionOption(data);
      }
    } else {
      console.log({ data });
      handleUpdateDecisionOption(data);
    }
    onClose();
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Decision option Modal</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DecisionForm control={control} errors={errors} />
        </DialogContent>
        <DialogActions>
          <Button type="submit" disabled={!isDirty}>
            {isDraftingNewVersion && isAdding ? "Add" : "Update"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const DecisionForm = ({ control, errors }) => {
  return (
    <Stack spacing={3}>
      <Controller
        name="decision_id"
        control={control}
        render={({ field }) => <input type="hidden" {...field} />}
      />
      <Controller
        name="decision_option"
        control={control}
        rules={{
          required: {
            value: true,
            message: "This field is required",
          },
        }}
        render={({ field }) => (
          <TextField
            label="Decision Option"
            placeholder="e.g. Yes"
            error={errors.decision_option}
            helperText={
              errors && errors.decision_option && errors.decision_option.message
            }
            {...field}
          />
        )}
      />
    </Stack>
  );
};
