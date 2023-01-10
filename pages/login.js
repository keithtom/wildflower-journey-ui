import { styled, css } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

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

let user = false;

const PageContent = styled(Box)`
  flex-grow: 1;
  margin-top: ${({ theme }) => theme.util.appBarHeight}px;
  padding: ${({ theme }) => theme.util.buffer * 6}px;
`;
const Login = ({}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm();
  const onSubmit = (data) => {
    axios.post('http://localhost:3001/login', { // TODO: set base url in some variable that switches out based on env
      user: {
        email: data.email,
        password: data.password,
      },
    }).then(function (response) {
      console.log("logged in");
      console.log(response.headers.authorization);
      axios.defaults.headers.common['Authorization'] = response.headers.authorization 
      user = true;
      // TODO: research if saving the JWT here is secure. can someone easily access this JWT?
      // TODO: update context state to be logged in
    }).catch(function (error) {
      // handle error
      console.log(error);
    })
  }

  const googleLogo = "/assets/images/google-g-logo.svg";

  return (
    <>
      <Header user={user} />
      <PageContent>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card>
              <Stack spacing={6}>
                <Grid container justifyContent="center">
                  <Grid item>
                    <Typography variant="h4" bold>
                      Log in
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
                      <Controller
                        name="password"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <TextField
                            type="password"
                            label="Password"
                            placeholder="e.g. your password"
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
                      <Grid container justifyContent="flex-end">
                        <Grid item>
                          <Link href="/forgot-password">
                            <Typography variant="bodySmall" lightened hoverable>
                              Forgot password?
                            </Typography>
                          </Link>
                        </Grid>
                      </Grid>
                    </Stack>
                    <Grid container spacing={3} justifyContent="center">
                      <Grid item xs={12}>
                        <Button full disabled={isSubmitting} type="submit">
                          <Typography variant="bodyRegular" light>
                            Log in
                          </Typography>
                        </Button>
                      </Grid>
                      <Grid item>
                        <Typography variant="bodyMini" bold lightened>
                          OR
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Button full disabled={isSubmitting} variant="light">
                          <Stack
                            direction="row"
                            spacing={3}
                            alignItems="center"
                          >
                            <img src={googleLogo} />
                            <Typography variant="bodyRegular">
                              Log in with Google
                            </Typography>
                          </Stack>
                        </Button>
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

export default Login;
