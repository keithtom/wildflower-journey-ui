import Head from "next/head";
import { useState } from "react";
import useSWR from 'swr'
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
  const router = useRouter()
  const { schoolId } = router.query
  console.log("schoolId", schoolId)
  
  // api js files should return key and fetcher for each api call.  peopleApi.show.key and show.fetcher, or peopleApi.key('show', personId)
  const { data, error, isLoading } = useSWR(`/api/school/${schoolId}`, () => schoolApi.show(schoolId, { network: true }).then(res => res.data))

  if (error) return <div>failed to load ${error.message}</div>
  if (isLoading || !data) return <div>loading...</div>
  console.log("about to render", data.data  )
  const school = data.data
  
  return (
    <>
      <PageContainer>
        <Stack spacing={6}>
          <Hero imageUrl={FakeSchool.heroUrl} />

          <Grid container spacing={8} justifyContent="space-between">
            <Grid item>
              <Stack spacing={3}>
                <img
                  src={school.attributes.logoUrl}
                  style={{
                    objectFit: "contain",
                    maxWidth: "200px",
                    maxHeight: "96px",
                    width: "100%",
                  }}
                />
                <Typography variant="bodyRegular">{school.attributes.name}</Typography>
              </Stack>
            </Grid>
            <Grid item>
              <Stack direction="row" spacing={6}>
                {FakeLeaders.map((f, i) => (
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
          </Grid>

          <Grid container spacing={8}>
            <Grid item xs={12} sm={3}>
              <AttributesCard attributes={[]} />
            </Grid>
            <Grid item xs={12} sm={9}>
              <Stack spacing={12}>
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
                    child’s Montessori experience our primary focus.
                  </Typography>
                </Stack>

                <Grid container>
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
                </Grid>
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
    "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80",
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
