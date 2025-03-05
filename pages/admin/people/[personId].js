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
import { useState, useEffect } from "react";
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

const PersonIdPage = () => {
  const [editDetailsModalOpen, setEditDetailsModalOpen] = useState(false);
  const [removePersonModalOpen, setRemovePersonModalOpen] = useState(false);
  const [resetPasswordModalOpen, setResetPasswordModalOpen] = useState(false);
  const router = useRouter();
  const { personId } = router.query;

  // Mock data - replace with actual data fetching
  const personData = [
    // General Fields
    { key: "firstName", value: "John", icon: <Person /> },
    { key: "lastName", value: "Doe", icon: <Person /> },
    { key: "email", value: "john.doe@example.com", icon: <Email /> },
    { key: "phone", value: "+1 (555) 123-4567", icon: <Phone /> },
    { key: "city", value: "New York", icon: <LocationOn /> },
    { key: "state", value: "NY", icon: <LocationOn /> },
    {
      key: "about",
      value:
        "A passionate Montessori educator with over 10 years of experience.",
      icon: <Person />,
    },

    // Demographic Fields
    { key: "primaryLanguage", value: "English", icon: <Language /> },
    {
      key: "raceEthnicity",
      value: ["Asian, or Asian American", "White"],
      icon: <Person />,
    },
    { key: "gender", value: "Male/Man", icon: <Wc /> },
    { key: "pronouns", value: "he/him/his", icon: <Wc /> },

    // Certification & Role Fields
    { key: "montessoriCertified", value: "Yes", icon: <Badge /> },
    {
      key: "montessoriCertifiedLevels",
      value: ["Primary/Early Childhood", "6-9 Elementary"],
      icon: <School />,
    },
    {
      key: "montessoriCertifiedYear",
      value: "Primary/Early Childhood - 2015\n6-9 Elementary - 2018",
      icon: <School />,
    },
  ];

  const associatedSchools = [
    { id: 1, name: "Montessori School A", role: "Lead Teacher" },
    { id: 2, name: "Montessori School B", role: "Assistant Teacher" },
  ];

  const currentRoles = [
    { id: 1, role: "Teacher Leader", since: "2020" },
    { id: 2, role: "Foundation Partner", since: "2022" },
  ];

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
            <Card>
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
                      pr: 12,
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText
                      primary={
                        item.key.charAt(0).toUpperCase() +
                        item.key.slice(1).replace(/([A-Z])/g, " $1")
                      }
                      primaryTypographyProps={{
                        color: "text.secondary",
                        variant: "bodyRegular",
                      }}
                    />
                    <ListItemSecondaryAction>
                      <Typography variant="bodyRegular">
                        {Array.isArray(item.value)
                          ? item.value.join(", ")
                          : item.value}
                      </Typography>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Card>

            {/* Associated Schools Section */}
            <Card>
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
                {associatedSchools.map((school) => (
                  <ListItem key={school.id} divider>
                    <ListItemIcon>
                      <School />
                    </ListItemIcon>
                    <ListItemText
                      primary={school.name}
                      secondary={school.role}
                    />
                    <ListItemSecondaryAction>
                      <Button
                        size="small"
                        onClick={() =>
                          router.push(`/admin/schools/${school.id}`)
                        }
                      >
                        View
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Card>
          </Stack>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={6}>
          <Stack spacing={6}>
            {/* Roles Section */}
            <Card>
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
                {currentRoles.map((role) => (
                  <ListItem key={role.id} divider>
                    <ListItemIcon>
                      <Work />
                    </ListItemIcon>
                    <ListItemText
                      primary={role.role}
                      secondary={`Since ${role.since}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Card>

            {/* Admin Actions Section */}
            <Card>
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
