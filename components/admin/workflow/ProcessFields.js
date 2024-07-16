import { Controller } from "react-hook-form";
import {
  Stack,
  TextField,
  MenuItem,
  Select,
  OutlinedInput,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
} from "@mui/material";

const ProcessFields = ({ control, errors }) => {
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

  return (
    <Stack spacing={6}>
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
        // rules={{
        //   required: {
        //     value: true,
        //     message: "This field is required",
        //   },
        // }}
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
    </Stack>
  );
};

export default ProcessFields;
