import { CopyToClipboard } from "react-copy-to-clipboard";
import Head from "next/head";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";

import { useUserContext } from "@lib/useUserContext";
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
import ProfileHero from "@components/ProfileHero";
import AttributesCard from "@components/AttributesCard";
import SchoolCard from "@components/SchoolCard";
import peopleApi from "@api/people";

const Person = ({}) => {
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const router = useRouter();
  const { personId } = router.query;

  // api js files should return key and fetcher for each api call.  peopleApi.show.key and show.fetcher, or peopleApi.key('show', personId)
  const { data, error, isLoading } = useSWR(`/api/person/${personId}`, () =>
    peopleApi.show(personId, { network: true }).then((res) => res.data)
  );

  if (error)
    return <PageContainer>failed to load ${error.message}</PageContainer>;
  if (isLoading || !data) return <PageContainer isLoading={true} />;
  // if (!data.data) return <div>loading...</div>;

  const person = data.data;

  const { currentUser } = useUserContext();
  const isMyProfile = currentUser?.id === personId;
  const hasSchool = person.relationships.schools.length;
  const hasContact = person.attributes.email || person.attributes.phone;
  const hasAttributes =
    person.relationships.address.data ||
    person.attributes.primaryLanguage ||
    person.attributes.raceEthnicityList.length ||
    person.attributes.pronouns ||
    person.attributes.montessoriCertifiedLevelList.length;
  const hasInfo =
    person.attributes.about ||
    person.attributes.rolesResonsibilities ||
    person.attributes.boardMemberOf;

  // console.log({ person });
  // console.log({ currentUser });

  return (
    <>
      <PageContainer isLoading={isLoading || !currentUser}>
        <Stack spacing={6}>
          <ProfileHero
            profileImage={person.attributes?.imageUrl}
            firstName={person.attributes?.firstName}
            lastName={person.attributes?.lastName}
            roles={person.attributes?.roleList}
            school={person.attributes.school?.name}
            schoolLogo={person.attributes.school?.logoUrl}
            location={person.attributes?.location}
            // schoolLink={`/network/schools/${FakePerson.attributes.school.id}`}
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
                    state={person?.relationships?.address?.data?.state}
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
      <Modal
        toggle={() => setEditProfileModalOpen(!editProfileModalOpen)}
        open={editProfileModalOpen}
        title="Edit your profile"
      >
        <Card variant="lightened">
          <Stack spacing={6}>
            <Icon type="wrench" variant="primary" />
            <Stack spacing={2}>
              <Typography variant="bodyLarge" bold>
                Editing your profile is under construction
              </Typography>
              <Typography variant="bodyRegular" lightened>
                In the mean time, if you wish to update any of your personal or
                demographic information we've made it possible to use the
                onboarding flow.
              </Typography>
            </Stack>

            <Link href="/welcome/existing-member/confirm-your-details">
              <Button variant="light">
                <Typography variant="bodyRegular" bold>
                  Edit via onboarding
                </Typography>
              </Button>
            </Link>
          </Stack>
        </Card>
      </Modal>
    </>
  );
};

export default Person;
