import React from "react";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { Stack, Input, Typography } from "./index";

const TextField = React.forwardRef(
  (
    {
      charCount,
      charLimit,
      placeholder,
      label,
      endAdornment,
      helperText,
      error,
      multiline,
      ...props
    },
    ref
  ) => {
    return (
      <Stack spacing={1}>
        <FormControl variant="standard">
          {label ? (
            <Typography variant="bodyRegular" sx={{ marginBottom: "8px" }}>
              {label}
            </Typography>
          ) : null}
          <Input
            multiline={multiline}
            ref={ref}
            placeholder={placeholder}
            endAdornment={endAdornment}
            error={error}
            {...props}
          />
          {(charCount || charLimit) && (
            <Typography variant="bodySmall" lightened>
              {charCount} / {charLimit}
            </Typography>
          )}
          {helperText && (
            <FormHelperText error={!!error}>{helperText}</FormHelperText>
          )}
        </FormControl>
      </Stack>
    );
  }
);

export default TextField;
