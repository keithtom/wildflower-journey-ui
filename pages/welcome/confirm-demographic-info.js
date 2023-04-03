import { useEffect, useState } from "react";
import { styled, css } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import { FormControlLabel, RadioGroup } from "@mui/material";
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
  Select,
  MultiSelect,
  Radio,
} from "@ui";
import Header from "@components/Header";

const PageContent = styled(Box)`
  flex-grow: 1;
  margin-top: ${({ theme }) => theme.util.appBarHeight}px;
  padding: ${({ theme }) => theme.util.buffer * 6}px;
`;
const ConfirmDemographicInfo = ({}) => {
  const [userIsEditing, setUserIsEditing] = useState(false);
  const router = useRouter();
  const { currentUser } = useUserContext();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({
    defaultValues: {
      language: user.language,
      ethnicity: user.ethnicity,
      lgbtqia: user.lgbtqia,
      genderIdentity: user.genderIdentity,
      pronouns: user.pronouns,
      householdIncome: user.householdIncome,
    },
  });
  const onSubmit = (data) => {
    peopleApi.update(currentUser.id, { person: { 
      primary_language: data.language,  
      ethnicity: data.ethnicity,
      lgbtqia: data.lgbtqia,
      genderIdentity: data.genderIdentity,
      pronouns: data.pronouns,
      householdIncome: data.householdIncome,
    }})
    .then(response => {
      if (response.error) {
        console.error(error)
      } else {
        router.push("/welcome/add-profile-info");
      }
    });
  };

  const lgbtqiaOptions = [
    { value: true, label: "Yes" },
    { value: false, label: "No" },
  ];
  const incomeOptions = [
    { value: 0, label: "High Income" },
    { value: 1, label: "Medium Income" },
    { value: 2, label: "Low Income" },
  ];

  const isExistingTL = false;

  return (
    <>
      <Header user={false} />
      <PageContent>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={6}>
                  <Grid container justifyContent="center">
                    <Grid item>
                      <Typography variant="h4" bold>
                        Confirm your demographic info
                      </Typography>
                    </Grid>
                  </Grid>
                  {isExistingTL ? null : (
                    <>
                      <Card variant="primaryLightened" size="small">
                        <Stack direction="row" spacing={3}>
                          <Icon type="star" variant="primary" />
                          <Typography variant="bodySmall">
                            This information can potentially help with finding
                            additional funding for your school or connect you
                            with affinity groups to further build community and
                            support.
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
                    <Stack spacing={3}>
                      <Stack
                        justifyContent="space-between"
                        alignItems="center"
                        direction="row"
                      >
                        <Typography variant="bodyRegular" bold lightened>
                          Your demographic info
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
                            name="language"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Select
                                label="What is your primary language?"
                                placeholder="Select a language..."
                                options={["English", "Spanish"]}
                                error={errors.language}
                                helperText={
                                  errors &&
                                  errors.language &&
                                  errors.language &&
                                  "This field is required"
                                }
                                {...field}
                              />
                            )}
                          />
                          <Controller
                            name="ethnicity"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <MultiSelect
                                label="What is your ethnicity?"
                                placeholder="Select as many as you like..."
                                options={["Asian", "White"]}
                                error={errors.ethnicity}
                                helperText={
                                  errors &&
                                  errors.ethnicity &&
                                  errors.ethnicity &&
                                  "This field is required"
                                }
                                {...field}
                              />
                            )}
                          />
                          <Controller
                            name="lgbtqia"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, value } }) => (
                              <RadioGroup value={value} handleOptionsChange>
                                {lgbtqiaOptions.map((o, i) => (
                                  <FormControlLabel
                                    key={i}
                                    value={o.value}
                                    control={<Radio />}
                                    label={o.label}
                                    onChange={onChange}
                                  />
                                ))}
                              </RadioGroup>
                            )}
                          />
                          <Controller
                            name="genderIdentity"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Select
                                label="What is your gender identity?"
                                placeholder="Select one..."
                                options={[
                                  "Male/Man",
                                  "Female/Woman",
                                  "Gender Non-Conforming",
                                  "A not-listed or more specific gender identity",
                                ]}
                                error={errors.genderIdentity}
                                helperText={
                                  errors &&
                                  errors.genderIdentity &&
                                  errors.genderIdentity &&
                                  "This field is required"
                                }
                                {...field}
                              />
                            )}
                          />
                          <Controller
                            name="pronouns"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Select
                                label="What are your pronouns?"
                                placeholder="Select one..."
                                options={[
                                  "ae/aer/aers",
                                  "fae/faer/faers",
                                  "he/him/his",
                                  "per/per/pers",
                                  "she/her/hers",
                                  "they/them/theirs",
                                  "ve/ver/vis",
                                  "xe/xem/xyrs",
                                  "ze/hir/hirs",
                                  "Not-listed or more specific pronouns",
                                ]}
                                error={errors.genderIdentity}
                                helperText={
                                  errors &&
                                  errors.genderIdentity &&
                                  errors.genderIdentity &&
                                  "This field is required"
                                }
                                {...field}
                              />
                            )}
                          />
                          <Controller
                            name="householdIncome"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, value } }) => (
                              <RadioGroup value={value} handleOptionsChange>
                                {incomeOptions.map((o, i) => (
                                  <FormControlLabel
                                    key={i}
                                    value={o.value}
                                    control={<Radio />}
                                    label={o.label}
                                    onChange={onChange}
                                  />
                                ))}
                              </RadioGroup>
                            )}
                          />
                        </>
                      ) : (
                        <>
                          <Card size="small" noBorder>
                            <Grid container>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="bodyMini" lightened>
                                  LANGUAGE
                                </Typography>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="bodySmall">
                                  {user.language}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Card>
                          <Card size="small" noBorder>
                            <Grid container>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="bodyMini" lightened>
                                  ETHNICITY
                                </Typography>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="bodySmall">
                                  {user.ethnicity.map((e, i) => `${e}, `)}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Card>
                          <Card size="small" noBorder>
                            <Grid container>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="bodyMini" lightened>
                                  LGBTQIA
                                </Typography>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="bodySmall">
                                  {user.lgbtqia === true ? "Yes" : "No"}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Card>
                          <Card size="small" noBorder>
                            <Grid container>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="bodyMini" lightened>
                                  GENDER IDENTITY
                                </Typography>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="bodySmall">
                                  {user.genderIdentity}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Card>
                          <Card size="small" noBorder>
                            <Grid container>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="bodyMini" lightened>
                                  PRONOUNS
                                </Typography>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="bodySmall">
                                  {user.pronouns}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Card>
                          <Card size="small" noBorder>
                            <Grid container>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="bodyMini" lightened>
                                  HOUSEHOLD INCOME
                                </Typography>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="bodySmall">
                                  {user.householdIncome}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Card>
                        </>
                      )}
                    </Stack>
                  </Card>
                  <Typography variant="bodySmall" lightened>
                    This information is only used for anonymous reporting
                    reasons and will never be shared outside the Wildflower
                    Schools network without your prior written consent.
                  </Typography>

                  <Grid container spacing={3} justifyContent="space-between">
                    <Grid item xs={6}>
                      <Link href="/welcome/confirm-your-details">
                        <Button
                          full
                          disabled={userIsEditing}
                          variant="secondary"
                        >
                          <Typography variant="bodyRegular">Back</Typography>
                        </Button>
                      </Link>
                    </Grid>
                    <Grid item xs={6}>
                      <Button full disabled={userIsEditing} type="submit">
                        <Typography variant="bodyRegular" light>
                          Confirm
                        </Typography>
                      </Button>
                    </Grid>
                  </Grid>
                </Stack>
              </form>
            </Card>
          </Grid>
        </Grid>
      </PageContent>
    </>
  );
};

export default ConfirmDemographicInfo;

const user = {
  language: "English",
  ethnicity: ["Asian", "White"],
  lgbtqia: true,
  genderIdentity: "Gender Non-Conforming",
  pronouns: "They/Them/Theirs",
  householdIncome: "Middle Income",
};
