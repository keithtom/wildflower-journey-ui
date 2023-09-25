import { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useForm, Controller } from "react-hook-form";
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
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    //Submit data
  };

  return (
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
              <Button>
                <Typography variant="bodyRegular" bold light>
                  Invite
                </Typography>
              </Button>
            ) : (
              <Button onClick={handleNext}>
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

      <form>
        {activeStep === 0 ? (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card variant="lightened" size="large">
                <Grid container alignItems="center" justifyContent="center">
                  <Grid item>
                    <Typography lightened>No ETLs</Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <Stack spacing={3}>
                  <Controller
                    name="firstName"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField
                        label="First name"
                        placeholder="e.g. Jane"
                        error={errors.firstName}
                        helperText={
                          errors &&
                          errors.firstName &&
                          errors.firstName &&
                          "This field is required"
                        }
                        {...field}
                      />
                    )}
                  />
                  <Controller
                    name="lastName"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField
                        label="Last name"
                        placeholder="e.g. Smith"
                        error={errors.lastName}
                        helperText={
                          errors &&
                          errors.lastName &&
                          errors.lastName &&
                          "This field is required"
                        }
                        {...field}
                      />
                    )}
                  />
                  <Controller
                    name="email"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField
                        label="Email"
                        placeholder="e.g. jane.smith@gmail.com"
                        error={errors.email}
                        helperText={
                          errors &&
                          errors.email &&
                          errors.email &&
                          "This field is required"
                        }
                        {...field}
                      />
                    )}
                  />
                  <Button variant="lightened">
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
                {OperationsGuides.map((og, i) => (
                  <StyledPersonOption size="small" noBorder noRadius key={i}>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <Stack direction="row" spacing={3} alignItems="center">
                          <Avatar src={og.imageUrl} size="sm" />
                          <Typography variant="bodyRegular" bold>
                            {og.firstName} {og.lastName}
                          </Typography>
                          {og.roleList.map((r, i) => (
                            <Typography variant="bodyRegular" lightened key={i}>
                              {r}
                            </Typography>
                          ))}
                        </Stack>
                      </Grid>
                      <Grid item>
                        <Button variant="text" small>
                          <Typography variant="bodyRegular" bold>
                            Add
                          </Typography>
                        </Button>
                      </Grid>
                    </Grid>
                  </StyledPersonOption>
                ))}
              </Card>
            </Grid>
          </Grid>
        ) : activeStep === 2 ? (
          <Grid container>
            <Grid item xs={12}>
              <Card noPadding>
                {RegionalGrowthLeads.map((rgl, i) => (
                  <StyledPersonOption size="small" noBorder noRadius key={i}>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <Stack direction="row" spacing={3} alignItems="center">
                          <Avatar src={rgl.imageUrl} size="sm" />
                          <Typography variant="bodyRegular" bold>
                            {rgl.firstName} {rgl.lastName}
                          </Typography>
                          {rgl.roleList.map((r, i) => (
                            <Typography variant="bodyRegular" lightened key={i}>
                              {r}
                            </Typography>
                          ))}
                        </Stack>
                      </Grid>
                      <Grid item>
                        <Button variant="text" small>
                          <Typography variant="bodyRegular" bold>
                            Add
                          </Typography>
                        </Button>
                      </Grid>
                    </Grid>
                  </StyledPersonOption>
                ))}
              </Card>
            </Grid>
          </Grid>
        ) : (
          activeStep === 3 && <Grid container>Summary</Grid>
        )}
      </form>
    </Modal>
  );
};

const OperationsGuides = [
  {
    firstName: "A",
    lastName: "A",
    roleList: ["Operations Guide"],
    imageUrl: "/",
  },
  {
    firstName: "B",
    lastName: "B",
    roleList: ["Operations Guide"],
    imageUrl: "/",
  },
];
const RegionalGrowthLeads = [
  {
    firstName: "A",
    lastName: "A",
    roleList: ["Regional Growth Lead"],
    imageUrl: "/",
  },
  {
    firstName: "B",
    lastName: "B",
    roleList: ["Regional Growth Lead"],
    imageUrl: "/",
  },
];
