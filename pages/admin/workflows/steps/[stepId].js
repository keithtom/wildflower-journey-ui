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
  RadioGroup,
  TextField,
  FormControlLabel,
  Radio,
  Switch,
} from "@mui/material";
import { PageContainer, Grid, Typography } from "@ui";

const ProcessId = ({}) => {
  const router = useRouter();
  const isDecision = true;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
            <Button variant="contained" disabled>
              Update
            </Button>
          </Grid>
        </Grid>

        {/* FORM */}
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
            name="max_worktime"
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

          {/* RESOURCES */}
          <Card noPadding>
            <List
              subheader={
                <ListSubheader
                  component="div"
                  id="nested-list-subheader"
                  sx={{ background: "#eaeaea" }}
                >
                  Resources
                </ListSubheader>
              }
            >
              {/* TODO: Map through decision options */}
              <ListItem disablePadding divider>
                <ListItemButton
                // onClick={handleEditDecisionOption}
                >
                  <Stack direction="row" spacing={3} alignItems="center">
                    <ListItemText>Visioning Album Template</ListItemText>
                  </Stack>
                </ListItemButton>
              </ListItem>
            </List>
          </Card>

          <Controller
            name="kind"
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

        {isDecision ? (
          <Card noPadding>
            <List
              subheader={
                <ListSubheader
                  component="div"
                  id="nested-list-subheader"
                  sx={{ background: "#eaeaea" }}
                >
                  Decision options
                </ListSubheader>
              }
            >
              {/* TODO: Map through decision options */}
              <ListItem disablePadding divider>
                <ListItemButton
                // onClick={handleEditDecisionOption}
                >
                  <Stack direction="row" spacing={3} alignItems="center">
                    <ListItemText>Yes</ListItemText>
                  </Stack>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding divider>
                <ListItemButton
                // onClick={handleEditDecisionOption}
                >
                  <Stack direction="row" spacing={3} alignItems="center">
                    <ListItemText>No</ListItemText>
                  </Stack>
                </ListItemButton>
              </ListItem>
            </List>
          </Card>
        ) : null}
      </Stack>
    </PageContainer>
  );
};

export default ProcessId;

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
