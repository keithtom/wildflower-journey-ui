import { useEffect, useState } from "react";
import { styled, css } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import { FormControlLabel, RadioGroup, FormHelperText } from "@mui/material";
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
  PageContainer,
} from "@ui";

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
    },
  });

  useEffect(() => {
    if (currentUser) {
      peopleApi.show(currentUser.id).then((response) => {
        const person = response.data.data;
        console.log("person", person);
        // SAVEPOINT this request is working.  need to make sure data is persisted and returned
        // and then loaded into form.  then we are done here.
        reset({
          primaryLanguage: person?.attributes?.primaryLanguage || "",
          primaryLanguageOther: person?.attributes?.primaryLanguageOther || "",
          raceEthnicity: person?.attributes?.raceEthnicityList || [],
          raceEthnicityOther: person?.attributes?.raceEthnicityOther || "",
          lgbtqia: person?.attributes?.lgbtqia || "",
          gender: person?.attributes?.gender || "",
          genderOther: person?.attributes?.genderOther || "",
          pronouns: person?.attributes?.pronouns || "",
          pronounsOther: person?.attributes?.pronounsOther || "",
          householdIncome: person?.attributes?.householdIncome || "",
          montessoriCertified: person?.attributes?.montessoriCertified || "",
          montessoriCertifiedLevels:
            person?.attributes?.montessoriCertifiedLevelList || [],
          classroomAge: person?.attributes?.classroomAgeList || [],
        });
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          router.push("/login");
        } else {
          console.error(error);
        }
      });
    }
  }, [currentUser]);

  const onSubmit = (data) => {
    console.log("classroomAge: ", data.classroomAge);
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
        },
      })
      .then((response) => {
        if (response.error) {
          console.error(error);
        } else {
          router.push("/welcome/add-profile-info");
        }
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          router.push("/login");
        } else {
          console.error(error);
        }
      });
  };

  const lgbtqiaOptions = [
    { value: true, label: "Yes" },
    { value: false, label: "No" },
  ];
  const montessoriCertificationOptions = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
    {
      value: "Currently Seeking Certification",
      label: "Currently Seeking Certification",
    },
  ];
  const levelsOfMontessoriCertification = [
    { value: "Infant/Toddler", label: "Infant/Toddler" },
    { value: "Primary/Early Childhood", label: "Primary/Early Childhood" },
    { value: "6-9 ELementary", label: "6-9 Elementary" },
    { value: "6-12 Elementary", label: "6-12 Elementary" },
    { value: "12-15 Secondary", label: "12-15 Secondary" },
    { value: "15-18 Secondary", label: "15-18 Secondary" },
    { value: "Administrator", label: "Administrator" },
    { value: "Leadership", label: "Leadership" },
  ];
  const ageClassroomsInterestedInOffering = [
    { value: "Infants", label: "Infants" },
    { value: "Toddlers", label: "Toddlers" },
    { value: "Primary", label: "Primary" },
    { value: "Lower Elementary", label: "Lower Elementary" },
    { value: "Upper Elementary", label: "Upper Elementary" },
    { value: "Adolescent", label: "Adolescent" },
    { value: "High School", label: "High School" },
  ];
  const incomeOptions = [
    {
      value: "High Income",
      label:
        "High Income (ex. I did not, or would not, qualify for financial aid in college.)",
    },
    {
      value: "Medium Income",
      label:
        "Middle Income (ex. I did, or would, qualify for financial aid in college.)",
    },
    {
      value: "Low Income",
      label:
        "Low Income (ex. My family was eligible for food subsidies at school.)",
    },
  ];
  const languageOptions = [
    { value: "English", label: "English" },
    { value: "Spanish - Español", label: "Spanish - Español" },
    { value: "French - Français", label: "French - Français" },
    { value: "Mandarin - 中文", label: "Mandarin - 中文" },
    { value: "Arabic - العَرَبِيَّة", label: "Arabic - العَرَبِيَّة" },
    { value: "Armenian - Հայերեն", label: "Armenian - Հայերեն" },
    {
      value: "Bantu (including Swahili) - Kiswahili",
      label: "Bantu (including Swahili) - Kiswahili",
    },
    { value: "Bengali - বাংলা", label: "Bengali - বাংলা" },
    { value: "Burmese - မြန်မာစာ", label: "Burmese - မြန်မာစာ" },
    { value: "Cantonese - Gwóngdūng wá", label: "Cantonese - Gwóngdūng wá" },
    { value: "German - Deutsch", label: "German - Deutsch" },
    { value: "Greek - ελληνικά", label: "Greek - ελληνικά" },
    { value: "Gujarati - ગુજરાતી", label: "Gujarati - ગુજરાતી" },
    {
      value: "Haitian Creole - Kreyol Ayisyen",
      label: "Haitian Creole - Kreyol Ayisyen",
    },
    { value: "Hebrew - עברית", label: "Hebrew - עברית" },
    { value: "Hindi - हिन्दी", label: "Hindi - हिन्दी" },
    { value: "Hmong - Hmoob", label: "Hmong - Hmoob" },
    { value: "Italian - Italiano", label: "Italian - Italiano" },
    { value: "Japanese - 日本語", label: "Japanese - 日本語" },
    { value: "Karen", label: "Karen" },
    { value: "Khmer - ខ្មែរ,", label: "Khmer - ខ្មែរ," },
    { value: "Korean - 한국어", label: "Korean - 한국어" },
    { value: "Navajo - Diné bizaad", label: "Navajo - Diné bizaad" },
    {
      value: "Persian (including Farsi and Dari) - فارسی",
      label: "Persian (including Farsi and Dari) - فارسی",
    },
    { value: "Polish - Polski", label: "Polish - Polski" },
    { value: "Portuguese - Português", label: "Portuguese - Português" },
    { value: "Punjabi - ਪੰਜਾਬੀ", label: "Punjabi - ਪੰਜਾਬੀ" },
    { value: "Russian - русский язык", label: "Russian - русский язык" },
    {
      value:
        "Serbo-Croatian (including Bosnian, Croatian, Montenegrin and Serbian) - Bosanski Jezik / Hrvatski Jezik / српски језик",
      label:
        "Serbo-Croatian (including Bosnian, Croatian, Montenegrin and Serbian) - Bosanski Jezik / Hrvatski Jezik / српски језик",
    },
    { value: "Tagalog - ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔", label: "Tagalog - ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔" },
    {
      value: "Tai-Kadai (including Thai and Lao) - ไทย / ພາສາລາວ",
      label: "Tai-Kadai (including Thai and Lao) - ไทย / ພາສາລາວ",
    },
    { value: "Tami - தமிழ்", label: "Tami - தமிழ்" },
    { value: "Telugu - తెలుగు", label: "Telugu - తెలుగు" },
    { value: "Urdu - اُردُو", label: "Urdu - اُردُو" },
    { value: "Vietnamese - Tiếng Việt", label: "Vietnamese - Tiếng Việt" },
    { value: "Other", label: "Other" },
  ];
  const pronounsOptions = [
    { value: "ae/aer/aers", label: "ae/aer/aers" },
    { value: "fae/faer/faers", label: "fae/faer/faers" },
    { value: "he/him/his", label: "he/him/his" },
    { value: "per/per/pers", label: "per/per/pers" },
    { value: "she/her/hers", label: "she/her/hers" },
    { value: "they/them/theirs", label: "they/them/theirs" },
    { value: "ve/ver/vis", label: "ve/ver/vis" },
    { value: "xe/xem/xyrs", label: "xe/xem/xyrs" },
    { value: "ze/hir/hirs", label: "ze/hir/hirs" },
    {
      value: "Not-listed or more specific pronouns",
      label: "Not-listed or more specific pronouns",
    },
  ];
  const genderOptions = [
    { value: "Male", label: "Male/Man" },
    { value: "Female", label: "Female/Woman" },
    { value: "Gender Non-Conforming", label: "Gender Non-Conforming" },
    {
      value: "A not-listed or more specific gender identity",
      label: "A not-listed or more specific gender identity",
    },
  ];
  const ethnicityOptions = [
    {
      value: "American Indian or Alaska Native",
      label: "American Indian or Alaska Native",
    },
    { value: "Asian", label: "Asian" },
    { value: "Black or African American", label: "Black or African American" },
    {
      value: "Hispanic, Latinx, or Spanish Origin",
      label: "Hispanic, Latinx, or Spanish Origin",
    },
    {
      value: "Native Hawaiian or Other Pacific Islander",
      label: "Native Hawaiian or Other Pacific Islander",
    },
    {
      value: "Middle Eastern or North African",
      label: "Middle Eastern or North African",
    },
    { value: "White", label: "White" },
    {
      value: "A not-listed or more specific ethnicity",
      label: "A not-listed or more specific ethnicity",
    },
  ];

  const watchFields = watch();
  const isExistingTL = false;
  const opsGuide = currentUser?.attributes?.ssj?.opsGuide?.data?.attributes;
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
                    {opsGuide ? (
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
                    ) : null}
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
                      options={languageOptions.map((l) => l.label)}
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
                      options={ethnicityOptions.map((l) => l.label)}
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
                      options={genderOptions.map((l) => l.label)}
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
                      options={pronounsOptions.map((l) => l.label)}
                      error={errors.pronouns}
                      helperText={
                        errors &&
                        errors.pronouns &&
                        errors.pronouns.type === "required" &&
                        "This field is required"
                      }
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
                      <RadioGroup value={value} handleOptionsChange>
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
                        options={levelsOfMontessoriCertification.map(
                          (l) => l.label
                        )}
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
                  name="classroomAge"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <MultiSelect
                      withCheckbox
                      label="What Age Classrooms are you interested in offering?"
                      placeholder="Select as many as you like..."
                      options={ageClassroomsInterestedInOffering.map(
                        (l) => l.label
                      )}
                      error={errors.classroomAge}
                      defaultValue={[]}
                      helperText={
                        errors &&
                        errors.classroomAge &&
                        errors.classroomAge.type === "required" &&
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
                    <Link href="/welcome/confirm-your-details">
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
