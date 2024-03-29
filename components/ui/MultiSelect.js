import React from "react";
import { default as MaterialSelect } from "@mui/material/Select";
import { styled, css } from "@mui/material/styles";
import FormHelperText from "@mui/material/FormHelperText";

import { FormControl, MenuItem } from "@mui/material";
import { Chip, Icon, Input, Stack, Typography, Checkbox } from "./index";

const CustomMultiSelect = styled(MaterialSelect)`
  border-radius: ${({ theme }) => theme.radius.md}px;
  padding: 0 ${({ theme }) => theme.util.buffer * 3}px 0
    ${({ theme }) => theme.util.buffer * 1}px;
  /* disabled */
  ${(props) =>
    props.disabled &&
    css`
      background: ${props.theme.color.neutral.lightened};
      border: 1px solid ${props.theme.color.neutral.lightened};
      opacity: 0.6;
    `}
`;

const MultiSelect = React.forwardRef(
  (
    {
      options,
      id,
      value,
      onChange,
      label,
      placeholder,
      withCheckbox,
      helperText,
      ...props
    },
    ref
  ) => {
    return (
      <Stack>
        <FormControl fullWidth={!props.autoWidth}>
          {label ? (
            <Typography variant="bodyRegular" sx={{ marginBottom: "8px" }}>
              {label}
            </Typography>
          ) : null}
          <CustomMultiSelect
            ref={ref}
            multiple
            labelId={`${id}-label`}
            id={id}
            value={value}
            onChange={onChange}
            input={<Input />}
            displayEmpty
            autoWidth
            IconComponent={(props) => (
              <Icon
                type="expandMore"
                variant="lightened"
                hoverable
                style={{ top: "auto" }}
                {...props}
              />
            )}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return (
                  <Typography
                    variant="bodyRegular"
                    lightened
                    sx={{ marginLeft: "8px" }}
                  >
                    {placeholder}
                  </Typography>
                );
              }
              const selectedLabels = selected.map((selectedValue) => {
                // Find the corresponding label for the selected value
                const selectedOption = options.find(
                  (option) => option.value === selectedValue
                );
                return selectedOption ? selectedOption.label : selectedValue;
              });
              return (
                <Stack direction="row" spacing={1}>
                  {selectedLabels.map((label) => (
                    <Chip key={label} label={label} />
                  ))}
                </Stack>
              );
            }}
            {...props}
          >
            {options.map((option, i) => (
              <MenuItem key={i} value={option.value}>
                {withCheckbox ? (
                  <Checkbox checked={value?.indexOf(option.value) > -1} />
                ) : null}
                {option.label}
              </MenuItem>
            ))}
          </CustomMultiSelect>
        </FormControl>
        {helperText && (
          <FormHelperText error={props.error}>{helperText}</FormHelperText>
        )}
      </Stack>
    );
  }
);

export default MultiSelect;
