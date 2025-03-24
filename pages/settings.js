import Head from "next/head";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import {
  FormControlLabel,
  RadioGroup,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import useAuth from "@lib/utils/useAuth";
import { useUserContext } from "@lib/useUserContext";
import {
  Alert,
  PageContainer,
  Button,
  Grid,
  Typography,
  Stack,
  Card,
  Modal,
  TextField,
  Radio,
  Icon,
  Box,
} from "@ui";
import TranslationToggle from "@components/TranslationToggle";
import peopleApi from "@api/people";
import { mutate } from "swr";
import { useRouter } from "next/router";

const SettingsPage = () => {
  const [pauseSSJModalOpen, setPauseSSJModalOpen] = useState(false);
  const [SSJPaused, setSSJPaused] = useState(false);
  const { currentUser } = useUserContext();
  const [abandonSSJModalOpen, setAbandonSSJModalOpen] = useState(false);
  const [SSJAbandonProcessStarted, setSSJAbandonProcessStarted] =
    useState(false);
  const [changeEmailModalOpen, setChangeEmailModalOpen] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm();

  useEffect(() => {
    if (currentUser?.attributes?.email) {
      reset({
        email: currentUser.attributes.email,
      });
    }
  }, [currentUser, reset]);

  useAuth("/login");

  const onSubmit = (data) => {
    peopleApi
      .update(currentUser.id, {
        person: {
          email: data.email,
        },
      })
      .then((response) => {
        if (response.error) {
          console.error(response.error);
        } else {
          mutate(`/v1/people/${currentUser?.id}`);
          reset({
            email: data.email,
          });
        }
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          clearLoggedInState({});
          router.push("/login");
        } else {
          console.error(error);
        }
      });
  };

  return (
    <>
      <Head>
        <title>Wildflower Schools | Settings</title>
        <meta name="title" content="Wildflower Schools" />
        <meta
          property="og:site_name"
          content="Wildflower Schools"
          key="og_wf_site_name"
        />
        <meta name="description" content="Wildflower Schools" />
        <meta name="keywords" content="Wildflower, Schools, Montessori" />
        <meta
          property="og:title"
          content="Wildflower Schools"
          key="og_wf_site_title"
        />
        <meta
          property="og:description"
          content="Wildflower Schools"
          key="og_wf_site_description"
        />
      </Head>

      <PageContainer title="Settings">
        <Stack spacing={6}>
          {/* <Stack spacing={3}>
            <Typography variant="bodyLarge">School Startup Journey</Typography>
            <Card noPadding>
              <List disablePadding>
                <SettingListItem
                  show={!SSJAbandonProcessStarted}
                  title={
                    SSJPaused
                      ? "Your SSJ is Paused"
                      : "Pause your School Startup Journey"
                  }
                  subtitle={
                    SSJPaused
                      ? "Ready to resume your journey to opening a Montessori school? Start back up!"
                      : "Pause your journey to opening a Montessori school and come back to it at another time."
                  }
                  action={
                    SSJPaused ? (
                      <Button
                        variant="secondary"
                        onClick={() => setSSJPaused(false)}
                      >
                        <Stack direction="row" spacing={3} alignItems="center">
                          <Icon type="play" />
                          <Typography variant="bodyRegular" bold highlight>
                            Un-pause your SSJ
                          </Typography>
                        </Stack>
                      </Button>
                    ) : (
                      <Button
                        variant="secondary"
                        onClick={() => setPauseSSJModalOpen(true)}
                      >
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Icon type="pause" />
                          <Typography variant="bodyRegular" bold highlight>
                            Pause your SSJ
                          </Typography>
                        </Stack>
                      </Button>
                    )
                  }
                  isLastItem={SSJAbandonProcessStarted}
                />
                <SettingListItem
                  title={
                    SSJAbandonProcessStarted
                      ? "You've started the process of leaving the SSJ"
                      : "Abandon your School Startup Journey"
                  }
                  subtitle={
                    SSJAbandonProcessStarted
                      ? "You've requested to stop your journey to opening a Montessori school. Please wait for an email from support confirming the end of your SSJ."
                      : "Completely stop your journey to opening a Montessori school and leave the Wildflower Schools network. We're sorry to see you go!"
                  }
                  action={
                    SSJAbandonProcessStarted ? (
                      <Alert size="small" severity="error">
                        Please wait for an email from support to complete the
                        process
                      </Alert>
                    ) : (
                      <Button
                        variant="danger"
                        onClick={() => setAbandonSSJModalOpen(true)}
                      >
                        <Typography variant="bodyRegular" bold>
                          Abandon your SSJ
                        </Typography>
                      </Button>
                    )
                  }
                  isLastItem={true}
                />
              </List>
            </Card>
          </Stack> */}

          <Stack spacing={3}>
            <Typography variant="bodyLarge">Preferences</Typography>
            <Card noPadding>
              <List disablePadding>
                <SettingListItem
                  title="Preferred Language"
                  subtitle="When available we will use this language. Please note language support is limited to the School Startup Journey at this time."
                  action={<TranslationToggle />}
                  isLastItem={true}
                />
              </List>
            </Card>
          </Stack>
          <Stack spacing={3}>
            <Typography variant="bodyLarge">Account</Typography>
            <Card noPadding>
              <List disablePadding>
                {/* <SettingListItem
                  title="Email"
                  subtitle={currentUser?.attributes?.email}
                  action={
                    <Button
                      variant="secondary"
                      small
                      onClick={() => setChangeEmailModalOpen(true)}
                    >
                      Edit
                    </Button>
                  }
                  isLastItem={true}
                /> */}
                <SettingListItem
                  title="Reset Password"
                  subtitle="Reset your password"
                  action={
                    <Button
                      variant="secondary"
                      small
                      onClick={() => router.push("/reset-password")}
                    >
                      Reset your password
                    </Button>
                  }
                  isLastItem={true}
                />
              </List>
            </Card>
          </Stack>
        </Stack>

        <PauseSSJModal
          toggle={() => setPauseSSJModalOpen(!pauseSSJModalOpen)}
          open={pauseSSJModalOpen}
          setSSJPaused={setSSJPaused}
        />
        <AbandonSSJModal
          toggle={() => setAbandonSSJModalOpen(!abandonSSJModalOpen)}
          open={abandonSSJModalOpen}
          setSSJAbandonProcessStarted={setSSJAbandonProcessStarted}
        />
        <ChangeEmailModal
          toggle={() => setChangeEmailModalOpen(!changeEmailModalOpen)}
          open={changeEmailModalOpen}
          currentUser={currentUser}
        />
      </PageContainer>
    </>
  );
};

export default SettingsPage;

const PauseSSJModal = ({ toggle, open, setSSJPaused }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({
    defaultValues: {
      pauseLength: "",
    },
  });
  const onSubmit = (data) => {
    // console.log(data);
    setSSJPaused(true);
    toggle();
  };

  const pauseLengthOptions = [
    { value: "2 weeks", label: "In 2 weeks" },
    { value: "1 month", label: "In 1 month" },
    { value: "2 months", label: "In 2 months" },
    { value: "3 months", label: "In 3 months" },
    { value: "1 year", label: "In 1 year" },
  ];

  return (
    <Modal
      title="Pause your School Startup Journey"
      toggle={toggle}
      open={open}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={6}>
          <Card variant="primaryLightened">
            <Stack alignItems="center" justifyContent="center" spacing={3}>
              <Typography variant="h4" highlight bold>
                Let us know when you'd like us to reach out again!
              </Typography>
              <Typography variant="bodyRegular" highlight center>
                We understand, life happens! You can save your progress and pick
                things back up when it works for you. Let us know when we should
                check in with you about continuing your journey.
              </Typography>
            </Stack>
          </Card>
          <Controller
            name="pauseLength"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <RadioGroup value={value}>
                {pauseLengthOptions.map((o, i) => (
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
          {errors.pauseLength && (
            <Typography variant="bodyRegular" error>
              This field is required
            </Typography>
          )}
          <Grid container justifyContent="space-between">
            <Grid item>
              <Button variant="light" onClick={toggle}>
                <Typography>Cancel</Typography>
              </Button>
            </Grid>
            <Grid item>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                <Typography>Pause</Typography>
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </form>
    </Modal>
  );
};

const AbandonSSJModal = ({ toggle, open, setSSJAbandonProcessStarted }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({
    defaultValues: {
      abandonReason: "",
    },
  });
  const onSubmit = (data) => {
    // console.log(data);
    setSSJAbandonProcessStarted(true);
    toggle();
  };

  return (
    <Modal
      title="Abandon your School Startup Journey"
      toggle={toggle}
      open={open}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={6}>
          <Card variant="primaryLightened">
            <Stack alignItems="center" justifyContent="center" spacing={3}>
              <Typography variant="h4" highlight bold>
                We're sorry to see you go
              </Typography>
              <Typography variant="bodyRegular" highlight center>
                Abandoning your SSJ will remove you from the Wildflower
                community alltogether, and will prevent you from accessing the
                directory, or any of the knowledge contained within this tool.
              </Typography>
            </Stack>
          </Card>
          <Controller
            name="abandonReason"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                rows={4}
                label="Why are you leaving your SSJ?"
                placeholder="Type something..."
                error={errors.abandonReason}
                helperText={
                  errors &&
                  errors.abandonReason &&
                  errors.abandonReason &&
                  "This field is required"
                }
                {...field}
              />
            )}
          />
          {errors.pauseLength && (
            <Typography variant="bodyRegular" error>
              This field is required
            </Typography>
          )}
          <Grid container justifyContent="space-between">
            <Grid item>
              <Button variant="light" onClick={toggle}>
                <Typography>Cancel</Typography>
              </Button>
            </Grid>
            <Grid item>
              <Button variant="danger" type="submit" disabled={isSubmitting}>
                <Typography>Email support</Typography>
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </form>
    </Modal>
  );
};

const StyledListItem = styled(ListItem)(({ theme, isLastItem }) => ({
  padding: theme.spacing(3, 5),
  borderBottom: !isLastItem
    ? `1px solid ${theme.color.neutral.lightened}`
    : "none",
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  maxWidth: "60%",
  marginRight: theme.spacing(3),
}));

const SettingListItem = ({
  title,
  subtitle,
  action,
  show = true,
  isLastItem = false,
}) => {
  if (!show) return null;

  return (
    <StyledListItem isLastItem={isLastItem}>
      <StyledListItemText
        primary={
          <Typography variant="bodyRegular" bold>
            {title}
          </Typography>
        }
        secondary={
          subtitle && (
            <Typography variant="bodyRegular" lightened>
              {subtitle}
            </Typography>
          )
        }
      />
      <ListItemSecondaryAction>{action}</ListItemSecondaryAction>
    </StyledListItem>
  );
};

const ChangeEmailModal = ({ toggle, open, currentUser }) => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm();

  useEffect(() => {
    if (currentUser?.attributes?.email) {
      reset({
        email: currentUser.attributes.email,
      });
    }
  }, [currentUser, reset]);

  const onSubmit = (data) => {
    peopleApi
      .update(currentUser.id, {
        person: {
          email: data.email,
        },
      })
      .then((response) => {
        if (response.error) {
          console.error(error);
        } else {
          mutate(`/v1/people/${currentUser?.id}`);
          toggle();
        }
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          clearLoggedInState({});
          router.push("/login");
        } else {
          console.error(error);
        }
      });
  };

  return (
    <Modal toggle={toggle} open={open} title="Change Email">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={6}>
          <Card variant="primaryLightened">
            <Stack alignItems="center" justifyContent="center" spacing={3}>
              <Typography variant="h4" highlight bold>
                Update your email address
              </Typography>
              <Typography variant="bodyRegular" highlight center>
                This email address is used to log in to the platform and for
                other Wildflower members to contact you.
              </Typography>
            </Stack>
          </Card>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                label="Email"
                placeholder="e.g. jane.smith@gmail.com"
                error={errors.email}
                helperText={
                  errors &&
                  errors.email &&
                  errors.email.type === "required" &&
                  "This field is required"
                }
                {...field}
              />
            )}
          />
          <Grid container justifyContent="space-between">
            <Grid item>
              <Button variant="text" onClick={toggle}>
                <Typography variant="bodyRegular" lightened>
                  Cancel
                </Typography>
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="primary"
                type="submit"
                disabled={!isDirty || isSubmitting}
              >
                <Typography variant="bodyRegular" bold>
                  Save
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </form>
    </Modal>
  );
};

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Add any additional props you need to pass to the page component
    },
  };
}
