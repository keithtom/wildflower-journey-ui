import Head from "next/head";
import { useState } from "react";
import useSWR from "swr";

import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { FormControlLabel, RadioGroup, FormHelperText } from "@mui/material";
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
import { useUserContext } from "@lib/useUserContext";
import { clearLoggedInState } from "@lib/handleLogout";

import { unitedStatesOptions } from "../../../../lib/utils/demographic-options";

import axios from "axios";

const token = getCookie("auth");

import schoolApi from "@api/schools";
import peopleApi from "@api/people";
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
import SchoolCard from "@components/SchoolCard";
import UserCard from "@components/UserCard";
import { Data } from "styled-icons/crypto";

const School = ({}) => {
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [claimSchoolModalOpen, setClaimSchoolModalOpen] = useState(false);
  const { currentUser } = useUserContext();

  const router = useRouter();
  const { schoolId } = router.query;
  // console.log("schoolId", schoolId);

  // api js files should return key and fetcher for each api call.  peopleApi.show.key and show.fetcher, or peopleApi.key('show', personId)
  const { data, error, isLoading, mutate } = useSWR(
    schoolId ? `/api/school/${schoolId}` : null,
    () => schoolApi.show(schoolId, { network: true }).then((res) => res.data),
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

  // console.log("about to render", data.data);
  const school = data.data;
  const included = data.included;
  const address = included?.find((i) => i.type === "address"); // a school only has one address

  const schoolFallback = "/assets/images/school-placeholder.png";

  const hasInfo = school.attributes.about;
  const hasAttributes =
    school.relationships.address.data ||
    school.attributes.openedOn ||
    school.attributes.agesServedList ||
    school.attributes.governanceType ||
    school.attributes.maxEnrollment;
  const isMySchool = school.relationships.people.data.filter(
    (person) => person.id === currentUser?.id
  ).length
    ? true
    : false;

  const findMatchingItems = (array1, array2, property) => {
    const matchingItems = array1.filter((item1) =>
      array2.some((item2) => item1[property] === item2[property])
    );
    return matchingItems;
  };

  const schoolLeaders = findMatchingItems(
    included,
    school.relationships.people.data,
    "id"
  );
  const isCharter = school.attributes.charterString;
  const allSisterSchools = findMatchingItems(
    included,
    school.relationships.sisterSchools.data,
    "id"
  );
  const sisterSchools = allSisterSchools.filter((s) => s.id !== school.id);

  // console.log({ currentUser });
  // console.log({ isMySchool });
  // console.log({ included });
  // console.log({ schoolLeaders });
  // console.log({ school });
  // console.log({ sisterSchools });

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
            schoolLeaders={schoolLeaders}
          />

          <Grid container spacing={8}>
            <Grid item xs={12} md={hasInfo ? 4 : 12}>
              <Stack spacing={6}>
                {hasAttributes ? (
                  <AttributesCard
                    state={school?.relationships?.address?.data?.state}
                    openDate={school?.attributes?.openedOn}
                    agesServed={school?.attributes?.agesServedList}
                    governance={school?.attributes?.governanceType}
                    maxEnrollment={school?.attributes?.maxEnrollment}
                  />
                ) : null}
                {isCharter ? (
                  <Card variant="primaryLightened" size="small">
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={3}
                    >
                      <Grid item>
                        <Icon type="shapePolygon" variant="primary" />
                      </Grid>
                      <Grid item flex={1}>
                        <Stack>
                          <Typography variant="bodySmall" bold highlight>
                            CHARTER
                          </Typography>
                          <Typography variant="bodyRegular">
                            {school.attributes.charterString}
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Card>
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
                  {isCharter && sisterSchools.length ? (
                    <Grid container>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="h4" bold>
                          Our Charter Community
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={3}>
                          {sisterSchools.map((s, i) => (
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

const StyledFilePond = styled(FilePond)`
  .filepond--root {
    font-family: ${({ theme }) => theme.typography.family};
  }
  .filepond--panel-root {
    width: 100%;
    background-color: ${({ theme }) => theme.color.neutral.lightened};
  }
`;

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

  const [bannerPicture, setBannerPicture] = useState();
  const [bannerImage, setBannerImage] = useState();
  const [isUpdatingBannerImage, setIsUpdatingBannerImage] = useState(false);
  const handleFileError = (error) => {
    console.log(error);
    setShowError(error); // TODO: Taylor can you help with this?
  };
  const [schoolLogoPicture, setSchoolLogoPicture] = useState();
  const [schoolLogoImage, setSchoolLogoImage] = useState();
  const [isUpdatingSchoolLogoImage, setIsUpdatingSchoolLogoImage] =
    useState(false);

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
    // console.log(data);
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
          logo_image: schoolLogoImage,
          banner_image: bannerImage,
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
          // console.log("successfully updated", response.data);
          setBannerPicture(null);
          setSchoolLogoPicture(null);
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
          <Stack spacing={2}>
            <Typography variant="bodyRegular">Your open date</Typography>
            <Controller
              name="openDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Your open date"
                  id="open-date"
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
            render={({ field }) => (
              <MultiSelect
                withCheckbox
                label="Ages served"
                placeholder="Select the ages your school serves..."
                options={agesServed.options}
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
            render={({ field }) => (
              <Select
                label="Governance type"
                placeholder="Select your school's governance..."
                options={governance.options}
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

          <Stack spacing={3}>
            <Typography variant="bodyRegular">
              Add a new school logo image
            </Typography>
            <Grid container justifyContent="center">
              <Grid item xs={4}>
                <StyledFilePond
                  name="schoolLogo"
                  files={schoolLogoPicture}
                  allowReorder={false}
                  allowMultiple={false}
                  maxFileSize="5MB"
                  acceptedFileTypes={["image/*"]}
                  onupdatefiles={setSchoolLogoPicture}
                  onaddfilestart={() => setIsUpdatingSchoolLogoImage(true)}
                  onprocessfiles={() => setIsUpdatingSchoolLogoImage(false)}
                  onerror={handleFileError}
                  stylePanelAspectRatio="1:1"
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
                                setSchoolLogoImage(signed_id);
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
                  labelIdle='Drag & Drop your school logo image or <span class="filepond--label-action">Browse</span>'
                />
              </Grid>
            </Grid>
          </Stack>

          <Stack spacing={3}>
            <Typography variant="bodyRegular">
              Add a new banner image
            </Typography>
            <Grid container justifyContent="center">
              <Grid item xs={12}>
                <StyledFilePond
                  name="bannerImage"
                  files={bannerPicture}
                  allowReorder={false}
                  allowMultiple={false}
                  maxFileSize="5MB"
                  acceptedFileTypes={["image/*"]}
                  onupdatefiles={setBannerPicture}
                  onaddfilestart={() => setIsUpdatingBannerImage(true)}
                  onprocessfiles={() => setIsUpdatingBannerImage(false)}
                  onerror={handleFileError}
                  stylePanelAspectRatio="4:1"
                  stylePanelLayout="integrated"
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
                                setBannerImage(signed_id);
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
                  labelIdle='Drag & Drop your school banner image or <span class="filepond--label-action">Browse</span>'
                />
              </Grid>
            </Grid>
          </Stack>
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
              disabled={
                isUpdatingBannerImage ||
                isUpdatingSchoolLogoImage ||
                isSubmitting
              }
              type="submit"
            >
              <Typography variant="bodyRegular" bold>
                Save
              </Typography>
            </Button>
            {(isUpdatingBannerImage || isUpdatingSchoolLogoImage) && (
              <Typography variant="bodyRegular" lightened>
                Updating image...
              </Typography>
            )}
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
