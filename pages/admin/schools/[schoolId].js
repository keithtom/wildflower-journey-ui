import {
  Box,
  Card,
  CardContent,
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
  Autocomplete,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Skeleton,
} from "@mui/material";
import { PageContainer } from "@ui";
import {
  School,
  LocationOn,
  Category,
  Event,
  Person,
  FiberManualRecord,
  Delete,
  AddTask,
  Visibility,
  Groups,
} from "@mui/icons-material";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import useSchool from "@hooks/useSchool";
import {
  AGES_SERVED_OPTIONS,
  GOVERNANCE_OPTIONS,
  STATE_OPTIONS,
} from "@lib/constants/schoolFields";

const SchoolIdPage = () => {
  const router = useRouter();
  const { schoolId } = router.query;
  const { data: school, isLoading } = useSchool(schoolId);

  useEffect(() => {
    console.log("Raw school data:", school);
  }, [school]);

  const [addPersonModalOpen, setAddPersonModalOpen] = useState(false);
  const [editDetailsModalOpen, setEditDetailsModalOpen] = useState(false);
  const [addWorkflowModalOpen, setAddWorkflowModalOpen] = useState(false);
  const [editPersonModalOpen, setEditPersonModalOpen] = useState(false);
  const [removeWorkflowModalOpen, setRemoveWorkflowModalOpen] = useState(false);
  const [setStatusModalOpen, setSetStatusModalOpen] = useState(false);
  const [removeSchoolModalOpen, setRemoveSchoolModalOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);

  // Transform school data into the format we need
  const schoolData = useMemo(() => {
    if (!school?.data?.attributes) return [];

    const transformedData = [
      {
        key: "name",
        value: school.data.attributes.name || "Unnamed School",
        icon: <School />,
      },
      {
        key: "city",
        value: school.data.attributes.city || "Not provided",
        icon: <LocationOn />,
      },
      {
        key: "state",
        value: school.data.attributes.state || "Not provided",
        icon: <LocationOn />,
      },
      {
        key: "openDate",
        value: school.data.attributes.openDate || "Not provided",
        icon: <Event />,
      },
      {
        key: "about",
        value: school.data.attributes.about || "Not provided",
        icon: <School />,
      },
      {
        key: "agesServed",
        value: school.data.attributes.agesServedList || [],
        icon: <Category />,
        isArray: true,
        emptyMessage: "Not provided",
      },
      {
        key: "governanceType",
        value: school.data.attributes.governanceType || "Not provided",
        icon: <Category />,
      },
      {
        key: "maxEnrollment",
        value:
          school.data.attributes.maxEnrollment?.toString() || "Not provided",
        icon: <Groups />,
      },
      {
        key: "numClassrooms",
        value:
          school.data.attributes.numClassrooms?.toString() || "Not provided",
        icon: <Category />,
      },
    ];

    console.log("Transformed school data:", transformedData);
    return transformedData;
  }, [school]);

  // Transform associated people data
  const associatedPeople = useMemo(() => {
    if (!school?.data?.relationships?.people?.data || !school?.included)
      return [];

    return school.data.relationships.people.data
      .map((personRelation) => {
        // Find the person in the included array
        const personData = school.included.find(
          (item) => item.type === "person" && item.id === personRelation.id
        );

        if (!personData) return null;

        return {
          id: personData.id,
          firstName: personData.attributes.firstName,
          lastName: personData.attributes.lastName,
          roleList: personData.attributes.roleList || [],
          imageUrl: personData.attributes.imageUrl,
        };
      })
      .filter(Boolean); // Remove any null entries
  }, [school]);

  const currentWorkflows = [{ id: 1, name: "School Startup Journey" }];

  const adminActions = [
    {
      id: 3,
      type: "button",
      label: "Set Status",
      description: `Current status: ${
        school?.data?.attributes?.status || "Unknown"
      }`,
      icon: <FiberManualRecord color="primary" />,
      action: () => setSetStatusModalOpen(true),
      color: "primary",
    },
    {
      id: 4,
      type: "switch",
      label: "Member",
      description: "School membership status",
      icon: <Groups />,
      value: school?.data?.attributes?.isMember || false,
      action: (checked) => console.log("Member status changed:", checked),
    },
    {
      id: 5,
      type: "switch",
      label: "Visible in Directory",
      description: "Control school visibility",
      icon: <Visibility />,
      value: school?.data?.attributes?.isVisible || false,
      action: (checked) => console.log("Visibility changed:", checked),
    },
    {
      id: 2,
      type: "button",
      label: "Remove School",
      description: "Permanently delete this school",
      icon: <Delete />,
      action: () => setRemoveSchoolModalOpen(true),
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

  const handleAddWorkflow = () => {
    setAddWorkflowModalOpen(true);
  };

  const handleEditPerson = (person) => {
    setSelectedPerson(person);
    setEditPersonModalOpen(true);
  };

  const handleRemoveWorkflow = (workflow) => {
    setSelectedWorkflow(workflow);
    setRemoveWorkflowModalOpen(true);
  };

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

  return (
    <PageContainer isAdmin title={school?.data?.attributes?.name}>
      <Grid container spacing={6}>
        {/* Left Column */}
        <Grid item xs={12} md={6}>
          <Stack spacing={6}>
            {/* Associated People Section */}
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
                      Associated People
                    </Typography>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => setAddPersonModalOpen(true)}
                    >
                      Add Person
                    </Button>
                  </ListSubheader>
                }
              >
                {associatedPeople.length === 0 ? (
                  <ListItem>
                    <ListItemText>
                      <Typography
                        variant="bodyRegular"
                        lightened
                        align="center"
                      >
                        No associated people
                      </Typography>
                    </ListItemText>
                  </ListItem>
                ) : (
                  associatedPeople.map((person) => (
                    <ListItem key={person.id} divider>
                      <ListItemIcon>
                        <Avatar sx={{ bgcolor: "primary.main" }}>
                          <Typography variant="bodySmall">
                            {person.firstName?.[0] || ""}
                            {person.lastName?.[0] || ""}
                          </Typography>
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={`${person.firstName} ${person.lastName}`}
                        secondary={
                          person.roleList.join(", ") || "No roles assigned"
                        }
                        primaryTypographyProps={{
                          variant: "bodyRegular",
                        }}
                        secondaryTypographyProps={{
                          variant: "bodyRegular",
                          color: person.roleList.length
                            ? "text.primary"
                            : "text.secondary",
                          sx: {
                            whiteSpace: "normal",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            pr: 24, // Add padding to prevent text from hitting actions
                          },
                        }}
                      />
                      <ListItemSecondaryAction>
                        <Stack direction="row" spacing={1}>
                          <Button
                            size="small"
                            variant="text"
                            onClick={() =>
                              router.push(`/admin/people/${person.id}`)
                            }
                          >
                            View
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleEditPerson(person)}
                          >
                            Edit
                          </Button>
                        </Stack>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))
                )}
              </List>
            </Card>

            {/* School Details Section */}
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
                    <Typography variant="bodyLarge">School Details</Typography>
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
                {schoolData.map(
                  ({ key, value, icon, isArray, emptyMessage }) => (
                    <ListItem
                      key={key}
                      divider
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        px: 4,
                      }}
                    >
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText
                        primary={
                          key.charAt(0).toUpperCase() +
                          key.slice(1).replace(/([A-Z])/g, " $1")
                        }
                        secondary={
                          isArray
                            ? value?.length > 0
                              ? value.join(", ")
                              : emptyMessage
                            : value
                        }
                        primaryTypographyProps={{
                          variant: "bodyRegular",
                          color: "text.primary",
                        }}
                        secondaryTypographyProps={{
                          variant: "bodyRegular",
                          color:
                            value === "Not provided"
                              ? "text.secondary"
                              : "text.primary",
                        }}
                      />
                    </ListItem>
                  )
                )}
              </List>
            </Card>
          </Stack>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={6}>
          <Stack spacing={6}>
            {/* Workflows Section */}
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
                    <Typography variant="bodyLarge">Workflows</Typography>
                    <Button
                      startIcon={<AddTask />}
                      variant="contained"
                      size="small"
                      onClick={handleAddWorkflow}
                    >
                      Add Workflow
                    </Button>
                  </ListSubheader>
                }
              >
                {currentWorkflows.map((workflow) => (
                  <ListItem key={workflow.id} divider>
                    <ListItemIcon>
                      <FiberManualRecord />
                    </ListItemIcon>
                    <ListItemText
                      primary={workflow.name}
                      secondary={workflow.status}
                    />
                    <ListItemSecondaryAction>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleRemoveWorkflow(workflow)}
                      >
                        Remove
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
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
                    <Typography variant="bodyLarge">
                      Administrative Actions
                    </Typography>
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
      <AddPersonModal
        open={addPersonModalOpen}
        onClose={() => setAddPersonModalOpen(false)}
      />
      <EditDetailsModal
        open={editDetailsModalOpen}
        onClose={() => setEditDetailsModalOpen(false)}
      />
      <AddWorkflowModal
        open={addWorkflowModalOpen}
        onClose={() => setAddWorkflowModalOpen(false)}
      />
      <EditPersonModal
        open={editPersonModalOpen}
        onClose={() => {
          setEditPersonModalOpen(false);
          setSelectedPerson(null);
        }}
        person={selectedPerson}
      />
      <RemoveWorkflowModal
        open={removeWorkflowModalOpen}
        onClose={() => {
          setRemoveWorkflowModalOpen(false);
          setSelectedWorkflow(null);
        }}
        workflow={selectedWorkflow}
      />
      <SetStatusModal
        open={setStatusModalOpen}
        onClose={() => setSetStatusModalOpen(false)}
      />
      <RemoveSchoolModal
        open={removeSchoolModalOpen}
        onClose={() => setRemoveSchoolModalOpen(false)}
        schoolName={schoolData.find((item) => item.key === "name")?.value || ""}
      />
    </PageContainer>
  );
};

const ROLE_OPTIONS = [
  "Emerging Teacher Leader",
  "Teacher Leader",
  "Ops Guide",
  "Regional Growth Lead",
  "Wildflower Support",
  "Board Member",
];

// Mock people data for the autocomplete
const MOCK_PEOPLE = [
  { id: 1, name: "Alice Johnson" },
  { id: 2, name: "Bob Smith" },
  { id: 3, name: "Carol Williams" },
  { id: 4, name: "David Brown" },
  { id: 5, name: "Emma Davis" },
];

const AddPersonModal = ({ open, onClose }) => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      person: null,
      role: "",
      title: "",
    },
  });

  const selectedRole = watch("role");

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = handleSubmit((data) => {
    console.log("Add person form data:", data);
    reset();
    onClose();
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Person</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <Stack spacing={3}>
            <Controller
              name="person"
              control={control}
              rules={{ required: "Please select a person" }}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={MOCK_PEOPLE}
                  getOptionLabel={(option) => option?.name || ""}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search for a person"
                      error={!!errors.person}
                      helperText={errors.person?.message}
                    />
                  )}
                  onChange={(_, value) => field.onChange(value)}
                />
              )}
            />

            <Controller
              name="role"
              control={control}
              rules={{ required: "Please select a role" }}
              render={({ field }) => (
                <FormControl error={!!errors.role} fullWidth>
                  <InputLabel>Role at school</InputLabel>
                  <Select {...field} label="Role at school">
                    {ROLE_OPTIONS.map((role) => (
                      <MenuItem key={role} value={role}>
                        {role}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.role && (
                    <Typography color="error" variant="caption">
                      {errors.role.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />

            {selectedRole === "Wildflower Support" && (
              <Controller
                name="title"
                control={control}
                rules={{ required: "Please enter a title" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Title"
                    error={!!errors.title}
                    helperText={errors.title?.message}
                    fullWidth
                  />
                )}
              />
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const EditDetailsModal = ({ open, onClose }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      about: "",
      city: "",
      state: "",
      openDate: "",
      agesServed: [],
      governanceType: "",
      maxEnrollment: "",
      numClassrooms: "",
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = handleSubmit((data) => {
    console.log("Edit details form data:", data);
    reset();
    onClose();
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit School Details</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <Stack spacing={3}>
            <Controller
              name="name"
              control={control}
              rules={{ required: "School name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="School Name"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  fullWidth
                />
              )}
            />

            <Controller
              name="city"
              control={control}
              rules={{ required: "City is required" }}
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
              rules={{ required: "State is required" }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.state}>
                  <InputLabel>State</InputLabel>
                  <Select {...field} label="State">
                    {STATE_OPTIONS.map((state) => (
                      <MenuItem key={state} value={state}>
                        {state}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.state && (
                    <Typography color="error" variant="caption">
                      {errors.state.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />

            <Controller
              name="openDate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Open Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
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
                  fullWidth
                />
              )}
            />

            <Controller
              name="agesServed"
              control={control}
              rules={{ required: "Please select ages served" }}
              render={({ field: { value, onChange, ...field } }) => (
                <FormControl fullWidth error={!!errors.agesServed}>
                  <InputLabel>Ages Served</InputLabel>
                  <Select
                    {...field}
                    value={value || []}
                    onChange={onChange}
                    multiple
                    label="Ages Served"
                  >
                    {AGES_SERVED_OPTIONS.map((age) => (
                      <MenuItem key={age.value} value={age.value}>
                        {age.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.agesServed && (
                    <Typography color="error" variant="caption">
                      {errors.agesServed.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />

            <Controller
              name="governanceType"
              control={control}
              rules={{ required: "Please select governance type" }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.governanceType}>
                  <InputLabel>Governance Type</InputLabel>
                  <Select {...field} label="Governance Type">
                    {GOVERNANCE_OPTIONS.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.governanceType && (
                    <Typography color="error" variant="caption">
                      {errors.governanceType.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />

            <Controller
              name="maxEnrollment"
              control={control}
              rules={{
                required: "Required",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Must be a number",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Max Enrollment"
                  type="number"
                  error={!!errors.maxEnrollment}
                  helperText={errors.maxEnrollment?.message}
                  fullWidth
                />
              )}
            />

            <Controller
              name="numClassrooms"
              control={control}
              rules={{
                required: "Required",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Must be a number",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Number of Classrooms"
                  type="number"
                  error={!!errors.numClassrooms}
                  helperText={errors.numClassrooms?.message}
                  fullWidth
                />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const WORKFLOW_OPTIONS = [
  { value: "School Startup Journey", label: "School Startup Journey" },
  { value: "Open School Checklist", label: "Open School Checklist" },
];

const AddWorkflowModal = ({ open, onClose }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      workflow: "",
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = handleSubmit((data) => {
    console.log("Add workflow form data:", data);
    reset();
    onClose();
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Workflow</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <Stack spacing={3}>
            <Controller
              name="workflow"
              control={control}
              rules={{ required: "Please select a workflow" }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.workflow}>
                  <InputLabel>Workflow</InputLabel>
                  <Select {...field} label="Workflow">
                    {WORKFLOW_OPTIONS.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.workflow && (
                    <Typography color="error" variant="caption">
                      {errors.workflow.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const EditPersonModal = ({ open, onClose, person }) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: person?.role || "",
      title: person?.title || "",
      confirmName: "",
    },
  });

  const selectedRole = watch("role");
  const confirmName = watch("confirmName");
  const isNameConfirmed = person && confirmName === person.name;

  useEffect(() => {
    if (person) {
      reset({
        role: person.role,
        title: person.title || "",
        confirmName: "",
      });
    }
  }, [person, reset]);

  const handleClose = () => {
    reset();
    setIsRemoving(false);
    onClose();
  };

  const onSubmit = handleSubmit((data) => {
    if (isRemoving) {
      console.log("Remove person:", person.id);
    } else {
      console.log("Update person role:", { personId: person.id, ...data });
    }
    handleClose();
  });

  if (!person) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {isRemoving ? "Remove Person" : "Edit Person Role"}
      </DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <Stack spacing={3}>
            {isRemoving ? (
              <>
                <Typography>
                  To remove {person.name}, please type their full name below:
                </Typography>
                <Controller
                  name="confirmName"
                  control={control}
                  rules={{ required: "Please type the full name to confirm" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Full Name"
                      error={!!errors.confirmName}
                      helperText={errors.confirmName?.message}
                      fullWidth
                    />
                  )}
                />
              </>
            ) : (
              <>
                <Controller
                  name="role"
                  control={control}
                  rules={{ required: "Please select a role" }}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.role}>
                      <InputLabel>Role at school</InputLabel>
                      <Select {...field} label="Role at school">
                        {ROLE_OPTIONS.map((role) => (
                          <MenuItem key={role} value={role}>
                            {role}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.role && (
                        <Typography color="error" variant="caption">
                          {errors.role.message}
                        </Typography>
                      )}
                    </FormControl>
                  )}
                />

                {selectedRole === "Wildflower Support" && (
                  <Controller
                    name="title"
                    control={control}
                    rules={{ required: "Please enter a title" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Title"
                        error={!!errors.title}
                        helperText={errors.title?.message}
                        fullWidth
                      />
                    )}
                  />
                )}
              </>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          {!isRemoving && (
            <Button
              color="error"
              onClick={() => setIsRemoving(true)}
              sx={{ marginRight: "auto" }}
            >
              Remove Person
            </Button>
          )}
          <Button onClick={handleClose}>Cancel</Button>
          {isRemoving ? (
            <Button
              type="submit"
              variant="contained"
              color="error"
              disabled={!isNameConfirmed}
            >
              Remove
            </Button>
          ) : (
            <Button type="submit" variant="contained">
              Save Changes
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};

const RemoveWorkflowModal = ({ open, onClose, workflow }) => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      confirmName: "",
    },
  });

  const confirmName = watch("confirmName");
  const isNameConfirmed = workflow && confirmName === workflow.name;

  useEffect(() => {
    if (workflow) {
      reset({ confirmName: "" });
    }
  }, [workflow, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = handleSubmit((data) => {
    console.log("Remove workflow:", workflow.id);
    handleClose();
  });

  if (!workflow) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Remove Workflow</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <Stack spacing={3}>
            <Typography>
              To remove the workflow "{workflow.name}", please type its name
              below:
            </Typography>
            <Controller
              name="confirmName"
              control={control}
              rules={{ required: "Please type the workflow name to confirm" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Workflow Name"
                  error={!!errors.confirmName}
                  helperText={errors.confirmName?.message}
                  fullWidth
                />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            color="error"
            disabled={!isNameConfirmed}
          >
            Remove
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const STATUS_OPTIONS = [
  { value: "Emerging", label: "Emerging" },
  { value: "Open", label: "Open" },
];

const SetStatusModal = ({ open, onClose }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: "",
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = handleSubmit((data) => {
    console.log("Set status:", data.status);
    handleClose();
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Set School Status</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <Stack spacing={3}>
            <Controller
              name="status"
              control={control}
              rules={{ required: "Please select a status" }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.status}>
                  <InputLabel>Status</InputLabel>
                  <Select {...field} label="Status">
                    {STATUS_OPTIONS.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.status && (
                    <Typography color="error" variant="caption">
                      {errors.status.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const RemoveSchoolModal = ({ open, onClose, schoolName }) => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      confirmName: "",
    },
  });

  const confirmName = watch("confirmName");
  const isNameConfirmed = schoolName && confirmName === schoolName;

  useEffect(() => {
    if (open) {
      reset({ confirmName: "" });
    }
  }, [open, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = handleSubmit((data) => {
    console.log("Remove school:", schoolName);
    handleClose();
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Remove School</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <Stack spacing={3}>
            <Typography color="error" variant="bodyLarge">
              Warning: This action cannot be undone
            </Typography>
            <Typography>
              To remove "{schoolName}", please type the school name below:
            </Typography>
            <Controller
              name="confirmName"
              control={control}
              rules={{ required: "Please type the school name to confirm" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="School Name"
                  error={!!errors.confirmName}
                  helperText={errors.confirmName?.message}
                  fullWidth
                />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            color="error"
            disabled={!isNameConfirmed}
          >
            Remove School
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SchoolIdPage;
