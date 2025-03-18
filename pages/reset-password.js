import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import FormHelperText from "@mui/material/FormHelperText";
import {
  Button,
  Grid,
  Stack,
  Typography,
  Card,
  TextField,
  PageContainer,
} from "@ui";

const ResetPassword = () => {
  const router = useRouter();
  const [error, setError] = useState(null);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Watch the password field to use in validation
  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      // For now, just log the data
      console.log("Reset password data:", data);

      // TODO: Implement actual password reset when endpoint is available
      // await authApi.resetPassword(data.password);
      // router.push("/login");
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.error ||
          "An error occurred while resetting your password."
      );
    }
  };

  return (
    <PageContainer hideNav>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card>
            <Stack spacing={6}>
              <Grid container justifyContent="center">
                <Grid item>
                  <Typography variant="h4" bold>
                    Reset Password
                  </Typography>
                </Grid>
              </Grid>

              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={6}>
                  <Stack spacing={3}>
                    {error && <FormHelperText error>{error}</FormHelperText>}
                    <Controller
                      name="password"
                      control={control}
                      rules={{
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="password"
                          label="New Password"
                          placeholder="Enter your new password"
                          error={!!errors.password}
                          helperText={errors.password?.message}
                          disabled={isSubmitting}
                          fullWidth
                        />
                      )}
                    />
                    <Controller
                      name="confirmPassword"
                      control={control}
                      rules={{
                        required: "Please confirm your password",
                        validate: (value) =>
                          value === password || "Passwords do not match",
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="password"
                          label="Confirm Password"
                          placeholder="Confirm your new password"
                          error={!!errors.confirmPassword}
                          helperText={errors.confirmPassword?.message}
                          disabled={isSubmitting}
                          fullWidth
                        />
                      )}
                    />
                  </Stack>

                  <Button type="submit" disabled={isSubmitting} fullWidth>
                    <Typography variant="bodyRegular" bold light>
                      {isSubmitting ? "Resetting..." : "Reset Password"}
                    </Typography>
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ResetPassword;
