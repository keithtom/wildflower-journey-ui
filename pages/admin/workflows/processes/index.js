import { useState } from "react";
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
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Skeleton,
  Snackbar,
  FormControl,
  InputLabel,
  TextField,
  Select,
  OutlinedInput,
  MenuItem,
} from "@mui/material";
import { PageContainer, Grid, Typography } from "@ui";
import useMilestones from "@hooks/workflow/definition/useMilestones";

import processes from "@api/workflow/definition/processes";

const ProcessLibrary = () => {
  const [repositionedSnackbarOpen, setRemoveProcessSnackbarOpen] =
    useState(false);
  const [addProcessModalOpen, setAddProcessModalOpen] = useState(false);
  // get data
  const { milestones, isLoading, isError } = useMilestones();
  console.log({ milestones });

  const handleRemoveProcess = async (id) => {
    try {
      await processes.deleteMilestone(id);
      mutate(`/definition/processes`);
      setRemoveProcessSnackbarOpen(true);
    } catch (error) {
      console.error(error);
    }
  };
  const handleAddProcess = async (data) => {
    const structuredData = {
      ...data,
      category_list: [data.categories],
      phase_list: data.phase,
    };
    try {
      await processes.createMilestone(structuredData);
      mutate(`/definition/processes`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PageContainer isAdmin>
      <Stack spacing={6}>
        <Grid container>
          <Grid item>
            <Stack spacing={2}>
              <Typography variant="h4" bold>
                Process Library
              </Typography>
            </Stack>
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
                    <Grid container justifyContent="space-between">
                      <Grid item>Not in a workflow</Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => setAddProcessModalOpen(true)}
                        >
                          Add
                        </Button>
                      </Grid>
                    </Grid>
                  </ListSubheader>
                }
              >
                {isLoading
                  ? Array.from({ length: 5 }).map((_, index) => (
                      <ListItem divider key={index}>
                        <ListItemText>
                          <Skeleton variant="text" width={120} />
                        </ListItemText>
                      </ListItem>
                    ))
                  : milestones.data.data
                      .filter((item) => item.attributes.numOfInstances < 1)
                      .map((milestone, i) => (
                        <ListItem
                          disablePadding
                          divider
                          key={i}
                          secondaryAction={
                            <Button
                              variant="text"
                              color="error"
                              onClick={() => handleRemoveProcess(milestone.id)}
                            >
                              Remove
                            </Button>
                          }
                        >
                          <ListItemButton>
                            <Stack
                              direction="row"
                              spacing={3}
                              alignItems="center"
                            >
                              <ListItemText>
                                {milestone.attributes.title}
                              </ListItemText>
                              {milestone.attributes.numOfSteps ? (
                                <Chip
                                  label={`${milestone.attributes.numOfSteps} steps`}
                                  size="small"
                                />
                              ) : null}
                              {milestone.attributes.categories &&
                                milestone.attributes.categories.map((c, i) => (
                                  <Chip label={c} size="small" key={i} />
                                ))}
                              {milestone.attributes.phase && (
                                <Chip
                                  label={milestone.attributes.phase}
                                  size="small"
                                  key={i}
                                />
                              )}
                            </Stack>
                          </ListItemButton>
                        </ListItem>
                      ))}
              </List>
            </Card>
          </Grid>
        </Grid>
        {/* <Grid container>
          <Grid item xs={12}>
            <Card noPadding>
              <List
                subheader={
                  <ListSubheader
                    component="div"
                    id="nested-list-subheader"
                    sx={{ background: "#eaeaea" }}
                  >
                    <Grid container justifyContent="space-between">
                      <Grid item>In a workflow (Published or not)</Grid>
                    </Grid>
                  </ListSubheader>
                }
              >
                {isLoading
                  ? Array.from({ length: 5 }).map((_, index) => (
                      <ListItem divider key={index}>
                        <ListItemText>
                          <Skeleton variant="text" width={120} />
                        </ListItemText>
                      </ListItem>
                    ))
                  : milestones.data.data
                      .filter((item) => item.attributes.numOfInstances > 1)
                      .map((milestone, i) => (
                        <ListItem disablePadding divider key={i}>
                          <ListItemButton>
                            <Stack
                              direction="row"
                              spacing={3}
                              alignItems="center"
                            >
                              <ListItemText>
                                {milestone.attributes.title}
                              </ListItemText>
                              {milestone.attributes.numOfSteps ? (
                                <Chip
                                  label={`${milestone.attributes.numOfSteps} steps`}
                                  size="small"
                                />
                              ) : null}
                              {milestone.attributes.categories.map((c, i) => (
                                <Chip label={c} size="small" key={i} />
                              ))}
                            </Stack>
                          </ListItemButton>
                        </ListItem>
                      ))}
              </List>
            </Card>
          </Grid>
        </Grid> */}
      </Stack>
      <Snackbar
        autoHideDuration={1000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={repositionedSnackbarOpen}
        onClose={() => setRemoveProcessSnackbarOpen(false)}
        message="Process removed"
      />
      <AddProcessModal
        open={addProcessModalOpen}
        onClose={() => setAddProcessModalOpen(false)}
        handleAddProcess={handleAddProcess}
      />
    </PageContainer>
  );
};

export default ProcessLibrary;

const AddProcessModal = ({ open, onClose, handleAddProcess }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log({ data });
    handleAddProcess(data);
    reset();
    onClose();
  });
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Add a process</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
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
                      helperText={
                        errors && errors.title && errors.title.message
                      }
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
                        {openSchoolChecklistPhases.map((option) => (
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
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
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
