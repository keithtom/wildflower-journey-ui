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
  CircularProgress,
  Chip,
  FormHelperText,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Checkbox,
} from "@mui/material";
import Link from "next/link";
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
  CHARTER_OPTIONS,
} from "@lib/constants/schoolFields";
import { mutate } from "swr";
import useSearch from "@hooks/useSearch";
import schoolRelationshipsApi from "@api/school_relationships";
import schoolsApi from "@api/schools";
import useWorkflow from "@hooks/useWorkflow";
import useWorkflows from "@hooks/workflow/definition/useWorkflows";
import workflowsApi from "@api/workflows";

const SchoolIdPage = () => {
  const router = useRouter();
  const { schoolId } = router.query;
  const { data: school, isLoading } = useSchool(schoolId);

  // useEffect(() => {
  //   console.log("Raw school data:", school);
  // }, [school]);

  const [addPersonModalOpen, setAddPersonModalOpen] = useState(false);
  const [editDetailsModalOpen, setEditDetailsModalOpen] = useState(false);
  const [addWorkflowModalOpen, setAddWorkflowModalOpen] = useState(false);
  const [editPersonModalOpen, setEditPersonModalOpen] = useState(false);
  const [removeWorkflowModalOpen, setRemoveWorkflowModalOpen] = useState(false);
  const [setStatusModalOpen, setSetStatusModalOpen] = useState(false);
  const [removeSchoolModalOpen, setRemoveSchoolModalOpen] = useState(false);
  const [editMemberModalOpen, setEditMemberModalOpen] = useState(false);
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
        key: "location",
        value: school.data.attributes.location || "Not provided",
        icon: <LocationOn />,
      },
      {
        key: "openDate",
        value: school.data.attributes.openedOn
          ? new Date(
              school.data.attributes.openedOn + "T00:00:00.000Z"
            ).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              timeZone: "UTC",
            })
          : "Not provided",
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

    // console.log("Transformed school data:", transformedData);
    return transformedData;
  }, [school]);

  // Transform associated people data
  const { activePeople, formerPeople } = useMemo(() => {
    if (!school?.data?.relationships?.people?.data || !school?.included)
      return { activePeople: [], formerPeople: [] };

    // Create a map to store the most recent record for each person
    const peopleMap = new Map();

    // First, group all school relationships by person_id
    const relationshipsByPerson = school.included
      .filter((item) => item.type === "schoolRelationship")
      .reduce((acc, relationship) => {
        const personId = relationship.relationships?.person?.data?.id;
        if (!personId) return acc;

        if (!acc[personId]) {
          acc[personId] = [];
        }
        acc[personId].push(relationship);
        return acc;
      }, {});

    // For each person, get their most relevant relationship
    Object.entries(relationshipsByPerson).forEach(
      ([personId, relationships]) => {
        // Sort relationships: active first (no end date), then by start date
        const sortedRelationships = relationships.sort((a, b) => {
          // If one is active and other isn't, active comes first
          if (!a.attributes.endDate && b.attributes.endDate) return -1;
          if (a.attributes.endDate && !b.attributes.endDate) return 1;

          // If both active or both inactive, sort by start date
          return (
            new Date(b.attributes.startDate) - new Date(a.attributes.startDate)
          );
        });

        // Get the most relevant relationship
        const mostRelevantRelationship = sortedRelationships[0];

        // Find the person data
        const personData = school.included.find(
          (item) => item.type === "person" && item.id === personId
        );

        if (!personData) return;

        // Transform the role list
        const roleList = mostRelevantRelationship.attributes.roleList || [];
        const transformedRoleList = roleList.map((role) =>
          role === "Wildflower Support" &&
          mostRelevantRelationship.attributes.title
            ? `${mostRelevantRelationship.attributes.title} (WS)`
            : role
        );

        // Create the person object
        const person = {
          id: personData.id,
          firstName: personData.attributes.firstName,
          lastName: personData.attributes.lastName,
          roleList: transformedRoleList,
          imageUrl: personData.attributes.imageUrl,
          startDate: mostRelevantRelationship.attributes.startDate,
          endDate: mostRelevantRelationship.attributes.endDate,
          isOnboarded: personData.attributes.isOnboarded,
          relationshipId: mostRelevantRelationship.id,
        };

        peopleMap.set(personId, person);
      }
    );

    // Convert map to array and separate active and former people
    const allPeople = Array.from(peopleMap.values());

    return {
      activePeople: allPeople.filter(
        (person) => !person.endDate && person.startDate
      ),
      formerPeople: allPeople.filter((person) => person.endDate),
    };
  }, [school]);

  // console.log({ activePeople });
  // console.log({ formerPeople });

  const currentWorkflows = [{ id: 1, name: "School Startup Journey" }];

  const adminActions = [
    {
      id: 3,
      type: "button",
      label: "Set Status",
      description: `Current status: ${
        school?.data?.attributes?.status || "Unknown"
      }`,
      icon: (
        <FiberManualRecord
          color={
            school?.data?.attributes?.status === "Open"
              ? "primary"
              : school?.data?.attributes?.status === "Abandoned"
              ? "error"
              : "secondary"
          }
        />
      ),
      action: () => setSetStatusModalOpen(true),
      color: "primary",
      dataCy: "set-status-button",
    },
    {
      id: 4,
      type: "button",
      label: "Set Membership",
      description: `Current status: ${
        school?.data?.attributes?.affiliated ? "Affiliated" : "Not Affiliated"
      } ${
        school?.data?.attributes?.affiliationDate &&
        school?.data?.attributes?.affiliated
          ? `on ${school?.data?.attributes?.affiliationDate}`
          : ""
      }`,
      icon: <Groups />,
      value: school?.data?.attributes?.affiliated || false,
      action: () => setEditMemberModalOpen(true),
      color: "primary",
      dataCy: "set-membership-button",
    },
    {
      id: 5,
      type: "switch",
      label: "Visible in Directory",
      description: "Control school visibility",
      icon: <Visibility />,
      value: school?.data?.attributes?.directoryVisible || false,
      action: async (checked) => {
        try {
          await schoolsApi.update(schoolId, {
            school: {
              directory_visible: checked,
            },
          });
          // Refresh the school data
          mutate(`/v1/schools/${schoolId}`);
        } catch (err) {
          console.error("Failed to update directory visibility:", err);
        }
      },
      dataCy: "directory-visible-switch",
    },
    {
      id: 2,
      type: "button",
      label: "Remove School",
      description: "Permanently delete this school",
      icon: <Delete />,
      action: () => setRemoveSchoolModalOpen(true),
      color: "error",
      dataCy: "remove-school-button",
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

  const handleAddWorkflow = () => {
    setAddWorkflowModalOpen(true);
  };

  const handleEditPerson = (person) => {
    // Find the school relationship for this person to get their role
    const schoolRelationship = school.included.find(
      (item) =>
        item.type === "schoolRelationship" &&
        item.relationships?.person?.data?.id === person.id &&
        item.relationships?.school?.data?.id === school.data.id
    );

    setSelectedPerson({
      ...person,
      role: schoolRelationship?.attributes?.roleList || [],
      title: schoolRelationship?.attributes?.title || "",
      name: `${person.firstName} ${person.lastName}`,
      schoolRelationshipId: schoolRelationship?.id,
    });
    setEditPersonModalOpen(true);
  };
  // console.log(selectedPerson);

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
    <PageContainer
      isAdmin
      title={school?.data?.attributes?.name}
      data-cy="school-detail"
    >
      <Grid container spacing={6}>
        {/* Left Column */}
        <Grid item xs={12} md={6}>
          <Stack spacing={6}>
            {/* Associated People Section */}
            <Card sx={{ borderRadius: 4 }}>
              <List
                data-cy="person-list"
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
                    <Typography variant="bodyLarge">Current People</Typography>
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
                {activePeople.length === 0 ? (
                  <ListItem>
                    <ListItemText>
                      <Typography
                        variant="bodyRegular"
                        lightened
                        align="center"
                      >
                        No current people
                      </Typography>
                    </ListItemText>
                  </ListItem>
                ) : (
                  activePeople.map((person) => (
                    <ListItem
                      key={person.id}
                      divider
                      data-cy="person-list-item"
                    >
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
                        secondary={person.roleList.join(", ")}
                        primaryTypographyProps={{
                          variant: "bodyRegular",
                        }}
                        secondaryTypographyProps={{
                          variant: "bodySmall",
                        }}
                      />

                      <ListItemSecondaryAction>
                        <Stack direction="row" spacing={2}>
                          <Link href={`/admin/people/${person.id}`}>
                            <Button size="small" variant="text">
                              View
                            </Button>
                          </Link>
                          <Button
                            size="small"
                            onClick={() => handleEditPerson(person)}
                            data-cy="edit-person-button"
                          >
                            Edit
                          </Button>
                        </Stack>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))
                )}
              </List>
              {formerPeople.length > 0 && (
                <>
                  <ListSubheader
                    component="div"
                    sx={{
                      background: "#f1f1f1",
                      paddingX: 4,
                      paddingY: 3,
                      borderTop: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <Typography variant="bodyLarge">Former People</Typography>
                  </ListSubheader>
                  <List>
                    {formerPeople.map((person) => (
                      <ListItem key={person.id} divider disabled>
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
                          secondary={person.roleList.join(", ")}
                          primaryTypographyProps={{
                            variant: "bodyRegular",
                          }}
                          secondaryTypographyProps={{
                            variant: "bodySmall",
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
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
                      data-cy="edit-details-button"
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
                      data-cy="add-workflow-button"
                    >
                      Add Workflow
                    </Button>
                  </ListSubheader>
                }
                data-cy="workflow-list"
              >
                {school?.data?.attributes?.workflowIds?.length > 0 ? (
                  school.data.attributes.workflowIds.map((workflowId) => (
                    <WorkflowItem
                      key={workflowId}
                      workflowId={workflowId}
                      onRemove={handleRemoveWorkflow}
                    />
                  ))
                ) : (
                  <ListItem>
                    <ListItemText>
                      <Typography
                        variant="bodyRegular"
                        lightened
                        align="center"
                      >
                        No workflows assigned
                      </Typography>
                    </ListItemText>
                  </ListItem>
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
        schoolStatus={school?.data?.attributes?.status}
        activePeople={activePeople}
        formerPeople={formerPeople}
      />
      <EditDetailsModal
        open={editDetailsModalOpen}
        onClose={() => setEditDetailsModalOpen(false)}
        school={school}
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
        schoolStatus={school?.data?.attributes?.status}
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
        currentStatus={school?.data?.attributes?.status}
      />
      <RemoveSchoolModal
        open={removeSchoolModalOpen}
        onClose={() => setRemoveSchoolModalOpen(false)}
        schoolName={schoolData.find((item) => item.key === "name")?.value || ""}
      />
      <EditMemberModal
        open={editMemberModalOpen}
        onClose={() => setEditMemberModalOpen(false)}
        school={school}
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

const AddPersonModal = ({
  open,
  onClose,
  schoolStatus,
  activePeople,
  formerPeople,
}) => {
  const router = useRouter();
  const { schoolId } = router.query;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

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
    setError(null);
    onClose();
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await schoolRelationshipsApi.create({
        school_relationship: {
          school_id: schoolId,
          person_id: data.person.id,
          start_date: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
          role_list: [data.role],
          title: data.role === "Wildflower Support" ? data.title : undefined,
        },
      });

      // Refresh the school data
      mutate(`/v1/schools/${schoolId}`);
      handleClose();
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to add person to school"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Use search hook for person lookup
  const {
    query,
    setQuery,
    results: people,
    isSearching,
    setPerPage,
    setFilters,
  } = useSearch();

  useEffect(() => {
    setQuery("*");
    setPerPage(500);
    setFilters({
      models: "people",
      show_all: true,
    });
  }, []);

  // Filter out current school members from the autocomplete options
  const filteredPeople = useMemo(() => {
    if (!people) return [];

    const currentMemberIds = new Set(activePeople.map((person) => person.id));
    return people.filter((person) => !currentMemberIds.has(person.id));
  }, [people, activePeople]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Person</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack spacing={3}>
            <Controller
              name="person"
              control={control}
              rules={{ required: "Please select a person" }}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={filteredPeople || []}
                  getOptionLabel={(option) =>
                    option?.attributes
                      ? `${option.attributes.firstName} ${option.attributes.lastName}`
                      : ""
                  }
                  isOptionEqualToValue={(option, value) =>
                    option?.id === value?.id
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search for a person"
                      error={!!errors.person || !!error}
                      helperText={errors.person?.message || error}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {isSearching ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                      inputProps={{
                        ...params.inputProps,
                        "data-cy": "search-person-input",
                      }}
                    />
                  )}
                  onChange={(_, value) => field.onChange(value)}
                  onInputChange={(_, newInputValue) => {
                    setQuery(newInputValue);
                  }}
                />
              )}
            />

            <Controller
              name="role"
              control={control}
              rules={{ required: "Please select a role" }}
              render={({ field }) => (
                <FormControl
                  error={!!errors.role}
                  fullWidth
                  data-cy="role-select"
                >
                  <InputLabel>Role at school</InputLabel>
                  <Select {...field} label="Role at school">
                    {ROLE_OPTIONS.map((role) => (
                      <MenuItem
                        key={role}
                        value={role}
                        disabled={
                          role === "Emerging Teacher Leader" &&
                          schoolStatus === "Open"
                        }
                      >
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
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            data-cy="add-person-submit"
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Add"
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const EditDetailsModal = ({ open, onClose, school }) => {
  const router = useRouter();
  const { schoolId } = router.query;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: school?.data?.attributes?.name || "",
      about: school?.data?.attributes?.about || "",
      city: school?.data?.attributes?.city || "",
      state: school?.data?.attributes?.state || "",
      openedOn: school?.data?.attributes?.openedOn || "",
      expectedStartDate: school?.data?.attributes?.expectedStartDate || "",
      agesServedList: school?.data?.attributes?.agesServedList || [],
      governanceType: school?.data?.attributes?.governanceType || "",
      maxEnrollment: school?.data?.attributes?.maxEnrollment?.toString() || "",
      numClassrooms: school?.data?.attributes?.numClassrooms?.toString() || "",
      charterString: school?.data?.attributes?.charterString || "",
    },
  });

  const governanceType = watch("governanceType");

  useEffect(() => {
    if (school) {
      reset({
        name: school.data.attributes.name || "",
        about: school.data.attributes.about || "",
        city: school.data.attributes.city || "",
        state: school.data.attributes.state || "",
        openedOn: school.data.attributes.openedOn || "",
        expectedStartDate: school.data.attributes.expectedStartDate || "",
        agesServedList: school.data.attributes.agesServedList || [],
        governanceType: school.data.attributes.governanceType || "",
        maxEnrollment: school.data.attributes.maxEnrollment?.toString() || "",
        numClassrooms: school.data.attributes.numClassrooms?.toString() || "",
        charterString: school.data.attributes.charterString || "",
      });
    }
  }, [school, reset]);

  const handleClose = () => {
    reset();
    setError(null);
    onClose();
  };

  const onSubmit = handleSubmit(async (data) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await schoolsApi.update(schoolId, {
        school: {
          name: data.name,
          about: data.about,
          opened_on: data.openedOn,
          expected_start_date: data.expectedStartDate,
          ages_served_list: data.agesServedList,
          governance_type: data.governanceType,
          max_enrollment: data.maxEnrollment
            ? parseInt(data.maxEnrollment)
            : null,
          num_classrooms: data.numClassrooms
            ? parseInt(data.numClassrooms)
            : null,
          charter_string: data.charterString,
          address_attributes: {
            city: data.city,
            state: data.state,
          },
        },
      });

      // Refresh the school data
      mutate(`/v1/schools/${schoolId}`);
      handleClose();
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to update school details"
      );
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      data-cy="edit-details-modal"
    >
      <DialogTitle>Edit School Details</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <Stack spacing={3}>
            {error && (
              <Typography color="error" variant="bodySmall">
                {error}
              </Typography>
            )}

            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="School Name"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  fullWidth
                  data-cy="school-name-input"
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
                  data-cy="school-about-input"
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
                  data-cy="school-city-input"
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
                    data-cy="school-state-select"
                  >
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
              name="openedOn"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Open Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  data-cy="school-open-date-input"
                />
              )}
            />

            <Controller
              name="expectedStartDate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Expected Start Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  data-cy="school-expected-start-date-input"
                />
              )}
            />

            <Controller
              name="agesServedList"
              control={control}
              render={({ field: { value, onChange, ...field } }) => (
                <FormControl fullWidth error={!!errors.agesServedList}>
                  <InputLabel>Ages Served</InputLabel>
                  <Select
                    {...field}
                    value={value || []}
                    onChange={onChange}
                    multiple
                    label="Ages Served"
                    data-cy="school-ages-served-select"
                  >
                    {AGES_SERVED_OPTIONS.map((age) => (
                      <MenuItem key={age.value} value={age.value}>
                        {age.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.agesServedList && (
                    <Typography color="error" variant="caption">
                      {errors.agesServedList.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />

            <Controller
              name="governanceType"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.governanceType}>
                  <InputLabel>Governance Type</InputLabel>
                  <Select
                    {...field}
                    label="Governance Type"
                    data-cy="school-governance-type-select"
                  >
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
                  data-cy="school-max-enrollment-input"
                />
              )}
            />

            <Controller
              name="numClassrooms"
              control={control}
              rules={{
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
                  data-cy="school-num-classrooms-input"
                />
              )}
            />

            <Controller
              name="charterString"
              control={control}
              rules={{ required: governanceType === "Charter" }}
              render={({ field: { onChange, value, ...field } }) =>
                governanceType === "Charter" && (
                  <FormControl fullWidth error={!!errors.charterString}>
                    <InputLabel id="charter-group-label">
                      Charter Group
                    </InputLabel>
                    <Select
                      {...field}
                      labelId="charter-group-label"
                      id="charter-group-select"
                      value={value || ""}
                      onChange={onChange}
                      label="Charter Group"
                      data-cy="school-charter-group-select"
                    >
                      {CHARTER_OPTIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.charterString && (
                      <FormHelperText error>
                        {errors.charterString.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )
              }
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} data-cy="cancel-edit-school-details">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            data-cy="save-school-details"
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

const AddWorkflowModal = ({ open, onClose }) => {
  const router = useRouter();
  const { schoolId } = router.query;
  const { workflows, isLoading } = useWorkflows();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

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

  // Group workflows by recurring attribute
  const groupedWorkflows = useMemo(() => {
    if (!workflows) return { recurring: [], nonRecurring: [] };

    return workflows.reduce(
      (acc, workflow) => {
        if (workflow.attributes.recurring) {
          acc.recurring.push(workflow);
        } else {
          acc.nonRecurring.push(workflow);
        }
        return acc;
      },
      { recurring: [], nonRecurring: [] }
    );
  }, [workflows]);

  const handleClose = () => {
    reset();
    setError(null);
    onClose();
  };

  const onSubmit = handleSubmit(async (data) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await workflowsApi.create(schoolId, data.workflow);

      // console.log({ data });
      // Refresh the school data
      mutate(`/v1/schools/${schoolId}`);
      handleClose();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to add workflow");
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      data-cy="add-workflow-modal"
    >
      <DialogTitle>Add Workflow</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <Stack spacing={3}>
            {error && (
              <Typography color="error" variant="bodySmall">
                {error}
              </Typography>
            )}
            <Controller
              name="workflow"
              control={control}
              rules={{ required: "Please select a workflow" }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.workflow}>
                  <InputLabel>Workflow</InputLabel>
                  <Select
                    {...field}
                    label="Workflow"
                    disabled={isLoading}
                    data-cy="workflow-select"
                  >
                    {isLoading ? (
                      <MenuItem disabled>Loading workflows...</MenuItem>
                    ) : workflows?.length > 0 ? (
                      [
                        groupedWorkflows.nonRecurring.length > 0 && [
                          <MenuItem
                            key="ssj-header"
                            disabled
                            sx={{
                              opacity: 1,
                              fontWeight: "bold",
                              bgcolor: "background.default",
                              pointerEvents: "none",
                            }}
                          >
                            School Startup Journey
                          </MenuItem>,
                          ...groupedWorkflows.nonRecurring.map((workflow) => (
                            <MenuItem
                              key={workflow.id}
                              value={workflow.id}
                              data-cy={`workflow-option-${workflow.id}`}
                            >
                              <Stack
                                direction="row"
                                spacing={2}
                                alignItems="center"
                              >
                                <Typography>
                                  {workflow.attributes.name}
                                </Typography>
                                <Chip
                                  size="small"
                                  variant="outlined"
                                  label={workflow.attributes.version}
                                />
                              </Stack>
                            </MenuItem>
                          )),
                        ],
                        groupedWorkflows.recurring.length > 0 && [
                          <MenuItem
                            key="osc-header"
                            disabled
                            sx={{
                              opacity: 1,
                              fontWeight: "bold",
                              bgcolor: "background.default",
                              pointerEvents: "none",
                              mt: 1,
                            }}
                          >
                            Open School Checklist
                          </MenuItem>,
                          ...groupedWorkflows.recurring.map((workflow) => (
                            <MenuItem
                              key={workflow.id}
                              value={workflow.id}
                              data-cy={`workflow-option-${workflow.id}`}
                            >
                              <Stack
                                direction="row"
                                spacing={2}
                                alignItems="center"
                              >
                                <Typography>
                                  {workflow.attributes.name}
                                </Typography>
                                <Chip
                                  size="small"
                                  variant="outlined"
                                  label={workflow.attributes.version}
                                />
                              </Stack>
                            </MenuItem>
                          )),
                        ],
                      ]
                        .filter(Boolean)
                        .flat()
                    ) : (
                      <MenuItem disabled>No workflows available</MenuItem>
                    )}
                  </Select>
                  {errors.workflow && (
                    <FormHelperText error>
                      {errors.workflow.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading || isSubmitting}
            data-cy="add-workflow-submit"
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Add"
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const EditPersonModal = ({ open, onClose, person, schoolStatus }) => {
  const router = useRouter();
  const { schoolId } = router.query;
  const [isRemoving, setIsRemoving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      roles: [],
      title: "",
      confirmName: "",
      endDate: new Date().toISOString().split("T")[0],
    },
  });

  const selectedRoles = watch("roles") || [];
  const confirmName = watch("confirmName");
  const isNameConfirmed = person && confirmName === person.name;
  const hasWildflowerSupport = selectedRoles.includes("Wildflower Support");

  useEffect(() => {
    if (person) {
      reset({
        roles: person.role || [],
        title: person.title || "",
        confirmName: "",
        endDate: new Date().toISOString().split("T")[0],
      });
    }
  }, [person, reset]);

  const handleClose = () => {
    reset();
    setIsRemoving(false);
    setError(null);
    onClose();
  };

  const onSubmit = handleSubmit(async (data) => {
    if (isRemoving) {
      setIsSubmitting(true);
      setError(null);

      try {
        await schoolsApi.removePartner(schoolId, person.id, data.endDate);
        mutate(`/v1/schools/${schoolId}`);
        handleClose();
      } catch (err) {
        setError(
          err?.response?.data?.message || "Failed to remove person from school"
        );
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await schoolRelationshipsApi.update(person.schoolRelationshipId, {
        school_relationship: {
          role_list: data.roles,
          title: hasWildflowerSupport ? data.title : undefined,
        },
      });

      mutate(`/v1/schools/${schoolId}`);
      handleClose();
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to update person's role"
      );
    } finally {
      setIsSubmitting(false);
    }
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
            {error && (
              <Typography color="error" variant="bodySmall">
                {error}
              </Typography>
            )}
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
                      data-cy="remove-person-confirm-input"
                    />
                  )}
                />
                <Controller
                  name="endDate"
                  control={control}
                  rules={{ required: "End date is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="End Date"
                      type="date"
                      error={!!errors.endDate}
                      helperText={errors.endDate?.message}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      data-cy="remove-person-end-date"
                    />
                  )}
                />
              </>
            ) : (
              <>
                <FormControl error={!!errors.roles} component="fieldset">
                  <FormLabel component="legend">Roles at school</FormLabel>
                  <Controller
                    name="roles"
                    control={control}
                    rules={{ required: "Please select at least one role" }}
                    render={({ field }) => (
                      <FormGroup data-cy="role-checkboxes">
                        {ROLE_OPTIONS.map((role) => (
                          <FormControlLabel
                            key={role}
                            control={
                              <Checkbox
                                checked={field.value.includes(role)}
                                onChange={(e) => {
                                  const newRoles = e.target.checked
                                    ? [...field.value, role]
                                    : field.value.filter((r) => r !== role);
                                  field.onChange(newRoles);
                                }}
                                data-cy={`role-checkbox-${role}`}
                              />
                            }
                            label={role}
                          />
                        ))}
                      </FormGroup>
                    )}
                  />
                  {errors.roles && (
                    <FormHelperText>{errors.roles.message}</FormHelperText>
                  )}
                </FormControl>

                {hasWildflowerSupport && (
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
                        data-cy="wildflower-support-title"
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
              data-cy="remove-person-button"
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
              data-cy="confirm-remove-person-button"
            >
              Remove
            </Button>
          ) : (
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              data-cy="save-person-role-button"
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Save Changes"
              )}
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};

const RemoveWorkflowModal = ({ open, onClose, workflow }) => {
  const router = useRouter();
  const { schoolId } = router.query;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

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
  const isNameConfirmed = workflow && confirmName === workflow.attributes.name;

  useEffect(() => {
    if (workflow) {
      reset({ confirmName: "" });
    }
  }, [workflow, reset]);

  const handleClose = () => {
    reset();
    setError(null);
    onClose();
  };

  const onSubmit = handleSubmit(async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      await workflowsApi.update(workflow.id, false);
      // Refresh the school data
      mutate(`/v1/schools/${schoolId}`);
      handleClose();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to remove workflow");
    } finally {
      setIsSubmitting(false);
    }
  });

  if (!workflow) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Remove Workflow</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <Stack spacing={3}>
            {error && (
              <Typography color="error" variant="bodySmall">
                {error}
              </Typography>
            )}
            <Typography>
              To remove the workflow "{workflow.attributes.name}", please type
              its name below:
            </Typography>
            <Typography color="error">
              Please be extremely sure that you want to remove this workflow as
              it is costly to reinstate!
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
            disabled={!isNameConfirmed || isSubmitting}
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Remove"
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const STATUS_OPTIONS = [
  { value: "Abandoned", label: "Abandoned" },
  { value: "Emerging", label: "Emerging" },
  { value: "Open", label: "Open" },
  { value: "Paused", label: "Paused" },
];

const SetStatusModal = ({ open, onClose, currentStatus }) => {
  const router = useRouter();
  const { schoolId } = router.query;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: currentStatus || "",
    },
  });

  // Add useEffect to update form when currentStatus changes
  useEffect(() => {
    reset({ status: currentStatus || "" });
  }, [currentStatus, reset]);

  const handleClose = () => {
    reset();
    setError(null);
    onClose();
  };

  const onSubmit = handleSubmit(async (data) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await schoolsApi.update(schoolId, {
        school: {
          status: data.status,
        },
      });

      // Refresh the school data
      mutate(`/v1/schools/${schoolId}`);
      handleClose();
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to update school status"
      );
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      data-cy="set-status-modal"
    >
      <DialogTitle>Set School Status</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <Stack spacing={3}>
            {error && (
              <Typography color="error" variant="bodySmall">
                {error}
              </Typography>
            )}
            <Controller
              name="status"
              control={control}
              rules={{ required: "Please select a status" }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.status}>
                  <InputLabel>Status</InputLabel>
                  <Select {...field} label="Status" data-cy="status-select">
                    {STATUS_OPTIONS.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.status && (
                    <FormHelperText error>
                      {errors.status.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            data-cy="save-status-button"
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Save"
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const RemoveSchoolModal = ({ open, onClose, schoolName }) => {
  const router = useRouter();
  const { schoolId } = router.query;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

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
      setError(null);
    }
  }, [open, reset]);

  const handleClose = () => {
    reset();
    setError(null);
    onClose();
  };

  const onSubmit = handleSubmit(async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      await schoolsApi.remove(schoolId);
      // Redirect to schools list after successful removal
      router.push("/admin/schools");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to remove school");
      setIsSubmitting(false);
    }
  });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      data-cy="remove-school-modal"
    >
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
            {error && (
              <Typography color="error" variant="bodySmall">
                {error}
              </Typography>
            )}
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
                  data-cy="remove-school-confirm-input"
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
            disabled={!isNameConfirmed || isSubmitting}
            data-cy="confirm-remove-school-button"
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Remove School"
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const WorkflowItem = ({ workflowId, onRemove }) => {
  const { workflow, isLoading, isError } = useWorkflow(workflowId);

  if (isLoading) {
    return (
      <ListItem divider>
        <ListItemIcon>
          <Skeleton variant="circular" width={24} height={24} />
        </ListItemIcon>
        <ListItemText>
          <Skeleton variant="text" width={240} />
        </ListItemText>
      </ListItem>
    );
  }

  if (isError || !workflow) {
    return (
      <ListItem divider>
        <ListItemIcon>
          <FiberManualRecord color="error" />
        </ListItemIcon>
        <ListItemText
          primary="Error loading workflow"
          secondary={isError?.message || "Workflow not found"}
        />
      </ListItem>
    );
  }

  return (
    <ListItem divider data-cy="workflow-list-item">
      <ListItemIcon>
        <FiberManualRecord />
      </ListItemIcon>
      <ListItemText
        primary={workflow.attributes.name}
        data-cy="workflow-name"
      />
      <ListItemSecondaryAction>
        <Button
          size="small"
          color="error"
          onClick={() => onRemove(workflow)}
          data-cy="remove-workflow-button"
        >
          Remove
        </Button>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const EditMemberModal = ({ open, onClose, school }) => {
  const router = useRouter();
  const { schoolId } = router.query;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      affiliated: school?.data?.attributes?.affiliated || false,
      affiliationDate: school?.data?.attributes?.affiliationDate || "",
    },
  });

  useEffect(() => {
    if (school) {
      reset({
        affiliated: school.data.attributes.affiliated || false,
        affiliationDate: school.data.attributes.affiliationDate || "",
      });
    }
  }, [school, reset]);

  const handleClose = () => {
    reset();
    setError(null);
    onClose();
  };

  const onSubmit = handleSubmit(async (data) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Only include affiliation_date in the update if:
      // 1. The school is being set to affiliated (true)
      // 2. The school was previously affiliated and has an existing date
      const updateData = {
        affiliated: data.affiliated,
        ...(data.affiliated || school.data.attributes.affiliationDate
          ? { affiliation_date: data.affiliationDate }
          : {}),
      };

      await schoolsApi.update(schoolId, {
        school: updateData,
      });

      // Refresh the school data
      mutate(`/v1/schools/${schoolId}`);
      handleClose();
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to update school member status"
      );
    } finally {
      setIsSubmitting(false);
    }
  });

  const affiliated = watch("affiliated");

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      data-cy="edit-member-modal"
    >
      <DialogTitle>Edit School Member Status</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <Stack spacing={3}>
            {error && (
              <Typography color="error" variant="bodySmall">
                {error}
              </Typography>
            )}
            <Controller
              name="affiliated"
              control={control}
              render={({ field: { value, onChange, ...field } }) => (
                <FormControlLabel
                  control={
                    <Switch
                      checked={value}
                      onChange={(e) => onChange(e.target.checked)}
                      {...field}
                      data-cy="member-switch"
                    />
                  }
                  label="Member"
                />
              )}
            />
            {affiliated ? (
              <Controller
                name="affiliationDate"
                control={control}
                rules={{
                  required: affiliated
                    ? "Affiliation date is required for members"
                    : false,
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Affiliation Date"
                    type="date"
                    fullWidth
                    disabled={
                      !affiliated && !school.data.attributes.affiliationDate
                    }
                    error={!!errors.affiliationDate}
                    helperText={errors.affiliationDate?.message}
                    InputLabelProps={{ shrink: true }}
                    data-cy="affiliation-date-input"
                  />
                )}
              />
            ) : null}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            data-cy="save-membership-button"
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

export default SchoolIdPage;
