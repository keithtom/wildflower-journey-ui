import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { FormControlLabel, RadioGroup, FormHelperText } from "@mui/material";

import {
  PageContainer,
  Grid,
  Typography,
  Stack,
  Card,
  Button,
  AvatarGroup,
  Icon,
  TextField,
  Chip,
  Link,
  Radio,
  MultiSelect,
  Spinner,
} from "@ui";

const Admin = ({}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <PageContainer hideNav>
      <Grid container>
        <Grid item xs={12} sm={4} md={3}>
          <Card>
            {isSubmitSuccessful ? (
              <Grid container spacing={6} justifyContent="center">
                <Grid item>
                  <Typography variant="h4" bold>
                    User successfully added!
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    full
                    onClick={() => {
                      reset({
                        firstName: "",
                        lastName: "",
                        city: "",
                        state: "",
                        email: "",
                        role: "",
                      });
                    }}
                  >
                    <Typography light bold>
                      Add another user
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container justifyContent="center" spacing={6}>
                  <Grid item>
                    <Typography variant="h4" bold>
                      Add a new user to the SSJ
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={3}>
                      <Controller
                        name="firstName"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <TextField
                            label="First name"
                            placeholder="e.g. Jane"
                            error={errors.firstName}
                            helperText={
                              errors &&
                              errors.firstName &&
                              errors.firstName &&
                              "This field is required"
                            }
                            {...field}
                          />
                        )}
                      />
                      <Controller
                        name="lastName"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <TextField
                            label="Last name"
                            placeholder="e.g. Smith"
                            error={errors.lastName}
                            helperText={
                              errors &&
                              errors.lastName &&
                              errors.lastName &&
                              "This field is required"
                            }
                            {...field}
                          />
                        )}
                      />
                      <Controller
                        name="city"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <TextField
                            label="City"
                            placeholder="e.g. Boston"
                            error={errors.city}
                            helperText={
                              errors &&
                              errors.city &&
                              errors.city &&
                              "This field is required"
                            }
                            {...field}
                          />
                        )}
                      />
                      <Controller
                        name="state"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <TextField
                            label="State"
                            placeholder="e.g. Massachusetts"
                            error={errors.state}
                            helperText={
                              errors &&
                              errors.state &&
                              errors.state &&
                              "This field is required"
                            }
                            {...field}
                          />
                        )}
                      />
                      <Controller
                        name="email"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <TextField
                            label="Email"
                            placeholder="e.g. jane.smith@gmail.com"
                            error={errors.email}
                            helperText={
                              errors &&
                              errors.email &&
                              errors.email &&
                              "This field is required"
                            }
                            {...field}
                          />
                        )}
                      />
                      <Stack spacing={1}>
                        <Typography variant="bodyRegular">Role</Typography>
                        <Controller
                          name="role"
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { onChange, value } }) => (
                            <RadioGroup value={value} handleOptionsChange>
                              {SSJRoleOptions.map((o, i) => (
                                <FormControlLabel
                                  key={i}
                                  value={o.value}
                                  control={<Radio />}
                                  label={o.label}
                                  onChange={onChange}
                                />
                              ))}
                            </RadioGroup>
                          )}
                        />
                        <FormHelperText error={errors.role}>
                          {errors &&
                            errors.role &&
                            errors.role.type === "required" &&
                            "This field is required"}
                        </FormHelperText>
                      </Stack>
                      <Button full disabled={isSubmitting} type="submit">
                        <Typography variant="bodyRegular" light bold>
                          Add user
                        </Typography>
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </form>
            )}
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Admin;

const SSJRoleOptions = [
  { value: "Emerging Teacher Leader", label: "Emerging Teacher Leader" },
  { value: "Operations Guide", label: "Operations Guide" },
  {
    value: "Regional Growth Leader",
    label: "Regional Growth Leader",
  },
];
