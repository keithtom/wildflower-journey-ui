import { useEffect, useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useForm, Controller } from "react-hook-form";
import { FormControlLabel, RadioGroup, FormHelperText } from "@mui/material";
import { styled, css } from "@mui/material/styles";
import adminApi from "@api/admin";
import peopleApi from "@api/people";
import useSWR from "swr";

import {
  Box,
  PageContainer,
  Button,
  Grid,
  Typography,
  Stack,
  Card,
  Avatar,
  AvatarGroup,
  IconButton,
  Icon,
  Modal,
  DatePicker,
  TextField,
  Link,
  Radio,
} from "@ui";

const AdminSSJ = ({}) => {
  // Check if maggie or katelyn?
  // const katelyn = "asdf-1324";
  // const maggie = "asdf-1324";

  const [addSchoolModalOpen, setAddSchoolModalOpen] = useState(false);
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
                  {SchoolsInSSJ.map((s, i) => (
                    <Card size="small" key={i}>
                      <Stack direction="row" alignItems="center" spacing={3}>
                        <Avatar size="sm" />
                        <Typography>{s.name}</Typography>
                      </Stack>
                    </Card>
                  ))}
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

const SchoolsInSSJ = [
  {
    logoUrl: "",
    name: "1",
  },
  {
    logoUrl: "",
    name: "2",
  },
  {
    logoUrl: "",
    name: "3",
  },
];

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
  const [newSchoolData, setNewSchoolData] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handlePrev = () => {
    setActiveStep(activeStep - 1);
  };

  const handleInviteComplete = () => {
    setNewSchoolData({});
    setActiveStep(0);
    toggle();
  };

  return (
    <>
      {activeStep === 0 ? (
        <AddEmergingTeacherLeaders
          handleNext={handleNext}
          setNewSchoolData={setNewSchoolData}
          newSchoolData={newSchoolData}
          activeStep={activeStep}
          open={open}
          toggle={toggle}
        />
      ) : activeStep === 1 ? (
        <AddOperationsGuide
          handlePrev={handlePrev}
          handleNext={handleNext}
          setNewSchoolData={setNewSchoolData}
          newSchoolData={newSchoolData}
          activeStep={activeStep}
          open={open}
          toggle={toggle}
        />
      ) : activeStep === 2 ? (
        <AddRegionalGrowthLead
          handlePrev={handlePrev}
          handleNext={handleNext}
          setNewSchoolData={setNewSchoolData}
          newSchoolData={newSchoolData}
          activeStep={activeStep}
          open={open}
          toggle={toggle}
        />
      ) : (
        activeStep === 3 && (
          <InviteSchool
            handlePrev={handlePrev}
            handleInviteComplete={handleInviteComplete}
            newSchoolData={newSchoolData}
            activeStep={activeStep}
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
    reset({ firstName: "", lastName: "", email: "" });
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
                  multiplePeople.map((etl, i) => (
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
                              <Typography variant="bodyRegular" bold>
                                {etl.firstName} {etl.lastName}
                              </Typography>
                              <Typography variant="bodyRegular" lightened>
                                Emerging Teacher Leader
                              </Typography>
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
                      name="firstName"
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
                      name="lastName"
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
  newSchoolData,
  setNewSchoolData,
  activeStep,
  open,
  toggle,
}) => {
  const [multiplePeople, setMultiplePeople] = useState(
    newSchoolData.etl_people_params ? newSchoolData.etl_people_params : []
  );
  const { handleSubmit } = useForm();
  const onSubmit = (data) => {
    setNewSchoolData({
      ...newSchoolData,
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
        newSchoolData={newSchoolData}
        setMultiplePeople={setMultiplePeople}
        multiplePeople={multiplePeople}
      />
    </Modal>
  );
};
const AddOperationsGuide = ({
  handlePrev,
  handleNext,
  newSchoolData,
  setNewSchoolData,
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
      operationsGuide: newSchoolData.ops_guide_email
        ? newSchoolData.ops_guide_email
        : null,
    },
  });
  const onSubmit = (data) => {
    setNewSchoolData({
      ...newSchoolData,
      ops_guide_email: data.operationsGuide,
    });
    handleNext();
  };

  const { data, error, isLoading, isValidating, mutate } = useSWR(
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
  let opsGuides = data || [];
    // TODO: do we need to add a spinner with isLoading?

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
                  {opsGuides.map((og, i) => (
                    <StyledPersonOption
                      size="small"
                      noBorder
                      noRadius
                      noPadding
                    >
                      <FormControlLabel
                        sx={{ width: "100%", height: "100%", padding: 2 }}
                        key={i}
                        value={og?.attributes?.email}
                        label={
                          <Grid container>
                            <Grid item>
                              <Stack
                                direction="row"
                                spacing={3}
                                alignItems="center"
                              >
                                <Avatar src={og?.attributes?.imageUrl} size="sm" />
                                <Typography variant="bodyRegular" bold>
                                  {og?.attributes?.firstName} {og?.attributes?.lastName}
                                </Typography>
                                {og?.attributes?.roleList.map((r, i) => (
                                  <Typography
                                    variant="bodyRegular"
                                    lightened
                                    key={i}
                                  >
                                    {r}
                                  </Typography>
                                ))}
                              </Stack>
                            </Grid>
                          </Grid>
                        }
                        control={<Radio />}
                        onChange={onChange}
                      />
                    </StyledPersonOption>
                  ))}
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
  newSchoolData,
  setNewSchoolData,
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
      regionalGrowthLead: newSchoolData.rgl_email
        ? newSchoolData.rgl_email
        : null,
    },
  });
  const { data, error, isLoading, isValidating, mutate } = useSWR(
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
  let rgl = data || [];
  // TODO: do we need to add a spinner with isLoading?

  const onSubmit = (data) => {
    setNewSchoolData({
      ...newSchoolData,
      rgl_email: data.regionalGrowthLead,
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
                  {rgl.map((rgl, i) => (
                    <StyledPersonOption
                      size="small"
                      noBorder
                      noRadius
                      noPadding
                    >
                      <FormControlLabel
                        sx={{ width: "100%", height: "100%", padding: 2 }}
                        key={i}
                        value={rgl?.attributes?.email}
                        label={
                          <Grid container>
                            <Grid item>
                              <Stack
                                direction="row"
                                spacing={3}
                                alignItems="center"
                              >
                                <Avatar src={rgl?.attributes?.imageUrl} size="sm" />
                                <Typography variant="bodyRegular" bold>
                                  {rgl?.attributes?.firstName} {rgl?.attributes?.lastName}
                                </Typography>
                                {rgl?.attributes?.roleList.map((r, i) => (
                                  <Typography
                                    variant="bodyRegular"
                                    lightened
                                    key={i}
                                  >
                                    {r}
                                  </Typography>
                                ))}
                              </Stack>
                            </Grid>
                          </Grid>
                        }
                        control={<Radio />}
                        onChange={onChange}
                      />
                    </StyledPersonOption>
                  ))}
                </RadioGroup>
              )}
            />
          </Card>
        </Grid>
      </Grid>
    </Modal>
  );
};;
const InviteSchool = ({
  handlePrev,
  newSchoolData,
  handleInviteComplete,
  activeStep,
  open,
  toggle,
}) => {
  const { control, handleSubmit } = useForm();
  const onSubmit = () => {
    // newSchoolData
    //submit to api
    console.log({ newSchoolData });
    adminApi.inviteTeam(newSchoolData);
    handleInviteComplete();
  };
  // console.log({ newSchoolData });
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
              <Button type="submit">
                <Typography variant="bodyRegular" bold light>
                  Invite
                </Typography>
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
            {newSchoolData.etl_people_params.map((etl, i) => (
              <Card variant="lightened" size="small" key={i}>
                <Stack direction="row" spacing={3} alignItems="center">
                  <Avatar size="sm" />
                  <Typography variant="bodyRegular" bold>
                    {etl.firstName} {etl.lastName}
                  </Typography>
                  <Typography variant="bodyRegular" lightened>
                    Emerging Teacher Leader
                  </Typography>
                </Stack>
              </Card>
            ))}
          </Stack>
          <Stack spacing={3}>
            <Typography variant="bodyRegular" bold>
              Operations Guide
            </Typography>
            <Card size="small" variant="lightened">
              <Typography variant="bodyRegular">
                {newSchoolData.ops_guide_email}
              </Typography>
            </Card>
          </Stack>
          <Stack spacing={3}>
            <Typography variant="bodyRegular" bold>
              Regional Growth Lead
            </Typography>
            <Card size="small" variant="lightened">
              <Typography variant="bodyRegular">
                {newSchoolData.rgl_email}
              </Typography>
            </Card>
          </Stack>
        </Stack>
      </Card>
    </Modal>
  );
};
