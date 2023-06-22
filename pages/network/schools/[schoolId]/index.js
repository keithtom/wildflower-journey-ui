import Head from "next/head";
import { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { FormControlLabel, RadioGroup, FormHelperText } from "@mui/material";

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
  const { data, error, isLoading } = useSWR(`/api/school/${schoolId}`, () =>
    schoolApi.show(schoolId, { network: true }).then((res) => res.data)
  );

  if (error)
    return <PageContainer>failed to load ${error.message}</PageContainer>;
  if (isLoading || !data) return <PageContainer isLoading={true} />;
  // console.log("about to render", data.data);
  const school = data.data;

  const schoolFallback = "/assets/images/school-placeholder.png";

  const hasInfo = school.attributes.about;
  const hasLeadership = school.attributes.leaders;
  const hasAttributes =
    school.relationships.address.data ||
    school.attributes.openedOn ||
    school.attributes.agesServedList ||
    school.attributes.governanceType ||
    school.attributes.maxEnrollment;
  const isMySchool = true; //TODO: If currentUser id matches any of relationships.people of type TL then true
  const claimSchoolPending = true; // TODO: If currentUser has submitted a request to claim school this should be true, if school is either already theirs, then false, or if no claim has been submitted, then false

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
                ) : claimSchoolPending ? (
                  <Card
                    size="small"
                    variant="lightened"
                    onClick={() => setClaimSchoolModalOpen(true)}
                    hoverable
                  >
                    <Grid container spacing={3} alignItems="center">
                      <Grid item>
                        <Icon type="time" variant="primary" />
                      </Grid>
                      <Grid item flex={1}>
                        <Typography variant="bodyRegular" bold>
                          School claim submitted
                        </Typography>
                        <Typography variant="bodySmall" lightened>
                          Check back soon to update your school profile.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Card>
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
                          Claim it to start updating this profile.
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
    <Modal toggle={toggle} open={open} title="Claim This School">
      <Card variant="lightened">
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Typography variant="bodyLarge" bold>
              Claim school
            </Typography>
          </Stack>
        </Stack>
      </Card>
    </Modal>
  );
};

const EditProfileModal = ({ toggle, open }) => {
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

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      city: "",
      state: "",
    },
  });

  const onSubmit = (data) => {
    console.log("data", data);
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
              <TextField
                label="State"
                placeholder="e.g. Massachusetts"
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
            name="agesServed"
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
            name="governance"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                label="Governance"
                placeholder="Select your school's governance..."
                options={governance.options.map((l) => l.label)}
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
