import React from "react";
import { default as MaterialSelect } from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import { styled, css } from "@mui/material/styles";

import { FormControl, MenuItem } from "@mui/material";
import { Stack, Typography, Icon, Input } from "./index";

const Select = React.forwardRef(
  (
    {
      label,
      id,
      value,
      onChange,
      options,
      error,
      helperText,
      placeholder,
      ...props
    },
    ref
  ) => {
    return (
      <Stack>
        <FormControl fullWidth>
          {label ? (
            <Typography variant="bodyRegular" sx={{ marginBottom: "8px" }}>
              {label}
            </Typography>
          ) : null}

          <MaterialSelect
            ref={ref}
            error={error}
            labelId={`${id}-label`}
            id={id}
            value={value}
            onChange={onChange}
            input={<Input />}
            displayEmpty={true}
            renderValue={(value) =>
              value ? (
                // value
                options.find((option) => option.value === value)?.label || value
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
              <MenuItem key={i} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </MaterialSelect>
        </FormControl>
        {helperText && (
          <FormHelperText error={error}>{helperText}</FormHelperText>
        )}
      </Stack>
    );
  }
);

export default Select;
