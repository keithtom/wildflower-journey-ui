import { useState } from 'react'

import { schools, people } from '@lib/utils/fake-data'
import {
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormGroup,
  FormLabel,
  MenuItem,
  InputAdornment,
  Link
} from '@mui/material'
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
} from '@ui'
import {
  Filter,
  Search
} from '@mui/icons-material'

import UserResultItem from '@components/UserResultItem'
import SchoolResultItem from '@components/SchoolResultItem'


const FilterGroup = ({ group, filtersSelected, handleOnChange }) => {
  const [showAllItems, setShowAllItems] = useState(false)

  return (
    <>
      <FormLabel>{group.name}</FormLabel>
      <FormGroup>
        { showAllItems ?
          group.items.map((item, i) =>
            <FormControlLabel
              key={i}
              value={item.value}
              control={<Checkbox />}
              label={item.label}
              checked={filtersSelected[i]}
              onChange={() => handleOnChange(i)}
            />
          )
        :
          group.items.slice(0, 3).map((item, i) =>
            <FormControlLabel
              key={i}
              value={item.value}
              control={<Checkbox />}
              label={item.label}
              checked={filtersSelected[i]}
              onChange={() => handleOnChange(i)}
            />
          )
        }
      </FormGroup>
      <Link
        underline="none"
        color="text.lightened"
        onClick={() => setShowAllItems(!showAllItems)}
      >
        {showAllItems ? 'Show less' : 'Show more'}
      </Link>
    </>
  )
}

const NetworkContent = () => {
  const [category, setCategory] = useState('people')
  const [rolesSelected, setRolesSelected] = useState(
    new Array(Filters[0].items.length).fill(false)
  )

  const handleOnChange = (position) => {
    const updatedCheckedState = rolesSelected.map((item, index) =>
      index === position ? !item : item
    );
    setRolesSelected(updatedCheckedState);
  };


  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
  }

  console.log('rolesSelected', rolesSelected)

  return (
    <Grid container p={8} spacing={8}>

      <Grid item xs={12} sm={12}>
        <TextField
          fullWidth
          placeholder="Search for something..."
          InputProps={{
            startAdornment: <InputAdornment position="start"><Search/></InputAdornment>,
          }}
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <Card>
          <FormControl fullWidth>
            <Stack spacing={2}>

              <Typography variant="h6">Filter</Typography>

              <Divider />

              <RadioGroup
                value={category}
                onChange={handleCategoryChange}
              >
                <FormControlLabel value="people" control={<Radio />} label="People" />
                <FormControlLabel value="schools" control={<Radio />} label="Schools" />
              </RadioGroup>

              <Divider />

              <>
                { category === 'people' &&
                <>

                  <FilterGroup
                    group={Filters[0]}
                    filtersSelected={rolesSelected}
                    handleOnChange={handleOnChange}
                  />

                  <Divider />

                  <FormLabel>Skills</FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox />}
                      value="accounting"
                      label="Accounting"
                    />
                    <FormControlLabel value="branding" control={<Checkbox />} label="Branding" />
                    <FormControlLabel value="construction" control={<Checkbox />} label="Construction" />
                    <FormControlLabel value="development" control={<Checkbox />} label="Development" />
                  </FormGroup>
                </>
                }

                <FormLabel>Ages Served</FormLabel>
                <FormGroup>
                  <FormControlLabel value="toddler" control={<Checkbox />} label="Parent Child" />
                  <FormControlLabel value="toddler" control={<Checkbox />} label="Infants" />
                  <FormControlLabel value="toddler" control={<Checkbox />} label="Toddlers" />
                  <FormControlLabel value="primary" control={<Checkbox />} label="Primary" />
                  <FormControlLabel value="elementary" control={<Checkbox />} label="Lower Elementary" />
                  <FormControlLabel value="elementary" control={<Checkbox />} label="Upper Elementary" />
                  <FormControlLabel value="elementary" control={<Checkbox />} label="Adolescent" />
                  <FormControlLabel value="elementary" control={<Checkbox />} label="High School" />
                </FormGroup>
                <FormLabel>Governance Type</FormLabel>
                <FormGroup>
                  <FormControlLabel value="toddler" control={<Checkbox />} label="Charter" />
                  <FormControlLabel value="primary" control={<Checkbox />} label="Independent" />
                  <FormControlLabel value="elementary" control={<Checkbox />} label="District" />
                </FormGroup>
                <FormLabel>Tuition Assistance</FormLabel>
                <FormGroup>
                  <FormControlLabel value="toddler" control={<Checkbox />} label="State Vouchers" />
                  <FormControlLabel value="primary" control={<Checkbox />} label="County Childcare Assistance Programs" />
                  <FormControlLabel value="elementary" control={<Checkbox />} label="City Vouchers" />
                  <FormControlLabel value="toddler" control={<Checkbox />} label="School-supported scholarship and/or tuition discount" />
                  <FormControlLabel value="primary" control={<Checkbox />} label="Private-donor funded scholarship program" />
                </FormGroup>
                <FormLabel>Calendar</FormLabel>
                <FormGroup>
                  <FormControlLabel value="toddler" control={<Checkbox />} label="9 Month" />
                  <FormControlLabel value="primary" control={<Checkbox />} label="10 Month" />
                  <FormControlLabel value="elementary" control={<Checkbox />} label="Year Round" />
                </FormGroup>
              </>


              <Divider />

              <FormLabel>Hub</FormLabel>
              <Select>
                <MenuItem value="NY">New York</MenuItem>
                <MenuItem value="MA">Massachusetts</MenuItem>
              </Select>

              <Divider />

              <FormLabel>Distance</FormLabel>
              <Select>
                <MenuItem value="5">Within 5 miles</MenuItem>
                <MenuItem value="10">Within 10 miles</MenuItem>
              </Select>

            </Stack>
          </FormControl>
        </Card>
      </Grid>

      <Grid item xs={12} sm={8}>
        {category === 'people' ?
          <Stack spacing={4}>
            <Typography variant="h6">{people.length} Results</Typography>
            <Stack spacing={4}>
              {people.map((p, i) =>
                <UserResultItem user={p} key={i} />
              )}
            </Stack>
          </Stack>
        :
          <Stack spacing={4}>
            <Typography variant="h6">{schools.length} Results</Typography>
            <Stack spacing={4}>
              {schools.map((s, i) =>
                <SchoolResultItem school={s} key={i} />
              )}
            </Stack>
          </Stack>

        }
      </Grid>

    </Grid>
  )
}

export default NetworkContent


const Filters = [
  {
    name: 'Role',
    items: [
      {
        value: 'teacher-leader',
        label: 'Teacher Leader'
      },
      {
        value: 'hub-member',
        label: 'Hub Member'
      },
      {
        value: 'foundation-partner',
        label: 'Foundation Partner'
      },
      {
        value: 'operations-guide',
        label: 'Operations Guide'
      },
      {
        value: 'board-member',
        label: 'Board Member'
      }
    ]
  }
]
