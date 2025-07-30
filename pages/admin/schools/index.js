import { useEffect, useState, useMemo } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  FormControlLabel,
  RadioGroup,
  FormHelperText,
  CircularProgress,
  TextField,
  Chip,
  Skeleton,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemIcon,
  Autocomplete,
  ListSubheader,
  Pagination,
} from "@mui/material";
import { School } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import peopleApi from "@api/people";
import schoolsApi from "@api/schools";
import useSWR, { useSWRConfig } from "swr";
import { useRouter } from "next/router";

import { clearLoggedInState } from "@lib/handleLogout";
import { useUserContext } from "@lib/useUserContext";
import useAuth from "@lib/utils/useAuth";
import useSchools from "@hooks/useSchools";
import useWorkflows from "@hooks/workflow/definition/useWorkflows";
import useSearch from "@hooks/useSearch";
import {
  Card,
  Box,
  PageContainer,
  Button,
  Grid,
  Typography,
  Stack,
  Avatar,
  Modal,
  Radio,
  Spinner,
} from "@ui";

const AdminSchools = () => {
  const [addSchoolModalOpen, setAddSchoolModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const { currentUser } = useUserContext();
  const router = useRouter();

  const { data: schools, isLoading } = useSchools({
    page,
    per_page: 25,
  });

  const filteredSchools = schools?.data?.filter(
    (s) => s.attributes.status !== "Abandoned"
  );

  useAuth(!currentUser?.attributes?.isAdmin && "/network");

  const handleSchoolClick = (schoolId) => {
    router.push(`/admin/schools/${schoolId}`);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const SchoolList = ({ schools }) => (
    <Card noPadding>
      <List
        subheader={
          <ListSubheader
            component="div"
            sx={{
              background: "#f1f1f1",
              paddingX: 4,
              paddingY: 3,
            }}
          >
            <Typography variant="bodyLarge" bold lightened>
              Schools
            </Typography>
          </ListSubheader>
        }
        data-cy="school-list"
      >
        {!filteredSchools?.length ? (
          <ListItem disablePadding>
            <ListItemText>
              <Typography variant="bodyRegular" lightened align="center">
                No schools found
              </Typography>
            </ListItemText>
          </ListItem>
        ) : (
          filteredSchools.map((school, i) => (
            <ListItem
              key={school.id}
              disablePadding
              divider={i !== schools.length - 1}
              data-cy="school-list-item"
            >
              <ListItemButton onClick={() => handleSchoolClick(school.id)}>
                <ListItemIcon>
                  <School fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={school.attributes.name}
                  primaryTypographyProps={{
                    variant: "bodyRegular",
                  }}
                />
                <ListItemSecondaryAction>
                  <Stack direction="row" spacing={2}>
                    <Chip
                      label={school.attributes.status}
                      size="small"
                      color={
                        school.attributes.status === "Open"
                          ? "primary"
                          : "default"
                      }
                    />
                    {school.attributes.currentPhase &&
                      school.attributes.status !== "Open" && (
                        <Chip
                          label={school.attributes.currentPhase}
                          size="small"
                          variant="outlined"
                        />
                      )}
                  </Stack>
                </ListItemSecondaryAction>
              </ListItemButton>
            </ListItem>
          ))
        )}
      </List>
    </Card>
  );

  return (
    <>
      <PageContainer isAdmin title="Schools">
        <Stack spacing={6}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography variant="bodyLarge">
                {schools?.meta?.total_entries || 0} schools
              </Typography>
            </Grid>
            <Grid item>
              <Button
                small
                onClick={() => setAddSchoolModalOpen(true)}
                data-cy="add-school-button"
              >
                <Typography variant="bodyRegular" light bold>
                  Add
                </Typography>
              </Button>
            </Grid>
          </Grid>

          {isLoading ? (
            <Card sx={{ borderRadius: 4 }}>
              <Stack spacing={2} p={3}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} height={60} />
                ))}
              </Stack>
            </Card>
          ) : (
            <SchoolList schools={schools?.data} />
          )}

          <Grid container justifyContent="center">
            <Pagination
              count={schools?.meta?.total_pages || 1}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
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

export default AdminSchools;

const StyledPersonOption = styled(Card)`
  border-bottom: 1px solid ${({ theme }) => theme.color.neutral.main};
  &:last-child {
    border-bottom: 0;
  }
  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.color.neutral.lightened};
  }
  ${({ disabled }) =>
    disabled &&
    `
    pointer-events: none;
    opacity: .5;
    &:hover {
    background: white;
    }
  `}
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
    mutate("v1/schools");
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
      ) : activeStep === 3 ? (
        <AddWorkflow
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
        activeStep === 4 && (
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
        <StepLabel>Add RE</StepLabel>
      </Step>
      <Step>
        <StepLabel>Add Workflow</StepLabel>
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
  } = useForm({
    defaultValues: {
      teacher: null,
      first_name: "",
      last_name: "",
      email: "",
    },
  });

  const onSubmit = (data) => {
    if (data.first_name && data.last_name && data.email) {
      setMultiplePeople((prev) => [
        ...prev,
        {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
        },
      ]);
      reset({ first_name: "", last_name: "", email: "" });
    }
  };

  const handleRemovePerson = (email) => {
    setMultiplePeople((prev) => prev.filter((p) => p.email !== email));
  };

  const {
    query,
    setQuery,
    results,
    noResults,
    isSearching,
    setPerPage,
    setFilters,
  } = useSearch();

  useEffect(() => {
    setQuery("*");
    setPerPage(500);
    setFilters({
      models: "people",
    });
  }, []);

  const handleTeacherSelect = (selectedTeacher) => {
    if (selectedTeacher) {
      setMultiplePeople((prev) => [
        ...prev,
        {
          first_name: selectedTeacher.attributes.firstName,
          last_name: selectedTeacher.attributes.lastName,
          email: selectedTeacher.attributes.email,
        },
      ]);
      setQuery("");
    }
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
                  multiplePeople?.map((person, i) => (
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
                              <Avatar src={person.imageUrl} size="sm" />
                              <Stack>
                                <Typography variant="bodyRegular" bold>
                                  {person.first_name} {person.last_name}
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
                              onClick={() => handleRemovePerson(person.email)}
                              data-cy="remove-person-button"
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
                    <Typography lightened>
                      No Teacher Leaders added yet
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <Stack spacing={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Controller
                      name="teacher"
                      control={control}
                      render={({ field, fieldState: { error, isTouched } }) => (
                        <Autocomplete
                          {...field}
                          inputValue={query || ""}
                          onChange={(_, newValue) => {
                            handleTeacherSelect(newValue);
                          }}
                          onInputChange={(_, newInputValue) => {
                            setQuery(newInputValue);
                          }}
                          options={
                            results?.filter(
                              (person) => !person.attributes.endDate
                            ) || []
                          }
                          getOptionDisabled={(option) =>
                            multiplePeople.some(
                              (p) => p.email === option.attributes.email
                            )
                          }
                          getOptionLabel={(option) =>
                            option && option.attributes
                              ? `${option.attributes.firstName} ${option.attributes.lastName}`
                              : ""
                          }
                          renderOption={(props, option) => {
                            const { key, ...optionProps } = props;
                            return (
                              <ListItem
                                key={option.id}
                                {...optionProps}
                                disablePadding
                              >
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={2}
                                >
                                  <Avatar
                                    src={option.attributes.imageUrl}
                                    size="mini"
                                  />
                                  <Typography variant="bodyRegular">
                                    {option.attributes.firstName}{" "}
                                    {option.attributes.lastName}
                                  </Typography>
                                </Stack>
                              </ListItem>
                            );
                          }}
                          isOptionEqualToValue={(option, value) =>
                            option.id === value?.id
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Search for an existing person"
                              error={isTouched && !!error}
                              placeholder="e.g. Katelyn Shore"
                              helperText={
                                isTouched &&
                                error?.type === "required" &&
                                "This field is required"
                              }
                              data-cy="search-person-input"
                              InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                  <>
                                    {isSearching ? (
                                      <CircularProgress
                                        color="inherit"
                                        size={20}
                                      />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                  </>
                                ),
                              }}
                            />
                          )}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="bodyRegular" lightened>
                      Or add a new person
                    </Typography>
                  </Grid>
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
                          {...field}
                          label="First name"
                          placeholder="e.g. Jane"
                          error={!!errors.first_name}
                          helperText={errors.first_name?.message}
                          fullWidth
                          data-cy="new-person-first-name"
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
                          {...field}
                          label="Last name"
                          placeholder="e.g. Smith"
                          error={!!errors.last_name}
                          helperText={errors.last_name?.message}
                          fullWidth
                          data-cy="new-person-last-name"
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
                      {...field}
                      label="Email"
                      placeholder="e.g. jane.smith@gmail.com"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      fullWidth
                      data-cy="new-person-email"
                    />
                  )}
                />
                <Button
                  variant="lightened"
                  type="submit"
                  data-cy="add-new-person-button"
                >
                  <Typography variant="bodyRegular" bold highlight>
                    Add Teacher Leader
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
                <Button type="submit" variant="text" small>
                  <Typography variant="bodyRegular" bold>
                    Prev
                  </Typography>
                </Button>
              </Grid>
            )}
            <Grid item>
              <Button
                type="submit"
                disabled={!multiplePeople.length}
                small
                data-cy="next-button-add-people"
              >
                <Typography variant="bodyRegular" bold light>
                  Next
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </form>
      }
    >
      <Stack spacing={6}>
        <FormStepper activeStep={activeStep} />
        <AddMultiplePeopleForm
          team={team}
          setMultiplePeople={setMultiplePeople}
          multiplePeople={multiplePeople}
        />
      </Stack>
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
    () =>
      peopleApi
        .index({ ops_guide: true })
        .then((res) => res.data.filter((person) => !person.attributes.endDate)),
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
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Button variant="text" onClick={handlePrev} small>
                <Typography variant="bodyRegular" bold>
                  Prev
                </Typography>
              </Button>
            </Grid>
            <Grid item>
              <Button
                type="submit"
                disabled={!isValid}
                small
                data-cy="next-button-select-og"
              >
                <Typography variant="bodyRegular" bold light>
                  Next
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </form>
      }
    >
      <Stack spacing={6}>
        <FormStepper activeStep={activeStep} />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card noPadding>
              <Controller
                name="operationsGuide"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <RadioGroup value={value} data-cy="og-radio-group">
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
                          key={i}
                          size="small"
                          noBorder
                          noRadius
                          noPadding
                        >
                          <FormControlLabel
                            sx={{ width: "100%", height: "100%", padding: 2 }}
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
                                      <Typography
                                        variant="bodyRegular"
                                        lightened
                                      >
                                        {og?.attributes?.roleList?.map(
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
      </Stack>
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
    () =>
      peopleApi
        .index({ rgl: true })
        .then((res) => res.data.filter((person) => !person.attributes.endDate)),
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
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Button variant="text" onClick={handlePrev} small>
                <Typography variant="bodyRegular" bold>
                  Prev
                </Typography>
              </Button>
            </Grid>
            <Grid item>
              <Button
                type="submit"
                disabled={!isValid}
                small
                data-cy="next-button-select-re"
              >
                <Typography variant="bodyRegular" bold light>
                  Next
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </form>
      }
    >
      <Stack spacing={6}>
        <FormStepper activeStep={activeStep} />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card noPadding>
              <Controller
                name="regionalGrowthLead"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <RadioGroup value={value} data-cy="re-radio-group">
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
                          key={i}
                          size="small"
                          noBorder
                          noRadius
                          noPadding
                        >
                          <FormControlLabel
                            sx={{ width: "100%", height: "100%", padding: 2 }}
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
                                      <Typography
                                        variant="bodyRegular"
                                        lightened
                                      >
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
      </Stack>
    </Modal>
  );
};
const AddWorkflow = ({
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
      workflow: team.workflow_id ? team.workflow_id : null,
    },
  });

  const { workflows, isLoading, isValidating, isError } = useWorkflows();

  const SSJWorkflows = workflows?.filter(
    (w) => w.attributes.recurring === false
  );
  const onSubmit = (data) => {
    setTeam({
      ...team,
      workflow_id: data.workflow,
    });
    const selectedWorkflow = workflows.filter((o) => o.id === data.workflow);
    setTempDisplayData({
      ...tempDisplayData,
      workflow: {
        workflowId: selectedWorkflow[0].id,
        workflowName: selectedWorkflow[0].attributes.name,
        workflowVersion: selectedWorkflow[0].attributes.version,
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
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Button variant="text" onClick={handlePrev} small>
                <Typography variant="bodyRegular" bold>
                  Prev
                </Typography>
              </Button>
            </Grid>
            <Grid item>
              <Button
                type="submit"
                disabled={!isValid}
                small
                data-cy="next-button-select-workflow"
              >
                <Typography variant="bodyRegular" bold light>
                  Next
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </form>
      }
    >
      <Stack spacing={6}>
        <FormStepper activeStep={activeStep} />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card noPadding>
              <Controller
                name="workflow"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <RadioGroup value={value} data-cy="workflow-radio-group">
                    {isLoading || isValidating ? (
                      <Card noBorder size="large">
                        <Grid container justifyContent="center">
                          <Grid item>
                            <Spinner />
                          </Grid>
                        </Grid>
                      </Card>
                    ) : (
                      SSJWorkflows?.map((workflow, i) => (
                        <StyledPersonOption
                          key={i}
                          size="small"
                          noBorder
                          noRadius
                          noPadding
                          disabled={!workflow.attributes.published}
                        >
                          <FormControlLabel
                            sx={{ width: "100%", height: "100%", padding: 2 }}
                            value={workflow.id}
                            label={
                              <Grid container>
                                <Grid item>
                                  <Stack
                                    direction="row"
                                    spacing={3}
                                    alignItems="center"
                                  >
                                    <Typography variant="bodyRegular">
                                      {workflow.attributes.name}
                                    </Typography>
                                    <Chip
                                      label={
                                        workflow.attributes.published
                                          ? workflow.attributes.version
                                          : `Drafting ${workflow.attributes.version}`
                                      }
                                      size="small"
                                      variant="outlined"
                                    />
                                    {isLoading ? (
                                      <Skeleton variant="rounded" width={120} />
                                    ) : workflow?.attributes.needsSupport ? (
                                      <Chip
                                        label="Needs Support"
                                        size="small"
                                        variant="outlined"
                                        color="error"
                                      />
                                    ) : workflow?.attributes
                                        .rolloutStartedAt !== null &&
                                      workflow?.attributes
                                        .rolloutCompletedAt === null ? (
                                      <Chip
                                        label="Publishing in progress"
                                        size="small"
                                        variant="outlined"
                                        color="primary"
                                      />
                                    ) : workflow.attributes.published ? (
                                      <Stack
                                        direction="row"
                                        spacing={3}
                                        alignItems="center"
                                      >
                                        <Chip
                                          label="Published"
                                          size="small"
                                          color="primary"
                                        />
                                        <Typography
                                          variant="bodyRegular"
                                          lightened
                                        >
                                          {workflow.attributes.numOfInstances}{" "}
                                          schools
                                        </Typography>
                                      </Stack>
                                    ) : (
                                      <Chip
                                        label="Not Published"
                                        size="small"
                                        color="secondary"
                                      />
                                    )}
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
      </Stack>
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
    try {
      await schoolsApi.create({ school: team });
      handleInviteComplete();
    } catch (error) {
      if (error?.response?.status === 422) {
        setDuplicateEmailError(error.response.data.message);
      }
      console.error(error);
    }
  };

  return (
    <Modal
      open={open}
      toggle={toggle}
      title="Add a school"
      fixedActions={
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Button variant="text" onClick={handlePrev} small>
                <Typography variant="bodyRegular" bold>
                  Prev
                </Typography>
              </Button>
            </Grid>
            <Grid item>
              <Button
                type="submit"
                disabled={isSubmitting}
                small
                data-cy="invite-button"
              >
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
      <Stack spacing={6}>
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
                      <Avatar
                        src={tempDisplayData.opsGuide.imageUrl}
                        size="sm"
                      />
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
            <Stack spacing={3}>
              <Typography variant="bodyRegular" bold>
                Workflow
              </Typography>
              <Card size="small" variant="lightened">
                <Grid container>
                  <Grid item>
                    <Stack direction="row" spacing={3} alignItems="center">
                      <Typography variant="bodyRegular">
                        {tempDisplayData.workflow.workflowName}
                      </Typography>
                      <Chip
                        label={tempDisplayData.workflow.workflowVersion}
                        size="small"
                        variant="outlined"
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </Card>
            </Stack>
          </Stack>
        </Card>
      </Stack>
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

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Add any additional props you need to pass to the page component
    },
  };
}
