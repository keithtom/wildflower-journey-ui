import { useState } from "react";
import { useRouter } from "next/router";

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
  Select,
  OutlinedInput,
  FormControl,
  InputLabel,
  Checkbox,
  TextField,
  MenuItem,
} from "@mui/material";
import { PageContainer, Grid, Typography } from "@ui";
import InlineActionTile from "@components/admin/InlineActionTile";

const ProcessId = ({}) => {
  const router = useRouter();
  const stepId = "zxcv-1234";

  // TODO: Get isDraftingNewVersion state from the API
  const [isDraftingNewVersion, setIsDraftingNewVersion] = useState(false);
  const [processHasChanges, setProcessHasChanges] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUpdateProcess = () => {
    console.log("Update process");
  };
  const handleCancelUpdateProcess = () => {
    console.log("Cancel update process");
  };
  const handleAddStep = () => {
    console.log("Add step");
  };
  const handleRemoveStep = (id) => {
    console.log("Remove step", id);
  };
  const handleRepositionStep = (id, position) => {
    // TODO drag and drop logic here
    console.log("Reposition step", id, position);
  };

  return (
    <PageContainer isAdmin>
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
            {processHasChanges ? (
              <Stack direction="row" spacing={3}>
                <Button variant="secondary" onClick={handleCancelUpdateProcess}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={handleUpdateProcess}>
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
        <Stack spacing={3}>
          <Controller
            name="title"
            control={control}
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
                placeholder="The description of this process"
                error={errors.description}
                helperText={
                  errors && errors.description && errors.description.message
                }
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
                  multiple
                  input={<OutlinedInput label="Categories" />}
                  renderValue={(selected) => selected.join(", ")}
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
            <InputLabel id="prerequisite-label">Prerequisite</InputLabel>
            <Controller
              name="prerequisite"
              control={control}
              defaultValue={[]}
              rules={{
                required: {
                  value: false,
                },
              }}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="prerequisite-label"
                  id="prerequisite"
                  input={<OutlinedInput label="Prerequisite" />}
                >
                  {prerequisites.map((option) => (
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
                  {phases.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      <ListItemText primary={option.label} />
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Stack>

        {/* STEPS */}
        <Card noPadding>
          {/* TODO: Map through the sections */}
          <List
            subheader={
              <ListSubheader
                component="div"
                id="nested-list-subheader"
                sx={{ background: "#eaeaea" }}
              >
                <Grid container justifyContent="space-between">
                  <Grid item>Steps</Grid>
                  {isDraftingNewVersion ? (
                    <Grid item>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={handleAddStep}
                      >
                        Add step
                      </Button>
                    </Grid>
                  ) : null}
                </Grid>
              </ListSubheader>
            }
          >
            {/* TODO: Map through processes for section */}
            <ListItem
              disablePadding
              divider
              secondaryAction={
                !isDraftingNewVersion ? null : (
                  <Button
                    variant="text"
                    color="error"
                    onClick={() => handleRemoveStep(stepId)}
                  >
                    Remove
                  </Button>
                )
              }
            >
              <InlineActionTile
                showAdd={isDraftingNewVersion}
                status="default"
                add={handleAddStep}
                reposition={handleRepositionStep}
              />
              <ListItemButton
                onClick={() => router.push(`/admin/workflows/steps/${stepId}`)}
              >
                <Stack direction="row" spacing={3} alignItems="center">
                  <ListItemText>Read the visioning album template</ListItemText>
                  <Chip label="30 minutes" size="small" />
                  <Chip label="Individual" size="small" />
                  <Chip label="Default" size="small" />
                  <Chip label="HasResource" size="small" />
                </Stack>
              </ListItemButton>
            </ListItem>
          </List>
        </Card>
      </Stack>
    </PageContainer>
  );
};

export default ProcessId;

const categories = [
  { label: "Finance", value: "finance" },
  { label: "Album", value: "album" },
];
const phases = [
  { label: "Visioning", value: "visioning" },
  { label: "Planning", value: "planning" },
  { label: "Startup", value: "startup" },
];
const prerequisites = [
  { label: "Process 1", value: "asdf-1234" },
  { label: "Process 2", value: "asdf-5678" },
];
