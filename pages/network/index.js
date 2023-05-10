import Head from "next/head";
import { useState } from "react";
import { FormControlLabel, RadioGroup } from "@mui/material";
import Masonry from "@mui/lab/Masonry";

import useSearch from "../../hooks/useSearch";
import {
  PageContainer,
  Grid,
  Typography,
  Stack,
  Card,
  Avatar,
  AvatarGroup,
  Icon,
  TextField,
  Chip,
  Link,
  Radio,
  MultiSelect,
} from "@ui";

const Network = ({ FakeSchools, FakeTeachers }) => {
  const { query, setQuery, results } = useSearch();
  const [category, setCategory] = useState("people");
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  // console.log({ results });

  return (
    <>
      <PageContainer>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={12} sm={8}>
            <Typography variant="h4" bold>
              Explore the Wildflower Network
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              placeholder="Search for something..."
              endAdornment={<Icon type="search" variant="lightened" />}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
          </Grid>
        </Grid>

        <Grid container alignItems="center" mb={2}>
          <Grid item xs={12} sm={1}>
            <Typography lightened>Show</Typography>
          </Grid>
          <Grid item flex={1}>
            <RadioGroup value={category} onChange={handleCategoryChange}>
              <Stack direction="row">
                <FormControlLabel
                  value="people"
                  control={<Radio />}
                  label="People"
                />
                <FormControlLabel
                  value="schools"
                  control={<Radio />}
                  label="Schools"
                />
              </Stack>
            </RadioGroup>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sm={1}>
            <Typography lightened>Filter by</Typography>
          </Grid>
          <Grid item flex={1}>
            <Grid container spacing={2}>
              {FakeFilters.map((f, i) => (
                <Grid item key={i}>
                  <FilterMultiSelect
                    filter={f}
                    disabled={f.doNotDisplayFor === category}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        <Grid container mt={12}>
          <Masonry columns={3} spacing={6}>
            {category === "people"
              ? FakeTeachers.map((f) => (
                  <PersonResultItem
                    personLink={`/network/people/${f.attributes.id}`}
                    profileImg={f.attributes.imageSrc}
                    firstName={f.attributes.firstName}
                    lastName={f.attributes.lastName}
                    role={f.attributes.role}
                    location={f.attributes.location}
                    trainingLevel={f.attributes.trainingLevel}
                    schoolLogo={f.attributes.school.logoUrl}
                    key={f.id}
                  />
                ))
              : FakeSchools.map((f) => (
                  <SchoolResultItem
                    schoolLink={`/network/schools/${f.attributes.id}`}
                    heroImg={f.attributes.heroUrl}
                    logoImg={f.attributes.logoUrl}
                    name={f.attributes.name}
                    location={f.attributes.location}
                    program={f.attributes.program}
                    leaders={f.attributes.leaders}
                    key={f.id}
                  />
                ))}
          </Masonry>
        </Grid>
      </PageContainer>
    </>
  );
};

export default Network;

const FilterMultiSelect = ({ filter, disabled }) => {
  const [filterValue, setFilterValue] = useState([]);
  const handleValueChange = (event) => {
    const {
      target: { value },
    } = event;
    setFilterValue(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  // console.log(filterValue);
  return (
    <MultiSelect
      disabled={disabled}
      withCheckbox
      autoWidth
      options={filter.options.map((o) => o.label)}
      value={filterValue}
      onChange={handleValueChange}
      placeholder={filter.title}
    />
  );
};

const PersonResultItem = ({
  personLink,
  profileImg,
  firstName,
  lastName,
  role,
  location,
  trainingLevel,
  schoolLogo,
}) => {
  return (
    <Link href={personLink && personLink}>
      <Card noPadding hoverable>
        <Stack>
          <img src={profileImg} style={{ width: "100%" }} />
          <Card size="small" noBorder>
            <Stack spacing={3}>
              <Grid container justifyContent="space-between">
                <Grid item flex={1}>
                  <Stack>
                    <Typography variant="bodyRegular" bold>
                      {firstName} {lastName}
                    </Typography>
                    <Typography lightened variant="bodySmall">
                      {role}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item style={{ pointerEvents: "none" }}>
                  <Avatar src={schoolLogo} size="sm" />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item>
                  <Chip label={location} size="small" />
                </Grid>
                <Grid item>
                  <Chip label={trainingLevel} size="small" />
                </Grid>
              </Grid>
            </Stack>
          </Card>
        </Stack>
      </Card>
    </Link>
  );
};

const SchoolResultItem = ({
  schoolLink,
  heroImg,
  logoImg,
  name,
  location,
  program,
  leaders,
}) => {
  return (
    <Link href={schoolLink && schoolLink}>
      <Card noPadding hoverable>
        <Stack>
          <Stack
            p={6}
            justifyContent="space-between"
            alignItems="flex-start"
            sx={{
              backgroundImage: `url(${heroImg})`,
              backgroundSize: "cover",
              minHeight: "240px",
            }}
          >
            <Avatar src={logoImg} />
            <AvatarGroup>
              {leaders.map((l) => (
                <Avatar src={l.imageSrc} size="sm" />
              ))}
            </AvatarGroup>
          </Stack>
          <Card size="small" noBorder>
            <Stack spacing={3}>
              <Grid container justifyContent="space-between">
                <Grid item flex={1}>
                  <Stack>
                    <Typography variant="bodyRegular" bold>
                      {name}
                    </Typography>
                    <Typography lightened variant="bodySmall">
                      {location}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                {program.map((p, i) => (
                  <Grid item key={i}>
                    <Chip label={p} size="small" />
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Card>
        </Stack>
      </Card>
    </Link>
  );
};

const FakeFilters = [
  {
    title: "Hub",
    options: [
      { label: "Massachusetts", value: "Massachusetts" },
      { label: "New York", value: "New York" },
      { label: "Michigan", value: "Michigan" },
      { label: "California", value: "California" },
    ],
  },
  {
    title: "Location",
    options: [
      { label: "Boston, MA", value: "Boston, MA" },
      { label: "New York City, NY", value: "New York City, NY" },
      { label: "Detroit, MI", value: "Detroit, MI" },
      { label: "Los Angeles, CA", value: "Los Angeles, CA" },
    ],
  },
  {
    title: "Open Date",
    doNotDisplayFor: "people",
    options: [
      { label: "Within a month", value: "Within a month" },
      { label: "Within 6 months", value: "Within 6 months" },
      { label: "Within 1 year", value: "Within 1 year" },
      { label: "In more than 1 year", value: "In more than 1 year" },
    ],
  },
  {
    title: "Program",
    doNotDisplayFor: "people",
    options: [
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
      { label: "4", value: "4" },
    ],
  },
  {
    title: "Student age",
    doNotDisplayFor: "people",
    options: [
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
      { label: "4", value: "4" },
    ],
  },
  {
    title: "Capacity",
    doNotDisplayFor: "people",
    options: [
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
      { label: "4", value: "4" },
    ],
  },
  {
    title: "Language",
    options: [
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
      { label: "4", value: "4" },
    ],
  },
  {
    title: "Governance",
    doNotDisplayFor: "people",
    options: [
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
      { label: "4", value: "4" },
    ],
  },
  {
    title: "Affinity groups",
    doNotDisplayFor: "schools",
    options: [
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
      { label: "4", value: "4" },
    ],
  },
  {
    title: "Pronouns",
    doNotDisplayFor: "schools",
    options: [
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
      { label: "4", value: "4" },
    ],
  },

  {
    title: "Ethnicity",
    doNotDisplayFor: "schools",
    options: [
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
      { label: "4", value: "4" },
    ],
  },
  {
    title: "Gender identity",
    doNotDisplayFor: "schools",
    options: [
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
      { label: "4", value: "4" },
    ],
  },
];

export async function getServerSideProps({ params, req, res }) {
  const FakeTeachers = [
    {
      attributes: {
        id: "abab-1212",
        firstName: "Taylor",
        lastName: "Zanke",
        role: "Teacher Leader",
        location: "Los Angeles",
        trainingLevel: "Primary Trained",
        school: {
          name: "Pasadena Montessori",
          logoUrl:
            "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80",
          location: "Pasadena, CA",
          id: "aaaa-1111",
        },
        school: {
          name: "Pasadena Montessori",
          logoUrl:
            "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80",
          location: "Pasadena, CA",
          id: "aaaa-1111",
        },
        imageSrc:
          "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80",
      },
    },
    {
      attributes: {
        id: "abab-1212",
        firstName: "Taylor",
        lastName: "Zanke",
        role: "Teacher Leader",
        location: "Los Angeles",
        trainingLevel: "Primary Trained",
        school: {
          name: "Pasadena Montessori",
          logoUrl:
            "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80",
          location: "Pasadena, CA",
          id: "aaaa-1111",
        },
        imageSrc:
          "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80",
      },
    },
    {
      attributes: {
        id: "abab-1212",
        firstName: "Taylor",
        lastName: "Zanke",
        role: "Teacher Leader",
        location: "Los Angeles",
        trainingLevel: "Primary Trained",
        school: {
          name: "Pasadena Montessori",
          logoUrl:
            "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80",
          location: "Pasadena, CA",
          id: "aaaa-1111",
        },
        imageSrc:
          "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80",
      },
    },
    {
      attributes: {
        id: "abab-1212",
        firstName: "Taylor",
        lastName: "Zanke",
        role: "Teacher Leader",
        location: "Los Angeles",
        trainingLevel: "Primary Trained",
        school: {
          name: "Pasadena Montessori",
          logoUrl:
            "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80",
          location: "Pasadena, CA",
          id: "aaaa-1111",
        },
        imageSrc:
          "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80",
      },
    },
    {
      attributes: {
        id: "abab-1212",
        firstName: "Taylor",
        lastName: "Zanke",
        role: "Teacher Leader",
        location: "Los Angeles",
        trainingLevel: "Primary Trained",
        school: {
          name: "Pasadena Montessori",
          logoUrl:
            "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80",
          location: "Pasadena, CA",
          id: "aaaa-1111",
        },
        imageSrc:
          "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80",
      },
    },
    {
      attributes: {
        id: "abab-1212",
        firstName: "Taylor",
        lastName: "Zanke",
        role: "Teacher Leader",
        location: "Los Angeles",
        trainingLevel: "Primary Trained",
        school: {
          name: "Pasadena Montessori",
          logoUrl:
            "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80",
          location: "Pasadena, CA",
          id: "aaaa-1111",
        },
        imageSrc:
          "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80",
      },
    },
    {
      attributes: {
        id: "abab-1212",
        firstName: "Taylor",
        lastName: "Zanke",
        role: "Teacher Leader",
        location: "Los Angeles",
        trainingLevel: "Primary Trained",
        school: {
          name: "Pasadena Montessori",
          logoUrl:
            "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80",
          location: "Pasadena, CA",
          id: "aaaa-1111",
        },
        imageSrc:
          "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80",
      },
    },
    {
      attributes: {
        id: "abab-1212",
        firstName: "Taylor",
        lastName: "Zanke",
        role: "Teacher Leader",
        location: "Los Angeles",
        trainingLevel: "Primary Trained",
        school: {
          name: "Pasadena Montessori",
          logoUrl:
            "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80",
          location: "Pasadena, CA",
          id: "aaaa-1111",
        },
        imageSrc:
          "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80",
      },
    },
    {
      attributes: {
        id: "abab-1212",
        firstName: "Taylor",
        lastName: "Zanke",
        role: "Teacher Leader",
        location: "Los Angeles",
        trainingLevel: "Primary Trained",
        school: {
          name: "Pasadena Montessori",
          logoUrl:
            "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80",
          location: "Pasadena, CA",
          id: "aaaa-1111",
        },
        imageSrc:
          "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80",
      },
    },
    {
      attributes: {
        id: "abab-1212",
        firstName: "Taylor",
        lastName: "Zanke",
        role: "Teacher Leader",
        location: "Los Angeles",
        trainingLevel: "Primary Trained",
        school: {
          name: "Pasadena Montessori",
          logoUrl:
            "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80",
          location: "Pasadena, CA",
          id: "aaaa-1111",
        },
        imageSrc:
          "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80",
      },
    },
    {
      attributes: {
        id: "abab-1212",
        firstName: "Taylor",
        lastName: "Zanke",
        role: "Teacher Leader",
        location: "Los Angeles",
        trainingLevel: "Primary Trained",
        school: {
          name: "Pasadena Montessori",
          logoUrl:
            "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80",
          location: "Pasadena, CA",
          id: "aaaa-1111",
        },
        imageSrc:
          "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80",
      },
    },
    {
      attributes: {
        id: "abab-1212",
        firstName: "Taylor",
        lastName: "Zanke",
        role: "Teacher Leader",
        location: "Los Angeles",
        trainingLevel: "Primary Trained",
        school: {
          name: "Pasadena Montessori",
          logoUrl:
            "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80",
          location: "Pasadena, CA",
          id: "aaaa-1111",
        },
        imageSrc:
          "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80",
      },
    },
    {
      attributes: {
        id: "abab-1212",
        firstName: "Taylor",
        lastName: "Zanke",
        role: "Teacher Leader",
        location: "Los Angeles",
        trainingLevel: "Primary Trained",
        school: {
          name: "Pasadena Montessori",
          logoUrl:
            "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80",
          location: "Pasadena, CA",
          id: "aaaa-1111",
        },
        imageSrc:
          "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80",
      },
    },
    {
      attributes: {
        id: "abab-1212",
        firstName: "Taylor",
        lastName: "Zanke",
        role: "Teacher Leader",
        location: "Los Angeles",
        trainingLevel: "Primary Trained",
        school: {
          name: "Pasadena Montessori",
          logoUrl:
            "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80",
          location: "Pasadena, CA",
          id: "aaaa-1111",
        },
        imageSrc:
          "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80",
      },
    },
  ];

  const FakeSchools = [
    {
      attributes: {
        name: "Pasadena Montessori",
        logoUrl:
          "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80",
        location: "Pasadena, CA",
        id: "aaaa-1111",
        heroUrl:
          "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80",
        program: ["Primary"],
        leaders: [
          {
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
          {
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
        ],
      },
    },
    {
      attributes: {
        name: "Pasadena Montessori",
        logoUrl:
          "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80",
        location: "Pasadena, CA",
        id: "aaaa-1111",
        heroUrl:
          "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80",
        program: ["Primary"],
        leaders: [
          {
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
          {
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
        ],
      },
    },
    {
      attributes: {
        name: "Pasadena Montessori",
        logoUrl:
          "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80",
        location: "Pasadena, CA",
        id: "aaaa-1111",
        heroUrl:
          "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80",
        program: ["Primary"],
        leaders: [
          {
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
          {
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
        ],
      },
    },
  ];
  return {
    props: {
      FakeSchools,
      FakeTeachers,
    },
  };
}
