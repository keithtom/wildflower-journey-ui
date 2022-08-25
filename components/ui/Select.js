import { default as MaterialSelect } from "@mui/material/Select";
import { styled, css } from "@mui/material/styles";

import { FormControl, MenuItem } from "@mui/material";
import { Stack, Typography, Icon, Input } from "./index";

const Select = ({ label, id, value, onChange, options, ...props }) => {
  return (
    <FormControl fullWidth>
      <Stack spacing={2}>
        <Typography variant="bodyRegular">{label}</Typography>
        <MaterialSelect
          labelId={`${id}-label`}
          id={id}
          value={value}
          onChange={onChange}
          input={<Input />}
          IconComponent={() => <Icon type="chevronDown" variant="lightened" />}
          {...props}
        >
          {options.map((option, i) => (
            <MenuItem key={i} value={i}>
              {option}
            </MenuItem>
          ))}
        </MaterialSelect>
      </Stack>
    </FormControl>
  );
};

export default Select;
