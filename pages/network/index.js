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
  const heights = [
    150, 30, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 30, 50, 80,
  ];

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
              <UserCard src={f.imageSrc} key={i} />
            ))}
          </Masonry>
        </Grid>
      </PageContainer>
    </>
  );
};

export default Network;

const UserCard = ({ src }) => {
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
                    Taylor Zanke
                  </Typography>
                  <Typography lightened variant="bodySmall">
                    Teacher Leader
                  </Typography>
                </Stack>
              </Grid>
              <Grid item>
                <div>logo</div>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item>
                <Chip label="Massachusetts" />
              </Grid>
              <Grid item>
                <Chip label="Primary Trained" />
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
      { label: "Massachusetts", value: 1 },
      { label: "New York", value: 2 },
      { label: "Michigan", value: 3 },
      { label: "California", value: 4 },
    ],
  },
  {
    title: "Location",
    options: [
      { label: "Boston, MA", value: 1 },
      { label: "New York City, NY", value: 2 },
      { label: "Detroit, MI", value: 3 },
      { label: "Los Angeles, CA", value: 4 },
    ],
  },
  {
    title: "Open Date",
    displayIf: "school",
    options: [
      { label: "Within a month", value: 1 },
      { label: "Within 6 months", value: 2 },
      { label: "Within 1 year", value: 3 },
      { label: "In more than 1 year", value: 4 },
    ],
  },
  {
    title: "Program",
    displayIf: "school",
    options: [
      { label: "1", value: 1 },
      { label: "2", value: 2 },
      { label: "3", value: 3 },
      { label: "4", value: 4 },
    ],
  },
  {
    title: "Student age",
    displayIf: "school",
    options: [
      { label: "1", value: 1 },
      { label: "2", value: 2 },
      { label: "3", value: 3 },
      { label: "4", value: 4 },
    ],
  },
  {
    title: "Capacity",
    displayIf: "school",
    options: [
      { label: "1", value: 1 },
      { label: "2", value: 2 },
      { label: "3", value: 3 },
      { label: "4", value: 4 },
    ],
  },
  {
    title: "Language",
    options: [
      { label: "1", value: 1 },
      { label: "2", value: 2 },
      { label: "3", value: 3 },
      { label: "4", value: 4 },
    ],
  },
  {
    title: "Affinity groups",
    displayIf: "people",
    options: [
      { label: "1", value: 1 },
      { label: "2", value: 2 },
      { label: "3", value: 3 },
      { label: "4", value: 4 },
    ],
  },
  {
    title: "Pronouns",
    displayIf: "people",
    options: [
      { label: "1", value: 1 },
      { label: "2", value: 2 },
      { label: "3", value: 3 },
      { label: "4", value: 4 },
    ],
  },
  {
    title: "Pronouns",
    displayIf: "people",
    options: [
      { label: "1", value: 1 },
      { label: "2", value: 2 },
      { label: "3", value: 3 },
      { label: "4", value: 4 },
    ],
  },
  {
    title: "Ethnicity",
    displayIf: "people",
    options: [
      { label: "1", value: 1 },
      { label: "2", value: 2 },
      { label: "3", value: 3 },
      { label: "4", value: 4 },
    ],
  },
  {
    title: "Governance",
    displayIf: "school",
    options: [
      { label: "1", value: 1 },
      { label: "2", value: 2 },
      { label: "3", value: 3 },
      { label: "4", value: 4 },
    ],
  },
  {
    title: "Gender identity",
    displayIf: "people",
    options: [
      { label: "1", value: 1 },
      { label: "2", value: 2 },
      { label: "3", value: 3 },
      { label: "4", value: 4 },
    ],
  },
];

const FakeTeachers = [
  {
    imageSrc:
      "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
  },
];
