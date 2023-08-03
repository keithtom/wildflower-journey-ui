import Head from "next/head";
import { useEffect, useState } from "react";
import { styled, css } from "@mui/material/styles";
import Link from "next/link";
import Router from "next/router";
import { useForm, Controller } from "react-hook-form";
import { FormControlLabel, RadioGroup } from "@mui/material";

import { useUserContext } from "@lib/useUserContext";
import {
  Alert,
  Box,
  PageContainer,
  Button,
  Grid,
  Typography,
  Stack,
  Card,
  Divider,
  Avatar,
  AvatarGroup,
  IconButton,
  Icon,
  Modal,
  DatePicker,
  TextField,
  Radio,
} from "@ui";

const SettingsPage = () => {
  const [pauseSSJModalOpen, setPauseSSJModalOpen] = useState(false);
  const [SSJPaused, setSSJPaused] = useState(false);
  const { currentUser } = useUserContext();

  const [abandonSSJModalOpen, setAbandonSSJModalOpen] = useState(false);
  const [SSJAbandonProcessStarted, setSSJAbandonProcessStarted] =
    useState(false);

  return (
    <>
      <Head>
        <title>Wildflower Schools | Search</title>
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

      <PageContainer>
        <Stack spacing={12}>
          <Typography variant="h3" bold>
            Settings
          </Typography>
          <Grid container>
            <Grid item xs={12}>
              <Stack spacing={6}>
                <Typography variant="bodyLarge">
                  School Startup Journey
                </Typography>
                <Card noPadding>
                  {SSJAbandonProcessStarted ? null : (
                    <>
                      <Card noBorder>
                        <Grid
                          container
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Grid item>
                            <Typography
                              variant="bodyLarge"
                              bold
                              highlight={SSJPaused}
                            >
                              {SSJPaused
                                ? "Your SSJ is Paused"
                                : "Pause your School Startup Journey"}
                            </Typography>
                            <Typography variant="bodyRegular" lightened>
                              {SSJPaused
                                ? "Ready to resume your journey to opening a Montessori school? Start back up!"
                                : "Pause your journey to opening a Montessori school and come back to it at another time."}
                            </Typography>
                          </Grid>
                          <Grid item>
                            {SSJPaused ? (
                              <Button
                                variant="secondary"
                                onClick={() => setSSJPaused(false)}
                              >
                                <Stack
                                  direction="row"
                                  spacing={3}
                                  alignItems="center"
                                >
                                  <Icon type="play" />
                                  <Typography
                                    variant="bodyRegular"
                                    bold
                                    highlight
                                  >
                                    Un-pause your SSJ
                                  </Typography>
                                </Stack>
                              </Button>
                            ) : (
                              <Button
                                variant="secondary"
                                onClick={() => setPauseSSJModalOpen(true)}
                              >
                                <Stack
                                  direction="row"
                                  spacing={2}
                                  alignItems="center"
                                >
                                  <Icon type="pause" />
                                  <Typography
                                    variant="bodyRegular"
                                    bold
                                    highlight
                                  >
                                    Pause your SSJ
                                  </Typography>
                                </Stack>
                              </Button>
                            )}
                          </Grid>
                        </Grid>
                      </Card>
                      <Divider />
                    </>
                  )}
                  <Card noBorder>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <Typography
                          variant="bodyLarge"
                          bold
                          error={SSJAbandonProcessStarted}
                        >
                          {SSJAbandonProcessStarted
                            ? "You've started the process of leaving the SSJ"
                            : "Abandon your School Startup Journey"}
                        </Typography>
                        <Typography variant="bodyRegular" lightened>
                          {SSJAbandonProcessStarted
                            ? "You've requested to stop your journey to opening a Montessori school. Please wait for an email from support confirming the end of your SSJ."
                            : "Completely stop your journey to opening a Montessori school and leave the Wildflower Schools network. We're sorry to see you go!"}
                        </Typography>
                      </Grid>
                      <Grid item>
                        {SSJAbandonProcessStarted ? (
                          <Alert size="small" severity="error">
                            Please wait for an email from support to complete
                            the process
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
                        )}
                      </Grid>
                    </Grid>
                  </Card>
                </Card>
              </Stack>
            </Grid>
          </Grid>
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
    console.log(data);
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
    console.log(data);
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
