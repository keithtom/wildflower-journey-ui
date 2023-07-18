import Head from "next/head";
import { useState, useEffect } from "react";
import { FormControlLabel, RadioGroup } from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import { useRouter } from "next/router";

import { useUserContext } from "@lib/useUserContext";
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
  Spinner,
} from "@ui";
import { clearLoggedInState } from "@lib/handleLogout";

const Network = () => {
  const { query, setQuery, filters, setFilters, results, isSearching, error } =
    useSearch();
  const [category, setCategory] = useState("people");
  const { currentUser } = useUserContext();
  const router = useRouter();

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setFilters({ ...filters, models: e.target.value });
  };

  if (error) return <PageContainer>failed to load</PageContainer>;
  const noResults = query && results.length === 0;

  const profileFallback = "/assets/images/avatar-fallback.svg";
  const schoolFallback = "/assets/images/school-placeholder.png";

  // console.log({ results });
  // console.log({ currentUser });

  useEffect(() => {
    if (!currentUser) {
      clearLoggedInState({});
      router.push("/login");
    }
  }, []);

  return (
    <>
      <PageContainer isLoading={!currentUser} hideNav={!currentUser}>
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
              value={query}
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
              {FakeFilters.map((f, i) =>
                f.doNotDisplayFor === category ? null : (
                  <Grid item key={i}>
                    <FilterMultiSelect
                      filter={f}
                      setFilters={setFilters}
                      // disabled={f.doNotDisplayFor === category}
                    />
                  </Grid>
                )
              )}
            </Grid>
          </Grid>
        </Grid>

        <Grid container mt={12}>
          {results.length ? (
            <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={6}>
              {category === "people"
                ? results.map((f) => (
                    <PersonResultItem
                      personLink={`/network/people/${f.id}`}
                      profileImg={
                        f.attributes.imageUrl
                          ? f.attributes.imageUrl
                          : profileFallback
                      }
                      firstName={f.attributes.firstName}
                      lastName={f.attributes.lastName}
                      roles={f.attributes.roleList}
                      location={f.attributes.location}
                      trainingLevel={f.attributes.trainingLevel}
                      schoolLogo={f.attributes.school?.logoUrl}
                      schoolLink={`/network/schools/${f.attributes.school?.id}`}
                      key={f.id}
                    />
                  ))
                : results.map((f) => (
                    <SchoolResultItem
                      schoolLink={`/network/schools/${f.id}`}
                      heroImg={
                        f.attributes.heroUrl
                          ? f.attributes.heroUrl
                          : schoolFallback
                      }
                      logoImg={f.attributes.logoUrl}
                      name={f.attributes.name}
                      location={f.attributes.location}
                      agesServed={f.attributes.agesServedList}
                      leaders={f.attributes.leaders || []}
                      key={f.id}
                    />
                  ))}
            </Masonry>
          ) : (
            <Grid item xs={12}>
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                mt={16}
              >
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  {isSearching ? (
                    <Grid container justifyContent="center">
                      <Grid item>
                        <Spinner />
                      </Grid>
                    </Grid>
                  ) : noResults ? (
                    <Card size="large">
                      <Stack spacing={3}>
                        <Icon type="flag" size="large" variant="primary" />
                        <Typography variant="bodyLarge" bold>
                          Oops! Looks like there's nothing here
                        </Typography>
                        <Typography variant="bodyRegular" lightened>
                          Try a different search term or more general query!
                        </Typography>
                      </Stack>
                    </Card>
                  ) : (
                    <Card size="large">
                      <Stack spacing={3}>
                        <Icon type="search" size="large" variant="primary" />
                        <Typography variant="bodyLarge" bold>
                          You haven't searched for anything yet!
                        </Typography>
                        <Typography variant="bodyRegular" lightened>
                          Search for people or for schools above to see results
                          from the My Wildflower directory!
                        </Typography>
                      </Stack>
                    </Card>
                  )}
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </PageContainer>
    </>
  );
};

export default Network;

const FilterMultiSelect = ({ filter, setFilters }) => {
  const [filterValue, setFilterValue] = useState([]);
  const handleValueChange = (event) => {
    const {
      target: { value },
    } = event;
    setFilterValue(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    setFilters((filters) => {
      return { ...filters, [filter.param]: value };
    });
  };
  // console.log(filterValue);
  return (
    <MultiSelect
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
  roles,
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
                    <Typography variant="bodyLarge" bold>
                      {firstName} {lastName}
                    </Typography>
                    <Grid container>
                      {roles &&
                        roles.map((r, i) => (
                          <Grid item key={i} pr={i === i.length ? 0 : 1}>
                            <Typography lightened variant="bodyRegular">
                              {r} {i === roles.length - 1 ? null : "•"}
                            </Typography>
                          </Grid>
                        ))}
                    </Grid>
                  </Stack>
                </Grid>
                {schoolLogo && (
                  <Grid item style={{ pointerEvents: "none" }}>
                    <Avatar src={schoolLogo} size="sm" />
                  </Grid>
                )}
              </Grid>
              {location || trainingLevel ? (
                <Grid container spacing={2}>
                  {location && (
                    <Grid item>
                      <Chip label={location} size="small" />
                    </Grid>
                  )}
                  {trainingLevel &&
                    trainingLevel.map((t, i) => (
                      <Grid item key={i}>
                        <Chip label={t} size="small" />
                      </Grid>
                    ))}
                </Grid>
              ) : null}
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
  agesServed,
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
              backgroundImage: `url(${logoImg ? logoImg : heroImg})`,
              backgroundSize: `${logoImg ? "contain" : "cover"}`,
              backgroundRepeat: `${logoImg ? "no-repeat" : null}`,
              backgroundPosition: `${logoImg ? "center" : null}`,
              minHeight: "240px",
            }}
          >
            {/* {logoImg && <Avatar src={logoImg} />} */}
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
                    <Typography variant="bodyLarge" bold>
                      {name}
                    </Typography>
                    <Typography lightened variant="bodyRegular">
                      {location}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                {agesServed &&
                  agesServed.map((a, i) => (
                    <Grid item key={i}>
                      <Chip label={a} size="small" />
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
    title: "State",
    param: "people_filters[address_state]",
    options: [
      { label: "Alabama", value: "Alabama" },
      { label: "Alaska", value: "Alaska" },
      { label: "Arizona", value: "Arizona" },
      { label: "Arkansas", value: "Arkansas" },
      { label: "California", value: "California" },
      { label: "Colorado", value: "Colorado" },
      { label: "Connecticut", value: "Connecticut" },
      { label: "Delaware", value: "Delaware" },
      { label: "Florida", value: "Florida" },
      { label: "Georgia", value: "Georgia" },
      { label: "Hawaii", value: "Hawaii" },
      { label: "Idaho", value: "Idaho" },
      { label: "Illinois", value: "Illinois" },
      { label: "Indiana", value: "Indiana" },
      { label: "Iowa", value: "Iowa" },
      { label: "Kansas", value: "Kansas" },
      { label: "Kentucky", value: "Kentucky" },
      { label: "Louisiana", value: "Louisiana" },
      { label: "Maine", value: "Maine" },
      { label: "Maryland", value: "Maryland" },
      { label: "Massachusetts", value: "Massachusetts" },
      { label: "Michigan", value: "Michigan" },
      { label: "Minnesota", value: "Minnesota" },
      { label: "Mississippi", value: "Mississippi" },
      { label: "Missouri", value: "Missouri" },
      { label: "Montana", value: "Montana" },
      { label: "Nebraska", value: "Nebraska" },
      { label: "Nevada", value: "Nevada" },
      { label: "New Hampshire", value: "New Hampshire" },
      { label: "New Jersey", value: "New Jersey" },
      { label: "New Mexico", value: "New Mexico" },
      { label: "New York", value: "New York" },
      { label: "North Carolina", value: "North Carolina" },
      { label: "North Dakota", value: "North Dakota" },
      { label: "Ohio", value: "Ohio" },
      { label: "Oklahoma", value: "Oklahoma" },
      { label: "Oregon", value: "Oregon" },
      { label: "Pennsylvania", value: "Pennsylvania" },
      { label: "Rhode Island", value: "Rhode Island" },
      { label: "South Carolina", value: "South Carolina" },
      { label: "South Dakota", value: "South Dakota" },
      { label: "Tennessee", value: "Tennessee" },
      { label: "Texas", value: "Texas" },
      { label: "Utah", value: "Utah" },
      { label: "Vermont", value: "Vermont" },
      { label: "Virginia", value: "Virginia" },
      { label: "Washington", value: "Washington" },
      { label: "West Virginia", value: "West Virginia" },
      { label: "Wisconsin", value: "Wisconsin" },
      { label: "Wyoming", value: "Wyoming" },
    ],
  },
  {
    title: "Date opened",
    param: "school_filters[open_date]",
    doNotDisplayFor: "people",
    options: [
      { label: "Not open", value: "Not open" },
      { label: "Within 0-2 years", value: "Within 0-2 years" },
      { label: "Within 2-4 years", value: "Within 2-4 years" },
      { label: "More than 5 years", value: "More than 5 years" },
    ],
  },
  // {
  //   title: "Program",
  //   doNotDisplayFor: "people",
  //   options: [
  //     { label: "1", value: "1" },
  //     { label: "2", value: "2" },
  //     { label: "3", value: "3" },
  //     { label: "4", value: "4" },
  //   ],
  // },
  {
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
  },
  // {
  //   title: "Capacity",
  //   doNotDisplayFor: "people",
  //   options: [
  //     { label: "1", value: "1" },
  //     { label: "2", value: "2" },
  //     { label: "3", value: "3" },
  //     { label: "4", value: "4" },
  //   ],
  // },
  {
    title: "Language",
    param: "people_filters[languages]",
    doNotDisplayFor: "schools",
    options: [
      { value: "English", label: "English" },
      { value: "Spanish - Español", label: "Spanish - Español" },
      { value: "French - Français", label: "French - Français" },
      { value: "Mandarin - 中文", label: "Mandarin - 中文" },
      { value: "Arabic - العَرَبِيَّة", label: "Arabic - العَرَبِيَّة" },
      { value: "Armenian - Հայերեն", label: "Armenian - Հայերեն" },
      {
        value: "Bantu (including Swahili) - Kiswahili",
        label: "Bantu (including Swahili) - Kiswahili",
      },
      { value: "Bengali - বাংলা", label: "Bengali - বাংলা" },
      { value: "Burmese - မြန်မာစာ", label: "Burmese - မြန်မာစာ" },
      { value: "Cantonese - Gwóngdūng wá", label: "Cantonese - Gwóngdūng wá" },
      { value: "German - Deutsch", label: "German - Deutsch" },
      { value: "Greek - ελληνικά", label: "Greek - ελληνικά" },
      { value: "Gujarati - ગુજરાતી", label: "Gujarati - ગુજરાતી" },
      {
        value: "Haitian Creole - Kreyol Ayisyen",
        label: "Haitian Creole - Kreyol Ayisyen",
      },
      { value: "Hebrew - עברית", label: "Hebrew - עברית" },
      { value: "Hindi - हिन्दी", label: "Hindi - हिन्दी" },
      { value: "Hmong - Hmoob", label: "Hmong - Hmoob" },
      { value: "Italian - Italiano", label: "Italian - Italiano" },
      { value: "Japanese - 日本語", label: "Japanese - 日本語" },
      { value: "Karen", label: "Karen" },
      { value: "Khmer - ខ្មែរ,", label: "Khmer - ខ្មែរ," },
      { value: "Korean - 한국어", label: "Korean - 한국어" },
      { value: "Navajo - Diné bizaad", label: "Navajo - Diné bizaad" },
      {
        value: "Persian (including Farsi and Dari) - فارسی",
        label: "Persian (including Farsi and Dari) - فارسی",
      },
      { value: "Polish - Polski", label: "Polish - Polski" },
      { value: "Portuguese - Português", label: "Portuguese - Português" },
      { value: "Punjabi - ਪੰਜਾਬੀ", label: "Punjabi - ਪੰਜਾਬੀ" },
      { value: "Russian - русский язык", label: "Russian - русский язык" },
      {
        value:
          "Serbo-Croatian (including Bosnian, Croatian, Montenegrin and Serbian) - Bosanski Jezik / Hrvatski Jezik / српски језик",
        label:
          "Serbo-Croatian (including Bosnian, Croatian, Montenegrin and Serbian) - Bosanski Jezik / Hrvatski Jezik / српски језик",
      },
      { value: "Tagalog - ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔", label: "Tagalog - ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔" },
      {
        value: "Tai-Kadai (including Thai and Lao) - ไทย / ພາສາລາວ",
        label: "Tai-Kadai (including Thai and Lao) - ไทย / ພາສາລາວ",
      },
      { value: "Tami - தமிழ்", label: "Tami - தமிழ்" },
      { value: "Telugu - తెలుగు", label: "Telugu - తెలుగు" },
      { value: "Urdu - اُردُو", label: "Urdu - اُردُو" },
      { value: "Vietnamese - Tiếng Việt", label: "Vietnamese - Tiếng Việt" },
      { value: "Other", label: "Other" },
    ],
  },
  {
    title: "Governance",
    param: "school_filters[governance_type]",
    doNotDisplayFor: "people",
    options: [
      { label: "Independent", value: "Independent" },
      { label: "Charter", value: "Charter" },
      { label: "District", value: "District" },
    ],
  },
  // {
  //   title: "Affinity groups",
  //   doNotDisplayFor: "schools",
  //   options: [
  //     { label: "1", value: "1" },
  //     { label: "2", value: "2" },
  //     { label: "3", value: "3" },
  //     { label: "4", value: "4" },
  //   ],
  // },
  // {
  //   title: "Pronouns",
  //   doNotDisplayFor: "schools",
  //   options: [
  //     { label: "1", value: "1" },
  //     { label: "2", value: "2" },
  //     { label: "3", value: "3" },
  //     { label: "4", value: "4" },
  //   ],
  // },

  {
    title: "Ethnicity",
    param: "people_filters[race_ethnicities]",
    doNotDisplayFor: "schools",
    options: [
      {
        value: "American Indian or Alaska Native",
        label: "American Indian or Alaska Native",
      },
      { value: "Asian, or Asian American", label: "Asian, or Asian American" },
      {
        value: "Black, African American, or Afro-Caribbean",
        label: "Black, African American, or Afro-Caribbean",
      },
      {
        value: "Hispanic, Latinx, or Spanish Origin",
        label: "Hispanic, Latinx, or Spanish Origin",
      },
      {
        value: "Native Hawaiian or Other Pacific Islander",
        label: "Native Hawaiian or Other Pacific Islander",
      },
      {
        value: "Middle Eastern or North African",
        label: "Middle Eastern or North African",
      },
      { value: "White", label: "White" },
      {
        value: "A not-listed or more specific ethnicity",
        label: "A not-listed or more specific ethnicity",
      },
    ],
  },
  {
    title: "Gender identity",
    param: "people_filters[genders]",
    doNotDisplayFor: "schools",
    options: [
      { value: "Male", label: "Male/Man" },
      { value: "Female", label: "Female/Woman" },
      { value: "Gender Non-Conforming", label: "Gender Non-Conforming" },
      {
        value: "A not-listed or more specific gender identity",
        label: "A not-listed or more specific gender identity",
      },
    ],
  },
  {
    title: "Role",
    param: "people_filters[roles]",
    doNotDisplayFor: "schools",
    options: [
      { label: "Teacher Leader", value: "Teacher Leader" },
      { label: "Emerging Teacher Leader", value: "Emerging Teacher Leader" },
      { label: "Foundation Partner", value: "Foundation Partner" },
      { label: "Charter Staff", value: "Charter Staff" },
    ],
  },
];
