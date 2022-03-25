import { useState } from 'react'
import {
  ethnicities,
  languages,
  incomeRanges,
  genderIdentities
} from '../lib/utils/fake-data'
import {
  Grid,
  TextField,
  Select,
  MultiSelect,
  Button,
  Card,
  Typography,
  Stack,
  Switch
} from '@ui'

const EditUserProfile = ({ user }) => {
  const [phone, setPhone] = useState(user.attributes.phone)
  const handlePhoneChange = (event) => {
    setPhone(event.target.value)
  }

  const [firstName, setFirstName] = useState(user.firstName)
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value)
  }

  const [lastName, setLastName] = useState(user.lastName)
  const handleLastNameChange = (event) => {
    setLastName(event.target.value)
  }

  const [skills, setSkills] = useState(user.skills)
  const handleSkillsChange = (event) => {
    const {
      target: { value },
    } = event;
    setSkills(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const [ethnicity, setEthnicity] = useState(6)
  const handleEthnicityChange = (event) => {
    setEthnicity(event.target.value)
  }

  const [language, setLanguage] = useState(0)
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value)
  }

  const [economicBackground, setEconomicBackground] = useState(1)
  const handleEconomicBackgroundChange = (event) => {
    setEconomicBackground(event.target.value)
  }
  
  const [genderIdentity, setGenderIdentity] = useState(1)
  const handleGenderIdentityChange = (event) => {
    setGenderIdentity(event.target.value)
  }

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <TextField 
            fullWidth
            label="First Name"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            fullWidth
            label="Last Name"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </Grid>
      </Grid>

      <TextField 
        fullWidth
        label="Phone Number"
        value={phone}
        onChange={handlePhoneChange}
      />

      <TextField
        label="About you"
        multiline
        rows={4}
        value={user.bio}
      />

      {/* Skills selector */}

      <MultiSelect
        id="skills-select"
        options={user.skills}
        value={skills}
        onChange={handleSkillsChange}
      />

      <Card variant="warning">
        <Stack spacing={4}>
          <div>
            <Typography variant="h6">Admin-only fields</Typography>
            <Typography variant="bodyLightened">These are only visible to admin users, and will not be shown in your public profile unless you decide to make any specific fields public.</Typography>
          </div>

          {/* Ethnicity select */}
          <div>            
            <Select
              id="ethnicity-select"
              value={ethnicity}
              label="Race/ethnicity"
              onChange={handleEthnicityChange}
              options={ethnicities}
            />
            
            <Switch label="Make race/ethnicity publicly visible" />
          </div>

          {/* Language select */}
          <div>
            <Select
              id="language-select"
              value={language}
              label="Preferred Language"
              onChange={handleLanguageChange}
              options={languages}
            />

            <Switch label="Make preferred language publicly visible" />
          </div>

          {/* Income range select */}
          <div>
            <Select
              id="economic-background-select"
              value={economicBackground}
              label="Economic background"
              onChange={handleEconomicBackgroundChange}
              options={incomeRanges}
            />

            <Switch label="Make economic background publicly visible" />
          </div>

          {/* Gender identity select */}
          <div>
            <Select
              id="gender-identity-select"
              value={genderIdentity}
              label="Gender identity"
              onChange={handleGenderIdentityChange}
              options={genderIdentities}
            />

            <Switch label="Make gender identity publicly visible" />
          </div>

          {/* Address fields */}
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextField 
                fullWidth
                label="Address line 1"
                value="123 Clinton St"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField 
                fullWidth
                label="Address line 2"
                value="Apt 3"
              />
            </Grid>
            
            <Grid item xs={12} sm={5}>
              <TextField 
                fullWidth
                label="City"
                value="Brooklyn"
              />
            </Grid>
            
            <Grid item xs={12} sm={3}>
              <TextField 
                fullWidth
                label="State"
                value="NY"
              />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <TextField 
                fullWidth
                label="Zip"
                value="11211"
              />
            </Grid>
            
            <Switch label="Make address publicly visible" />
          </Grid>
        </Stack>
      </Card>

      <Grid container spacing={2} justifyContent="flex-end">
        <Grid item><Button variant="outlined">Cancel</Button></Grid>
        <Grid item><Button>Save</Button></Grid>
      </Grid>
    </>
  )
}

export default EditUserProfile