import { useEffect, useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useForm, Controller } from "react-hook-form";
import { FormControlLabel, RadioGroup, FormHelperText } from "@mui/material";
import { styled, css } from "@mui/material/styles";
import teamsApi from "@api/ssj/teams";
import peopleApi from "@api/people";
import useSWR, { useSWRConfig } from "swr";
import { useRouter } from "next/router";
import Skeleton from "@mui/material/Skeleton";

import { clearLoggedInState } from "@lib/handleLogout";
import { useUserContext } from "@lib/useUserContext";
import useAuth from "@lib/utils/useAuth";
import useAllTeams from "@hooks/useAllTeams";
import {
  Box,
  PageContainer,
  Button,
  Grid,
  Typography,
  Stack,
  Card,
  Avatar,
  Modal,
  TextField,
  Radio,
  Spinner,
} from "@ui";

const AdminSSJ = ({}) => {
  const [addSchoolModalOpen, setAddSchoolModalOpen] = useState(false);
  const { currentUser } = useUserContext();
  const router = useRouter();

  const { teams, isLoading } = useAllTeams();
  // console.log({ teams });

  useAuth(!currentUser?.attributes?.isAdmin && "/network");

  // const { data, error, isLoading, isValidating, mutate } = useSWR(
  //   "api/teams",
  //   () => teamsApi.index().then((res) => res.data),
  //   {
  //     onErrorRetry: (error) => {
  //       if (error?.response?.status === 401) {
  //         clearLoggedInState({});
  //         router.push("/login");
  //       } else {
  //         console.error(error);
  //       }
  //     },
  //   }
  // );
  let ssjTeams = teams || [];

  return (
    <>
      <PageContainer isAdmin>
        <Stack spacing={6}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography variant="bodyLarge" bold>
                Schools
              </Typography>
            </Grid>
            <Grid item>
              <Button small onClick={() => setAddSchoolModalOpen(true)}>
                <Typography variant="bodyRegular" light bold>
                  Add
                </Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Card noPadding noRadius noBorder>
                <Stack spacing={1}>
                  {isLoading ? (
                    <Stack spacing={2}>
                      {Array.from({ length: 24 }, (_, j) => (
                        <Skeleton key={j} height={48} m={0} variant="rounded" />
                      ))}
                    </Stack>
                  ) : (
                    ssjTeams?.map((s, i) => (
                      <Card size="small" key={i}>
                        <Stack direction="row" alignItems="center" spacing={3}>
                          <Avatar size="sm" />
                          <Typography>{s?.attributes?.tempName}</Typography>
                        </Stack>
                      </Card>
                    ))
                  )}
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Stack>
      </PageContainer>
      <AddSchoolModal
        open={addSchoolModalOpen}
        toggle={() => setAddSchoolModalOpen(!addSchoolModalOpen)}
      />
    </>
  );
};

export default AdminSSJ;

const StyledPersonOption = styled(Card)`
  border-bottom: 1px solid ${({ theme }) => theme.color.neutral.main};
  &:last-child {
    border-bottom: 0;
  }
  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.color.neutral.lightened};
  }
`;

const AddSchoolModal = ({ open, toggle }) => {
  const [team, setTeam] = useState({});
  const [tempDisplayData, setTempDisplayData] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const { mutate } = useSWRConfig();

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handlePrev = () => {
    setActiveStep(activeStep - 1);
  };

  const handleInviteComplete = () => {
    setTeam({});
    setTempDisplayData({});
    setActiveStep(0);
    toggle();
    mutate("api/ssj/teams");
  };

  return (
    <>
      {activeStep === 0 ? (
        <AddEmergingTeacherLeaders
          handleNext={handleNext}
          setTeam={setTeam}
          team={team}
          activeStep={activeStep}
          open={open}
          toggle={toggle}
        />
      ) : activeStep === 1 ? (
        <AddOperationsGuide
          handlePrev={handlePrev}
          handleNext={handleNext}
          setTeam={setTeam}
          team={team}
          setTempDisplayData={setTempDisplayData}
          tempDisplayData={tempDisplayData}
          activeStep={activeStep}
          open={open}
          toggle={toggle}
        />
      ) : activeStep === 2 ? (
        <AddRegionalGrowthLead
          handlePrev={handlePrev}
          handleNext={handleNext}
          setTeam={setTeam}
          team={team}
          setTempDisplayData={setTempDisplayData}
          tempDisplayData={tempDisplayData}
          activeStep={activeStep}
          open={open}
          toggle={toggle}
        />
      ) : (
        activeStep === 3 && (
          <InviteSchool
            handlePrev={handlePrev}
            handleInviteComplete={handleInviteComplete}
            team={team}
            setTempDisplayData={setTempDisplayData}
            tempDisplayData={tempDisplayData}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            open={open}
            toggle={toggle}
          />
        )
      )}
    </>
  );
};

const FormStepper = ({ activeStep }) => {
  return (
    <Stepper activeStep={activeStep}>
      <Step>
        <StepLabel>Add ETLs</StepLabel>
      </Step>
      <Step>
        <StepLabel>Add OG</StepLabel>
      </Step>
      <Step>
        <StepLabel>Add RGL</StepLabel>
      </Step>
      <Step>
        <StepLabel>Invite</StepLabel>
      </Step>
    </Stepper>
  );
};

const AddMultiplePeopleForm = ({ multiplePeople, setMultiplePeople }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setMultiplePeople((multiplePeople) => {
      return [...multiplePeople, data];
    });
    reset({ first_name: "", last_name: "", email: "" });
  };
  const handleRemovePerson = (email) => {
    const removedPeople = multiplePeople.filter((p) => p.email !== email);
    setMultiplePeople(removedPeople);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card
              variant="lightened"
              size={multiplePeople.length ? "small" : "large"}
            >
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                spacing={2}
              >
                {multiplePeople.length ? (
                  multiplePeople?.map((etl, i) => (
                    <Grid item xs={12} key={i}>
                      <Card full noBorder size="small">
                        <Grid
                          container
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Grid item>
                            <Stack
                              direction="row"
                              spacing={3}
                              alignItems="center"
                            >
                              <Avatar size="sm" />
                              <Stack>
                                <Typography variant="bodyRegular" bold>
                                  {etl.first_name} {etl.last_name}
                                </Typography>
                                <Typography variant="bodyRegular" lightened>
                                  Emerging Teacher Leader
                                </Typography>
                              </Stack>
                            </Stack>
                          </Grid>
                          <Grid item>
                            <Button
                              variant="danger"
                              small
                              onClick={() => handleRemovePerson(etl.email)}
                            >
                              <Typography variant="bodyRegular" bold>
                                Remove
                              </Typography>
                            </Button>
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>
                  ))
                ) : (
                  <Grid item>
                    <Typography lightened>No ETLs</Typography>
                  </Grid>
                )}
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <Stack spacing={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="first_name"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "This field is required",
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          label="First name"
                          placeholder="e.g. Jane"
                          error={errors.firstName}
                          helperText={
                            errors &&
                            errors.firstName &&
                            errors.firstName.message
                          }
                          {...field}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="last_name"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "This field is required",
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          label="Last name"
                          placeholder="e.g. Smith"
                          error={errors.lastName}
                          helperText={
                            errors && errors.lastName && errors.lastName.message
                          }
                          {...field}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      label="Email"
                      placeholder="e.g. jane.smith@gmail.com"
                      error={errors.email}
                      helperText={
                        errors && errors.email && errors.email.message
                      }
                      {...field}
                    />
                  )}
                />
                <Button variant="lightened" type="submit">
                  <Typography variant="bodyRegular" bold highlight>
                    Add ETL
                  </Typography>
                </Button>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

const AddEmergingTeacherLeaders = ({
  handleNext,
  team,
  setTeam,
  activeStep,
  open,
  toggle,
}) => {
  const [multiplePeople, setMultiplePeople] = useState(
    team.etl_people_params ? team.etl_people_params : []
  );
  const { handleSubmit } = useForm();
  const onSubmit = (data) => {
    setTeam({
      ...team,
      etl_people_params: multiplePeople,
    });
    handleNext();
  };

  return (
    <Modal
      open={open}
      toggle={toggle}
      title="Add a school"
      fixedActions={
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            justifyContent={activeStep === 0 ? "flex-end" : "space-between"}
          >
            {activeStep === 0 ? null : (
              <Grid item>
                <Button type="submit" variant="text">
                  <Typography variant="bodyRegular" bold light>
                    Prev
                  </Typography>
                </Button>
              </Grid>
            )}
            <Grid item>
              <Button type="submit" disabled={!multiplePeople.length}>
                <Typography variant="bodyRegular" bold light>
                  Next
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </form>
      }
    >
      <FormStepper activeStep={activeStep} />
      <AddMultiplePeopleForm
        team={team}
        setMultiplePeople={setMultiplePeople}
        multiplePeople={multiplePeople}
      />
    </Modal>
  );
};
const AddOperationsGuide = ({
  handlePrev,
  handleNext,
  team,
  setTeam,
  setTempDisplayData,
  tempDisplayData,
  activeStep,
  open,
  toggle,
}) => {
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      operationsGuide: team.ops_guide_id ? team.ops_guide_id : null,
    },
  });
  const onSubmit = (data) => {
    setTeam({
      ...team,
      ops_guide_id: data.operationsGuide,
    });
    const selectedOpsGuide = opsGuides.filter(
      (o) => o.id === data.operationsGuide
    );
    setTempDisplayData({
      ...tempDisplayData,
      opsGuide: {
        firstName: selectedOpsGuide[0].attributes.firstName,
        lastName: selectedOpsGuide[0].attributes.lastName,
        roleList: selectedOpsGuide[0].attributes.roleList,
        imageUrl: selectedOpsGuide[0].attributes.imageUrl,
      },
    });
    handleNext();
  };
  useEffect(() => {
    mutate("api/school");
  }, [activeStep]);

  const {
    data: opsGuideData,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR(
    "api/school?ops_guides",
    () => peopleApi.index({ ops_guide: true }).then((res) => res.data),
    {
      onErrorRetry: (error) => {
        if (error?.response?.status === 401) {
          clearLoggedInState({});
          router.push("/login");
        } else {
          console.error(error);
        }
      },
    }
  );
  let opsGuides = opsGuideData || [];

  return (
    <Modal
      open={open}
      toggle={toggle}
      title="Add a school"
      fixedActions={
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Button variant="text" onClick={handlePrev}>
                <Typography variant="bodyRegular" bold light>
                  Prev
                </Typography>
              </Button>
            </Grid>
            <Grid item>
              <Button type="submit" disabled={!isValid}>
                <Typography variant="bodyRegular" bold light>
                  Next
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </form>
      }
    >
      <FormStepper activeStep={activeStep} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card noPadding>
            <Controller
              name="operationsGuide"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <RadioGroup value={value}>
                  {isLoading || isValidating ? (
                    <Card noBorder size="large">
                      <Grid container justifyContent="center">
                        <Grid item>
                          <Spinner />
                        </Grid>
                      </Grid>
                    </Card>
                  ) : (
                    opsGuides?.map((og, i) => (
                      <StyledPersonOption
                        size="small"
                        noBorder
                        noRadius
                        noPadding
                      >
                        <FormControlLabel
                          sx={{ width: "100%", height: "100%", padding: 2 }}
                          key={i}
                          value={og.id}
                          label={
                            <Grid container>
                              <Grid item>
                                <Stack
                                  direction="row"
                                  spacing={3}
                                  alignItems="center"
                                >
                                  <Avatar
                                    src={og?.attributes?.imageUrl}
                                    size="sm"
                                  />
                                  <Stack>
                                    <Typography variant="bodyRegular" bold>
                                      {og?.attributes?.firstName}{" "}
                                      {og?.attributes?.lastName}
                                    </Typography>
                                    <Typography variant="bodyRegular" lightened>
                                      {og?.attributes?.roleList?.map((r, i) => (
                                        <StyledRoleListItem key={i}>
                                          {r}
                                        </StyledRoleListItem>
                                      ))}
                                    </Typography>
                                  </Stack>
                                </Stack>
                              </Grid>
                            </Grid>
                          }
                          control={<Radio />}
                          onChange={onChange}
                        />
                      </StyledPersonOption>
                    ))
                  )}
                </RadioGroup>
              )}
            />
          </Card>
        </Grid>
      </Grid>
    </Modal>
  );
};
const AddRegionalGrowthLead = ({
  handlePrev,
  handleNext,
  team,
  setTeam,
  setTempDisplayData,
  tempDisplayData,
  activeStep,
  open,
  toggle,
}) => {
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      regionalGrowthLead: team.rgl_id ? team.rgl_id : null,
    },
  });
  useEffect(() => {
    mutate("api/school");
  }, [activeStep]);
  const {
    data: rglData,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR(
    "api/school?ops_guides",
    () => peopleApi.index({ rgl: true }).then((res) => res.data),
    {
      onErrorRetry: (error) => {
        if (error?.response?.status === 401) {
          clearLoggedInState({});
          router.push("/login");
        } else {
          console.error(error);
        }
      },
    }
  );
  let rgl = rglData || [];
  const onSubmit = (data) => {
    setTeam({
      ...team,
      rgl_id: data.regionalGrowthLead,
    });
    const selectedRgl = rgl.filter((o) => o.id === data.regionalGrowthLead);
    setTempDisplayData({
      ...tempDisplayData,
      rgl: {
        firstName: selectedRgl[0].attributes.firstName,
        lastName: selectedRgl[0].attributes.lastName,
        roleList: selectedRgl[0].attributes.roleList,
        imageUrl: selectedRgl[0].attributes.imageUrl,
      },
    });
    handleNext();
  };
  return (
    <Modal
      open={open}
      toggle={toggle}
      title="Add a school"
      fixedActions={
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Button variant="text" onClick={handlePrev}>
                <Typography variant="bodyRegular" bold light>
                  Prev
                </Typography>
              </Button>
            </Grid>
            <Grid item>
              <Button type="submit" disabled={!isValid}>
                <Typography variant="bodyRegular" bold light>
                  Next
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </form>
      }
    >
      <FormStepper activeStep={activeStep} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card noPadding>
            <Controller
              name="regionalGrowthLead"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <RadioGroup value={value}>
                  {isLoading || isValidating ? (
                    <Card noBorder size="large">
                      <Grid container justifyContent="center">
                        <Grid item>
                          <Spinner />
                        </Grid>
                      </Grid>
                    </Card>
                  ) : (
                    rgl?.map((rgl, i) => (
                      <StyledPersonOption
                        size="small"
                        noBorder
                        noRadius
                        noPadding
                      >
                        <FormControlLabel
                          sx={{ width: "100%", height: "100%", padding: 2 }}
                          key={i}
                          value={rgl.id}
                          label={
                            <Grid container>
                              <Grid item>
                                <Stack
                                  direction="row"
                                  spacing={3}
                                  alignItems="center"
                                >
                                  <Avatar
                                    src={rgl?.attributes?.imageUrl}
                                    size="sm"
                                  />
                                  <Stack>
                                    <Typography variant="bodyRegular" bold>
                                      {rgl?.attributes?.firstName}{" "}
                                      {rgl?.attributes?.lastName}
                                    </Typography>
                                    <Typography variant="bodyRegular" lightened>
                                      {rgl?.attributes?.roleList?.map(
                                        (r, i) => (
                                          <StyledRoleListItem key={i}>
                                            {r}
                                          </StyledRoleListItem>
                                        )
                                      )}
                                    </Typography>
                                  </Stack>
                                </Stack>
                              </Grid>
                            </Grid>
                          }
                          control={<Radio />}
                          onChange={onChange}
                        />
                      </StyledPersonOption>
                    ))
                  )}
                </RadioGroup>
              )}
            />
          </Card>
        </Grid>
      </Grid>
    </Modal>
  );
};
const InviteSchool = ({
  handlePrev,
  team,
  tempDisplayData,
  handleInviteComplete,
  activeStep,
  setActiveStep,
  open,
  toggle,
}) => {
  const [duplicateEmailError, setDuplicateEmailError] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async () => {
    // console.log({ team });
    try {
      await teamsApi.inviteTeam({ team: team });
    } catch (error) {
      if (error?.response?.status === 422) {
        setDuplicateEmailError(error.response.data.message);
      }
      // console.log({ error });
      console.error(error);
    }
    handleInviteComplete();
  };
  // console.log({ team });
  // console.log({ duplicateEmailError });
  // console.log({ tempDisplayData });
  return (
    <Modal
      open={open}
      toggle={toggle}
      title="Add a school"
      fixedActions={
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Button variant="text" onClick={handlePrev}>
                <Typography variant="bodyRegular" bold light>
                  Prev
                </Typography>
              </Button>
            </Grid>
            <Grid item>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Spinner size={20} />
                ) : (
                  <Typography variant="bodyRegular" bold light>
                    Invite
                  </Typography>
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      }
    >
      <FormStepper activeStep={activeStep} />
      <Card>
        <Stack spacing={6}>
          <Stack spacing={3}>
            <Typography variant="bodyRegular" bold>
              Emerging Teacher Leader
            </Typography>
            {team.etl_people_params?.map((etl, i) => (
              <Card
                variant={duplicateEmailError ? "error" : "lightened"}
                size="small"
                key={i}
                error
              >
                <Stack direction="row" spacing={3} alignItems="center">
                  <Avatar size="sm" />
                  <Stack>
                    <Typography variant="bodyRegular" bold>
                      {etl.first_name} {etl.last_name}
                    </Typography>
                    <Typography variant="bodyRegular" lightened>
                      Emerging Teacher Leader
                    </Typography>
                  </Stack>
                </Stack>
              </Card>
            ))}
            {duplicateEmailError ? (
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="bodyRegular" error>
                  {duplicateEmailError}
                </Typography>
                <Button variant="text" small onClick={() => setActiveStep(0)}>
                  <Typography variant="bodySmall" bold highlight>
                    Edit ETLs
                  </Typography>
                </Button>
              </Stack>
            ) : null}
          </Stack>
          <Stack spacing={3}>
            <Typography variant="bodyRegular" bold>
              Operations Guide
            </Typography>
            <Card size="small" variant="lightened">
              <Grid container>
                <Grid item>
                  <Stack direction="row" spacing={3} alignItems="center">
                    <Avatar src={tempDisplayData.opsGuide.imageUrl} size="sm" />
                    <Stack>
                      <Typography variant="bodyRegular" bold>
                        {tempDisplayData.opsGuide.firstName}{" "}
                        {tempDisplayData.opsGuide.lastName}
                      </Typography>

                      <Typography variant="bodyRegular" lightened>
                        {tempDisplayData.opsGuide.roleList?.map((r, i) => (
                          <StyledRoleListItem key={i}>{r}</StyledRoleListItem>
                        ))}
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Card>
          </Stack>
          <Stack spacing={3}>
            <Typography variant="bodyRegular" bold>
              Regional Growth Lead
            </Typography>
            <Card size="small" variant="lightened">
              <Grid container>
                <Grid item>
                  <Stack direction="row" spacing={3} alignItems="center">
                    <Avatar src={tempDisplayData.rgl.imageUrl} size="sm" />
                    <Stack>
                      <Typography variant="bodyRegular" bold>
                        {tempDisplayData.rgl.firstName}{" "}
                        {tempDisplayData.rgl.lastName}
                      </Typography>
                      <Typography variant="bodyRegular" lightened>
                        {tempDisplayData.rgl.roleList?.map((r, i) => (
                          <StyledRoleListItem key={i}>{r}</StyledRoleListItem>
                        ))}
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Card>
          </Stack>
        </Stack>
      </Card>
    </Modal>
  );
};

const StyledRoleListItem = styled(Box)`
  display: inline;
  &:after {
    content: ", ";
  }
  &:last-child {
    &:after {
      content: none;
    }
  }
`;
