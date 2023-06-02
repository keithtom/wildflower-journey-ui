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
import Hero from "@components/Hero";
import AttributesCard from "@components/AttributesCard";
import UserCard from "@components/UserCard";

const School = ({}) => {
  const router = useRouter();
  const { schoolId } = router.query;
  console.log("schoolId", schoolId);

  // api js files should return key and fetcher for each api call.  peopleApi.show.key and show.fetcher, or peopleApi.key('show', personId)
  const { data, error, isLoading } = useSWR(`/api/school/${schoolId}`, () =>
    schoolApi.show(schoolId, { network: true }).then((res) => res.data)
  );

  if (error) return <div>failed to load ${error.message}</div>;
  if (isLoading || !data) return <div>loading...</div>;
  console.log("about to render", data.data);
  const school = data.data;

  console.log({ school });

  return (
    <>
      <PageContainer>
        <Stack spacing={6}>
          <Hero
            imageUrl={
              school.attributes.heroUrl
                ? school.attributes.heroUrl
                : FakeSchool.heroUrl
            }
          />

          <Grid container spacing={8} justifyContent="space-between">
            <Grid item>
              <Stack spacing={3}>
                <img
                  src={school.attributes.logoUrl}
                  style={{
                    objectFit: "contain",
                    maxWidth: "240px",
                    maxHeight: "120px",
                    width: "100%",
                  }}
                />
                <Typography variant="bodyRegular">
                  {school.attributes.name}
                </Typography>
              </Stack>
            </Grid>
            {school.attributes.leaders ? (
              <Grid item>
                <Stack direction="row" spacing={6}>
                  {school.attributes.leaders.map((l, i) => (
                    <UserCard
                      key={i}
                      link={`/network/people/${l.attributes.id}`}
                      firstName={l.attributes.firstName}
                      lastName={l.attributes.lastName}
                      email={l.attributes.email}
                      phone={l.attributes.phone}
                      role={l.attributes.role}
                      profileImage={l.attributes.imageSrc}
                    />
                  ))}
                </Stack>
              </Grid>
            ) : null}
          </Grid>

          <Grid container spacing={8}>
            <Grid item xs={12} sm={4}>
              <AttributesCard
                state={school.relationships.address.data}
                openDate={school.attributes.openedOn}
                agesServed={school.attributes.agesServedList}
                governance={school.attributes.governanceType}
                maxEnrollment={school.attributes.maxEnrollment}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Stack spacing={12}>
                {school.attributes.about ? (
                  <Stack spacing={3}>
                    <Typography variant="h4" bold>
                      Our School
                    </Typography>
                    <Typography variant="bodyLarge">
                      At Wild Rose our goal is to follow authentic Montessori
                      practice creating environments for children in the process
                      of doing the important work of developing independence. We
                      aim to create an experience for children at Wild Rose that
                      supports a sense of wonder, love of learning, and
                      appreciation of interdependence within a joyful learning
                      community. As a small school we have the opportunity to
                      prioritize these goals and provide a uniquely tailored
                      experience for your individual child. At Wild Rose we each
                      child's Montessori experience our primary focus.
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
          </Grid>
        </Stack>
      </PageContainer>
    </>
  );
};

export default School;

const FakeLeaders = [
  {
    attributes: {
      id: "aaaa-bbbb",
      firstName: "Taylor",
      lastName: "Zanke",
      role: "Teacher Leader",
      location: "Los Angeles",
      trainingLevel: "Primary Trained",
      email: "taylor@montessori.com",
      phone: "123-456-7890",
      imageSrc:
        "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80",
    },
  },
  {
    attributes: {
      id: "aaaa-bbbb",
      firstName: "Taylor",
      lastName: "Zanke",
      role: "Teacher Leader",
      location: "Los Angeles",
      trainingLevel: "Primary Trained",
      email: "taylor@montessori.com",
      phone: "123-456-7890",
      imageSrc:
        "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80",
    },
  },
];
const FakeBoardMembers = [
  {
    attributes: {
      id: "aaaa-bbbb",
      firstName: "Taylor",
      lastName: "Zanke",
      role: "Teacher Leader",
      location: "Los Angeles",
      trainingLevel: "Primary Trained",
      email: "taylor@montessori.com",
      phone: "123-456-7890",
      imageSrc:
        "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80",
    },
  },
  {
    attributes: {
      id: "aaaa-bbbb",
      firstName: "Taylor",
      lastName: "Zanke",
      role: "Teacher Leader",
      location: "Los Angeles",
      trainingLevel: "Primary Trained",
      email: "taylor@montessori.com",
      phone: "123-456-7890",
      imageSrc:
        "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80",
    },
  },
];

const FakeSchool = {
  name: "Pasadena Montessori",
  logoUrl:
    "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80",
  heroUrl:
    "https://plus.unsplash.com/premium_photo-1667502842264-9cdcdac36086?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1422&q=80",
  location: "Pasadena, CA",
  id: "aaaa-1111",
  attributes: [
    {
      name: "Hub",
      values: ["Massachusetts"],
    },
    {
      name: "Open Date",
      values: ["Fall 2014"],
    },
    {
      name: "Program",
      values: ["Primary", "Elementary"],
    },
    {
      name: "Capacity",
      values: ["50+ Students"],
    },
    {
      name: "Languages",
      values: ["English", "Spanish"],
    },
  ],
};
