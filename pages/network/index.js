import Head from "next/head";
import { useState, useEffect } from "react";
import { FormControlLabel, RadioGroup } from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import { styled, css } from "@mui/material/styles";
import { useInView } from "react-intersection-observer";

import getAuthHeader from "@lib/getAuthHeader";
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
  Button,
} from "@ui";
import { clearLoggedInState, redirectLoginProps } from "@lib/handleLogout";
import useAuth from "@lib/utils/useAuth";

const Network = () => {
  const {
    query,
    setQuery,
    filters,
    setFilters,
    results,
    setResults,
    isSearching,
    setIsSearching,
    error,
    currentPage,
    handlePageChange,
    hasMore,
    noResults,
    perPage,
  } = useSearch();
  const [category, setCategory] = useState("people");
  const [userQuery, setUserQuery] = useState("");

  const { currentUser } = useUserContext();

  if (error) return <PageContainer>failed to load</PageContainer>;

  const profileFallback = "/assets/images/avatar-fallback.svg";
  const schoolFallback = "/assets/images/school-placeholder.png";

  useAuth("/login");

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });
  const handleCategoryChange = (e) => {
    setIsSearching(true);
    setCategory(e.target.value);
    setFilters({ models: e.target.value });
    setResults([]);
    handlePageChange(1);
  };
  const handleFetchNewResults = () => {
    if (inView && results.length > 0) {
      setIsSearching(true);
      handlePageChange(currentPage + 1);
    }
  };
  useEffect(() => {
    handleFetchNewResults();
  }, [inView]);

  useEffect(() => {
    if (userQuery === "") {
      setQuery("*");
      handlePageChange(1);
    } else {
      setQuery(userQuery);
    }
  }, [userQuery]);

  useEffect(() => {
    setIsSearching(true);
    setQuery("*");
  }, []);

  useEffect(() => {
    handlePageChange(1);
  }, [filters]);

  // console.log(currentPage);
  // console.log(isSearching);
  // console.log({ query });
  // console.log({ currentUser });
  // console.log({ currentPage });
  // console.log({ results });
  // console.log({ noResults });
  // console.log({ inView });
  // console.log("hasMore------------------------", hasMore);
  // console.log({ filters });

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
                setUserQuery(e.target.value);
              }}
              value={userQuery}
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
              {Filters.map((f, i) =>
                f.doNotDisplayFor === category ? null : (
                  <Grid item key={i}>
                    <FilterMultiSelect
                      filter={f}
                      setFilters={setFilters}
                      isSearching={isSearching}
                      setIsSearching={setIsSearching}
                      category={category}
                    />
                  </Grid>
                )
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid container mt={12}>
          {results.length > 0 && (
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
                      trainingLevel={f.attributes.montessoriCertifiedLevelList}
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
                      charter={f.attributes.charterString}
                      key={f.id}
                    />
                  ))}
            </Masonry>
          )}
          {hasMore && !isSearching && results.length >= perPage - 1 && (
            <Grid item xs={12} mt={results.length ? 0 : 48}>
              <div
                ref={ref}
                style={{ opacity: 0, width: "100%", height: "48px" }}
              />
            </Grid>
          )}
          {!hasMore && noResults && !isSearching && (
            <Grid item xs={12} mt={24}>
              <Grid container justifyContent="center" alignItems="center">
                <Grid item>
                  <Stack spacing={6} alignItems="center">
                    <Icon type="flag" size="large" variant="primary" />
                    <Stack spacing={3} alignItems="center">
                      <Typography variant="h3" bold>
                        Oops! Looks like there's nothing here
                      </Typography>
                      <Typography variant="bodyLarge" lightened>
                        Try a different search term or more general query
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          )}
          {isSearching && (
            <Grid item xs={12} mt={results.length ? 0 : 48}>
              <Grid container alignItems="center" justifyContent="center">
                <Grid item>
                  <Spinner />
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

const FilterMultiSelect = ({
  filter,
  category,
  setFilters,
  setIsSearching,
  isSearching,
}) => {
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
      setIsSearching(true);
      return { ...filters, [filter.param]: value };
    });
  };
  useEffect(() => {
    setFilterValue([]);
  }, [category]);
  // console.log(filterValue);
  return (
    <MultiSelect
      disabled={isSearching}
      withCheckbox
      autoWidth
      options={filter.options}
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
  charter,
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
              {leaders.map((l, i) => (
                <Avatar src={l.imageSrc} size="sm" key={i} />
              ))}
            </AvatarGroup>
          </Stack>
          <Card
            size="small"
            noBorder
            noRadius
            sx={{ borderTop: "1px solid", borderColor: "neutral.lightened" }}
          >
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
                {charter && (
                  <Grid item xs={12}>
                    <Chip
                      label={
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Icon
                            type="shapePolygon"
                            size="small"
                            variant="primary"
                          />
                          <Typography variant="bodyMini" bold highlight>
                            CHARTER
                          </Typography>
                          <Typography variant="bodyMini" bold>
                            {charter}
                          </Typography>
                        </Stack>
                      }
                      size="small"
                      variant="primaryLightened"
                    />
                  </Grid>
                )}
              </Grid>
            </Stack>
          </Card>
        </Stack>
      </Card>
    </Link>
  );
};

const Filters = [
  {
    title: "State",
    param: "people_filters[address_state]",
    options: [
      { label: "Alabama", value: "AL" },
      { label: "Alaska", value: "AK" },
      { label: "Arizona", value: "AZ" },
      { label: "Arkansas", value: "AR" },
      { label: "California", value: "CA" },
      { label: "Colorado", value: "CO" },
      { label: "Connecticut", value: "CT" },
      { label: "Delaware", value: "DE" },
      { label: "District of Columbia", value: "DC" },
      { label: "Florida", value: "FL" },
      { label: "Georgia", value: "GA" },
      { label: "Hawaii", value: "HI" },
      { label: "Idaho", value: "ID" },
      { label: "Illinois", value: "IL" },
      { label: "Indiana", value: "IN" },
      { label: "Iowa", value: "IA" },
      { label: "Kansas", value: "KS" },
      { label: "Kentucky", value: "KY" },
      { label: "Louisiana", value: "LA" },
      { label: "Maine", value: "ME" },
      { label: "Maryland", value: "MD" },
      { label: "Massachusetts", value: "MA" },
      { label: "Michigan", value: "MI" },
      { label: "Minnesota", value: "MN" },
      { label: "Mississippi", value: "MS" },
      { label: "Missouri", value: "MO" },
      { label: "Montana", value: "MT" },
      { label: "Nebraska", value: "NE" },
      { label: "Nevada", value: "NV" },
      { label: "New Hampshire", value: "NH" },
      { label: "New Jersey", value: "NJ" },
      { label: "New Mexico", value: "NM" },
      { label: "New York", value: "NY" },
      { label: "North Carolina", value: "NC" },
      { label: "North Dakota", value: "ND" },
      { label: "Ohio", value: "OH" },
      { label: "Oklahoma", value: "OK" },
      { label: "Oregon", value: "OR" },
      { label: "Pennsylvania", value: "PA" },
      { label: "Rhode Island", value: "RI" },
      { label: "South Carolina", value: "SC" },
      { label: "South Dakota", value: "SD" },
      { label: "Tennessee", value: "TN" },
      { label: "Texas", value: "TX" },
      { label: "Trust Territories", value: "TT" },
      { label: "Utah", value: "UT" },
      { label: "Vermont", value: "VT" },
      { label: "Virginia", value: "VA" },
      { label: "Washington", value: "WA" },
      { label: "West Virginia", value: "WV" },
      { label: "Wisconsin", value: "WI" },
      { label: "Wyoming", value: "WY" },
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
      { value: "Male/Man", label: "Male/Man" },
      { value: "Female/Woman", label: "Female/Woman" },
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
  {
    title: "Charter",
    param: "school_filters[charter]",
    doNotDisplayFor: "people",
    options: [
      {
        label: "Minnesota Wildflower Montessori School",
        value: "Minnesota Wildflower Montessori School",
      },
      { label: "Colorado Charter", value: "Colorado Charter" },
      {
        label: "Wildflower New York Charter School",
        value: "Wildflower New York Charter School",
      },
      {
        label: "DC Wildflower Public Charter School",
        value: "DC Wildflower Public Charter School",
      },
    ],
  },
];

export async function getServerSideProps({ params, req, res }) {
  const config = getAuthHeader({ req, res });
  if (!config) {
    console.log("no token found, redirecting to login");
    return redirectLoginProps();
  }
  return { props: { config } };
}
