import { useState } from "react";
import useSearch from "../../hooks/useSearch";

import {
  schools,
  people,
  searchFilters,
  searchPeopleFilters,
} from "@lib/utils/fake-data";
import {
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormGroup,
  FormLabel,
  MenuItem,
  InputAdornment,
  Link,
} from "@mui/material";
import {
  Divider,
  Stack,
  Typography,
  Radio,
  Select,
  Checkbox,
  Grid,
  Card,
  TextField,
} from "@ui";
import { Search, ArrowForwardIos } from "@mui/icons-material";

import UserResultItem from "@components/UserResultItem";
import SchoolResultItem from "@components/SchoolResultItem";

const FilterGroup = ({ group, filtersSelected, handleOnChange }) => {
  const [showAllItems, setShowAllItems] = useState(false);

  return (
    <>
      <FormLabel>{group.name}</FormLabel>
      <FormGroup>
        {showAllItems
          ? group.items.map((item, i) => (
              <FormControlLabel
                key={i}
                value={item.value}
                control={<Checkbox />}
                label={item.label}
                checked={filtersSelected[i]}
                onChange={() => handleOnChange(i)}
              />
            ))
          : group.items
              .slice(0, 3)
              .map((item, i) => (
                <FormControlLabel
                  key={i}
                  value={item.value}
                  control={<Checkbox />}
                  label={item.label}
                  checked={filtersSelected[i]}
                  onChange={() => handleOnChange(i)}
                />
              ))}
      </FormGroup>
      {group.items.length > 3 ? (
        <Link
          underline="none"
          color="text.lightened"
          onClick={() => setShowAllItems(!showAllItems)}
        >
          {showAllItems ? "Show less" : "Show more"}
        </Link>
      ) : null}
      <Divider />
    </>
  );
};

const NetworkContent = ({ asStakeholderSelection }) => {
  // form state, need to fire a query on every change to filters.
  // form state can look at all filters and form the right API query
  // return results for people and schools.

  const { query, setQuery, results } = useSearch();

  const [category, setCategory] = useState("people");

  const Role = searchPeopleFilters.find(({ name }) => name === "Role");
  const Skills = searchPeopleFilters.find(({ name }) => name === "Skills");
  const AgesServed = searchFilters.find(({ name }) => name === "Ages Served");
  const GovernanceType = searchFilters.find(
    ({ name }) => name === "Governance Type"
  );
  const TuitionAssistance = searchFilters.find(
    ({ name }) => name === "Tuition Assistance"
  );
  const Calendar = searchFilters.find(({ name }) => name === "Calendar");

  //Roles
  const [rolesSelected, setRolesSelected] = useState(
    new Array(Role.items.length).fill(true)
  );
  const handleRolesChange = (position) => {
    const updatedCheckedState = rolesSelected.map((item, index) =>
      index === position ? !item : item
    );
    setRolesSelected(updatedCheckedState);
  };

  //Skills
  const [skillsSelected, setSkillsSelected] = useState(
    new Array(Skills.items.length).fill(true)
  );
  const handleSkillsChange = (position) => {
    const updatedCheckedState = skillsSelected.map((item, index) =>
      index === position ? !item : item
    );
    setSkillsSelected(updatedCheckedState);
  };

  //Ages Served
  const [agesServedSelected, setAgesServedSelected] = useState(
    new Array(AgesServed.items.length).fill(true)
  );
  const handleAgesServedChange = (position) => {
    const updatedCheckedState = agesServedSelected.map((item, index) =>
      index === position ? !item : item
    );
    setAgesServedSelected(updatedCheckedState);
  };

  //Governance Type
  const [governanceTypeSelected, setGovernanceTypeSelected] = useState(
    new Array(GovernanceType.items.length).fill(true)
  );
  const handleGovernanceTypeChange = (position) => {
    const updatedCheckedState = governanceTypeSelected.map((item, index) =>
      index === position ? !item : item
    );
    setGovernanceTypeSelected(updatedCheckedState);
  };

  //Tuition Assistance
  const [tuitionAssistanceSelected, setTuitionAssistanceSelected] = useState(
    new Array(TuitionAssistance.items.length).fill(true)
  );
  const handleTuitionAssistanceChange = (position) => {
    const updatedCheckedState = tuitionAssistanceSelected.map((item, index) =>
      index === position ? !item : item
    );
    setTuitionAssistanceSelected(updatedCheckedState);
  };

  //Calendar
  const [calendarSelected, setCalendarSelected] = useState(
    new Array(Calendar.items.length).fill(true)
  );
  const handleCalendarChange = (position) => {
    const updatedCheckedState = calendarSelected.map((item, index) =>
      index === position ? !item : item
    );
    setCalendarSelected(updatedCheckedState);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  // console.log("rolesSelected", rolesSelected)
  // console.log("skillsSelected", skillsSelected)
  // console.log("agesServedSelected", agesServedSelected)
  // console.log("governanceTypeSelected", governanceTypeSelected)
  // console.log("tuitionAssistanceSelected", tuitionAssistanceSelected)
  // console.log("calendarSelected", calendarSelected)

  return (
    <Grid container p={asStakeholderSelection ? 0 : 8} spacing={8}>
      <Grid item xs={12} sm={12}>
        <TextField
          fullWidth
          placeholder="Search for something..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <Card>
          <FormControl fullWidth>
            <Stack spacing={3}>
              <Typography variant="h6">Filter</Typography>

              <Divider />

              <RadioGroup value={category} onChange={handleCategoryChange}>
                <FormControlLabel
                  value="people"
                  control={<Radio />}
                  label="People"
                />
                {!asStakeholderSelection && (
                  <FormControlLabel
                    value="schools"
                    control={<Radio />}
                    label="Schools"
                  />
                )}
              </RadioGroup>

              <Divider />

              <>
                {category === "people" && (
                  <>
                    <FilterGroup
                      group={Role}
                      filtersSelected={rolesSelected}
                      handleOnChange={handleRolesChange}
                    />
                    <FilterGroup
                      group={Skills}
                      filtersSelected={skillsSelected}
                      handleOnChange={handleSkillsChange}
                    />
                  </>
                )}

                <FilterGroup
                  group={AgesServed}
                  filtersSelected={agesServedSelected}
                  handleOnChange={handleAgesServedChange}
                />
                <FilterGroup
                  group={GovernanceType}
                  filtersSelected={governanceTypeSelected}
                  handleOnChange={handleGovernanceTypeChange}
                />
                <FilterGroup
                  group={TuitionAssistance}
                  filtersSelected={tuitionAssistanceSelected}
                  handleOnChange={handleTuitionAssistanceChange}
                />
                <FilterGroup
                  group={Calendar}
                  filtersSelected={calendarSelected}
                  handleOnChange={handleCalendarChange}
                />
              </>

              <FormLabel>Hub</FormLabel>
              <Select options={hubs} />

              <Divider />

              <FormLabel>Distance</FormLabel>
              <Select options={distances} />
            </Stack>
          </FormControl>
        </Card>
      </Grid>

      <Grid item xs={12} sm={8}>
        {category === "people" ? (
          <Stack spacing={4}>
            {results.length ? (
              <Stack spacing={4}>
                <Typography variant="h6">{results.length} Results</Typography>
                {results.map((p, i) => (
                  <UserResultItem
                    user={p}
                    key={p.id}
                    asStakeholderSelection={asStakeholderSelection}
                  />
                ))}
              </Stack>
            ) : (
              <Card>
                {asStakeholderSelection ? (
                  <Stack p={6} alignItems="center" spacing={4}>
                    <Typography variant="h4">
                      Oops! Looks like there's nothing here.
                    </Typography>
                    <Typography variant="body">
                      Try filtering less or refining your search.
                    </Typography>
                  </Stack>
                ) : (
                  <Stack p={6} alignItems="center" spacing={4}>
                    <Typography variant="h4">
                      Oops! Looks like there's nothing here.
                    </Typography>
                    <Typography variant="body">
                      Try filtering less or searching for schools instead.
                    </Typography>
                    <Link onClick={() => setCategory("schools")}>
                      <Stack direction="row" spacing={3}>
                        <Typography>Search for schools</Typography>
                        <ArrowForwardIos fontSize="small" />
                      </Stack>
                    </Link>
                  </Stack>
                )}
              </Card>
            )}
          </Stack>
        ) : (
          !asStakeholderSelection && (
            <Stack spacing={4}>
              <Stack spacing={4}>
                {schools.length ? (
                  <>
                    <Typography variant="h6">
                      {schools.length} Results
                    </Typography>
                    {schools.map((s, i) => (
                      <SchoolResultItem school={s} key={i} />
                    ))}
                  </>
                ) : (
                  <Card>
                    <Stack p={6} alignItems="center" spacing={4}>
                      <Typography variant="h4">
                        Oops! Looks like there's nothing here.
                      </Typography>
                      <Typography variant="body">
                        Try filtering less or searching for people instead.
                      </Typography>
                      <Link onClick={() => setCategory("people")}>
                        <Stack direction="row" spacing={3}>
                          <Typography>Search for people</Typography>
                          <ArrowForwardIos fontSize="small" />
                        </Stack>
                      </Link>
                    </Stack>
                  </Card>
                )}
              </Stack>
            </Stack>
          )
        )}
      </Grid>
    </Grid>
  );
};

export default NetworkContent;

const hubs = ["New York", "Massachussetts"];
const distances = ["Within 5 miles", "Within 10 miles"];
