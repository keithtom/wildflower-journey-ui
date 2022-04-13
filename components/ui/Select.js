import { default as MaterialSelect } from '@mui/material/Select';
import { styled } from '@mui/material/styles';

import {
  FormControl,
  MenuItem,
  InputLabel
} from '@mui/material'

const CustomSelect = styled(MaterialSelect)(({ theme }) => ({
}));

const Select = ({
  label,
  id,
  value,
  onChange,
  options,
  ...rest
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <CustomSelect
        labelId={`${id}-label`}
        id={id}
        value={value}
        label={label}
        onChange={onChange}
        {...rest}
      >
        {options.map((option, i) =>
          <MenuItem key={i} value={i}>{option}</MenuItem>
        )}
      </CustomSelect>
    </FormControl>
  );
}

export default Select
