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
    reset({
      primary_language: currentUser?.attributes?.language,
      ethnicity: currentUser?.attributes?.ethnicity
        ? currentUser?.attributes?.ethnicity
        : [],
      lgbtqia: currentUser?.attributes?.lgbtqia,
      genderIdentity: currentUser?.attributes?.genderIdentity,
      pronouns: currentUser?.attributes?.pronouns,
      householdIncome: currentUser?.attributes?.householdIncome,
    });
  }, [currentUser]);

  const onSubmit = (data) => {
    peopleApi
      .update(currentUser.id, {
        person: {
          primary_language: data.language,
          ethnicity: data.ethnicity,
          lgbtqia: data.lgbtqia,
          genderIdentity: data.genderIdentity,
          pronouns: data.pronouns,
          householdIncome: data.householdIncome,
        },
      })
      .then((response) => {
        if (response.error) {
          console.error(error);
        } else {
          // console.log(data);
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
  const languageOptions = [
    { value: 0, label: "English" },
    { value: 1, label: "Spanish - Español" },
    { value: 2, label: "French - Français" },
    { value: 3, label: "Mandarin - 中文" },
    { value: 4, label: "Arabic - العَرَبِيَّة" },
    { value: 5, label: "Armenian - Հայերեն" },
    { value: 6, label: "Bantu (including Swahili) - Kiswahili" },
    { value: 7, label: "Bengali - বাংলা" },
    { value: 8, label: "Burmese - မြန်မာစာ" },
    { value: 9, label: "Cantonese - Gwóngdūng wá" },
    { value: 10, label: "German - Deutsch" },
    { value: 11, label: "Greek - ελληνικά" },
    { value: 12, label: "Gujarati - ગુજરાતી" },
    { value: 13, label: "Haitian Creole - Kreyol Ayisyen" },
    { value: 14, label: "Hebrew - עברית" },
    { value: 15, label: "Hindi - हिन्दी" },
    { value: 16, label: "Hmong - Hmoob" },
    { value: 17, label: "Italian - Italiano" },
    { value: 18, label: "Japanese - 日本語" },
    { value: 19, label: "Karen" },
    { value: 20, label: "Khmer - ខ្មែរ," },
    { value: 21, label: "Korean - 한국어" },
    { value: 22, label: "Navajo - Diné bizaad" },
    { value: 23, label: "Persian (including Farsi and Dari) - فارسی" },
    { value: 24, label: "Polish - Polski" },
    { value: 25, label: "Portuguese - Português" },
    { value: 26, label: "Punjabi - ਪੰਜਾਬੀ" },
    { value: 27, label: "Russian - русский язык" },
    {
      value: 28,
      label:
        "Serbo-Croatian (including Bosnian, Croatian, Montenegrin and Serbian) - Bosanski Jezik / Hrvatski Jezik / српски језик",
    },
    { value: 29, label: "Tagalog - ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔" },
    { value: 30, label: "Tai-Kadai (including Thai and Lao) - ไทย / ພາສາລາວ" },
    { value: 31, label: "Tami - தமிழ்" },
    { value: 32, label: "Telugu - తెలుగు" },
    { value: 33, label: "Urdu - اُردُو" },
    { value: 34, label: "Vietnamese - Tiếng Việt" },
    { value: 35, label: "Other" },
  ];
  const pronounsOptions = [
    { value: 0, label: "ae/aer/aers" },
    { value: 1, label: "fae/faer/faers" },
    { value: 2, label: "he/him/his" },
    { value: 3, label: "per/per/pers" },
    { value: 4, label: "she/her/hers" },
    { value: 5, label: "they/them/theirs" },
    { value: 6, label: "ve/ver/vis" },
    { value: 7, label: "xe/xem/xyrs" },
    { value: 8, label: "ze/hir/hirs" },
    { value: 9, label: "Not-listed or more specific pronouns" },
  ];
  const genderOptions = [
    { value: 0, label: "Male/Man" },
    { value: 1, label: "Female/Woman" },
    { value: 2, label: "Gender Non-Conforming" },
    { value: 3, label: "A not-listed or more specific gender identity" },
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
