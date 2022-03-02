import { useState } from 'react'
import {
  FormControl,
  OutlinedInput,
  MenuItem,
  MenuProps,
  InputLabel
} from '@mui/material'
import {
  Box,
  TextField,
  Chip,
  Select,
  Button,
  Grid
} from '@ui'

const EditUserProfile = ({ user }) => {
  console.log("🚀 ~ file: EditUserProfile.js ~ line 6 ~ EditUserProfile ~ user", user)
  const [skills, setSkills] = useState(user.skills)

  const handleSkillChange = (event) => {
    const {
      target: { value },
    } = event;
    setSkills(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <>
      <TextField 
        fullWidth
        label="First Name"
        value={user.firstName}
      />
      <TextField 
        fullWidth
        label="Last Name"
        value={user.lastName}
      />
      <TextField 
        fullWidth
        label="Phone Number"
        value={user.attributes.phone}
      />
      <TextField
        label="About you"
        multiline
        rows={4}
        value={user.bio}
      />

      {/* Skills selector */}

      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={skills}
          onChange={handleSkillChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {user.skills.map((skill) => (
            <MenuItem
              key={skill}
              value={skill}
            >
              {skill}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Grid container spacing={2} justifyContent="flex-end">
        <Grid item><Button variant="outlined">Cancel</Button></Grid>
        <Grid item><Button>Save</Button></Grid>
      </Grid>
    </>
  )
}

export default EditUserProfile