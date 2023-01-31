import { useEffect, useState } from "react";
import { styled, css } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";

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
} from "@ui";
import Header from "@components/Header";

const PageContent = styled(Box)`
  flex-grow: 1;
  margin-top: ${({ theme }) => theme.util.appBarHeight}px;
  padding: ${({ theme }) => theme.util.buffer * 6}px;
`;
const ConfirmYourDetails = ({}) => {
  const [userIsEditing, setUserIsEditing] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      city: user.city,
      state: user.state,
      email: user.email,
    },
  });
  const onSubmit = (data) => console.log(data);

  const isExistingTL = false;

  return (
    <>
      <Header user={false} />
      <PageContent>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card>
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
                        <Icon type="star" variant="primary" />
                        <Typography variant="bodySmall">
                          This helps us understand and notify you of what
                          support networks you can tap into and what resources
                          are available to you.
                        </Typography>
                      </Stack>
                    </Card>
                    <Stack direction="row" spacing={3} alignItems="center">
                      <Avatar
                        size="sm"
                        src="https://images.unsplash.com/photo-1589317621382-0cbef7ffcc4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80"
                      />
                      <Stack>
                        <Typography variant="bodySmall" bold>
                          Mary Truman
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
                  <form onSubmit={handleSubmit(onSubmit)}>
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
                          <Button
                            small
                            onClick={() => setUserIsEditing(false)}
                            disabled={isSubmitting}
                            type="submit"
                          >
                            <Typography variant="bodySmall" bold light>
                              Save
                            </Typography>
                          </Button>
                        ) : (
                          <IconButton onClick={() => setUserIsEditing(true)}>
                            <Icon
                              type="pencil"
                              variant="primary"
                              size="small"
                            />
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
                                  {user.firstName} {user.lastName}
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
                                  {user.city}
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
                                  {user.state}
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
                                  {user.email}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Card>
                        </>
                      )}
                    </Stack>
                  </form>
                </Card>
                <Link href="/welcome/confirm-demographic-info">
                  <Button full disabled={userIsEditing}>
                    <Typography variant="bodyRegular" light>
                      Confirm
                    </Typography>
                  </Button>
                </Link>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </PageContent>
    </>
  );
};

export default ConfirmYourDetails;

const user = {
  firstName: "Jane",
  lastName: "Smith",
  city: "Boston",
  state: "Massachusetts",
  email: "jane.smith@gmail.com",
};
