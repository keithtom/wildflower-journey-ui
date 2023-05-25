import Head from "next/head";
import { useState } from "react";
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

const Person = ({}) => {
  return (
    <>
      <PageContainer>
        <Stack spacing={6}>
          <ProfileHero
            profileImage={FakePerson.attributes.imageSrc}
            firstName={FakePerson.attributes.firstName}
            lastName={FakePerson.attributes.lastName}
            role={FakePerson.attributes.role}
            school={FakePerson.attributes.school.name}
            schoolLogo={FakePerson.attributes.school.logoUrl}
            location={FakePerson.attributes.location}
            schoolLink={`/network/schools/${FakePerson.attributes.school.id}`}
          />

          <Grid container spacing={8}>
            <Grid item xs={12} sm={3}>
              <AttributesCard attributes={FakePersonAttributes} />
            </Grid>
            <Grid item xs={12} sm={9}>
              <Stack spacing={12}>
                <Stack spacing={3}>
                  <Typography variant="h4" bold>
                    About me
                  </Typography>
                  <Typography variant="bodyLarge">
                    {FakePerson.attributes.about}
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
