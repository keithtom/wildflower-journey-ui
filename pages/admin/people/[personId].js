import {
  Box,
  Card,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Button,
  Stack,
  ListSubheader,
  Switch,
  Grid,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  RadioGroup,
  FormHelperText,
  Radio,
  MultiSelect,
  FormLabel,
  Autocomplete,
  Chip,
  Skeleton,
  CircularProgress,
  Modal,
  Checkbox,
  FormGroup,
} from "@mui/material";
import { PageContainer } from "@ui";
import {
  Person,
  Email,
  Work,
  School,
  FiberManualRecord,
  Delete,
  Visibility,
  Phone,
  LocationOn,
  Language,
  Wc,
  Badge,
  Key,
  CheckCircle,
  Edit,
  Info,
} from "@mui/icons-material";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import {
  languageOptions,
  pronounsOptions,
  genderOptions,
  ethnicityOptions,
  montessoriCertificationOptions,
  levelsOfMontessoriCertification,
  roleOptions,
  unitedStatesOptions,
} from "@lib/utils/demographic-options";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import usePerson from "@hooks/usePerson";
import useSchool from "@hooks/useSchool";
import { mutate } from "swr";
import peopleApi from "@api/people";
import authApi from "@api/auth";

const SchoolItem = ({ schoolId }) => {
  const { data: schoolData, isLoading } = useSchool(schoolId);
  const router = useRouter();
  const { personId } = router.query;

  // console.log({ schoolId });
  // console.log({ schoolData });

  if (isLoading) {
    return (
      <ListItem divider>
        <ListItemText>
          <Skeleton height={40} />
        </ListItemText>
      </ListItem>
    );
  }

  if (!schoolData?.data) return null;

  // Find all school relationships for this person
  const schoolRelationships = schoolData.included.filter(
    (item) =>
      item.type === "schoolRelationship" &&
      item.relationships.person.data.id === personId
  );

  const isPaused = schoolData?.data?.attributes?.status === "Paused";

  // Check if there's at least one active relationship (no end date)
  const hasActiveRelationship = schoolRelationships.some(
    (relationship) => !relationship.attributes.endDate
  );

  // If there are no relationships, all have end dates, or school is paused, don't display
  if (schoolRelationships.length === 0 || !hasActiveRelationship || isPaused) {
    return null;
  }

  // Get the most recent active relationship for role list
  const activeRelationships = schoolRelationships.filter(
    (relationship) => !relationship.attributes.endDate
  );

  // Sort by startDate in descending order and take the most recent
  const mostRecentRelationship = activeRelationships.sort(
    (a, b) =>
      new Date(b.attributes.startDate) - new Date(a.attributes.startDate)
  )[0];

  const schoolRoleList = mostRecentRelationship.attributes.roleList || [];

  return (
    <ListItem divider>
      <ListItemIcon>
        <School />
      </ListItemIcon>
      <ListItemText
        primary={schoolData.data.attributes.name}
        secondary={schoolRoleList.join(", ") || "No roles assigned"}
      />
      <ListItemSecondaryAction>
        <Button
          size="small"
          onClick={() => router.push(`/admin/schools/${schoolData.data.id}`)}
        >
          View
        </Button>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const PersonIdPage = () => {
  const [editDetailsModalOpen, setEditDetailsModalOpen] = useState(false);
  const [removePersonModalOpen, setRemovePersonModalOpen] = useState(false);
  const [resetPasswordModalOpen, setResetPasswordModalOpen] = useState(false);
  const [editCurrentRolesModalOpen, setEditCurrentRolesModalOpen] =
    useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();
  const { personId } = router.query;

  const { data: person, isLoading } = usePerson(personId);

  // Get school IDs from relationships
  const schoolIds = useMemo(
    () => person?.data?.relationships?.schools?.data?.map((s) => s.id) || [],
    [person]
  );

  const schoolRelationships =
    person?.data?.relationships?.schoolRelationships?.data || [];

  // Pagination logic
  const schoolsPerPage = 15;
  const totalPages = Math.ceil(schoolIds.length / schoolsPerPage);
  const startIndex = currentPage * schoolsPerPage;
  const endIndex = startIndex + schoolsPerPage;
  const currentSchoolIds = schoolIds.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Reset to first page when person changes
  useEffect(() => {
    setCurrentPage(0);
  }, [personId]);

  const personData = useMemo(() => {
    if (!person?.data?.attributes) return [];

    return [
      // General Information
      {
        key: "firstName",
        value: person.data.attributes.firstName,
        icon: <Person />,
      },
      {
        key: "lastName",
        value: person.data.attributes.lastName,
        icon: <Person />,
      },
      {
        key: "email",
        value: person.data.attributes.email,
        icon: <Email />,
      },
      {
        key: "phone",
        value: person.data.attributes.phone || "Not provided",
        icon: <Phone />,
      },
      {
        key: "about",
        value: person.data.attributes.about || "Not provided",
        icon: <Person />,
      },

      // Location
      {
        key: "location",
        value: person.data.attributes.location || "Not provided",
        icon: <LocationOn />,
      },

      // Demographics
      {
        key: "primaryLanguage",
        value: person.data.attributes.primaryLanguage || "Not provided",
        icon: <Language />,
      },
      {
        key: "raceEthnicity",
        value: person.data.attributes.raceEthnicityList || [],
        icon: <Person />,
        isArray: true,
        emptyMessage: "Not provided",
      },
      {
        key: "gender",
        value: person.data.attributes.gender || "Not provided",
        icon: <Wc />,
      },
      {
        key: "pronouns",
        value: person.data.attributes.pronouns || "Not provided",
        icon: <Wc />,
      },

      // Certification
      {
        key: "montessoriCertified",
        value: person.data.attributes.montessoriCertified || "Not provided",
        icon: <Badge />,
      },
      {
        key: "montessoriCertifiedLevels",
        value: person.data.attributes.montessoriCertifiedLevelList || [],
        icon: <School />,
        isArray: true,
        emptyMessage: "No certifications",
      },
      {
        key: "montessoriCertifiedYear",
        value: person.data.attributes.montessoriCertifiedYear || "Not provided",
        icon: <School />,
      },
    ];
  }, [person]);

  const currentRoles = useMemo(() => {
    if (!person?.data?.attributes?.roleList) return [];

    return person.data.attributes.roleList.map((role) => ({
      id: role,
      role: role,
      since: person.data.attributes.startDate || "N/A",
    }));
  }, [person]);

  if (isLoading) {
    return (
      <PageContainer isAdmin>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Card>
              <Stack spacing={2} p={3}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} height={60} />
                ))}
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </PageContainer>
    );
  }

  const adminActions = [
    {
      id: 1,
      type: "button",
      label: "Reset Password",
      description: "Send password reset email",
      icon: <Key />,
      action: () => setResetPasswordModalOpen(true),
      color: "primary",
      dataCy: "reset-password-button",
    },
    {
      id: 2,
      type: "switch",
      label: "Visible in Directory",
      description: "Control person visibility",
      icon: <Visibility />,
      value: person?.data?.attributes?.active || false,
      action: async (checked) => {
        try {
          await peopleApi.update(personId, {
            person: {
              active: checked,
            },
          });
          await mutate(`/v1/people/${personId}`);
        } catch (error) {
          console.error("Error updating visibility:", error);
        }
      },
      dataCy: "directory-visible-switch",
    },
    {
      id: 3,
      type: "button",
      label: "Remove Person",
      description: "Remove school relationships and login",
      icon: <Delete />,
      action: () => setRemovePersonModalOpen(true),
      color: "error",
      dataCy: "remove-person-button",
    },
  ];

  const renderActionControl = (action) => {
    switch (action.type) {
      case "switch":
        return (
          <Switch
            checked={action.value}
            onChange={(e) => action.action(e.target.checked)}
            color="primary"
            data-cy={action.dataCy}
          />
        );
      case "button":
      default:
        return (
          <Button
            variant="contained"
            color={action.color}
            size="small"
            onClick={action.action}
            data-cy={action.dataCy}
          >
            {action.label}
          </Button>
        );
    }
  };

  const renderFieldValue = (item) => {
    if (Array.isArray(item.value)) {
      return item.value.join(", ");
    }
    return item.value;
  };

  return (
    <PageContainer
      isAdmin
      title={`${person?.data?.attributes?.firstName} ${person?.data?.attributes?.lastName}`}
    >
      <Grid container spacing={6}>
        {/* Left Column */}
        <Grid item xs={12} md={6}>
          <Stack spacing={6}>
            {/* Person Details Section */}
            <Card sx={{ borderRadius: 4 }}>
              <List
                subheader={
                  <ListSubheader
                    component="div"
                    id="nested-list-subheader"
                    sx={{
                      background: "#f1f1f1",
                      paddingX: 4,
                      paddingY: 3,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="bodyLarge">Person Details</Typography>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => setEditDetailsModalOpen(true)}
                      data-cy="edit-person-button"
                    >
                      Edit Details
                    </Button>
                  </ListSubheader>
                }
              >
                {personData.map((item) => (
                  <ListItem
                    key={item.key}
                    divider
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      px: 4,
                    }}
                    data-cy={`person-detail-${item.key}`}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText
                      primary={
                        item.key.charAt(0).toUpperCase() +
                        item.key.slice(1).replace(/([A-Z])/g, " $1")
                      }
                      secondary={
                        item.isArray
                          ? item.value?.length > 0
                            ? item.value.join(", ")
                            : item.emptyMessage
                          : item.value
                      }
                      primaryTypographyProps={{
                        variant: "bodyRegular",
                        color: "text.primary",
                      }}
                      secondaryTypographyProps={{
                        variant: "bodyRegular",
                        color:
                          item.value === "Not provided"
                            ? "text.secondary"
                            : "text.primary",
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Card>

            {/* Associated Schools Section */}
            <Card sx={{ borderRadius: 4 }}>
              <List
                subheader={
                  <ListSubheader
                    component="div"
                    id="nested-list-subheader"
                    sx={{
                      background: "#f1f1f1",
                      paddingX: 4,
                      paddingY: 3,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="bodyLarge">
                      Associated Schools ({schoolIds.length})
                    </Typography>
                  </ListSubheader>
                }
              >
                {schoolIds.length === 0 ? (
                  <ListItem>
                    <ListItemText>
                      <Typography
                        variant="bodyRegular"
                        lightened
                        align="center"
                      >
                        No associated schools
                      </Typography>
                    </ListItemText>
                  </ListItem>
                ) : (
                  <>
                    {currentSchoolIds.map((schoolId, index) => (
                      <SchoolItem
                        key={`${schoolId}-${startIndex + index}`}
                        schoolId={schoolId}
                        personRelationships={schoolRelationships}
                      />
                    ))}
                    {totalPages > 1 && (
                      <ListItem>
                        <ListItemText>
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={2}
                            sx={{ mt: 2 }}
                          >
                            <Button
                              size="small"
                              disabled={currentPage === 0}
                              onClick={() => handlePageChange(currentPage - 1)}
                            >
                              Previous
                            </Button>
                            <Typography variant="bodySmall">
                              Page {currentPage + 1} of {totalPages}
                            </Typography>
                            <Button
                              size="small"
                              disabled={currentPage === totalPages - 1}
                              onClick={() => handlePageChange(currentPage + 1)}
                            >
                              Next
                            </Button>
                          </Stack>
                        </ListItemText>
                      </ListItem>
                    )}
                  </>
                )}
              </List>
            </Card>
          </Stack>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={6}>
          <Stack spacing={6}>
            {/* Roles Section */}
            <Card sx={{ borderRadius: 4 }}>
              <List
                subheader={
                  <ListSubheader
                    component="div"
                    id="nested-list-subheader"
                    sx={{
                      background: "#f1f1f1",
                      paddingX: 4,
                      paddingY: 3,
                    }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="bodyLarge">Current Roles</Typography>
                      <Button
                        size="small"
                        onClick={() => setEditCurrentRolesModalOpen(true)}
                        startIcon={<Edit />}
                        data-cy="edit-roles-button"
                      >
                        Edit
                      </Button>
                    </Stack>
                  </ListSubheader>
                }
              >
                {currentRoles.length === 0 ? (
                  <ListItem>
                    <ListItemText>
                      <Typography
                        variant="bodyRegular"
                        lightened
                        align="center"
                      >
                        No roles assigned
                      </Typography>
                    </ListItemText>
                  </ListItem>
                ) : (
                  <List data-cy="current-roles-list">
                    {currentRoles.map((role) => (
                      <ListItem key={role.id} divider>
                        <ListItemIcon>
                          <Work />
                        </ListItemIcon>
                        <ListItemText
                          primary={role.role}
                          secondary={
                            role.since !== "N/A" ? `Since ${role.since}` : null
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                )}
              </List>
            </Card>

            {/* Admin Actions Section */}
            <Card sx={{ borderRadius: 4 }}>
              <List
                subheader={
                  <ListSubheader
                    component="div"
                    id="nested-list-subheader"
                    sx={{
                      background: "#f1f1f1",
                      paddingX: 4,
                      paddingY: 3,
                    }}
                  >
                    <Typography variant="bodyLarge">Admin Actions</Typography>
                  </ListSubheader>
                }
              >
                {adminActions.map((action) => (
                  <ListItem key={action.id} divider>
                    <ListItemIcon>{action.icon}</ListItemIcon>
                    <ListItemText
                      primary={action.label}
                      secondary={action.description}
                    />
                    <ListItemSecondaryAction>
                      {renderActionControl(action)}
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Card>
            <Card sx={{ borderRadius: 4 }}>
              <List
                subheader={
                  <ListSubheader
                    component="div"
                    id="nested-list-subheader"
                    sx={{
                      background: "#f1f1f1",
                      paddingX: 4,
                      paddingY: 3,
                    }}
                  >
                    <Typography variant="bodyLarge">Attributes</Typography>
                  </ListSubheader>
                }
              >
                <ListItem>
                  <ListItemIcon>
                    <Work />
                  </ListItemIcon>
                  <ListItemText
                    primary="Onboarded"
                    secondary={
                      person?.data?.attributes?.isOnboarded === true
                        ? "Yes"
                        : "No"
                    }
                  />
                </ListItem>
              </List>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      <EditDetailsModal
        open={editDetailsModalOpen}
        onClose={() => setEditDetailsModalOpen(false)}
        person={personData}
      />
      <ResetPasswordModal
        open={resetPasswordModalOpen}
        onClose={() => setResetPasswordModalOpen(false)}
        personName={`${
          personData.find((item) => item.key === "firstName")?.value
        } ${personData.find((item) => item.key === "lastName")?.value}`}
        email={personData.find((item) => item.key === "email")?.value}
      />
      <RemovePersonModal
        open={removePersonModalOpen}
        onClose={() => setRemovePersonModalOpen(false)}
        personName={`${
          personData.find((item) => item.key === "firstName")?.value
        } ${personData.find((item) => item.key === "lastName")?.value}`}
      />
      <EditCurrentRoles
        open={editCurrentRolesModalOpen}
        onClose={() => setEditCurrentRolesModalOpen(false)}
        currentRoles={person?.data?.attributes?.roleList || []}
        personId={personId}
        mutate={mutate}
      />
    </PageContainer>
  );
};

export default PersonIdPage;

const EditDetailsModal = ({ open, onClose, person }) => {
  const router = useRouter();
  const { personId } = router.query;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Helper function to get clean value from person data
  const getDefaultValue = (key) => {
    const value = person.find((item) => item.key === key)?.value;
    return value === "Not provided" ? "" : value || "";
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: getDefaultValue("firstName"),
      lastName: getDefaultValue("lastName"),
      email: getDefaultValue("email"),
      phone: getDefaultValue("phone"),
      city: getDefaultValue("city"),
      state: getDefaultValue("state"),
      about: getDefaultValue("about"),
      primaryLanguage: getDefaultValue("primaryLanguage"),
      gender: getDefaultValue("gender"),
      pronouns: getDefaultValue("pronouns"),
      raceEthnicity: (
        person.find((item) => item.key === "raceEthnicity")?.value || []
      ).map(
        (value) =>
          ethnicityOptions.find((option) => option.value === value) || {
            value,
            label: value,
          }
      ),
      montessoriCertified: getDefaultValue("montessoriCertified"),
      montessoriCertifiedLevels: (
        person.find((item) => item.key === "montessoriCertifiedLevels")
          ?.value || []
      ).map(
        (value) =>
          levelsOfMontessoriCertification.find(
            (option) => option.value === value
          ) || {
            value,
            label: value,
          }
      ),
      montessoriCertifiedYear: getDefaultValue("montessoriCertifiedYear"),
    },
  });

  const handleClose = () => {
    reset();
    setError(null);
    onClose();
  };

  const onSubmit = async (data) => {
    setError(null);
    setIsSubmitting(true);

    // Create the person update object
    const personUpdate = {
      person: {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
      },
    };

    // Add optional fields only if they have values
    if (data.phone) personUpdate.person.phone = data.phone;
    if (data.about) personUpdate.person.about = data.about;
    if (data.primaryLanguage)
      personUpdate.person.primary_language = data.primaryLanguage;
    if (data.gender) personUpdate.person.gender = data.gender;
    if (data.pronouns) personUpdate.person.pronouns = data.pronouns;

    // Always include Montessori certification fields
    personUpdate.person.montessori_certified = data.montessoriCertified;
    personUpdate.person.montessori_certified_level_list =
      data.montessoriCertifiedLevels?.map((level) => level.value || level) ||
      [];
    if (data.montessoriCertifiedYear) {
      personUpdate.person.montessori_certified_year =
        data.montessoriCertifiedYear;
    }

    // Handle arrays - only include if they have values
    if (data.raceEthnicity?.length > 0) {
      personUpdate.person.race_ethnicity_list = data.raceEthnicity.map(
        (item) => item.value || item
      );
    }

    // Only include address_attributes if either city or state has a value
    if (data.city || data.state) {
      personUpdate.person.address_attributes = {
        ...(data.city && { city: data.city }),
        ...(data.state && { state: data.state }),
      };
    }

    try {
      await peopleApi.update(personId, personUpdate);
      await mutate(`/v1/people/${personId}`, null, { revalidate: true });
      handleClose();
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.error ||
          "An error occurred while updating the person."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Person Details</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ maxHeight: 640, overflowY: "auto" }}>
          <Stack spacing={3} sx={{ mt: 2 }}>
            {error && (
              <Typography color="error" variant="bodySmall">
                {error}
              </Typography>
            )}
            {/* General Fields */}
            <Typography variant="h6">General Information</Typography>
            <Controller
              name="firstName"
              control={control}
              rules={{ required: "First name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="First Name"
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  fullWidth
                  data-cy="person-first-name-input"
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              rules={{ required: "Last name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Last Name"
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  fullWidth
                  data-cy="person-last-name-input"
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  type="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  fullWidth
                  data-cy="person-email-input"
                />
              )}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone"
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  fullWidth
                  data-cy="person-phone-input"
                />
              )}
            />
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="City"
                  error={!!errors.city}
                  helperText={errors.city?.message}
                  fullWidth
                  data-cy="person-city-input"
                />
              )}
            />
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.state}>
                  <InputLabel>State</InputLabel>
                  <Select
                    {...field}
                    label="State"
                    data-cy="person-state-select"
                  >
                    {unitedStatesOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.state && (
                    <FormHelperText>{errors.state.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
            <Controller
              name="about"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="About"
                  multiline
                  rows={4}
                  error={!!errors.about}
                  helperText={errors.about?.message}
                  fullWidth
                  data-cy="person-about-input"
                />
              )}
            />

            {/* Demographic Fields */}
            <Typography variant="h6" sx={{ mt: 2 }}>
              Demographics
            </Typography>
            <Controller
              name="primaryLanguage"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.primaryLanguage}>
                  <InputLabel>Primary Language</InputLabel>
                  <Select
                    {...field}
                    label="Primary Language"
                    data-cy="person-primary-language-select"
                  >
                    {languageOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.primaryLanguage && (
                    <FormHelperText>
                      {errors.primaryLanguage.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.gender}>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    {...field}
                    label="Gender"
                    data-cy="person-gender-select"
                  >
                    {genderOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.gender && (
                    <FormHelperText>{errors.gender.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
            <Controller
              name="pronouns"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.pronouns}>
                  <InputLabel>Pronouns</InputLabel>
                  <Select
                    {...field}
                    label="Pronouns"
                    data-cy="person-pronouns-select"
                  >
                    {pronounsOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.pronouns && (
                    <FormHelperText>{errors.pronouns.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
            <Controller
              name="raceEthnicity"
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                <FormControl fullWidth error={!!errors.raceEthnicity}>
                  <Autocomplete
                    {...field}
                    multiple
                    options={ethnicityOptions}
                    getOptionLabel={(option) => option.label || option}
                    value={value || []}
                    onChange={(_, newValue) => onChange(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Race/Ethnicity"
                        error={!!errors.raceEthnicity}
                        helperText={errors.raceEthnicity?.message}
                        data-cy="person-race-ethnicity-input"
                      />
                    )}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          label={option.label || option}
                          {...getTagProps({ index })}
                          key={option.value || option}
                        />
                      ))
                    }
                  />
                </FormControl>
              )}
            />

            {/* Certification Fields */}
            <Typography variant="h6" sx={{ mt: 2 }}>
              Certification
            </Typography>
            <Controller
              name="montessoriCertified"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.montessoriCertified}>
                  <InputLabel>Montessori Certified</InputLabel>
                  <Select
                    {...field}
                    label="Montessori Certified"
                    data-cy="person-montessori-certified-select"
                    value={field.value || ""}
                  >
                    {montessoriCertificationOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.montessoriCertified && (
                    <FormHelperText>
                      {errors.montessoriCertified.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
            <Controller
              name="montessoriCertifiedLevels"
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                <FormControl
                  fullWidth
                  error={!!errors.montessoriCertifiedLevels}
                >
                  <Autocomplete
                    {...field}
                    multiple
                    options={levelsOfMontessoriCertification}
                    getOptionLabel={(option) => option.label || option}
                    value={value || []}
                    onChange={(_, newValue) => onChange(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Certification Levels"
                        error={!!errors.montessoriCertifiedLevels}
                        helperText={errors.montessoriCertifiedLevels?.message}
                        data-cy="person-montessori-levels-input"
                      />
                    )}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          label={option.label || option}
                          {...getTagProps({ index })}
                          key={option.value || option}
                        />
                      ))
                    }
                  />
                </FormControl>
              )}
            />
            <Controller
              name="montessoriCertifiedYear"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Certification Years"
                  multiline
                  rows={4}
                  error={!!errors.montessoriCertifiedYear}
                  helperText={errors.montessoriCertifiedYear?.message}
                  placeholder="e.g. Primary/Early Childhood - 2015"
                  fullWidth
                  data-cy="person-montessori-year-input"
                />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            data-cy="save-person-button"
          >
            {isSubmitting ? <CircularProgress size={24} /> : "Save Changes"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const ResetPasswordModal = ({ open, onClose, personName, email }) => {
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm();

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = handleSubmit(async () => {
    try {
      await authApi.resetPasswordEmail(email);
    } catch (error) {
      console.error(error);
    }
    setTimeout(() => {
      handleClose();
    }, 1000);
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Reset Password</DialogTitle>
      {isSubmitSuccessful ? (
        <DialogContent>
          <Card variant="lightened" sx={{ p: 4 }}>
            <Stack spacing={2} alignItems="center">
              <CheckCircle sx={{ color: "success.main" }} />
              <Typography>
                Password reset email sent to{" "}
                <Chip label={personName} size="small" /> at{" "}
                <Chip label={email} size="small" />.
              </Typography>
            </Stack>
          </Card>
        </DialogContent>
      ) : (
        <form onSubmit={onSubmit}>
          <DialogContent>
            <Typography>
              Are you sure you want to send a password reset email to{" "}
              <Chip label={personName} size="small" /> at{" "}
              <Chip label={email} size="small" />?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="inherit">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              Send Reset Email
            </Button>
          </DialogActions>
        </form>
      )}
    </Dialog>
  );
};

const RemovePersonModal = ({ open, onClose, personName }) => {
  const router = useRouter();
  const { personId } = router.query;
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      confirmName: "",
    },
  });

  const confirmName = watch("confirmName");
  // Normalize spaces in both the input and the stored name
  const normalizeSpaces = (str) => str.replace(/\s+/g, " ").trim();
  const normalizedConfirmName = normalizeSpaces(confirmName);
  const normalizedPersonName = normalizeSpaces(personName);
  const isNameConfirmed = normalizedConfirmName === normalizedPersonName;
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open) {
      reset({ confirmName: "" });
      setError(null);
    }
  }, [open, reset]);

  const handleClose = () => {
    reset();
    setError(null);
    onClose();
  };

  const onSubmit = handleSubmit(async () => {
    try {
      await peopleApi.remove(personId);
      // Redirect to people list after successful removal
      router.push("/admin/people");
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.error ||
          "An error occurred while removing this person."
      );
    }
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Remove Person</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <Stack spacing={3}>
            <Typography color="error">
              This will remove all school relationships, remove their login, and
              remove them from the directory.
            </Typography>
            <Typography>
              To remove "{personName}", please type their full name below:
            </Typography>
            {error && (
              <Typography color="error" variant="bodySmall">
                {error}
              </Typography>
            )}
            <Controller
              name="confirmName"
              control={control}
              rules={{
                required: "Please type the full name to confirm",
                validate: (value) =>
                  normalizeSpaces(value) === normalizedPersonName ||
                  "Name doesn't match exactly",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Full Name"
                  placeholder="Type full name to confirm"
                  error={!!errors.confirmName}
                  helperText={errors.confirmName?.message}
                  fullWidth
                  data-cy="confirm-name-input"
                />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="error"
            disabled={!isNameConfirmed || isSubmitting}
            data-cy="confirm-remove-person-button"
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Remove Person"
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const EditCurrentRoles = ({
  open,
  onClose,
  currentRoles,
  personId,
  mutate,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      roles: currentRoles,
    },
  });

  // console.log({ currentRoles });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      await peopleApi.update(personId, {
        person: {
          role_list: data.roles,
        },
      });
      await mutate(`/v1/people/${personId}`);
      handleClose();
    } catch (err) {
      console.error(err);
      setError("roles", {
        type: "manual",
        message: err?.response?.data?.message || "Failed to update roles",
      });
    }
  });

  const roleOptions = [
    { value: "Emerging Teacher Leader", label: "Emerging Teacher Leader" },
    { value: "Teacher Leader", label: "Teacher Leader" },
    { value: "Wildflower Support", label: "Wildflower Support" },
    { value: "Ops Guide", label: "Operations Guide" },
    { value: "Foundation Partner", label: "Foundation Partner" },
    { value: "Charter Partner", label: "Charter Partner" },
    { value: "Regional Entrepreneur", label: "Regional Entrepreneur" },
  ];

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Current Roles</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <Stack spacing={3}>
            <Card variant="light" sx={{ p: 4, borderRadius: 4 }}>
              <Stack direction="row" spacing={3} alignItems="start">
                <Info sx={{ color: "primary.main" }} />
                <Typography variant="bodyRegular">
                  Note that for ETL, TL, and WS roles, the person's roles are
                  auto updated from the "school relationship". However, as an
                  admin, you still have the ability to add or remove roles.
                  Check the Associated Schools to ensure roles make sense.
                </Typography>
              </Stack>
            </Card>
            <FormControl error={!!errors?.roles} component="fieldset">
              <FormLabel component="legend">Roles</FormLabel>
              <Controller
                name="roles"
                control={control}
                rules={{ required: "Please select at least one role" }}
                render={({ field }) => (
                  <FormGroup data-cy="role-checkboxes">
                    {roleOptions.map((role) => {
                      const isChecked = field.value.includes(role.value);
                      return (
                        <FormControlLabel
                          key={role.value}
                          control={
                            <Checkbox
                              checked={isChecked}
                              onChange={(e) => {
                                const newRoles = e.target.checked
                                  ? [...field.value, role.value]
                                  : field.value.filter((r) => r !== role.value);
                                field.onChange(newRoles);
                              }}
                              data-cy={`role-checkbox-${role.value}`}
                            />
                          }
                          label={
                            <Stack
                              direction="row"
                              spacing={1}
                              alignItems="center"
                            >
                              <Typography>{role.label}</Typography>
                            </Stack>
                          }
                        />
                      );
                    })}
                  </FormGroup>
                )}
              />
              {errors?.roles && (
                <FormHelperText>{errors.roles.message}</FormHelperText>
              )}
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="inherit"
            data-cy="cancel-roles-button"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            data-cy="save-roles-button"
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export async function getServerSideProps({ locale }) {
  return {
    props: {
      messages: {
        // Add any i18n messages if needed
      },
    },
  };
}
