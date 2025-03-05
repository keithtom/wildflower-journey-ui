import { useState } from "react";
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
} from "@mui/material";
import { PageContainer } from "@ui";
const AdminPeople = () => {
  const [addPersonModalOpen, setAddPersonModalOpen] = useState(false);
  const { currentUser } = useUserContext();
  const router = useRouter();

  // Mock data - replace with actual API integration later
  const people = [
    {
      id: "1",
      attributes: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        role: "Teacher",
        status: "Active",
      },
    },
    {
      id: "2",
      attributes: {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        role: "Administrator",
        status: "Active",
      },
    },
    {
      id: "3",
      attributes: {
        firstName: "Bob",
        lastName: "Wilson",
        email: "bob.wilson@example.com",
        role: "Principal",
        status: "Inactive",
      },
    },
  ];

  const isLoading = false; // Replace with actual loading state

  useAuth(!currentUser?.attributes?.isAdmin && "/network");

  const handlePersonClick = (personId) => {
    router.push(`/admin/people/${personId}`);
  };

  return (
    <>
      <PageContainer isAdmin title="People">
        <Stack spacing={6}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography variant="bodyLarge">
                {people?.length || 0} people
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
          <Grid container>
            <Grid item xs={12}>
              <Card sx={{ borderRadius: 4 }}>
                <List>
                  {isLoading ? (
                    Array.from({ length: 8 }).map((_, index) => (
                      <ListItem key={index} divider>
                        <ListItemIcon>
                          <Skeleton variant="circular" width={24} height={24} />
                        </ListItemIcon>
                        <ListItemText>
                          <Skeleton variant="text" width={240} />
                        </ListItemText>
                      </ListItem>
                    ))
                  ) : people?.length === 0 ? (
                    <ListItem>
                      <ListItemText>
                        <Typography
                          variant="bodyRegular"
                          lightened
                          align="center"
                        >
                          No people yet
                        </Typography>
                      </ListItemText>
                    </ListItem>
                  ) : (
                    people?.map((person, i) => (
                      <ListItem
                        key={person.id}
                        disablePadding
                        divider={i !== people.length - 1}
                      >
                        <ListItemButton
                          onClick={() => handlePersonClick(person.id)}
                        >
                          <ListItemIcon>
                            <Avatar
                              sx={{
                                bgcolor: "primary.main",
                                width: 32,
                                height: 32,
                              }}
                            >
                              <Typography variant="bodySmall">
                                {person.attributes.firstName[0]}
                                {person.attributes.lastName[0]}
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
                              <Chip
                                label={person.attributes.role}
                                size="small"
                                color="default"
                              />
                              <Chip
                                label={person.attributes.status}
                                size="small"
                                color={
                                  person.attributes.status === "Active"
                                    ? "primary"
                                    : "default"
                                }
                              />
                            </Stack>
                          </ListItemSecondaryAction>
                        </ListItemButton>
                      </ListItem>
                    ))
                  )}
                </List>
              </Card>
            </Grid>
          </Grid>
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
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      visibleInDirectory: true,
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = handleSubmit((data) => {
    console.log("Add person form data:", data);
    // Handle person creation here
    handleClose();
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Person</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
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
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            Add Person
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
