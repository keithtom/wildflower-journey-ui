import Head from "next/head";
import { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";

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
} from "@ui";
import SchoolHero from "@components/SchoolHero";
import AttributesCard from "@components/AttributesCard";
import UserCard from "@components/UserCard";

const School = ({}) => {
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
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
  const isMySchool = false; //TODO: If currentUser id matches any of relationships.people of type TL then true

  console.log({ school });

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
                    state={school?.relationships?.address?.data}
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
                ) : null}
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
      <Modal
        toggle={() => setEditProfileModalOpen(!editProfileModalOpen)}
        open={editProfileModalOpen}
        title="Edit school profile"
      >
        <Card variant="lightened">
          <Stack spacing={6}>
            <Icon type="wrench" variant="primary" />
            <Stack spacing={2}>
              <Typography variant="bodyLarge" bold>
                Editing your school profiles is under construction
              </Typography>
              <Typography variant="bodyRegular" lightened>
                We're hard at work to ensure you'll soon be able to edit this
                page. Please bear with us as we continue to develop this
                feature.
              </Typography>
            </Stack>
          </Stack>
        </Card>
      </Modal>
    </>
  );
};

export default School;
