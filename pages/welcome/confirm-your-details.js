import { useEffect, useState } from "react";
import { styled, css } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import { useUserContext } from "@lib/useUserContext";
import peopleApi from "../../api/people";

import {
  Button,
  Grid,
  Stack,
  Typography,
  Card,
  Box,
  Icon,
  Avatar,
  Link,
  IconButton,
  TextField,
  PageContainer,
} from "@ui";

const ConfirmYourDetails = ({}) => {
  const [userIsEditing, setUserIsEditing] = useState(false);
  const router = useRouter();
  const { currentUser, setCurrentUser } = useUserContext();

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm();

  useEffect(() => {
    reset({
      firstName: currentUser?.attributes.firstName,
      lastName: currentUser?.attributes.lastName,
      city: currentUser?.attributes.city,
      state: currentUser?.attributes.state,
      email: currentUser?.attributes.email,
    });
  }, [currentUser]);

  const onSubmit = (data) => {
    peopleApi
      .update(currentUser.id, {
        person: {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          address_attributes: {
            city: data.city,
            state: data.state,
          },
        },
      })
      .then((response) => {
        if (response.error) {
          console.error(error);
        } else {
          const person = response.data.attributes;
          currentUser.attributes.firstName = person.firstName;
          currentUser.attributes.lastName = person.lastName;
          currentUser.attributes.email = person.email;
          setCurrentUser(currentUser);
          setUserIsEditing(false);
        }
      });
  };

  const handleConfirm = () => {
    router.push("/welcome/confirm-demographic-info");
  };

  const watchFields = watch();
  const isExistingTL = false;
  const opsGuide = currentUser?.attributes.ssj.opsGuide.data.attributes;

  console.log({ errors });
  // console.log({ currentUser });
  console.log({ watchFields });
  console.log({ isValid });
  console.log({ userIsEditing });

  return (
    <PageContainer isLoading={!currentUser} hideNav>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={6}>
                <Grid container justifyContent="center">
                  <Grid item>
                    <Typography variant="h4" bold>
                      Confirm your personal details
                    </Typography>
                  </Grid>
                </Grid>
                {isExistingTL ? null : (
                  <>
                    <Card variant="primaryLightened" size="small">
                      <Stack direction="row" spacing={3}>
                        <Grid item>
                          <Icon type="star" variant="primary" />
                        </Grid>
                        <Typography variant="bodySmall">
                          This helps us understand and notify you of what
                          support networks you can tap into and what resources
                          are available to you.
                        </Typography>
                      </Stack>
                    </Card>
                    <Stack direction="row" spacing={3} alignItems="center">
                      <Avatar size="sm" src={opsGuide?.imageUrl} />
                      <Stack>
                        <Typography variant="bodySmall" bold>
                          {opsGuide?.firstName} {opsGuide?.lastName}
                        </Typography>
                        <Typography variant="bodySmall" lightened>
                          Operations Guide
                        </Typography>
                      </Stack>
                    </Stack>
                  </>
                )}
                <Card
                  variant={userIsEditing ? null : "lightened"}
                  sx={{ width: "100%" }}
                  size="small"
                >
                  <Stack spacing={3}>
                    <Stack
                      justifyContent="space-between"
                      alignItems="center"
                      direction="row"
                    >
                      <Typography variant="bodyRegular" bold lightened>
                        Your personal details
                      </Typography>
                      {userIsEditing ? (
                        <Button small disabled={isSubmitting} type="submit">
                          <Typography variant="bodySmall" bold light>
                            Save
                          </Typography>
                        </Button>
                      ) : (
                        <IconButton onClick={() => setUserIsEditing(true)}>
                          <Icon type="pencil" variant="primary" size="small" />
                        </IconButton>
                      )}
                    </Stack>
                    {userIsEditing ? (
                      <>
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
                          name="city"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <TextField
                              label="City"
                              placeholder="e.g. Boston"
                              error={errors.city}
                              helperText={
                                errors &&
                                errors.city &&
                                errors.city &&
                                "This field is required"
                              }
                              {...field}
                            />
                          )}
                        />
                        <Controller
                          name="state"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <TextField
                              label="State"
                              placeholder="e.g. Massachusetts"
                              error={errors.state}
                              helperText={
                                errors &&
                                errors.state &&
                                errors.state &&
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
                      </>
                    ) : (
                      <>
                        <Card size="small" noBorder>
                          <Grid container>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="bodyMini" lightened>
                                NAME
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="bodySmall">
                                {watchFields.firstName
                                  ? watchFields.firstName
                                  : `-`}
                                {` `}
                                {watchFields.lastName
                                  ? watchFields.lastName
                                  : `-`}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Card>
                        <Card size="small" noBorder>
                          <Grid container>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="bodyMini" lightened>
                                CITY
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="bodySmall">
                                {watchFields.city ? watchFields.city : `-`}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Card>
                        <Card size="small" noBorder>
                          <Grid container>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="bodyMini" lightened>
                                STATE
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="bodySmall">
                                {watchFields.state ? watchFields.state : `-`}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Card>
                        <Card size="small" noBorder>
                          <Grid container>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="bodyMini" lightened>
                                EMAIL
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="bodySmall">
                                {watchFields.email ? watchFields.email : `-`}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Card>
                      </>
                    )}
                  </Stack>
                </Card>
                <Button
                  full
                  disabled={userIsEditing || !isValid}
                  onClick={handleConfirm}
                >
                  <Typography variant="bodyRegular" light>
                    Confirm
                  </Typography>
                </Button>
              </Stack>
            </form>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ConfirmYourDetails;
