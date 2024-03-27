import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";

import { Controller, useForm } from "react-hook-form";
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
} from "@mui/material";
import { PageContainer, Grid, Typography } from "@ui";

import stepsApi from "@api/workflow/definition/steps";
import useStep from "@hooks/workflow/definition/useStep";

const StepId = ({}) => {
  const router = useRouter();
  const isDecision = true;
  const processId = router.query.processId;
  const stepId = router.query.stepId;

  //Fetch step data
  const { step, isLoading, isError } = useStep(processId, stepId);

  console.log({ step });

  const [stepHasChanges, setStepHasChanges] = useState(false);
  const [originalData, setOriginalData] = useState(false);

  const [resourceModalOpen, setResourceModalOpen] = useState(false);
  const [decisionModalOpen, setDecisionModalOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm();

  useEffect(() => {
    setStepHasChanges(isDirty);
  }, [isDirty]);

  useEffect(() => {
    if (!isLoading && step) {
      const defaultValues = {
        title: step?.attributes?.title,
        description: step?.attributes?.description,
        max_worktime: step?.attributes?.maxWorktime,
        kind: step?.attributes?.kind,
        completion_type: step?.attributes?.completionType,
      };
      setOriginalData(defaultValues);
      reset(defaultValues);
    }
  }, [isLoading, step, reset]);

  const kindField = watch("kind");

  const handleCancelUpdateStep = () => {
    reset(originalData);
  };
  const handleUpdateStep = async (data) => {
    console.log("Update step");
    try {
      const response = await stepsApi.editStep(processId, step.id, data);
      setStepHasChanges(false);
      mutate(`/definition/processes/${processId}/steps/${step.id}`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // Resource handlers
  const handleUpdateResource = () => {
    console.log("Update resource");
  };
  const handleRemoveResource = () => {
    console.log("Remove resource");
  };
  const handleAddResource = () => {
    console.log("Add resource");
  };
  const handleOpenResourceModal = () => {
    console.log("Open resource modal");
    setResourceModalOpen(true);
  };
  // Decision handlers
  const handleOpenDecisionModal = () => {
    console.log("Open decision modal");
    setDecisionModalOpen(true);
  };
  const handleUpdateDecisionOption = () => {
    console.log("Update decision option");
  };
  const handleRemoveDecisionOption = () => {
    console.log("Remove decision option");
  };
  const handleAddDecisionOption = () => {
    console.log("Add decision option");
  };

  const onSubmit = handleSubmit(handleUpdateStep);

  return (
    <PageContainer isAdmin>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={6}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Stack direction="row" spacing={3} alignItems="center">
                <Typography variant="h4" bold>
                  Develop your visioning album
                </Typography>
                <Chip label="Live" color="primary" size="small" />
                <Typography variant="bodyRegular" lightened>
                  Updated 4 weeks ago
                </Typography>
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
            <Controller
              name="kind"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  label="Is decision"
                  control={
                    <Switch
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
          </Stack>

          {kindField === "decision" ? (
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
                          onClick={handleOpenDecisionModal}
                        >
                          Add decision option
                        </Button>
                      </Grid>
                    </Grid>
                  </ListSubheader>
                }
              >
                {/* TODO: Map through decision options */}
                <ListItem disablePadding divider>
                  <ListItemButton onClick={handleOpenDecisionModal}>
                    <Stack direction="row" spacing={3} alignItems="center">
                      <ListItemText>Yes</ListItemText>
                    </Stack>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding divider>
                  <ListItemButton onClick={handleOpenDecisionModal}>
                    <Stack direction="row" spacing={3} alignItems="center">
                      <ListItemText>No</ListItemText>
                    </Stack>
                  </ListItemButton>
                </ListItem>
              </List>
            </Card>
          ) : null}
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
                        onClick={handleOpenResourceModal}
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
                        onClick={() => handleOpenResourceModal(resource.id)}
                      >
                        <Stack direction="row" spacing={3} alignItems="center">
                          <ListItemText>
                            {resource.attributes.title}
                          </ListItemText>
                        </Stack>
                      </ListItemButton>
                    </ListItem>
                  ))}
            </List>
          </Card>
        </Stack>
        <ResourceModal
          open={resourceModalOpen}
          onClose={() => setResourceModalOpen(false)}
          handleUpdateResource={handleUpdateResource}
          handleRemoveResource={handleRemoveResource}
          handleAddResource={handleAddResource}
          // resource={resource}
        />
        <DecisionOptionModal
          open={decisionModalOpen}
          onClose={() => setDecisionModalOpen(false)}
          handleUpdateResource={handleUpdateDecisionOption}
          handleRemoveResource={handleRemoveDecisionOption}
          handleAddResource={handleAddDecisionOption}
          // decisionOption={decisionOption}
        />
      </form>
    </PageContainer>
  );
};

export default StepId;

const ResourceModal = ({
  open,
  onClose,
  handleUpdateResource,
  handleRemoveResource,
  handleAddResource,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Resource Modal</DialogTitle>
      <DialogContent>
        {/* TODO: Resource title and url fields here */}
      </DialogContent>
      <DialogActions>
        <Stack direction="row" spacing={1}></Stack>
        <Button onClick={handleUpdateResource}>Update</Button>
        <Button onClick={handleRemoveResource}>Remove</Button>
        <Button onClick={handleAddResource}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};
const DecisionOptionModal = ({
  open,
  onClose,
  handleAddDecisionOption,
  handleRemoveDecisionOption,
  handleUpdateDecisionOption,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Decision option Modal</DialogTitle>
      <DialogContent>{/* TODO: Option description field here */}</DialogContent>
      <DialogActions>
        <Stack direction="row" spacing={1}></Stack>
        <Button onClick={handleUpdateDecisionOption}>Update</Button>
        <Button onClick={handleRemoveDecisionOption}>Remove</Button>
        <Button onClick={handleAddDecisionOption}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

const ResourceForm = () => {
  return (
    <Stack>
      <Controller
        name="resource_link"
        control={control}
        rules={{
          required: {
            value: true,
            message: "This field is required",
          },
        }}
        render={({ field }) => (
          <TextField
            label="Resource Link"
            placeholder="e.g. www.linkToResource.com"
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
