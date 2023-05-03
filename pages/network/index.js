import Head from "next/head";
import { useState } from "react";
import { FormControlLabel, RadioGroup } from "@mui/material";
import Masonry from "@mui/lab/Masonry";

import useSearch from "../../hooks/useSearch";
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

const Network = () => {
  const { query, setQuery, results } = useSearch();
  const [category, setCategory] = useState("people");
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <>
      <Head>
        <title>Wildflower Schools Directory | Search</title>
        <meta name="title" content="Wildflower Schools Directory" />
        <meta
          property="og:site_name"
          content="Wildflower Schools Directory"
          key="og_wf_site_name"
        />
        <meta name="description" content="Wildflower Schools Directory" />
        <meta
          name="keywords"
          content="Wildflower, Schools, Directory, Montessori"
        />
        <meta
          property="og:title"
          content="Wildflower Schools Directory"
          key="og_wf_site_title"
        />
        <meta
          property="og:description"
          content="Wildflower Schools Directory"
          key="og_wf_site_description"
        />
      </Head>

      <PageContainer>
        {/* <NetworkContent /> */}

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

        <Grid container alignItems="center">
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
                  <MultiSelect
                    autoWidth
                    options={f.options.map((o) => o.label)}
                    value={[]}
                    placeholder={f.title}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid container mt={12}>
          <Masonry columns={3} spacing={6}>
            {FakeTeachers.map((f, i) => (
              <UserCard
                src={f.attributes.imageSrc}
                firstName={f.attributes.firstName}
                lastName={f.attributes.lastName}
                role={f.attributes.role}
                location={f.attributes.location}
                trainingLevel={f.attributes.trainingLevel}
                key={i}
              />
            ))}
          </Masonry>
        </Grid>
      </PageContainer>
    </>
  );
};

export default Network;

const UserCard = ({
  src,
  firstName,
  lastName,
  role,
  location,
  trainingLevel,
}) => {
  return (
    <Card noPadding>
      <Stack>
        <img src={src} style={{ width: "100%" }} />
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
              <Grid item>
                <Avatar src="" size="sm" />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item>
                <Chip label={location} />
              </Grid>
              <Grid item>
                <Chip label={trainingLevel} />
              </Grid>
            </Grid>
          </Stack>
        </Card>
      </Stack>
    </Card>
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
    displayIf: "school",
    options: [
      { label: "Within a month", value: "Within a month" },
      { label: "Within 6 months", value: "Within 6 months" },
      { label: "Within 1 year", value: "Within 1 year" },
      { label: "In more than 1 year", value: "In more than 1 year" },
    ],
  },
  {
    title: "Program",
    displayIf: "school",
    options: [
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
      { label: "4", value: "4" },
    ],
  },
  {
    title: "Student age",
    displayIf: "school",
    options: [
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
      { label: "4", value: "4" },
    ],
  },
  {
    title: "Capacity",
    displayIf: "school",
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
    title: "Affinity groups",
    displayIf: "people",
    options: [
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
      { label: "4", value: "4" },
    ],
  },
  {
    title: "Pronouns",
    displayIf: "people",
    options: [
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
      { label: "4", value: "4" },
    ],
  },

  {
    title: "Ethnicity",
    displayIf: "people",
    options: [
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
      { label: "4", value: "4" },
    ],
  },
  {
    title: "Governance",
    displayIf: "school",
    options: [
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
      { label: "4", value: "4" },
    ],
  },
  {
    title: "Gender identity",
    displayIf: "people",
    options: [
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
      { label: "4", value: "4" },
    ],
  },
];

const FakeTeachers = [
  {
    attributes: {
      firstName: "Taylor",
      lastName: "Zanke",
      role: "Teacher Leader",
      location: "Los Angeles",
      trainingLevel: "Primary Trained",
      imageSrc:
        "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80",
    },
  },
  {
    attributes: {
      firstName: "Taylor",
      lastName: "Zanke",
      role: "Teacher Leader",
      location: "Los Angeles",
      trainingLevel: "Primary Trained",
      imageSrc:
        "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80",
    },
  },
  {
    attributes: {
      firstName: "Taylor",
      lastName: "Zanke",
      role: "Teacher Leader",
      location: "Los Angeles",
      trainingLevel: "Primary Trained",
      imageSrc:
        "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80",
    },
  },
  {
    attributes: {
      firstName: "Taylor",
      lastName: "Zanke",
      role: "Teacher Leader",
      location: "Los Angeles",
      trainingLevel: "Primary Trained",
      imageSrc:
        "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80",
    },
  },
  {
    attributes: {
      firstName: "Taylor",
      lastName: "Zanke",
      role: "Teacher Leader",
      location: "Los Angeles",
      trainingLevel: "Primary Trained",
      imageSrc:
        "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80",
    },
  },
  {
    attributes: {
      firstName: "Taylor",
      lastName: "Zanke",
      role: "Teacher Leader",
      location: "Los Angeles",
      trainingLevel: "Primary Trained",
      imageSrc:
        "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80",
    },
  },
  {
    attributes: {
      firstName: "Taylor",
      lastName: "Zanke",
      role: "Teacher Leader",
      location: "Los Angeles",
      trainingLevel: "Primary Trained",
      imageSrc:
        "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80",
    },
  },
  {
    attributes: {
      firstName: "Taylor",
      lastName: "Zanke",
      role: "Teacher Leader",
      location: "Los Angeles",
      trainingLevel: "Primary Trained",
      imageSrc:
        "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80",
    },
  },
  {
    attributes: {
      firstName: "Taylor",
      lastName: "Zanke",
      role: "Teacher Leader",
      location: "Los Angeles",
      trainingLevel: "Primary Trained",
      imageSrc:
        "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80",
    },
  },
  {
    attributes: {
      firstName: "Taylor",
      lastName: "Zanke",
      role: "Teacher Leader",
      location: "Los Angeles",
      trainingLevel: "Primary Trained",
      imageSrc:
        "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80",
    },
  },
  {
    attributes: {
      firstName: "Taylor",
      lastName: "Zanke",
      role: "Teacher Leader",
      location: "Los Angeles",
      trainingLevel: "Primary Trained",
      imageSrc:
        "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80",
    },
  },
  {
    attributes: {
      firstName: "Taylor",
      lastName: "Zanke",
      role: "Teacher Leader",
      location: "Los Angeles",
      trainingLevel: "Primary Trained",
      imageSrc:
        "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80",
    },
  },
  {
    attributes: {
      firstName: "Taylor",
      lastName: "Zanke",
      role: "Teacher Leader",
      location: "Los Angeles",
      trainingLevel: "Primary Trained",
      imageSrc:
        "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80",
    },
  },
  {
    attributes: {
      firstName: "Taylor",
      lastName: "Zanke",
      role: "Teacher Leader",
      location: "Los Angeles",
      trainingLevel: "Primary Trained",
      imageSrc:
        "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80",
    },
  },
];
