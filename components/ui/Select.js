import { default as MaterialSelect } from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import { styled, css } from "@mui/material/styles";

import { FormControl, MenuItem } from "@mui/material";
import { Stack, Typography, Icon, Input } from "./index";

const Select = ({
  label,
  id,
  value,
  onChange,
  options,
  error,
  helperText,
  placeholder,
  ...props
}) => {
  return (
    <FormControl fullWidth>
      <Stack spacing={2}>
        <Typography variant="bodyRegular">{label}</Typography>
        <MaterialSelect
          error={error}
          labelId={`${id}-label`}
          id={id}
          value={value}
          onChange={onChange}
          input={<Input />}
          IconComponent={() => <Icon type="expandMore" variant="lightened" />}
          {...props}
        >
          <MenuItem disabled value="">
            {placeholder}
          </MenuItem>
          {options.map((option, i) => (
            <MenuItem key={i} value={i}>
              {option}
            </MenuItem>
          ))}
        </MaterialSelect>
        {helperText && (
          <FormHelperText error={error}>{helperText}</FormHelperText>
        )}
      </Stack>
    </FormControl>
  );
};

export default Select;
