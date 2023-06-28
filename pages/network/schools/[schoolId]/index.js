import Head from "next/head";
import { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { FormControlLabel, RadioGroup, FormHelperText } from "@mui/material";
import { clearLoggedInState } from "@lib/handleLogout";

import schoolApi from "@api/schools";
import {
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
} from "@ui";
import SchoolHero from "@components/SchoolHero";
import AttributesCard from "@components/AttributesCard";
import UserCard from "@components/UserCard";

const School = ({}) => {
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [claimSchoolModalOpen, setClaimSchoolModalOpen] = useState(false);

  const router = useRouter();
  const { schoolId } = router.query;
  console.log("schoolId", schoolId);

  // api js files should return key and fetcher for each api call.  peopleApi.show.key and show.fetcher, or peopleApi.key('show', personId)
  const { data, error, isLoading, mutate } = useSWR(
    `/api/school/${schoolId}`,
    () => schoolApi.show(schoolId, { network: true }).then((res) => res.data)
  );

  if (error)
    return <PageContainer>failed to load ${error.message}</PageContainer>;
  if (isLoading || !data) return <PageContainer isLoading={true} />;
  // console.log("about to render", data.data);
  const school = data.data;
  const included = data.included;
  const address = included?.find((i) => i.type === "address"); // a school only has one address

  const schoolFallback = "/assets/images/school-placeholder.png";

  const hasInfo = school.attributes.about;
  const hasLeadership = school.attributes.leaders;
  const hasAttributes =
    school.relationships.address.data ||
    school.attributes.openedOn ||
    school.attributes.agesServedList ||
    school.attributes.governanceType ||
    school.attributes.maxEnrollment;
  const isMySchool = false; //TODO: If currentUser id matches any of relationships.people of type TL then true

  // console.log({ school });

  return (
    <>
      <PageContainer>
        <Stack spacing={6}>
          <SchoolHero
            schoolName={school?.attributes?.name}
            schoolLocation={school?.attributes?.location}
            heroImg={
              school?.attributes?.heroImageUrl
                ? school?.attributes?.heroImageUrl
                : "https://images.unsplash.com/photo-1629654858857-615c2c8be8a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1494&q=80"
            }
            logoImg={
              school?.attributes?.logoUrl
                ? school?.attributes?.logoUrl
                : schoolFallback
            }
          />

          {school?.attributes?.leaders ? (
            <Grid container spacing={8} justifyContent="space-between">
              <Grid item>
                <Stack direction="row" spacing={6}>
                  {school?.attributes?.leaders.map((l, i) => (
                    <UserCard
                      key={i}
                      link={`/network/people/${l?.attributes?.id}`}
                      firstName={l?.attributes?.firstName}
                      lastName={l?.attributes?.lastName}
                      email={l?.attributes?.email}
                      phone={l?.attributes?.phone}
                      role={l?.attributes?.role}
                      profileImage={l?.attributes?.imageSrc}
                    />
                  ))}
                </Stack>
              </Grid>
            </Grid>
          ) : null}

          <Grid container spacing={8}>
            <Grid item xs={12} md={hasInfo ? 4 : 12}>
              <Stack spacing={6}>
                {hasLeadership ? (
                  <Card>
                    <Stack container spacing={3}>
                      {school?.attributes?.leaders.map((l, i) => (
                        <Grid item>
                          <UserCard
                            key={i}
                            link={`/network/people/${l?.attributes?.id}`}
                            firstName={l?.attributes?.firstName}
                            lastName={l?.attributes?.lastName}
                            email={l?.attributes?.email}
                            phone={l?.attributes?.phone}
                            role={l?.attributes?.role}
                            profileImage={l?.attributes?.imageSrc}
                          />
                        </Grid>
                      ))}
                    </Stack>
                  </Card>
                ) : null}
                {hasAttributes ? (
                  <AttributesCard
                    state={school?.relationships?.address?.data?.state}
                    openDate={school?.attributes?.openedOn}
                    agesServed={school?.attributes?.agesServedList}
                    governance={school?.attributes?.governanceType}
                    maxEnrollment={school?.attributes?.maxEnrollment}
                  />
                ) : null}

                {isMySchool ? (
                  <Button
                    variant="lightened"
                    full
                    onClick={() => setEditProfileModalOpen(true)}
                  >
                    <Stack direction="row" spacing={3} alignItems="center">
                      <Icon type="pencil" size="small" />
                      <Typography variant="bodyRegular" bold>
                        Edit school profile
                      </Typography>
                    </Stack>
                  </Button>
                ) : (
                  <Card
                    size="small"
                    variant="lightened"
                    onClick={() => setClaimSchoolModalOpen(true)}
                    hoverable
                  >
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={3}
                    >
                      <Grid item>
                        <Icon type="flag" variant="primary" />
                      </Grid>
                      <Grid item flex={1}>
                        <Typography variant="bodyRegular" bold>
                          Is this your school?
                        </Typography>
                        <Typography variant="bodySmall" lightened>
                          You should be able to edit this page.
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Icon type="chevronRight" variant="lightened" />
                      </Grid>
                    </Grid>
                  </Card>
                )}
              </Stack>
            </Grid>
            {hasInfo ? (
              <Grid item xs={12} sm={8}>
                <Stack spacing={12}>
                  {school?.attributes?.about ? (
                    <Stack spacing={3}>
                      <Typography variant="h4" bold>
                        Our School
                      </Typography>
                      <Typography variant="bodyLarge">
                        {school?.attributes?.about}
                      </Typography>
                    </Stack>
                  ) : null}

                  {/* <Grid container>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h4" bold>
                      School Board
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={3}>
                      {FakeBoardMembers.map((f, i) => (
                        <UserCard
                          link={`/network/people/${f.attributes.id}`}
                          firstName={f.attributes.firstName}
                          lastName={f.attributes.lastName}
                          email={f.attributes.email}
                          phone={f.attributes.phone}
                          role={f.attributes.role}
                          profileImage={f.attributes.imageSrc}
                        />
                      ))}
                    </Stack>
                  </Grid>
                </Grid> */}
                </Stack>
              </Grid>
            ) : null}
          </Grid>
        </Stack>
      </PageContainer>
      <EditProfileModal
        toggle={() => setEditProfileModalOpen(!editProfileModalOpen)}
        open={editProfileModalOpen}
        school={school}
        address={address}
        mutate={mutate}
        setEditProfileModalOpen={setEditProfileModalOpen}
      />
      <ClaimSchoolModal
        toggle={() => setClaimSchoolModalOpen(!claimSchoolModalOpen)}
        open={claimSchoolModalOpen}
      />
    </>
  );
};

export default School;

const ClaimSchoolModal = ({ toggle, open }) => {
  return (
    <Modal toggle={toggle} open={open} title="Is this your school?">
      <Stack spacing={6}>
        <Stack spacing={2}>
          <Typography variant="bodyRegular">
            If this is your school you should be able to edit this page. Let us
            know whats wrong and we'll fix it as soon as we can!
          </Typography>
        </Stack>
        <Card variant="lightened">
          <Grid container spacing={6}>
            <Grid item>
              <Typography variant="bodyLarge" lightened>
                Email
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="bodyLarge" highlight>
                support@wildflowerschools.org
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </Stack>
    </Modal>
  );
};

const EditProfileModal = ({
  toggle,
  open,
  school,
  address,
  mutate,
  setEditProfileModalOpen,
}) => {
  // city
  // state
  // openDate
  // agesServed
  // governance
  // maxEnrollment

  // TODO: Images?
  // logo
  // banner / hero

  // TODO: People? Via directory?
  // leadership
  // board members

  const [city, setCity] = useState(address?.attributes?.city);
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const [locationState, setLocationState] = useState(
    address?.attributes?.state
  );
  const handleLocationStateChange = (event) => {
    setLocationState(event.target.value);
  };

  const [openDate, setOpenDate] = useState(school.attributes.openedOn);
  const handleOpenDate = (event) => {
    setOpenDate(event.target.value);
  };

  const [agesServedList, setAgesServedList] = useState(
    school.attributes.agesServedList
  );
  const handleAgesServedList = (event) => {
    setAgesServedList(event.target.value);
  };

  const [governanceType, setGovernanceType] = useState(
    school.attributes.governanceType
  );
  const handleGovernanceType = (event) => {
    setGovernanceType(event.target.value);
  };

  const [maxEnrollment, setMaxEnrollment] = useState(
    school.attributes.maxEnrollment
  );
  const handleMaxEnrollment = (event) => {
    setMaxEnrollment(event.target.value);
  };

  const [about, setAbout] = useState(school.attributes.about);
  const handleAbout = (event) => {
    setAbout(event.target.value);
  };
  console.log("school", school);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      city: city,
      state: locationState,
      openDate: openDate,
      agesServedList: agesServedList,
      governanceType: governanceType,
      maxEnrollment: maxEnrollment,
      about: about,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    schoolApi
      .update(school.id, {
        school: {
          about: data.about,
          opened_on: data.openDate,
          ages_served_list: data.agesServedList,
          governance_type: data.governanceType,
          max_enrollment: data.maxEnrollment,
          address_attributes: {
            city: data.city,
            state: data.state,
          },
        },
      })
      .then((response) => {
        if (response.error) {
          if (response.status === 401) {
            clearLoggedInState({});
            Router.push("/login");
          }
          console.error(response.error);
        } else {
          console.log("successfully updated", response.data);
          mutate();
          setEditProfileModalOpen(false);
        }
      });
  };

  return (
    <Modal toggle={toggle} open={open} title="Edit your school's profile">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Controller
            name="city"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                label="City"
                placeholder="e.g. Boston"
                value={city}
                error={errors.city}
                onChange={handleCityChange}
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
              <TextField
                label="State"
                placeholder="e.g. Massachusetts"
                error={errors.state}
                value={locationState}
                onChange={handleLocationStateChange}
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
          <Stack spacing={2}>
            <Typography variant="bodyRegular">Your open date</Typography>
            <Controller
              name="openDate"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <DatePicker
                  label="Your open date"
                  id="open-date"
                  disablePast
                  error={errors.openDate}
                  value={openDate}
                  onChange={handleOpenDate}
                  helperText={
                    errors &&
                    errors.openDate &&
                    errors.openDate.type === "required" &&
                    "This field is required"
                  }
                  {...field}
                  // value={parseISO(dateValue)}
                  // onChange={handleDateValueChange}
                />
              )}
            />
          </Stack>
          <Controller
            name="agesServedList"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <MultiSelect
                withCheckbox
                label="Ages served"
                placeholder="Select the ages your school serves..."
                options={agesServed.options.map((l) => l.label)}
                error={errors.agesServed}
                defaultValue={[]}
                value={agesServedList}
                onChange={handleAgesServedList}
                helperText={
                  errors &&
                  errors.agesServed &&
                  errors.agesServed.type === "required" &&
                  "This field is required"
                }
                {...field}
              />
            )}
          />
          <Controller
            name="governanceType"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                label="GovernanceType"
                placeholder="Select your school's governance..."
                options={governance.options.map((l) => l.label)}
                value={governanceType}
                onChange={handleGovernanceType}
                error={errors.governance}
                helperText={
                  errors &&
                  errors.governance &&
                  errors.governance.type === "required" &&
                  "This field is required"
                }
                {...field}
              />
            )}
          />
          <Controller
            name="maxEnrollment"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                label="Maximum enrollment"
                placeholder="e.g. 30"
                value={maxEnrollment}
                onChange={handleMaxEnrollment}
                error={errors.maxEnrollment}
                helperText={
                  errors &&
                  errors.maxEnrollment &&
                  errors.maxEnrollment.type === "required" &&
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
                label="About our school"
                placeholder="e.g. Your school's profile"
                multiline={true}
                rows={4}
                value={about}
                onChange={handleAbout}
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
            <Button small type="submit">
              <Typography variant="bodyRegular" bold>
                Save
              </Typography>
            </Button>
          </Stack>
        </Card>
      </form>
    </Modal>
  );
};

const agesServed = {
  title: "Age level",
  param: "school_filters[age_levels]",
  doNotDisplayFor: "people",
  options: [
    { value: "Infants", label: "Infants" },
    { value: "Toddlers", label: "Toddlers" },
    { value: "Primary", label: "Primary" },
    { value: "Lower Elementary", label: "Lower Elementary" },
    { value: "Upper Elementary", label: "Upper Elementary" },
    { value: "Adolescent", label: "Adolescent" },
    { value: "High School", label: "High School" },
  ],
};

const governance = {
  title: "Governance",
  param: "school_filters[governance]",
  doNotDisplayFor: "people",
  options: [
    { label: "Independent", value: "Independent" },
    { label: "Charter", value: "Charter" },
    { label: "District", value: "District" },
  ],
};
