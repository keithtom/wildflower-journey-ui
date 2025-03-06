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

const SchoolItem = ({ schoolId, personRelationships }) => {
  const { data: schoolData, isLoading } = useSchool(schoolId);
  const router = useRouter();

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

  // Find the person in the included data that matches the school's people relationship
  const schoolPerson = schoolData?.included?.find(
    (item) =>
      item.type === "person" &&
      schoolData.data.relationships.people.data.some((p) => p.id === item.id)
  );

  // Get the role list from the matched person's attributes
  const schoolRoleList = schoolPerson?.attributes?.roleList || [];

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
  const router = useRouter();
  const { personId } = router.query;
  const { data: person, isLoading } = usePerson(personId);

  // Get school IDs from relationships
  const schoolIds = useMemo(
    () => person?.data?.relationships?.schools?.data?.map((s) => s.id) || [],
    [person]
  );

  useEffect(() => {
    console.log({ person });
  }, [person]);

  const schoolRelationships =
    person?.data?.relationships?.schoolRelationships?.data || [];

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
        value:
          person.data.attributes.montessoriCertified === "1" ? "Yes" : "No",
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
      <PageContainer>
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
    },
    {
      id: 2,
      type: "switch",
      label: "Visible in Directory",
      description: "Control person visibility",
      icon: <Visibility />,
      value: true,
      action: (checked) => console.log("Visibility changed:", checked),
    },
    {
      id: 3,
      type: "button",
      label: "Remove Person",
      description: "Permanently delete this person",
      icon: <Delete />,
      action: () => setRemovePersonModalOpen(true),
      color: "error",
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
    <PageContainer>
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
                      Associated Schools
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
                  schoolIds.map((schoolId) => (
                    <SchoolItem
                      key={schoolId}
                      schoolId={schoolId}
                      personRelationships={schoolRelationships}
                    />
                  ))
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
                    <Typography variant="bodyLarge">Current Roles</Typography>
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
                  currentRoles.map((role) => (
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
                  ))
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
      />
      <RemovePersonModal
        open={removePersonModalOpen}
        onClose={() => setRemovePersonModalOpen(false)}
        personName={`${
          personData.find((item) => item.key === "firstName")?.value
        } ${personData.find((item) => item.key === "lastName")?.value}`}
      />
    </PageContainer>
  );
};

export default PersonIdPage;

const EditDetailsModal = ({ open, onClose, person }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: person.find((item) => item.key === "firstName")?.value || "",
      lastName: person.find((item) => item.key === "lastName")?.value || "",
      email: person.find((item) => item.key === "email")?.value || "",
      phone: person.find((item) => item.key === "phone")?.value || "",
      city: person.find((item) => item.key === "city")?.value || "",
      state: person.find((item) => item.key === "state")?.value || "",
      about: person.find((item) => item.key === "about")?.value || "",
      primaryLanguage:
        person.find((item) => item.key === "primaryLanguage")?.value || "",
      gender: person.find((item) => item.key === "gender")?.value || "",
      pronouns: person.find((item) => item.key === "pronouns")?.value || "",
      raceEthnicity:
        person.find((item) => item.key === "raceEthnicity")?.value || [],
      montessoriCertified:
        person.find((item) => item.key === "montessoriCertified")?.value || "",
      montessoriCertifiedLevels:
        person.find((item) => item.key === "montessoriCertifiedLevels")
          ?.value || [],
      montessoriCertifiedYear:
        person.find((item) => item.key === "montessoriCertifiedYear")?.value ||
        "",
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = handleSubmit((data) => {
    console.log("Edit details form data:", data);
    // Handle person update here
    handleClose();
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Person Details</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent sx={{ maxHeight: 640, overflowY: "auto" }}>
          <Stack spacing={3} sx={{ mt: 2 }}>
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
                />
              )}
            />
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.state}>
                  <InputLabel>State</InputLabel>
                  <Select {...field} label="State">
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
                  <Select {...field} label="Primary Language">
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
                  <Select {...field} label="Gender">
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
                  <Select {...field} label="Pronouns">
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
                    value={value || []}
                    onChange={(_, newValue) => onChange(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Race/Ethnicity"
                        error={!!errors.raceEthnicity}
                        helperText={errors.raceEthnicity?.message}
                      />
                    )}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          label={option}
                          {...getTagProps({ index })}
                          key={option}
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
                  <Select {...field} label="Montessori Certified">
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
                    value={value || []}
                    onChange={(_, newValue) => onChange(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Certification Levels"
                        error={!!errors.montessoriCertifiedLevels}
                        helperText={errors.montessoriCertifiedLevels?.message}
                      />
                    )}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          label={option}
                          {...getTagProps({ index })}
                          key={option}
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
                />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const ResetPasswordModal = ({ open, onClose, personName }) => {
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = handleSubmit(() => {
    // Handle password reset here
    handleClose();
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Reset Password</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <Typography>
            Are you sure you want to send a password reset email to {personName}
            ?
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
    </Dialog>
  );
};

const RemovePersonModal = ({ open, onClose, personName }) => {
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
  const isNameConfirmed = confirmName === personName;

  useEffect(() => {
    if (open) {
      reset({ confirmName: "" });
    }
  }, [open, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = handleSubmit(() => {
    // Handle person deletion here
    handleClose();
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Remove Person</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <Stack spacing={3}>
            <Typography color="error">
              This action cannot be undone. This will permanently delete this
              person's account and remove all associated data.
            </Typography>
            <Typography>
              To remove "{personName}", please type their full name below:
            </Typography>
            <Controller
              name="confirmName"
              control={control}
              rules={{
                required: "Please type the full name to confirm",
                validate: (value) =>
                  value === personName || "Name doesn't match exactly",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Full Name"
                  placeholder="Type full name to confirm"
                  error={!!errors.confirmName}
                  helperText={errors.confirmName?.message}
                  fullWidth
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
          >
            Remove Person
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
