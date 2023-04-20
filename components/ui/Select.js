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
      {label ? (
        <Typography variant="bodyRegular" sx={{ marginBottom: "8px" }}>
          {label}
        </Typography>
      ) : null}

      <MaterialSelect
        error={error}
        labelId={`${id}-label`}
        id={id}
        value={value}
        onChange={onChange}
        input={<Input />}
        displayEmpty={true}
        renderValue={(value) =>
          value?.length ? (
            Array.isArray(value) ? (
              value.join(", ")
            ) : (
              value
            )
          ) : (
            <Typography variant="bodyRegular" lightened>
              {placeholder}
            </Typography>
          )
        }
        IconComponent={(props) => (
          <Icon
            type="expandMore"
            variant="lightened"
            hoverable
            style={{ top: "auto" }}
            {...props}
          />
        )}
        {...props}
      >
        {options.map((option, i) => (
          <MenuItem key={i} value={i}>
            {option}
          </MenuItem>
        ))}
      </MaterialSelect>
      {helperText && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

export default Select;
