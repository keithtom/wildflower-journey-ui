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
  /* padding: 0 ${({ theme }) => theme.util.buffer * 3}px; */
  &:last-child {
    border-bottom: 0;
  }
  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.color.neutral.lightened};
  }
`;

const AddSchoolModal = ({ open, toggle }) => {
  const [activeStep, setActiveStep] = useState(0);
  // NOTE: Check to see if the ETL email exists on the backend and match to that user if so.
  const [emergingTeacherLeaders, setEmergingTeacherLeaders] = useState([]);
  const [operationsGuide, setOperationsGuide] = useState();
  const [regionalGrowthLead, setRegionalGrowthLead] = useState();

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handlePrev = () => {
    setActiveStep(activeStep - 1);
  };

  const {
    control,
    handleSubmit,
    trigger,
    getValues,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const handleAddETL = async () => {
    let isValid = false;
    isValid = await trigger(["firstName", "lastName", "email"]);
    if (isValid) {
      const newETLValues = [getValues()];
      setEmergingTeacherLeaders((emergingTeacherLeaders) => {
        return [...emergingTeacherLeaders, ...newETLValues];
      });
      reset({ firstName: "", lastName: "", email: "" });
    }
  };
  const handleRemoveETL = (etlEmail) => {
    const postRemovedETLs = emergingTeacherLeaders.filter(
      (etl) => etl.email !== etlEmail
    );
    setEmergingTeacherLeaders(postRemovedETLs);
  };

  useEffect(() => {
    const opsValue = getValues("operationsGuide");
    setOperationsGuide(opsValue);
  }, [watch("operationsGuide")]);
  useEffect(() => {
    const rglValue = getValues("regionalGrowthLead");
    setRegionalGrowthLead(rglValue);
  }, [watch("regionalGrowthLead")]);

  const onSubmit = (data) => {
    //Submit data
    console.log({ data });
  };

  // console.log({ emergingTeacherLeaders });
  // console.log({ opsValue });
  // console.log({ operationsGuide });
  // console.log({ errors });
  // console.log({ isValid });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal
        open={open}
        toggle={toggle}
        title="Add a school"
        fixedActions={
          <Grid container justifyContent="space-between">
            <Grid item>
              {activeStep !== 0 ? (
                <Button
                  onClick={handlePrev}
                  disabled={activeStep === 0}
                  variant="text"
                >
                  <Typography variant="bodyRegular" bold light>
                    Prev
                  </Typography>
                </Button>
              ) : null}
            </Grid>
            <Grid item>
              {activeStep === 3 ? (
                <Button type="submit">
                  <Typography variant="bodyRegular" bold light>
                    Invite
                  </Typography>
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={
                    activeStep === 0
                      ? !emergingTeacherLeaders.length
                      : activeStep === 1
                      ? !operationsGuide
                      : activeStep === 2 && !regionalGrowthLead
                  }
                >
                  <Typography variant="bodyRegular" bold light>
                    Next
                  </Typography>
                </Button>
              )}
            </Grid>
          </Grid>
        }
      >
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

        {activeStep === 0 ? (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card
                variant="lightened"
                size={emergingTeacherLeaders.length ? "small" : "large"}
              >
                <Grid
                  container
                  alignItems="center"
                  justifyContent="center"
                  spacing={2}
                >
                  {emergingTeacherLeaders.length ? (
                    emergingTeacherLeaders.map((etl, i) => (
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
                                onClick={() => handleRemoveETL(etl.email)}
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
                              errors &&
                              errors.lastName &&
                              errors.lastName.message
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
                  <Button variant="lightened" onClick={handleAddETL}>
                    <Typography variant="bodyRegular" bold highlight>
                      Add ETL
                    </Typography>
                  </Button>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        ) : activeStep === 1 ? (
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
                        <StyledPersonOption size="small" noBorder noRadius>
                          <FormControlLabel
                            sx={{ width: "100%" }}
                            key={i}
                            value={og.value}
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
                ></Controller>
              </Card>
            </Grid>
          </Grid>
        ) : activeStep === 2 ? (
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
                        <StyledPersonOption size="small" noBorder noRadius>
                          <FormControlLabel
                            sx={{ width: "100%" }}
                            key={i}
                            value={rgl.value}
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
                ></Controller>
              </Card>
            </Grid>
          </Grid>
        ) : (
          activeStep === 3 && <Grid container>Summary</Grid>
        )}
      </Modal>
    </form>
  );
};

const OperationsGuides = [
  {
    value: "A",
    label: "A",
    firstName: "A",
    lastName: "A",
    roleList: ["Operations Guide"],
    imageUrl: "/",
  },
  {
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
    value: "A - RGL",
    label: "A - RGL",
    firstName: "A",
    lastName: "A",
    roleList: ["Regional Growth Lead"],
    imageUrl: "/",
  },
  {
    value: "B - RGL",
    label: "B - RGL",
    firstName: "B",
    lastName: "B",
    roleList: ["Regional Growth Lead"],
    imageUrl: "/",
  },
];
