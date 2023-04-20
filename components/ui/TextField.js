import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { styled, css } from "@mui/material/styles";
import { Stack, Input, Typography } from "./index";

export default function TextField({
  charCount,
  charLimit,
  placeholder,
  label,
  endAdornment,
  inputRef,
  helperText,
  error,
  multiline,
  ...props
}) {
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
          inputRef={inputRef}
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
          <FormHelperText error={error}>{helperText}</FormHelperText>
        )}
      </FormControl>
    </Stack>
  );
}
