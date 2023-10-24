import { CopyToClipboard } from "react-copy-to-clipboard";
import Head from "next/head";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { FormControlLabel, RadioGroup, FormHelperText } from "@mui/material";

import { styled } from "@mui/material/styles";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType
);
import { getCookie } from "cookies-next";
import { FileChecksum } from "@lib/rails-filechecksum";
import { clearLoggedInState } from "@lib/handleLogout";

import axios from "axios";

const token = getCookie("auth");

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
  unitedStatesOptions,
} from "../../../../lib/utils/demographic-options";
import { useUserContext } from "@lib/useUserContext";
import {
  Divider,
  Alert,
  Box,
  PageContainer,
  Button,
  Grid,
  Typography,
  Stack,
  Card,
  Avatar,
  AvatarGroup,
  IconButton,
  Icon,
  Modal,
  DatePicker,
  TextField,
  Chip,
  Link,
  Radio,
  MultiSelect,
  Select,
  Spinner,
} from "@ui";
import ProfileHero from "@components/ProfileHero";
import AttributesCard from "@components/AttributesCard";
import SchoolCard from "@components/SchoolCard";
import peopleApi from "@api/people";

const Person = ({}) => {
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const { currentUser } = useUserContext();

  const router = useRouter();
  const { personId } = router.query;

  // api js files should return key and fetcher for each api call.  peopleApi.show.key and show.fetcher, or peopleApi.key('show', personId)
  const { data, error, isLoading, mutate } = useSWR(
    personId ? `/api/person/${personId}` : null,
    () => peopleApi.show(personId, { network: true }).then((res) => res.data),
    {
      onErrorRetry: (error) => {
        if (error?.response?.status === 401) {
          clearLoggedInState({});
          router.push("/login");
        } else {
          console.error(error);
        }
      },
    }
  );

  if (error)
    return (
      <PageContainer isLoading={true}>
        failed to load ${error.message}
      </PageContainer>
    );
  if (isLoading || !data) return <PageContainer isLoading={true} />;
  // if (!data.data) return <div>loading...</div>;

  const person = data.data;
  const included = data.included;

  const isMyProfile = currentUser?.id === personId;
  const hasSchool = person.relationships.schools.length;
  const hasContact = person.attributes.email || person.attributes.phone;
  const hasAttributes =
    person.attributes.location ||
    person.attributes.primaryLanguage ||
    person.attributes.raceEthnicityList.length ||
    person.attributes.pronouns ||
    person.attributes.montessoriCertifiedLevelList.length;
  const hasInfo =
    person.attributes.about ||
    person.attributes.rolesResonsibilities ||
    person.attributes.boardMemberOf;

  const findMatchingItems = (array1, array2, property) => {
    const matchingItems = array1.filter((item1) =>
      array2.some((item2) => item1[property] === item2[property])
    );
    return matchingItems;
  };
  const userSchool = findMatchingItems(
    included,
    person.relationships.schools.data,
    "id"
  );

  // console.log({ person });
  // console.log({ currentUser });
  // console.log({ included });
  // console.log({ userSchool });

  return (
    <>
      <PageContainer>
        <Stack spacing={6}>
          <ProfileHero
            profileImage={person.attributes?.imageUrl}
            firstName={person.attributes?.firstName}
            lastName={person.attributes?.lastName}
            roles={person.attributes?.roleList}
            school={person.attributes?.school?.name}
            schoolLogo={person.attributes?.school?.logoUrl}
            location={person.attributes?.location}
          />

          <Grid container spacing={8}>
            <Grid item xs={12} md={hasInfo ? 4 : 12}>
              <Stack spacing={6}>
                {hasSchool ? (
                  schoolLink ? (
                    <Card>
                      <Stack spacing={3}>
                        <Link href={schoolLink}>
                          <img
                            src={logoImg}
                            style={{
                              objectFit: "contain",
                              height: "100%",
                              width: "100%",
                            }}
                          />
                        </Link>
                        <Stack>
                          <Typography variant="bodyLarge" lightened>
                            {school}
                          </Typography>
                          <Typography variant="bodyRegular" lightened>
                            {location}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Card>
                  ) : null
                ) : null}
                {hasContact ? (
                  <Card>
                    <Stack spacing={2}>
                      {person?.attributes?.email ? (
                        <Stack spacing={1}>
                          <Typography variant="bodySmall" bold lightened>
                            EMAIL
                          </Typography>
                          <Typography variant="bodyRegular">
                            {person?.attributes?.email}
                          </Typography>
                        </Stack>
                      ) : null}
                      {person?.attributes?.phone ? (
                        <Stack spacing={1}>
                          <Typography variant="bodySmall" bold lightened>
                            PHONE
                          </Typography>
                          <Typography variant="bodyRegular">
                            {person?.attributes?.phone}
                          </Typography>
                        </Stack>
                      ) : null}
                    </Stack>
                  </Card>
                ) : null}
                {hasAttributes ? (
                  <AttributesCard
                    state={person?.attributes?.location}
                    language={person?.attributes?.primaryLanguage}
                    ethnicity={person?.attributes?.raceEthnicityList}
                    pronouns={person?.attributes?.pronouns}
                    montessoriCertification={
                      person?.attributes?.montessoriCertifiedLevelList
                    }
                  />
                ) : null}
                {isMyProfile ? (
                  <Button
                    variant="lightened"
                    full
                    onClick={() => setEditProfileModalOpen(true)}
                  >
                    <Stack direction="row" spacing={3} alignItems="center">
                      <Icon type="pencil" size="small" />
                      <Typography variant="bodyRegular" bold>
                        Edit profile
                      </Typography>
                    </Stack>
                  </Button>
                ) : null}
              </Stack>
            </Grid>
            {hasInfo ? (
              <Grid item sm={12} md={8}>
                <Stack spacing={12}>
                  {person?.attributes?.about ? (
                    <Stack spacing={3}>
                      <Typography variant="h4" bold>
                        About me
                      </Typography>
                      <Typography variant="bodyLarge">
                        {person.attributes.about}
                      </Typography>
                    </Stack>
                  ) : null}
                  {person?.attributes?.rolesResonsibilities ? (
                    <Grid container>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="h4" bold>
                          Roles and responsibilities
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={3}>
                          {person.attributes.rolesResonsibilities.map(
                            (r, i) => (
                              <Typography variant="bodyLarge" key={i}>
                                {r}
                              </Typography>
                            )
                          )}
                        </Stack>
                      </Grid>
                    </Grid>
                  ) : null}
                  {userSchool.length ? (
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="h4" bold>
                          School
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={3}>
                          {userSchool.map((s, i) => (
                            <SchoolCard
                              key={i}
                              schoolName={s.attributes.name}
                              logo={s.attributes.logoUrl}
                              location={s.attributes.location}
                              link={`/network/schools/${s.id}`}
                            />
                          ))}
                        </Stack>
                      </Grid>
                    </Grid>
                  ) : null}
                  {person?.attributes?.boardMemberOf ? (
                    <Grid container>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="h4" bold>
                          Board member
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={3}>
                          {person.attributes.boardMemberOf.map((b, i) => (
                            <SchoolCard
                              key={i}
                              schoolName={b.name}
                              logo={b.logoUrl}
                              location={b.location}
                              link={`/network/schools/${b.id}`}
                            />
                          ))}
                        </Stack>
                      </Grid>
                    </Grid>
                  ) : null}
                </Stack>
              </Grid>
            ) : null}
          </Grid>
        </Stack>
      </PageContainer>
      <EditProfileModal
        toggle={() => setEditProfileModalOpen(!editProfileModalOpen)}
        open={editProfileModalOpen}
        setEditProfileModalOpen={setEditProfileModalOpen}
        mutate={mutate}
      />
    </>
  );
};

export default Person;

const StyledFilePond = styled(FilePond)`
  .filepond--root {
    font-family: ${({ theme }) => theme.typography.family};
  }
  .filepond--panel-root {
    background-color: ${({ theme }) => theme.color.neutral.lightened};
  }
`;

const EditProfileModal = ({
  mutate,
  setEditProfileModalOpen,
  toggle,
  open,
}) => {
  const { currentUser, setCurrentUser } = useUserContext();
  const [profilePicture, setProfilePicture] = useState();
  const [profileImage, setProfileImage] = useState();
  const [showError, setShowError] = useState();
  const [isUpdatingPicture, setIsUpdatingPicture] = useState(false);
  const handleFileError = (error) => {
    setShowError(error);
  };

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      city: "",
      state: "",
      email: "",
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
      about: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (currentUser) {
      peopleApi.show(currentUser.id).then((response) => {
        const person = response.data.data;

        // SAVEPOINT this request is working.  need to make sure data is persisted and returned
        // and then loaded into form.  then we are done here.
        reset({
          firstName: currentUser?.attributes.firstName,
          lastName: currentUser?.attributes.lastName,
          city: currentUser?.personAddress.city,
          state: currentUser?.personAddress.state,
          email: currentUser?.attributes.email,
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
          role: person?.attributes?.roleList || [],
          about: person?.attributes?.about || "",
          phone: person?.attributes?.phone || "",
        });
      });
    }
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
          about: data.about,
          phone: data.phone,
          profile_image: profileImage,
        },
      })
      .then((response) => {
        if (response.error) {
          console.error(error);
        } else {
          // const person = response.data.attributes;
          // currentUser.attributes.firstName = person.firstName;
          // currentUser.attributes.lastName = person.lastName;
          // currentUser.attributes.email = person.email;
          // currentUser.attributes.imageUrl = person.attributes.imageUrl;
          setProfilePicture(null);
          setCurrentUser(currentUser);
          mutate();
          setEditProfileModalOpen(false);
        }
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          clearLoggedInState({});
          router.push("/login");
        } else {
          console.error(error);
        }
      });
  };

  const watchFields = watch();
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

  return (
    <Modal toggle={toggle} open={open} title="Edit your profile">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={6}>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                label="First name"
                placeholder="e.g. Jane"
                error={errors.firstName}
                helperText={
                  errors &&
                  errors.firstName &&
                  errors.firstName.type === "required" &&
                  "This field is required"
                }
                {...field}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField
                label="Last name"
                placeholder="e.g. Smith"
                error={errors.lastName}
                helperText={
                  errors &&
                  errors.lastName &&
                  errors.lastName.type === "required" &&
                  "This field is required"
                }
                {...field}
              />
            )}
          />
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <TextField
                label="City"
                placeholder="e.g. Boston"
                error={errors.city}
                helperText={
                  errors &&
                  errors.city &&
                  errors.city.type === "required" &&
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
            render={({ field }) => (
              <TextField
                label="Email"
                placeholder="e.g. jane.smith@gmail.com"
                error={errors.email}
                helperText={
                  errors &&
                  errors.email &&
                  errors.email.type === "required" &&
                  "This field is required"
                }
                {...field}
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <TextField
                label="Phone"
                placeholder="e.g. (123) 456 7890"
                error={errors.phone}
                helperText={
                  errors &&
                  errors.phone &&
                  errors.phone.type === "required" &&
                  "This field is required"
                }
                {...field}
              />
            )}
          />
          <Controller
            name="about"
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <TextField
                label="About"
                placeholder="e.g. Your bio"
                multiline={true}
                rows={4}
                error={errors.about}
                helperText={
                  errors &&
                  errors.about &&
                  errors.about.type === "required" &&
                  "This field is required"
                }
                {...field}
              />
            )}
          />

          <Controller
            name="primaryLanguage"
            control={control}
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
              How would you describe the economic situation in your household
              while you were growing up?
            </Typography>
            <Typography variant="bodyRegular" lightened>
              As a reference point, today a family of four with a family income
              of $47,638/year is the limit to receive subsidies.
            </Typography>
            <Typography variant="bodySmall" lightened>
              NOTE: This answer will not appear publicly or on your profile in
              the Wildflower network.
            </Typography>
            <Controller
              name="householdIncome"
              control={control}
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
                    errors.montessoriCertifiedLevels.type === "required" &&
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

          <Divider />
          {showError ? (
            <Grid container>
              <Grid item xs={12}>
                <Alert severity="error">
                  <Stack>
                    {showError.main}
                    <Typography variant="bodySmall" error>
                      {showError.sub}
                    </Typography>
                  </Stack>
                </Alert>
              </Grid>
            </Grid>
          ) : null}
          <Typography variant="bodyRegular">Add a new profile image</Typography>
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={8} md={6}>
              <StyledFilePond
                files={profilePicture}
                allowReorder={false}
                allowMultiple={false}
                maxFileSize="5MB"
                acceptedFileTypes={["image/*"]}
                onupdatefiles={setProfilePicture}
                onaddfilestart={() => setIsUpdatingPicture(true)}
                onprocessfiles={() => setIsUpdatingPicture(false)}
                stylePanelAspectRatio="1:1"
                onerror={handleFileError}
                stylePanelLayout="circle"
                server={{
                  process: (
                    fieldName,
                    file,
                    metadata,
                    load,
                    error,
                    progress,
                    abort,
                    transfer,
                    options
                  ) => {
                    // https://github.com/pqina/filepond/issues/279#issuecomment-479961967
                    FileChecksum.create(file, (checksum_error, checksum) => {
                      if (checksum_error) {
                        console.error(checksum_error);
                        error();
                      }
                      axios
                        .post(
                          `${process.env.API_URL}/rails/active_storage/direct_uploads`,
                          {
                            blob: {
                              filename: file.name,
                              content_type: file.type,
                              byte_size: file.size,
                              checksum: checksum,
                            },
                          }
                        )
                        .then((response) => {
                          if (!response.data) {
                            return error;
                          }
                          const signed_id = response.data.signed_id;
                          axios
                            .put(response.data.direct_upload.url, file, {
                              headers: response.data.direct_upload.headers,
                              onUploadProgress: (progressEvent) => {
                                progress(
                                  progressEvent.lengthComputable,
                                  progressEvent.loaded,
                                  progressEvent.total
                                );
                              },
                              // need to remove default Authorization header when sending to s3
                              transformRequest: (data, headers) => {
                                if (process.env !== "local") {
                                  delete headers.common["Authorization"];
                                }
                                return data;
                              },
                            })
                            .then((response) => {
                              setProfileImage(signed_id);
                              load(signed_id);
                            })
                            .catch((error) => {
                              if (!axios.isCancel(error)) {
                                console.error(error);
                                // error();
                              }
                            });
                        })
                        .catch((error) => {
                          console.log(error);
                          console.error(error);
                        });
                    });
                    return {
                      abort: () => {
                        // This function is entered if the user has tapped the cancel button
                        // request.abort(); TODO: is there an active storage abort?

                        // Let FilePond know the request has been cancelled
                        abort();
                      },
                    };
                  },
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                  ondata: (formData) => {
                    formData.append("blob", value);
                    return formData;
                  },
                  onload: () => {
                    props.onUploadComplete();
                  },
                }}
                credits={false}
                labelIdle='Drag & Drop your profile picture or <span class="filepond--label-action">Browse</span>'
              />
            </Grid>
          </Grid>
          <Divider />
        </Stack>
        <Card
          noBorder
          noRadius
          sx={{
            position: "sticky",
            bottom: -24,
            zIndex: 2,
            paddingLeft: 0,
          }}
        >
          <Stack direction="row" spacing={3} alignItems="center">
            <Button
              small
              disabled={!isDirty || isUpdatingPicture || isSubmitting}
              type="submit"
            >
              <Typography variant="bodyRegular" bold>
                Save
              </Typography>
            </Button>
            {isUpdatingPicture && (
              <Typography variant="bodyRegular" lightened>
                Updating profile image...
              </Typography>
            )}
          </Stack>
        </Card>
      </form>
    </Modal>
  );
};
