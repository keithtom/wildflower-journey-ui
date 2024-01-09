import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import FormHelperText from "@mui/material/FormHelperText";
import { useUserContext } from "../lib/useUserContext";
import authApi from "@api/auth";
import { clearLoggedInState } from "@lib/handleLogout";
import RedirectUser from "@lib/redirectUser";

import { getScreenSize } from "../hooks/react-responsive";
import {
  Button,
  Grid,
  Stack,
  Typography,
  Card,
  TextField,
  PageContainer,
  Icon,
  Spinner,
} from "@ui";

const Login = ({}) => {
  const { screenSize } = getScreenSize();
  const [sentEmailLoginRequest, setSentEmailLoginRequest] = useState(false);
  const { setCurrentUser, isLoggedIn, currentUser } = useUserContext();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const hasSSJ = currentUser?.attributes?.ssj ? true : false;
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      setIsLoggingIn(true);
      RedirectUser({
        router: router,
        roleList: currentUser?.personRoleList,
        isOnboarded: currentUser?.personIsOnboarded,
      });
    }
  }, [isLoggedIn, currentUser]);

  // console.log({ currentUser });

  const {
    control,
    handleSubmit,
    trigger,
    getValues,
    setError,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await authApi.login(data.email, data.password).then(function (response) {
        const userAttributes = response.data.data.attributes;
        const personId = response.data.data.relationships.person.data.id;
        const personRoleList = response?.data?.included?.find((a) => {
          return a.id === personId;
        })?.attributes?.roleList;
        const personIsOnboarded = response?.data?.included?.find((a) => {
          return a.id === personId;
        })?.attributes?.isOnboarded;

        setCurrentUser({
          id: personId,
          type: response.data.data.type,
          attributes: userAttributes,
          personRoleList: personRoleList,
          personIsOnboarded: personIsOnboarded,
        });

        RedirectUser({
          router: router,
          roleList: personRoleList,
          isOnboarded: personIsOnboarded,
        });
      });
      // Process successful login response
    } catch (error) {
      // handle error
      console.log(error);
      // console.log(error.response.data); // error message
      if (error.response.status === 401) {
        clearLoggedInState({});
        setError("email", {
          type: "invalid",
          message: error.response.data,
        });
        setError("password", {
          type: "invalid",
          message: error.response.data,
        });
      }
    }
  };

  async function handleRequestEmailLink() {
    const emailValid = await trigger("email");
    if (emailValid) {
      try {
        const email = getValues("email");
        await authApi.loginEmailLink(email);
        setSentEmailLoginRequest(true);
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <PageContainer hideNav>
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

              {sentEmailLoginRequest ? (
                <Stack spacing={3} container>
                  <Card variant="lightened">
                    <Grid container justifyContent="center">
                      <Stack spacing={3} alignItems="center">
                        <Icon type="checkCircle" variant="primary" />
                        <Typography variant="h4" center bold>
                          We emailed you a link
                        </Typography>
                        <Typography variant="bodyRegular">
                          Check your email for a secure link to log in. You
                          should receive it within a few minutes.
                        </Typography>
                      </Stack>
                    </Grid>
                  </Card>
                  <Button
                    onClick={() => setSentEmailLoginRequest(false)}
                    variant="text"
                  >
                    <Typography variant="bodyRegular" center>
                      Login with my email and password.
                    </Typography>
                  </Button>
                </Stack>
              ) : (
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
                        defaultValue=""
                        render={({ field }) => (
                          <TextField
                            disabled={
                              isSubmitting || isSubmitSuccessful || isLoggingIn
                            }
                            autoComplete="username"
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
                        defaultValue=""
                        render={({ field }) => (
                          <TextField
                            disabled={
                              isSubmitting || isSubmitSuccessful || isLoggingIn
                            }
                            autoComplete="current-password"
                            type="password"
                            label="Password"
                            placeholder="e.g. your password"
                            error={errors.password}
                            helperText={
                              errors &&
                              errors.password &&
                              errors.password.type === "required" &&
                              "This field is required"
                            }
                            {...field}
                          />
                        )}
                      />
                      {(errors?.email?.type === "invalid" ||
                        errors?.password?.type === "invalid") && (
                        <FormHelperText error={true}>
                          Email or password is invalid
                        </FormHelperText>
                      )}
                    </Stack>

                    <Stack alignItems="center" spacing={3}>
                      <Button
                        full
                        disabled={
                          isSubmitting || isSubmitSuccessful || isLoggingIn
                        }
                        type="submit"
                      >
                        <Stack spacing={6} direction="row">
                          {isSubmitting || isSubmitSuccessful ? (
                            <Spinner size="20px" />
                          ) : null}
                          <Typography variant="bodyRegular" light>
                            Log in
                          </Typography>
                        </Stack>
                      </Button>
                    </Stack>

                    <Card variant="lightened" size="small">
                      <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={12}>
                          <Grid container spacing={3}>
                            <Grid item>
                              <Icon type="lock" variant="lightened" />
                            </Grid>
                            <Grid item flex={1}>
                              <Stack>
                                <Typography variant="bodyRegular" bold>
                                  Forgot your password?
                                </Typography>
                                <Typography variant="bodyRegular">
                                  Request an email link to login.
                                </Typography>
                              </Stack>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} ml={6}>
                          <Button
                            onClick={handleRequestEmailLink}
                            disabled={
                              isSubmitting || isSubmitSuccessful || isLoggingIn
                            }
                            small
                            variant="lightened"
                          >
                            <Stack
                              direction="row"
                              spacing={3}
                              alignItems="center"
                            >
                              {!screenSize.isSm && (
                                <Typography variant="bodyRegular">
                                  Request link
                                </Typography>
                              )}
                              <Icon type="rightArrow" variant="primary" />
                            </Stack>
                          </Button>
                        </Grid>
                      </Grid>
                    </Card>
                  </Stack>
                </form>
              )}
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Login;
