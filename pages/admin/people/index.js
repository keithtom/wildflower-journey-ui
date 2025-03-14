import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { Person } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { useUserContext } from "@lib/useUserContext";
import useAuth from "@lib/utils/useAuth";
import {
  Box,
  Card,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemIcon,
  ListSubheader,
  Button,
  Grid,
  Stack,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Switch,
  FormHelperText,
  Chip,
  Skeleton,
  CircularProgress,
} from "@mui/material";
import { PageContainer } from "@ui";
import usePersons from "@hooks/usePersons";
import peopleApi from "@api/people";
import { mutate } from "swr";

const AdminPeople = () => {
  const [addPersonModalOpen, setAddPersonModalOpen] = useState(false);
  const { currentUser } = useUserContext();
  const router = useRouter();

  const { people, isLoading } = usePersons({
    lightweight: true,
  });

  console.log({ people });

  useAuth(!currentUser?.attributes?.isAdmin && "/network");

  const handlePersonClick = (personId) => {
    router.push(`/admin/people/${personId}`);
  };

  // Group people by visibility
  const groupedPeople = useMemo(() => {
    if (!people?.data) return { visible: [], notVisible: [] };

    return people.data.reduce(
      (acc, person) => {
        if (person.attributes.active) {
          acc.visible.push(person);
        } else {
          acc.notVisible.push(person);
        }
        return acc;
      },
      { visible: [], notVisible: [] }
    );
  }, [people]);

  console.log({ groupedPeople });

  const PeopleList = ({ people, emptyMessage }) => (
    <List>
      {people.length === 0 ? (
        <ListItem>
          <ListItemText>
            <Typography variant="bodyRegular" lightened align="center">
              {emptyMessage}
            </Typography>
          </ListItemText>
        </ListItem>
      ) : (
        people.map((person, i) => (
          <ListItem
            key={person.id}
            disablePadding
            divider={i !== people.length - 1}
          >
            <ListItemButton onClick={() => handlePersonClick(person.id)}>
              <ListItemIcon>
                <Avatar
                  sx={{
                    bgcolor: "primary.main",
                    width: 32,
                    height: 32,
                  }}
                  src={person.attributes.imageUrl}
                >
                  <Typography variant="bodySmall">
                    {person.attributes.firstName?.[0] || ""}
                    {person.attributes.lastName?.[0] || ""}
                  </Typography>
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary={`${person.attributes.firstName} ${person.attributes.lastName}`}
                secondary={person.attributes.email}
                primaryTypographyProps={{
                  variant: "bodyRegular",
                }}
                secondaryTypographyProps={{
                  variant: "bodySmall",
                }}
              />
              <ListItemSecondaryAction>
                <Stack direction="row" spacing={2}>
                  {person.attributes.roleList?.map((role, index) => (
                    <Chip
                      key={`${role}-${index}`}
                      label={role}
                      size="small"
                      color="default"
                    />
                  ))}
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
          </ListItem>
        ))
      )}
    </List>
  );

  const LoadingList = () => (
    <List>
      {Array.from({ length: 4 }).map((_, index) => (
        <ListItem key={index} divider>
          <ListItemIcon>
            <Skeleton variant="circular" width={24} height={24} />
          </ListItemIcon>
          <ListItemText>
            <Skeleton variant="text" width={240} />
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );

  return (
    <>
      <PageContainer isAdmin title="People">
        <Stack spacing={6}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography variant="bodyLarge">
                {people?.data?.length || 0} people
              </Typography>
            </Grid>
            <Grid item>
              <Button small onClick={() => setAddPersonModalOpen(true)}>
                <Typography variant="bodyRegular" light bold>
                  Add
                </Typography>
              </Button>
            </Grid>
          </Grid>
          <Stack spacing={6}>
            {/* Visible People */}
            <Card sx={{ borderRadius: 4 }}>
              <List
                subheader={
                  <ListSubheader
                    component="div"
                    sx={{
                      background: "#f1f1f1",
                      paddingX: 4,
                      paddingY: 3,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Typography variant="bodyLarge">
                        Visible in Directory
                      </Typography>
                      <Chip
                        label={groupedPeople.visible.length}
                        size="small"
                        color="primary"
                      />
                    </Stack>
                  </ListSubheader>
                }
              >
                {isLoading ? (
                  <LoadingList />
                ) : (
                  <PeopleList
                    people={groupedPeople.visible}
                    emptyMessage="No visible people"
                  />
                )}
              </List>
            </Card>

            {/* Not Visible People */}
            <Card sx={{ borderRadius: 4 }}>
              <List
                subheader={
                  <ListSubheader
                    component="div"
                    sx={{
                      background: "#f1f1f1",
                      paddingX: 4,
                      paddingY: 3,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Typography variant="bodyLarge">
                        Not Visible in Directory
                      </Typography>
                      <Chip
                        label={groupedPeople.notVisible.length}
                        size="small"
                        color="default"
                      />
                    </Stack>
                  </ListSubheader>
                }
              >
                {isLoading ? (
                  <LoadingList />
                ) : (
                  <PeopleList
                    people={groupedPeople.notVisible}
                    emptyMessage="No hidden people"
                  />
                )}
              </List>
            </Card>
          </Stack>
        </Stack>
      </PageContainer>
      <AddPersonModal
        open={addPersonModalOpen}
        onClose={() => setAddPersonModalOpen(false)}
      />
    </>
  );
};

export default AdminPeople;

const AddPersonModal = ({ open, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      visibleInDirectory: true,
    },
  });

  useEffect(() => {
    if (open) {
      reset();
      setError(null);
    }
  }, [open, reset]);

  const handleClose = () => {
    reset();
    setError(null);
    onClose();
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await peopleApi.create({
        person: {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          role_list: data.role ? [data.role] : [],
          show_network: data.visibleInDirectory,
        },
      });
      // Refresh the people list
      await mutate("/v1/people");
      handleClose();
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.error ||
          "An error occurred while creating the person."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 4 },
      }}
    >
      <DialogTitle>Add New Person</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            {error && (
              <Typography color="error" variant="bodySmall">
                {error}
              </Typography>
            )}
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
                  placeholder="e.g. Jane"
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
                  placeholder="e.g. Smith"
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
                  placeholder="e.g. jane.smith@example.com"
                />
              )}
            />
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <FormControl component="fieldset">
                  <FormLabel component="legend">Role (Optional)</FormLabel>
                  <RadioGroup {...field} row>
                    <FormControlLabel
                      value="Foundation Partner"
                      control={<Radio />}
                      label="Foundation Partner"
                    />
                    <FormControlLabel
                      value="Charter Partner"
                      control={<Radio />}
                      label="Charter Partner"
                    />
                  </RadioGroup>
                  {errors.role && (
                    <FormHelperText error>{errors.role.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
            <Controller
              name="visibleInDirectory"
              control={control}
              render={({ field: { value, onChange, ...field } }) => (
                <FormControlLabel
                  control={
                    <Switch
                      {...field}
                      checked={value}
                      onChange={(e) => onChange(e.target.checked)}
                    />
                  }
                  label="Visible in Directory"
                />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            sx={{ minWidth: 100 }}
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Add Person"
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
