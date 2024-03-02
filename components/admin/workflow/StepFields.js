import { Controller } from "react-hook-form";
import {
  Stack,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";

const StepFields = ({ control, errors }) => {
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
        name="worktime"
        control={control}
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
            helperText={errors && errors.worktime && errors.worktime.message}
            {...field}
          />
        )}
      />
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

      <Stack spacing={2}>
        <Typography variant="bodyRegular">Assignment</Typography>
        <Controller
          name="assignment"
          control={control}
          rules={{ required: true, message: "This field is required" }}
          render={({ field: { onChange, value } }) => (
            <RadioGroup value={value}>
              <FormControlLabel
                value={"each_person"}
                control={<Radio />}
                label={
                  "Individual (everyone can assign - everyone should complete)"
                }
                onChange={onChange}
              />
              <FormControlLabel
                value={"one_per_group"}
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
  );
};

export default StepFields;
