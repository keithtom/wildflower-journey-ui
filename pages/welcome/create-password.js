import { useEffect, useState, useRef } from "react";
import { styled, css } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import { FormControlLabel, FormGroup, FormHelperText } from "@mui/material";
import { useRouter } from "next/router";
import registrationsApi from "../../api/registrations";
import { clearLoggedInState } from "@lib/handleLogout";

import {
  Button,
  Grid,
  Stack,
  Typography,
  Card,
  Box,
  Icon,
  Avatar,
  Link,
  IconButton,
  TextField,
  Checkbox,
  PageContainer,
} from "@ui";

const CreatePassword = ({}) => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      agreeTOS: false,
    },
  });
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data) => {
    registrationsApi
      .setPassword(data.password, data.confirmPassword)
      .then((response) => {
        router.push("/welcome/confirm-your-details");
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          clearLoggedInState({});
          router.push("/login");
        } else {
          console.error(err);
        }
        console.error(err.message);
      });
  };

  return (
    <PageContainer hideNav>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={6}>
                <Grid container justifyContent="center">
                  <Grid item>
                    <Typography variant="h4" bold>
                      Add a password
                    </Typography>
                  </Grid>
                </Grid>

                <Stack spacing={3}>
                  <Controller
                    name="password"
                    control={control}
                    rules={{ required: true }}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        autoComplete="new-password"
                        label="Password"
                        type="password"
                        placeholder="Your secure password"
                        error={errors.password}
                        helperText={
                          errors &&
                          errors.password &&
                          errors.password &&
                          "This field is required"
                        }
                        {...field}
                      />
                    )}
                  />
                  <Controller
                    autoComplete="new-password"
                    name="confirmPassword"
                    control={control}
                    rules={{
                      required: true,
                      validate: (value) => value === password.current,
                    }}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        label="Confirm password"
                        type="password"
                        placeholder="Confirm your password"
                        error={errors.confirmPassword}
                        helperText={
                          errors &&
                          errors.confirmPassword &&
                          errors.confirmPassword.type === "required"
                            ? "This field is required"
                            : errors &&
                              errors.confirmPassword &&
                              errors.confirmPassword.type === "validate" &&
                              "Your passwords do not match"
                        }
                        {...field}
                      />
                    )}
                  />
                  <Controller
                    name="agreeTOS"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, value } }) => (
                      <FormGroup>
                        <FormControlLabel
                          value={value}
                          control={<Checkbox error={errors.agreeTOS} />}
                          label={
                            <Typography>
                              I agree to the{" "}
                              <Link href="/terms" target="_blank">
                                Terms of Service
                              </Link>
                            </Typography>
                          }
                          onChange={onChange}
                        />
                        <FormHelperText error={errors.agreeTOS}>
                          {errors &&
                            errors.agreeTOS &&
                            errors.agreeTOS.type === "required" &&
                            "This field is required"}
                        </FormHelperText>
                      </FormGroup>
                    )}
                  />
                </Stack>

                <Button full disabled={isSubmitting} type="submit">
                  <Typography variant="bodyRegular" light>
                    Confirm
                  </Typography>
                </Button>
              </Stack>
            </form>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default CreatePassword;
