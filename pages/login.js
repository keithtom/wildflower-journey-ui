import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Router from "next/router";
import FormHelperText from "@mui/material/FormHelperText";
import { setCookie } from "cookies-next";

import { useTranslation, Trans } from "next-i18next";

import { useUserContext } from "../lib/useUserContext";
import authApi from "@api/auth";
import { clearLoggedInState } from "@lib/handleLogout";

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
  const [sentEmailLoginRequest, setSentEmailLoginRequest] = useState(false);
  const { setCurrentUser, isLoggedIn, currentUser } = useUserContext();
  const hasSSJ = currentUser?.attributes?.ssj ? true : false;

  const { t } = useTranslation("login");

  if (isLoggedIn && hasSSJ) {
    Router.push("/ssj");
  } else if (isLoggedIn && !hasSSJ) {
    Router.push("/network");
  }

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
        setCookie("auth", response.headers["authorization"], {
          maxAge: 60 * 60 * 24 * 30,
        });
        const userAttributes = response.data.data.attributes;
        const personId = response.data.data.relationships.person.data.id;
        if (response.data.data.attributes.ssj) {
          setCookie("workflowId", userAttributes.ssj.workflowId, {
            maxAge: 60 * 60 * 24 * 30,
          });
          setCookie("phase", userAttributes.ssj.currentPhase, {
            maxAge: 60 * 60 * 24 * 30,
          });
        }

        setCurrentUser({
          id: personId,
          type: response.data.data.type,
          attributes: userAttributes,
        });
        if (!response.data.data.attributes.ssj) {
          Router.push("/network");
        } else {
          Router.push("/ssj");
        }
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
                    {t("log-in")}
                  </Typography>
                </Grid>
              </Grid>

              {sentEmailLoginRequest ? (
                <Stack spacing={3} container>
                  <Card variant="lightened">
                    <Grid container justifyContent="center">
                      <Stack spacing={3} alignItems="center">
                        <Icon type="checkCircle" variant="primary" />
                        <Typography variant="h3" center bold>
                          {t("check-your-email-for-a-secure-link-to-log-in")}
                        </Typography>
                        <Typography>
                          {t("you-should-receive-it-within-a-few-minutes")}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Card>
                  <Button
                    onClick={() => setSentEmailLoginRequest(false)}
                    variant="text"
                  >
                    <Typography lightened variant="bodyRegular" center>
                      {t("login-with-my-email-and-password")}
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
                            disabled={isSubmitting || isSubmitSuccessful}
                            autoComplete="username"
                            label={t("email")}
                            placeholder="e.g. jane.smith@gmail.com"
                            error={errors.email}
                            helperText={
                              errors &&
                              errors.email &&
                              errors.email.type === "required"
                                ? t("this-field-is-required")
                                : errors &&
                                  errors.email &&
                                  errors.email.type === "pattern" &&
                                  t("please-enter-a-valid-email")
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
                            disabled={isSubmitting || isSubmitSuccessful}
                            autoComplete="current-password"
                            type="password"
                            label={t("password")}
                            placeholder={`e.g. ${t("your-password")}`}
                            error={errors.password}
                            helperText={
                              errors &&
                              errors.password &&
                              errors.password.type === "required" &&
                              t("this-field-is-required")
                            }
                            {...field}
                          />
                        )}
                      />
                      {(errors?.email?.type === "invalid" ||
                        errors?.password?.type === "invalid") && (
                        <FormHelperText error={true}>
                          {t("email-or-password-is-invalid")}
                        </FormHelperText>
                      )}
                    </Stack>

                    <Stack alignItems="center" spacing={3}>
                      <Button
                        full
                        disabled={isSubmitting || isSubmitSuccessful}
                        type="submit"
                      >
                        <Stack spacing={6} direction="row">
                          {isSubmitting || isSubmitSuccessful ? (
                            <Spinner size="20px" />
                          ) : null}
                          <Typography variant="bodyRegular" light>
                            {t("log-in")}
                          </Typography>
                        </Stack>
                      </Button>
                      <Typography variant="bodyMini" bold lightened>
                        {t("or")}
                      </Typography>

                      <Button
                        full
                        disabled={isSubmitting || isSubmitSuccessful}
                        variant="text"
                        onClick={handleRequestEmailLink}
                      >
                        <Typography variant="bodyRegular">
                          {t("request-an-email-link-to-login")}
                        </Typography>
                      </Button>
                    </Stack>
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

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "login"])),
      // Will be passed to the page component as props
    },
  };
}
