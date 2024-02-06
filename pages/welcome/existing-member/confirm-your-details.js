import { useEffect, useState } from "react";
import { styled, css } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import { useUserContext } from "@lib/useUserContext";
import peopleApi from "../../../api/people";
import useAuth from "@lib/utils/useAuth";
import { unitedStatesOptions } from "../../../lib/utils/demographic-options";

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
  Select,
} from "@ui";
import usePerson from "@hooks/usePerson";

const StyledChatBubble = styled(Box)`
  padding: ${({ theme }) => theme.util.buffer * 4}px;
  background-color: ${({ theme }) => theme.color.primary.lightest};
  border-radius: ${({ theme }) => theme.radius.md}px;
  display: inline-block;
  position: relative;
  width: 100%;
  height: auto;
  &:after {
    content: " ";
    position: absolute;
    width: 0;
    height: 0;
    left: 16px;
    right: auto;
    top: auto;
    bottom: -16px;
    border: 20px solid;
    border-color: transparent transparent transparent
      ${({ theme }) => theme.color.primary.lightest};
  }
`;

const ConfirmYourDetails = ({}) => {
  const router = useRouter();
  const { currentUser, setCurrentUser } = useUserContext();

  const { data: personData, isLoading } = usePerson(currentUser?.id);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      city: "",
      state: "",
      email: "",
    },
  });

  useEffect(() => {
    if (currentUser) {
      reset({
        firstName: personData?.data?.attributes?.firstName,
        lastName: personData?.data?.attributes?.firstName,
        city: currentUser?.personAddress?.city,
        state: currentUser?.personAddress?.state,
        email: personData?.data?.attributes?.email,
      });
    }
  }, [currentUser, isLoading]);

  const onSubmit = (data) => {
    const downcasedEmail = data.email.toLowerCase();
    peopleApi
      .update(currentUser.id, {
        person: {
          first_name: data.firstName,
          last_name: data.lastName,
          email: downcasedEmail,
          address_attributes: {
            city: data.city,
            state: data.state,
          },
        },
      })
      .then((response) => {
        if (response.error) {
          console.error(response.error);
        } else {
          const person = response.data.attributes;
          currentUser.attributes.firstName = person.firstName;
          currentUser.attributes.lastName = person.lastName;
          currentUser.attributes.email = person.email;
          setCurrentUser(currentUser);
          router.push("/welcome/existing-member/confirm-demographic-info");
        }
      });
  };

  const isExistingTL = false;
  const introducerProfilePic = "/assets/images/placeholder-flower.png";

  useAuth("/login");

  // console.log({ errors });
  // console.log({ currentUser });

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
                    <StyledChatBubble>
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
                    </StyledChatBubble>
                    <Stack direction="row" spacing={3} alignItems="center">
                      <Avatar size="sm" src={introducerProfilePic} />
                      <Stack>
                        <Typography variant="bodySmall" bold>
                          Katelyn + Cam
                        </Typography>
                        <Typography variant="bodySmall" lightened>
                          Foundation Partners
                        </Typography>
                      </Stack>
                    </Stack>
                  </>
                )}
                <Stack spacing={3}>
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
                      <Select
                        label="State"
                        placeholder="e.g. Massachusetts"
                        options={unitedStatesOptions}
                        error={errors.state}
                        helperText={
                          errors &&
                          errors.state &&
                          errors.state.type === "required" &&
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
                </Stack>
                <Button full disabled={isSubmitting} type="submit">
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
