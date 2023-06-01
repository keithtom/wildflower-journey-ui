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
  const router = useRouter();
  const { personId } = router.query;

  // api js files should return key and fetcher for each api call.  peopleApi.show.key and show.fetcher, or peopleApi.key('show', personId)
  const { data, error, isLoading } = useSWR(`/api/person/${personId}`, () =>
    peopleApi.show(personId, { network: true }).then((res) => res.data)
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  if (!data.data) return <div>loading...</div>;

  const person = data.data;

  const { currentUser } = useUserContext();
  const isMyProfile = currentUser?.id === personId;

  // console.log({ person });

  return (
    <>
      <PageContainer isLoading={!currentUser}>
        <Stack spacing={6}>
          <ProfileHero
            profileImage={person.attributes?.imageUrl}
            firstName={person.attributes.firstName}
            lastName={person.attributes.lastName}
            role={person.attributes.role}
            school={person.attributes.school?.name}
            schoolLogo={person.attributes.school?.logoUrl}
            location={person.attributes.location}
            // schoolLink={`/network/schools/${FakePerson.attributes.school.id}`}
          />

          <Grid container spacing={8}>
            <Grid item xs={12} sm={3}>
              <Stack spacing={6}>
                <AttributesCard attributes={FakePersonAttributes} />
                {isMyProfile ? (
                  <Card>
                    <Stack spacing={4}>
                      <Stack spacing={2}>
                        <Typography variant="bodyLarge" bold>
                          Editing your profile is under construction
                        </Typography>
                        <Typography variant="bodyRegular" lightened>
                          In the mean time, if you wish to update any of your
                          personal or demographic information we've made it
                          possible to use the onboarding flow.
                        </Typography>
                      </Stack>
                      <Link href="/welcome/existing-member/confirm-your-details">
                        <Button variant="lightened" full>
                          <Stack
                            direction="row"
                            spacing={3}
                            alignItems="center"
                          >
                            <Icon type="pencil" size="small" />
                            <Typography variant="bodyRegular" bold>
                              Edit profile
                            </Typography>
                          </Stack>
                        </Button>
                      </Link>
                    </Stack>
                  </Card>
                ) : null}
              </Stack>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Stack spacing={12}>
                <Stack spacing={3}>
                  <Typography variant="h4" bold>
                    About me
                  </Typography>
                  <Typography variant="bodyLarge">
                    {person.attributes.about}
                  </Typography>
                </Stack>
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h4" bold>
                      Roles and responsibilities
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={3}>
                      {FakePerson.attributes.rolesResonsibilities.map(
                        (r, i) => (
                          <Typography variant="bodyLarge" key={i}>
                            {r}
                          </Typography>
                        )
                      )}
                    </Stack>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h4" bold>
                      Board member
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={3}>
                      {FakePerson.attributes.boardMemberOf.map((b, i) => (
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
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </PageContainer>
    </>
  );
};

export default Person;

const FakePerson = {
  id: "6273-fe51",
  attributes: {
    firstName: "Taylor",
    lastName: "Zanke",
    role: "Teacher Leader",
    location: "Los Angeles, CA",
    school: {
      name: "LA Montessori",
      logoUrl:
        "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80",
      location: "Los Angeles, CA",
      id: "aaaa-1111",
    },
    trainingLevel: "Primary Trained",
    about:
      "Hi there! I decided to pursue being a teacher leader 3 years ago when my son needed to sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    rolesResonsibilities: [
      "Finance + Bookkeeping",
      "Community + Outreach Management",
    ],
    boardMemberOf: [
      {
        name: "Pasadena Montessori",
        logoUrl:
          "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80",
        location: "Pasadena, CA",
        id: "aaaa-1111",
      },
      {
        name: "Silver Lake Montessori",
        logoUrl:
          "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80",
        location: "Los Angeles, CA",
        id: "bbbb-2222",
      },
    ],
    imageSrc:
      "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80",
  },
};

const FakePersonAttributes = [
  {
    name: "Hub",
    values: ["Massachusetts"],
  },
  {
    name: "Training",
    values: ["Primary"],
  },
  {
    name: "Pronouns",
    values: ["She/Her/Hers"],
  },
  {
    name: "Ethnicity",
    values: ["Caucasian"],
  },
  {
    name: "Languages",
    values: ["English"],
  },
];
