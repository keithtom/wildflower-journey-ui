import { styled, css } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";

import {
  Button,
  Grid,
  Stack,
  Typography,
  Card,
  Box,
  Link,
  TextField,
} from "@ui";
import Header from "@components/Header";

const PageContent = styled(Box)`
  flex-grow: 1;
  margin-top: ${({ theme }) => theme.util.appBarHeight}px;
  padding: ${({ theme }) => theme.util.buffer * 6}px;
`;
const ForgotPassword = ({}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <>
      <Header user={false} />
      <PageContent>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card>
              <Stack spacing={6}>
                <Grid container justifyContent="center" spacing={6}>
                  <Grid item>
                    <Typography variant="h4" bold>
                      Forgot your password?
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="bodyRegular">
                      <Grid item>
                        Enter the email address you used when you joined and
                        we’ll get in touch with you to reset your password.
                      </Grid>
                    </Typography>
                  </Grid>
                </Grid>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <Stack spacing={6}>
                    <Stack spacing={3}>
                      <Controller
                        name="email"
                        control={control}
                        rules={{
                          required: true,
                          pattern:
                            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        }}
                        render={({ field }) => (
                          <TextField
                            label="Email"
                            placeholder="e.g. jane.smith@gmail.com"
                            error={errors.email}
                            helperText={
                              errors &&
                              errors.email &&
                              errors.email.type === "required"
                                ? "This field is required"
                                : errors &&
                                  errors.email &&
                                  errors.email.type === "pattern" &&
                                  "Please enter a valid email"
                            }
                            {...field}
                          />
                        )}
                      />
                    </Stack>
                    <Grid container spacing={3} justifyContent="center">
                      <Grid item xs={12}>
                        <Button full disabled={isSubmitting} type="submit">
                          <Typography variant="bodyRegular" light>
                            Submit reset request
                          </Typography>
                        </Button>
                      </Grid>
                      <Grid item>
                        <Link href="/login">
                          <Typography variant="bodyRegular" lightened hoverable>
                            Nevermind, let me log in
                          </Typography>
                        </Link>
                      </Grid>
                    </Grid>
                  </Stack>
                </form>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </PageContent>
    </>
  );
};

export default ForgotPassword;
