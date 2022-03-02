import { useState } from 'react'

import { schools, people } from '@lib/utils/fake-data'
import {
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormGroup,
  FormLabel,
  MenuItem,
  InputAdornment
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
  Search
} from '@mui/icons-material'

import UserResultItem from '@components/UserResultItem'
import SchoolResultItem from '@components/SchoolResultItem'

const NetworkContent = () => {
  const [category, setCategory] = useState('people')

  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
  }

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
                  <FormLabel>Role</FormLabel>
                  <FormGroup>
                    <FormControlLabel value="teacher-leader" control={<Checkbox />} label="Teacher Leader" />
                    <FormControlLabel value="hub-member" control={<Checkbox />} label="Hub Member" />
                    <FormControlLabel value="foundation-partner" control={<Checkbox />} label="Foundation Partner" />
                    <FormControlLabel value="operations-guide" control={<Checkbox />} label="Operations Guide" />
                    <FormControlLabel value="board-member" control={<Checkbox />} label="Board Member" />
                  </FormGroup>

                  <Divider />

                  <FormLabel>Skills</FormLabel>
                  <FormGroup>
                    <FormControlLabel value="accounting" control={<Checkbox />} label="Accounting" />
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
