import { useEffect, useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useForm, Controller } from "react-hook-form";
import { FormControlLabel, RadioGroup, FormHelperText } from "@mui/material";
import { styled, css } from "@mui/material/styles";

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
  const katelyn = "asdf-1324";
  const maggie = "asdf-1324";

  const [addSchoolModalOpen, setAddSchoolModalOpen] = useState(true);

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
          handleNext={handleNext}
          setNewSchoolData={setNewSchoolData}
          newSchoolData={newSchoolData}
          activeStep={activeStep}
          open={open}
          toggle={toggle}
        />
      ) : activeStep === 2 ? (
        <AddRegionalGrowthLead
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
            newSchoolData={newSchoolData}
            handleInviteComplete={handleInviteComplete}
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
  const [multiplePeople, setMultiplePeople] = useState([]);
  const { handleSubmit } = useForm();
  const onSubmit = (data) => {
    setNewSchoolData({
      ...newSchoolData,
      etl_people_params: multiplePeople,
    });
    handleNext();
  };

  // console.log(multiplePeople);
  return (
    <Modal
      open={open}
      toggle={toggle}
      title="Add a school"
      fixedActions={
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            <Grid item></Grid>
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
        setMultiplePeople={setMultiplePeople}
        multiplePeople={multiplePeople}
      />
    </Modal>
  );
};
const AddOperationsGuide = ({
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
    formState: { isValid, isDirty, errors },
  } = useForm({ mode: "onChange" });
  const onSubmit = (data) => {
    setNewSchoolData({
      ...newSchoolData,
      ops_guide_email: data.operationsGuide,
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
          <Grid container>
            <Grid item></Grid>
            <Grid item>
              <Button type="submit" disabled={!isDirty || !isValid}>
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
                  {OperationsGuides.map((og, i) => (
                    <StyledPersonOption
                      size="small"
                      noBorder
                      noRadius
                      noPadding
                    >
                      <FormControlLabel
                        sx={{ width: "100%", height: "100%", padding: 2 }}
                        key={i}
                        value={og.email}
                        label={
                          <Grid container>
                            <Grid item>
                              <Stack
                                direction="row"
                                spacing={3}
                                alignItems="center"
                              >
                                <Avatar src={og.imageUrl} size="sm" />
                                <Typography variant="bodyRegular" bold>
                                  {og.firstName} {og.lastName}
                                </Typography>
                                {og.roleList.map((r, i) => (
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
    formState: { isValid, isDirty, errors },
  } = useForm({ mode: "onChange" });
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
          <Grid container>
            <Grid item></Grid>
            <Grid item>
              <Button type="submit" disabled={!isDirty || !isValid}>
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
                  {RegionalGrowthLeads.map((rgl, i) => (
                    <StyledPersonOption
                      size="small"
                      noBorder
                      noRadius
                      noPadding
                    >
                      <FormControlLabel
                        sx={{ width: "100%", height: "100%", padding: 2 }}
                        key={i}
                        value={rgl.email}
                        label={
                          <Grid container>
                            <Grid item>
                              <Stack
                                direction="row"
                                spacing={3}
                                alignItems="center"
                              >
                                <Avatar src={rgl.imageUrl} size="sm" />
                                <Typography variant="bodyRegular" bold>
                                  {rgl.firstName} {rgl.lastName}
                                </Typography>
                                {rgl.roleList.map((r, i) => (
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
const InviteSchool = ({
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
    handleInviteComplete();
  };
  return (
    <Modal
      open={open}
      toggle={toggle}
      title="Add a school"
      fixedActions={
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            <Grid item></Grid>
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
      <div>Summary</div>
    </Modal>
  );
};

const OperationsGuides = [
  {
    email: "a@a.com",
    firstName: "A",
    lastName: "A",
    roleList: ["Operations Guide"],
    imageUrl: "/",
  },
  {
    email: "b@b.com",
    value: "B",
    label: "B",
    firstName: "B",
    lastName: "B",
    roleList: ["Operations Guide"],
    imageUrl: "/",
  },
];
const RegionalGrowthLeads = [
  {
    email: "a-rgl@a.com",
    firstName: "A",
    lastName: "A",
    roleList: ["Regional Growth Lead"],
    imageUrl: "/",
  },
  {
    email: "b-rgl@b.com",
    firstName: "B",
    lastName: "B",
    roleList: ["Regional Growth Lead"],
    imageUrl: "/",
  },
];
