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

const ConfirmDemographicInfo = ({}) => {
  const router = useRouter();
  const { currentUser } = useUserContext();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (currentUser) {
      peopleApi.show(currentUser.id).then((response) => {
        const person = response.data.data.relationships?.person?.data;
        console.log("person", person)
        // SAVEPOINT this request is working.  need to make sure data is persisted and returned
        // and then loaded into form.  then we are done here.
        reset({
          primary_language: person?.attributes?.primaryLanguage,
          ethnicity: person?.attributes?.raceEthnicity || [], // add raceEthinicityOther
          lgbtqia: person?.attributes?.lgbtqia,
          genderIdentity: person?.attributes?.gender, // add genderOther
          pronouns: person?.attributes?.pronouns, // add pronounsOther
          householdIncome: person?.attributes?.householdIncome,
        });
      });
    }
  }, [currentUser]);

  const onSubmit = (data) => {
    peopleApi
      .update(currentUser.id, {
        person: {
          primary_language: data.language,
          race_ethnicity: data.ethnicity,  // FIX: multi select with other, it uses tags, how is this sent when multiple options?
          lgbtqia: data.lgbtqia,
          gender: data.genderIdentity,
          gender_other: null, // add to form.
          pronouns: data.pronouns,
          pronouns_other: null, // add to form
          household_income: data.householdIncome,
        },
      })
      .then((response) => {
        if (response.error) {
          console.error(error);
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
    { value: "High Income", label: "High Income" },
    { value: "Medium Income", label: "Medium Income" },
    { value: "Low Income", label: "Low Income" },
  ];
  const languageOptions = [
    { value: "English", label: "English" },
    { value: "Spanish - Español", label: "Spanish - Español" },
    { value: "French - Français", label: "French - Français" },
    { value: "Mandarin - 中文", label: "Mandarin - 中文" },
    { value: "Arabic - العَرَبِيَّة", label: "Arabic - العَرَبِيَّة" },
    { value: "Armenian - Հայերեն", label: "Armenian - Հայերեն" },
    { value: "Bantu (including Swahili) - Kiswahili", label: "Bantu (including Swahili) - Kiswahili" },
    { value: "Bengali - বাংলা", label: "Bengali - বাংলা" },
    { value: "Burmese - မြန်မာစာ", label: "Burmese - မြန်မာစာ" },
    { value: "Cantonese - Gwóngdūng wá", label: "Cantonese - Gwóngdūng wá" },
    { value: "German - Deutsch", label: "German - Deutsch" },
    { value: "Greek - ελληνικά", label: "Greek - ελληνικά" },
    { value: "Gujarati - ગુજરાતી" , label: "Gujarati - ગુજરાતી" },
    { value: "Haitian Creole - Kreyol Ayisyen", label: "Haitian Creole - Kreyol Ayisyen" },
    { value: "Hebrew - עברית", label: "Hebrew - עברית" },
    { value: "Hindi - हिन्दी", label: "Hindi - हिन्दी" },
    { value: "Hmong - Hmoob", label: "Hmong - Hmoob" },
    { value: "Italian - Italiano", label: "Italian - Italiano" },
    { value: "Japanese - 日本語", label: "Japanese - 日本語" },
    { value: "Karen", label: "Karen" },
    { value: "Khmer - ខ្មែរ,", label: "Khmer - ខ្មែរ," },
    { value: "Korean - 한국어", label: "Korean - 한국어" },
    { value: "Navajo - Diné bizaad", label: "Navajo - Diné bizaad" },
    { value: "Persian (including Farsi and Dari) - فارسی", label: "Persian (including Farsi and Dari) - فارسی" },
    { value: "Polish - Polski", label: "Polish - Polski" },
    { value: "Portuguese - Português", label: "Portuguese - Português" },
    { value: "Punjabi - ਪੰਜਾਬੀ", label: "Punjabi - ਪੰਜਾਬੀ" },
    { value: "Russian - русский язык", label: "Russian - русский язык" },
    {
      value: "Serbo-Croatian (including Bosnian, Croatian, Montenegrin and Serbian) - Bosanski Jezik / Hrvatski Jezik / српски језик",
      label:
        "Serbo-Croatian (including Bosnian, Croatian, Montenegrin and Serbian) - Bosanski Jezik / Hrvatski Jezik / српски језик",
    },
    { value: "Tagalog - ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔", label: "Tagalog - ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔" },
    { value: "Tai-Kadai (including Thai and Lao) - ไทย / ພາສາລາວ", label: "Tai-Kadai (including Thai and Lao) - ไทย / ພາສາລາວ" },
    { value: "Tami - தமிழ்", label: "Tami - தமிழ்" },
    { value: "Telugu - తెలుగు", label: "Telugu - తెలుగు" },
    { value:  "Urdu - اُردُو", label: "Urdu - اُردُو" },
    { value: "Vietnamese - Tiếng Việt", label: "Vietnamese - Tiếng Việt" },
    { value: "Other", label: "Other" },
  ];
  const pronounsOptions = [
    { value:  "ae/aer/aers", label: "ae/aer/aers" },
    { value: "fae/faer/faers", label: "fae/faer/faers" },
    { value: "he/him/his", label: "he/him/his" },
    { value: "per/per/pers", label: "per/per/pers" },
    { value: "she/her/hers", label: "she/her/hers" },
    { value: "they/them/theirs", label: "they/them/theirs" },
    { value: "ve/ver/vis", label: "ve/ver/vis" },
    { value: "xe/xem/xyrs", label: "xe/xem/xyrs" },
    { value: "ze/hir/hirs", label: "ze/hir/hirs" },
    { value: "Other", label: "Not-listed or more specific pronouns" },
  ];
  const genderOptions = [
    { value: "Male", label: "Male/Man" },
    { value: "Female", label: "Female/Woman" },
    { value: "Gender Non-Conforming", label: "Gender Non-Conforming" },
    { value: "Other", label: "A not-listed or more specific gender identity" },
  ];
  const ethnicityOptions = [
    { value: 0, label: "American Indian or Alaska Native" },
    { value: 1, label: "Asian" },
    { value: 2, label: "Black or African American" },
    { value: 3, label: "Hispanic, Latinx, or Spanish Origin" },
    { value: 4, label: "Native Hawaiian or Other Pacific Islander" },
    { value: 5, label: "Middle Eastern or North African" },
    { value: 6, label: "White" },
    { value: 7, label: "A not-listed or more specific gender identity" },
  ];

  const watchFields = watch();
  const isExistingTL = false;
  const opsGuide = currentUser?.attributes?.ssj?.opsGuide?.data?.attributes;

  console.log({ currentUser });

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
                    <Card variant="primaryLightened" size="small">
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
                    </Card>
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
                  name="primary_language"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      label="What is your primary language?"
                      placeholder="Select a language..."
                      options={languageOptions.map((l) => l.label)}
                      error={errors.primary_language}
                      helperText={
                        errors &&
                        errors.primary_language &&
                        errors.primary_language &&
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
                      options={ethnicityOptions.map((l) => l.label)}
                      error={errors.ethnicity}
                      defaultValue={[]}
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
                  name="genderIdentity"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      label="What is your gender identity?"
                      placeholder="Select one..."
                      options={genderOptions.map((l) => l.label)}
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
                      options={pronounsOptions.map((l) => l.label)}
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
                <Stack spacing={1}>
                  <Typography variant="bodyRegular">
                    What is your household income?
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
                  <FormHelperText error={errors.lgbtqia}>
                    {errors &&
                      errors.lgbtqia &&
                      errors.lgbtqia.type === "required" &&
                      "This field is required"}
                  </FormHelperText>
                </Stack>

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
