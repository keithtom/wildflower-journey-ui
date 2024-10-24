import { useEffect, useState } from "react";
import { styled, css } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import { FormControlLabel, RadioGroup, FormHelperText } from "@mui/material";
import { useRouter } from "next/router";
import { useUserContext } from "@lib/useUserContext";
import peopleApi from "../../../api/people";
import {
  lgbtqiaOptions,
  montessoriCertificationOptions,
  levelsOfMontessoriCertification,
  incomeOptions,
  languageOptions,
  pronounsOptions,
  genderOptions,
  ethnicityOptions,
  roleOptions,
} from "../../../lib/utils/demographic-options";
import useAuth from "@lib/utils/useAuth";

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
  PageContainer,
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

const ConfirmDemographicInfo = ({}) => {
  const router = useRouter();
  const { currentUser } = useUserContext();

  const { data: personData, isLoading } = usePerson(currentUser?.id);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      primaryLanguage: "",
      primaryLanguageOther: "",
      raceEthnicity: [],
      raceEthnicityOther: "",
      lgbtqia: "",
      gender: "",
      genderOther: "",
      pronouns: "",
      pronounsOther: "",
      householdIncome: "",
      montessoriCertified: "",
      montessoriCertifiedLevels: [],
      classroomAge: [],
      role: [],
    },
  });

  useEffect(() => {
    if (currentUser) {
      reset({
        primaryLanguage: personData?.data?.attributes?.primaryLanguage || "",
        primaryLanguageOther:
          personData?.data?.attributes?.primaryLanguageOther || "",
        raceEthnicity: personData?.data?.attributes?.raceEthnicityList || [],
        raceEthnicityOther:
          personData?.data?.attributes?.raceEthnicityOther || "",
        lgbtqia: personData?.data?.attributes?.lgbtqia,
        gender: personData?.data?.attributes?.gender || "",
        genderOther: personData?.data?.attributes?.genderOther || "",
        pronouns: personData?.data?.attributes?.pronouns || "",
        pronounsOther: personData?.data?.attributes?.pronounsOther || "",
        householdIncome: personData?.data?.attributes?.householdIncome || "",
        montessoriCertified:
          personData?.data?.attributes?.montessoriCertified || "",
        montessoriCertifiedLevels:
          personData?.data?.attributes?.montessoriCertifiedLevelList || [],
        classroomAge: personData?.data?.attributes?.classroomAgeList || [],
        role: personData?.data?.attributes?.roleList || [],
        is_onboarded: true,
      });
    }
  }, [currentUser, isLoading]);

  const onSubmit = (data) => {
    // console.log("classroomAge: ", data.classroomAge);
    peopleApi
      .update(currentUser.id, {
        person: {
          primary_language: data.primaryLanguage,
          primary_language_other: data.primaryLanguageOther,
          race_ethnicity_list: data.raceEthnicity, // FIX: multi select with other, it uses tags, how is this sent when multiple options?
          race_ethnicity_other: data.raceEthnicityOther,
          lgbtqia: data.lgbtqia,
          gender: data.gender,
          gender_other: data.genderOther,
          pronouns: data.pronouns,
          pronouns_other: data.pronounsOther,
          household_income: data.householdIncome,
          montessori_certified: data.montessoriCertified,
          montessori_certified_level_list: data.montessoriCertifiedLevels,
          classroom_age_list: data.classroomAge,
          role_list: data.role,
          is_onboarded: true,
        },
      })
      .then((response) => {
        if (response.error) {
          console.error(error);
        } else {
          router.push("/welcome/existing-member/add-profile-info");
        }
      });
  };

  const watchFields = watch();
  const isExistingTL = false;
  const introducerProfilePic = "/assets/images/placeholder-flower.png";
  const isCertifiedOrSeeking =
    watchFields.montessoriCertified === "Yes" ||
    watchFields.montessoriCertified === "Currently Seeking Certification";
  const showCustomEthnicityField = watchFields?.raceEthnicity?.includes(
    "A not-listed or more specific ethnicity"
  );
  const showCustomLanguageField = watchFields.primaryLanguage === "other";
  const showCustomGenderField =
    watchFields.gender === "A not-listed or more specific gender identity";
  const showCustomPronounsField =
    watchFields.pronouns === "Not-listed or more specific pronouns";

  useAuth("/login");
  // console.log({ watchFields });

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
                      Confirm your demographic info
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
                          This information can potentially help with finding
                          additional funding for your school or connect you with
                          affinity groups to further build community and
                          support.
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

                <Controller
                  name="primaryLanguage"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      label="What is your primary language?"
                      placeholder="Select a language..."
                      options={languageOptions}
                      error={errors.primaryLanguage}
                      helperText={
                        errors &&
                        errors.primaryLanguage &&
                        errors.primaryLanguage.type === "required" &&
                        "This field is required"
                      }
                      {...field}
                    />
                  )}
                />
                {showCustomLanguageField ? (
                  <Controller
                    name="primaryLanguageOther"
                    control={control}
                    rules={{
                      required: false,
                    }}
                    render={({ field }) => (
                      <TextField
                        label="Other language"
                        placeholder="e.g. Your language"
                        error={errors.primaryLanguageOther}
                        helperText={
                          errors &&
                          errors.primaryLanguageOther &&
                          errors.primaryLanguageOther.type === "required" &&
                          "This field is required"
                        }
                        {...field}
                      />
                    )}
                  />
                ) : null}
                <Controller
                  name="raceEthnicity"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <MultiSelect
                      withCheckbox
                      label="What is your ethnicity?"
                      placeholder="Select as many as you like..."
                      options={ethnicityOptions}
                      error={errors.raceEthnicity}
                      defaultValue={[]}
                      helperText={
                        errors &&
                        errors.raceEthnicity &&
                        errors.raceEthnicity.type === "required" &&
                        "This field is required"
                      }
                      {...field}
                    />
                  )}
                />
                {showCustomEthnicityField ? (
                  <Controller
                    name="raceEthnicityOther"
                    control={control}
                    rules={{
                      required: false,
                    }}
                    render={({ field }) => (
                      <TextField
                        label="Other ethnicity"
                        placeholder="e.g. Your ethnicity"
                        error={errors.raceEthnicityOther}
                        helperText={
                          errors &&
                          errors.raceEthnicityOther &&
                          errors.raceEthnicityOther.type === "required" &&
                          "This field is required"
                        }
                        {...field}
                      />
                    )}
                  />
                ) : null}
                <Stack spacing={1}>
                  <Typography variant="bodyRegular">
                    Do you identify as a member of the LGBTQIA community?
                  </Typography>
                  <Controller
                    name="lgbtqia"
                    control={control}
                    rules={{ required: false }}
                    render={({ field: { onChange, value } }) => (
                      <RadioGroup value={value}>
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
                  <FormHelperText error={errors.lgbtqia}>
                    {errors &&
                      errors.lgbtqia &&
                      errors.lgbtqia.type === "required" &&
                      "This field is required"}
                  </FormHelperText>
                </Stack>
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      label="What is your gender identity?"
                      placeholder="Select one..."
                      options={genderOptions}
                      error={errors.gender}
                      helperText={
                        errors &&
                        errors.gender &&
                        errors.gender.type === "required" &&
                        "This field is required"
                      }
                      {...field}
                    />
                  )}
                />
                {showCustomGenderField ? (
                  <Controller
                    name="genderOther"
                    control={control}
                    rules={{
                      required: false,
                    }}
                    render={({ field }) => (
                      <TextField
                        label="Other gender"
                        placeholder="e.g. Your gender"
                        error={errors.genderOther}
                        helperText={
                          errors &&
                          errors.genderOther &&
                          errors.genderOther.type === "required" &&
                          "This field is required"
                        }
                        {...field}
                      />
                    )}
                  />
                ) : null}
                <Controller
                  name="pronouns"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      label="What are your pronouns?"
                      placeholder="Select one..."
                      options={pronounsOptions}
                      error={errors.pronouns}
                      helperText={
                        errors &&
                        errors.pronouns &&
                        errors.pronouns.type === "required" &&
                        "This field is required"
                      }
                      value={field.value}
                      {...field}
                    />
                  )}
                />
                {showCustomPronounsField ? (
                  <Controller
                    name="pronounsOther"
                    control={control}
                    rules={{
                      required: false,
                    }}
                    render={({ field }) => (
                      <TextField
                        label="Other pronouns"
                        placeholder="e.g. Your pronouns"
                        error={errors.pronounsOther}
                        helperText={
                          errors &&
                          errors.pronounsOther &&
                          errors.pronounsOther.type === "required" &&
                          "This field is required"
                        }
                        {...field}
                      />
                    )}
                  />
                ) : null}
                <Stack spacing={1}>
                  <Typography variant="bodyRegular">
                    How would you describe the economic situation in your
                    household while you were growing up?
                  </Typography>
                  <Typography variant="bodyRegular" lightened>
                    As a reference point, today a family of four with a family
                    income of $47,638/year is the limit to receive subsidies.
                  </Typography>
                  <Typography variant="bodySmall" lightened>
                    NOTE: This answer will not appear publicly or on your
                    profile in the Wildflower network.
                  </Typography>
                  <Controller
                    name="householdIncome"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <RadioGroup value={value}>
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
                  <FormHelperText error={errors.householdIncome}>
                    {errors &&
                      errors.householdIncome &&
                      errors.householdIncome.type === "required" &&
                      "This field is required"}
                  </FormHelperText>
                </Stack>
                <Stack spacing={1}>
                  <Typography variant="bodyRegular">
                    Are you Montessori Certified?
                  </Typography>
                  <Controller
                    name="montessoriCertified"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <RadioGroup value={value}>
                        {montessoriCertificationOptions.map((o, i) => (
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
                  <FormHelperText error={errors.montessoriCertified}>
                    {errors &&
                      errors.montessoriCertified &&
                      errors.montessoriCertified.type === "required" &&
                      "This field is required"}
                  </FormHelperText>
                </Stack>
                {isCertifiedOrSeeking ? (
                  <Controller
                    name="montessoriCertifiedLevels"
                    control={control}
                    rules={{ required: isCertifiedOrSeeking ? true : false }}
                    render={({ field }) => (
                      <MultiSelect
                        withCheckbox
                        label="What Levels are you certified (or seeking certification) for?"
                        placeholder="Select as many as you like..."
                        options={levelsOfMontessoriCertification}
                        error={errors.montessoriCertifiedLevels}
                        defaultValue={[]}
                        helperText={
                          errors &&
                          errors.montessoriCertifiedLevels &&
                          errors.montessoriCertifiedLevels.type ===
                            "required" &&
                          "This field is required"
                        }
                        {...field}
                      />
                    )}
                  />
                ) : null}

                <Controller
                  name="role"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <MultiSelect
                      withCheckbox
                      label="What is your role at Wildflower Schools?"
                      placeholder="Select all roles you hold..."
                      options={roleOptions}
                      error={errors.role}
                      defaultValue={[]}
                      helperText={
                        errors &&
                        errors.role &&
                        errors.role.type === "required" &&
                        "This field is required"
                      }
                      {...field}
                    />
                  )}
                />

                <Typography variant="bodySmall" lightened>
                  This information is only used for anonymous reporting reasons
                  and will never be shared outside the Wildflower Schools
                  network without your prior written consent.
                </Typography>

                <Grid container spacing={3} justifyContent="space-between">
                  <Grid item xs={6}>
                    <Link href="/welcome/existing-member/confirm-your-details">
                      <Button full variant="secondary">
                        <Typography variant="bodyRegular">Back</Typography>
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item xs={6}>
                    <Button full disabled={isSubmitting} type="submit">
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
    </PageContainer>
  );
};

export default ConfirmDemographicInfo;
