import { default as MaterialSelect } from '@mui/material/Select';
import { styled } from '@mui/material/styles';

import {
  FormControl,
  OutlinedInput,
  MenuItem,
  InputLabel
} from '@mui/material'
import {
  Box,
  Chip
} from '@ui'

const CustomMultiSelect = styled(MaterialSelect)(({ theme }) => ({
}));

const MultiSelect = ({
  options,
  id,
  value,
  onChange,
  ...rest
}) => {
  return (
    <FormControl>
      <InputLabel id={`${id}-label`}>Skills</InputLabel>
      <CustomMultiSelect
        labelId={`${id}-label`}
        id={id}
        multiple
        value={value}
        onChange={onChange}
        input={<OutlinedInput id={`${id}-chip`} />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        {...rest}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            value={option}
          >
            {option}
          </MenuItem>
        ))}
      </CustomMultiSelect>
    </FormControl>
  );
}

export default MultiSelect


// <FormControl sx={{ m: 1 }}>
//   <InputLabel id="demo-multiple-chip-label">Skills</InputLabel>
//   <Select
//     labelId="demo-multiple-chip-label"
//     id="demo-multiple-chip"
//     multiple
//     value={skills}
//     onChange={handleSkillChange}
//     input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
//     renderValue={(selected) => (
//       <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//         {selected.map((value) => (
//           <Chip key={value} label={value} />
//         ))}
//       </Box>
//     )}
//     MenuProps={MenuProps}
//   >
//     {user.skills.map((skill) => (
//       <MenuItem
//         key={skill}
//         value={skill}
//       >
//         {skill}
//       </MenuItem>
//     ))}
//   </Select>
// </FormControl>