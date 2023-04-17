import { default as MaterialSelect } from "@mui/material/Select";
import { styled, css } from "@mui/material/styles";

import { FormControl, MenuItem } from "@mui/material";
import { Chip, Icon, Input, Stack, Typography } from "./index";

const CustomMultiSelect = styled(MaterialSelect)`
  border-radius: ${({ theme }) => theme.radius.md}px;
  padding: 0 ${({ theme }) => theme.util.buffer * 3}px 0
    ${({ theme }) => theme.util.buffer * 1}px;
`;

const MultiSelect = ({ options, id, value, onChange, label, ...props }) => {
  return (
    <FormControl fullWidth>
      <Stack spacing={2}>
        <Typography variant="bodyRegular">{label}</Typography>
        <CustomMultiSelect
          multiple
          labelId={`${id}-label`}
          id={id}
          value={value}
          onChange={onChange}
          input={<Input />}
          IconComponent={(props) => (
            <Icon
              type="expandMore"
              variant="lightened"
              hoverable
              style={{ top: "auto" }}
              {...props}
            />
          )}
          renderValue={(selected) => (
            <Stack direction="row" spacing={1}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Stack>
          )}
          {...props}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </CustomMultiSelect>
      </Stack>
    </FormControl>
  );
};

export default MultiSelect;
