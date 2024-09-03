import Head from "next/head";
import { useState, useEffect } from "react";
import { mutate } from "swr";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Skeleton,
  Autocomplete,
  TextField as MaterialTextField,
  CircularProgress,
} from "@mui/material";
import { format, parseISO } from "date-fns";
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
import { handleFindMatchingItems } from "@lib/utils/usefulHandlers";

import { unitedStatesOptions } from "../../../../lib/utils/demographic-options";

import axios from "axios";

const token = getCookie("auth");

import schoolApi from "@api/schools";
import schoolRelationshipsApi from "@api/school_relationships";
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
} from "@ui";
import SchoolHero from "@components/SchoolHero";
import AttributesCard from "@components/AttributesCard";
import SchoolCard from "@components/SchoolCard";
import UserCard from "@components/UserCard";
import useSchool from "@hooks/useSchool";
import useSchools from "@hooks/useSchools";
import useSearch from "@hooks/useSearch";

const School = ({}) => {
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [claimSchoolModalOpen, setClaimSchoolModalOpen] = useState(false);
  const { currentUser } = useUserContext();

  const router = useRouter();
  const { schoolId } = router.query;

  // const { data: schoolsData, isLoading: isLoadingSchools } = useSchools();
  // console.log({ schoolsData });

  // useEffect(() => {
  //   const charterSchools = schoolsData?.data.filter(
  //     (s) => s.attributes.charterString
  //   );
  //   console.log({ charterSchools });
  // }, [schoolsData]);

  const { data: schoolData, isLoading } = useSchool(schoolId, {
    network: true,
  });

  const school = schoolData?.data;
  const included = schoolData?.included;
  const address = included?.find((i) => i.type === "address"); // a school only has one address

  const schoolFallback = "/assets/images/school-placeholder.png";

  const hasInfo = school?.attributes.about;
  const hasAttributes =
    school?.relationships.address.data ||
    school?.attributes.openedOn ||
    school?.attributes.agesServedList ||
    school?.attributes.governanceType ||
    school?.attributes.maxEnrollment;
  const adminId = "10c9-a091";

  let schoolLeaders;
  let allSisterSchools;
  let sisterSchools;
  let isCharter;
  let boardMembers;

  if (!isLoading) {
    const teacherLeaderRelationships = schoolData?.included?.filter(
      (rel) =>
        rel.type === "schoolRelationship" &&
        rel.attributes.roleList.includes("Teacher Leader") &&
        rel.attributes.startDate &&
        !rel.attributes.endDate
    );

    schoolLeaders = schoolData?.included
      ?.filter((i) => i.type === "person" && i.attributes.isOnboarded === true)
      ?.map((teacher) => {
        const schoolRelationship = teacherLeaderRelationships.find(
          (rel) => rel.relationships.person.data.id === teacher.id
        );
        return {
          ...teacher,
          schoolRelationshipAttributes: schoolRelationship?.attributes,
          schoolRealtionshipId: schoolRelationship?.id,
        };
      })
      ?.filter((teacher) => teacher.schoolRealtionshipId) // Only include teachers who are board members
      ?.sort((a, b) => new Date(b.endDate) - new Date(a.endDate))
      ?.sort((a, b) => {
        if (!a.endDate) return -1;
        if (!b.endDate) return 1;
        return 0;
      });

    const boardMemberRelationships = schoolData?.included?.filter(
      (rel) =>
        rel.type === "schoolRelationship" &&
        rel.attributes.roleList.includes("Board Member") &&
        rel.attributes.startDate &&
        !rel.attributes.endDate
    );

    boardMembers = schoolData?.included
      ?.filter((i) => i.type === "person")
      ?.map((teacher) => {
        const schoolRelationship = boardMemberRelationships.find(
          (rel) => rel.relationships.person.data.id === teacher.id
        );
        return {
          ...teacher,
          schoolRelationshipAttributes: schoolRelationship?.attributes,
          schoolRealtionshipId: schoolRelationship?.id,
        };
      })
      ?.filter((teacher) => teacher.schoolRealtionshipId) // Only include teachers who are board members
      ?.sort((a, b) => new Date(b.endDate) - new Date(a.endDate))
      ?.sort((a, b) => {
        if (!a.endDate) return -1;
        if (!b.endDate) return 1;
        return 0;
      });
    isCharter = school?.attributes.charterString;
    allSisterSchools = handleFindMatchingItems(
      included,
      school?.relationships.sisterSchools.data,
      "id"
    );
    sisterSchools = allSisterSchools.filter((s) => s.id !== school.id);
  }

  const formatHumanDate = (date) => {
    const parsedDate = parseISO(date);
    return format(parsedDate, "MMMM d, yyyy");
  };

  const isMySchool =
    schoolLeaders?.some((leader) => leader.id === currentUser?.id) ||
    adminId === currentUser?.id
      ? true
      : false;

  // console.log({ currentUser });
  // console.log({ isMySchool });
  // console.log({ included });
  // console.log({ schoolLeaders });
  // console.log({ boardMembers });
  // console.log({ school });
  // console.log({ sisterSchools });
  console.log({ schoolData });

  return (
    <>
      <PageContainer>
        <Stack spacing={6}>
          {isLoading ? (
            <Skeleton height={400} width="100%" variant="rounded" />
          ) : (
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
          )}

          {isLoading ? (
            <Grid container spacing={8}>
              <Grid item xs={12} md={4}>
                <Stack spacing={6}>
                  <Skeleton height={96} m={0} variant="rounded" />
                  <Skeleton height={240} m={0} variant="rounded" />
                </Stack>
              </Grid>
              <Grid item xs={12} md={8}>
                <Stack>
                  {Array.from({ length: 8 }, (_, j) => (
                    <Skeleton key={j} height={24} m={0} variant="text" />
                  ))}
                </Stack>
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={8}>
              <Grid item xs={12} md={hasInfo ? 4 : 12}>
                <Stack spacing={6}>
                  {schoolLeaders.length ? (
                    <Grid item xs={12}>
                      <Card>
                        <Stack spacing={6}>
                          {schoolLeaders?.map((leader, i) => (
                            <Link href={`/network/people/${leader.id}`} key={i}>
                              <Stack
                                direction="row"
                                spacing={3}
                                alignItems="center"
                              >
                                <Avatar
                                  src={leader?.attributes?.imageUrl}
                                  size="sm"
                                />
                                <Stack>
                                  <Stack direction="row" spacing={1}>
                                    {leader.attributes.firstName &&
                                    leader.attributes.firstName ? (
                                      <Typography variant="bodyRegular" bold>
                                        {leader?.attributes?.firstName}{" "}
                                        {leader?.attributes?.lastName}
                                      </Typography>
                                    ) : null}
                                  </Stack>
                                  {leader?.attributes?.roleList?.map((r, i) => (
                                    <Typography
                                      variant="bodySmall"
                                      lightened
                                      key={i}
                                    >
                                      {r}
                                    </Typography>
                                  ))}
                                </Stack>
                              </Stack>
                            </Link>
                          ))}
                        </Stack>
                      </Card>
                    </Grid>
                  ) : null}
                  {hasAttributes ? (
                    <AttributesCard
                      state={school?.relationships?.address?.data?.state}
                      openDate={school?.attributes?.openedOn}
                      agesServed={school?.attributes?.agesServedList}
                      governance={school?.attributes?.governanceType}
                      maxEnrollment={school?.attributes?.maxEnrollment}
                      numClassrooms={school?.attributes?.numClassrooms}
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
                <Grid item xs={12} md={8}>
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
                        <Grid item xs={12} md={6}>
                          <Typography variant="h4" bold>
                            Our Charter Community
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={3}>
                            {sisterSchools?.map((s, i) => (
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
                    {boardMembers.length ? (
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Typography variant="h4" bold>
                            Our School Board
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={3}>
                            {boardMembers?.map((f, i) => (
                              <UserCard
                                key={i}
                                subtitle={`${formatHumanDate(
                                  f.schoolRelationshipAttributes.startDate
                                )} - Present`}
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
                      </Grid>
                    ) : null}
                  </Stack>
                </Grid>
              ) : null}
            </Grid>
          )}
        </Stack>
      </PageContainer>
      {isLoading ? null : (
        <>
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
      )}
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
  const [currentFieldGroup, setCurrentFieldGroup] = useState("general");

  const handleToggle = () => {
    toggle();
    setCurrentFieldGroup("general");
  };
  const renderFieldGroup = () => {
    switch (currentFieldGroup) {
      case "general":
        return (
          <GeneralFields
            handleToggle={handleToggle}
            school={school}
            address={address}
          />
        );
      case "enrollment":
        return <EnrollmentFields handleToggle={handleToggle} school={school} />;
      case "teacherLeaders":
        return (
          <TeacherLeaderFields handleToggle={handleToggle} school={school} />
        );
      case "boardMembers":
        return (
          <BoardMemberFields handleToggle={handleToggle} school={school} />
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      toggle={handleToggle}
      open={open}
      title="Edit school profile"
      fixedDrawer={
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => setCurrentFieldGroup("general")}
              selected={currentFieldGroup === "general"}
            >
              <ListItemText sx={{ paddingX: "8px" }}>
                <Typography variant="bodyRegular">General</Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => setCurrentFieldGroup("enrollment")}
              selected={currentFieldGroup === "enrollment"}
            >
              <ListItemText sx={{ paddingX: "8px" }}>
                <Typography variant="bodyRegular">Enrollment</Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => setCurrentFieldGroup("teacherLeaders")}
              selected={currentFieldGroup === "teacherLeaders"}
            >
              <ListItemText sx={{ paddingX: "8px" }}>
                <Typography variant="bodyRegular">Teacher Leaders</Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => setCurrentFieldGroup("boardMembers")}
              selected={currentFieldGroup === "boardMembers"}
            >
              <ListItemText sx={{ paddingX: "8px" }}>
                <Typography variant="bodyRegular">Board Members</Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      }
    >
      {renderFieldGroup()}
    </Modal>
  );
};

const GeneralFields = ({ handleToggle, school, address }) => {
  const [showError, setShowError] = useState();

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

  const [about, setAbout] = useState(school.attributes.about);
  const handleAbout = (event) => {
    setAbout(event.target.value);
  };

  const [bannerPicture, setBannerPicture] = useState();
  const [bannerImage, setBannerImage] = useState();
  const [isUpdatingBannerImage, setIsUpdatingBannerImage] = useState(false);
  const [schoolLogoPicture, setSchoolLogoPicture] = useState();
  const [schoolLogoImage, setSchoolLogoImage] = useState();
  const [isUpdatingSchoolLogoImage, setIsUpdatingSchoolLogoImage] =
    useState(false);

  const [showLogoError, setShowLogoError] = useState(false);
  const [showBannerError, setShowBannerError] = useState(false);

  const handleLogoError = (error) => {
    setShowLogoError(error);
    setIsUpdatingSchoolLogoImage(false);
  };
  const handleBannerError = (error) => {
    setShowBannerError(error);
    setIsUpdatingBannerImage(false);
  };

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, touchedFields, isSubmitting, isDirty },
  } = useForm({
    defaultValues: {
      city: city,
      state: locationState,
      openDate: school.attributes.openedOn,
      about: about,
    },
  });

  // console.log("school.attributes.openedOn", school.attributes.openedOn);

  const watchFields = watch();
  // console.log("watchFields.openDate", watchFields.openDate);

  const onSubmit = (data) => {
    console.log(data);
    schoolApi
      .update(school.id, {
        school: {
          about: data.about,
          opened_on: data.openDate,
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
          mutate(`/v1/schools/${school.id}`);
        }
      });
  };
  return (
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
          <Controller
            name="openDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="Your open date"
                id="open-date"
                error={errors.openDate}
                value={parseISO(field.value)}
                onChange={(date) => {
                  const isoDate = date ? date.toISOString() : "";
                  field.onChange(isoDate);
                }}
                renderInput={(params) => (
                  <MaterialTextField
                    {...params}
                    error={touchedFields.openDate && !!errors.openDate}
                    helperText={
                      touchedFields.openDate &&
                      errors &&
                      errors.openDate &&
                      errors.openDate.type === "required" &&
                      "This field is required"
                    }
                  />
                )}
                rules={{ required: "This field is required" }}

                // helperText={
                //   errors &&
                //   errors.openDate &&
                //   errors.openDate.type === "required" &&
                //   "This field is required"
                // }
                // {...field}
              />
            )}
          />
        </Stack>

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
          <Divider />
          {showLogoError ? (
            <Grid container>
              <Grid item xs={12}>
                <Alert severity="error">
                  <Stack>
                    {showLogoError.main}
                    <Typography variant="bodySmall" error>
                      {showLogoError.sub}
                    </Typography>
                  </Stack>
                </Alert>
              </Grid>
            </Grid>
          ) : null}
          <Typography variant="bodyRegular">
            Add a new school logo image
          </Typography>
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={8} md={6}>
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
                onerror={handleLogoError}
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
          <Divider />
        </Stack>

        <Stack spacing={3}>
          {showBannerError ? (
            <Grid container>
              <Grid item xs={12}>
                <Alert severity="error">
                  <Stack>
                    {showBannerError.main}
                    <Typography variant="bodySmall" error>
                      {showBannerError.sub}
                    </Typography>
                  </Stack>
                </Alert>
              </Grid>
            </Grid>
          ) : null}
          <Typography variant="bodyRegular">Add a new banner image</Typography>
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
                onerror={handleBannerError}
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
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          left: 0,
          right: 0,
          paddingTop: "24px",
        }}
      >
        <Card size="small" elevated>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Button variant="text" small onClick={handleToggle}>
                <Typography variant="bodyRegular">Cancel</Typography>
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="primary"
                small
                disabled={
                  !isDirty ||
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
            </Grid>
          </Grid>
        </Card>
      </Box>
    </form>
  );
};
const EnrollmentFields = ({ handleToggle, school }) => {
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
  const [numClassrooms, setNumClassrooms] = useState(
    school.attributes.numClassrooms
  );
  const handleNumClassrooms = (event) => {
    setNumClassrooms(event.target.value);
  };
  const [charterString, setCharterString] = useState(
    school.attributes.charterString
  );
  const handleCharterString = (event) => {
    setCharterString(event.target.value);
  };

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    defaultValues: {
      agesServedList: agesServedList,
      governanceType: governanceType,
      maxEnrollment: maxEnrollment,
      numClassrooms: numClassrooms,
      charterString: charterString,
    },
  });

  const watchFields = watch();

  const onSubmit = (data) => {
    // console.log(data);
    schoolApi
      .update(school.id, {
        school: {
          ages_served_list: data.agesServedList,
          governance_type: data.governanceType,
          max_enrollment: data.maxEnrollment,
          num_classrooms: data.numClassrooms,
          charter_string: data.charterString,
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
          reset({
            agesServedList: data.agesServedList,
            governanceType: data.governanceType,
            maxEnrollment: data.maxEnrollment,
            numClassrooms: data.numClassrooms,
            charterString: data.charterString,
          });
          mutate();
        }
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
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
        {watchFields.governanceType === "Charter" ? (
          <Controller
            name="charterString"
            control={control}
            render={({ field }) => (
              <Select
                label="Charter Group"
                placeholder="e.g. Colorado Charter"
                options={charter.options}
                value={charterString}
                onChange={handleCharterString}
                error={errors.charterString}
                helperText={
                  errors &&
                  errors.charterString &&
                  errors.charterString.type === "required" &&
                  "This field is required"
                }
                {...field}
              />
            )}
          />
        ) : null}
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
          name="numClassrooms"
          control={control}
          render={({ field }) => (
            <TextField
              label="Number of classrooms"
              placeholder="e.g. 4"
              value={numClassrooms}
              onChange={handleNumClassrooms}
              error={errors.numClassrooms}
              helperText={
                errors &&
                errors.numClassrooms &&
                errors.numClassrooms.type === "required" &&
                "This field is required"
              }
              {...field}
            />
          )}
        />
      </Stack>
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          left: 0,
          right: 0,
          paddingTop: "24px",
        }}
      >
        <Card size="small" elevated>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Button variant="text" small onClick={handleToggle}>
                <Typography variant="bodyRegular">Cancel</Typography>
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="primary"
                small
                disabled={!isDirty || isSubmitting}
                type="submit"
              >
                <Typography variant="bodyRegular" bold>
                  Save
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </form>
  );
};
const TeacherLeaderFields = ({ handleToggle, school }) => {
  const [isAddingTeacher, setIsAddingTeacher] = useState(false);
  const [isEditingTeacher, setIsEditingTeacher] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState(null);
  const [isInvitingTeacher, setIsInvitingTeacher] = useState(false);

  const [disabledResults, setDisabledResults] = useState([]);

  const { data: schoolData, isLoading: isLoadingSchoolData } = useSchool(
    school.id
  );

  console.log({ schoolData });

  const {
    query,
    setQuery,
    results,
    noResults,
    isSearching,
    setPerPage,
    setFilters,
  } = useSearch();

  useEffect(() => {
    setQuery("*");
    setPerPage(100);
    setFilters({
      models: "people",
      "people_filters[roles]": ["Teacher Leader"],
    });
  }, []);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, touchedFields, isSubmitting, isDirty },
  } = useForm({});

  useEffect(() => {
    if (currentTeacher) {
      reset({
        teacher: results?.find((option) => option.id === currentTeacher.id),
        dateJoined: currentTeacher.schoolRelationshipAttributes.startDate,
        dateLeft: currentTeacher.schoolRelationshipAttributes.endDate,
        schoolTitle: currentTeacher.schoolRelationshipAttributes.title,
      });
    }
  }, [currentTeacher]);

  const handleCancel = () => {
    setIsAddingTeacher(false);
    setIsEditingTeacher(false);
    setCurrentTeacher(null);
    reset({
      school: null,
      dateJoined: "",
      dateLeft: "",
      schoolTitle: "",
    });
  };

  const handleDeleteSchoolRelationship = async (schoolId) => {
    try {
      const response = await schoolRelationshipsApi.destroy(schoolId);
      mutate(`/v1/schools/${school.id}`);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddTeacherRelationship = async (data) => {
    const formattedStartDate = data.dateJoined
      ? format(new Date(data.dateJoined), "yyyy-MM-dd")
      : null;
    const formattedEndDate = data.dateLeft
      ? format(new Date(data.dateLeft), "yyyy-MM-dd")
      : null;

    try {
      const response = await schoolRelationshipsApi.create({
        school_relationship: {
          name: school.attributes.name,
          description: null,
          start_date: formattedStartDate,
          end_date: formattedEndDate,
          title: data.schoolTitle, // the title the teacher had while at the school
          role_list: ["Teacher Leader"],
          school_id: school.id,
          person_id: data.teacher.id,
        },
      });
      mutate(`/v1/schools/${school?.id}`);
      setIsAddingTeacher(false);
      setIsEditingTeacher(false);
      reset({
        teacher: null,
        dateJoined: "",
        dateLeft: "",
        schoolTitle: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateTeacherRelationship = async (data) => {
    const formattedStartDate = data.dateJoined
      ? format(new Date(data.dateJoined), "yyyy-MM-dd")
      : null;
    const formattedEndDate = data.dateLeft
      ? format(new Date(data.dateLeft), "yyyy-MM-dd")
      : null;

    try {
      await schoolRelationshipsApi.update(currentTeacher.schoolRealtionshipId, {
        school_relationship: {
          name: school.attributes.name,
          description: null,
          start_date: formattedStartDate,
          end_date: formattedEndDate,
          title: data.schoolTitle,
          role_list: ["Teacher Leader"],
          // school_id: data.school.value,
          // person_id: currentUser.id,
        },
      });
      mutate(`/v1/schools/${school?.id}`);
      setIsAddingTeacher(false);
      setIsEditingTeacher(false);
      setCurrentTeacher(null);
      reset({
        school: null,
        dateJoined: "",
        dateLeft: "",
        schoolTitle: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (data) => {
    console.log({ data });
    if (isEditingTeacher) {
      handleUpdateTeacherRelationship(data);
    } else {
      handleAddTeacherRelationship(data);
    }
  };

  const teacherLeaderRelationships = schoolData?.included?.filter(
    (rel) =>
      rel.type === "schoolRelationship" &&
      rel.attributes.roleList.includes("Teacher Leader")
  );

  const teachers = schoolData?.included
    ?.filter((i) => i.type === "person")
    ?.map((teacher) => {
      const schoolRelationship = teacherLeaderRelationships.find(
        (rel) => rel.relationships.person.data.id === teacher.id
      );
      return {
        ...teacher,
        schoolRelationshipAttributes: schoolRelationship?.attributes,
        schoolRealtionshipId: schoolRelationship?.id,
      };
    })
    ?.filter((teacher) => teacher.schoolRealtionshipId)
    ?.sort((a, b) => new Date(b.endDate) - new Date(a.endDate))
    ?.sort((a, b) => {
      if (!a.endDate) return -1;
      if (!b.endDate) return 1;
      return 0;
    });

  const formatHumanDate = (date) => {
    const parsedDate = parseISO(date);
    return format(parsedDate, "MMMM d, yyyy");
  };

  const watchFields = watch();

  const sortedTeachers = teachers.sort((a, b) => {
    return a.attributes.isOnboarded === b.attributes.isOnboarded
      ? 0
      : a.attributes.isOnboarded
      ? -1
      : 1;
  });

  // console.log(watchFields.dateJoined);

  // console.log({ results });
  // console.log({ teachers });
  // console.log({ currentTeacher });

  return (
    <>
      {isInvitingTeacher ? (
        <InviteTeacherFields
          school={school}
          isInvitingTeacher={isInvitingTeacher}
          setIsInvitingTeacher={setIsInvitingTeacher}
          setIsAddingTeacher={setIsAddingTeacher}
        />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            <Grid item xs={12} justifyContent="center">
              {isAddingTeacher ? (
                <Grid container>
                  <Grid item xs={12}>
                    <Stack spacing={3}>
                      <Controller
                        name="teacher"
                        control={control}
                        rules={{ required: "This field is required" }}
                        defaultValue=""
                        render={({
                          field,
                          fieldState: { error, isTouched },
                        }) => (
                          <Autocomplete
                            {...field}
                            inputValue={query && query ? query : ""}
                            onChange={(_, newValue) => {
                              field.onChange(newValue);
                              setQuery(newValue);
                            }}
                            onInputChange={(_, newInputValue) => {
                              setQuery(newInputValue);
                            }}
                            options={results}
                            getOptionDisabled={(option) =>
                              teachers.some((t) => t.id === option.id)
                            }
                            getOptionLabel={(option) =>
                              option && option.attributes
                                ? `${option.attributes.firstName} ${option.attributes.lastName}`
                                : ""
                            }
                            renderOption={(props, option) => {
                              const { key, ...optionProps } = props;
                              return (
                                <ListItem
                                  key={key}
                                  {...optionProps}
                                  disablePadding
                                >
                                  <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={2}
                                  >
                                    <Avatar
                                      src={option.attributes.imageUrl}
                                      size="mini"
                                    />
                                    <Typography variant="bodyRegular">
                                      {option.attributes.firstName}{" "}
                                      {option.attributes.lastName}
                                    </Typography>
                                  </Stack>
                                </ListItem>
                              );
                            }}
                            isOptionEqualToValue={(option, value) =>
                              option.id === value.id
                            }
                            renderInput={(params) => (
                              <MaterialTextField
                                {...params}
                                label="Search for a Teacher Leader"
                                error={isTouched && !!error}
                                placeholder="e.g. Katelyn Shore"
                                helperText={
                                  isTouched &&
                                  error?.type === "required" &&
                                  "This field is required"
                                }
                                InputProps={{
                                  ...params.InputProps,
                                  endAdornment: (
                                    <>
                                      {isSearching ? (
                                        <CircularProgress
                                          color="inherit"
                                          size={20}
                                        />
                                      ) : null}
                                      {params.InputProps.endAdornment}
                                    </>
                                  ),
                                }}
                              />
                            )}
                          />
                        )}
                      />
                      <Controller
                        name="dateJoined"
                        control={control}
                        defaultValue={null}
                        render={({ field }) => (
                          <DatePicker
                            label="Date joined"
                            value={parseISO(field.value)}
                            onChange={(date) => {
                              const isoDate = date ? date.toISOString() : "";
                              field.onChange(isoDate);
                            }}
                            maxDate={new Date()}
                            minDate={new Date("2014-01-01")}
                            renderInput={(params) => (
                              <MaterialTextField
                                {...params}
                                error={
                                  touchedFields.dateJoined &&
                                  !!errors.dateJoined
                                }
                                helperText={
                                  touchedFields.dateJoined &&
                                  errors &&
                                  errors.dateJoined &&
                                  errors.dateJoined.type === "required" &&
                                  "This field is required"
                                }
                              />
                            )}
                          />
                        )}
                        rules={{ required: "This field is required" }}
                      />
                      <Controller
                        name="dateLeft"
                        control={control}
                        defaultValue={null}
                        render={({ field }) => (
                          <DatePicker
                            label="Date left"
                            value={parseISO(field.value)}
                            onChange={(date) => {
                              const isoDate = date ? date.toISOString() : "";
                              field.onChange(isoDate);
                            }}
                            maxDate={new Date()}
                            minDate={new Date("2014-01-01")}
                            renderInput={(params) => (
                              <MaterialTextField
                                {...params}
                                error={errors.dateLeft}
                                helperText={
                                  errors &&
                                  errors.dateLeft &&
                                  errors.dateLeft.type === "required" &&
                                  "This field is required"
                                }
                              />
                            )}
                          />
                        )}
                        rules={{ required: false }}
                      />

                      <Controller
                        name="schoolTitle"
                        control={control}
                        rules={{
                          required: false,
                        }}
                        render={({ field }) => (
                          <MaterialTextField
                            label="Title"
                            placeholder="e.g. Chief Financial Officer"
                            error={errors.schoolTitle}
                            helperText={
                              errors &&
                              errors.schoolTitle &&
                              errors.schoolTitle.type === "required" &&
                              "This field is required"
                            }
                            {...field}
                          />
                        )}
                      />
                    </Stack>
                  </Grid>
                </Grid>
              ) : teachers.length ? (
                <Grid container spacing={6}>
                  <Grid item>
                    <Card variant="lightened" size="small">
                      <Grid container spacing={3}>
                        <Grid item>
                          <Icon type="flag" variant="primary" />
                        </Grid>
                        <Grid item flex={1}>
                          <Typography variant="bodyRegular" bold>
                            Note about display
                          </Typography>
                          <Typography variant="bodyRegular" lightened>
                            Your profile will only show Teacher Leaders that are
                            presently at your school.
                          </Typography>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                  {sortedTeachers.map((teacher, i) => (
                    <Grid item xs={12} key={i}>
                      <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={3}
                      >
                        <Grid item xs={8}>
                          <Stack direction="row" spacing={2}>
                            <Typography
                              variant="bodyRegular"
                              lightened={!teacher.attributes.isOnboarded}
                              bold
                              noWrap
                              style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {teacher.attributes.firstName}{" "}
                              {teacher.attributes.lastName}
                            </Typography>
                            {teacher.attributes.isOnboarded === false ? (
                              <Chip label="Invited" size="small" />
                            ) : null}
                          </Stack>
                        </Grid>
                        <Grid item alignItems="flex-end">
                          <Stack direction="row" spacing={3}>
                            <Typography
                              variant="bodyRegular"
                              lightened
                              hoverable
                              onClick={() => {
                                setIsEditingTeacher(true);
                                setCurrentTeacher(teacher);
                                setIsAddingTeacher(true);
                              }}
                            >
                              Edit
                            </Typography>

                            <Typography
                              variant="bodyRegular"
                              lightened
                              hoverable
                              onClick={() =>
                                handleDeleteSchoolRelationship(
                                  teacher?.schoolRealtionshipId
                                )
                              }
                            >
                              Remove
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                      <Stack>
                        {teacher?.schoolRelationshipAttributes?.title ? (
                          <Typography variant="bodyRegular" lightened>
                            {teacher.schoolRelationshipAttributes.title}
                          </Typography>
                        ) : null}

                        {teacher.schoolRelationshipAttributes.startDate ? (
                          <Typography variant="bodyRegular" lightened>
                            {formatHumanDate(
                              teacher.schoolRelationshipAttributes.startDate
                            )}{" "}
                            -{" "}
                            {teacher.schoolRelationshipAttributes.endDate
                              ? formatHumanDate(
                                  teacher.schoolRelationshipAttributes.endDate
                                )
                              : "Present"}
                          </Typography>
                        ) : null}
                      </Stack>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Card noBorder noRadius size="large">
                  <Stack spacing={6} alignItems="center">
                    <img src="/assets/images/wildflower-logo.png" />
                    <Typography variant="h4">
                      Add your teacher history
                    </Typography>
                    <Button onClick={() => setIsAddingTeacher(true)}>
                      <Typography variant="bodyRegular" bold>
                        Add teacher
                      </Typography>
                    </Button>
                  </Stack>
                </Card>
              )}
            </Grid>
          </Grid>
          {isInvitingTeacher ? null : (
            <Box
              sx={{
                position: "sticky",
                bottom: 0,
                left: 0,
                right: 0,
                paddingTop: "24px",
              }}
            >
              <Stack spacing={3}>
                <Card size="small" elevated>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    {isAddingTeacher ? (
                      <>
                        <Grid item>
                          <Button variant="text" small onClick={handleCancel}>
                            <Typography variant="bodyRegular" bold>
                              Cancel
                            </Typography>
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            variant="primary"
                            small
                            type="submit"
                            disabled={!isDirty || isSubmitting}
                          >
                            <Typography variant="bodyRegular" bold>
                              {isEditingTeacher ? "Save" : "Add"}
                            </Typography>
                          </Button>
                        </Grid>
                      </>
                    ) : (
                      <>
                        <Grid item>
                          <Button variant="text" small onClick={handleToggle}>
                            <Typography variant="bodyRegular">
                              Cancel
                            </Typography>
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            small
                            onClick={() => setIsAddingTeacher(true)}
                          >
                            <Typography variant="bodyRegular" bold>
                              Add
                            </Typography>
                          </Button>
                        </Grid>
                      </>
                    )}
                  </Grid>
                </Card>
                {isAddingTeacher && !isInvitingTeacher && (
                  <Card size="small">
                    <Grid container justifyContent="space-between">
                      <Grid item flex={1}>
                        <Stack>
                          <Typography variant="bodyRegular" bold>
                            Can't find who you're looking for?
                          </Typography>
                          <Typography variant="bodyRegular" lightened>
                            Invite a Teacher Leader to the network.
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item>
                        <Button
                          small
                          variant="secondary"
                          onClick={() => setIsInvitingTeacher(true)}
                        >
                          <Typography variant="bodyRegular" bold>
                            Invite
                          </Typography>
                        </Button>
                      </Grid>
                    </Grid>
                  </Card>
                )}
              </Stack>
            </Box>
          )}
        </form>
      )}
    </>
  );
};

const InviteTeacherFields = ({
  school,
  isInvitingTeacher,
  setIsInvitingTeacher,
  setIsAddingTeacher,
}) => {
  console.log("school in invite teacher leader fields", school);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, touchedFields, isSubmitting, isDirty },
  } = useForm({
    defaultValues: {
      partnerFirstName: "",
      partnerLastName: "",
      partnerEmail: "",
      schoolTitle: "",
      dateJoined: null,
    },
  });

  async function onSubmit(data) {
    console.log({ data });
    const structuredData = {
      person: {
        email: data.partnerEmail,
        first_name: data.partnerFirstName,
        last_name: data.partnerLastName,
      },
      school_relationship: {
        title: data.schoolTitle,
        start_date: data.dateJoined,
        end_date: null,
        role_list: ["Teacher Leader"], // TODO: seems like this does not update the schoolRealtionship, but maybe that is intentional--need a way to identify that they are invited...
      },
    };
    try {
      const response = schoolApi.invitePartner(school?.id, structuredData);
      mutate(`/v1/schools/${school?.id}`);
      reset();
      setIsInvitingTeacher(false);
      setIsAddingTeacher(false);
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Controller
          name="partnerFirstName"
          control={control}
          rules={{
            required: {
              value: true,
              message: "This field is required",
            },
          }}
          render={({ field }) => (
            <TextField
              label="Your Partner's First Name"
              placeholder="e.g. Cathy"
              error={errors.partnerFirstName}
              helperText={errors?.partnerFirstName?.message || ""}
              {...field}
            />
          )}
        />
        <Controller
          name="partnerLastName"
          control={control}
          rules={{
            required: {
              value: true,
              message: "This field is required",
            },
          }}
          render={({ field }) => (
            <TextField
              label="Your Partner's Last Name"
              placeholder="e.g. Lee"
              error={errors.partnerLastName}
              helperText={errors?.partnerLastName?.message || ""}
              {...field}
            />
          )}
        />
        <Controller
          name="partnerEmail"
          control={control}
          rules={{
            required: {
              value: true,
              message: "This field is required",
            },
            pattern: {
              value:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Invalid email format",
            },
          }}
          render={({ field }) => (
            <TextField
              label="Your Partner's Email"
              placeholder="e.g. cathylee@gmail.com"
              error={errors.partnerEmail}
              helperText={errors?.partnerEmail?.message || ""}
              {...field}
            />
          )}
        />
        <Controller
          name="schoolTitle"
          control={control}
          rules={{
            required: false,
          }}
          render={({ field }) => (
            <MaterialTextField
              label="Title"
              placeholder="e.g. Chief Financial Officer"
              error={errors.schoolTitle}
              helperText={
                errors &&
                errors.schoolTitle &&
                errors.schoolTitle.type === "required" &&
                "This field is required"
              }
              {...field}
            />
          )}
        />
        <Controller
          name="dateJoined"
          control={control}
          defaultValue={null}
          render={({ field }) => (
            <DatePicker
              label="Date joined"
              value={parseISO(field.value)}
              onChange={(date) => {
                const isoDate = date ? date.toISOString() : "";
                field.onChange(isoDate);
              }}
              maxDate={new Date()}
              minDate={new Date("2014-01-01")}
              renderInput={(params) => (
                <MaterialTextField
                  {...params}
                  error={touchedFields.dateJoined && !!errors.dateJoined}
                  helperText={
                    touchedFields.dateJoined &&
                    errors &&
                    errors.dateJoined &&
                    errors.dateJoined.type === "required" &&
                    "This field is required"
                  }
                />
              )}
            />
          )}
          rules={{ required: "This field is required" }}
        />
      </Stack>
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          left: 0,
          right: 0,
          paddingTop: "24px",
        }}
      >
        <Card size="small" elevated>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Button
                variant="text"
                small
                onClick={() => setIsInvitingTeacher(false)}
              >
                <Typography variant="bodyRegular" bold>
                  Cancel
                </Typography>
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="primary"
                small
                type="submit"
                disabled={!isDirty || isSubmitting}
              >
                <Typography variant="bodyRegular" bold>
                  Invite
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </form>
  );
};

const BoardMemberFields = ({ handleToggle, school }) => {
  const [isAddingTeacher, setIsAddingTeacher] = useState(false);
  const [isEditingTeacher, setIsEditingTeacher] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState(null);

  const { data: schoolData, isLoading: isLoadingSchoolData } = useSchool(
    school.id
  );

  const {
    query,
    setQuery,
    results,
    noResults,
    isSearching,
    setPerPage,
    setFilters,
  } = useSearch();
  useEffect(() => {
    setQuery("*");
    setPerPage(100);
    setFilters({
      models: "people",
      "people_filters[roles]": ["Teacher Leader"],
    });
  }, []);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, touchedFields, isSubmitting, isDirty },
  } = useForm({});

  useEffect(() => {
    if (currentTeacher) {
      reset({
        teacher: results?.find((option) => option.id === currentTeacher.id),
        dateJoined: currentTeacher.schoolRelationshipAttributes.startDate,
        dateLeft: currentTeacher.schoolRelationshipAttributes.endDate,
      });
    }
  }, [currentTeacher]);

  const handleCancel = () => {
    setIsAddingTeacher(false);
    setIsEditingTeacher(false);
    setCurrentTeacher(null);
    reset({
      school: null,
      dateJoined: "",
      dateLeft: "",
    });
  };

  const handleDeleteSchoolRelationship = async (schoolId) => {
    try {
      const response = await schoolRelationshipsApi.destroy(schoolId);
      mutate(`/v1/schools/${school.id}`);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddTeacherRelationship = async (data) => {
    const formattedStartDate = data.dateJoined
      ? format(new Date(data.dateJoined), "yyyy-MM-dd")
      : null;
    const formattedEndDate = data.dateLeft
      ? format(new Date(data.dateLeft), "yyyy-MM-dd")
      : null;

    try {
      const response = await schoolRelationshipsApi.create({
        school_relationship: {
          name: school.attributes.name,
          description: null,
          start_date: formattedStartDate,
          end_date: formattedEndDate,

          role_list: ["Board Member"],
          school_id: school.id,
          person_id: data.teacher.id,
        },
      });
      mutate(`/v1/schools/${school?.id}`);
      setIsAddingTeacher(false);
      setIsEditingTeacher(false);
      reset({
        teacher: null,
        dateJoined: "",
        dateLeft: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateTeacherRelationship = async (data) => {
    const formattedStartDate = data.dateJoined
      ? format(new Date(data.dateJoined), "yyyy-MM-dd")
      : null;
    const formattedEndDate = data.dateLeft
      ? format(new Date(data.dateLeft), "yyyy-MM-dd")
      : null;

    try {
      await schoolRelationshipsApi.update(currentTeacher.schoolRealtionshipId, {
        school_relationship: {
          name: school.attributes.name,
          description: null,
          start_date: formattedStartDate,
          end_date: formattedEndDate,

          role_list: ["Board Member"],
          // school_id: data.school.value,
          // person_id: currentUser.id,
        },
      });
      mutate(`/v1/schools/${school?.id}`);
      setIsAddingTeacher(false);
      setIsEditingTeacher(false);
      setCurrentTeacher(null);
      reset({
        school: null,
        dateJoined: "",
        dateLeft: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (data) => {
    console.log({ data });
    if (isEditingTeacher) {
      handleUpdateTeacherRelationship(data);
    } else {
      handleAddTeacherRelationship(data);
    }
  };
  const boardMemberRelationships = schoolData?.included?.filter(
    (rel) =>
      rel.type === "schoolRelationship" &&
      rel.attributes.roleList.includes("Board Member")
  );
  const teacherLeaderRelationships = schoolData?.included?.filter(
    (rel) =>
      rel.type === "schoolRelationship" &&
      rel.attributes.roleList.includes("Teacher Leader")
  );

  // console.log({ teacherLeaderRelationships });

  const currentTeachers = schoolData?.included
    ?.filter((i) => i.type === "person")
    ?.map((teacher) => {
      const schoolRelationship = teacherLeaderRelationships.find(
        (rel) => rel.relationships.person.data.id === teacher.id
      );
      return {
        ...teacher,
        schoolRelationshipAttributes: schoolRelationship?.attributes,
        schoolRealtionshipId: schoolRelationship?.id,
      };
    })
    ?.filter((teacher) => teacher.schoolRealtionshipId) // Only include teachers who are teacher leaders
    ?.filter(
      (teacher) => teacher.schoolRelationshipAttributes.endDate === null
    ); // Only include teachers who are still at the school

  // console.log({ currentTeachers });

  const teachers = schoolData?.included
    ?.filter((i) => i.type === "person")
    ?.map((teacher) => {
      const schoolRelationship = boardMemberRelationships.find(
        (rel) => rel.relationships.person.data.id === teacher.id
      );
      return {
        ...teacher,
        schoolRelationshipAttributes: schoolRelationship?.attributes,
        schoolRealtionshipId: schoolRelationship?.id,
      };
    })
    ?.filter((teacher) => teacher.schoolRealtionshipId) // Only include teachers who are board members
    ?.sort((a, b) => new Date(b.endDate) - new Date(a.endDate))
    ?.sort((a, b) => {
      if (!a.endDate) return -1;
      if (!b.endDate) return 1;
      return 0;
    });

  const formatHumanDate = (date) => {
    const parsedDate = parseISO(date);
    return format(parsedDate, "MMMM d, yyyy");
  };

  const watchFields = watch();

  // console.log({ results });
  // console.log({ teachers });
  // console.log({ schoolData });
  // console.log({ currentTeacher });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={6}>
        <Grid item xs={12} justifyContent="center">
          {isAddingTeacher ? (
            <Grid container>
              <Grid item xs={12}>
                <Stack spacing={3}>
                  <Controller
                    name="teacher"
                    control={control}
                    rules={{ required: "This field is required" }}
                    defaultValue=""
                    render={({ field, fieldState: { error, isTouched } }) => (
                      <Autocomplete
                        {...field}
                        // value={field.value || ""}
                        inputValue={query && query ? query : ""}
                        onChange={(_, newValue) => {
                          field.onChange(newValue);
                          setQuery(newValue);
                        }}
                        onInputChange={(_, newInputValue) => {
                          setQuery(newInputValue);
                        }}
                        options={results}
                        getOptionDisabled={(option) =>
                          teachers.some((t) => t.id === option.id) ||
                          currentTeachers.some((ct) => ct.id === option.id)
                        }
                        getOptionLabel={(option) =>
                          option && option.attributes
                            ? `${option.attributes.firstName} ${option.attributes.lastName}`
                            : ""
                        }
                        renderOption={(props, option) => {
                          const { key, ...optionProps } = props;
                          return (
                            <ListItem key={key} {...optionProps} disablePadding>
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                              >
                                <Avatar
                                  src={option.attributes.imageUrl}
                                  size="mini"
                                />
                                <Typography variant="bodyRegular">
                                  {option.attributes.firstName}{" "}
                                  {option.attributes.lastName}
                                </Typography>
                              </Stack>
                            </ListItem>
                          );
                        }}
                        isOptionEqualToValue={(option, value) =>
                          option.id === value.id
                        }
                        renderInput={(params) => (
                          <MaterialTextField
                            {...params}
                            label="Search for a Teacher Leader"
                            error={isTouched && !!error}
                            placeholder="e.g. Katelyn Shore"
                            helperText={
                              isTouched &&
                              error?.type === "required" &&
                              "This field is required"
                            }
                            InputProps={{
                              ...params.InputProps,
                              endAdornment: (
                                <>
                                  {isSearching ? (
                                    <CircularProgress
                                      color="inherit"
                                      size={20}
                                    />
                                  ) : null}
                                  {params.InputProps.endAdornment}
                                </>
                              ),
                            }}
                          />
                        )}
                      />
                    )}
                  />
                  <Controller
                    name="dateJoined"
                    control={control}
                    defaultValue={null}
                    render={({ field }) => (
                      <DatePicker
                        label="Date joined"
                        value={parseISO(field.value)}
                        onChange={(date) => {
                          const isoDate = date ? date.toISOString() : "";
                          field.onChange(isoDate);
                        }}
                        maxDate={new Date()}
                        minDate={new Date("2014-01-01")}
                        renderInput={(params) => (
                          <MaterialTextField
                            {...params}
                            error={
                              touchedFields.dateJoined && !!errors.dateJoined
                            }
                            helperText={
                              touchedFields.dateJoined &&
                              errors &&
                              errors.dateJoined &&
                              errors.dateJoined.type === "required" &&
                              "This field is required"
                            }
                          />
                        )}
                      />
                    )}
                    rules={{ required: "This field is required" }}
                  />
                  <Controller
                    name="dateLeft"
                    control={control}
                    defaultValue={null}
                    render={({ field }) => (
                      <DatePicker
                        label="Date left"
                        value={parseISO(field.value)}
                        onChange={(date) => {
                          const isoDate = date ? date.toISOString() : "";
                          field.onChange(isoDate);
                        }}
                        maxDate={new Date()}
                        minDate={new Date("2014-01-01")}
                        renderInput={(params) => (
                          <MaterialTextField
                            {...params}
                            error={errors.dateLeft}
                            helperText={
                              errors &&
                              errors.dateLeft &&
                              errors.dateLeft.type === "required" &&
                              "This field is required"
                            }
                          />
                        )}
                      />
                    )}
                    rules={{ required: false }}
                  />
                </Stack>
              </Grid>
            </Grid>
          ) : teachers.length ? (
            <Grid container spacing={6}>
              <Grid item>
                <Card variant="lightened" size="small">
                  <Grid container spacing={3}>
                    <Grid item>
                      <Icon type="flag" variant="primary" />
                    </Grid>
                    <Grid item flex={1}>
                      <Typography variant="bodyRegular" bold>
                        Note about display
                      </Typography>
                      <Typography variant="bodyRegular" lightened>
                        Your profile will only show Board Members that are
                        presently at your school.
                      </Typography>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              {teachers.map((teacher, i) => (
                <Grid item xs={12} key={i}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={3}
                  >
                    <Grid item xs={8}>
                      <Typography
                        variant="bodyRegular"
                        bold
                        noWrap
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {teacher.attributes.firstName}{" "}
                        {teacher.attributes.lastName}
                      </Typography>
                    </Grid>
                    <Grid item alignItems="flex-end">
                      <Stack direction="row" spacing={3}>
                        <Typography
                          variant="bodyRegular"
                          lightened
                          hoverable
                          onClick={() => {
                            setIsEditingTeacher(true);
                            setCurrentTeacher(teacher);
                            setIsAddingTeacher(true);
                          }}
                        >
                          Edit
                        </Typography>

                        <Typography
                          variant="bodyRegular"
                          lightened
                          hoverable
                          onClick={() =>
                            handleDeleteSchoolRelationship(
                              teacher?.schoolRealtionshipId
                            )
                          }
                        >
                          Remove
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                  <Stack>
                    {teacher?.schoolRelationshipAttributes?.title ? (
                      <Typography variant="bodyRegular" lightened>
                        {teacher.schoolRelationshipAttributes.title}
                      </Typography>
                    ) : null}

                    {teacher.schoolRelationshipAttributes.startDate ? (
                      <Typography variant="bodyRegular" lightened>
                        {formatHumanDate(
                          teacher.schoolRelationshipAttributes.startDate
                        )}{" "}
                        -{" "}
                        {teacher.schoolRelationshipAttributes.endDate
                          ? formatHumanDate(
                              teacher.schoolRelationshipAttributes.endDate
                            )
                          : "Present"}
                      </Typography>
                    ) : null}
                  </Stack>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Card noBorder noRadius size="large">
              <Stack spacing={6} alignItems="center">
                <img src="/assets/images/wildflower-logo.png" />
                <Typography variant="h4">Add your board history</Typography>
                <Button onClick={() => setIsAddingTeacher(true)}>
                  <Typography variant="bodyRegular" bold>
                    Add board member
                  </Typography>
                </Button>
              </Stack>
            </Card>
          )}
        </Grid>
      </Grid>

      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          left: 0,
          right: 0,
          paddingTop: "24px",
        }}
      >
        <Card size="small" elevated>
          <Grid container justifyContent="space-between" alignItems="center">
            {isAddingTeacher ? (
              <>
                <Grid item>
                  <Button variant="text" small onClick={handleCancel}>
                    <Typography variant="bodyRegular" bold>
                      Cancel
                    </Typography>
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="primary"
                    small
                    type="submit"
                    disabled={!isDirty || isSubmitting}
                  >
                    <Typography variant="bodyRegular" bold>
                      {isEditingTeacher ? "Save" : "Add"}
                    </Typography>
                  </Button>
                </Grid>
              </>
            ) : (
              <>
                <Grid item>
                  <Button variant="text" small onClick={handleToggle}>
                    <Typography variant="bodyRegular">Cancel</Typography>
                  </Button>
                </Grid>
                <Grid item>
                  <Button small onClick={() => setIsAddingTeacher(true)}>
                    <Typography variant="bodyRegular" bold>
                      Add
                    </Typography>
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </Card>
      </Box>
    </form>
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
const charter = {
  title: "Charter",
  param: "school_filters[charter]",
  doNotDisplayFor: "people",
  options: [
    {
      label: "Minnesota Wildflower Montessori School",
      value: "Minnesota Wildflower Montessori School",
    },
    { label: "Colorado Charter", value: "Colorado Charter" },
    {
      label: "Wildflower New York Charter School",
      value: "Wildflower New York Charter School",
    },
    {
      label: "DC Wildflower Public Charter School",
      value: "DC Wildflower Public Charter School",
    },
  ],
};
